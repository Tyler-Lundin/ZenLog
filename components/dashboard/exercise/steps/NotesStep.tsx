import { Textarea } from "@/components/ui/textarea";
import { setNewNotes } from "@/store/appSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IoJournal, IoJournalOutline, IoPencil } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";


export default function NotesStep() {

  const { sets } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const dispatch = useDispatch<AppDispatch>();

  const setIndex = sets.length - 1
  const { notes } = sets[setIndex]

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = String(e.target.value);
    if (newNotes.length > 150) return
    dispatch(setNewNotes({ setIndex, notes: newNotes || "" }));
  }

  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        Any notes?
      </label>
      <div className="relative border-b dark:border-white border-black mx-auto  justify-center">
        <Textarea variant={"ghost"} className="text-center text-2xl font-thin mb-10" placeholder="Notes" value={notes} onChange={handleChange} />
        <IoPencil className="absolute left-0 bottom-1 text-2xl dark:text-white" />
      </div>
    </>
  )
}

// {
//   title: 'Notes?',
//     setIndex: 4,
//       content: (
//         <div className="flex gap-2">
//           <Label htmlFor={`set-${setIndex}-notes`}>Notes</Label>
//           <Textarea id={`set-${setIndex}-notes`} placeholder="Notes" value={sets[setIndex].notes} onChange={(event) => handleSetChange(setIndex, 'notes', event)} />
//         </div>
//       )
// },
