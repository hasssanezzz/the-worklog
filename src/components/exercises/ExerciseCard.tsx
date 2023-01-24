import { useState } from 'react'
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { state } from '../../store'
import { Exercise } from '../../types'
import EditExerciseModal from './EditExerciseModal'

export default function ExerciseCard({ ex }: { ex: Exercise }) {
  const [isEditExerciseModalActive, setIsEditExerciseModalActive] =
    useState(false)

  function handleDeleteClick() {
    state.exercises = state.exercises.filter((e) => e.id !== ex.id)
    state.workouts = state.workouts.filter((w) => w.exId !== ex.id)
  }

  return (
    <div className="px-5 py-3 shadow dark:shadow-gray-800 border dark:border-gray-700 rounded-xl block">
      <div className="flex items-center justify-between gap-5">
        <Link to={`/exercise/${ex.id}`}>
          <h2 className="font-bold text-xl">{ex.name}</h2>
          <small className="capetalize">{ex.category}</small>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => setIsEditExerciseModalActive(true)}
            className="p-1 hover:bg-gray-700 rounded-md"
          >
            <HiOutlinePencil size={20} />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-1 hover:bg-red-300 rounded-md text-red-500"
          >
            <HiOutlineTrash size={20} />
          </button>
        </div>
        <EditExerciseModal
          exId={ex.id}
          active={isEditExerciseModalActive}
          setActive={setIsEditExerciseModalActive}
        />
      </div>
    </div>
  )
}
