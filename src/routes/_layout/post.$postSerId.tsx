import { createFileRoute } from "@tanstack/react-router";
import { usePost } from "../../api/fetchPost";

export const Route = createFileRoute("/_layout/post/$postSerId")({
  component: PostComponent,
});

function PostComponent() {
  const { postSerId } = Route.useParams();
  const { data, isLoading } = usePost(Number(postSerId));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>{data?.responseObject.user.fullname}</h3>
      <div>{data?.responseObject.text}</div>
    </div>
  );
}
