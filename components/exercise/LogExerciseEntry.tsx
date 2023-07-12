'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ExerciseSetSteps from './ExerciseSetSteps';
import ListExercisesStep from './steps/ListExercisesStep';
import { NewExerciseSetState } from '@/types/global';
import BackLink from '../ui/BackLink';

export const EMPTY_SET: NewExerciseSetState = {
  reps: 0,
  weight: 0,
  intensity: 0,
  toFailure: false,
  notes: '',
  tags: [],
  isDone: false,
  step: 0,
  weightUnit: 'POUND',
}

export default function LogExerciseEntry() {
  const newExercise = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)
  const { exerciseName } = newExercise;
  const { step } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise);
  const STEPS = [
    <ListExercisesStep key={`exercise-${exerciseName || ''}-list`} />,
    <ExerciseSetSteps key={`exercise-${exerciseName || ''}-set`} />,
  ]
  const currentStep = STEPS[step]

  return (
    <div className="fixed top-16 left-0 bg-white dark:bg-black z-50 h-screen w-screen overflow-y-auto">
      <BackLink href="/dashboard/exercise" />
      <div className="h-20 grid items-center w-full fixed bg-white/80 dark:bg-black/80 z-50 backdrop-blur-sm">
        <h1 className="text-2xl font-thin text-center dark:text-white">Log Exercise</h1>
      </div>
      <div className="grid items-center mt-20">
        {currentStep}
        <div className="h-20"></div>
      </div>
    </div>
  );
}

