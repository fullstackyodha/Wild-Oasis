/* eslint-disable no-unused-vars */
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

function CreateCabinForm() {
	// REACT HOOK FORM
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState,
	} = useForm();

	// Used to display FORM ERROR on the UI
	const { errors } = formState;

	const queryClient = useQueryClient();

	const {
		isLoading: isCreating,
		mutate,
		error,
	} = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("Cabin Created Successfully.");

			// On Success Invalidate cache
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});

			// RESETS THE FORM
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	// When form is submitted
	function onSubmit(data) {
		// console.log(data);

		// CREATE CABIN WITH DATA & IMAGE
		mutate({ ...data, image: data.image[0] });
	}

	// When form throws error
	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			{/* FORMROW COMPONENT PASSED WITH PROPS*/}
			<FormRow
				label="Cabin name"
				error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isCreating}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreating}
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
				error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isCreating}
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
				error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isCreating}
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
				error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isCreating}
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
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Edit cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
