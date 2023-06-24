'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { closeLogExerciseForm } from '@/store/uiSlice';
import ExerciseSetSteps from './ExerciseSetSteps';
import ListExercisesStep from './steps/ListExercisesStep';
import BackButton from '../ui/BackButton';
import { resetNewExercise } from '@/store/appSlice';
import { NewExerciseSetState } from '@/types/global';

export const EMPTY_SET: NewExerciseSetState = { reps: 0, weight: 0, toFailure: false, intensity: 5, notes: '', tags: [], isDone: false, step: 0 }

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
  ]

  const currentStep = STEPS[step]

  return (
    <div className="absolute top-0 left-0 bg-white dark:bg-black z-50 h-screen w-screen overflow-y-auto">
      <div className="h-20 grid items-center w-full fixed bg-white/80 dark:bg-black/80 z-50 backdrop-blur-sm">
        <BackButton onClick={() => {
          dispatch(closeLogExerciseForm())
          dispatch(resetNewExercise())
        }}
        />
        <h1 className="text-2xl font-thin text-center dark:text-white">Log Exercise</h1>
      </div>
      <div className="grid items-center mt-20">
        {currentStep}
        <div className="h-20"></div>
      </div>
    </div>
  );
}

