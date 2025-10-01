import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toastify } from "@/lib/toastify";

const useMutationDelete = (queryKey, deleteEndpoint) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ ids, deleteType }) => {
      const { data: response } = await axios({
        method: deleteType === "PD" ? "DELETE" : "PUT",
        url: deleteEndpoint,
        data: { ids, deleteType },
      });
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onError: (error) => {
      toastify("error", error.message);
    },
    onSuccess: (data) => {
      toastify("success", data.message);
      queryClient.invalidateQueries([queryKey]);
    },
  });
};

export default useMutationDelete;
