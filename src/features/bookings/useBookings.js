/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../ui/Pagination";

export const useBookings = () => {
	const queryClient = useQueryClient();

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

	// QUERY
	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		// UNIQUELY IDENTIFIES IN THE CACHE
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// PRE-FETCHING - FETCH THE NEXT RESULT AND SAVE IT IN THE CACHE
	const pageCount = Math.ceil(count / PAGE_SIZE);

	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () =>
				getBookings({ filter, sortBy, page: page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () =>
				getBookings({ filter, sortBy, page: page - 1 }),
		});
	}

	return {
		isLoading,
		bookings,
		count,
		error,
	};
};
