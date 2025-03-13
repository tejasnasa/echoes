import { createFileRoute } from "@tanstack/react-router";
import { useAllPosts } from "../../api/fetchPost";
import "../../utils/loader";
import Echo from "../../components/home/Echo";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useAllPosts();

  if (isLoading)
    return (
      <div className="mx-72 mt-4 h-dvh">
        <div className="loader">
          <div className="inner-circle"></div>
        </div>
      </div>
    );

  return (
    <div className="mx-72 mt-4">
      {data?.map((post) => <Echo post={post} />)}
    </div>
  );
}
