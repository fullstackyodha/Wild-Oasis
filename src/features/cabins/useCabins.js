import { useQuery } from "@tanstack/react-query";
import { getCabins } from "./../../services/apiCabins";

export const useCabins = () => {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		// UNIQUELY IDENTIFIES IN THE CACHE
		queryKey: ["cabins"],
		queryFn: getCabins,
	});

	return { isLoading, cabins, error };
};
