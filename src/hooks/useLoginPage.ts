import { useState } from "react";

function useLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return {
    username: {
      value: username,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      },
    },
    password: {
      value: password,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      },
    },
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log({ username, password });
    },
  };
}

export default useLoginPage;
