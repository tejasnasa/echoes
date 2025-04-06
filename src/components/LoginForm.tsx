import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../utils/definitions";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { useState } from "react";

type LoginFormProps = {
  onSubmit: SubmitHandler<z.infer<typeof loginSchema>>;
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof loginSchema>>;
  responseError: string | null;
  setResponseError: React.Dispatch<React.SetStateAction<string | null>>;
};

const LoginForm = ({
  isPending,
  form,
  onSubmit,
  responseError,
  setResponseError,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = form;

  watch(() => {
    if (responseError) setResponseError(null);
  });

  return (
    <section className="flex flex-col items-center h-2/3 justify-between">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-12 flex flex-col">
        <h2 className="text-5xl my-8 mt-12">Login</h2>

        <div className="flex flex-col mb-2">
          <label htmlFor="emailOrUsername" className="my-1">
            Email or Username
          </label>
          <input
            {...register("emailOrUsername")}
            id="emailOrUsername"
            placeholder="tejas@example.com"
            className="my-2 h-12 rounded-2xl w-80 bg-transparent focus:outline-none p-2 border-2 border-white"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="my-1">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              id="password"
              className="my-2 h-12 rounded-2xl w-80 bg-transparent focus:outline-none p-2 pr-10 border-2 border-white"
              type={showPassword ? "text" : "password"}
            />
            <Eye
              onClick={() => setShowPassword((val) => !val)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
        </div>

        <Link to="/forgotpassword">Forgot Password?</Link>

        <button
          type="submit"
          disabled={isPending}
          className="mt-10 bg-gradient-to-r from-green-400 to-indigo-600 px-4 py-2 text-xl w-fit rounded-xl mx-auto"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <div className="my-4 text-md mx-auto text-red-400">
          {errors.emailOrUsername ? (
            <p>{errors.emailOrUsername.message}</p>
          ) : errors.password ? (
            <p>{errors.password.message}</p>
          ) : responseError ? (
            <p>{responseError}</p>
          ) : null}
        </div>
      </form>
      <div className="mx-auto">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#4BCC8C]">
          Sign up
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
