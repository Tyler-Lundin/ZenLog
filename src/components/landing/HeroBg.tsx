'use client';
import useEvents from "../../hooks/useEvents";
import useTheme from "../../hooks/useTheme";
import type { ITheme } from "../../types";
import EventButton from "../dashboard/EventButton";
import Events from '../dashboard/Events';

  const 
  POSITION = 'absolute right-0 top-0', 
  SIZE = 'h-screen w-1/2',
  GRID = 'grid justify-items-center items-end',
  BACKGROUND = `${POSITION} ${SIZE} ${GRID}`, 
  HOVER = 'hover:-translate-y-2', 
  FOCUS = 'focus:scale-110',
  SIG_POS = 'absolute bottom-1 right-1 z-20',
  FONT = 'text-sm text-white bg-black font-thin uppercase',
  TRANSITION = 'transition duration-500 ease-in-out',
  SIGNATURE = `${SIG_POS} ${FONT} ${HOVER} ${FOCUS} ${TRANSITION} p-1 rounded-md`,
  EVENTS_CONTAINER = `grid gap-2 w-full h-full overflow-y-auto place-content-center p-16`, 
  EVENTS_LIST = 'grid grid-cols-2 gap-6', 
  BUTTON_STYLE = 'hover:brightness-125 z-30 hover:shadow-lg hover:shadow-black',
  EVENT_BTN = `${BUTTON_STYLE} ${FONT} ${HOVER} ${FOCUS} ${TRANSITION} p-1 rounded-md`

export default function HeroBg(){
  const { theme } = useTheme();
  return (
    <div className={BACKGROUND} style={{background:theme.colors.c}}>
      <div className={EVENTS_CONTAINER}>
        <Events theme={theme} />
      </div>
      <h6 id="signature" className={SIGNATURE} >
        by <a href="https://github.com/Tyler-Lundin" target="_blank" rel="noreferrer" >
          Tyler Lundin
        </a>
      </h6>
    </div>
  );
} 


const Events = ({ theme }: { theme: ITheme }) => {
  const { EVENTS } = useEvents(); 
  return (
    <div className={EVENTS_LIST}>
      {EVENTS.map((event, index:number) => (  
        <EventButton key={event.name} className={EVENT_BTN} name={event.name} icon={event.icon} theme={theme} index={index}/>
      ))}
    </div>
  );
};
