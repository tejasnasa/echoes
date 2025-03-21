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
      <main className="mx-80 mt-8 h-dvh">
        <Loader />
      </main>
    );

  return (
    <main className="mx-72 mt-4 min-h-dvh">
      {data?.map((post) => <Echo key={post.id} post={post} />)}
    </main>
  );
}
