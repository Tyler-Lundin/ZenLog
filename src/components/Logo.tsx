import useTheme from "../hooks/useTheme";
import Smiley from "./Smiley";



export interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const
  TRANSITION = "transition duration-500 ease-in-out",
  TEXT = `${TRANSITION} text-5xl cursor-pointer font-black flex items-center justify-items-center whitespace-nowrap mx-auto`

export default function Logo ({ className = '', style = {}, onClick }: LogoProps){
  const { theme, rotateTheme } = useTheme();
  const LOGO = `${TEXT} ${className}`
  if (!onClick) onClick = rotateTheme as () => void;
  if (!style.color) style.color = theme.colors.a;
  return (
    <h1 className={LOGO} style={style} onClick={onClick}>
      ZEN L<Smiley bg={theme.colors.a} fill={theme.background} scale={.75}/>G
    </h1> 
  )
}
