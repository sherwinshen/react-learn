import Heading from "../components/Heading";
import Row from "../components/Row";
import UpdatePasswordForm from "../modules/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../modules/authentication/UpdateUserDataForm";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
