/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
// import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import {
	HiPencil,
	HiSquare2Stack,
	HiTrash,
} from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { redirect } from "react-router-dom";

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	// const [showForm, setShowForm] = useState(false);

	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		description,
		discount,
		image,
	} = cabin;

	// CUSTOM DELETE CABIN HOOK
	const { isDeleting, deleteCabin } = useDeleteCabin();

	// CUSTOM CREATE CABIN HOOK
	const { isCreating, createCabin } = useCreateCabin();

	const isWorking = isDeleting | isCreating;

	function handleDuplicate() {
		// DUPLICATING MEANS CREATING THE SIMILAR WITH DIFFERENT ID
		createCabin(
			{
				name: `Copy of ${name}`,
				maxCapacity,
				regularPrice,
				description,
				discount,
				image,
			},
			{
				onSuccess: () => {
					redirect("/cabins");
				},
			}
		);
	}

	return (
		<>
			<TableRow role="row">
				<Img src={image} />
				<Cabin>{name}</Cabin>
				<div>Fits upto {maxCapacity} guests</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				{discount ? (
					<Discount>{formatCurrency(discount)}</Discount>
				) : (
					<span>&mdash;</span>
				)}
				<div>
					{/* DUPLICATE */}
					<button
						disabled={isWorking}
						onClick={handleDuplicate}>
						<HiSquare2Stack />
					</button>

					<Modal>
						{/* EDIT */}
						<Modal.Open opens="edit-form">
							{/* V1 */}
							{/* <button
								disabled={isWorking}
								onClick={() =>
									setShowForm((showForm) => !showForm)
								}>
								<HiPencil />
							</button> */}

							{/* V2 */}
							<button disabled={isWorking}>
								<HiPencil />
							</button>
						</Modal.Open>
						<Modal.Window name="edit-form">
							<CreateCabinForm cabinToEdit={cabin} />
						</Modal.Window>

						{/* DELETE */}
						<Modal.Open opens="delete">
							{/* V1 */}
							{/* <button
								disabled={isWorking}
								onClick={() => deleteCabin(cabinId)}>
								<HiTrash />
							</button> */}

							{/* V2 */}
							<button>
								<HiTrash />
							</button>
						</Modal.Open>

						<Modal.Window name="delete">
							<ConfirmDelete
								resourceName="Cabin"
								onConfirm={() => deleteCabin(cabinId)}
								disabled={isDeleting}
							/>
						</Modal.Window>
					</Modal>
				</div>
			</TableRow>

			{/* PASSING THE CABIN DATA AS THE PROP TO CREATE CABIN COMPONENT FOR EDITING*/}
			{/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
		</>
	);
}

export default CabinRow;
