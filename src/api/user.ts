import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../main";

interface User {
  serialId: number;
  username: string;
  fullname: string;
  profile_pic: string | null;
  bio: string | null;
  cover_pic: string | null;
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
    queryFn: async () => {
      const response = await fetchUser(userSerId);
      return response;
    },
    staleTime: 5 * 60 * 1000,
    initialData: () => {
      const usersData = queryClient.getQueryData<User[]>(["users"]);

      if (!usersData) return undefined;

      const post = usersData.find((user) => user.serialId === userSerId);

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
      Authorization: `Bearer ${import.meta.env.VITE_TEST_TOKEN}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());

  return response.responseObject;
};
