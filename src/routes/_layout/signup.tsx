import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import SignupForm from "../../components/SignupForm";
import { signup } from "../../api/auth";

export const Route = createFileRoute("/_layout/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutations
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate({ to: "/home" });
    },
  });

  return (
    <SignupForm
      onSubmit={(formData) => mutate(formData)}
      isPending={isPending}
    />
  );
}
