import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkin, isLaoding: isCheckin } =
		useMutation({
			// UPDATE THE STATUS TO CHECKED-IN AND ISPAID TO TRUE
			mutationFn: ({ bookingId, breakfast }) =>
				updateBooking(bookingId, {
					status: "checked-in",
					isPaid: true,
					...breakfast,
				}),

			// data = Info returned by the mutation function
			onSuccess: (data) => {
				toast.success(
					`Booking #${data.id} successfully Checked-In`
				);

				// Invalidate queries on the current page
				queryClient.invalidateQueries({ active: true });

				// Navigate to dashboard
				navigate("/bookings");
			},

			onError: () => {
				toast.error(`Error while Check-In`);
			},
		});

	return { checkin, isCheckin };
}
