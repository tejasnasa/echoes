
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/posts")({
  component: RouteComponent,
});

function RouteComponent() {

  // Queries
  return (
    <div>
      Hello "/_layout/posts"
    </div>
  );
}
