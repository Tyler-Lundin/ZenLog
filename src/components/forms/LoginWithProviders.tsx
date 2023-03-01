import { signIn } from "next-auth/react";
import { AiFillFacebook, AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import useTheme from "../../hooks/useTheme";


const CONTAINER = 'flex justify-center items-center gap-x-2 rounded-lg p-2';
const PROVIDER = 'grid place-content-center px-4 py-1 w-12 h-12 rounded-xl bg-white justify-items-center';
const LoginWithProviders = () => {

  const { theme } = useTheme();

  const PROVIDERS = [
    { name: 'google', icon: <AiFillGoogleCircle color={theme.oT} />, onClick: ()=> signIn('google', {callbackUrl: '/dashboard'}) },
    { name: 'facebook', icon: <AiFillFacebook color={theme.oT}/> },
    { name: 'github', icon: <AiFillGithub color={theme.oT}/> },
  ]

  return (
    <div className={CONTAINER}>
      {PROVIDERS.map(({ name, icon, onClick }) => (
        <button style={{background:theme.text}} className={PROVIDER} key={`provider-${name}`} onClick={onClick}>
          {icon} 
        </button>
      ))}
    </div>
  )
}

export default LoginWithProviders;
