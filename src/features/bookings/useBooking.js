import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export const useBooking = () => {
	const { bookingId } = useParams();

	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		// UNIQUELY IDENTIFIES IN THE CACHE
		queryKey: ["booking", bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false, // If false, failed queries will not retry by default
	});

	return { isLoading, booking, error };
};
