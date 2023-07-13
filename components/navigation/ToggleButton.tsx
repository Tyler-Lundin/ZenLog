'use client'
import { toggleNav } from "@/_store/slices/uiSlice";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

export default function ToggleButton({ isOpen }: { isOpen: boolean }) {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(toggleNav())} variant="ghost" className="absolute top-1/2 right-2 w-fit -translate-y-1/2 md:hidden">
      {isOpen ? <AiOutlineClose className="text-3xl" /> : <RxHamburgerMenu className="text-3xl" />}
    </Button>
  )
}
