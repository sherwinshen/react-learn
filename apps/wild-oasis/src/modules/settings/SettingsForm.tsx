import { useState } from "react";
import Input from "../../components/Input";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Spinner from "../../components/Spinner";
import { useGetSettings, useUpdateSettings } from "./useSettings";

function SettingsForm() {
  const { isLoading, data } = useGetSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();
  const [loadingFields, setLoadingFields] = useState<string[]>([]);
  const { minBookingLength, maxBookingLength, maxGuestsBooking, breakfastPrice } = data || {};

  const handleUpdate = async (e: React.FocusEvent<HTMLInputElement, Element>, field: string) => {
    const { value } = e.target;
    const oldValue = data?.[field];

    if (!value || Number(value) === oldValue) return;
    setLoadingFields((state) => [...state, field]);
    updateSetting(
      { [field]: value },
      {
        onSettled: () => setLoadingFields((state) => state.filter((f) => f !== field)),
      }
    );
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking" isUpdating={isUpdating && loadingFields.includes("minBookingLength")}>
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          min="1"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating && loadingFields.includes("minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking" isUpdating={isUpdating && loadingFields.includes("maxBookingLength")}>
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          min="1"
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating && loadingFields.includes("maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking" isUpdating={isUpdating && loadingFields.includes("maxGuestsBooking")}>
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsBooking}
          min="1"
          onBlur={(e) => handleUpdate(e, "maxGuestsBooking")}
          disabled={isUpdating && loadingFields.includes("maxGuestsBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price" isUpdating={isUpdating && loadingFields.includes("breakfastPrice")}>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          min="1"
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating && loadingFields.includes("breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default SettingsForm;
