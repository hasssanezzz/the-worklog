import { FormEvent, useState } from 'react'
import { useSnapshot } from 'valtio'
import { getUniqueExerciseCategories } from '../../helpers'
import { state } from '../../store'
import { UNITS, Unit, Exercise } from '../../types'
import Modal from '../containers/Modal'

interface Props {
  active: boolean
  setActive: Function
}

export default function AddWorkoutModal({ active, setActive }: Props) {
  const { exercises, selectedDate } = useSnapshot(state)
  const [exCat, setExcat] = useState('')
  const [data, setData] = useState({
    exId: '',
    sets: 3, // (3) x 10
    reps: Array(3).fill(12) as number[], // 3 x (10)
    weight: [1, 1, 1],
    unit: UNITS[0],
    note: '',
  })

  function handleWeightChange(index: number, value: number) {
    const clone: number[] = [...data.weight]
    clone[index] = value
    setData({ ...data, weight: clone })
  }

  function handleRepsChange(index: number, value: number) {
    const clone: number[] = [...data.reps]
    clone[index] = value
    setData({ ...data, reps: clone })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    state.workouts.unshift({
      id: Date.now().toString(),
      date: selectedDate,
      time: new Date(),
      exId: data.exId,
      sets: data.sets,
      reps: data.reps,
      weight: data.weight,
      unit: data.unit as Unit,
      note: data.note,
    })

    setData({
      exId: '',
      sets: 3, // (3) x 10
      reps: Array(3).fill(12) as number[], // 3 x (10)
      weight: [1, 1, 1],
      unit: UNITS[0],
      note: '',
    })

    setActive(false)
  }

  return (
    <Modal active={active} setActive={setActive}>
      <form onSubmit={handleSubmit}>
        <Modal.Header title="Add Workout" />

        <main className="p-5 grid grid-cols-2 space-y-3 gap-x-5">
          <div className="space-y-1 col-span-1">
            <label htmlFor="">Exercise category</label>
            <select
              value={exCat}
              onChange={(e) => setExcat(e.target.value)}
              className="w-full bg-gray-200 rounded-md px-3 py-2"
            >
              <option value="">All</option>
              {getUniqueExerciseCategories(exercises as Exercise[]).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1 col-span-1" style={{ margin: 0 }}>
            <label htmlFor="">Exercise</label>
            <select
              required
              value={data.exId}
              onChange={(e) => setData({ ...data, exId: e.target.value })}
              className="w-full bg-gray-200 rounded-md px-3 py-2"
            >
              <option value="">Select</option>
              {exercises
                .filter((ex) =>
                  ex.category.toLowerCase().match(exCat.toLowerCase())
                )
                .map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="space-y-1 col-span-2">
            <label htmlFor="">Sets</label>
            <input
              required
              type="number"
              min={1}
              max={6}
              value={data.sets}
              onChange={(e) =>
                setData({
                  ...data,
                  sets: +e.target.value,
                  reps: Array(+e.target.value).fill(12),
                  weight: Array(+e.target.value).fill(1),
                })
              }
              placeholder="Sets..."
              className="w-full bg-gray-200 rounded-md px-3 py-2"
            />
          </div>

          <div className="space-y-1 col-span-2">
            <label htmlFor="">Reps</label>
            <div className="flex items-center gap-3">
              {data.reps.map((rep, index) => (
                <input
                  key={index}
                  required
                  type="number"
                  value={rep}
                  onChange={(e) => handleRepsChange(index, +e.target.value)}
                  className="w-full bg-gray-200 rounded-md px-3 py-2"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 col-span-2">
            <label htmlFor="">Weight</label>
            <div className="flex items-center gap-3">
              {data.weight.map((set, index) => (
                <input
                  required
                  type="number"
                  key={index}
                  value={set}
                  onChange={(e) => handleWeightChange(index, +e.target.value)}
                  className="w-full bg-gray-200 rounded-md px-3 py-2"
                />
              ))}
            </div>

            <select
              required
              value={data.unit}
              onChange={(e) => setData({ ...data, unit: e.target.value })}
              className="w-full bg-gray-200 rounded-md px-3 py-2"
            >
              {UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 col-span-2">
            <label htmlFor="">Notes</label>
            <div className="flex items-center gap-3">
              <textarea
                value={data.note}
                onChange={(e) => setData({ ...data, note: e.target.value })}
                placeholder="Add some notes...."
                className="w-full bg-gray-200 rounded-md px-3 py-2"
              ></textarea>
            </div>
          </div>
        </main>

        <Modal.Footer className="flex items-center justify-between gap-5">
          <button
            type="submit"
            className="px-10 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 flex-auto"
          >
            Save
          </button>
          <button
            type="reset"
            onClick={() => setActive(false)}
            className="px-10 py-2 rounded-md border border-gray-300 hover:bg-gray-100 flex-auto"
          >
            Cancel
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
