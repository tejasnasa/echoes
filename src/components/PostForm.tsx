import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { postSchema } from "../utils/definitions";

type PostFormProps = {
  onSubmit: SubmitHandler<z.infer<typeof postSchema>>;
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof postSchema>>;
  error: string | null;
};

const PostForm = ({ isPending, form, onSubmit, error }: PostFormProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <input {...register("text")} />
        {errors.text && <p>{errors.text.message}</p>}
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating post..." : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
