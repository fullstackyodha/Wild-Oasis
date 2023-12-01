/* eslint-disable react/prop-types */

import { useSearchParams } from "react-router-dom";
import Select from "./Select";

/* eslint-disable no-unused-vars */
function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const sortBy = searchParams.get("sortBy") || "name-asc";

	function handleChange(e) {
		searchParams.set("sortBy", e.target.value);

		setSearchParams(searchParams);
	}

	return (
		<div>
			<Select
				options={options}
				value={sortBy}
				type="white"
				onChange={handleChange}
			/>
		</div>
	);
}

export default SortBy;
