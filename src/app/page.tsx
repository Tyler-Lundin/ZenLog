'use client';
import Hero from "../components/landing/Hero";
import HeroBg from "../components/landing/HeroBg";

  const TRANSITION = 'transition-all duration-500 ease-in-out';
  const SIZE = 'h-screen w-screen';
  const GRID = 'grid';
  const HOME_PAGE  = `${TRANSITION} ${SIZE} ${GRID} overflow-hidden` 

export default function HomePage() {
  return (
    <div className={HOME_PAGE}>
      <Hero />
    </div>
  );
}
