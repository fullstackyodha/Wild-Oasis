/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Spinner from "./../../ui/Spinner";

import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
// 	border: 1px solid var(--color-grey-200);
// 	font-size: 1.4rem;
// 	background-color: var(--color-grey-0);
// 	border-radius: 7px;
// 	overflow: hidden;
// `;

// const TableHeader = styled.header`
// 	display: grid;
// 	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
// 	column-gap: 2.4rem;
// 	align-items: center;

// 	background-color: var(--color-grey-50);
// 	border-bottom: 1px solid var(--color-grey-100);
// 	text-transform: uppercase;
// 	letter-spacing: 0.4px;
// 	font-weight: 600;
// 	color: var(--color-grey-600);
// 	padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
	// const {
	// 	isLoading,
	// 	data: cabins,
	// 	error,
	// } = useQuery({
	// 	queryKey: ["cabins"],
	// 	queryFn: getCabins,
	// });

	// console.log(cabins);

	const { isLoading, cabins } = useCabins();

	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (cabins.length === 0)
		return <Empty resourceName="Cabins" />;

	// CLIENT SIDE FILTERING & SORTING
	// 1. FILTER
	const filterValue = searchParams.get("discount") || "all";
	// console.log(filterValue);

	let filteredCabins;

	if (filterValue === "all") {
		filteredCabins = cabins;
	}

	if (filterValue === "with-discount") {
		filteredCabins = cabins.filter(
			(cabin) => cabin.discount > 0
		);
	}

	if (filterValue === "no-discount") {
		filteredCabins = cabins.filter(
			(cabin) => cabin.discount === 0
		);
	}

	// 2. SORT BY
	const sortBy = searchParams.get("sortBy") || "name-asc";

	const [field, direction] = sortBy.split("-");

	const sortedCabins = filteredCabins.sort((a, b) =>
		direction === "asc"
			? a[field] - b[field]
			: b[field] - a[field]
	);

	return (
		<Menus>
			{/* COMPOUND COMPONENT PATTERN */}
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={sortedCabins}
					// RENDER PROP PATTERNS
					render={(cabin) => (
						<CabinRow cabin={cabin} key={cabin.id} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
