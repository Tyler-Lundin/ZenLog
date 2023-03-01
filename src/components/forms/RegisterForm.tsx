"use client";
import useRegisterForm from "../../hooks/useRegisterForm";
import useTheme from "../../hooks/useTheme";

  const 
    TRANSITION = "transition duration-500 ease-in-out",
    FORM = "grid place-content-center", 
    INPUT_GROUP = `${TRANSITION} flex flex-col gap-2 mb-4 w-full relative rounded-lg border-2`, 
    INPUT_LABEL = "mb-2 order-1 text-sm absolute top-0 left-2 lowercase font-bold",
    INPUT = " bg-transparent px-2 pt-4 order-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-lg", 
    SUBMIT = `${TRANSITION} bg-white text-black rounded-lg p-2 w-64 text-xl font-black hover:opacity-70 uppercase`; 

const RegisterForm = () => {
  const form = useRegisterForm();
  const { theme } = useTheme();

  return (
    <form className={FORM}>
      {form.map((input, i) => (
        <div style={{borderColor:theme.colors.a, color: theme.colors.a}} className={INPUT_GROUP} key={`${i}-${input.name}`}>
          <input className={INPUT} {...[input.name]} type={input.type} id={`register-${input.name}`} /> 
          <label className={INPUT_LABEL} htmlFor={`register-${input.name}`}>
            {input.label}
          </label>
        </div>
      ))}
      <button style={{background:theme.colors.a, color:theme.text}} className={SUBMIT} type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
