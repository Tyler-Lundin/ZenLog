import { AiOutlineLeft } from "react-icons/ai";
import { buttonVariants } from "./button";
import Link from "next/link";

export default function BackLink({ href }: { href: string }) {
  return (
    <Link href={href} className={`${buttonVariants({ variant: 'glass', size: 'lgSquare' })} top-4 left-4 z-[55] fixed`}><AiOutlineLeft /></Link>
  )
}
