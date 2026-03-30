import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import LoginForm from "./../components/LoginForm";
import { login } from "./../api/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "./../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { queryClient } from "../main";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
}); 

function RouteComponent() {
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"], exact: true });
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
    <main className="min-h-screen flex justify-center items-center p-4">
      <section className="hidden md:block bg-gradient-to-br from-green-400 to-indigo-600 h-[600px] w-full max-w-[500px] rounded-l-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      </section>
      <div className="bg-[#111628] w-full max-w-[500px] md:h-[600px] py-10 md:py-0 rounded-3xl md:rounded-l-none md:rounded-r-3xl shadow-2xl flex justify-center items-center border-[1px] md:border-l-0 border-gray-800">
        <LoginForm
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          responseError={responseError}
          setResponseError={setResponseError}
        />
      </div>
    </main>
  );
}
