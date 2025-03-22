import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { queryClient } from "../../main";
import { fetchPost } from "../../api/fetchPost";
import { fetchUser } from "../../api/user";
import pfp1 from "../../assets/pfp/1.jpg";
import pfp2 from "../../assets/pfp/2.avif";
import pfp3 from "../../assets/pfp/3.jpg";
import pfp4 from "../../assets/pfp/4.jpg";
import pfp5 from "../../assets/pfp/5.jpg";

const randomPic = () => {
  const pics = [pfp1, pfp2, pfp3, pfp4, pfp5];
  const randomIndex = Math.floor(Math.random() * pics.length);

  return pics[randomIndex];
};

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
            </section>
          ))}
      </section>
    </main>
  );
}
