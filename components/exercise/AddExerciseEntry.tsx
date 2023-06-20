'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleLogExerciseForm } from '@/store/uiSlice';
import { SheetContent } from '@/components/ui/sheet';
import ExerciseSetSteps from './ExerciseSetSteps';
import ListExercisesStep from './steps/ListExercisesStep';
import LogExerciseStep from './steps/LogExerciseStep';

export const EMPTY_SET = { reps: 0, weight: 0, toFailure: false, intensity: 5, notes: '', tags: [] }

export default function AddExerciseEntry() {
  const dispatch = useDispatch();
  const { isLogExerciseFormOpen } = useSelector((state: RootState) => state.ui.dashboard.exercise)
  const newExercise = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise)


  const { exerciseName } = newExercise;
  const { step } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise);


  if (!isLogExerciseFormOpen) return null;

  const STEPS = [
    <ListExercisesStep key={`exercise-${exerciseName || ''}-list`} />,
    <ExerciseSetSteps key={`exercise-${exerciseName || ''}-set`} />,
    <LogExerciseStep key={`exercise-${exerciseName || ''}-log`} />
  ]

  const currentStep = STEPS[step]

  return (
    <SheetContent onClose={() => dispatch(toggleLogExerciseForm())} position="top" size={'full'}>
      <div className="grid items-center z-40 bg-white/80 dark:bg-black/80 backdrop-blur-sm  w-full overflow-y-auto h-full pb-20">
        {currentStep}
        <div className="h-20"></div>
      </div>
    </SheetContent>
  );
}

