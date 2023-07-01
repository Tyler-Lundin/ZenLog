import { nextNewExerciseStep, setNewExercise } from '@/store/appSlice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AiOutlineClose } from 'react-icons/ai';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Exercise } from '@prisma/client';
import useSwr from 'swr';
import { Spinner } from '@/components/ui/Spinner';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SelectExerciseStep = () => {
  const { exerciseId } = useSelector((state: RootState) => state.app.dashboard.exercise.newExercise);
  const { data, error } = useSwr(`/api/exercise?id=${exerciseId}`, fetcher);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = !data && !error;

  const exercise: Exercise = data;

  if (isLoading) return <Spinner size="xl" />;
  return (
    <div className={`absolute w-screen h-screen top-0 left-0 px-4 z-50 bg-white dark:bg-black p-4`}>
      <div className="grid">
        <div className={`grid grid-flow-col gap-2 relative`}>
          <div className="lg:flex gap-4 mt-2 relative">
            <h2 className="text-3xl lg:text-6xl font-bold dark:text-white">{exercise.name}</h2>
            <Badge className={`text-xs h-fit self-center`}>{exercise.level}</Badge>
            <Button size="smSquare" className={` right-2 absolute top-1/2 -translate-y-1/2 rounded-md`} variant="destructive" onClick={() => setDetailedIndex(index === detailedIndex ? -1 : index)} >
              <AiOutlineClose />
            </Button>
          </div>
        </div>
        <hr className="border-gray-300  my-4 border" />
        <div className="flex gap-8 flex-col h-full w-full text-black dark:text-white">

          <div className="grid grid-cols-2 gap-2 items-start justify-items-center">
            <div className="flex flex-col gap-2 items-start text-left">
              <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase text-xs">Primary <br />Muscles</h5>
              <div className="px-2 grid gap-2">
                {exercise.primaryMuscles.map((muscle) => <small key={`${muscle}-primary-muscle`} className="text-xs justify-start">{muscle}</small>)}
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 text-left">
              <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-xs">Secondary Muscles</h5>
              <div className="px-2 grid gap-2 w-full">
                {exercise.secondaryMuscles.map((muscle) => <small key={`${muscle}-secondary-muscle`} className="text-xs">{muscle}</small>)}
              </div>
            </div>
          </div>

          <div className={` grid grid-cols-3 gap-2 text-left w-full justify-self-center justify-items-center`}>

            <div className="flex flex-col flex-wrap items-start gap-2 text-left w-full">
              <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-xs">Equipment</h5>
              <div className="px-2 grid gap-2">
                {Array.isArray(exercise.equipment) && exercise.equipment.map((E) => <small key={`${E}-equipment`} className="text-xs">{E.replace("_", " ")}</small>)}
              </div>
            </div>

            <div className="flex flex-col flex-wrap items-start gap-2 text-left ">
              <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-xs">
                Force
              </h5>
              <div className="px-2 grid gap-2">
                <small className="text-xs">{exercise.force}</small>
              </div>
            </div>

            {exercise.mechanic && (
              <div className="flex flex-col flex-wrap items-start gap-2 text-left ">
                <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase   text-xs">
                  Mechanic
                </h5>
                <div className="px-2 grid gap-2">
                  <small className="text-xs">{exercise.mechanic}</small>
                </div>
              </div>
            )}
          </div>
          {exercise.tips && (
            <div className="flex flex-col flex-wrap whitespace-pre-wrap items-start gap-2 text-left place-self-center">
              <h5 className="dark:text-white border border-black dark:border-white font-bold rounded-md py-1 px-2 uppercase text-xs">
                Tips
              </h5>
              <div className="px-2 grid gap-2">
                <div className="flex flex-col gap-2">
                  {exercise.tips.map((tip) => <small key={`${tip}-tip`} className="text-xs">{tip}</small>)}
                </div>
              </div>
            </div>
          )}
        </div>

        <Button
          variant="glassGreen"
          className="font-black my-4 w-full justify-self-end z-40 uppercase"
          onClick={() => {
            dispatch(nextNewExerciseStep())
          }} >
          Select
        </Button>
      </div>
    </div>
  )
}

export default SelectExerciseStep
