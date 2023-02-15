"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import useTheme from "../../hooks/useTheme";
import Smiley from "../Smiley";
import OpenNavButton from "./OpenNavButton";

const CSS = {
  NAV_CLOSED:
    "absolute top-0 left-full w-full h-full bg-black text-white transition-all duration-500",
  NAV_OPEN:
    "absolute top-0 left-0 w-full h-full bg-black text-white transition-all duration-500",
  UL: "flex flex-col justify-center items-center h-full",
  LI: "text-4xl",
  CLOSE:
    "bg-white hover:bg-black focus:bg-black text-black hover:text-white focus:text-white absolute top-4 right-4 rounded-full p-1 transition-all duration-500 ease-in-out",
  H2: "text-md text-center w-8 h-8 grid place-content-center font-bold tracking-widest uppercase text-center text-inherit p-2 rounded-full",
  SMILEY: "absolute bottom-4 left-4 rounded-full p-1",
};

const Navigation = () => {
  const { props, handleClick, isNavOpen } = useNavigation();
  const { NAV_CLOSED, NAV_OPEN, UL, LI, CLOSE, H2, SMILEY } = CSS;
  const { theme, rotateTheme } = useTheme();

  const handleClickSmiley = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    rotateTheme();
  };

  const style = {
    li: { color: theme.text },
  };

  return (
    <>
      <OpenNavButton {...props} />
      <nav
        style={{ background: theme.background }}
        className={isNavOpen ? NAV_OPEN : NAV_CLOSED}
      >
        <button className={CLOSE} onClick={handleClick}>
          <h2 className={H2}>x</h2>
        </button>
        <ul className={UL}>
          <li style={style.li} className={LI}>
            <Link href="/"> HOME </Link>
          </li>
        </ul>
        <button className={SMILEY} onClick={handleClickSmiley}>
          <Smiley bg={theme.colors.a} fill={theme.background} />
        </button>
      </nav>
    </>
  );
};

export default Navigation;
