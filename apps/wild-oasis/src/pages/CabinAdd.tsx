import Heading from "../components/Heading";
import Row from "../components/Row";
import ButtonText from "../components/button/ButtonText";
import { useMoveBack } from "../hooks/useMoveBack";
import CabinEdit from "../modules/cabins/CabinEdit";

function CabinAdd() {
  const moveBack = useMoveBack();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Add a cabin</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <Row>
        <CabinEdit isEdit={false} />
      </Row>
    </>
  );
}

export default CabinAdd;
