import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchPost, useAllPosts } from "../../api/fetchPost";
import { fetchUser } from "../../api/user";

export const Route = createFileRoute("/_layout/")({
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

  const prefetchUser = (userSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["user", userSerId],
      queryFn: () => fetchUser(userSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="dark:bg-black dark:text-white bg-white text-red-500">
      {data?.map((post) => (
        <div key={post.serialId}>
          <Link
            to="/users/$userSerId"
            params={{ userSerId: String(post.user.serialId) }}
            onMouseEnter={() => prefetchUser(post.user.serialId)}
          >
            <h3>{post.user.fullname}</h3>
          </Link>
          <Link
            params={{ postSerId: String(post.serialId) }}
            to="/post/$postSerId"
            onMouseEnter={() => prefetchPost(post.serialId)}
          >
            <div>{post.text}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
