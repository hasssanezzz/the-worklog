import { proxy, subscribe } from 'valtio'
import { datesOfweek, dateTimeReviver } from '../helpers'
import { Exercise, Workout } from '../types'

interface State {
  dark: boolean
  selectedDate: Date
  week: Date[]
  exercises: Exercise[]
  workouts: Workout[]
}

const initState = {
  dark: true,
  selectedDate: new Date(),
  week: datesOfweek(),
  exercises: [
    { id: '123', category: 'Pull', name: 'Biceps curl' },
    { id: '124', category: 'Push', name: 'Cable push down' },
    { id: '125', category: 'Push', name: 'Chest press' },
  ],
  workouts: [],
} as State

// export const state = proxy(initState)

export const state = proxy(
  localStorage.data
    ? (JSON.parse(localStorage.data, dateTimeReviver) as State)
    : initState
)

subscribe(state, () => (localStorage.data = JSON.stringify(state)))
