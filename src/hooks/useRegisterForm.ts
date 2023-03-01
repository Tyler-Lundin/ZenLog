import { atom, useAtom } from "jotai";

export const usernameAtom = atom("");
export const emailAtom = atom("");
export const passwordAtom = atom("");
export const verifyPasswordAtom = atom("");

export default function useRegisterForm() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [verifyPassword, setVerifyPassword] = useAtom(verifyPasswordAtom);

  const form = [
    { 
      name: "username", 
      label:'Username', 
      value: username, 
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value), 
      type: "text" 
    },  
    {
      name: "email",
      label: "Email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      type: "password",
    },
    {
      name: "verifyPassword",
      label: "Verify Password",
      value: verifyPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setVerifyPassword(e.target.value),
      type: "password",
    },
  ];

  return form; 
}
