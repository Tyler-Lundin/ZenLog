import { Category, Equipment, Exercise, Force, Level, Mechanic, Muscle } from "@prisma/client";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const newExerciseSeed: Omit<Exercise, 'id'>[] = [
  {
    name: "Deadlift",
    aliases: [],
    primaryMuscles: [Muscle.HAMSTRINGS, Muscle.GLUTES, Muscle.BACK],
    secondaryMuscles: [Muscle.QUADRICEPS, Muscle.FOREARMS],
    force: Force.PULL,
    level: Level.INTERMEDIATE,
    mechanic: Mechanic.COMPOUND,
    equipment: [Equipment.BARBELL],
    category: [Category.STRENGTH, Category.POWERLIFTING],
    instructions: ["Stand with your feet hip-width apart and the barbell over your mid-foot.", "Bend at the hips and knees to grip the bar.", "Keep your back straight and pull the weight up off the floor.", "Lower the weight back down under control."],
    description: "The deadlift is a weight training exercise in which a loaded barbell is lifted off the ground to the level of the hips, and then lowered to the ground again.",
    tips: ["Keep your back straight and your core engaged throughout the movement.", "Use your leg and hip strength to lift the bar.", "Avoid rounding your back or lifting with your lower back."]
  },
  {
    name: "Pull-Up",
    aliases: [],
    primaryMuscles: [Muscle.LATS, Muscle.BICEPS],
    secondaryMuscles: [Muscle.BACK, Muscle.SHOULDERS],
    force: Force.PULL,
    level: Level.INTERMEDIATE,
    mechanic: Mechanic.COMPOUND,
    equipment: [Equipment.PULL_UP_BAR],
    category: [Category.CALISTHENICS],
    instructions: ["Grip the bar with your hands shoulder-width apart.", "Hang with your arms fully extended.", "Pull your body up until your chin is over the bar.", "Lower yourself back down to the starting position."],
    description: "The pull-up is a strength training exercise for the upper body, particularly the back and biceps.",
    tips: ["Avoid using momentum to pull yourself up.", "Pull your elbows down and back, keeping them close to your body.", "Focus on squeezing your back muscles at the top of the movement."]
  },
  {
    name: "Bench Press",
    aliases: [],
    primaryMuscles: [Muscle.CHEST, Muscle.TRICEPS],
    secondaryMuscles: [Muscle.SHOULDERS],
    force: Force.PUSH,
    level: Level.BEGINNER,
    mechanic: Mechanic.COMPOUND,
    equipment: [Equipment.BARBELL],
    category: [Category.STRENGTH, Category.POWERLIFTING],
    instructions: ["Lie back on a flat bench with a barbell in the rack above you.", "Grip the bar with hands slightly wider than shoulder-width apart.", "Lower the bar to your chest.", "Press the bar back up to the starting position."],
    description: "The bench press is a compound exercise that primarily targets the chest, triceps, and front deltoids.",
    tips: ["Keep your feet flat on the ground and your back flat against the bench.", "Avoid arching your back or lifting your hips off the bench.", "Control the weight as you lower it to your chest and press it back up."]
  },
  {
    name: "Lunge",
    aliases: [],
    primaryMuscles: [Muscle.QUADRICEPS, Muscle.GLUTES, Muscle.HAMSTRINGS],
    secondaryMuscles: [Muscle.CALVES],
    force: Force.PUSH,
    level: Level.BEGINNER,
    mechanic: Mechanic.COMPOUND,
    equipment: [Equipment.BODYWEIGHT, Equipment.DUMBBELL, Equipment.KETTLEBELL],
    category: [Category.STRENGTH],
    instructions: ["Stand tall with feet hip-width apart.", "Take a big step forward with one foot.", "Lower your body until your front knee is at a 90-degree angle.", "Push off your front foot to return to the starting position."],
    description: "The lunge is a great functional exercise to use in warming up or as a staple in your lower-body routine.",
    tips: ["Keep your torso straight and your eyes facing forward.", "Avoid letting your knee extend past your toes.", "Keep your weight evenly distributed between both legs."]
  },
  {
    name: "Plank",
    aliases: [],
    primaryMuscles: [Muscle.CORE],
    secondaryMuscles: [Muscle.GLUTES, Muscle.SHOULDERS],
    force: Force.STATIC,
    level: Level.BEGINNER,
    mechanic: Mechanic.ISOLATION,
    equipment: [Equipment.BODYWEIGHT],
    category: [Category.STRENGTH],
    instructions: ["Get into a pushup position.", "Bend your elbows and rest your weight on your forearms.", "Hold this position, maintaining a straight line from head to feet."],
    description: "The plank is a core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.",
    tips: ["Engage your core and squeeze your glutes.", "Avoid letting your hips sag or your back arch.", "Keep your neck and spine neutral by looking at a spot on the floor ahead of your hands."]
  }
];



async function main() {

  await prisma.exercise.deleteMany();
  for (const exercise of newExerciseSeed) {
    await prisma.exercise.create({
      data: exercise
    });
  }

  console.log('Exercise seed complete');

  process.exit(0);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

