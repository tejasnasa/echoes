import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../utils/definitions";

type PostFormProps = {
  onSubmit: SubmitHandler<z.infer<typeof loginSchema>>;
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof loginSchema>>;
  responseError: string | null;
  setResponseError: React.Dispatch<React.SetStateAction<string | null>>
};

const PostForm = ({
  isPending,
  form,
  onSubmit,
  responseError,
  setResponseError
}: PostFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch
  } = form;

  watch(() => {
    if (responseError) setResponseError(null);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("emailOrUsername")} />
      </div>
      <div>
        <input {...register("password")} />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating post..." : "Create Post"}
      </button>

      {errors.emailOrUsername ? (
        <p>{errors.emailOrUsername.message}</p>
      ) : errors.password ? (
        <p>{errors.password.message}</p>
      ) : responseError ? (
        <p>{responseError}</p>
      ) : null}
    </form>
  );
};

export default PostForm;
