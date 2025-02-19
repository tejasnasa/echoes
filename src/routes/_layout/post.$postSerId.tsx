import { createFileRoute } from "@tanstack/react-router";
import { usePost } from "../../api/fetchPost";

export const Route = createFileRoute("/_layout/post/$postSerId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postSerId } = Route.useParams();
  const { data, isLoading } = usePost(Number(postSerId));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>{data?.user.fullname}</h3>
      <div>{data?.text}</div>
    </div>
  );
}
