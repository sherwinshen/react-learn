import styled from "styled-components";
import Table from "../../components/Table";
import { BookingDataT } from "./type";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helper";
import Tag from "../../components/Tag";
import { statusToTagName } from "./const";
import Menus from "../../components/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useDeleteBooking } from "./useBookings";
import { useCheckOut } from "../check-in-out/useCheckInOut";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingTableRow({ booking }: { booking: BookingDataT }) {
  const { id, cabins, guests, startDate, endDate, numNights, totalPrice, status } = booking || {};
  const navigate = useNavigate();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { isCheckingOut, checkOut } = useCheckOut();

  return (
    <Table.Row>
      <Cabin>{cabins?.name}</Cabin>
      <Stacked>
        <span>{guests?.fullName}</span>
        <span>{guests?.email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)} &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash; {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id}></Menus.Toggle>
          <Menus.List id={id}>
            <Menus.Button icon={<HiEye />} onClick={() => navigate(`/booking/${id}`)}>
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/check-in/${id}`)}>
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button icon={<HiArrowUpOnSquare />} onClick={() => checkOut(id)} disabled={isCheckingOut}>
                Check out
              </Menus.Button>
            )}
            <Modal.Open name="deleteBooking">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Content name="deleteBooking">
          <ConfirmDelete resourceName="booking" disabled={isDeleting} onConfirm={() => deleteBooking(id)} />
        </Modal.Content>
      </Modal>
    </Table.Row>
  );
}

export default BookingTableRow;
