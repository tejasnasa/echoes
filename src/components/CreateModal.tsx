import logo from ".././assets/logos/logo2.jpg";
import { X, Loader2, ImageUp } from "lucide-react";
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


      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-modal-in z-30" onClick={onClose} />


      <img
        src={logo}
        alt=""
        className={`fixed left-1/2 -top-[60%] h-[1400px] -translate-x-1/2 opacity-60 transition-all duration-1000 object-cover z-40 ${
          isPending ? "scale-150" : "scale-100"
        }`}
        onClick={onClose}
      />


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[600px] flex flex-col items-center justify-center relative z-50 px-4 animate-modal-in"
      >
        <div className="bg-echo-bg/95 backdrop-blur-xl rounded-2xl z-40 relative w-full p-6 shadow-2xl border border-white/[0.08]">
          <textarea
            {...register("text")}
            name="text"
            className="w-full h-48 sm:h-64 mb-16 bg-transparent focus:outline-none min-h-32 resize-none text-xl md:text-2xl placeholder-gray-600"
            placeholder="Echo your feelings to the world..."
          ></textarea>

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 m-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {uploadingImages && (
                <div className="w-24 h-24 flex items-center justify-center bg-white/[0.05] rounded-lg">
                  <Loader2 className="animate-spin text-gray-400" />
                </div>
              )}
            </div>
          )}

          <div className="absolute left-6 bottom-4">
            <label
              className={`cursor-pointer flex items-center gap-2 ${
                previews.length >= 4 ? "bg-white/[0.03] opacity-40" : "bg-white/[0.06] hover:bg-white/[0.1]"
              } p-2.5 rounded-xl transition-all duration-200`}
            >
              <ImageUp size={22} />
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
            className={`absolute right-6 bottom-5 text-sm font-medium ${
              watchText?.length && watchText?.length >= 100 ? "text-red-400" : "text-gray-600"
            }`}
          >
            {watchText?.length || 0}
          </div>
        </div>

        <button
          className="btn-glow bg-gradient-to-r from-green-400 to-indigo-600 px-8 py-3 rounded-xl text-white mt-4 font-medium disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/15 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
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
