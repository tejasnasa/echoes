import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../api/fetchPost";
import { fetchUser } from "../api/user";
import { queryClient } from "../main";

export const usePreloadImage = (src: string) => {
  return useQuery({
    queryKey: ["image", src],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });
    },
    staleTime: Infinity,
  });
};

export const prefetchPost = (postSerId: number) => {
  queryClient.prefetchQuery({
    queryKey: ["post", postSerId],
    queryFn: () => fetchPost(postSerId),
    staleTime: 5 * 60 * 1000,
  });
};

export const prefetchUser = (userSerId: number) => {
  queryClient.prefetchQuery({
    queryKey: ["user", userSerId],
    queryFn: () => fetchUser(userSerId),
    staleTime: 5 * 60 * 1000,
  });
};
