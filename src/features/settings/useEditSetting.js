import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export const useEditSetting = () => {
	const queryClient = useQueryClient();

	const { isLoading: isEditing, mutate: editSetting } =
		useMutation({
			mutationFn: updateSetting,
			onSuccess: () => {
				toast.success("Settings Edited Successfully.");

				// On Success Invalidate cache
				queryClient.invalidateQueries({
					queryKey: ["settings"],
				});

				// // RESETS THE FORM
				// reset();
			},
			onError: (err) => toast.error(err.message),
		});

	return { isEditing, editSetting };
};
