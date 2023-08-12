import { Textarea } from "@/components/ui/textarea";
import { AppDispatch, RootState } from "@/_store";
import { useDispatch, useSelector } from "react-redux";
import { setNewNotes } from "@/_store/slices/exerciseSlice";
import { Button } from "@/components/ui/button";


export default function NotesStep() {

  const { notes } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const noNewLineToStart = e.target.value.replace(/^\n/, "");
    const newNotes = noNewLineToStart.slice(0, 100);
    if (newNotes.length > 100) return
    dispatch(setNewNotes(newNotes));
  }

  const handleClear = () => {
    dispatch(setNewNotes(undefined));
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black  grid place-content-center">
      <label className="text-center text-md sm:text-2xl font-thin dark:text-white mt-8">
        notes?
      </label>
      <div className="relative">
        <div className="relative mx-auto  justify-center min-h-max ">
          <Textarea variant={"ghost"} className="h-40 resize-none text-left text-2xl font-thin mb-10 border border-black/25 dark:border-white/25" placeholder="Notes" value={notes} onChange={handleChange} />
          <span className="text-sm font-light opacity-/50 absolute right-1 bottom-0 dark:text-white">{notes ? notes.length : 0}/100</span>
        </div>
        <Button variant="glass" size="xl" className="absolute bottom-0 left-1/2 -translate-x-1/2" onClick={handleClear}>Clear</Button>
      </div>
    </div>
  )
}

