'use client';
import PrivacyPolicy from "../../components/information/PrivacyPolicy"
import Smiley from "../../components/Smiley";
import useTheme from "../../hooks/useTheme"

const TRANSITION = 'transition duration-500 ease-in-out';
const PAGE = `flex flex-col items-center justify-center w-full h-full ${TRANSITION}`;

const TITLE = `text-7xl cursor-pointer font-black flex items-center justify-items-center whitespace-nowrap ${TRANSITION}}`;
const InformationPage = () => {
  const { theme, rotateTheme } = useTheme(); 
  return (
    <div className={PAGE} style={{background: theme.oT, color: theme.text}}>
      <span onClick={rotateTheme as () => void} style={{ color: theme.colors.a }} className={TITLE}> 
        ZEN L<Smiley bg={theme.colors.a} fill={theme.oT} classname={TRANSITION}/>G
      </span>
      <PrivacyPolicy />
    </div>
  )
}

export default InformationPage;
