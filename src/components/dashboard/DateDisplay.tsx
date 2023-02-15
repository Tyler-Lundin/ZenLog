"use client";
import { atom, useAtom } from "jotai";
import useTheme from "../../hooks/useTheme";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


  const DATE_POS = 'absolute top-0 left-1/2 -translate-x-1/2 z-10';
  // const WEEKDAY = 'text-sm uppercase px-3 py-1 rounded-b-md';
  const DATE_STRING = 'text-md px-3 py-1 rounded-b-lg'
  const DATE = `${DATE_POS} text-center`
  const DATE_POPUP = 'absolute top-0 left-0 w-screen h-screen backdrop-blur-md backdrop-brightness-50 grid place-content-center'; 
  const CLOSE_POPUP = 'absolute top-0 left-0 p-2 text-2xl font-bold text-white rounded-md';

export const isDateMenuOpen = atom(false);
export const currentDateAtom = atom(new Date()); 

export default function DateDisplay() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useAtom(isDateMenuOpen); 
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom);
  const todayString = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

  const handleCalendarChange = (date:Date) => {
    setCurrentDate(date);
    setIsOpen(!isOpen);
  }
  
  return (
    <>
        <div className={DATE} onClick={()=>setIsOpen(!isOpen)}> 
          <h1 className={DATE_STRING} style={{color:theme.text, background: theme.colors.a}}>{todayString}</h1>
        </div>

      {isOpen && ( 
        <div className={DATE_POPUP} style={{color:theme.text}}>
          <button className={CLOSE_POPUP} onClick={()=>setIsOpen(!isOpen)}>Close</button>
          <Calendar 
            value={currentDate}
            onChange={handleCalendarChange}
            calendarType='US'
            locale='en-US'
            style={{background: theme.background, color: theme.text}}
            className='text-black'
          />
        </div>
      )}

    </>
  );
}
