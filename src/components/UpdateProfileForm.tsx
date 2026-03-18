const UpdateProfileForm = () => {
  return (
    <form className="flex flex-col m-4 w-2/3">
      <div className="flex flex-col">
        <label htmlFor="bio" className="my-1 mr-4">
          Bio
        </label>
        <textarea
          name="text"
          className="w-[600px] h-32 bg-inherit focus:outline-none min-h-32 max-h-32 border-[1px] border-gray-600 p-4"
          placeholder="Echo your feelings to the world..."
        ></textarea>
      </div>
      <div className="m-4">
        <label
          className={`cursor-pointer flex items-center gap-2
                } rounded-md max-w-fit`}
        >
          Update profile picture
          <input type="file" accept="image/*" multiple className="hidden" />
        </label>
      </div>
      <div className="m-4">
        <label
          className={`cursor-pointer flex items-center gap-2
                } rounded-md max-w-fit`}
        >
          Update cover picture
          <input type="file" accept="image/*" multiple className="hidden" />
        </label>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default UpdateProfileForm;
