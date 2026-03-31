import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import SignupForm from "./../components/SignupForm";
import { signup } from "./../api/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signupSchema } from "../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: (error) => {
      setResponseError(error.message);
    },
  });

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", username: "", fullname: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    mutate(values);
  };

  return (
    <main className="min-h-screen flex justify-center items-center p-4 py-10">


      <section className="auth-orb hidden md:flex bg-gradient-to-br from-green-400 to-indigo-600 h-[700px] w-full max-w-[500px] rounded-l-3xl shadow-2xl relative overflow-hidden items-center justify-center">
        <div className="relative z-10 text-center px-10">
          <h2 className="text-4xl font-bold text-white/90 mb-3">Join Echoes</h2>
          <p className="text-white/60 text-lg">Amplify your voice</p>
        </div>
      </section>


      <div className="bg-echo-bg w-full max-w-[500px] md:h-[700px] py-10 md:py-0 rounded-3xl md:rounded-l-none md:rounded-r-3xl shadow-2xl flex justify-center items-center border border-white/[0.06] md:border-l-0">
        <SignupForm
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
