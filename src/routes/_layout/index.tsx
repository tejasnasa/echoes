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
    <main className="max-w-2xl mx-auto px-4 w-full mt-4 min-h-dvh">
      {data?.map((post) => <Echo key={post.id} post={post} />)}
    </main>
  );
}
