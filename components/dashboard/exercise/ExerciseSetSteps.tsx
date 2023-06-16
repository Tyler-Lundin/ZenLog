
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addSet, addSetTag, removeNewSet, removeSetTag, setNewExerciseSets, setNewTag } from '@/store/appSlice';
import { RootState } from '@/store/store';
import { ExerciseSet } from '@prisma/client';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';


export default function ExerciseSetSteps() {

  const { sets } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const [step, setStep] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const newTag = useSelector((state: RootState) => state.app.dashboard.exercise.newTags[currentSetIndex]);

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
    dispatch(setNewTag({ index: currentSetIndex, tag }))
    const lastChar = tag[tag.length - 1];
    if (lastChar !== ',') return;
    const newTagWithoutLastChar = event.target.value.slice(0, -1).trim();
    if (newTagWithoutLastChar.length === 0) return;

    dispatch(addSetTag({ index: currentSetIndex, tag: newTagWithoutLastChar }))
    dispatch(setNewTag({ index: currentSetIndex, tag: '' }))
  };


  const INTENSITY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const SET_STEPS = [
    {
      title: 'How many Reps?',
      index: 0,
      content: (
        <div className="flex gap-2 self-center">
          <Label size="4xl" htmlFor={`set-${currentSetIndex}-reps`}>Reps</Label>
          <Input variant="glass" size="6xl" id={`set-${currentSetIndex}-reps`} type="number" value={sets[currentSetIndex].reps} onChange={(event) => handleSetChange(currentSetIndex, 'reps', event)} />
        </div>
      )
    },
    {
      title: 'How much weight?',
      index: 1,
      content: (
        <div className="flex gap-2">
          <Label htmlFor={`set-${currentSetIndex}-weight`}>Weight</Label>
          <Input id={`set-${currentSetIndex}-weight`} type="number" placeholder="Weight" value={sets[currentSetIndex].weight} onChange={(event) => handleSetChange(currentSetIndex, 'weight', event)} />
        </div>
      )
    },
    {
      title: 'To Failure?',
      index: 2,
      content: (
        <div className="flex gap-2">
          <Label htmlFor={`set-${currentSetIndex}-to-failure`}>To Failure</Label>
          <Button variant="default" size="lgSquare" className="p-2" onClick={() => handleBooleanChange(currentSetIndex, 'toFailure', { target: { checked: true } } as any)}>Yes</Button>
          <Button variant="default" size="lgSquare" className="p-2" onClick={() => handleBooleanChange(currentSetIndex, 'toFailure', { target: { checked: false } } as any)}>No</Button>
        </div>
      )
    },
    {
      title: 'Intensity?',
      index: 3,
      content: (
        <div className="flex gap-2">
          <Label htmlFor={`set-${currentSetIndex}-intensity`}>Intensity</Label>
          {INTENSITY.map((intensity) => (
            <Button key={intensity} variant="default" size="lgSquare" className="p-2" onClick={() => handleSetChange(currentSetIndex, 'intensity', { target: { value: intensity } } as any)}>{intensity}</Button>
          ))}
        </div>
      )
    },
    {
      title: 'Notes?',
      index: 4,
      content: (
        <div className="flex gap-2">
          <Label htmlFor={`set-${currentSetIndex}-notes`}>Notes</Label>
          <Textarea id={`set-${currentSetIndex}-notes`} placeholder="Notes" value={sets[currentSetIndex].notes} onChange={(event) => handleSetChange(currentSetIndex, 'notes', event)} />
        </div>
      )
    },
    {
      title: 'Tags?',
      index: 5,
      content: (
        <div className="flex gap-2">
          <Label htmlFor={`set-${currentSetIndex}-tags`}>Tags</Label>
          <Input id={`set-${currentSetIndex}-tags`} type="text" placeholder="Tags" value={newTag} onChange={handleTagChange} />
          <div className="flex gap-2">
            {sets[currentSetIndex].tags.map((tag, tagIndex) => (
              <Button key={tagIndex} variant="default" size="lgSquare" className="p-2" onClick={() => dispatch(removeSetTag({ setIndex: currentSetIndex, tagIndex }))}>{tag}</Button>
            ))}
          </div>
        </div>
      )
    },
  ]

  const currentStep = SET_STEPS[step];


  return (
    <>
      <div className="w-full bg-white dark:bg-black h-full relative grid gap-4 pt-14 pb-8 px-8">
        <div className="flex gap-2">
          {sets.map((set, setIndex) => (
            <Button type="button" key={setIndex} size="sm" className="p-4"> SET {setIndex + 1} </Button>
          ))}
          <Button type="button" variant="default" size="smSquare" className="p-2 text-md" onClick={() => dispatch(addSet())}> <AiOutlinePlus /> </Button>
          <Button type="button" variant="defaultInverted" size="smSquare" className=" absolute text-md top-2 right-4" onClick={() => dispatch(removeNewSet(currentSetIndex))}> <AiOutlineClose /> </Button>
        </div>
      </div>
      <div className="absolute w-screen top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        {SET_STEPS.map((step, stepIndex) => (
          <div key={stepIndex} className={`absolute top-0 left-0 w-full h-full ${stepIndex === currentStep.index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out ${stepIndex === currentSetIndex ? 'z-10' : 'z-0'}`}>
            <h3 className="text-center text-2xl font-black uppercase tracking-wider">{step.title}</h3>
            <div className="flex justify-center items-center h-full">
              {step.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between p-16 w-screen absolute bottom-0 left-0 h-24">
        <Button type="button" variant="default" size="lgSquare" className="p-2" onClick={() => setStep(step - 1)} disabled={step === 0}><BsChevronLeft /></Button>
        <Button type="button" variant="default" size="lgSquare" className="p-2" onClick={() => setStep(step + 1)} disabled={step === SET_STEPS.length - 1}><BsChevronRight /></Button>
      </div>
    </>

  )
}
