import { useMemo, useState } from 'react'
import { useSnapshot } from 'valtio'
import { state } from '../../store'
import { Workout } from '../../types'
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2'
import EditWorkoutModal from './EditWorkoutModal'

export default function WorkoutCard({ w: workout }: { w: Workout }) {
  const { exercises, workouts } = useSnapshot(state)
  const [isModalActive, setIsModalActive] = useState(false)

  const ex = useMemo(() => {
    const index = exercises.map((e) => e.id).indexOf(workout.exId)
    return exercises[index]
  }, [workout.exId])

  function handleDeleteClick() {
    state.workouts = workouts.filter((w) => w.id !== workout.id) as Workout[]
  }

  return (
    <div className="p-5 border shadow rounded-xl bg-black text-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="capitalize text-sm">{ex.category}</p>
          <h2 className="text-2xl font-bold">{ex.name}</h2>
          <small className="text-gray-400">
            {workout?.time?.toLocaleTimeString()}
          </small>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => setIsModalActive(true)}
            className="p-1 hover:bg-gray-700 rounded-md"
          >
            <HiOutlinePencil size={20} />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-1 hover:bg-red-500 hover:text-white rounded-md text-red-500"
          >
            <HiOutlineTrash size={20} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        {workout.weight.map((set, index) => (
          <div
            key={index}
            className="p-2 text-center bg-white rounded-2xl flex-auto text-black font-bold"
          >
            {set} {workout.unit} x {workout.reps}
          </div>
        ))}
      </div>

      <EditWorkoutModal workout={workout} active={isModalActive} setActive={setIsModalActive} />
    </div>
  )
}
