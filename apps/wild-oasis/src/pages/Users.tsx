import Heading from "../components/Heading";
import SignUpForm from "../modules/authentication/SignUpForm";

function Users() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignUpForm />
    </>
  );
}

export default Users;
