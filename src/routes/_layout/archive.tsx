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

  const viewCaptures = () => {
    setTab("captures");
  };

  const viewresonates = () => {
    setTab("resonates");
  };

  if (captureLoading || resonateLoading)
    return (
      <main className="mx-72 mt-4 h-dvh">
        <Loader />
      </main>
    );

  return (
    <main className="mx-72 mt-4 flex flex-col min-h-dvh">
      <div className="flex justify-around text-2xl">
        <button
          onClick={viewCaptures}
          className={`w-5/12 pb-2 ${tab === "captures" ? "border-b-4 " : "border-b-[1px]"}`}
        >
          Captures
        </button>
        <button
          onClick={viewresonates}
          className={`w-5/12 pb-2 ${tab === "resonates" ? "border-b-4 " : "border-b-[1px]"}`}
        >
          Resonates
        </button>
      </div>
      <section>
        {tab === "captures" &&
          captures?.map((post) => (
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
                  <h4>@{post.user.username}</h4>
                </Link>
              </div>
              <Link
                params={{ postSerId: String(post.serialId) }}
                to="/e/$postSerId"
                onMouseEnter={() => prefetchPost(post.serialId)}
                className="text-lg"
                key={post.serialId}
              >
                <div className="mt-4 break-words">{post.text}</div>
                <ImageGrid images={post.images} />
              </Link>
            </section>
          ))}
        {tab === "resonates" &&
          resonates?.map((post) => (
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
                    <h4 className="text-gray-300">@{post.user.username}</h4>
                  </div>
                </Link>
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
            </section>
          ))}
      </section>
    </main>
  );
}
