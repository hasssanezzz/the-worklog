import { Exercise } from "../types"

export function datesOfweek(current = new Date()): Date[] {
  const week: Date[] = []

  current.setDate(current.getDate() - current.getDay() - 1)

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  return week
}

export function getUniqueExerciseCategories(exercises: Exercise[]) {
  return [...new Set(exercises.map(ex => ex.category))]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dateTimeReviver(key: string, value: any) {
  if (typeof value === 'string') {
    const a =
      /^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)$/.exec(
        value
      )
    if (a) {
      return new Date(value)
    }
  }
  return value
}
