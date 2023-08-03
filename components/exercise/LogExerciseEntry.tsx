'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/_store';
import ListExercisesStep from './steps/ListExercisesStep';
import RepsStep from './steps/RepsStep';
import WeightStep from './steps/WeightStep';
import IntensityStep from './steps/IntensityStep';
import FailureStep from './steps/FailureStep';
import ExerciseOverviewStep from './steps/ExerciseOverviewStep';
import StepControls from '../StepControls';
import { nextExerciseStep, prevExerciseStep, resetNewExercise, setExerciseStep, toggleIsNewEntrySubmitting } from '@/_store/slices/exerciseSlice';
import logExerciseThunk from '@/_store/thunks/logExerciseThunk';
import Breadcrumbs, { Breadcrumb } from '../Breadcrumbs';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import NotesStep from './steps/NotesStep';
import TagsStep from './steps/TagsStep';
import { Spinner } from '../ui/Spinner';


export default function LogExerciseEntry() {
  const { currentStep, exerciseName, weight, reps, intensity, toFailure, notes, tags, isSubmitting, isSubmitted } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const STEPS = [
    { name: "ListExercisesStep", component: <ListExercisesStep /> },
    { name: "WeightStep", component: <WeightStep /> },
    { name: "RepsStep", component: <RepsStep /> },
    { name: "IntensityStep", component: <IntensityStep /> },
    { name: "FailureStep", component: <FailureStep /> },
    { name: "NotesStep", component: <NotesStep /> },
    { name: "TagsStep", component: <TagsStep /> },
    { name: "ExerciseOverviewStep", component: <ExerciseOverviewStep /> },
  ]

  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;
  const isReady = exerciseName && weight && reps && intensity;
  const nextStep = () => dispatch(nextExerciseStep());
  const prevStep = () => dispatch(prevExerciseStep());
  const handleClose = () => {
    dispatch(resetNewExercise())
    router.push("/dashboard/exercise");
  }
  const handleSubmit = () => {
    dispatch(logExerciseThunk());
    dispatch(toggleIsNewEntrySubmitting());
  }

  const stepControlsProps = {
    isLastStep,
    isFirstStep,
    nextStep,
    prevStep,
    handleClose,
    className: "flex w-full h-fit absolute items-center justify-between z-20 pointer-events-none top-0 px-4 top-1/2 -translate-y-1/2"
  }

  const breadcrumbs: Breadcrumb[] = [
    { title: exerciseName ? exerciseName : 'exercise', onClick: () => dispatch(setExerciseStep(0)) },
    { title: weight ? `${weight.toString()} lbs` : 'weight?', onClick: () => dispatch(setExerciseStep(1)) },
    { title: reps ? `${reps.toString()} reps` : 'reps?', onClick: () => dispatch(setExerciseStep(2)) },
    { title: intensity ? `${intensity.toString()} RPE` : 'intensity?', onClick: () => dispatch(setExerciseStep(3)) },
    { title: toFailure ? 'to failure' : 'failed?', onClick: () => dispatch(setExerciseStep(4)) },
    { title: notes ? 'notes' : 'notes?', onClick: () => dispatch(setExerciseStep(5)) },
    { title: tags ? 'tags' : 'tags?', onClick: () => dispatch(setExerciseStep(6)) },
    { title: "overview", onClick: () => dispatch(setExerciseStep(7)) }
  ];

  const isDone = (isSubmitted && !isSubmitting)
  if (isDone) handleClose();

  return (
    <>
      {
        isSubmitting && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-white dark:bg-black bg-opacity-50 z-50 grid place-content-center">
            <Spinner size="xl" />
          </div>
        )
      }
      <div className="h-[calc(100vh_-_8rem)]">
        <div className="grid relative bg-white dark:bg-black overflow-x-auto w-screen pt-8">
          <Breadcrumbs breadcrumbs={breadcrumbs} currentStep={currentStep} />
        </div>
        <div className="overflow-y-auto h-full">
          {STEPS[currentStep].component}
        </div>
        <div className="fixed bottom-0 left-0 w-screen bg-white dark:bg-black py-4 grid place-content-center">
          <StepControls {...stepControlsProps} />
          <Button disabled={!isReady} variant={!isReady ? "glassRed" : "glassGreen"} onClick={handleSubmit}>Log Exercise</Button>
        </div>
      </div>
    </>
  );
}
