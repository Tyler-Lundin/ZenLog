import { type ITheme } from "../../types";


const 
  EVENT_TITLE = 'text-lg sm:text-xl md:text-xl lg:text-2xl font-bold',
  EVENT_HOVER = 'hover:scale-110 hover:shadow-lg cursor-pointer',
  EVENT_FOCUS = 'focus:scale-110 focus:shadow-lg',
  EVENT = `py-4 px-8 rounded-lg grid place-content-center relative transition-all duration-500 ease-in-out ${EVENT_FOCUS} ${EVENT_HOVER}`;


interface Props {
  name: string;
  icon: JSX.Element;
  theme: ITheme;
  className?: string;
}

const EventButton = ({name, icon, theme, className = ''}:Props) => {

  const 
    ICON = `bg-[${theme.colors.a}] text-3xl absolute top-1/2 transform -translate-y-1/2 rounded-full p-2 w-12 h-12 transition-all duration-500 ease-in-out`;

  return(
    <div className={`${EVENT} ${className}`} key={name} style={{background:theme.text}}>
      <h2 className={EVENT_TITLE} style={{color:theme.colors.a}}>{name}</h2> 
      <div className={ICON}>
          {icon}
      </div>
    </div>
  )
}

export default EventButton;
