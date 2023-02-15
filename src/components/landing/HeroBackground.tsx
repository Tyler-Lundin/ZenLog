import useEvents from "../../hooks/useEvents";
import useTheme from "../../hooks/useTheme";
import type { ITheme } from "../../types";
import EventButton from "../dashboard/EventButton";


const POSITION = 'absolute left-0 top-0';
const SIZE = 'h-screen w-full';
const GRID = 'grid place-content-center';
const BACKGROUND = `${POSITION} ${SIZE} ${GRID} overflow-hidden`;

const HOVER = 'hover:-translate-y-2'; 
const FOCUS = 'focus:scale-110';
const POS = 'absolute bottom-1 right-1 z-20';
const FONT = 'text-sm text-white bg-black font-thin uppercase';
const TRANSITION = 'transition duration-500 ease-in-out';
const SIGNATURE = `${POS} ${FONT} ${HOVER} ${FOCUS} ${TRANSITION} p-1 rounded-md`;

const HeroBackground = () => {
  const { theme } = useTheme();
  return (
    <div style={{ background: theme.background }} className={BACKGROUND}>
      <div className="grid translate-x-1/2 rotate-12 -skew-x-12 scale-150 gap-2">
        <Events theme={theme} />
      </div>
      <h6 id="signature" className={SIGNATURE} >
        by <a href="https://github.com/Tyler-Lundin" target="_blank" rel="noreferrer" >
          Tyler Lundin
        </a>
      </h6>
    </div>
  );
};


  const EVENTS_LIST = 'grid grid-cols-2 gap-6'; 
  const BUTTON_STYLE = 'brightness-75 hover:brightness-100';
const Events = ({ theme }: { theme: ITheme }) => {
  const { EVENTS } = useEvents();

  return (
    <div className={EVENTS_LIST}>
      {EVENTS.map((event, index:number) => (
        <EventButton className={BUTTON_STYLE} key={event.name} name={event.name} icon={event.icon} theme={theme} index={index}/>
      ))}
    </div>
  );
};

export default HeroBackground;
