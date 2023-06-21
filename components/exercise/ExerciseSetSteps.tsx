
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addSet, addSetTag, removeNewSet, removeSetTag, setNewExerciseSets, setNewTag } from '@/store/appSlice';
import { AppDispatch, RootState } from '@/store/store';
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
import ExerciseOverviewStep from './steps/ExerciseOverviewStep';
import { setExerciseError } from '@/store/uiSlice';
import logExerciseThunk from '@/store/thunks/logExerciseThunk';


export default function ExerciseSetSteps() {

  const { sets } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const [step, setStep] = useState(0);
  const setIndex = sets.length - 1;

  const dispatch = useDispatch<AppDispatch>();

  const SET_STEPS = [
    <RepsStep key={`reps_set_${setIndex}`} />,
    <WeightStep key={`weight_set_${setIndex}`} />,
    <IntensityStep key={`intensity_set_${setIndex}`} />,
    <FailureStep key={`failure_set_${setIndex}`} />,
    <NotesStep key={`notes_set_${setIndex}`} />,
    <TagsStep key={`tags_set_${setIndex}`} />,
    <ExerciseOverviewStep key={`overview_set_${setIndex}`} />,
  ]

  const currentStep = SET_STEPS[step];
  const isLastStep = step === SET_STEPS.length - 1;
  const isReadyToLog = sets[setIndex].reps > 0 && sets[setIndex].weight > 0 && sets[setIndex].intensity > 0 && isLastStep;


  const handleSubmit = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(logExerciseThunk());

  };

  return (
    <>
      <div className="absolute place-content-center w-screen max-w-md grid top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        {currentStep}
      </div>
      <div className="flex justify-between p-16 w-screen h-24 items-center gap-4">
        <Button type="button" variant="default" size="lgSquare" className="p-2" onClick={() => setStep(step - 1)} disabled={step === 0}><BsChevronLeft /></Button>
        {isLastStep && (<Button disabled={!isReadyToLog} type="button" variant="logEvent" size="4xl" className="p-2 font-black rounded-lg" onClick={() => console.log('click')}> Log Exercise</Button>)}
        <Button type="button" variant="default" size="lgSquare" className="p-2" onClick={() => setStep(step + 1)} disabled={step === SET_STEPS.length - 1}><BsChevronRight /></Button>
      </div>

    </>

  )
}
