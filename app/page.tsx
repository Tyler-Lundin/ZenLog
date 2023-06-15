import Hero from '@/components/Hero'
import Page from '@/components/Page'
import { authOptions } from '@server/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';


export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');
  return (
    <Page className="overflow-y-hidden">
      {/* @ts-expect-error Promise Hero (SERVER COMPONENT) */}
      <Hero />
    </Page>
  )
}
