// import { useState } from "react";

import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

// COMPOUND COMPONENT MODAL API
function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Add Cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>

				{/*
                <Modal.Open opens="table">
                    <Button>Show Table</Button>
                </Modal.Open>
                <Modal.Window name="table">
                    <CabinTable />
                </Modal.Window>
            */}
			</Modal>
		</div>
	);
}

export default AddCabin;

// function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);

// 	return (
// 		<div>
// 			{/* On Click Open the Modal */}
// 			<Button
// 				variations="primary"
// 				onClick={() => setIsOpenModal((open) => !open)}>
// 				Add new cabin
// 			</Button>

// 			{/* CONTROLLED MODAL COMPONENT */}
// 			{isOpenModal && (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm
// 						onCloseModal={() => setIsOpenModal(false)}
// 					/>
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

// export default AddCabin;
