import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import FileInput from "../../components/FileInput";
import { useCreateCabin, useUpdateCabin } from "./useCabins";
import { CabinDataT, CabinFormT } from "./type";

function CabinEdit({
  isEdit,
  editValues,
  onCloseModal,
}: {
  isEdit: boolean;
  editValues?: CabinDataT;
  onCloseModal?: () => void;
}) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<CabinFormT>({
    defaultValues: isEdit ? editValues : {},
  });
  const navigate = useNavigate();
  const { updateCabin, isUpdating } = useUpdateCabin();
  const { createCabin, isCreating } = useCreateCabin();
  const isWorking = isUpdating || isCreating;

  const onSubmit = (data: CabinFormT) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEdit && editValues?.id) {
      updateCabin(
        { newCabin: { ...data, image }, id: editValues.id },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
      return;
    }
    createCabin(
      { ...data, image: image },
      {
        onSuccess: () => {
          navigate("/cabins");
        },
      }
    );
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message as string}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message as string}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message as string}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message as string}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) || "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow label="Description for website" error={errors?.description?.message as string}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button variation="secondary" type="reset" onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={isWorking}>{isEdit ? "Edit cabin" : "Create new cabin"}</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CabinEdit;
