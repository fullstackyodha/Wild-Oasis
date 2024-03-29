/* eslint-disable no-unused-vars */
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import { Row } from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import { Button } from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { HiArrowDownCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { isLoading, booking } = useBooking();
	const { id: bookingId, status } = booking || {};

	const { checkout, isCheckingOut } = useCheckout();

	const moveBack = useMoveBack();
	const navigate = useNavigate();

	const statusToTagName = {
		unconfirmed: "yellow",
		"checked-in": "green",
		"checked-out": "red",
	};

	if (isLoading || isCheckingOut) return <Spinner />;

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>

					<Tag type={statusToTagName[status]}>
						{status.replace("-", " ")}
					</Tag>
				</HeadingGroup>

				<ButtonText onClick={moveBack}>
					&larr; Back
				</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{/* CHECK-IN */}
				{status === "unconfirmed" && (
					<Button
						onClick={() =>
							navigate(`/checkin/${bookingId}`)
						}>
						Check-In
					</Button>
				)}

				{/* CHECK-OUT */}
				{status === "checked-in" && (
					<Button
						onClick={() => {
							checkout(bookingId);
							navigate(`/bookings?status=checked-in`);
						}}>
						Check-Out
					</Button>
				)}

				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
