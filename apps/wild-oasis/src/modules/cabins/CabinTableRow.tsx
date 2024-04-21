import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { CabinDataT } from "./type";
import { formatCurrency } from "../../utils/helper";
import Table from "../../components/Table";
import { useCreateCabin, useDeleteCabin } from "./useCabins";
import Menus from "../../components/Menus";
import Modal from "../../components/Modal";
import CabinDelete from "./CabinDelete";
import CabinEdit from "./CabinEdit";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinTableRow({ cabin }: { cabin: CabinDataT }) {
  const { id, image, name, maxCapacity, regularPrice, discount, description } = cabin;
  const { createCabin } = useCreateCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id}></Menus.Toggle>
            <Menus.List id={id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open name="cabin-update">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open name="cabin-delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Content name="cabin-update">
            <CabinEdit isEdit={true} editValues={cabin}></CabinEdit>
          </Modal.Content>

          <Modal.Content name="cabin-delete">
            <CabinDelete resourceName={cabin.name} disabled={isDeleting} onConfirm={() => deleteCabin(id)} />
          </Modal.Content>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinTableRow;
