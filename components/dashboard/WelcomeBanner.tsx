'use client';
import Image from "next/image";
import DashboardBlock from "./DashboardBlock";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "../ui/button";
import { closeWelcomeDialog } from "@/store/uiSlice";
import { useSession } from "next-auth/react";


export default function WelcomeBanner() {
  const { data: session } = useSession();
  const imageSrc = session?.user?.image
  const dispatch = useDispatch<AppDispatch>()
  const isWelcomeDialogOpen = useSelector((state: RootState) => state.ui.dashboard.isWelcomeDialogOpen)
  console.log('rendering welcome banner')

  if (!isWelcomeDialogOpen) return null

  return (
    <DashboardBlock>
      <span className="h-2" />
      <Button onClick={() => dispatch(closeWelcomeDialog())} variant="ghost" className="absolute top-1 right-1 h-6 w-6 p-1 dark:bg-white bg-black text-white dark:text-black dark:hover:text-white dark:hover:bg-transparent">
        <AiOutlineClose />
      </Button>
      <div className="flex w-full h-full gap-2">
        {imageSrc ? <Image className="rounded-full" alt="user" src={imageSrc} width={90} height={90} /> : <div className="w-[90px] h-[90px] animate-pulse rounded-full bg-gray-500 aspect-square" />}
        <div className="w-full h-full grid place-items-center">
          <h1 className="text-xl lg:text-3xl font-black dark:text-white">Welcome {session?.user?.name?.split(' ')[0]}!</h1>
        </div>
      </div>
      <hr className="w-full border-gray-500 my-4" />
    </DashboardBlock>
  )
}

