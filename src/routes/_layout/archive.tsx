import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import ImageGrid from "../../components/ImageGrid";
import randomPic from "../../utils/temp/randomPic";
import { prefetchPost, prefetchUser } from "../../api/misc";

export const Route = createFileRoute("/_layout/archive")({
  component: RouteComponent,
});

interface Post {
  serialId: number;
  text: string;
  images: string[];
  postAboveId: string;
  user: {
    serialId: number;
    username: string;
    profile_pic: string;
  };
}

function RouteComponent() {
  const { data: captures, isLoading: captureLoading } = useQuery<Post[]>({
    queryKey: ["captures"],
    queryFn: async () => {
      return fetch(`${import.meta.env.VITE_BASE_URL}/bookmark`, {
        credentials: "include",
      })
        .then((data) => data.json())
        .then((data) => data.responseObject);
    },
  });

  const { data: resonates, isLoading: resonateLoading } = useQuery<Post[]>({
    queryKey: ["resonates"],
    queryFn: async () => {
      return fetch(`${import.meta.env.VITE_BASE_URL}/like`, {
        credentials: "include",
      })
        .then((data) => data.json())
        .then((data) => data.responseObject);
    },
  });

  const [tab, setTab] = useState<"captures" | "resonates">("captures");

  if (captureLoading || resonateLoading)
    return (
      <main className="max-w-2xl mx-auto px-4 w-full mt-4 h-dvh flex justify-center">
        <Loader />
      </main>
    );

  const posts = tab === "captures" ? captures : resonates;

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 w-full pt-6 flex flex-col min-h-dvh">
      <div className="wave-header pb-4 mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-indigo-500 bg-clip-text text-transparent">
          Archive
        </h1>
        <p className="text-xs text-gray-600 mt-1">Your saved echoes and resonances</p>
      </div>



      <div className="flex gap-1 bg-white/[0.03] rounded-xl p-1 mb-6">
        <button
          onClick={() => setTab("captures")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
            tab === "captures"
              ? "bg-white/[0.08] text-white shadow-sm"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Captures
        </button>
        <button
          onClick={() => setTab("resonates")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
            tab === "resonates"
              ? "bg-white/[0.08] text-white shadow-sm"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Resonates
        </button>
      </div>



      <div className="echo-stagger flex flex-col gap-4">
        {posts?.map((post) => (
          <article
            key={post.serialId}
            className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/[0.08] rounded-2xl p-5 transition-all duration-300"
          >
            {post.postAboveId && (
              <div className="text-xs text-gray-500 mb-3 flex items-center gap-2 uppercase tracking-wider">
                <span className="w-4 h-px bg-gray-600"></span>
                Replying to a thread
              </div>
            )}
            <Link
              to="/u/$userSerId"
              params={{ userSerId: String(post.user.serialId) }}
              onMouseEnter={() => prefetchUser(post.user.serialId)}
              className="flex items-center gap-3 mb-3 group"
            >
              <img
                src={post.user.profile_pic || randomPic()}
                alt=""
                className="h-9 w-9 rounded-full object-cover border border-white/10 group-hover:border-green-400/40 transition-all duration-200"
              />
              <span className="text-sm text-gray-400 group-hover:text-green-400 transition-colors">
                @{post.user.username}
              </span>
            </Link>
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
          </article>
        ))}
      </div>
    </main>
  );
}
