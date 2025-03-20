import { Link } from "@tanstack/react-router";
import { fetchPost, Post } from "../../api/fetchPost";
import { useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../../api/user";
import pfp1 from "../../assets/pfp/1.jpg";
import pfp2 from "../../assets/pfp/2.avif";
import pfp3 from "../../assets/pfp/3.jpg";
import pfp4 from "../../assets/pfp/4.jpg";
import pfp5 from "../../assets/pfp/5.jpg";
import { timeAgo } from "../../utils/datetime";
import { Ellipsis } from "lucide-react";
import Like from "../buttons/Like";
import Repost from "../buttons/Repost";
import Capture from "../buttons/Capture";
import Reply from "../buttons/Reply";

const randomPic = () => {
  const pics = [pfp1, pfp2, pfp3, pfp4, pfp5];
  const randomIndex = Math.floor(Math.random() * pics.length);

  return pics[randomIndex];
};

const Echo = ({ post }: { post: Post }) => {
  const queryClient = useQueryClient();

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
    <>
      <Link
        params={{ postSerId: String(post.serialId) }}
        to="/e/$postSerId"
        onMouseEnter={() => prefetchPost(post.serialId)}
        className="text-lg"
        key={post.serialId}
      >
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
              className=" m-4"
            />
            <Ellipsis />
          </div>
        </div>

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
      <div className="flex justify-around mb-6  qq mt-3">
        <Like />
        <Reply />
        <Repost />
        <Capture />
      </div>
    </>
  );
};

export default Echo;
