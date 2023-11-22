import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
	const queryClient = useQueryClient();

	const {
		isLoading: isDeleting,
		mutate: deleteCabin,
		error,
	} = useMutation({
		// CALLED BY mutate()
		// mutationFn: (id) => deleteCabinApi(id),
		mutationFn: deleteCabinApi,
		// On Success Invalidate cache
		onSuccess: () => {
			toast.success("Cabin Deleted Successfully.");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabin, error };
};
