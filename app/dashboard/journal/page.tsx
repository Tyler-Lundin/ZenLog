"use client";
import Page from "@/components/Page";
import useJournal from "@/hooks/useJournal";
import { dateToTime } from "@/lib/utils";
import { JournalEntry } from "@prisma/client";


const JournalEntryCard = ({ id, title, body, createdAt }: Omit<JournalEntry, "updatedAt">) => (
  <div className="flex flex-col gap-2 p-4 bg-white rounded shadow" key={id}>
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <div className="text-sm text-gray-500">Date</div>
        <div className="text-lg">{dateToTime(createdAt as unknown as string)}</div>
      </div>
    </div>
    <div className="flex flex-col">
      <div className="text-sm text-gray-500">Title</div>
      <div className="text-lg">{title}</div>
    </div>

    <div className="flex flex-col">
      <div className="text-sm text-gray-500">Entry</div>
      <div className="text-lg">{body}</div>
    </div>
  </div>
);

export default function JournalPage() {
  const { currentEntry, journalEntries } = useJournal();
  return (
    <Page className="pt-16">
      <div className="flex flex-wrap gap-4 p-8">
        {journalEntries.map((entry) => (
          <JournalEntryCard key={entry.id} {...entry} />
        ))}

      </div>
    </Page>
  )
}
