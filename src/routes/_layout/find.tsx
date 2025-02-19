import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { fetchUser, useAllUsers } from "../../api/user";

export const Route = createFileRoute("/_layout/find")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useAllUsers();

  const prefetchUser = (userSerId: number) => {
    queryClient.prefetchQuery({
      queryKey: ["user", userSerId],
      queryFn: () => fetchUser(userSerId),
      staleTime: 5 * 60 * 1000,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((user) => (
        <div
          key={user.serialId}
          onMouseEnter={() => prefetchUser(user.serialId)}
        >
          <Link
            to="/users/$userSerId"
            params={{ userSerId: String(user.serialId) }}
          >
            <h3>{user.fullname}</h3>
            <h4>{user.username}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
}
