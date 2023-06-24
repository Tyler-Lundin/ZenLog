
import { Button } from '@/components/ui/button';
import { AppDispatch, RootState } from '@/store/store';
import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import RepsStep from './steps/RepsStep';
import WeightStep from './steps/WeightStep';
import IntensityStep from './steps/IntensityStep';
import FailureStep from './steps/FailureStep';
import NotesStep from './steps/NotesStep';
import TagsStep from './steps/TagsStep';
import ExerciseOverviewStep from './steps/ExerciseOverviewStep';
import logExerciseThunk from '@/store/thunks/logExerciseThunk';
import { nextNewSetStep, previousNewSetStep } from '@/store/appSlice';


export default function ExerciseSetSteps() {

  const { set } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise);
  const { step, isDone } = set;

  const dispatch = useDispatch<AppDispatch>();

  const SET_STEPS = [
    <RepsStep key={`reps_set`} />,
    <WeightStep key={`weight_set`} />,
    <IntensityStep key={`intensity_set`} />,
    <FailureStep key={`failure_set`} />,
    <NotesStep key={`notes_set`} />,
    <TagsStep key={`tags_set`} />,
    <ExerciseOverviewStep key={`overview_set`} />,
  ]

  const currentStep = SET_STEPS[step];
  const isLastStep = step === SET_STEPS.length - 1;
  const isFirstStep = step === 0;
  const isReadyToLog = set.reps > 0 && set.weight > 0 && set.intensity > 0 && isLastStep;

  return (
    <>
      <div className="absolute place-content-center w-screen max-w-md grid top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        {currentStep}
      </div>
      <div className="flex justify-between p-16 w-screen h-24 items-center gap-4">

        {!isFirstStep ? (
          <Button
            type="button"
            variant="default"
            size="lgSquare"
            className="p-2"
            onClick={() => dispatch(previousNewSetStep())}
            disabled={step === 0}
          > <BsChevronLeft /> </Button>) : (<span className="I am a placeholder" />)}

        {isLastStep && (
          <Button
            disabled={!isReadyToLog}
            type="button"
            variant="logEvent"
            size="4xl"
            className="p-2 font-black rounded-lg"
            onClick={() => dispatch(logExerciseThunk())}
          > Log Exercise </Button>)}

        {!isLastStep ? (
          <Button
            type="button"
            variant="default"
            size="lgSquare"
            className="p-2"
            onClick={() => dispatch(nextNewSetStep())}
            disabled={step === SET_STEPS.length - 1}
          > <BsChevronRight /> </Button>) : <span className="me too!" />}
      </div>
    </>

  )
}
