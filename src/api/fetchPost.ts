import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  createdAt: string;
  user: User;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/post`, {
    credentials: "include",
  }).then((res) => res.json());
  return response.responseObject;
};

export const fetchPost = async (postSerId: number): Promise<Post> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/post/get/${postSerId}`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
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
  const queryClient = useQueryClient();

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

export const createPost = async (data: { text: string; images: string[] }) => {
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
