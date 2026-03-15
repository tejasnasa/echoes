import { fetchPost } from "../api/fetchPost";
import { fetchUser } from "../api/user";
import { queryClient } from "../main";

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
