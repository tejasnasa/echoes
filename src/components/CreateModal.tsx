import { useMutation, useQueryClient } from "@tanstack/react-query";
import logo from ".././assets/logos/logo2.jpg";
import { useState, useRef } from "react";
import { createPost } from "../api/fetchPost";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postSchema } from "../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, UploadCloud, Loader2 } from "lucide-react";
import { uploadToCloudinary } from "../api/post";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal = ({ isOpen, onClose }: CreateModalProps) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: { text: "", images: [] },
  });

  const watchImages = watch("images");

  const { mutate: uploadImage } = useMutation({
    mutationFn: uploadToCloudinary,
    onSuccess: (url) => {
      const currentImages = watch("images") || [];
      setValue("images", [...currentImages, url]);
    },
  });

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset({ text: "", images: [] });
      setPreviews([]);
      onClose();
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const currentCount = previews.length;
    const selectedCount = files.length;

    if (currentCount + selectedCount > 4) {
      setError("Maximum 4 images allowed");
      return;
    }

    setUploadingImages(true);

    try {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews([...previews, ...newPreviews]);

      const uploadPromises = Array.from(files).map((file) => {
        return uploadImage(file);
      });

      await Promise.all(uploadPromises);
      setUploadingImages(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setError("Failed to upload images");
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const currentImages = [...watchImages];
    currentImages.splice(index, 1);
    setValue("images", currentImages);
  };

  const onSubmit = (values: z.infer<typeof postSchema>) => {
    setError(null);
    createPostMutation(values);
  };

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <img
        src={logo}
        alt=""
        className={`fixed left-1/2 -top-[60%] h-[1400px] -translate-x-1/2 opacity-70 transition-all duration-1000 object-cover
          ${isPending ? "scale-150" : "scale-100"}`}
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-fit flex flex-col items-center justify-center relative z-50"
      >
        <div className="bg-[#111628] rounded-lg z-40 mx-4 relative w-fit p-4">
          <textarea
            {...register("text")}
            name="text"
            className="w-[500px] h-64 m-4 bg-inherit focus:outline-none"
            placeholder="Echo your feelings to the world..."
          ></textarea>

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 m-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {uploadingImages && (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-700 rounded-md">
                  <Loader2 className="animate-spin" />
                </div>
              )}
            </div>
          )}

          {errors.text && (
            <p className="text-red-500 ml-4">{errors.text.message}</p>
          )}
          {errors.images && (
            <p className="text-red-500 ml-4">{errors.images.message}</p>
          )}
          {error && <p className="text-red-500 ml-4">{error}</p>}

          <div className="m-4">
            <label
              className={`cursor-pointer flex items-center gap-2 ${
                previews.length >= 4
                  ? "bg-gray-500 opacity-50"
                  : "bg-gray-700 hover:bg-gray-600"
              } p-2 rounded-md max-w-fit`}
            >
              <UploadCloud size={20} />
              <span>
                {previews.length >= 4 ? "Max images reached" : "Add Images"}
              </span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
                disabled={uploadingImages || previews.length >= 4}
              />
            </label>
          </div>
        </div>

        <button
          className="bg-gradient-to-r from-green-400 to-indigo-600 px-6 py-3 rounded-3xl text-white mt-4 font-medium disabled:opacity-50"
          type="submit"
          disabled={isPending || uploadingImages}
        >
          {isPending
            ? "Echoing..."
            : uploadingImages
              ? "Uploading Images..."
              : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default CreateModal;
