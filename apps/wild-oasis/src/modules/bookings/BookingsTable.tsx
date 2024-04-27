import Empty from "../../components/Empty";
import Menus from "../../components/Menus";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import BookingTableRow from "./BookingTableRow";
import { useGetBookings } from "./useBookings";

function BookingsTable() {
  const { isLoading, data: bookings, count = 0 } = useGetBookings();
  if (isLoading) return <Spinner />;
  if (count === 0) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bookings ?? []}
          render={(booking) => <BookingTableRow key={booking.id} booking={booking} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingsTable;
