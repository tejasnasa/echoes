import { createFileRoute } from "@tanstack/react-router";
import { fetchPost } from "../../api/fetchPost";

export const Route = createFileRoute("/_layout/post/$postId")({
  // In a loader
  loader: ({ params }) => fetchPost(params.postId),
  // Or in a component
  component: PostComponent,
});

function PostComponent() {
  // In a component!
  const { postId } = Route.useParams();
  return <div>Post ID: {postId}</div>;
}
