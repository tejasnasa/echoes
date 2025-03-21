import { createFileRoute } from "@tanstack/react-router";
import { useAllPosts } from "../../api/fetchPost";
import Echo from "../../components/home/Echo";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useAllPosts();

  if (isLoading)
    return (
      <main className="mx-80 mt-4 h-dvh">
        <div className="loader">
          <div className="inner-circle"></div>
        </div>
      </main>
    );

  return (
    <main className="mx-72 mt-4 min-h-dvh">
      {data?.map((post) => <Echo post={post} />)}
    </main>
  );
}
