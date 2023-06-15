import Page from "@/components/Page";
import TitleBlock from "@/components/dashboard/TitleBlock";
import Settings from "@/components/settings/Settings";

export default function SettingsPage() {
  return (
    <Page>
      <div className="grid gap-4">
        <TitleBlock title="Settings" />
        <Settings />
      </div>
    </Page>

  )
}

