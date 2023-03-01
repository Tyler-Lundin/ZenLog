import { useRouter } from "next/navigation"
import { IoIosArrowRoundBack, IoIosArrowBack } from "react-icons/io";
import useTheme from "../../hooks/useTheme";


type Props = {
  onClick?: () => void
  color?: string
  className?: string
}


export default function BackButton ({ onClick, color, className }: Props) {
  const router = useRouter();
  const { theme } = useTheme(); 
  if (!onClick) onClick = () => router.push('/'); 
  if (!color) color = theme.text; 
  if (!className) className = `absolute top-0 left-0 p-4 text-white font-bold text-2xl`; 
  return (
    <button className={className} onClick={onClick}>
      <IoIosArrowBack color={color}/>
    </button>
  )
}
