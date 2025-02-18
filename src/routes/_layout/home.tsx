import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchPost, useAllPosts } from "../../api/fetchPost";

export const Route = createFileRoute("/_layout/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useAllPosts();

  const prefetchPost = (postSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["post", postSerId],
      queryFn: () => fetchPost(postSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.responseObject.map((post) => (
        <div key={post.id} onMouseEnter={() => prefetchPost(post.serialId)}>
          <Link params={{ postSerId: String(post.serialId) }} to="/post/$postSerId">
            <h3>{post.user.fullname}</h3>
            <div>{post.text}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
