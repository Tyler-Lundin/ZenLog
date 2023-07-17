import Logo from "@/components/Logo";
import Page from "@/components/Page";
import { Badge } from "@/components/ui/badge";




// "dependencies": {
//   "@hookform/resolvers": "^3.1.0",
//   "@next-auth/prisma-adapter": "^1.0.6",
//   "@prisma/client": "^4.14.1",
//   "@radix-ui/react-checkbox": "^1.0.4",
//   "@radix-ui/react-dialog": "^1.0.4",
//   "@radix-ui/react-label": "^2.0.1",
//   "@radix-ui/react-navigation-menu": "^1.1.3",
//   "@radix-ui/react-popover": "^1.0.5",
//   "@radix-ui/react-select": "^1.2.1",
//   "@radix-ui/react-slider": "^1.1.2",
//   "@radix-ui/react-slot": "^1.0.1",
//   "@reduxjs/toolkit": "^1.9.5",
//   "@types/node": "^20.3.1",
//   "@types/react": "18.2.6",
//   "@types/react-dom": "18.2.4",
//   "@vercel/analytics": "^1.0.1",
//   "autoprefixer": "10.4.14",
//   "class-variance-authority": "^0.6.0",
//   "clsx": "^1.2.1",
//   "eslint": "8.41.0",
//   "eslint-config-next": "13.4.3",
//   "framer-motion": "^10.12.16",
//   "lucide-react": "^0.220.0",
//   "next": "13.4.3",
//   "next-auth": "^4.22.1",
//   "postcss": "8.4.23",
//   "react": "18.2.0",
//   "react-dom": "18.2.0",
//   "react-icons": "^4.8.0",
//   "react-query": "^3.39.3",
//   "react-redux": "^8.0.5",
//   "react-toastify": "^9.1.3",
//   "react-use": "^17.4.0",
//   "swr": "^2.1.5",
//   "tailwind-merge": "^1.12.0",
//   "tailwindcss": "3.3.2",
//   "tailwindcss-animate": "^1.0.5",
//   "typescript": "5.0.4"
// },

export default function LearnPage() {

  const TECH_TAGS = ["Next.js", "React", "Typescript", "Prisma", "MongoDB", "Redux", "React Query", "React Hook Form", "React Toastify", "React Icons", "React Use"];
  const BODY = [
    "ZenLog is a web application designed to help you keep track of your daily activities and habits.",
    "It was created for the purpose of learning and practicing web development, and is still a work in progress.",
    "The application is built with Next.js, React, Typescript, and Prisma.",
  ]

  const ESSENTIALS = [
    { category: "EXERCISE", description: "Monitor and evaluate your physical activity patterns and regimen for better health outcomes." },
    { category: "SLEEP", description: "Observe and analyze your sleep cycles to ensure optimal rest and rejuvenation." },
    { category: "MOOD", description: "Record your emotional states and mental wellbeing to understand patterns and triggers." },
    { category: "FOOD", description: "Document your dietary intake and preferences to cultivate healthy eating habits." },
    { category: "MEDITATION", description: "Track your mindfulness practices and meditative exercises for enhanced mental clarity." },
    { category: "JOURNAL", description: "Archive your personal thoughts, experiences, and reflections through daily journal entries." },
  ]

  return (
    <Page isOffset={false}>
      <span className="grid justify-center items-center bg-black  h-16">
        <Logo isCollapsible={false} />
      </span>
      <div className="p-4 dark:text-white">
        <ul className="flex flex-col gap-2 list-none">
          {ESSENTIALS.map((item, i) => (
            <li key={`overview-item-${i}`} className="text-lg font-light bg-yellow-400 rounded-md p-4">
              <h3 className="text-4xl font-bold">{item.category}</h3>
              <span className="text-lg font-light"> {item.description}</span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2 justify-center mb-4">
          {TECH_TAGS.map((tag, i) => (
            <Badge variant={"default"} key={`overview-tag-${i}`}>{tag}</Badge>
          ))}
        </ul>
      </div>
    </Page>
  )
}
