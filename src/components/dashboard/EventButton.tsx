import { type ITheme } from "../../types";


  const EVENT_TITLE = 'text-2xl font-bold';
  const EVENT_HOVER = 'hover:scale-110 hover:shadow-lg cursor-pointer';
  const EVENT_FOCUS = 'focus:scale-110 focus:shadow-lg';
  const EVENT = `py-4 px-8 rounded-lg grid place-content-center relative transition-all duration-500 ease-in-out ${EVENT_FOCUS} ${EVENT_HOVER}`;

  const ICON = 'text-3xl absolute top-1/2 transform -translate-y-1/2 rounded-full p-2 w-12 h-12 transition-all duration-500 ease-in-out'
  const ICON_L = `${ICON} left-0 -translate-x-1/2`;
  const ICON_R = `${ICON} right-0 translate-x-1/2`;

interface Props {
  name: string;
  icon: JSX.Element;
  theme: ITheme;
  index: number;
  className?: string;
}

const EventButton = ({name, icon, theme, index, className = ''}:Props) => {

  return(
    <div className={`${EVENT} ${className}`} key={name} style={{background:theme.text}}>

      <h2 className={EVENT_TITLE} style={{color:theme.colors.a}}>{name}</h2> 

      <div className={index % 2 === 0 ? ICON_L : ICON_R} style={{background:theme.text, color: theme.colors.a}}>
        {icon}
      </div>
    </div>
  )
}

export default EventButton;
