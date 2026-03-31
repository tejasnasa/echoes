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
import { prefetchPost, prefetchUser } from "../../api/misc";

const Echo = ({ post }: { post: Post }) => {
  return (
    <article className="echo-card group/card bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/[0.08] rounded-2xl pl-6 pr-5 py-5 transition-all duration-300 relative overflow-hidden">


      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

      {post.postAboveId && (
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-wider">
          <span className="w-4 h-px bg-gray-600"></span>
          Replying to a thread
        </div>
      )}



      <div className="flex items-center justify-between mb-3">
        <Link
          to="/u/$userSerId"
          params={{ userSerId: String(post.user.serialId) }}
          onMouseEnter={() => prefetchUser(post.user.serialId)}
          className="flex items-center gap-3 group/user min-w-0"
        >
          <img
            src={post.user.profile_pic || randomPic()}
            alt=""
            className="h-9 w-9 rounded-full object-cover border border-white/10 group-hover/user:border-green-400/40 transition-all duration-200 shrink-0"
          />
          <div className="min-w-0">
            <span className="font-semibold text-sm group-hover/user:text-green-400 transition-colors duration-200">
              {post.user.fullname}
            </span>
            <span className="text-gray-500 text-sm ml-2">@{post.user.username}</span>
          </div>
        </Link>
        <div className="flex items-center gap-1 text-gray-600 text-xs shrink-0">
          <div
            dangerouslySetInnerHTML={{ __html: timeAgo(post.createdAt) }}
            className="hover:text-gray-400 transition-colors"
          />
          <ShareOptions serialId={post.serialId} />
        </div>
      </div>



      <Link
        params={{ postSerId: String(post.serialId) }}
        to="/e/$postSerId"
        onMouseEnter={() => prefetchPost(post.serialId)}
        key={post.serialId}
        className="block"
      >
        <p className="text-[1.05rem] leading-relaxed text-gray-200 break-words">
          {post.text}
        </p>
        <div className="mt-3">
          <ImageGrid images={post.images} />
        </div>
      </Link>



      <div className="post-divider mt-4 mb-3"></div>
      <div className="flex items-center justify-around">
        <Like count={post.likeCount} byUser={post.likedByUser} postSerId={post.serialId} />
        <Reply postSerId={post.serialId} count={post.replyCount} />
        <Repost count={post.repostCount} byUser={post.repostedByUser} postSerId={post.serialId} />
        <Capture count={post.bookmarkCount} byUser={post.bookmarkedByUser} postSerId={post.serialId} />
      </div>
    </article>
  );
};

export default Echo;
