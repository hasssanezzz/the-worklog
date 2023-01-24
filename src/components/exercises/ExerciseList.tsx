import { useSnapshot } from 'valtio'
import { getUniqueExerciseCategories } from '../../helpers'
import { state } from '../../store'
import { Exercise } from '../../types'
import ExerciseCard from './ExerciseCard'

export default function ExerciseList() {
  const { exercises } = useSnapshot(state)

  return (
    <main className="">
      {getUniqueExerciseCategories(exercises as Exercise[]).map((c) => (
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
