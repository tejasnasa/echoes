import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "../../api/user";

export const Route = createFileRoute("/_layout/users/$userSerId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userSerId } = Route.useParams();
  const { data, isLoading } = useUser(Number(userSerId));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>{data?.fullname}</h3>
      <div>{data?.username}</div>
      <div>{data?.bio}</div>
    </div>
  );
}
