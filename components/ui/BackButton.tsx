import { AiOutlineLeft } from "react-icons/ai";
import { Button } from "./button";

export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="glass" size="lgSquare" onClick={onClick} className="top-4 left-4 z-[55] absolute"><AiOutlineLeft /></Button>
  )
}
