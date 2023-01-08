import { HiOutlineTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { state } from '../../store'
import { CATEGORIES, Exercise } from '../../types'

function ExerciseCard({ ex }: { ex: Exercise }) {

  function handleDeleteClick() {
    state.exercises = state.exercises.filter(e => e.id !== ex.id)
    state.workouts = state.workouts.filter(w => w.exId !== ex.id)
  }

  return (
    <Link to={`/exercise/${ex.id}`} className="px-5 py-3 shadow border rounded-xl block">
      <div className="flex items-center justify-between gap-5">
        <div>
          <h2 className="font-bold text-xl">{ex.name}</h2>
          <small className="capetalize">{ex.category}</small>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={handleDeleteClick}
            className="p-1 hover:bg-red-300 rounded-md text-red-500"
          >
            <HiOutlineTrash size={20} />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default function ExerciseList() {
  const { exercises } = useSnapshot(state)

  return (
    <main className="">
      {CATEGORIES.map((c) => (
        <div key={c}>
          <h2 className="font-bold text-2xl my-5">{c}</h2>

          <div className="space-y-3">
            {exercises
              .filter((ex) => ex.category.toLowerCase() === c.toLowerCase())
              .map((ex) => (
                <ExerciseCard key={ex.id} ex={ex} />
              ))}
          </div>
        </div>
      ))}
    </main>
  )
}
