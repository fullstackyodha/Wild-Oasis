import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSetting";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestPerBooking,
			breakfastPrice,
		} = {}, // as they are undefined at first assign it with empty {} / []
	} = useSettings();

	const { isEditing, editSetting } = useEditSetting();

	if (isLoading) return <Spinner />;

	const handleUpdate = (event, field) => {
		// console.log(event);
		const { value } = event.target;
		console.log(value);

		if (!value) return;

		editSetting({ [field]: value });
	};

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disbaled={isEditing}
					onBlur={(event) =>
						handleUpdate(event, "minBookingLength")
					}
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disbaled={isEditing}
					onBlur={(event) =>
						handleUpdate(event, "maxBookingLength")
					}
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestPerBooking}
					disbaled={isEditing}
					onBlur={(event) =>
						handleUpdate(event, "maxGuestPerBooking")
					}
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					disbaled={isEditing}
					onBlur={(event) =>
						handleUpdate(event, "breakfastPrice")
					}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
