import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createPost } from "../../api/fetchPost";
import PostForm from "../../components/PostForm";
import { z } from "zod";
import { postSchema } from "../../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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

  const { register, handleSubmit } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: { text: "", images: [] },
  });

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      if (!values.usernameOrEmail || !values.password) {
        throw new Error("All fields are required.");
      }

      await mutate(formData);
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    }
  }

  return (
    <PostForm
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
