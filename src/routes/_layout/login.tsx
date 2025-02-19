import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import LoginForm from '../../components/LoginForm';
import { login } from '../../api/auth';

export const Route = createFileRoute('/_layout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutations
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate({ to: "/home" });
    },
  });

  return (
    <LoginForm
      onSubmit={(formData) => mutate(formData)}
      isPending={isPending}
    />
  );
}