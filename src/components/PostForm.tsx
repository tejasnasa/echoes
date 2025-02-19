import { SubmitHandler, useForm } from "react-hook-form";

type PostFormInputs = {
  text: string;
  images: string[];
};

const PostForm = ({
  onSubmit,
  isPending,
}: {
  onSubmit: SubmitHandler<PostFormInputs>;
  isPending: boolean;
}) => {
  const { register, handleSubmit } = useForm<PostFormInputs>({
    defaultValues: { text: "", images: [] },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("text")} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default PostForm;
