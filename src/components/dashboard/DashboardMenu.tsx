'use client';
import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import EventButton from "./EventButton";
import useEvents from "../../hooks/useEvents";
import SettingsButton from "./SettingsButton";
import Logo from "../Logo";
import CloseButton from './nav/CloseButton';


  const DASHBOARD_MENU = 'w-screen h-screen fixed top-0 z-10 overflow-y-auto grid place-items-center gap-4 pt-20 transition-all duration-500 ease-in-out no-scrollbar'
  const OPEN = `${DASHBOARD_MENU} left-0`;
  const CLOSED = `${DASHBOARD_MENU} -left-full`;

  const TRANSITION = 'transition-all duration-500 ease-in-out';
  const BUTTONS = 'grid gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 pb-20';
  const LOGO = `fixed top-0 w-screen grid place-items-center py-2 border-b ${TRANSITION} z-20`;

const DashboardMenu = () => {
  const { theme, rotateTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { EVENTS } = useEvents();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); 
  const openSettings = () => setIsSettingsOpen(true);

  return (
    <>
      <div className={isOpen?OPEN:CLOSED} style={{background:theme.colors.b}} >
        <CloseButton onClick={onClickCloseButton}/>
        <Logo className={LOGO} />

        <div className={BUTTONS}>
          {EVENTS.map((event, index:number) => (
            <EventButton key={event.name} name={event.name} icon={event.icon} theme={theme} index={index}/>
          ))}
        </div>

        <SettingsButton handleClick={openSettings}/>
      </div>
    </>
  )
}

export default DashboardMenu;
