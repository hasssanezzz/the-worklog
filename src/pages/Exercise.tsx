import Chart from 'react-apexcharts'
import { useSnapshot } from 'valtio'
import { useParams, useNavigate } from 'react-router-dom'
import Conatiner from '../components/containers/Container'
import { state } from '../store'
import { useEffect, useState } from 'react'
import { Exercise } from '../types'

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

      <h3 className="my-10">
        Viewing the last{' '}
        <strong>
          {lastCount > slicedData.length ? slicedData.length : lastCount}
        </strong>{' '}
        workouts from <strong>{selectedWorkouts.length}</strong> workouts
        <select
          value={lastCount > slicedData.length ? slicedData.length : lastCount}
          onChange={e => setLastCount(+e.target.value)}
          className="w-full bg-gray-200 rounded-md px-3 py-2 mt-2"
        >
          {lastCount > slicedData.length ? <option value={slicedData.length}>{slicedData.length}</option> : ''}
          {Array(10)
            .fill(0)
            .map((e, i) => (i+1) * 10)
            .map((e) => (
              <option key={e} disabled={e > slicedData.length}>{e}</option>
            ))}
        </select>
      </h3>

      <Chart
        options={{
          theme: {},
          colors: ['#000'],
          chart: {
            id: 'basic-bar',
          },
          xaxis: {
            categories: slicedData.map((w) => w.date.toLocaleDateString()),
          },
        }}
        series={[
          {
            name: 'Workouts',
            data: slicedData.map((w) => Math.max(...w.weight)),
          },
        ]}
        type={'bar'}
        width={'100%'}
      />
    </Conatiner>
  )
}
