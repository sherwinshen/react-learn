import Heading from "../components/Heading";
import Row from "../components/Row";
import CabinEdit from "../modules/cabins/CabinEdit";

function CabinAdd() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Add a cabin</Heading>
      </Row>
      <Row>
        <CabinEdit isEdit={false} />
      </Row>
    </>
  );
}

export default CabinAdd;
