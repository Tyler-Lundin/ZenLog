"use client";
import Link from "next/link";
import useTheme from "../../hooks/useTheme";
import Logo from "../Logo";
import Smiley from "../Smiley";


const Hero = () => {
  const { theme } = useTheme();

  const // TAILWIND CLASSES
  HOVER = 'hover:opacity-70', 
  TRANSITION = 'transition duration-500 ease-in-out',
  SIZE = 'w-1/2 h-full p-4',
  POSITION = 'absolute top-0 left-0', 
  GRID = 'grid place-content-center',
  HERO_CONTAINER = `${SIZE} ${POSITION} ${GRID} bg-opacity-50 backdrop-blur-md`, 
  REGISTER = `text-center mt-2 rounded-lg px-6 py-2 text-2xl font-black ${TRANSITION} ${HOVER}`,
  OR_LOGIN = `flex items-center text-center mt-2 bg-black w-fit rounded-lg overflow-hidden`, 
  OR = `bg-black rounded-full w-fit px-2 py-1 text-white text-xl font-black`,
  LOGIN = `text-xl ${HOVER} ${TRANSITION} hover:underline px-4 w-fit py-1 text-md font-black rounded-r-lg`; 

  return (
    <div className={HERO_CONTAINER} style={{background:theme.background}}>
      <Logo />
      <Link style={{ background: theme.colors.a, color: theme.text }} className={REGISTER} href="/auth/register" >
        REGISTER
      </Link>
      <div className={OR_LOGIN}>
        <p style={{ color: 'white' }} className={OR}>or</p>
        <Link style={{ background:theme.colors.b, color: theme.text, }} className={LOGIN} href="/auth/login"> LOGIN </Link>
      </div>
    </div>
  );
};

export default Hero;
