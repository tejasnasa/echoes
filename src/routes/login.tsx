import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import LoginForm from "./../components/LoginForm";
import { login } from "./../api/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "./../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
}); 

function RouteComponent() {
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: (error) => {
      setResponseError(error.message);
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrUsername: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values);
  };

  return (
    <main className="h-dvh flex justify-center items-center">
      <section className="bg-green-400 h-2/3 w-[500px]"></section>
      <LoginForm
        form={form}
        isPending={isPending}
        onSubmit={onSubmit}
        responseError={responseError}
        setResponseError={setResponseError}
      />
    </main>
  );
}
