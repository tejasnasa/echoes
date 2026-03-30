import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "../api/auth";
import { z } from "zod";
import { newPasswordSchema } from "../utils/definitions";

interface UserData {
  id: string;
  name: string;
  username: string;
}

export const fetchUserData = async (): Promise<UserData> => {
  const response = await isAuthenticated();
  if (!response.success) {
    throw new Error("Not authenticated");
  }
  return response.auth;
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};

export const changePassword = async (
  data: z.infer<typeof newPasswordSchema>
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/self/password`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  if (response.message === "Old password is incorrect") {
    throw new Error(response.message);
  }
  if (response.message === "New passwords do not match") {
    throw new Error(response.message);
  }
  if (response.message === "Password is the same") {
    throw new Error(response.message);
  }
  if (response.message === "Internal server error") {
    throw new Error(response.message);
  }

  return response.responseObject;
};
