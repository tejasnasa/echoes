import { Loader2, UploadCloud, X } from "lucide-react";
import { useAllPosts, useCreatePost } from "../api/fetchPost";
import Echo from "./home/Echo";

const ReplyBlock = ({ postId }: { postId: string }) => {
  const { data } = useAllPosts();
  const posts = data?.filter((post) => post.postAboveId === postId);
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
  } = useCreatePost({ postId: postId });

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <textarea
          {...register("text")}
          name="text"
          className="w-full bg-white/[0.02] border border-white/[0.06] focus:border-green-400/30 rounded-xl p-4 my-2 mb-0 focus:outline-none h-28 resize-none text-sm placeholder:text-gray-600 transition-all duration-200"
          placeholder="Echo back..."
        ></textarea>

        <div className="rounded-lg mx-auto relative">
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded-lg"
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
                <div className="w-20 h-20 flex items-center justify-center bg-white/[0.04] rounded-lg">
                  <Loader2 className="animate-spin text-gray-500" size={18} />
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center w-full mt-3">
            <label
              className={`cursor-pointer flex items-center gap-2 ${
                previews.length >= 4
                  ? "bg-white/[0.03] opacity-40"
                  : "bg-white/[0.05] hover:bg-white/[0.08]"
              } p-2 rounded-lg transition-all duration-200`}
            >
              <UploadCloud size={20} />
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

            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-medium ${
                  watchText?.length && watchText?.length >= 100 ? "text-red-400" : "text-gray-600"
                }`}
              >
                {watchText?.length || 0}
              </span>
              <button
                className="bg-gradient-to-r from-green-400 to-indigo-600 px-5 py-2 rounded-xl text-white text-sm font-medium disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/10 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                type="submit"
                disabled={isPending || uploadingImages}
              >
                {isPending
                  ? "Echoing..."
                  : uploadingImages
                    ? "Uploading..."
                    : "Reply"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-6 echo-stagger flex flex-col gap-4">
        {posts?.map((post) => <Echo key={post.serialId} post={post} />)}
      </div>
    </section>
  );
};

export default ReplyBlock;
