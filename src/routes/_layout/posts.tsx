import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "../../api/fetchPost";

export const Route = createFileRoute("/_layout/posts")({
  component: RouteComponent,
});

function RouteComponent() {

  // Queries
  const query = useQuery({ queryKey: ["posts"], queryFn: getPosts });
  return (
    <div>
      Hello "/_layout/posts"!
      <section>
        {query.data?.map((post) => (
          <div key={post.id}>
            <h1>{post.user}</h1>
            <p>{post.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
