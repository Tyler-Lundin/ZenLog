"use client";
import useTheme from "../../../hooks/useTheme";
import useRegisterPage from "../../../hooks/useRegisterPage";
import Link from "next/link";
import RegisterForm from "../../../components/forms/RegisterForm";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import LoginWithProviders from "../../../components/forms/LoginWithProviders";


  
  const TITLE = "text-4xl font-bold text-center text-white mb-4";
  const BACK_BUTTON = "absolute top-0 left-0 p-4 text-white font-bold text-2xl";
  const REGISTER_PAGE = "grid h-screen w-screen place-content-center";

const RegisterPage = () => {
  const props = useRegisterPage();
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div style={{ background: theme.background }} className={REGISTER_PAGE} >
      <button className={BACK_BUTTON} onClick={() => router.push('/')}> 
        <IoIosArrowBack color={theme.text}/> 
      </button>  

      <h1 style={{color:theme.text}} className={TITLE}>Register</h1>
      <RegisterForm {...props} />
      <LoginWithProviders />
      <div style={{color:theme.text}} className=" text-center text-white">
        <p>Already have an account?</p>
        <Link href="/auth/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
