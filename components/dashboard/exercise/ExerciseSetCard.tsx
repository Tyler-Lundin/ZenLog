
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addSetTag, removeNewSet, removeSetTag, setNewExerciseSets, setNewTag } from '@/store/appSlice';
import { RootState } from '@/store/store';
import { ExerciseEntry, ExerciseSet } from '@prisma/client';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';


interface ExerciseSetProps {
  index: number;
}

export default function ExerciseSetCard({ index }: ExerciseSetProps) {

  const { exerciseName, exerciseId, sets } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const newTag = useSelector((state: RootState) => state.app.dashboard.exercise.newTags[index]);
  const dispatch = useDispatch();


  const handleSetChange = (
    index: number,
    field: keyof ExerciseSet,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (field === 'reps' && +event.target.value < 0) return;
    if (field === 'intensity' && (+event.target.value < 0 || +event.target.value > 10)) return;

    const newSets = [...sets];
    newSets[index] = {
      ...newSets[index],
      [field]: event.target.value,
    };
    dispatch(setNewExerciseSets(newSets));
  };


  const handleBooleanChange = (
    index: number,
    field: keyof ExerciseSet,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSets = [...sets];
    updatedSets[index] = {
      ...updatedSets[index],
      [field]: event.target.checked,
    };
    dispatch(setNewExerciseSets(updatedSets));
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tag = event.target.value;
    dispatch(setNewTag({ index, tag }))
    const lastChar = tag[tag.length - 1];
    if (lastChar !== ',') return;
    const newTagWithoutLastChar = event.target.value.slice(0, -1).trim();
    if (newTagWithoutLastChar.length === 0) {
      dispatch(setNewTag({ index, tag }))
      return;
    }
    const newSets = [...sets];
    if (newSets[index].tags.length >= 6) {
      dispatch(setNewTag({ index, tag }))
      return;
    }
    dispatch(addSetTag({ index, tag }))
  };


  return (
    <div key={index} className="border dark:border-zinc-600 shadow-md bg-gray-200 dark:bg-zinc-900 border-black p-8 rounded-lg relative grid gap-4 pt-14">
      <h3 className="absolute dark:text-black text-white top-4 uppercase font-black tracking-wider bg-black dark:bg-zinc-400 px-4 rounded-md left-8">Set {index + 1}</h3>
      <Button variant="destructive" size="smSquare" className="p-2 absolute text-md top-2 right-8" onClick={() => dispatch(removeNewSet(index))}> <AiOutlineClose /> </Button>
      <div className="flex gap-2">
        <Label htmlFor={`set-${index}-reps`}>Reps</Label>
        <Input id={`set-${index}-reps`} type="number" placeholder="Reps" value={sets[index].reps} onChange={(event) => handleSetChange(index, 'reps', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">Weight</label>
        <input className="p-2 w-full rounded-md dark:bg-zinc-400 dark:text-black" type="number" value={sets[index].weight} onChange={(event) => handleSetChange(index, 'weight', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">To Failure</label>
        <input className="w-8 dark:bg-zinc-400 dark:text-black" type="checkbox" checked={sets[index].toFailure} onChange={(event) => handleBooleanChange(index, 'toFailure', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">Intensity</label>
        <input className="p-2 w-full rounded-md dark:bg-zinc-400 dark:text-black" type="number" value={sets[index].intensity} onChange={(event) => handleSetChange(index, 'intensity', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">Notes</label>
        <textarea className="p-2 w-full rounded-md dark:bg-zinc-400 dark:text-black" value={sets[index].notes} onChange={(event) => handleSetChange(index, 'notes', event)} />
      </div>
      <div className="flex gap-2">
        <label className="self-center dark:text-white">Tags</label>
        <div className="grid gap-2 w-full">
          <div className="flex flex-wrap gap-2">
            {sets[index].tags.length > 0 && sets[index].tags.map((tag, tagIndex) => {
              if (tag.length === 0) return;
              return (
                <Button variant="default" type="button" key={tagIndex} className="min-w-min whitespace-nowrap" onClick={() => dispatch(removeSetTag({ tagIndex, tag }))}>{tag} <AiOutlineClose /></Button>
              )
            })}
          </div>
          <input className="p-2 w-full rounded-md dark:bg-zinc-400" type="text" value={newTag} onChange={handleTagChange} />
        </div>
      </div>
    </div>

  )
}

