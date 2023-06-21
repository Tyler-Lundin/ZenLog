import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { addSetTag, removeSetTag } from "@/store/appSlice";
import { setNewTag } from "@/store/appSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useState } from "react";
import { IoJournalOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";


export default function TagsStep() {

  const { sets } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const dispatch = useDispatch<AppDispatch>();

  const [tagInput, setTagInput] = useState('')

  const setIndex = sets.length - 1
  const { tags } = sets[setIndex]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tag = event.target.value;
    setTagInput(tag);
    const lastChar = tag[tag.length - 1];
    if (lastChar !== ',') return;
    const newTagWithoutLastChar = event.target.value.slice(0, -1).trim();
    if (newTagWithoutLastChar.length === 0) return;
    dispatch(addSetTag({ setIndex, tag: newTagWithoutLastChar }));
    setTagInput('');
  };

  return (
    <>
      <label className="text-center text-2xl font-thin dark:text-white mb-4">
        Add Tags (Separated by Commas)
      </label>
      <div className="relative border-b dark:border-white border-black mx-auto grid justify-center">
        <div className="gap-1 flex">
          {tags.length > 0 && (
            tags.map((tag, i) => (
              <Badge variant={"default"} key={i} onClick={() => dispatch(removeSetTag({ setIndex, tagIndex: i }))}>{tag}</Badge>
            ))
          )}
        </div>
        <Input variant={"glass"} className="text-center text-2xl font-thin" placeholder="Tags" type="text" value={tagInput} onChange={handleChange} />
        <span className="text-2xl absolute right-0 bottom-0 dark:text-white">Tags</span>
        <IoJournalOutline className="absolute left-0 bottom-1 text-2xl dark:text-white" />
      </div>
    </>
  )
}

