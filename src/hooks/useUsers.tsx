import useGetHook from "./useGetHook";

export const useUsers = () => {
  return useGetHook("/users");
};

export const useUserById = (id: string | null) => {
  const url = id ? `/users/${id}` : null;
  return useGetHook(url);
};

export const useUserStats = () => {
  const url = `/users/users/stats`;
  return useGetHook(url);
};
