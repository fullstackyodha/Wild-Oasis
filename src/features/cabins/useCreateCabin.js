import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

// { reset }
export const useCreateCabin = () => {
	const queryClient = useQueryClient();

	const {
		isLoading: isCreating,
		mutate: createCabin,
		error,
	} = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("Cabin Created Successfully.");

			// On Success Invalidate cache
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});

			// RESETS THE FORM
			// reset();
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createCabin, error };
};
