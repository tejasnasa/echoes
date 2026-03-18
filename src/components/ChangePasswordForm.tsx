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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-4 w-2/3">
      <div className="relative">
        <input
          {...register("oldPassword")}
          id="oldPassword"
          className="m-4 bg-transparent border-[1px] border-gray-400"
          type={showPassword1 ? "text" : "password"}
        />
        <Eye
          onClick={() => setShowPassword1((val) => !val)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        />
      </div>
      <div className="relative">
        <input
          {...register("newPassword1")}
          id="newPassword1"
          className="m-4 bg-transparent border-[1px] border-gray-400"
          type={showPassword2 ? "text" : "password"}
        />
        <Eye
          onClick={() => setShowPassword2((val) => !val)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        />
      </div>
      <div className="relative">
        <input
          {...register("newPassword2")}
          id="newPassword2"
          className="m-4 bg-transparent border-[1px] border-gray-400"
          type={showPassword3 ? "text" : "password"}
        />
        <Eye
          onClick={() => setShowPassword3((val) => !val)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "..." : "Submit"}
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
