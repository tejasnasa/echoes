import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchPost, useAllPosts } from "../../api/fetchPost";
import { fetchUser } from "../../api/user";
import logo from "../../assets/logos/logo.png";
import timeAgo from "../../utils/datetime";

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
    <div className="mx-64 mt-32">
      {data?.map((post) => (
        <div key={post.serialId} className="text-lg">
          <div className="flex justify-between">
            <Link
              to="/users/$userSerId"
              params={{ userSerId: String(post.user.serialId) }}
              onMouseEnter={() => prefetchUser(post.user.serialId)}
              className="flex items-center"
            >
              <img
                src={post.user.profile_pic || logo}
                alt=""
                className="h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{post.user.fullname}</h3>
                <h4 className="text-gray-300">@{post.user.username}</h4>
              </div>
            </Link>
            <div>{timeAgo(post.createdAt)}</div>
          </div>

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
