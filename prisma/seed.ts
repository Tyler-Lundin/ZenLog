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
  },
  {
    name: "Squat",
    aliases: [],
    primaryMuscles: ["QUADRICEPS", "GLUTES", "HAMSTRINGS"],
    secondaryMuscles: ["CALVES"],
    force: "PUSH",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["BARBELL"],
    category: ["STRENGTH"],
    instructions: [
      "Stand with your feet shoulder-width apart and the barbell resting on your upper back.",
      "Bend at the knees and hips to lower your body into a squat position.",
      "Keep your chest up and your back straight.",
      "Push through your heels to return to the starting position."
    ],
    description: "The squat is a compound exercise that targets the muscles of the lower body, including the quadriceps, glutes, and hamstrings.",
    tips: [
      "Maintain proper form throughout the movement, keeping your knees in line with your toes.",
      "Engage your core for stability.",
      "Start with lighter weights and gradually increase as you gain strength."
    ]
  },
  {
    name: "Push-Up",
    aliases: [],
    primaryMuscles: ["CHEST", "TRICEPS"],
    secondaryMuscles: ["SHOULDERS", "CORE"],
    force: "PUSH",
    level: "BEGINNER",
    mechanic: "COMPOUND",
    equipment: ["BODYWEIGHT"],
    category: ["CALISTHENICS"],
    instructions: [
      "Start in a high plank position with your hands slightly wider than shoulder-width apart.",
      "Lower your body until your chest nearly touches the ground.",
      "Push through your hands to return to the starting position."
    ],
    description: "The push-up is a classic bodyweight exercise that targets the muscles of the upper body, including the chest, triceps, and shoulders.",
    tips: [
      "Maintain a straight line from head to heels throughout the movement.",
      "Engage your core and keep your glutes tight.",
      "Modify the exercise by performing it on your knees if needed."
    ]
  },
  {
    name: "Russian Twist",
    aliases: [],
    primaryMuscles: ["CORE", "OBLIQUES"],
    secondaryMuscles: ["HIP_FLEXORS"],
    force: "ROTATION",
    level: "BEGINNER",
    mechanic: "ISOLATION",
    equipment: ["BODYWEIGHT"],
    category: ["CORE"],
    instructions: [
      "Sit on the ground with your knees bent and your feet off the floor.",
      "Lean back slightly while keeping your back straight.",
      "Twist your torso to the right side, bringing your hands or a weight to the floor.",
      "Twist your torso to the left side, bringing your hands or a weight to the floor."
    ],
    description: "The Russian Twist is an exercise that targets the core and oblique muscles, helping to improve rotational strength and stability.",
    tips: [
      "Engage your core throughout the exercise.",
      "Maintain a straight back and avoid rounding your shoulders.",
      "Start with lighter weights or no weights and progress as you become more comfortable with the movement."
    ]
  },
  {
    name: "Burpee",
    aliases: [],
    primaryMuscles: ["FULL_BODY"],
    secondaryMuscles: ["CALVES", "BACK", "HIP_FLEXORS", "FOREARMS"],
    force: "PUSH",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["BODYWEIGHT"],
    category: ["CARDIO", "FULL_BODY"],
    instructions: [
      "Start in a standing position with your feet shoulder-width apart.",
      "Squat down and place your hands on the floor in front of you.",
      "Kick your feet back to a high plank position.",
      "Jump your feet forward and return to the squat position.",
      "Jump up explosively with your hands reaching overhead."
    ],
    description: "The burpee is a full-body exercise that combines elements of strength, cardiovascular endurance, and explosive power.",
    tips: [
      "Maintain proper form throughout the movement, keeping your back straight and your core engaged.",
      "Focus on landing softly when jumping back and forth.",
      "Modify the exercise by stepping back and forward instead of jumping if needed."
    ]
  },
  {
    name: "Mountain Climber",
    aliases: [],
    primaryMuscles: ["CORE", "SHOULDERS", "HIP_FLEXORS"],
    secondaryMuscles: ["QUADRICEPS"],
    force: "PULL",
    level: "BEGINNER",
    mechanic: "COMPOUND",
    equipment: ["BODYWEIGHT"],
    category: ["CARDIO", "CORE"],
    instructions: [
      "Start in a high plank position with your hands directly under your shoulders.",
      "Bring one knee toward your chest, keeping your hips low and your core engaged.",
      "Extend that leg back to the starting position and repeat with the other leg."
    ],
    description: "The mountain climber is a dynamic exercise that targets the core, shoulders, and hip flexors while providing a cardiovascular challenge.",
    tips: [
      "Maintain a strong plank position throughout the movement, avoiding sagging or arching your back.",
      "Engage your core and focus on bringing your knees toward your chest with control.",
      "Increase the speed for a more intense cardio workout."
    ]
  },
  {
    name: "Dumbbell Shoulder Press",
    aliases: [],
    primaryMuscles: ["SHOULDERS"],
    secondaryMuscles: ["TRICEPS"],
    force: "PUSH",
    level: "INTERMEDIATE",
    mechanic: "ISOLATION",
    equipment: ["DUMBBELL"],
    category: ["STRENGTH"],
    instructions: [
      "Start by holding a dumbbell in each hand at shoulder level, palms facing forward.",
      "Press the dumbbells overhead, fully extending your arms.",
      "Lower the dumbbells back down to shoulder level."
    ],
    description: "The dumbbell shoulder press is an effective exercise for developing shoulder strength and stability.",
    tips: [
      "Maintain a slight bend in your knees and engage your core for stability.",
      "Avoid arching your back or using momentum to lift the weights.",
      "Exhale as you press the dumbbells overhead and inhale as you lower them."
    ]
  },
  {
    name: "Kettlebell Swing",
    aliases: [],
    primaryMuscles: ["GLUTES", "HAMSTRINGS", "BACK"],
    secondaryMuscles: ["CORE", "FOREARMS"],
    force: "PULL",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["KETTLEBELL"],
    category: ["STRENGTH", "CARDIO"],
    instructions: [
      "Stand with your feet slightly wider than shoulder-width apart and the kettlebell on the ground in front of you.",
      "Hinge at the hips and grab the kettlebell with both hands, keeping your back straight.",
      "Drive your hips forward and swing the kettlebell up to chest level, maintaining a strong core and neutral spine.",
      "Let the kettlebell swing back down between your legs and repeat the movement."
    ],
    description: "The kettlebell swing is a dynamic exercise that targets the posterior chain, including the glutes, hamstrings, and back muscles.",
    tips: [
      "Maintain a strong hip hinge and avoid rounding your back.",
      "Use the power generated from your hips and glutes to swing the kettlebell, not your arms.",
      "Start with a lighter weight to practice proper form before progressing to heavier weights."
    ]
  },
  {
    name: "Romanian Deadlift",
    aliases: [],
    primaryMuscles: ["HAMSTRINGS", "GLUTES", "BACK"],
    secondaryMuscles: ["FOREARMS"],
    force: "PULL",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["BARBELL", "DUMBBELL"],
    category: ["STRENGTH"],
    instructions: [
      "Stand with your feet hip-width apart and hold a barbell or dumbbells in front of your thighs with an overhand grip.",
      "Hinge at the hips, keeping your back straight and knees slightly bent.",
      "Lower the weight by moving your hips backward while maintaining a neutral spine.",
      "Feel a stretch in your hamstrings, and then return to the starting position by driving your hips forward."
    ],
    description: "The Romanian deadlift is an exercise that targets the posterior chain, including the hamstrings, glutes, and lower back.",
    tips: [
      "Keep your back straight throughout the movement and avoid rounding your shoulders.",
      "Engage your core and maintain a slight bend in your knees.",
      "Focus on feeling the stretch in your hamstrings as you lower the weight."
    ]
  },
  {
    name: "Barbell Hip Thrust",
    aliases: [],
    primaryMuscles: ["GLUTES"],
    secondaryMuscles: ["HAMSTRINGS"],
    force: "PUSH",
    level: "INTERMEDIATE",
    mechanic: "ISOLATION",
    equipment: ["BARBELL"],
    category: ["STRENGTH"],
    instructions: [
      "Sit on the ground with your back against a bench, knees bent, and feet flat on the floor.",
      "Place a barbell across your hips, holding it with an overhand grip.",
      "Press through your heels and lift your hips off the ground until your body forms a straight line from your shoulders to your knees.",
      "Squeeze your glutes at the top of the movement, then lower your hips back down and repeat."
    ],
    description: "The barbell hip thrust is a great exercise for targeting and strengthening the glute muscles.",
    tips: [
      "Ensure your feet are planted firmly on the ground throughout the movement.",
      "Maintain a neutral spine and avoid overarching your back.",
      "Start with lighter weights and gradually increase as you become more comfortable with the exercise."
    ]
  },
  {
    name: "Box Jump",
    aliases: [],
    primaryMuscles: ["QUADRICEPS", "GLUTES", "CALVES"],
    secondaryMuscles: ["HAMSTRINGS"],
    force: "PUSH",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["BOX"],
    category: ["PLYOMETRICS", "POWER"],
    instructions: [
      "Stand facing a sturdy box or platform with your feet shoulder-width apart.",
      "Bend your knees, swing your arms back, and explosively jump onto the box, extending your hips, knees, and ankles.",
      "Land softly on the box with your knees slightly bent.",
      "Step or jump back down and repeat the movement."
    ],
    description: "Box jumps are a plyometric exercise that help improve lower body power, explosiveness, and vertical jumping ability.",
    tips: [
      "Choose a box height that challenges you but allows you to land safely and with proper form.",
      "Engage your core and use your arms to generate momentum during the jump.",
      "Focus on landing softly and absorbing the impact with your leg muscles."
    ]
  },
  {
    name: "Dumbbell Bent-Over Row",
    aliases: [],
    primaryMuscles: ["BACK", "BICEPS"],
    secondaryMuscles: ["REAR_DELTOIDS", "FOREARMS"],
    force: "PULL",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["DUMBBELL"],
    category: ["STRENGTH"],
    instructions: [
      "Stand with your feet hip-width apart, holding a dumbbell in each hand with your palms facing your body.",
      "Hinge forward at the hips, keeping your back straight and core engaged.",
      "Pull the dumbbells up towards your chest, squeezing your shoulder blades together.",
      "Lower the dumbbells back down with control and repeat the movement."
    ],
    description: "The dumbbell bent-over row is an effective exercise for targeting the muscles of the back and biceps.",
    tips: [
      "Keep your elbows close to your body and avoid shrugging your shoulders.",
      "Maintain a neutral spine and avoid rounding your back.",
      "Engage your core for stability throughout the movement."
    ]
  },
  {
    name: "Jumping Lunges",
    aliases: [],
    primaryMuscles: ["QUADRICEPS", "GLUTES"],
    secondaryMuscles: ["CALVES"],
    force: "PUSH",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["BODYWEIGHT"],
    category: ["PLYOMETRICS"],
    instructions: [
      "Start in a lunge position with your right foot forward and your knee bent at a 90-degree angle.",
      "Jump explosively, switching your legs mid-air so that your left foot is now forward and your right foot is back.",
      "Land softly in a lunge position and immediately repeat the movement, alternating legs."
    ],
    description: "Jumping lunges are a plyometric exercise that target the lower body muscles, particularly the quadriceps and glutes.",
    tips: [
      "Maintain an upright posture and engage your core for stability.",
      "Land softly on the balls of your feet and immediately transition into the next lunge.",
      "Start with a slower pace and gradually increase speed as you become more comfortable with the exercise."
    ]
  },
  {
    name: "Incline Dumbbell Bench Press",
    aliases: [],
    primaryMuscles: ["UPPER_CHEST", "FRONT_DELTOIDS", "TRICEPS"],
    secondaryMuscles: ["TRAPS"],
    force: "PUSH",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["DUMBBELL", "BENCH"],
    category: ["STRENGTH"],
    instructions: [
      "Set an incline bench to a 30-45 degree angle.",
      "Hold a dumbbell in each hand and lie back on the bench with your feet flat on the floor.",
      "Position the dumbbells at shoulder level, palms facing forward.",
      "Push the dumbbells upward, extending your arms fully without locking your elbows.",
      "Lower the dumbbells back down to shoulder level and repeat the movement."
    ],
    description: "The incline dumbbell bench press is an effective exercise for targeting the upper chest, front deltoids, and triceps.",
    tips: [
      "Maintain a slight arch in your lower back and keep your shoulder blades retracted.",
      "Exhale as you press the dumbbells up and inhale as you lower them.",
      "Start with lighter weights to ensure proper form and gradually increase as you gain strength."
    ]
  },
  {
    name: "Russian Kettlebell Swing",
    aliases: [],
    primaryMuscles: ["GLUTES", "HAMSTRINGS", "BACK"],
    secondaryMuscles: ["CORE"],
    force: "PULL",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["KETTLEBELL"],
    category: ["STRENGTH", "CARDIO"],
    instructions: [
      "Stand with your feet shoulder-width apart and place a kettlebell between your legs.",
      "Hinge at the hips and grasp the kettlebell with both hands, palms facing inward.",
      "Drive your hips forward and swing the kettlebell up to shoulder level, maintaining a strong core and neutral spine.",
      "Allow the kettlebell to swing back down between your legs and repeat the movement."
    ],
    description: "The Russian kettlebell swing is a dynamic exercise that targets the glutes, hamstrings, and back muscles while providing cardiovascular benefits.",
    tips: [
      "Maintain a strong hip hinge and avoid rounding your back.",
      "Initiate the movement with your hips and use the power generated from your glutes and hamstrings.",
      "Start with a lighter weight to practice proper form before progressing to heavier weights."
    ]
  },
  {
    name: "Overhead Press",
    aliases: [],
    primaryMuscles: ["SHOULDERS"],
    secondaryMuscles: ["TRICEPS"],
    force: "PUSH",
    level: "INTERMEDIATE",
    mechanic: "ISOLATION",
    equipment: ["BARBELL", "DUMBBELL"],
    category: ["STRENGTH"],
    instructions: [
      "Stand with your feet shoulder-width apart and hold a barbell or dumbbells at shoulder level, palms facing forward.",
      "Press the weight overhead, fully extending your arms.",
      "Lower the weight back down to shoulder level and repeat the movement."
    ],
    description: "The overhead press is a compound exercise that targets the muscles of the shoulders and triceps.",
    tips: [
      "Maintain proper posture throughout the movement, with your core engaged and avoiding excessive arching in the lower back.",
      "Exhale as you press the weight overhead and inhale as you lower it.",
      "Start with lighter weights and gradually increase as you gain strength and confidence in your form."
    ]
  },
  {
    name: "Hanging Leg Raise",
    aliases: [],
    primaryMuscles: ["CORE"],
    secondaryMuscles: ["HIP_FLEXORS"],
    force: "PULL",
    level: "INTERMEDIATE",
    mechanic: "ISOLATION",
    equipment: ["PULL_UP_BAR"],
    category: ["STRENGTH"],
    instructions: [
      "Hang from a pull-up bar with an overhand grip, arms extended and feet off the ground.",
      "Engage your core and raise your legs, bending at the hips and bringing your knees toward your chest.",
      "Pause briefly at the top, then lower your legs back down to the starting position and repeat."
    ],
    description: "The hanging leg raise is an effective exercise for targeting the core muscles, particularly the lower abs.",
    tips: [
      "Maintain a controlled and steady movement, avoiding swinging or using momentum.",
      "Focus on using your core muscles to lift your legs rather than relying on your hip flexors.",
      "If necessary, perform a bent-knee variation by bringing your thighs toward your chest instead of straightening your legs."
    ]
  },
  {
    name: "Step-Up",
    aliases: [],
    primaryMuscles: ["QUADRICEPS", "GLUTES", "HAMSTRINGS"],
    secondaryMuscles: ["CALVES"],
    force: "PUSH",
    level: "BEGINNER",
    mechanic: "COMPOUND",
    equipment: ["BENCH", "STEP"],
    category: ["STRENGTH"],
    instructions: [
      "Stand facing a bench or step with your feet hip-width apart.",
      "Step one foot onto the bench, pressing through your heel to lift your body up.",
      "Extend your hip and knee to bring your other foot up onto the bench.",
      "Step back down with the leading foot, followed by the trailing foot, and repeat on the other side."
    ],
    description: "The step-up is a lower body exercise that targets the quadriceps, glutes, and hamstrings.",
    tips: [
      "Maintain an upright posture and avoid leaning forward or backward.",
      "Focus on driving through the heel of the working leg to engage the glutes.",
      "Choose an appropriate height for the bench or step, considering your comfort and mobility."
    ]
  },
  {
    name: "Plank Jacks",
    aliases: [],
    primaryMuscles: ["CORE"],
    secondaryMuscles: ["SHOULDERS", "HIP_ABDUCTORS"],
    force: "STATIC",
    level: "INTERMEDIATE",
    mechanic: "ISOLATION",
    equipment: ["BODYWEIGHT"],
    category: ["STRENGTH", "CARDIO"],
    instructions: [
      "Start in a high plank position with your hands directly under your shoulders and feet together.",
      "Jump your feet apart, wider than hip-width, while maintaining a strong plank position.",
      "Jump your feet back together, returning to the starting position, and repeat the movement."
    ],
    description: "Plank jacks are a dynamic exercise that target the core muscles while providing a cardiovascular challenge.",
    tips: [
      "Engage your core and keep your hips stable throughout the movement.",
      "Land softly on the balls of your feet during the jumping motion.",
      "Modify the exercise by stepping one foot out at a time instead of jumping if needed."
    ]
  },
  {
    name: "Dumbbell Front Squat",
    aliases: [],
    primaryMuscles: ["QUADRICEPS", "GLUTES"],
    secondaryMuscles: ["CORE"],
    force: "PUSH",
    level: "INTERMEDIATE",
    mechanic: "COMPOUND",
    equipment: ["DUMBBELL"],
    category: ["STRENGTH"],
    instructions: [
      "Hold a dumbbell in each hand at shoulder level, palms facing upward.",
      "Stand with your feet shoulder-width apart and toes slightly turned out.",
      "Lower your body into a squat position, keeping your chest up and knees tracking in line with your toes.",
      "Drive through your heels to return to the starting position and repeat the movement."
    ],
    description: "The dumbbell front squat is a variation of the squat exercise that emphasizes the quadriceps and glutes.",
    tips: [
      "Maintain an upright torso throughout the movement, avoiding excessive forward lean.",
      "Engage your core for stability and keep your knees aligned with your toes.",
      "Start with lighter weights to master the technique before progressing to heavier weights."
    ]
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

