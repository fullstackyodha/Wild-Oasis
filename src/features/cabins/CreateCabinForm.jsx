/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({
	cabinToEdit = {},
	onCloseModal,
}) {
	// Cabin Data to be edited
	const { id: editId, ...editValues } = cabinToEdit;

	const isEditSession = Boolean(editId);

	// REACT HOOK FORM
	const {
		register,
		handleSubmit,
		reset,
		getValues, // gets the form field values
		formState,
	} = useForm({
		// IF IS EDIT SESSION THEN SET DEFAULT VALUES
		defaultValues: isEditSession ? editValues : {},
	});

	// Used to display FORM ERROR on the UI
	const { errors } = formState;

	const { isCreating, createCabin } = useCreateCabin({
		reset,
	});

	const { isEditing, editCabin } = useEditCabin();

	const isWorking = isCreating || isEditing;

	// When form is submitted
	function onSubmit(data) {
		// console.log(data);

		// CHECK THE IMAGE TYPE
		const image =
			typeof data.image === "string" // EDIT
				? data.image
				: data.image[0]; // CREATE

		// IF EDIT SESSION
		if (isEditSession) {
			// EDIT CABIN WITH DATA & IMAGE
			editCabin(
				{
					newCabinData: { ...data, image },
					id: editId,
				},
				{
					onSuccess: () => {
						reset();
						onCloseModal?.(false);
					},
				}
			);
		} else {
			// CREATE CABIN WITH DATA & IMAGE
			createCabin(
				{ ...data, image },
				// RESETS THE FORM
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.(false);
					},
				}
				// GETS ACCESS TO CREATED DATA BY MUTATION FUCTION
				// { onSuccess: (data) => { console.log(data); reset()} }
			);
		}
	}

	// When form throws error
	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			// Checks if form is open in Modal or not
			type={onCloseModal ? "modal" : "regular"}>
			{/* FORMROW COMPONENT PASSED WITH PROPS*/}
			<FormRow
				label="Cabin name"
				// DISLAY ERROR MESSAGE
				error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				// DISLAY ERROR MESSAGE
				error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity must be atleast 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				// DISLAY ERROR MESSAGE
				error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 10,
							message: "Regular Price must be atleast $10",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Discount"
				// DISLAY ERROR MESSAGE
				error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					// defaultValue={0}
					disabled={isWorking}
					{...register("discount", {
						required: "This field is required",
						// CUSTOM VALIDATOR
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount must be less than regular price.",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				// DISLAY ERROR MESSAGE
				error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					// type="file"
					{...register("image", {
						required: isEditSession
							? false
							: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variations="secondary"
					onClick={() => onCloseModal?.("")}
					type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession
						? "Edit cabin"
						: "Create new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
