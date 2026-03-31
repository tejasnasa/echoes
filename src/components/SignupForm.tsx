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

  const inputClass = "h-12 rounded-xl w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.06] focus:outline-none px-4 border border-white/[0.06] focus:border-green-400/40 transition-all duration-200 text-sm placeholder:text-gray-600";
  const labelClass = "text-xs text-gray-500 ml-1 mb-1.5 uppercase tracking-wider font-medium";

  return (
    <section className="flex flex-col items-center justify-between w-full px-4 sm:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[320px]">
        <div className="flex justify-center mb-5 items-center gap-2">
          <img src={logo} alt="Echoes" className="h-14" />
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 to-indigo-600 bg-clip-text text-transparent">Register</h2>
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            {...register("email")}
            id="email"
            placeholder="tejas@example.com"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="username" className={labelClass}>Username</label>
          <input
            {...register("username")}
            id="username"
            placeholder="tejasnasa"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="fullname" className={labelClass}>Full Name</label>
          <input
            {...register("fullname")}
            id="fullname"
            placeholder="Tejas Nasa"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col mt-1">
          <label htmlFor="password" className={labelClass}>Password</label>
          <div className="relative">
            <input
              {...register("password")}
              id="password"
              className={`${inputClass} pr-10`}
              type={showPassword ? "text" : "password"}
            />
            <Eye
              onClick={() => setShowPassword((val) => !val)}
              size={18}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-300 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-7 btn-glow bg-gradient-to-r from-green-400 to-indigo-600 px-8 py-3 w-full rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/15 active:translate-y-0 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>

        <div className="my-4 text-xs mx-auto text-red-400 text-center min-h-[20px]">
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
      <div className="mx-auto mt-2 text-sm text-gray-500 mb-4 flex gap-1">
        Already have an account?{" "}
        <Link to="/login" className="text-green-400 font-medium hover:underline">
          Login
        </Link>
      </div>
    </section>
  );
};

export default SignupForm;
