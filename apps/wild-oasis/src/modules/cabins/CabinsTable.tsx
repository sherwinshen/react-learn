import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import CabinTableRow from "./CabinTableRow";
import { useGetCabins } from "./useCabins";
import Empty from "../../components/Empty";
import { CabinDataT } from "./type";
import Menus from "../../components/Menus";

function CabinsTable() {
  const { isLoading, data: cabins = [] } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins: CabinDataT[] = [];
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount") filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a: CabinDataT, b: CabinDataT) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => <CabinTableRow cabin={cabin} key={cabin.id} />} />
      </Table>
    </Menus>
  );
}

export default CabinsTable;
