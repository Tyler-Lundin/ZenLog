"use client";
import { useRouter } from "next/navigation";
import Smiley from "../../components/Smiley";
import type { ITheme } from "../../types";

export interface LoginFormProps {
  username: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  password: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  theme: ITheme;
}

const LoginForm = (props: LoginFormProps) => {
  const { username, password, onSubmit, theme } = props;
  const router = useRouter();

  const FORM = "grid place-content-center";
  const INPUT_GROUP = "flex flex-col mb-4 w-full relative";
  const INPUT_LABEL =
    "mb-2 transition-all duration-500 order-1 text-sm absolute top-0 left-2";
  const INPUT =
    "border border-white rounded px-2 pt-4 order-2 text-black opacity-80 focus:opacity-100";
  const SUBMIT = "bg-white text-black rounded p-2 w-64 focus:invert relative";
  const SMILEY =
    "absolute top-0 left-1/2 -translate-x-1/2 p-1 flex items-center justify-center";

  return (
    <form style={{ color: theme.colors.b }} className={FORM}>
      <div className={INPUT_GROUP}>
        <input className={INPUT} {...username} type="text" id="username" />
        <label className={INPUT_LABEL} htmlFor="username">
          username
        </label>
      </div>
      <div className={INPUT_GROUP}>
        <input className={INPUT} {...password} type="password" id="password" />
        <label className={INPUT_LABEL} htmlFor="password">
          password
        </label>
      </div>
      <button className={SUBMIT} {...onSubmit} type="submit">
        Login
      </button>
      <span className={SMILEY} onClick={() => router.push("/")}>
        {" "}
        <Smiley scale={0.5} />{" "}
      </span>
    </form>
  );
};

export default LoginForm;
