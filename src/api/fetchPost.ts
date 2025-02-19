import { useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  id: string;
  username: string;
  fullname: string;
  profile_pic: string | null;
  bio: string | null;
}

interface Post {
  id: string;
  serialId: number;
  text: string | null;
  images: string[] | null;
  createdAt: string;
  user: User;
}

interface ServerResponse<T> {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: number;
}

export const fetchPosts = async (): Promise<ServerResponse<Post[]>> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/post`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
    },
    credentials: "include"
  }).then((res) => res.json());
  console.log(response);
  return response;
};

export const fetchPost = async (
  postSerId: number
): Promise<ServerResponse<Post>> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/post/get/${postSerId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
      },
      credentials: "include"
    }
  ).then((res) => res.json());
  console.log(response);
  return response;
};

export const useAllPosts = () => {
  return useQuery<ServerResponse<Post[]>>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePost = (postSerId: number) => {
  const queryClient = useQueryClient();

  return useQuery<ServerResponse<Post>>({
    queryKey: ["post", postSerId],
    queryFn: async () => {
      const response = await fetchPost(postSerId);
      return response;
    },
    staleTime: 5 * 60 * 1000,
    initialData: () => {
      const postsData = queryClient.getQueryData<ServerResponse<Post[]>>([
        "posts",
      ]);

      if (!postsData?.responseObject) return undefined;

      const post = postsData.responseObject.find(
        (post) => post.serialId === postSerId
      );

      if (post) {
        return {
          responseObject: post,
          success: true,
          message: "Post fetched from cache",
          statusCode: 200,
        };
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
      Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
      "Content-Type": "application/json",
    },
    credentials: "include"
  }).then((res) => res.json());
  
  return response;
};
