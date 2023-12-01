import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ value: "all", label: "All" },
					{ value: "with-discount", label: "Discount" },
					{ value: "no-discount", label: "No Discount" },
				]}
			/>
			<SortBy
				options={[
					{ value: "name-asc", label: "Name(A-Z)" },
					{ value: "name-desc", label: "Name(Z-A)" },
					{
						value: "regularPrice-asc",
						label: "Price(Low-High)",
					},
					{
						value: "regularPrice-desc",
						label: "Price(High-Low)",
					},
					{
						value: "maxCapacity-asc",
						label: "Capacity(Low-High)",
					},
					{
						value: "maxCapacity-desc",
						label: "Capacity(High-Low)",
					},
				]}
			/>
		</TableOperations>
	);
};

export default CabinTableOperations;
