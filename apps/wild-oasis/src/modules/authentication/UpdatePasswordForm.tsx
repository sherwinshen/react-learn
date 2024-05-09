import { FieldValues, useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/Input";
import Button from "../../components/button/Button";
import { useUpdateUser } from "./useAuth";

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const { isUpdating, updateUser } = useUpdateUser();
  const onSubmit = ({ password }: FieldValues) => {
    updateUser({ password }, { onSuccess: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="New password (min 8 chars)" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button onClick={reset} type="reset" variation="secondary">
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update password</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
