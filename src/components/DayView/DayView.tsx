import { useMemo } from 'react'
import { useSnapshot } from 'valtio'
import { state } from '../../store'
import { Workout } from '../../types'
import WorkoutCard from './WorkoutCard'

export default function DayView() {
  const { selectedDate, workouts } = useSnapshot(state)

  const selectedWorkouts = useMemo(
    () =>
      workouts.filter(
        (w) => w.date.toLocaleDateString() === selectedDate.toLocaleDateString()
      ),
    [workouts, selectedDate]
  )

  return (
    <main>
      <h2 className="text-xl font-bold">
        {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}{' '}
        {selectedDate.toLocaleDateString()}
      </h2>

      <div className="mt-5 space-y-5">
        {selectedWorkouts.length ? (
          selectedWorkouts.map((w) => (
            <WorkoutCard key={w.id} w={w as Workout} />
          ))
        ) : (
          <p className="text-2xl font-bold text-gray-300">
            No workouts to view...
          </p>
        )}
      </div>
    </main>
  )
}
