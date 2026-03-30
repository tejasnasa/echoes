import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { newPasswordSchema } from "../utils/definitions";
import { useState } from "react";
import { Eye } from "lucide-react";

type ChangePasswordFormProps = {
  onSubmit: SubmitHandler<z.infer<typeof newPasswordSchema>>;
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof newPasswordSchema>>;
  responseError: string | null;
  setResponseError: React.Dispatch<React.SetStateAction<string | null>>;
};

const ChangePasswordForm = ({
  isPending,
  form,
  onSubmit,
  responseError,
  setResponseError,
}: ChangePasswordFormProps) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-4 w-full md:w-2/3 max-w-[600px] gap-4">
      <div className="relative flex flex-col">
        <label className="text-sm text-gray-400 ml-1">Old Password</label>
        <div className="relative">
          <input
            {...register("oldPassword")}
            id="oldPassword"
            className="w-full h-12 mt-1 bg-inherit focus:outline-none border-[1px] border-gray-600 focus:border-green-400 rounded-xl p-4 pr-10 transition-colors"
            type={showPassword1 ? "text" : "password"}
          />
          <Eye
            onClick={() => setShowPassword1((val) => !val)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
          />
        </div>
      </div>
      <div className="relative flex flex-col">
        <label className="text-sm text-gray-400 ml-1">New Password</label>
        <div className="relative">
          <input
            {...register("newPassword1")}
            id="newPassword1"
            className="w-full h-12 mt-1 bg-inherit focus:outline-none border-[1px] border-gray-600 focus:border-green-400 rounded-xl p-4 pr-10 transition-colors"
            type={showPassword2 ? "text" : "password"}
          />
          <Eye
            onClick={() => setShowPassword2((val) => !val)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
          />
        </div>
      </div>
      <div className="relative flex flex-col">
        <label className="text-sm text-gray-400 ml-1">Confirm New Password</label>
        <div className="relative">
          <input
            {...register("newPassword2")}
            id="newPassword2"
            className="w-full h-12 mt-1 bg-inherit focus:outline-none border-[1px] border-gray-600 focus:border-green-400 rounded-xl p-4 pr-10 transition-colors"
            type={showPassword3 ? "text" : "password"}
          />
          <Eye
            onClick={() => setShowPassword3((val) => !val)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
          />
        </div>
      </div>
      <button 
        type="submit" 
        disabled={isPending}
        className="mt-6 bg-gradient-to-r from-green-400 to-indigo-600 px-6 py-3 rounded-2xl w-fit font-semibold disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Submit"}
      </button>
      <div className="my-4 text-md mx-auto text-red-400">
        {errors.oldPassword ? (
          <p>{errors.oldPassword.message}</p>
        ) : errors.newPassword1 ? (
          <p>{errors.newPassword1.message}</p>
        ) : responseError ? (
          <p>{responseError}</p>
        ) : null}
      </div>
    </form>
  );
};

export default ChangePasswordForm;
