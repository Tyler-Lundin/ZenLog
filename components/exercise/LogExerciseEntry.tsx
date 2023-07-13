'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/_store';
import ListExercisesStep from './steps/ListExercisesStep';
import RepsStep from './steps/RepsStep';
import WeightStep from './steps/WeightStep';
import IntensityStep from './steps/IntensityStep';
import FailureStep from './steps/FailureStep';
import NotesStep from './steps/NotesStep';
import TagsStep from './steps/TagsStep';
import ExerciseOverviewStep from './steps/ExerciseOverviewStep';
import StepControls from '../StepControls';
import { nextExerciseStep, prevExerciseStep } from '@/_store/slices/exerciseSlice';
import logExerciseThunk from '@/_store/thunks/logExerciseThunk';
import Breadcrumbs, { Breadcrumb } from '../Breadcrumbs';


export default function LogExerciseEntry() {
  const { currentStep, exercise: { name }, weight, reps, intensity, toFailure, notes, tags } = useSelector((state: RootState) => state.exercise.newEntry)
  const dispatch = useDispatch<AppDispatch>();
  const STEPS = [
    <ListExercisesStep key={`exercise-${name}-list`} />,
    <WeightStep key={`${name}-weight`} />,
    <RepsStep key={`${name}-reps`} />,
    <IntensityStep key={`${name}-intensity`} />,
    <FailureStep key={`${name}-failure`} />,
    <NotesStep key={`${name}-notes`} />,
    <TagsStep key={`${name}-tags`} />,
    <ExerciseOverviewStep key={`${name}-overview`} />,
  ]

  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;
  const nextStep = () => dispatch(nextExerciseStep());
  const prevStep = () => dispatch(prevExerciseStep());
  const handleClose = () => console.log('go back');
  const handleSubmit = () => dispatch(logExerciseThunk());

  const stepControlsProps = {
    isLastStep,
    isFirstStep,
    nextStep,
    prevStep,
    handleClose,
    handleSubmit,
    className: "flex fixed w-full h-fit bottom-4 left-0 items-center justify-between z-20 p-2 pointer-events-none"
  }

  const breadcrumbs: Breadcrumb[] = [
    { title: name },
    { title: weight ? weight.toString() + ' lbs' : '0 lbs' },
    { title: reps ? reps.toString() + ' reps' : '0 reps' },
    { title: intensity ? intensity.toString() + ' RPE' : '0 RPE' },
    { title: toFailure ? 'to failure' : 'not to failure' },
    { title: notes ? notes.substring(0, 10) : 'notes' },
    { title: tags.length ? `${tags.length} tags` : '0 tags' },
  ].slice(0, currentStep + 1);

  return (
    <div className=" z-50 h-screen w-screen overflow-y-auto bg-white dark:bg-black absolute left-0 top-16">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <StepControls {...stepControlsProps} />
      <div className="absolute top-20 left-0 w-screen h-full px-2">
        {STEPS[currentStep]}
        <div className="h-20"></div>
      </div>
    </div>
  );
}

