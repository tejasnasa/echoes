import { useMutation, useQueryClient } from "@tanstack/react-query";
import logo from ".././assets/logos/logo2.jpg";
import { useState } from "react";
import { createPost } from "../api/fetchPost";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postSchema } from "../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal = ({ isOpen, onClose }: CreateModalProps) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset({ text: "", images: [] });
      onClose();
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: { text: "", images: [] },
  });

  const onSubmit = (values: z.infer<typeof postSchema>) => {
    setError(null);
    mutate(values);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <img
        src={logo}
        alt=""
        className={`fixed left-1/2 -top-[60%] h-[1400px] -translate-x-1/2 opacity-70 transition-all duration-1000 object-cover
          ${isPending ? "scale-150" : "scale-100"}`}
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-fit flex flex-col items-center justify-center relative"
      >
        <div className="bg-[#111628] rounded-lg z-40 mx-4 relative w-fit">
          <textarea
            {...register("text")}
            name="text"
            className="w-[500px] h-64 m-4 bg-inherit focus:outline-none"
            placeholder="Echo your feelings to the world..."
          ></textarea>
          {errors.text && <p>{errors.text.message}</p>}
          {error && <p>{error}</p>}
        </div>
        <button
          className="bg-gradient-to-r from-green-400 to-indigo-600 px-3 py-2 rounded-3xl text-white mt-2"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Echoing...." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateModal;
