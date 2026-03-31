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


      <section className="auth-orb hidden md:flex bg-gradient-to-br from-green-400 to-indigo-600 h-[600px] w-full max-w-[500px] rounded-l-3xl shadow-2xl relative overflow-hidden items-center justify-center">
        <div className="relative z-10 text-center px-10">
          <h2 className="text-4xl font-bold text-white/90 mb-3">Welcome Back</h2>
          <p className="text-white/60 text-lg">Your echoes are waiting</p>
        </div>
      </section>


      <div className="bg-echo-bg w-full max-w-[500px] md:h-[600px] py-10 md:py-0 rounded-3xl md:rounded-l-none md:rounded-r-3xl shadow-2xl flex justify-center items-center border border-white/[0.06] md:border-l-0">
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
