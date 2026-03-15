import { Link } from "@tanstack/react-router";
import { Post } from "../../api/fetchPost";
import { timeAgo } from "../../utils/datetime";
import Like from "../buttons/Like";
import Repost from "../buttons/Repost";
import Capture from "../buttons/Capture";
import Reply from "../buttons/Reply";
import ShareOptions from "./ShareOptions";
import ImageGrid from "../ImageGrid";
import randomPic from "../../utils/temp/randomPic";
import { prefetchPost, prefetchUser } from "../../utils/prefetch";

const Echo = ({ post }: { post: Post }) => {
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
          <ShareOptions serialId={post.serialId} />
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
          <ImageGrid images={post.images} />
        </div>
      </Link>
      <div className="flex justify-around mb-6 mt-3">
        <Like
          count={post.likeCount}
          byUser={post.likedByUser}
          postSerId={post.serialId}
        />
        <Reply postSerId={post.serialId} />
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
