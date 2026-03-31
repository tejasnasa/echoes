import { createFileRoute } from "@tanstack/react-router";
import { followUser, useUser } from "../../api/user";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAllPosts } from "../../api/fetchPost";
import Echo from "../../components/home/Echo";
import Loader from "../../components/Loader";

export const Route = createFileRoute("/_layout/u/$userSerId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userSerId } = Route.useParams();
  const { data, isLoading } = useUser(Number(userSerId));
  const { data: postData } = useAllPosts();

  const [isSynced, setIsSynced] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setIsSynced(data.isFollowing);
    }
  }, [data]);

  const handleFollow = async () => {
    if (loading) return;

    setLoading(true);
    const prev = isSynced;
    setIsSynced(!prev);

    try {
      const res = await followUser(Number(userSerId));
      if (res?.following !== undefined) {
        setIsSynced(res.following);
      }
    } catch (err) {
      setIsSynced(prev);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <main className="max-w-2xl mx-auto px-4 w-full mt-8 h-dvh flex justify-center">
        <Loader />
      </main>
    );

  return (
    <main className="min-h-dvh">


      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img
          src={
            data?.cover_pic ??
            "https://book.gettimely.com/images/default-cover-image.jpg"
          }
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-echo-bg/60 to-echo-bg"></div>
      </div>



      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-20 relative z-10 animate-fade-in-up">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">


            <img
              src={
                data?.profile_pic ??
                "https://i.pinimg.com/736x/f2/01/1b/f2011bfb4e87a2e5219bd4c2fb02a5e9.jpg"
              }
              alt=""
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-[3px] border-echo-bg object-cover ring-2 ring-green-400/20 shrink-0"
            />



            <div className="flex-1 text-center sm:text-left min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold">{data?.fullname}</h2>
              <h3 className="text-gray-500 text-lg mt-0.5">@{data?.username}</h3>

              {data?.bio && (
                <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-md">
                  {data.bio}
                </p>
              )}



              <div className="flex gap-5 mt-4 justify-center sm:justify-start">
                <Link to="/" className="group">
                  <span className="font-bold text-white group-hover:text-green-400 transition-colors">
                    {data?.followersCount}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">Synced</span>
                </Link>
                <div>
                  <span className="font-bold text-white">
                    {data?.postsCount}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">Echoes</span>
                </div>
              </div>
            </div>



            <div className="shrink-0">
              {!data?.isMe && (
                <button
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    isSynced
                      ? "bg-white/[0.06] border border-white/10 text-white hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-400"
                      : "bg-gradient-to-r from-green-400 to-indigo-600 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/15"
                  }`}
                  onClick={handleFollow}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  disabled={loading}
                >
                  {loading
                    ? "Syncing..."
                    : hovered
                      ? isSynced
                        ? "Unsync"
                        : "Sync"
                      : isSynced
                        ? "Synced"
                        : "Sync"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>



      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-400 mb-4">Echoes</h3>
        <div className="echo-stagger flex flex-col gap-4">
          {postData?.map((post) => <Echo key={post.serialId} post={post} />)}
        </div>
      </div>
    </main>
  );
}
