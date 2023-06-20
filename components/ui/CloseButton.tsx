import { AiOutlineClose } from "react-icons/ai";
import { Button } from "./button";

export default function CloseButton({ onClick }: { onClick?: () => void }) {

  if (onClick) return (
    <Button variant="destructive" size="lgSquare" onClick={onClick} className="top-4 right-4 absolute"><AiOutlineClose /></Button>
  )
  return (
    <Button variant="destructive" type="button" size="lgSquare" className="top-4 right-4 absolute"><AiOutlineClose /></Button>
  )
}
