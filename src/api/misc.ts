import { useQuery } from "@tanstack/react-query";

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
