import { AiFillSetting } from "react-icons/ai";
import useTheme from "../../hooks/useTheme";

  const TRANSITION = 'transition-all duration-500 ease-in-out';
  const HOVER = 'hover:rotate-180';
  const SETTINGS_BUTTON = ` ${HOVER} ${TRANSITION} absolute bottom-2 right-2 z-20`;

const SettingsButton = ({handleClick}:{handleClick:()=>void}) => {
  const { theme } = useTheme();

  return (
    <div className={SETTINGS_BUTTON} onClick={handleClick}>
      <AiFillSetting size={40} color={theme.colors.a} />
    </div> 
  )
}

export default SettingsButton;
