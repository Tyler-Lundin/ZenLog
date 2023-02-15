import { useState } from "react";

export const useNavigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const openNav = () => setIsNavOpen(true);
  const closeNav = () => setIsNavOpen(false);
  const props = { openNav, closeNav };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeNav();
  };

  return {
    props,
    handleClick,
    isNavOpen,
  };
};
