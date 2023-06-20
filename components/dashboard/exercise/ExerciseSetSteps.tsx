
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addSet, addSetTag, removeNewSet, removeSetTag, setNewExerciseSets, setNewTag } from '@/store/appSlice';
import { RootState } from '@/store/store';
import { ExerciseSet } from '@prisma/client';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import RepsStep from './steps/RepsStep';
import WeightStep from './steps/WeightStep';
import IntensityStep from './steps/IntensityStep';
import FailureStep from './steps/FailureStep';
import NotesStep from './steps/NotesStep';
import TagsStep from './steps/TagsStep';


export default function ExerciseSetSteps() {

  const { sets } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const [step, setStep] = useState(0);
  const setIndex = sets.length - 1;

  const dispatch = useDispatch();



  const SET_STEPS = [
    <RepsStep key={`reps_set_${setIndex}`} />,
    <WeightStep key={`weight_set_${setIndex}`} />,
    <IntensityStep key={`intensity_set_${setIndex}`} />,
    <FailureStep key={`failure_set_${setIndex}`} />,
    <NotesStep key={`notes_set_${setIndex}`} />,
    <TagsStep key={`tags_set_${setIndex}`} />,
  ]

  const currentStep = SET_STEPS[step];


  return (
    <>
      <div className="w-full bg-white dark:bg-black h-full relative grid gap-4 pt-14 pb-8 px-8">
        <div className="flex gap-2">
          {sets.map((_, setIndex) => (
            <Button type="button" key={setIndex} size="sm" className="p-4"> SET {setIndex + 1} </Button>
          ))}
          <Button type="button" variant="default" size="smSquare" className="p-2 text-md" onClick={() => dispatch(addSet())}> <AiOutlinePlus /> </Button>
          <Button type="button" variant="defaultInverted" size="smSquare" className=" absolute text-md top-2 right-4" onClick={() => dispatch(removeNewSet(setIndex))}> <AiOutlineClose /> </Button>
        </div>
      </div>
      <div className="absolute w-screen max-w-md grid top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        {currentStep}
      </div>

      <div className="flex justify-between p-16 w-screen absolute bottom-0 left-0 h-24">
        <Button type="button" variant="default" size="lgSquare" className="p-2" onClick={() => setStep(step - 1)} disabled={step === 0}><BsChevronLeft /></Button>
        <Button type="button" variant="default" size="lgSquare" className="p-2" onClick={() => setStep(step + 1)} disabled={step === SET_STEPS.length - 1}><BsChevronRight /></Button>
      </div>
    </>

  )
}
