import { useMemo } from 'react'
import { useSnapshot } from 'valtio'
import { state } from '../../store'

export default function DayBox({ date }: { date: Date }) {
  const { selectedDate, workouts } = useSnapshot(state)
  const today = new Date()

  const selectedWorkouts = useMemo(() => workouts.filter(w => w.date.toLocaleDateString() === date.toLocaleDateString()), [selectedDate, workouts, ])

  return (
    <button
      onClick={() => (state.selectedDate = date)}
      className={`group relative ${selectedWorkouts.length ? 'border-4' : 'border'} ${
        today.toLocaleDateString() === date.toLocaleDateString()
          ? 'border-4 border-blue-500'
          : 'border-black dark:border-gray-700'
      }  ${
        selectedDate.toLocaleDateString() === date.toLocaleDateString()
          ? 'dark:bg-gray-700 dark:text-white bg-black text-white'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      } flex-auto h-[55px] flex-shrink-0 shadow rounded-xl flex items-center justify-center`}
    >
      <div className="flex flex-col">
        <span>{date.getDate()}</span>
        <span className="text-sm">
          {date.toLocaleDateString('en-US', { weekday: 'short' })[0]}
        </span>
      </div>

      <div className="absolute top-[55px] flex items-center gap-1">
        {selectedWorkouts.length ? <span className='text-[10px] font-bold'>{selectedWorkouts.length}</span> : ''}
      </div>
    </button>
  )
}
