import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createPost } from "../../api/fetchPost";
import PostForm from "../../components/PostForm";

export const Route = createFileRoute("/_layout/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutations
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate({ to: "/home" });
    },
  });

  return (
    <PostForm
      onSubmit={(formData) => mutate(formData)}
      isPending={isPending}
    />
  );
}
