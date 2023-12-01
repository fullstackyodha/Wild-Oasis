/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
	const [searchParams] = useSearchParams();

	// 1. FILTER
	const filterValue = searchParams.get("status");

	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };

	// 2. SORT BY
	const sortByRaw =
		searchParams.get("sortBy") || "startDate-desc";

	const [field, direction] = sortByRaw.split("-");

	const sortBy = { field, direction };

	// 3. PAGINATION
	const page = +searchParams.get("page") || 1;

	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		// UNIQUELY IDENTIFIES IN THE CACHE
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	return {
		isLoading,
		bookings,
		count,
		error,
	};
};
