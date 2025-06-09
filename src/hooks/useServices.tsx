import useGetHook from "./useGetHook";

export const useServices = () => {
  const url = "/services";

  return useGetHook(url);
};

export const useServiceById = (id: string) => {
  const url = id ? `/services/${id}` : null;

  return useGetHook(url);
};
