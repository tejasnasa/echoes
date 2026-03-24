import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../utils/definitions";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logos/logo.png"

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
    <section className="flex flex-col items-center justify-between w-full px-4 sm:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[320px]">
        <div className="flex justify-center mb-4 items-center">
          <img src={logo} alt="Echoes" className="h-16 m-2" />
          <h2 className="text-4xl sm:text-5xl my-4 text-center font-bold bg-gradient-to-r from-green-400 to-indigo-600 bg-clip-text text-transparent pb-1">Login</h2>
        </div>
        

        <div className="flex flex-col mb-2">
          <label htmlFor="emailOrUsername" className="my-1 text-sm text-gray-300 ml-1">
            Email or Username
          </label>
          <input
            {...register("emailOrUsername")}
            id="emailOrUsername"
            placeholder="tejas@example.com"
            className="my-1 h-12 rounded-2xl w-full bg-black/40 focus:bg-black/60 focus:outline-none p-4 border-[1px] border-gray-700 focus:border-green-400 transition-colors"
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="password" className="my-1 text-sm text-gray-300 ml-1">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              id="password"
              className="my-1 h-12 rounded-2xl w-full bg-black/40 focus:bg-black/60 focus:outline-none p-4 pr-10 border-[1px] border-gray-700 focus:border-green-400 transition-colors"
              type={showPassword ? "text" : "password"}
            />
            <Eye
              onClick={() => setShowPassword((val) => !val)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors"
            />
          </div>
        </div>

        <Link to="/forgotpassword" className="text-sm text-gray-400 hover:text-white mt-3 mb-6 flex justify-end">Forgot Password?</Link>

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 bg-gradient-to-r from-green-400 to-indigo-600 px-8 py-3 w-full rounded-2xl mx-auto font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <div className="my-4 text-sm mx-auto text-red-400 text-center min-h-[20px]">
          {errors.emailOrUsername ? (
            <p>{errors.emailOrUsername.message}</p>
          ) : errors.password ? (
            <p>{errors.password.message}</p>
          ) : responseError ? (
            <p>{responseError}</p>
          ) : null}
        </div>
      </form>
      <div className="mx-auto mt-2 text-sm text-gray-300">
        Don't have an account?{" "}
        <Link to="/signup" className="text-green-400 font-medium hover:underline">
          Sign up
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
