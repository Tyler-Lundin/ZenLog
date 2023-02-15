"use client";
import Smiley from "../../components/Smiley";
import useTheme from "../../hooks/useTheme";

  const FORM = "grid place-content-center text-white";
  const INPUT_GROUP = "flex flex-col mb-4 w-full relative";
  const INPUT_LABEL = "mb-2 transition-all duration-500 order-1 text-sm absolute top-0 left-2";
  const INPUT = "bg-transparent px-2 pt-4 order-2 border-b-2 border-gray-400 focus:border-white focus:outline-none";
  const SUBMIT = "bg-white text-black rounded-lg p-2 w-64 focus:invert relative";
  const SMILEY = "absolute top-0 left-1/2 -translate-x-1/2 p-1 grid place-content-center";

const RegisterForm = (props: RegisterFormProps) => {
  const { username, email, password, verifyPassword, onSubmit } = props;
  const { theme, rotateTheme } = useTheme();

  const form = [
    { name: "username", label:'Username', value: username.value, onChange: username.onChange, type: "text" },  
    { name: "email", label:'Email', value: email.value, onChange: email.onChange, type: "email" },
    { name: "password", label:'Password', value: password.value, onChange: password.onChange, type: "password" },
    { name: "verifyPassword", label:'Confirm Password', value: verifyPassword.value, onChange: verifyPassword.onChange, type: "password" },
  ]

  const c = {
    style:{
      color: theme.text
    }
  }
  return (
    <form className={FORM}>
      {form.map((input, i) => (
        <div {...c} className={INPUT_GROUP} key={`${i}-${input.name}`}>
          <input className={INPUT} {...[input.name]} type={input.type} id={`register-${input.name}`} /> 
          <label className={INPUT_LABEL} htmlFor={`register-${input.name}`}>
            {input.label}
          </label>
        </div>
      ))}

      <button style={{background:theme.text, color:theme.oT}} className={SUBMIT} {...onSubmit} type="submit">
        Register
      </button>

      <span className={SMILEY} onClick={() => rotateTheme()}>
        <Smiley fill={theme.background} bg={theme.colors.a}/>
      </span>
    </form>
  );
};

export default RegisterForm;



export interface RegisterFormProps {
  username: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  email: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  password: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  verifyPassword: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
