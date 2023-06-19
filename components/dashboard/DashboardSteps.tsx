'use client';
import { useState } from "react";


export default function DashboardSteps() {
  const [step, setStep] = useState(0);

  const steps = [
    { id: 0, component: GetWeightStep },
    { id: 1, component: GetHeightStep },
    { id: 2, component: GetAgeStep },
    { id: 3, component: GetGenderStep },
    { id: 4, component: GetActivityLevelStep },
    { id: 5, component: GetGoalStep },
    { id: 6, component: GetDietPreferencesStep },
    { id: 7, component: GetAllergiesStep },
    { id: 8, component: GetInjuriesStep },
    { id: 9, component: GetFavoriteExerciseStep },
    { id: 10, component: GetExerciseFrequencyStep },
    { id: 11, component: GetStressLevelStep },
    { id: 12, component: GetSleepStep },
    { id: 13, component: GetMoodStep },
  ]

  const CurrentStep = steps[step].component;

  return (
    <div className="bg-gray-400">
      <div>Step {step + 1} of {steps.length}</div>
      <CurrentStep />
      <button onClick={() => setStep(step - 1)}>Back</button>
      <button onClick={() => setStep(step + 1)}>Next</button>
    </div>
  )
}



export function GetWeightStep() {
  return (
    <div>
      <label>How much do you weigh today?</label>
      <input type="number" />
    </div>
  )
}

export function GetHeightStep() {
  return (
    <div>
      <label>How tall are you?</label>
      <input type="number" />
    </div>
  )
}

export function GetAgeStep() {
  return (
    <div>
      <label>How old are you?</label>
      <input type="number" />
    </div>
  )
}

export function GetGenderStep() {
  return (
    <div>
      <label>What is your Gender?</label>
      <select>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  )
}

export function GetActivityLevelStep() {
  return (
    <div>
      <label>How active are you?</label>
      <select>
        <option value="sedentary">Sedentary</option>
        <option value="light">Light</option>
        <option value="moderate">Moderate</option>
        <option value="very">Very</option>
        <option value="extra">Extra</option>
      </select>
    </div>
  )
}

export function GetGoalStep() {
  return (
    <div>
      <label>What is your goal?</label>
      <select>
        <option value="lose">Lose Weight</option>
        <option value="maintain">Maintain Weight</option>
        <option value="gain">Gain Weight</option>
      </select>
    </div>
  )
}

export function GetDietPreferencesStep() {
  return (
    <div>
      <label>What are your dietary preferences?</label>
      <select>
        <option value="no_preference">No preference</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="pescatarian">Pescatarian</option>
        <option value="gluten_free">Gluten-free</option>
        <option value="dairy_free">Dairy-free</option>
      </select>
    </div>
  )
}

export function GetAllergiesStep() {
  return (
    <div>
      <label>Please list any food allergies or sensitivities:</label>
      <input type="text" />
    </div>
  )
}

export function GetInjuriesStep() {
  return (
    <div>
      <label>Please list any physical injuries or limitations:</label>
      <input type="text" />
    </div>
  )
}

export function GetFavoriteExerciseStep() {
  return (
    <div>
      <label>What is your favorite type of exercise?</label>
      <select>
        <option value="cardio">Cardio</option>
        <option value="strength">Strength Training</option>
        <option value="yoga">Yoga/Pilates</option>
        <option value="hiking">Outdoor Activities (e.g. hiking, biking)</option>
        <option value="sports">Sports</option>
      </select>
    </div>
  )
}

export function GetExerciseFrequencyStep() {
  return (
    <div>
      <label>How often do you exercise per week?</label>
      <input type="number" min="0" max="7" />
    </div>
  )
}

export function GetStressLevelStep() {
  return (
    <div>
      <label>How would you describe your stress level?</label>
      <select>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  )
}

export function GetSleepStep() {
  return (
    <div>
      <label>How many hours of sleep did you get last night?</label>
      <input type="number" min="0" max="24" />
    </div>
  )
}


export function GetMoodStep() {
  return (
    <div>
      <label>How is your mood today?</label>
      <select>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="anxious">Anxious</option>
        <option value="neutral">Neutral</option>
        <option value="angry">Angry</option>
        <option value="stressed">Stressed</option>
        <option value="excited">Excited</option>
      </select>
    </div>
  )
}

