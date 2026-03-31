import { useUpdateProfile } from "../api/user";

const UpdateProfileForm = ({ onClose }: { onClose?: () => void }) => {
  const {
    profilePreview,
    coverPreview,
    uploadingImages,
    isPending,
    register,
    handleSubmit,
    handleProfilePicChange,
    handleCoverPicChange,
    onSubmit,
  } = useUpdateProfile({ onClose });

  const labelClass = "text-xs text-gray-500 uppercase tracking-wider font-medium mb-2 block";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-[600px]">
      <div className="mb-5">
        <label htmlFor="bio" className={labelClass}>Bio</label>
        <textarea
          {...register("bio")}
          className="w-full h-28 bg-white/[0.02] focus:bg-white/[0.04] border border-white/[0.06] focus:border-green-400/30 focus:outline-none resize-none p-4 rounded-xl text-sm placeholder:text-gray-600 transition-all duration-200"
          placeholder="Tell the world about yourself..."
        />
      </div>

      <div className="mb-5 p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
        <label className="cursor-pointer flex items-center gap-3 text-sm text-gray-400 hover:text-green-400 transition-colors">
          <span className="bg-white/[0.06] px-3 py-1.5 rounded-lg text-xs font-medium">Choose file</span>
          Update profile picture
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />
        </label>
        {profilePreview && (
          <img
            src={profilePreview}
            alt="Profile preview"
            className="mt-3 w-16 h-16 rounded-full object-cover border border-white/10"
          />
        )}
      </div>

      <div className="mb-5 p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
        <label className="cursor-pointer flex items-center gap-3 text-sm text-gray-400 hover:text-green-400 transition-colors">
          <span className="bg-white/[0.06] px-3 py-1.5 rounded-lg text-xs font-medium">Choose file</span>
          Update cover picture
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverPicChange}
            className="hidden"
          />
        </label>
        {coverPreview && (
          <img
            src={coverPreview}
            alt="Cover preview"
            className="mt-3 w-full h-24 object-cover rounded-lg"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || uploadingImages}
        className="bg-gradient-to-r from-green-400 to-indigo-600 px-6 py-3 rounded-xl w-fit font-semibold text-sm disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/15 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        {isPending
          ? "Updating..."
          : uploadingImages
            ? "Uploading images..."
            : "Save Changes"}
      </button>
    </form>
  );
};

export default UpdateProfileForm;
