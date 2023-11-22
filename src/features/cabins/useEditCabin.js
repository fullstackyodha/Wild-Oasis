import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export const useEditCabin = () => {
	const queryClient = useQueryClient();

	const { isLoading: isEditing, mutate: editCabin } =
		useMutation({
			mutationFn: ({ newCabinData, id }) =>
				createEditCabin(newCabinData, id),
			onSuccess: () => {
				toast.success("Cabin Edited Successfully.");

				// On Success Invalidate cache
				queryClient.invalidateQueries({
					queryKey: ["cabins"],
				});

				// // RESETS THE FORM
				// reset();
			},
			onError: (err) => toast.error(err.message),
		});

	return { isEditing, editCabin };
};
