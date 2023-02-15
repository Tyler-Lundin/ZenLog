'use client';
import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import Smiley from "../Smiley";
import EventButton from "./EventButton";
import useEvents from "../../hooks/useEvents";
import { BiMenuAltRight } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import SettingsButton from "./SettingsButton";


  const DASHBOARD_MENU = 'w-screen h-screen fixed top-0 z-10 overflow-y-auto grid place-items-center gap-4 pt-20 transition-all duration-500 ease-in-out no-scrollbar'
  const OPEN = `${DASHBOARD_MENU} left-0`;
  const CLOSED = `${DASHBOARD_MENU} -left-full`;

  const BUTTONS = 'grid gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 pb-20';
  const SMILEY = 'fixed top-0 w-screen grid place-items-center py-2 border-b transition-all duration-500 ease-in-out';
  const TOGGLE_BUTTON = 'fixed top-2 right-2 z-20 text-5xl';

const DashboardMenu = () => {
  const { theme, rotateTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { EVENTS } = useEvents();

  return (
    <>
      <button style={{color:theme.colors.a}} className={TOGGLE_BUTTON} onClick={()=>setIsOpen(ps=>!ps)} >
        {isOpen ? <IoMdClose /> : <BiMenuAltRight />}
      </button>

      <div className={isOpen?OPEN:CLOSED} style={{background:theme.background}} >

        <div className={BUTTONS}>
          {EVENTS.map((event, index:number) => (
            <EventButton key={event.name} name={event.name} icon={event.icon} theme={theme} index={index}/>
          ))}
        </div>

        <div className={SMILEY} onClick={rotateTheme} style={{background:theme.background}}>
          <Smiley fill={theme.background} bg={theme.colors.a}/>
        </div>

        <SettingsButton handleClick={openSettings}/>
      </div>
    </>
  )
}

export default DashboardMenu;
