import { prisma } from "@/server/db";
import { Category, Equipment, Exercise, Force, Level, Mechanic, Muscle } from "@prisma/client";

async function main() {
  const exerciseSeed: Exercise[] = [
    {
      id: "1",
      name: "Push-Up",
      aliases: [],
      primaryMuscles: [Muscle.CHEST, Muscle.TRICEPS],
      secondaryMuscles: [Muscle.SHOULDERS],
      force: Force.PUSH,
      level: Level.BEGINNER,
      mechanic: Mechanic.COMPOUND,
      equipment: Equipment.BODY_WEIGHT,
      category: Category.CALISTHENICS,
      instructions: ["Start in a high plank position with your hands slightly wider than shoulder-width apart.", "Lower your body until your chest nearly touches the floor.", "Push through your palms to return to the starting position."],
      description: "The push-up is a classic bodyweight exercise that primarily targets the chest and triceps muscles.",
      tips: ["Maintain a straight line from your head to your heels throughout the movement.", "Engage your core muscles to keep your body stable.", "Modify the exercise by performing it on your knees if needed."]
    },
    {
      id: "2",
      name: "Squat",
      aliases: [],
      primaryMuscles: [Muscle.QUADRICEPS, Muscle.HAMSTRINGS, Muscle.GLUTES],
      secondaryMuscles: [Muscle.CALVES],
      force: Force.PUSH,
      level: Level.BEGINNER,
      mechanic: Mechanic.COMPOUND,
      equipment: Equipment.NONE,
      category: Category.STRENGTH,
      instructions: ["Stand with your feet shoulder-width apart.", "Bend your knees and hips to lower your body as if sitting back into a chair.", "Keep your chest up and your weight on your heels.", "Push through your heels to return to the starting position."],
      description: "The squat is a fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes.",
      tips: ["Maintain proper form by keeping your knees in line with your toes.", "Engage your core muscles to stabilize your spine.", "Start with bodyweight squats and gradually increase the difficulty by adding weights."]
    },
  ];

  for (const exercise of exerciseSeed) {
    await prisma.exercise.create({
      data: exercise
    });
  }

  console.log('Exercise seed complete');

  process.exit(0);
}

main();
