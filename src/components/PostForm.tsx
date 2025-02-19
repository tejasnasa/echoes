import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSchema } from "../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
