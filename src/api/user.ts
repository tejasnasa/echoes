import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../main";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateProfileSchema } from "../utils/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadToCloudinary } from "./post";

interface User {
  serialId: number;
  username: string;
  fullname: string;
  profile_pic: string | null;
  bio: string | null;
  cover_pic: string | null;
  isMe: boolean;
  isFollowing: boolean;
  followersCount: number;
  postsCount: number;
  post: Post[];
}

interface Post {
  serialId: number;
  text: string | null;
  images: string[] | null;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user/recommended/10`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
  return response.responseObject;
};

export const fetchUser = async (userSerId: number): Promise<User> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user/get/${userSerId}`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
  return response.responseObject;
};

export const followUser = async (userSerId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/user/follow/${userSerId}`,
    {
      method: "POST",
      credentials: "include",
    }
  ).then((res) => res.json());
  return response.responseObject.message;
};

export const useAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUser = (userSerId: number) => {
  return useQuery<User>({
    queryKey: ["user", userSerId],
    queryFn: () => fetchUser(userSerId),

    placeholderData: () => {
      const usersData = queryClient.getQueryData<User[]>(["users"]);
      return usersData?.find((user) => user.serialId === userSerId);
    },
  });
};

export const updateProfile = async (
  data: z.infer<typeof updateProfileSchema>
) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/self/edit`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());

  return response.responseObject;
};

export const useUpdateProfile = ({ onClose }: { onClose?: () => void }) => {
  const profileFileRef = useRef<File | null>(null);
  const coverFileRef = useRef<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [uploadingImages, setUploadingImages] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { bio: "", profile_pic: "", cover_pic: "" },
  });

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof updateProfileSchema>) => {
      setUploadingImages(true);
      try {
        if (profileFileRef.current) {
          values.profile_pic = await uploadToCloudinary(profileFileRef.current);
        }
        if (coverFileRef.current) {
          values.cover_pic = await uploadToCloudinary(coverFileRef.current);
        }
      } catch (error) {
        console.error("Error uploading images:", error);
        throw error;
      } finally {
        setUploadingImages(false);
      }
      return updateProfile(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      reset({ bio: "", profile_pic: "", cover_pic: "" });
      setProfilePreview("");
      setCoverPreview("");
      profileFileRef.current = null;
      coverFileRef.current = null;
      if (onClose) onClose();
    },
  });

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    profileFileRef.current = file;
    setProfilePreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleCoverPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    coverFileRef.current = file;
    setCoverPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const onSubmit = (values: z.infer<typeof updateProfileSchema>) => {
    updateProfileMutation({
      bio: values.bio,
      profile_pic: values.profile_pic,
      cover_pic: values.cover_pic,
    });
  };

  return {
    profilePreview,
    coverPreview,
    uploadingImages,
    isPending,
    register,
    handleSubmit,
    handleProfilePicChange,
    handleCoverPicChange,
    onSubmit,
    errors,
  };
};
