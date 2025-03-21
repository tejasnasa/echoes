import { Link } from "@tanstack/react-router";
import { fetchPost, Post } from "../../api/fetchPost";
import { fetchUser } from "../../api/user";
import pfp1 from "../../assets/pfp/1.jpg";
import pfp2 from "../../assets/pfp/2.avif";
import pfp3 from "../../assets/pfp/3.jpg";
import pfp4 from "../../assets/pfp/4.jpg";
import pfp5 from "../../assets/pfp/5.jpg";
import { timeAgo } from "../../utils/datetime";
import { Share2 } from "lucide-react";
import Like from "../buttons/Like";
import Repost from "../buttons/Repost";
import Capture from "../buttons/Capture";
import Reply from "../buttons/Reply";
import { queryClient } from "../../main";

const randomPic = () => {
  const pics = [pfp1, pfp2, pfp3, pfp4, pfp5];
  const randomIndex = Math.floor(Math.random() * pics.length);

  return pics[randomIndex];
};

const Echo = ({ post }: { post: Post }) => {
  const prefetchPost = (postSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["post", postSerId],
      queryFn: () => fetchPost(postSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchUser = (userSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["user", userSerId],
      queryFn: () => fetchUser(userSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <section className="mt-8">
      {post.postAboveId && (
        <div className="text-md mb-2 text-gray-400">Replying to...</div>
      )}
      <div className="flex justify-between items-center">
        <Link
          to="/u/$userSerId"
          params={{ userSerId: String(post.user.serialId) }}
          onMouseEnter={() => prefetchUser(post.user.serialId)}
          className="flex items-center"
        >
          <img
            src={post.user.profile_pic || randomPic()}
            alt=""
            className="h-16 rounded-full mr-4 hover:opacity-85 transition duration-300"
          />
          <div>
            <h3 className="font-semibold hover:underline transition duration-300">
              {post.user.fullname}
            </h3>
            <h4 className="text-gray-300">@{post.user.username}</h4>
          </div>
        </Link>
        <div className="flex items-center text-gray-300">
          <div
            dangerouslySetInnerHTML={{ __html: timeAgo(post.createdAt) }}
            className=" hover:underline"
          />
          <button
            className="hover:bg-white/10 rounded-full m-2 flex items-center justify-center transition mr-0"
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:5173/e/${post.serialId}`
              );
            }}
          >
            <Share2 size={24} className="m-3" />
          </button>
        </div>
      </div>
      <Link
        params={{ postSerId: String(post.serialId) }}
        to="/e/$postSerId"
        onMouseEnter={() => prefetchPost(post.serialId)}
        className="text-lg"
        key={post.serialId}
      >
        <div className="mt-4 break-words">
          {post.text}
          {post.images?.length === 1 && (
            <img
              src={post.images?.[0]}
              alt=""
              className="mt-1 w-full rounded-xl overflow-hidden"
            />
          )}
          {post.images?.length === 2 && (
            <div className="w-full flex gap-1 mt-1 rounded-xl overflow-hidden">
              <img src={post.images?.[0]} alt="" className="w-1/2" />
              <img src={post.images?.[1]} alt="" className="w-1/2" />
            </div>
          )}
          {post.images?.length === 3 && (
            <div className="w-full gap-1 grid grid-cols-3 grid-rows-2 rounded-xl overflow-hidden">
              <img
                src={post.images?.[0]}
                alt=""
                className="col-span-2 row-span-2 object-cover w-full aspect-square"
              />
              <img
                src={post.images?.[1]}
                alt=""
                className="col-span-1 object-cover w-full aspect-square"
              />
              <img
                src={post.images?.[2]}
                alt=""
                className="col-span-1 object-cover w-full aspect-square"
              />
            </div>
          )}
          {post.images?.length === 4 && (
            <div className="w-full gap-1 grid grid-cols-2 grid-rows-2 rounded-xl overflow-hidden">
              <img
                src={post.images?.[0]}
                alt=""
                className="col-span-1 object-cover w-full aspect-square"
              />
              <img
                src={post.images?.[1]}
                alt=""
                className="col-span-1 object-cover w-full aspect-square"
              />
              <img
                src={post.images?.[2]}
                alt=""
                className="col-span-1 object-cover w-full aspect-square"
              />
              <img
                src={post.images?.[3]}
                alt=""
                className="col-span-1 object-cover w-full aspect-square"
              />
            </div>
          )}
        </div>
      </Link>
      <div className="flex justify-around mb-6 mt-3">
        <Like
          count={post.likeCount}
          byUser={post.likedByUser}
          postSerId={post.serialId}
        />
        <Reply />
        <Repost
          count={post.repostCount}
          byUser={post.repostedByUser}
          postSerId={post.serialId}
        />
        <Capture
          count={post.bookmarkCount}
          byUser={post.bookmarkedByUser}
          postSerId={post.serialId}
        />
      </div>
    </section>
  );
};

export default Echo;
