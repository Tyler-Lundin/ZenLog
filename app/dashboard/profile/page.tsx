import Page from "@/components/Page";
import DashboardBlock from "@/components/dashboard/DashboardBlock";
import { getServerSession } from "next-auth";
import Image from "next/image";


export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session) return null;
  const { name, email, image } = session.user;
  return (
    <Page>
      <DashboardBlock>
        {image ? <Image className="rounded-full" src={image} alt="user" width={120} height={120} /> : <div className="w-[120px] h-[120px] animate-pulse rounded-full bg-gray-500 aspect-square" />}
        <h1 className="text-4xl uppercase font-black tracking-widest text-black dark:text-white">{name}</h1>
        <h2 className="text-md font-light text-black dark:text-white">{email}</h2>
        <hr className="w-full border-gray-500 my-4 text-black dark:text-white" />
      </DashboardBlock>
    </Page>
  )
}
