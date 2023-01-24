import { useMemo } from 'react'
import { useSnapshot } from 'valtio'
import { state } from '../../store'

export default function DayBox({ date }: { date: Date }) {
  const { selectedDate, workouts } = useSnapshot(state)
  const today = new Date()

  const selectedWorkouts = useMemo(
    () =>
      workouts.filter(
        (w) => w.date.toLocaleDateString() === date.toLocaleDateString()
      ),
    [selectedDate, workouts]
  )

  return (
    <button
      onClick={() => (state.selectedDate = date)}
      className={`group relative border-2 dark:border-2 border-black dark:border-gray-500 ${
        today.toLocaleDateString() === date.toLocaleDateString()
          ? 'border-b-4 border-b-blue-500 dark:border-b-blue-500'
          : ''
      }  ${
        selectedDate.toLocaleDateString() === date.toLocaleDateString()
          ? 'border-2 border-blue-500 dark:border-blue-500'
          : 'border'
      } flex-auto h-[55px] flex-shrink-0 ${selectedWorkouts.length && 'border-b-4 border-b-red-500 dark:border-b-red-500'} shadow rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800`}
    >
      <div className="flex flex-col">
        <span>{date.getDate()}</span>
        <span className="text-sm">
          {date.toLocaleDateString('en-US', { weekday: 'short' })[0]}
        </span>
      </div>

      <div className="absolute top-[55px] flex items-center gap-1">
        {selectedWorkouts.length ? (
          <span className="text-[10px] font-bold dark:text-white text-black">
            {selectedWorkouts.length}
          </span>
        ) : (
          ''
        )}
      </div>
    </button>
  )
}
