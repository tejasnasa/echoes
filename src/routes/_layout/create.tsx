import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createPost, fetchPosts } from "../../api/fetchPost";

export const Route = createFileRoute("/_layout/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

  // Mutations
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div>
      <ul>
        {query.data?.responseObject.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            images: [],
            text: "Do Laundry",
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
