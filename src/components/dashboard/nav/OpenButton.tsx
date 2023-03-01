'use client';
import { IoMenu } from "react-icons/io5";
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
  if (!className) className = `absolute top-0 right-0 p-4 text-white font-bold text-2xl`; 
  return (
    <button className={className} onClick={onClick}>
      <IoMenu color={color}/>
    </button>
  )
} 
