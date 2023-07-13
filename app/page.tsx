import Hero from '@/components/Hero'
import Page from '@/components/Page'

export default async function Home() {
  return (
    <Page className="overflow-y-hidden">
      {/* @ts-expect-error Promise Hero (SERVER COMPONENT) */}
      <Hero />
    </Page>
  )
}
