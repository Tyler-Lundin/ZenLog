'use client';
import LoginForm from "../../../components/forms/LoginForm";
import useTheme from "../../../hooks/useTheme";
import LoginWithProviders from "../../../components/forms/LoginWithProviders";
import Logo from "../../../components/Logo";
import BackButton from "../../../components/ui/BackButton";
import RegisterInstead from "../../../components/auth/RegisterInstead";

  const LOGIN_PAGE = 'grid h-screen w-screen place-content-center';

const LoginPage = () => {
  const { theme } = useTheme();
  return (
    <div style={{ background: theme.background }} className={LOGIN_PAGE} >
      <BackButton />
      <Logo />
      <LoginForm />
      <LoginWithProviders />
      <RegisterInstead />
    </div>
  );
};

export default LoginPage;
