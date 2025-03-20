export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_PRESET}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_URL}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  console.log(response)

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.secure_url;
};
