import Heading from "../components/Heading";
import Row from "../components/Row";
import DashboardFilter from "../modules/dashboard/DashboardFilter";
import DashboardLayout from "../modules/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
