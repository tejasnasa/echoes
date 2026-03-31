import { createFileRoute } from "@tanstack/react-router";
import { useAllPosts } from "../../api/fetchPost";
import Echo from "../../components/home/Echo";
import Loader from "../../components/Loader";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useAllPosts();

  if (isLoading)
    return (
      <main className="max-w-2xl mx-auto px-4 w-full mt-8 h-dvh flex justify-center">
        <Loader />
      </main>
    );

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 w-full pt-6 min-h-dvh">


      <div className="wave-header pb-4 mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-indigo-500 bg-clip-text text-transparent">
          Your Feed
        </h1>
        <p className="text-xs text-gray-600 mt-1">Hear the latest echoes from your circle</p>
      </div>

      <div className="echo-stagger flex flex-col gap-4">
        {data?.map((post) => <Echo key={post.id} post={post} />)}
      </div>
    </main>
  );
}
