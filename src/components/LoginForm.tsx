import { SubmitHandler, useForm } from "react-hook-form";

type LoginFormInputs = {
  emailOrUsername: string;
  password: string;
};

const LoginForm = ({
  onSubmit,
  isPending,
}: {
  onSubmit: SubmitHandler<LoginFormInputs>;
  isPending: boolean;
}) => {
  const { register, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("emailOrUsername")} />
      <input type="text" {...register("password")} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
