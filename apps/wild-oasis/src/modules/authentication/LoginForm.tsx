import { useState } from "react";
import Form from "../../components/form/Form";
import Input from "../../components/Input";
import Button from "../../components/button/Button";
import FormRowVertical from "../../components/form/FormRowVertical";
import { useLogin } from "./useAuth";
import SpinnerMini from "../../components/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggingIn, login } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      {
        email,
        password,
      },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoggingIn}>
          {!isLoggingIn ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
