'use client';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Exercise, ExerciseEntry } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function LogExerciseForm() {

  const [exerciseList, setExerciseList] = useState([])

  const fetchExerciseList = async () => {
    const res = await fetch('/api/exercises', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await res.json()
    return data
  }

  const form = useForm<ExerciseEntry>({
    defaultValues: {
      exerciseId: '',
      reps: 0,
      weight: 0,
    },
  })

  const onSubmit = async (data: ExerciseEntry) => {
    const res = await fetch('/api/log/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    )
    const result = await res.json()
    console.log(result);
  }

  useEffect(() => {
    fetchExerciseList().then(setExerciseList)
  }, [])

  return (
    <Form {...form}>
      <form className="dark:bg-black dark:text-white bg-white p-2 rounded-lg my-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="exerciseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Exercise</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an exercise" />
                  </SelectTrigger>
                  <SelectContent>
                    {exerciseList.map((exercise: Partial<Exercise>) => (
                      <SelectItem key={exercise.id} value={exercise.id as string}>{exercise.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reps"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Reps</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Reps" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Weight</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Weight" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button className="dark:bg-white dark:text-black bg-black text-white p-4 mt-4 rounded-lg" type="submit">Submit</button>
      </form>
    </Form>
  )
}
