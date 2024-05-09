import { Form } from "react-router-dom";
import { useAuth, useUpdateUser } from "./useAuth";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/Input";
import FileInput from "../../components/FileInput";
import Button from "../../components/button/Button";
import { useState } from "react";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useAuth();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState();
  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(undefined);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(undefined);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} disabled={isUpdating} />
      </FormRow>

      <FormRow>
        <>
          <Button type="reset" variation="secondary" disabled={isUpdating} onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
