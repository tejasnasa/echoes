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


      {parentPost && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6">
          <Echo post={parentPost} />
        </div>
      )}



      <section
        ref={mainRef}
        className="max-w-2xl mx-auto px-4 sm:px-6 mt-4 animate-fade-in-up"
      >
        {parentPost && (
          <div className="text-xs text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-wider">
            <span className="w-4 h-px bg-gray-600"></span>
            Replying to a thread
          </div>
        )}



        <Link
          to="/u/$userSerId"
          params={{ userSerId: String(data?.user.serialId) }}
          onMouseEnter={() => prefetchUser(data!.user.serialId)}
          className="flex items-center gap-3 mb-4 group"
        >
          <img
            src={data?.user.profile_pic || randomPic()}
            alt=""
            className="h-12 w-12 rounded-full object-cover border border-white/10 group-hover:border-green-400/40 transition-all duration-200"
          />
          <div>
            <h3 className="font-semibold group-hover:text-green-400 transition-colors duration-200">
              {data?.user.fullname}
            </h3>
            <h4 className="text-gray-500 text-sm">@{data?.user.username}</h4>
          </div>
        </Link>



        <div className="text-xl leading-relaxed mb-3">
          {data?.text}
          {data?.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="mt-3 w-full rounded-2xl overflow-hidden"
            />
          ))}
        </div>

        <div className="text-gray-600 text-sm mb-4">
          {data?.createdAt ? formatDateTime(new Date(data.createdAt)) : ""}
        </div>



        <div className="post-divider mb-3"></div>
        <div className="flex items-center justify-around mb-6" id="#reply">
          <Like count={data?.likeCount} byUser={data?.likedByUser} postSerId={data?.serialId} />
          <Reply postSerId={data?.serialId} count={data?.replyCount} />
          <Repost count={data?.repostCount} byUser={data?.repostedByUser} postSerId={data?.serialId} />
          <Capture count={data?.bookmarkCount} byUser={data?.bookmarkedByUser} postSerId={data?.serialId} />
        </div>

        <div className="post-divider mb-4"></div>
        {data && <ReplyBlock postId={data.id} />}
      </section>
    </main>
  );
}
