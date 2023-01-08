import { useSnapshot } from 'valtio'
import { useParams, useNavigate } from 'react-router-dom'
import Conatiner from '../components/containers/Container'
import { state } from '../store'
import { useEffect, useState } from 'react'
import { Exercise, Workout } from '../types'
import Graph from '../components/exercise/Graph'
import Stats from '../components/exercise/Stats'
import CountSetter from '../components/exercise/CountSetter'

export default function ExerciseComponent() {
  const { exercises, workouts } = useSnapshot(state)
  const [ex, setEx] = useState<Exercise>({} as Exercise)
  const [lastCount, setLastCount] = useState(20)

  const params = useParams()
  const navigate = useNavigate()

  const selectedWorkouts = workouts
    .filter((w) => w.exId === ex.id)
    .sort((a, b) => (a.date > b.date ? 1 : -1))

  const slicedData = selectedWorkouts.slice(
    selectedWorkouts.length - lastCount,
    selectedWorkouts.length
  )

  useEffect(() => {
    const index = exercises.map((e) => e.id).indexOf(params?.id as string)
    if (index === -1) {
      navigate('/exercises')
      return
    }

    setEx(exercises[index])
  }, [params.id])

  return (
    <Conatiner className="pb-10">
      <div className="text-center my-5">
        <h3 className="font-semibold">Analytics</h3>
        <h2 className="text-4xl text-center font-bold">{ex.name}</h2>
      </div>

    <CountSetter 
      dataLength={selectedWorkouts.length}
      slicedDataLength={slicedData.length}
      lastCount={lastCount}
      setLastCount={setLastCount}
    />

      <h4 className="text-xl font-bold my-5">Graph:</h4>
      <Graph data={slicedData as Workout[]} />

      <h4 className="text-xl font-bold my-5">Stats:</h4>
      <Stats data={slicedData as Workout[]} />

    </Conatiner>
  )
}
