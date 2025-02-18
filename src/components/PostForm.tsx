import { SubmitHandler, useForm } from "react-hook-form";

type LoginFormInputs = {
  text: string;
  images: string[];
};

const PostForm = ({
  user,
  onSubmit,
  isPending,
}: {
  user: LoginFormInputs;
  onSubmit: SubmitHandler<LoginFormInputs>;
  isPending: boolean;
}) => {
  const { register, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: user,
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
