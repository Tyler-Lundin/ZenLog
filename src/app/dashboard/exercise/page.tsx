'use client';
import useTheme from "../../../hooks/useTheme";

const TRANSITION = 'transition-all duration-500 ease-in-out';

const DEBUG = false ? 'border border-red-500' : ''; 
const TOP = `w-full border-b ${DEBUG} pb-4`;
const BOTTOM = `w-full h-full ${DEBUG}`; 
const PAGE = `w-screen h-screen ${TRANSITION} overflow-hidden pt-14 px-4`;  

const CARD = `w-full h-full grid justify-items-center ${DEBUG}`; 
const CARD_TITLE = `text-lg font-bold px-4 w-full rounded-t-lg text-center ${DEBUG}`;
const CARDS = `grid grid-cols-3 gap-4 text-black ${DEBUG}`;

const DAY_LABELS = `text-md font-thin ${DEBUG}`;


export default function ExercisePage() {
  const { theme } = useTheme();

  const cards = [
    { label: 'Yesterday', dayLabels: ['Rest Day']},
    { label: 'Today', dayLabels: ['Chest and Back']}, 
    { label: 'Tomorrow', dayLabels: ['Arms and Sholders']},
  ]

  const c = {
    style: {
      color: theme.text,
    }
  } 

  return (
    <div style={{background:theme.background, color: theme.text}} className={PAGE}>
      <div className={TOP} style={{borderColor:theme.text}} >
        <div className={CARDS}>
          {cards.map((card) => (
            <div className={CARD} key={`${card.label}-card`}>
              <h2 {...c} className={CARD_TITLE}>{card.label}</h2>
              <div>
                {card.dayLabels.map((dayLabel) => (
                  <p {...c} className={DAY_LABELS} key={`${dayLabel}-dayLabel`}>{dayLabel}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className={BOTTOM}> 

      </div>
    </div>
  );
}
