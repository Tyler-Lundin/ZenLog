"use client";
import LoginForm from "../../../components/forms/LoginForm";
import useTheme from "../../../hooks/useTheme";
import useLoginPage from "../../../hooks/useLoginPage";
import Link from "next/link";

const LoginPage = () => {
  const props = useLoginPage();
  const { theme } = useTheme();

  const TITLE = "text-4xl font-bold text-center text-white mb-4";

  return (
    <div
      style={{ background: theme.background }}
      className="grid h-screen w-screen place-content-center"
    >
      <h1 className={TITLE}>Login</h1>

      <LoginForm {...props} theme={theme} />

      <div className="mt-4 text-center text-white">
        <p>Don&apos;t have an account?</p>
        <Link href="/auth/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
