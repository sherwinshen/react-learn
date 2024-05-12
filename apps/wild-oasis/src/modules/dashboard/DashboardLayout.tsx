import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../components/Spinner";
import Stats from "./Stats";
import { useGetCabins } from "../cabins/useCabins";
import { useRecentStays } from "./useRecentStays";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "./TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { data: cabins, isLoading: isLoading2 } = useGetCabins();
  const { confirmedStays, numDays, isLoading: isLoading3 } = useRecentStays();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings ?? []}
        confirmedStays={confirmedStays ?? []}
        numDays={numDays ?? 0}
        cabinCount={(cabins ?? []).length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays ?? []} />
      <SalesChart bookings={bookings ?? []} numDays={numDays ?? 0} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
