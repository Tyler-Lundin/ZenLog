'use client';
import { IoIosArrowBack } from "react-icons/io";
import useTheme from "../../../hooks/useTheme";

interface Props {
  onClick?: () => void
  color?: string
  className?: string
}

export default function CloseButton ({ onClick, color, className }: Props) {
  const { theme } = useTheme(); 
  if (!onClick) onClick = () => null; 
  if (!color) color = theme.text; 
  if (!className) className = `absolute top-0 left-0 p-4 text-white font-bold text-2xl`; 
  return (
    <button className={className} onClick={onClick}>
      <IoIosArrowBack color={color}/>
    </button>
  )
} 
