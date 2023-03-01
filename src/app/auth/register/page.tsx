"use client";
import useTheme from "../../../hooks/useTheme";
import RegisterForm from "../../../components/forms/RegisterForm";
import LoginWithProviders from "../../../components/forms/LoginWithProviders";
import Logo from "../../../components/Logo";
import BackButton from "../../../components/ui/BackButton";
import LoginInstead from "../../../components/auth/LoginInstead";

  const REGISTER_PAGE = "grid h-screen w-screen place-content-center";

const RegisterPage = () => {
  const { theme } = useTheme();
  return (
    <div style={{ background: theme.background }} className={REGISTER_PAGE} >
      <Logo />
      <BackButton />
      <RegisterForm  />
      <LoginWithProviders />
      <LoginInstead />
    </div>
  );
};

export default RegisterPage;
