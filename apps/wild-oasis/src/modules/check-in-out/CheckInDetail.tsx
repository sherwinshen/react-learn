import styled from "styled-components";
import Heading from "../../components/Heading";
import Row from "../../components/Row";
import Button from "../../components/button/Button";
import ButtonGroup from "../../components/button/ButtonGroup";
import ButtonText from "../../components/button/ButtonText";
import { useGetBooking } from "../bookings/useBookings";
import Spinner from "../../components/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import Checkbox from "../../components/Checkbox";
import { formatCurrency } from "../../utils/helper";
import BookingDataBox from "../bookings/BookingDataBox";
import { useGetSettings } from "../settings/useSettings";
import { useState } from "react";
import { useCheckIn } from "./useCheckInOut";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckInDetail() {
  const { booking, isLoading } = useGetBooking();
  const { data: settings, isLoading: isLoadingSettings } = useGetSettings();
  const { isCheckingIn, checkIn } = useCheckIn();
  const moveBack = useMoveBack();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);

  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking || {};
  const optionalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests;
  const handleCheckIn = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  };

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckIn} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckInDetail;
