import { createFileRoute } from "@tanstack/react-router";
import { useAllPosts } from "../../api/fetchPost";
import Echo from "../../components/home/Echo";
import Loader from "../../components/Loader";

export const Route = createFileRoute("/_layout/explore")({
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
    <div className="mx-72 mt-4">
      {data?.map((post) => <Echo post={post} />)}
    </div>
  );
}
