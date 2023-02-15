"use client";
import Link from "next/link";
import useTheme from "../../hooks/useTheme";
import Smiley from "../Smiley";

const HERO_TITLE = "text-7xl cursor-pointer font-black flex items-center justify-items-center whitespace-nowrap";

const TRANSITION = 'transition duration-500 ease-in-out';
const SIZE = 'w-fit h-fit p-4'
const POSITION = 'absolute top-4 left-4'; 
const GRID = 'grid place-content-center';
const STYLE = 'rounded-3xl'; 
const HERO_CONTAINER = `${SIZE} ${POSITION} ${GRID} ${STYLE} backdrop-blur-md `; 
const SLOGAN = `text-md text-center md:text-left lg:text-left xl:text-left tracking-wide`

const REGISTER = `text-center mt-2 rounded-lg px-6 py-2 text-2xl font-black ${TRANSITION}`;
const OR_LOGIN = `grid items-center text-center gap-x-2 mt-2`; 
const OR = `text-sm`;
const LOGIN = `text-xl  ${TRANSITION} hover:underline px-6 py-1 text-md font-black rounded-md mt-2`; 

const Hero = () => {
  const { theme, rotateTheme } = useTheme();

  return (
    <div className={HERO_CONTAINER} style={{background:'rgba(0,0,0,0.8)'}}>
      <h1 onClick={rotateTheme as () => void} style={{ color: 'white' }} className={HERO_TITLE} >
        ZEN L<Smiley bg={'white'} fill={'black'} />G
      </h1>
      <p style={{ color: 'white' }} className={SLOGAN}>
        Track Your Life - Elavate Your Life <br/> Zen Log The App for Mindful Living
      </p>
      <Link style={{ background: theme.colors.a, color: 'white' }} className={REGISTER} href="/auth/register" >
        REGISTER
      </Link>
      <div className={OR_LOGIN}>
        <p style={{ color: 'white' }} className={OR}>OR</p>
        <Link style={{ background:theme.colors.b, color: 'white' }} className={LOGIN} href="/auth/login"> LOGIN </Link>
      </div>
    </div>
  );
};

export default Hero;
