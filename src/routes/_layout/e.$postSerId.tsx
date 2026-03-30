import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchPost, useAllPosts, usePost } from "../../api/fetchPost";
import { formatDateTime } from "../../utils/datetime";
import Like from "../../components/buttons/Like";
import Reply from "../../components/buttons/Reply";
import Repost from "../../components/buttons/Repost";
import Capture from "../../components/buttons/Capture";
import ReplyBlock from "../../components/ReplyBlock";
import Echo from "../../components/home/Echo";
import { useEffect, useRef } from "react";
import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import randomPic from "../../utils/temp/randomPic";
import { prefetchUser } from "../../api/misc";

export const Route = createFileRoute("/_layout/e/$postSerId")({
  component: RouteComponent,
  loader: async ({ params: { postSerId } }) => {
    const post = await fetchPost(Number(postSerId));
    if (!post) {
      throw notFound();
    }
    return { post };
  },
});

function RouteComponent() {
  const { postSerId } = Route.useParams();
  const { data, isLoading, isError } = usePost(Number(postSerId));
  const { data: allPosts } = useAllPosts();
  const mainRef = useRef<HTMLDivElement>(null);

  const parentPost = allPosts?.find((post) => data?.postAboveId === post.id);

  useEffect(() => {
    if (parentPost && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [parentPost]);

  if (isLoading)
    return (
      <main className="max-w-2xl mx-auto px-4 w-full mt-8 min-h-dvh flex justify-center">
        <Loader />
      </main>
    );

  if (isError || data === undefined) {
    return <NotFound />;
  }

  return (
    <main className="min-h-dvh pb-10">
      <div className="max-w-2xl mx-auto px-4 w-full">{parentPost && <Echo post={parentPost} />}</div>

      <section
        ref={mainRef}
        className={`flex mt-4 flex-col max-w-2xl mx-auto px-4 w-full`}
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
        <div className="flex justify-around mb-8" id="#reply">
          <Like
            count={data?.likeCount}
            byUser={data?.likedByUser}
            postSerId={data?.serialId}
          />
          <Reply postSerId={data?.serialId} count={data?.replyCount} />
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
      </section>
    </main>
  );
}
