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
          className="w-full bg-transparent border-2 border-white rounded-xl p-3 my-2 mb-0 focus:outline-none h-32"
          placeholder="Echo back..."
        ></textarea>

        <div className="bg-[#111628] rounded-lg mx-auto relative">
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

          <div className="flex justify-between w-full">
            <div className="m-2">
              <label
                className={`cursor-pointer flex items-center gap-2 ${
                  previews.length >= 4
                    ? "bg-gray-500 opacity-50"
                    : "bg-gray-700 "
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
            <button
              className="bg-gradient-to-r from-green-400 to-indigo-600 px-6 py-3 rounded-3xl text-white mt-2 font-medium disabled:opacity-50"
              type="submit"
              disabled={isPending || uploadingImages}
            >
              {isPending
                ? "Echoing..."
                : uploadingImages
                  ? "Uploading Images..."
                  : "Submit"}
            </button>

            <div
              className={`m-3 text-xl ${watchText?.length && watchText?.length >= 100 ? "text-red-500" : "text-gray-400"}`}
            >
              {watchText?.length || 0}
            </div>
          </div>
        </div>
      </form>
      <div className="mt-4 mx-16">{posts?.map((post) => <Echo post={post} />)}</div>
    </section>
  );
};

export default ReplyBlock;
