import { useState } from "react";

function useRegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  return {
    username: {
      value: username,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      },
    },
    email: {
      value: email,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
      },
    },
    password: {
      value: password,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      },
    },
    verifyPassword: {
      value: verifyPassword,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerifyPassword(event.target.value);
      },
    },
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log({ username, password });
    },
  };
}

export default useRegisterPage;
