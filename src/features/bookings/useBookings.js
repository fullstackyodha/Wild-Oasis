/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
	const [searchParams] = useSearchParams();

	// FILTER
	const filterValue = searchParams.get("status");

	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };

	// SORT BY
	const sortByRaw =
		searchParams.get("sortBy") || "startDate-desc";

	const [field, direction] = sortByRaw.split("-");

	const sortBy = { field, direction };

	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		// UNIQUELY IDENTIFIES IN THE CACHE
		queryKey: ["bookings", filter, sortBy],
		queryFn: () => getBookings({ filter, sortBy }),
	});

	return { isLoading, bookings, error };
};
