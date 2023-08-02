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
import { nextExerciseStep, prevExerciseStep, resetNewExercise, setExerciseStep } from '@/_store/slices/exerciseSlice';
import logExerciseThunk from '@/_store/thunks/logExerciseThunk';
import Breadcrumbs, { Breadcrumb } from '../Breadcrumbs';
import { toggleAddExercise } from '@/_store/slices/uiSlice';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';


export default function LogExerciseEntry() {
  const { currentStep, exercise: { name }, weight, reps, intensity, toFailure, notes, tags } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const STEPS = [
    { name: "ListExercisesStep", component: <ListExercisesStep /> },
    { name: "WeightStep", component: <WeightStep /> },
    { name: "RepsStep", component: <RepsStep /> },
    { name: "IntensityStep", component: <IntensityStep /> },
    { name: "FailureStep", component: <FailureStep /> },
    { name: "ExerciseOverviewStep", component: <ExerciseOverviewStep /> },
  ]

  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;
  const isReady = name && weight && reps && intensity;
  const nextStep = () => dispatch(nextExerciseStep());
  const prevStep = () => dispatch(prevExerciseStep());
  const handleClose = () => {
    dispatch(resetNewExercise())
    router.push("/dashboard/exercise");
    const handleSubmit = () => dispatch(logExerciseThunk());

    const stepControlsProps = {
      isLastStep,
      isFirstStep,
      nextStep,
      prevStep,
      handleClose,
      className: "flex w-full h-fit absolute items-center justify-between z-20 pointer-events-none top-0 px-8 top-1/2 -translate-y-1/2"
    }

    const breadcrumbs: Breadcrumb[] = [
      { title: name ? name : 'exercise', onClick: () => dispatch(setExerciseStep(0)) },
      { title: weight ? `${weight.toString()} lbs` : 'weight?', onClick: () => dispatch(setExerciseStep(1)) },
      { title: reps ? `${reps.toString()} reps` : 'reps?', onClick: () => dispatch(setExerciseStep(2)) },
      { title: intensity ? `${intensity.toString()} RPE` : 'intensity?', onClick: () => dispatch(setExerciseStep(3)) },
      { title: toFailure ? 'to failure' : 'failed?', onClick: () => dispatch(setExerciseStep(4)) },
      { title: isReady ? "ready" : "overview", onClick: () => dispatch(setExerciseStep(5)) }
    ];

    return (
      <div className="h-[calc(100vh_-_7rem)]">
        <div className="fixed w-full top-20 z-50 dark:bg-black bg-white">
          <Breadcrumbs breadcrumbs={breadcrumbs} currentStep={currentStep} />
          <div className="grid place-content-center">
            <StepControls {...stepControlsProps} />
            <Button disabled={!isReady} variant={!isReady ? "glassRed" : "glassGreen"} onClick={handleSubmit}>Log Exercise</Button>
          </div>
        </div>
        {STEPS[currentStep].component}
      </div>
    );
  }

