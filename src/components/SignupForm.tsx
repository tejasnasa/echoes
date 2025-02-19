import { SubmitHandler, useForm } from "react-hook-form";

type SignupFormInputs = {
  email: string;
  password: string;
  username: string;
  fullname: string;
};

const SignupForm = ({
  onSubmit,
  isPending,
}: {
  onSubmit: SubmitHandler<SignupFormInputs>;
  isPending: boolean;
}) => {
  const { register, handleSubmit } = useForm<SignupFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      fullname: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("email")} placeholder="email" />
      <input type="text" {...register("password")} placeholder="password" />
      <input type="text" {...register("username")} placeholder="username" />
      <input type="text" {...register("fullname")} placeholder="fullname" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default SignupForm;
