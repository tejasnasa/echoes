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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-4 w-2/3">
      <div className="flex flex-col">
        <label htmlFor="bio" className="my-1 mr-4">
          Bio
        </label>
        <textarea
          {...register("bio")}
          className="w-[600px] h-32 bg-inherit focus:outline-none min-h-32 max-h-32 border-[1px] border-gray-600 p-4"
          placeholder="Echo your feelings to the world..."
        />
      </div>

      <div className="m-4">
        <label className="cursor-pointer flex items-center gap-2 rounded-md max-w-fit">
          Update profile picture
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />
        </label>
        {/* Preview */}
        {profilePreview && (
          <img
            src={profilePreview}
            alt="Profile preview"
            className="mt-2 w-16 h-16 rounded-full object-cover"
          />
        )}
      </div>

      <div className="m-4">
        <label className="cursor-pointer flex items-center gap-2 rounded-md max-w-fit">
          Update cover picture
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverPicChange}
            className="hidden"
          />
        </label>
        {/* Preview */}
        {coverPreview && (
          <img
            src={coverPreview}
            alt="Cover preview"
            className="mt-2 w-full h-24 object-cover rounded-md"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || uploadingImages}
        className="disabled:opacity-50"
      >
        {isPending
          ? "Updating..."
          : uploadingImages
            ? "Uploading images..."
            : "Submit"}
      </button>
    </form>
  );
};

export default UpdateProfileForm;
