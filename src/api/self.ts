import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "../api/auth";

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

// Create a custom hook for authentication
export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: isAuthenticated,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
