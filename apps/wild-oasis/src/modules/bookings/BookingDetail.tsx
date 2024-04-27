import { useDeleteBooking, useGetBooking } from "./useBookings";
import Spinner from "../../components/Spinner";
import Row from "../../components/Row";
import Heading from "../../components/Heading";
import Tag from "../../components/Tag";
import ButtonText from "../../components/button/ButtonText";
import styled from "styled-components";
import { statusToTagName } from "./const";
import { BOOKING_STATUS } from "./type";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import Button from "../../components/button/Button";
import ButtonGroup from "../../components/button/ButtonGroup";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckInOut";
import Modal from "../../components/Modal";
import ConfirmDelete from "../../components/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking } = useGetBooking();
  const { isCheckingOut, checkOut } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();

  const { id: bookingId, status = BOOKING_STATUS.unconfirmed } = booking || {};

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && <Button onClick={() => navigate(`/check-in/${bookingId}`)}>Check in</Button>}

        {status === "checked-in" && (
          <Button onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open name="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Content name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Content>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
