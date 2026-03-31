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

  const inputClass = "w-full h-12 mt-1 bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.05] focus:outline-none border border-white/[0.06] focus:border-green-400/30 rounded-xl px-4 pr-10 transition-all duration-200 text-sm";
  const labelClass = "text-xs text-gray-500 ml-1 uppercase tracking-wider font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[600px] gap-4">
      <div className="flex flex-col">
        <label className={labelClass}>Old Password</label>
        <div className="relative">
          <input
            {...register("oldPassword")}
            id="oldPassword"
            className={inputClass}
            type={showPassword1 ? "text" : "password"}
          />
          <Eye
            onClick={() => setShowPassword1((val) => !val)}
            size={18}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-300 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className={labelClass}>New Password</label>
        <div className="relative">
          <input
            {...register("newPassword1")}
            id="newPassword1"
            className={inputClass}
            type={showPassword2 ? "text" : "password"}
          />
          <Eye
            onClick={() => setShowPassword2((val) => !val)}
            size={18}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-300 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className={labelClass}>Confirm New Password</label>
        <div className="relative">
          <input
            {...register("newPassword2")}
            id="newPassword2"
            className={inputClass}
            type={showPassword3 ? "text" : "password"}
          />
          <Eye
            onClick={() => setShowPassword3((val) => !val)}
            size={18}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-300 transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 bg-gradient-to-r from-green-400 to-indigo-600 px-6 py-3 rounded-xl w-fit font-semibold text-sm disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/15 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        {isPending ? "Updating..." : "Update Password"}
      </button>

      <div className="text-xs text-red-400 text-center min-h-[16px]">
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
