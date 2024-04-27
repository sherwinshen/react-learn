import Heading from "../components/Heading";
import Row from "../components/Row";
import BookingTableOperations from "../modules/bookings/BookingTableOperations";
import BookingsTable from "../modules/bookings/BookingsTable";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}

export default Bookings;
