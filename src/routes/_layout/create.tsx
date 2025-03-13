import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createPost } from "../../api/fetchPost";
import PostForm from "../../components/PostForm";
import { z } from "zod";
import { postSchema } from "../../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_layout/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate({ to: "/" });
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: { text: "", images: [] },
  });

  const onSubmit = (values: z.infer<typeof postSchema>) => {
    setError(null);
    mutate(values);
  };

  return (
    <PostForm
      form={form}
      isPending={isPending}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
