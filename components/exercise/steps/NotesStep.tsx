import { Textarea } from "@/components/ui/textarea";
import { AppDispatch, RootState } from "@/_store";
import { IoPencil } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setNewNotes } from "@/_store/slices/exerciseSlice";


export default function NotesStep() {

  const { notes } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = String(e.target.value);
    if (newNotes.length > 150) return
    dispatch(setNewNotes(newNotes));
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white dark:bg-black  grid place-content-center">
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        notes?
      </label>
      <div className="relative mx-auto  justify-center">
        <Textarea variant={"ghost"} className="text-left text-2xl font-thin mb-10" placeholder="Notes" value={notes} onChange={handleChange} />
      </div>
    </div>
  )
}

