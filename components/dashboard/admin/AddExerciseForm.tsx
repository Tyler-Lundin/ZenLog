'use client';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Exercise, Force, Level, Mechanic, Equipment, Category, Muscle } from '@prisma/client';
import { Textarea } from '@/components/ui/textarea';
import MultiSelect from '@/components/ui/Multiselect';


const muscleOptions: Muscle[] = ["ABS", "BICEPS", "CALVES", "CHEST", "FOREARMS", "GLUTES", "HAMSTRINGS", "LATS", "LOWER_BACK", "MIDDLE_BACK", "NECK", "QUADRICEPS", "SHOULDERS", "TRAPS", "TRICEPS", "UPPER_BACK"];

export default function AddExerciseForm() {

  const form = useForm<Exercise>({
    defaultValues: {
      name: '',
      aliases: [],
      primaryMuscles: [],
      secondaryMuscles: [],
      force: 'PULL',
      level: 'EXPERT',
      mechanic: 'COMPOUND',
      equipment: ['MACHINE'],
      category: ['STRENGTH'],
      description: '',
      tips: [],
    }
  })

  const onSubmit = (data: Exercise) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form className="p-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <FormControl>
                <Input placeholder="Exercise" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aliases"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aliases</FormLabel>
              <FormControl>
                <Textarea placeholder="Aliases seperated by commas" {...field} />
              </FormControl>
              <FormDescription>Enter the aliases of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="primaryMuscles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Muscles</FormLabel>
              <FormControl>
                <MultiSelect label={'Primary Muscles'} options={muscleOptions} />
              </FormControl>
              <FormDescription>Enter the primary muscles of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondaryMuscles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Muscles</FormLabel>
              <FormControl>
                <Input placeholder="Secondary Muscles" {...field} />
              </FormControl>
              <FormDescription>Enter the secondary muscles of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="force"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Force</FormLabel>
              <FormControl>
                <Input placeholder="Force" {...field} />
              </FormControl>
              <FormDescription>Enter the force of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <FormControl>
                <Input placeholder="Level" {...field} />
              </FormControl>
              <FormDescription>Enter the level of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mechanic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mechanic</FormLabel>
              <FormControl>
                <Input placeholder="Mechanic" {...field} />
              </FormControl>
              <FormDescription>Enter the mechanic of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment</FormLabel>
              <FormControl>
                <Input placeholder="Equipment" {...field} />
              </FormControl>
              <FormDescription>Enter the equipment of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" {...field} />
              </FormControl>
              <FormDescription>Enter the category of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Input placeholder="Instructions" {...field} />
              </FormControl>
              <FormDescription>Enter the instructions of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>Enter the description of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tips"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tips</FormLabel>
              <FormControl>
                <Input placeholder="Tips" {...field} />
              </FormControl>
              <FormDescription>Enter the tips of the exercise</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <button className="dark:bg-white dark:text-black bg-black text-white p-4 rounded-lg" type="submit">Submit</button>
      </form>
    </Form>
  )
}
