import { useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "../utils/definitions";
import { Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "../assets/logos/logo.png"

type LoginFormProps = {
  onSubmit: SubmitHandler<z.infer<typeof signupSchema>>;
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof signupSchema>>;
  responseError: string | null;
  setResponseError: React.Dispatch<React.SetStateAction<string | null>>;
};

const SignupForm = ({
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
          <img src={logo} alt="Echoes" className="h-16" />
          <h2 className="text-4xl sm:text-5xl my-4 text-center font-bold bg-gradient-to-r from-green-400 to-indigo-600 bg-clip-text text-transparent pb-1">Register</h2>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="my-1 text-sm text-gray-300 ml-1">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            placeholder="tejas@example.com"
            className="my-1 h-12 rounded-2xl w-full bg-black/40 focus:bg-black/60 focus:outline-none p-4 border-[1px] border-gray-700 focus:border-green-400 transition-colors"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="my-1 text-sm text-gray-300 ml-1 mt-2">
            Username
          </label>
          <input
            {...register("username")}
            id="username"
            placeholder="tejasnasa"
            className="my-1 h-12 rounded-2xl w-full bg-black/40 focus:bg-black/60 focus:outline-none p-4 border-[1px] border-gray-700 focus:border-green-400 transition-colors"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fullname" className="my-1 text-sm text-gray-300 ml-1 mt-2">
            Fullname
          </label>
          <input
            {...register("fullname")}
            id="fullname"
            placeholder="Tejas Nasa"
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

        <button
          type="submit"
          disabled={isPending}
          className="mt-8 bg-gradient-to-r from-green-400 to-indigo-600 px-8 py-3 w-full rounded-2xl mx-auto font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20"
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>

        <div className="my-4 text-sm mx-auto text-red-400 text-center min-h-[20px]">
          {errors.email ? (
            <p>{errors.email.message}</p>
          ) : errors.username ? (
            <p>{errors.username.message}</p>
          ) : errors.fullname ? (
            <p>{errors.fullname.message}</p>
          ) : errors.password ? (
            <p>{errors.password.message}</p>
          ) : responseError ? (
            <p>{responseError}</p>
          ) : null}
        </div>
      </form>
      <div className="mx-auto mt-2 text-sm text-gray-300 mb-4 flex gap-1">
        Already have an account?{" "}
        <Link to="/login" className="text-green-400 font-medium hover:underline">
          Login
        </Link>
      </div>
    </section>
  );
};

export default SignupForm;
