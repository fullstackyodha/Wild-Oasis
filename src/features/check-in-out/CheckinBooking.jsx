/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import { Row } from "../../ui/Row";
import { Button } from "../../ui/Button";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);

	const { booking, isLoading } = useBooking();
	const { checkin, isCheckin } = useCheckin();
	const { settings, isLoading: isLoadingSettings } =
		useSettings();

	useEffect(() => {
		// returns its right-hand side operand when
		// its left - hand side operand is null or undefined,
		// and otherwise returns its left - hand side operand.
		setConfirmPaid(booking?.isPaid ?? false);
	}, [booking?.isPaid]);

	const moveBack = useMoveBack();

	if (isLoading || isLoadingSettings) return <Spinner />;

	const {
		id: bookingId,
		guests,
		totalPrice,
		numGuests,
		hasBreakfast,
		numNights,
	} = booking;

	const optionalBreakfastPrice =
		settings.breakfastPrice * numNights * numGuests;

	const totalPriceWithBreakfast =
		totalPrice + optionalBreakfastPrice;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extras: optionalBreakfastPrice,
					totalPrice: totalPriceWithBreakfast,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">
					Check in booking #{bookingId}
				</Heading>
				<ButtonText onClick={moveBack}>
					&larr; Back
				</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						// WHEN CLICKED ON LABEL SELECTS CHECKBOX
						id="breakfast"
						disabled={addBreakfast || isCheckin}
						onChange={() => {
							setAddBreakfast(
								(addBreakfast) => !addBreakfast
							);

							setConfirmPaid(false);
						}}>
						Want to add breakfast for {numNights} nights for
						all the guests at{" "}
						{formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={() =>
						setConfirmPaid((confirm) => !confirm)
					}
					disabled={confirmPaid || isCheckin}
					id="confirm">
					I Confirm that {guests.fullName} has paid total
					amount{" "}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(
								totalPriceWithBreakfast
						  )} ($${totalPrice} + $${optionalBreakfastPrice})`}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPaid}>
					Check in booking #{bookingId}
				</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
