import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../main";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadToCloudinary } from "../api/post";
import { postSchema } from "../utils/definitions";

export interface User {
  serialId: number;
  username: string;
  fullname: string;
  profile_pic: string | undefined;
  bio: string | null;
}

export interface Post {
  id: string;
  serialId: number;
  text: string | null;
  images: string[] | null;
  createdAt: Date;
  postAboveId: string;
  user: User;
  likeCount: number;
  repostCount: number;
  bookmarkCount: number;
  likedByUser: boolean;
  repostedByUser: boolean;
  bookmarkedByUser: boolean;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/post`, {
    credentials: "include",
  }).then((res) => res.json());
  console.log(response.responseObject);
  return response.responseObject;
};

export const fetchPost = async (postSerId: number): Promise<Post> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/post/get/${postSerId}`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
  console.log(response.responseObject);
  return response.responseObject;
};

export const useAllPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePost = (postSerId: number) => {
  return useQuery<Post>({
    queryKey: ["post", postSerId],
    queryFn: async () => {
      const response = await fetchPost(postSerId);
      return response;
    },
    staleTime: 5 * 60 * 1000,
    initialData: () => {
      const postsData = queryClient.getQueryData<Post[]>(["posts"]);

      if (!postsData) return undefined;

      const post = postsData.find((post) => post.serialId === postSerId);

      if (post) {
        return post;
      }
      return undefined;
    },
  });
};

export const createPost = async (data: {
  text?: string;
  images?: string[];
  postAboveId?: string;
}) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/post/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());

  return response.responseObject;
};

export const useCreatePost = (onClose?: () => void) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileList = useRef<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: { text: "", images: [], postAboveId: undefined },
  });

  const watchText = watch("text");

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof postSchema>) => {
      if (fileList.current.length > 0) {
        setUploadingImages(true);

        try {
          const uploadPromises = fileList.current.map((file) =>
            uploadToCloudinary(file)
          );

          const imageUrls = await Promise.all(uploadPromises);
          values.images = imageUrls;
        } catch (error) {
          console.error("Error uploading images:", error);
          throw error;
        } finally {
          setUploadingImages(false);
        }
      }

      return createPost(values);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset({ text: "", images: [] });
      setPreviews([]);
      fileList.current = [];
      if (onClose) {
        onClose();
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const currentCount = previews.length;
    const selectedCount = files.length;

    if (currentCount + selectedCount > 4) {
      return;
    }

    const newFiles = Array.from(files);
    fileList.current = [...fileList.current, ...newFiles];

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const newFiles = [...fileList.current];
    newFiles.splice(index, 1);
    fileList.current = newFiles;
  };

  const onSubmit = (values: z.infer<typeof postSchema>) => {
    createPostMutation(values);
  };

  return {
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
    errors,
  };
};
