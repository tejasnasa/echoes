import logo from ".././assets/logos/logo2.jpg";
import { X, UploadCloud, Loader2 } from "lucide-react";
import { useCreatePost } from "../api/fetchPost";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal = ({ isOpen, onClose }: CreateModalProps) => {
  const {
    fileInputRef,
    previews,
    uploadingImages,
    isPending,
    watchText,
    register,
    handleSubmit,
    handleFileChange,
    removeImage,
    onSubmit,
  } = useCreatePost({ onClose: onClose });

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 z-30" onClick={onClose} />
      <img
        src={logo}
        alt=""
        className={`fixed left-1/2 -top-[60%] h-[1400px] -translate-x-1/2 opacity-70 transition-all duration-1000 object-cover z-40
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
            className="w-[500px] h-64 m-4 bg-inherit focus:outline-none min-h-32"
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
                  <Loader2 />
                </div>
              )}
            </div>
          )}

          <div className="m-4 absolute left-0 bottom-0">
            <label
              className={`cursor-pointer flex items-center gap-2 ${
                previews.length >= 4 ? "bg-gray-500 opacity-50" : "bg-gray-700 "
              } p-2 rounded-md max-w-fit`}
            >
              <UploadCloud size={24} />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
                disabled={previews.length >= 4}
              />
            </label>
          </div>

          <div
            className={`m-4 text-xl absolute right-0 bottom-0 ${watchText?.length && watchText?.length >= 100 ? "text-red-500" : "text-gray-400"}`}
          >
            {watchText?.length || 0}
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
