import { useState } from "react"


export default function useJournal() {
  const [currentEntry, setCurrentEntry] = useState<number | null>(null)

  return {
    currentEntry,
    journalEntries: [
      { id: '1', title: 'First Entry', body: 'This is the first entry', createdAt: new Date() },
      { id: '2', title: 'Second Entry', body: 'This is the second entry', createdAt: new Date() },
      { id: '3', title: 'Third Entry', body: 'This is the third entry', createdAt: new Date() },
    ],
  }
}
