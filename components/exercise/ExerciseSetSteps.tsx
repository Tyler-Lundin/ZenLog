
import { Button } from '@/components/ui/button';
import { AppDispatch, RootState } from '@/_store';
import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import RepsStep from './steps/RepsStep';
import WeightStep from './steps/WeightStep';
import IntensityStep from './steps/IntensityStep';
import FailureStep from './steps/FailureStep';
import NotesStep from './steps/NotesStep';
import TagsStep from './steps/TagsStep';
import ExerciseOverviewStep from './steps/ExerciseOverviewStep';
import logExerciseThunk from '@/_store/thunks/logExerciseThunk';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';


export default function ExerciseSetSteps() {

  const { id } = useSelector((state: RootState) => state.dashboard.userDay)
  const { currentStep, reps, weight, intensity } = useSelector((state: RootState) => state.exercise.newEntry);

  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const SET_STEPS = [
    <RepsStep key={`reps_set`} />,
    <WeightStep key={`weight_set`} />,
    <IntensityStep key={`intensity_set`} />,
    <FailureStep key={`failure_set`} />,
    <NotesStep key={`notes_set`} />,
    <TagsStep key={`tags_set`} />,
    <ExerciseOverviewStep key={`overview_set`} />,
  ]

  const isLastStep = currentStep === SET_STEPS.length - 1;
  const isFirstStep = currentStep === 0;
  const isReadyToLog = reps > 0 && !isNaN(weight) && intensity > 0 && isLastStep;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        e.preventDefault();
        dispatch(nextNewSetStep());
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        dispatch(previousNewSetStep());
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch])

  const handleLogExerciseEntry = () => {
    dispatch(logExerciseThunk())
    queryClient.invalidateQueries({ queryKey: [`exercise-entries-${id}`] })
  }

  return (
    <>
      <div className="grid grid-cols-5 justify-items-center p-2 lg:p-16 w-screen h-24 items-center gap-2">
        <kbd className="text-xs hidden md:block dark:text-white text-center col-span-1">Esc</kbd>
        <span className="text-xs hidden md:block dark:text-white col-span-3 text-center">Step {step + 1} of {SET_STEPS.length}</span>
        <kbd className="text-xs hidden md:block dark:text-white text-center col-span-1">Enter</kbd>
        <Button
          type="button"
          variant="default"
          size="lgSquare"
          className="p-2 col-span-1"
          onClick={() => dispatch(previousNewSetStep())}
          disabled={isFirstStep}
        > <BsChevronLeft /> </Button>

        <Button
          disabled={!isReadyToLog}
          type="button"
          variant="logEvent"
          className="p-6 text-xl lg:text-4xl font-black rounded-lg col-span-3 whitespace-nowrap"
          onClick={handleLogExerciseEntry}
        > Log Exercise </Button>

        <Button
          type="button"
          variant="default"
          size="lgSquare"
          className="p-2 col-span-1"
          onClick={() => dispatch(nextNewSetStep())}
          disabled={isLastStep}
        > <BsChevronRight /> </Button>
      </div>
      <div className="absolute w-screen px-8 lg:px-16 grid top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        {currentStep}
      </div>
    </>

  )
}
