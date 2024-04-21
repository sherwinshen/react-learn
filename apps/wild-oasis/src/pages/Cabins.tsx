import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import Row from "../components/Row";
import Button from "../components/button/Button";
import CabinsTable from "../modules/cabins/CabinsTable";
import CabinTableOperations from "../modules/cabins/CabinTableOperations";

function Cabins() {
  const navigate = useNavigate();
  const handleGoToAddCabin = () => {
    navigate("/cabins/add");
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinsTable />
        <Button onClick={handleGoToAddCabin}>Add new cabin</Button>
      </Row>
    </>
  );
}

export default Cabins;
