import { Mood } from "@prisma/client";

export const MOODS = [
  { name: Mood.AFFECTION, icon: "😍", value: Mood.AFFECTION, color: "bg-pink-400 dark:bg-pink-600 text-white" },
  { name: Mood.AGITATION, icon: "😬", value: Mood.AGITATION, color: "bg-orange-400 dark:bg-orange-600 text-black" },
  { name: Mood.AMUSEMENT, icon: "😄", value: Mood.AMUSEMENT, color: "bg-yellow-400 dark:bg-yellow-600 text-black" },
  { name: Mood.ANGER, icon: "😡", value: Mood.ANGER, color: "bg-red-400 dark:bg-red-600 text-white" },
  { name: Mood.ANNOYANCE, icon: "😒", value: Mood.ANNOYANCE, color: "bg-orange-400 dark:bg-orange-600 text-black" },
  { name: Mood.ANXIETY, icon: "😰", value: Mood.ANXIETY, color: "bg-blue-400 dark:bg-blue-600 text-black" },
  { name: Mood.APATHY, icon: "😑", value: Mood.APATHY, color: "bg-gray-400 dark:bg-gray-600 text-black" },
  { name: Mood.AWE, icon: "😲", value: Mood.AWE, color: "bg-green-400 dark:bg-green-600 text-black" },
  { name: Mood.BOREDOM, icon: "😴", value: Mood.BOREDOM, color: "bg-gray-400 dark:bg-gray-600 text-black" },
  { name: Mood.CALM, icon: "😌", value: Mood.CALM, color: "bg-teal-400 dark:bg-teal-600 text-black" },
  { name: Mood.CONFUSION, icon: "😵", value: Mood.CONFUSION, color: "bg-purple-400 dark:bg-purple-600 text-white" },
  { name: Mood.CONTEMPT, icon: "😒", value: Mood.CONTEMPT, color: "bg-indigo-400 dark:bg-indigo-600 text-white" },
  { name: Mood.CURIOSITY, icon: "🤔", value: Mood.CURIOSITY, color: "bg-yellow-400 dark:bg-yellow-600 text-black" },
  { name: Mood.DEPRESSION, icon: "😔", value: Mood.DEPRESSION, color: "bg-black dark:bg-gray-800 text-white" },
  { name: Mood.DESIRE, icon: "😍", value: Mood.DESIRE, color: "bg-red-400 dark:bg-red-600 text-white" },
  { name: Mood.DESPAIR, icon: "😞", value: Mood.DESPAIR, color: "bg-gray-600 dark:bg-gray-800 text-white" },
  { name: Mood.DISAPPOINTMENT, icon: "😞", value: Mood.DISAPPOINTMENT, color: "bg-gray-600 dark:bg-gray-800 text-white" },
  { name: Mood.DISGUST, icon: "🤢", value: Mood.DISGUST, color: "bg-purple-400 dark:bg-purple-600 text-white" },
  { name: Mood.DOUBT, icon: "🤔", value: Mood.DOUBT, color: "bg-yellow-400 dark:bg-yellow-600 text-black" },
  { name: Mood.EAGERNESS, icon: "😃", value: Mood.EAGERNESS, color: "bg-green-400 dark:bg-green-600 text-black" },
  { name: Mood.EMBARRASSMENT, icon: "😳", value: Mood.EMBARRASSMENT, color: "bg-red-400 dark:bg-red-600 text-black" },
  { name: Mood.ENVY, icon: "😒", value: Mood.ENVY, color: "bg-green-400 dark:bg-green-600 text-black" },
  { name: Mood.EXCITEMENT, icon: "😆", value: Mood.EXCITEMENT, color: "bg-yellow-400 dark:bg-yellow-600 text-black" },
  { name: Mood.FEAR, icon: "😨", value: Mood.FEAR, color: "bg-gray-400 dark:bg-gray-600 text-black" },
  { name: Mood.FRUSTRATION, icon: "😤", value: Mood.FRUSTRATION, color: "bg-red-400 dark:bg-red-600 text-white" },
  { name: Mood.GRATITUDE, icon: "🙏", value: Mood.GRATITUDE, color: "bg-green-400 dark:bg-green-600 text-black" },
  { name: Mood.GRIEF, icon: "😢", value: Mood.GRIEF, color: "bg-blue-400 dark:bg-blue-600 text-white" },
  { name: Mood.GUILT, icon: "😖", value: Mood.GUILT, color: "bg-orange-400 dark:bg-orange-600 text-black" },
  { name: Mood.HAPPINESS, icon: "😀", value: Mood.HAPPINESS, color: "bg-yellow-400 dark:bg-yellow-600 text-black" },
  { name: Mood.HATRED, icon: "😠", value: Mood.HATRED, color: "bg-red-900 dark:bg-red-700 text-white" },
  { name: Mood.HOPE, icon: "🌞", value: Mood.HOPE, color: "bg-yellow-400 dark:bg-yellow-600 text-black" },
  { name: Mood.HOSTILITY, icon: "😠", value: Mood.HOSTILITY, color: "bg-red-900 dark:bg-red-700 text-white" },
  { name: Mood.HUMILIATION, icon: "😳", value: Mood.HUMILIATION, color: "bg-red-400 dark:bg-red-600 text-black" },
  { name: Mood.INTEREST, icon: "🧐", value: Mood.INTEREST, color: "bg-blue-400 dark:bg-blue-700 text-black" },
  { name: Mood.JEALOUSY, icon: "😒", value: Mood.JEALOUSY, color: "bg-orange-400 dark:bg-orange-600 text-black" },
  { name: Mood.JOY, icon: "😄", value: Mood.JOY, color: "bg-yellow-400 dark:bg-yellow-600 text-black" },
  { name: Mood.LONELINESS, icon: "😔", value: Mood.LONELINESS, color: "bg-gray-400 dark:bg-gray-600 text-black" },
  { name: Mood.LOVE, icon: "❤️", value: Mood.LOVE, color: "bg-red-400 dark:bg-red-600 text-white" },
  { name: Mood.NERVOUSNESS, icon: "😰", value: Mood.NERVOUSNESS, color: "bg-blue-400 dark:bg-blue-600 text-black" },
  { name: Mood.OPTIMISM, icon: "😃", value: Mood.OPTIMISM, color: "bg-green-400 dark:bg-green-600 text-black" },
  { name: Mood.OUTRAGE, icon: "😡", value: Mood.OUTRAGE, color: "bg-red-400 dark:bg-red-600 text-white" },
  { name: Mood.PANIC, icon: "😱", value: Mood.PANIC, color: "bg-gray-400 dark:bg-gray-600 text-black" },
  { name: Mood.PASSION, icon: "😍", value: Mood.PASSION, color: "bg-red-400 dark:bg-red-600 text-white" },
  { name: Mood.PITY, icon: "😔", value: Mood.PITY, color: "bg-blue-400 dark:bg-blue-600 text-black" },
  { name: Mood.PRIDE, icon: "😏", value: Mood.PRIDE, color: "bg-purple-400 dark:bg-purple-600 text-white" },
  { name: Mood.RELIEF, icon: "😌", value: Mood.RELIEF, color: "bg-teal-400 dark:bg-teal-600 text-black" },
  { name: Mood.REMORSE, icon: "😖", value: Mood.REMORSE, color: "bg-orange-400 dark:bg-orange-600 text-black" },
  { name: Mood.RESIGNATION, icon: "😔", value: Mood.RESIGNATION, color: "bg-gray-400 dark:bg-gray-600 text-black" },
  { name: Mood.SADNESS, icon: "😢", value: Mood.SADNESS, color: "bg-blue-400 dark:bg-blue-600 text-white" },
  { name: Mood.SATISFACTION, icon: "😌", value: Mood.SATISFACTION, color: "bg-teal-400 dark:bg-teal-600 text-black" },
  { name: Mood.SHAME, icon: "😳", value: Mood.SHAME, color: "bg-red-400 dark:bg-red-600 text-black" },
  { name: Mood.SHOCK, icon: "😱", value: Mood.SHOCK, color: "bg-gray-400 dark:bg-gray-600 text-black" },
  { name: Mood.SORROW, icon: "😢", value: Mood.SORROW, color: "bg-blue-400 dark:bg-blue-600 text-white" },
  { name: Mood.SURPRISE, icon: "😲", value: Mood.SURPRISE, color: "bg-green-400 dark:bg-green-600 text-black" },
  { name: Mood.SYMPATHY, icon: "🙁", value: Mood.SYMPATHY, color: "bg-blue-400 dark:bg-blue-600 text-black" },
  { name: Mood.TERROR, icon: "😱", value: Mood.TERROR, color: "bg-gray-400 dark:bg-gray-600 text-black" },
  { name: Mood.TRUST, icon: "🤝", value: Mood.TRUST, color: "bg-green-400 dark:bg-green-600 text-black" },
  { name: Mood.WONDER, icon: "😲", value: Mood.WONDER, color: "bg-green-400 dark:bg-green-600 text-black" },
  { name: Mood.WORRY, icon: "😰", value: Mood.WORRY, color: "bg-blue-400 dark:bg-blue-600 text-black" },
  { name: Mood.ZEAL, icon: "😄", value: Mood.ZEAL, color: "bg-yellow-400 dark:bg-yellow-600 text-black" }
]