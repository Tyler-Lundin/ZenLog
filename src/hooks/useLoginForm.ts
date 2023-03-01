import { atom, useAtom } from "jotai";

const usernameAtom = atom("");
const passwordAtom = atom("");

export default function useLoginPage() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);

  const form = [
    {
      name: "username",
      label: "Username",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      type: "password",
    },
  ];
  return form;
}
