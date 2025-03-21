import { createFileRoute, Link } from "@tanstack/react-router";
import { useAllPosts, usePost } from "../../api/fetchPost";
import { useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../../api/user";
import { formatDateTime } from "../../utils/datetime";
import pfp1 from "../../assets/pfp/1.jpg";
import pfp2 from "../../assets/pfp/2.avif";
import pfp3 from "../../assets/pfp/3.jpg";
import pfp4 from "../../assets/pfp/4.jpg";
import pfp5 from "../../assets/pfp/5.jpg";
import Like from "../../components/buttons/Like";
import Reply from "../../components/buttons/Reply";
import Repost from "../../components/buttons/Repost";
import Capture from "../../components/buttons/Capture";
import ReplyBlock from "../../components/ReplyBlock";
import Echo from "../../components/home/Echo";

export const Route = createFileRoute("/_layout/e/$postSerId")({
  component: RouteComponent,
});

const randomPic = () => {
  const pics = [pfp1, pfp2, pfp3, pfp4, pfp5];
  const randomIndex = Math.floor(Math.random() * pics.length);

  return pics[randomIndex];
};

import { useEffect, useRef } from "react";

function RouteComponent() {
  const { postSerId } = Route.useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = usePost(Number(postSerId));
  const { data: allPosts } = useAllPosts();
  const mainRef = useRef<HTMLDivElement>(null);

  const parentPost = allPosts?.find((post) => data?.postAboveId === post.id);

  const prefetchUser = (userSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["user", userSerId],
      queryFn: () => fetchUser(userSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  useEffect(() => {
    if (parentPost && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [parentPost]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="mx-64">{parentPost && <Echo post={parentPost} />}</div>

      <main
        ref={mainRef}
        className={`flex mt-4 flex-col min-h-dvh ${parentPost ? "mx-80" : "mx-64"}`}
      >
        {parentPost && (
          <div className="text-md mb-2 text-gray-400">Replying to...</div>
        )}
        <div className="flex justify-between">
          <Link
            to="/u/$userSerId"
            params={{ userSerId: String(data?.user.serialId) }}
            onMouseEnter={() => prefetchUser(data!.user.serialId)}
            className="flex items-center"
          >
            <img
              src={data?.user.profile_pic || randomPic()}
              alt=""
              className="h-16 rounded-full mr-4 hover:opacity-85 transition duration-300"
            />
            <div>
              <h3 className="font-semibold hover:underline transition duration-300">
                {data?.user.fullname}
              </h3>
              <h4 className="text-gray-300">@{data?.user.username}</h4>
            </div>
          </Link>
        </div>
        <div className="mt-4">
          {data?.text}
          {data?.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="mt-1 w-full rounded-xl overflow-hidden py-1"
            />
          ))}
        </div>
        <div className="text-gray-300 mb-6">
          {data?.createdAt ? formatDateTime(new Date(data.createdAt)) : ""}
        </div>
        <div className="flex justify-around mb-8">
          <Like
            count={data?.likeCount}
            byUser={data?.likedByUser}
            postSerId={data?.serialId}
          />
          <Reply />
          <Repost
            count={data?.repostCount}
            byUser={data?.repostedByUser}
            postSerId={data?.serialId}
          />
          <Capture
            count={data?.bookmarkCount}
            byUser={data?.bookmarkedByUser}
            postSerId={data?.serialId}
          />
        </div>
        {data && <ReplyBlock postId={data.id} />}
      </main>
    </>
  );
}
