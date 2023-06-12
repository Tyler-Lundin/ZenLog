
import { Button } from '@/components/ui/button';
import { ExerciseSet } from '@prisma/client';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface ExerciseSetProps {
  set: ExerciseSet;
  setIndex: number;
  handleSetChange: (index: number, field: keyof ExerciseSet, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setSets: React.Dispatch<React.SetStateAction<ExerciseSet[]>>;
  sets: ExerciseSet[];
  handleBooleanChange: (index: number, field: keyof ExerciseSet, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExerciseSetComponent: React.FC<ExerciseSetProps> = ({ set, setIndex, handleSetChange, setSets, sets, handleBooleanChange }) => {
  const [newTag, setNewTag] = useState('');

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
    const lastChar = event.target.value[event.target.value.length - 1];
    if (lastChar !== ',' && lastChar !== ' ') return;
    const newTagWithoutLastChar = event.target.value.slice(0, -1).trim();
    if (newTagWithoutLastChar.length === 0) {
      setNewTag('');
      return;
    }

    const newSets = [...sets];
    if (newSets[setIndex].tags.length >= 6) {
      setNewTag('');
      return;
    }

    newSets[setIndex] = {
      ...newSets[setIndex],
      tags: [...newSets[setIndex].tags, newTagWithoutLastChar],
    };
    setSets(newSets);
    setNewTag('');
  };

  const handleRemoveTag = (tagIndex: number) => {
    const newSets = [...sets];
    newSets[setIndex] = {
      ...newSets[setIndex],
      tags: newSets[setIndex].tags.filter((_, index) => index !== tagIndex),
    };
    setSets(newSets);
  };

  return (
    <div key={setIndex} className="border dark:border-zinc-600 shadow-md bg-gray-200 dark:bg-zinc-900 border-black p-8 rounded-lg relative grid gap-4 pt-14">
      <h3 className="absolute dark:text-black text-white top-4 uppercase font-black tracking-wider bg-black dark:bg-zinc-400 px-4 rounded-md left-8">Set {setIndex + 1}</h3>
      <Button variant="destructive" size="smSquare" className="p-2 absolute text-md top-2 right-8" onClick={() => setSets(sets.filter((_, i) => i !== setIndex))}> <AiOutlineClose /> </Button>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">Reps</label>
        <input className="p-2 w-full rounded-md dark:bg-zinc-400" type="number" value={set.reps} onChange={(event) => handleSetChange(setIndex, 'reps', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">Weight</label>
        <input className="p-2 w-full rounded-md dark:bg-zinc-400" type="number" value={set.weight} onChange={(event) => handleSetChange(setIndex, 'weight', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">To Failure</label>
        <input className="w-8 dark:bg-zinc-400" type="checkbox" checked={set.toFailure} onChange={(event) => handleBooleanChange(setIndex, 'toFailure', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">Intensity</label>
        <input className="p-2 w-full rounded-md dark:bg-zinc-400" type="number" value={set.intensity} onChange={(event) => handleSetChange(setIndex, 'intensity', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">Notes</label>
        <textarea className="p-2 w-full rounded-md dark:bg-zinc-400" value={set.notes} onChange={(event) => handleSetChange(setIndex, 'notes', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">Tags</label>
        <div className="grid gap-2">
          <div className="flex flex-wrap gap-2">
            {set.tags.length > 0 && set.tags.map((tag, tagIndex) => {
              if (tag.length === 0) return;
              return (
                <Button variant="default" type="button" key={tagIndex} className="min-w-max" onClick={() => handleRemoveTag(tagIndex)}>{tag} <AiOutlineClose /></Button>
              )
            })}
          </div>
          <input className="p-2 w-full rounded-md dark:bg-zinc-400" type="text" value={newTag} onChange={handleTagChange} />
        </div>
      </div>
    </div>
  );
};

export default ExerciseSetComponent;


