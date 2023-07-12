import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/_store";
import { useState } from "react";
import { IoJournalOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { pushNewTag, removeTag } from "@/_store/slices/exerciseSlice";


export default function TagsStep() {

  const { tags } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();

  const [tagInput, setTagInput] = useState('')


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tag = event.target.value;
    setTagInput(tag);
    const lastChar = tag[tag.length - 1];
    if (lastChar !== ',') return;
    const newTagWithoutLastChar = event.target.value.slice(0, -1).trim();
    if (tags.includes(newTagWithoutLastChar)) return;
    if (newTagWithoutLastChar.length === 0) return;
    dispatch(pushNewTag(newTagWithoutLastChar));
    setTagInput('');
  };

  const handleEnterPress = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.key !== 'Enter') return;
    const newTag = tagInput.trim();
    if (newTag.length === 0) return;
    dispatch(pushNewTag(newTag));
    setTagInput('');
  };

  return (
    <div className="w-full">
      <div className="grid text-center ">
        <label className=" text-2xl font-thin dark:text-white">
          Add Tags
        </label>
        <small className="text-sm text-gray-400"> (optional, comma separated)</small>
      </div>
      <div className="relative border-b dark:border-white border-black mx-auto grid justify-center">
        <div className="gap-1 flex">
          {tags.length > 0 && (
            tags.map((tag, i) => (
              <Badge variant={"default"} key={i} onClick={() => dispatch(removeTag(i))}>{tag}</Badge>
            ))
          )}
        </div>
        <Input onKeyUp={handleEnterPress} variant={"glass"} className="text-center text-2xl font-thin" placeholder="Tags" type="text" value={tagInput} onChange={handleChange} />
        <span className="text-xl absolute right-0 bottom-0 dark:text-white">Tags</span>
        <IoJournalOutline className="absolute left-0 bottom-1 text-2xl dark:text-white" />
      </div>
    </div>
  )
}

