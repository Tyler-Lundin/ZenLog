"use client";
import { useSession } from "next-auth/react";
import Hero from "../components/landing/Hero";
import HeroBackground from "../components/landing/HeroBackground";
import useTheme from "../hooks/useTheme";


  const TRANSITION = 'transition-all duration-500 ease-in-out';
  const SIZE = 'h-screen w-screen';
  const GRID = 'grid';
  const HOME_PAGE  = `${TRANSITION} ${SIZE} ${GRID} overflow-hidden` 

export default function HomePage() {
  const { theme } = useTheme();
  return (
    <div style={{background:theme.background}} className={HOME_PAGE}>
      <HeroBackground />
      <Hero />
    </div>
  );
}
