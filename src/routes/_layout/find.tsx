import { createFileRoute, Link } from "@tanstack/react-router";
import { useAllUsers } from "../../api/user";
import { prefetchUser } from "../../utils/prefetch";

export const Route = createFileRoute("/_layout/find")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useAllUsers();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-dvh">
      {data?.map((user) => (
        <div
          key={user.serialId}
          onMouseEnter={() => prefetchUser(user.serialId)}
        >
          <Link
            to="/u/$userSerId"
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
