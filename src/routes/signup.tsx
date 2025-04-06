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
    <main className="h-dvh flex justify-center items-center">
      <section className="bg-green-400 h-5/6 w-[500px]"></section>
      <SignupForm
        form={form}
        isPending={isPending}
        onSubmit={onSubmit}
        responseError={responseError}
        setResponseError={setResponseError}
      />
    </main>
  );
}
