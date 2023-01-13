export const UNITS = ['KG', 'LBS', 'UNIT', 'HOLES', 'SEC']

const units = ['KG', 'LBS', 'UNIT', 'HOLES', 'SEC'] as const
const categories = ['Pull', 'Push', 'Leg'] as const

export type Unit = typeof units[number]
export type Category = typeof categories[number]

export interface Exercise {
  id: string
  name: string
  category: string
  img?: string
}

export interface Workout {
  id: string
  date: Date
  time: Date
  exId: string
  sets: number
  reps: number[] | number
  weight: number[]
  unit: Unit
  note?: string
}
