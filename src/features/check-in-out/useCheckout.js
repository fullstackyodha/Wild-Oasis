import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
	const queryClient = useQueryClient();

	const { mutate: checkout, isLaoding: isCheckingOut } =
		useMutation({
			// UPDATE THE STATUS TO CHECKED-IN AND ISPAID TO TRUE
			mutationFn: (bookingId) =>
				updateBooking(bookingId, {
					status: "checked-out",
				}),

			// data = Info returned by the mutation function
			onSuccess: (data) => {
				toast.success(
					`Booking #${data.id} successfully Checked-Out`
				);

				// Invalidate queries on the current page
				queryClient.invalidateQueries({ active: true });
			},

			onError: () => {
				toast.error(`Error while Check-Out`);
			},
		});

	return { checkout, isCheckingOut };
}
