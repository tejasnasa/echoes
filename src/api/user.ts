import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../main";

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
