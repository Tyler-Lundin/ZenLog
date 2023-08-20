"use client"
import Logo from "@/components/Logo";
import Page from "@/components/Page";
import BackButton from "@/components/ui/BackButton";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";


const TECH_TAGS = ["Next.js", "React", "Typescript", "Tailwind", "Prisma", "MongoDB", "Redux", "React Query", "React Hook Form", "React Toastify", "React Icons",];
const HEADER = "zenlog?";

const ESSENTIALS = [
  { category: "EXERCISE", description: "Monitor and evaluate your physical activity patterns and regimen for better health outcomes. " },
  { category: "SLEEP", description: "Observe and analyze your sleep cycles to ensure optimal rest and rejuvenation." },
  { category: "MOOD", description: "Record your emotional states and mental wellbeing to understand patterns and triggers." },
  { category: "FOOD", description: "Document your dietary intake and preferences to cultivate healthy eating habits." },
  { category: "MEDITATION", description: "Track your mindfulness practices and meditative exercises for enhanced mental clarity." },
  { category: "JOURNAL", description: "Archive your personal thoughts, experiences, and reflections through daily journal entries." },
]


export default function LearnPage() {
  console.log("LearnPage render");
  const router = useRouter();
  return (
    <Page isOffset={false} className="dark:bg-black">
      <span className="grid justify-center items-center dark:bg-black h-16">
        <BackButton onClick={() => router.back()} />
        <Logo isCollapsible={false} />
      </span>
      <div className="p-4 dark:text-white">
        <ul className="flex flex-col gap-2 list-none border border-black/25 backdrop-blur-[1px] dark:border-white/25 py-4">
          <h1 className="text-3xl font-black uppercase tracking-wider text-center">{HEADER}</h1>
          {ESSENTIALS.map((item, i) => (
            <li key={`overview-item-${i}`} className="text-lg font-light rounded-md p-4">
              <h3 className="text-lg font-bold">{item.category}</h3>
              <p className="text-sm">{item.description}</p>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-black uppercase tracking-wider text-center mt-4">TECH STACK</h2>
        <ul className="flex flex-wrap gap-2 justify-center my-4">
          {TECH_TAGS.map((tag, i) => (
            <Badge variant={"default"} key={`overview-tag-${i}`}>{tag}</Badge>
          ))}
        </ul>

      </div>
    </Page>
  )
}
