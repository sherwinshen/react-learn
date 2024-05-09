import Input from "../../components/Input";
import Button from "../../components/button/Button";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import { FieldValues, useForm } from "react-hook-form";
import { useSignUp } from "./useAuth";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const { isSigningUp: isLoading, signUp } = useSignUp();

  const onSubmit = ({ fullName, email, password }: FieldValues) => {
    signUp(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={String(errors?.fullName?.message || "")}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={String(errors?.email?.message || "")}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={String(errors?.password?.message || "")}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={String(errors?.passwordConfirm?.message || "")}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button variation="secondary" type="reset" disabled={isLoading} onClick={reset}>
            Cancel
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignUpForm;
