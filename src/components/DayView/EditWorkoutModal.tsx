/* eslint-disable @typescript-eslint/ban-types */
import { FormEvent, useState } from 'react'
import { useSnapshot } from 'valtio'
import { state } from '../../store'
import { UNITS, Unit, CATEGORIES, Category, Workout } from '../../types'
import Modal from '../containers/Modal'

interface Props {
  active: boolean
  setActive: Function
  workout: Workout
}

export default function EditWorkoutModal({
  active,
  setActive,
  workout,
}: Props) {
  const { exercises } = useSnapshot(state)
  const [exCat, setExcat] = useState(
    exercises.find((e) => e.id === workout.exId)?.category as string
  )
  const [data, setData] = useState({
    exId: workout.exId,
    sets: workout.sets, // (3) x 10
    reps: workout.reps, // 3 x (10)
    weight: workout.weight,
    unit: workout.unit,
    note: '',
  })

  function handleWeightChange(index: number, value: number) {
    const clone: number[] = [...data.weight]
    clone[index] = value
    setData({ ...data, weight: clone })
  }

  function handleRepsChange(index: number, value: number) {
    const clone: number[] = [...data.weight]
    clone[index] = value
    setData({ ...data, reps: clone })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const index = state.workouts.map((e) => e.id).indexOf(workout.id)

    state.workouts[index].exId = data.exId
    state.workouts[index].sets = data.sets
    state.workouts[index].reps = data.reps
    state.workouts[index].weight = data.weight
    state.workouts[index].unit = data.unit
    state.workouts[index].note = data.note

    setActive(false)
  }

  return (
    <Modal active={active} setActive={setActive}>
      <form onSubmit={handleSubmit}>
        <Modal.Header title="Edit Workout" />

        <main className="p-5 grid grid-cols-2 space-y-5 gap-x-5">
          <div className="space-y-2 col-span-2">
            <label htmlFor="Exercise">Exercise category</label>
            <select
              required
              value={exCat}
              onChange={(e) => setExcat(e.target.value as Category)}
              className="w-full bg-gray-200 rounded-md px-3 py-2"
            >
              <option value="">All</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 col-span-2">
            <label htmlFor="Exercise">Exercise</label>
            <select
              required
              value={data.exId}
              onChange={(e) => setData({ ...data, exId: e.target.value })}
              className="w-full bg-gray-200 rounded-md px-3 py-2"
            >
              <option value="">Select</option>
              {/* TODO fix the lowercase bug */}
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

          <div className="space-y-2 col-span-1">
            <label htmlFor="Exercise">Sets</label>
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
                  weight: Array(+e.target.value).fill(1),
                })
              }
              placeholder="Sets..."
              className="w-full bg-gray-200 rounded-md px-3 py-2"
            />
          </div>

          {typeof workout.reps === 'number' ? (
            <div className="space-y-2 col-span-1">
              <label htmlFor="Exercise">Reps</label>
              <input
                required
                type="number"
                value={data.reps as number}
                onChange={(e) => setData({ ...data, reps: +e.target.value })}
                placeholder="Reps..."
                className="w-full bg-gray-200 rounded-md px-3 py-2"
              />
            </div>
          ) : (
            <div className="space-y-1 col-span-2">
              <label htmlFor="Exercise">Reps</label>
              <div className="flex items-center gap-3">
                {typeof data.reps === 'object' &&
                  data.reps.map((set, index) => (
                    <input
                      required
                      type="number"
                      key={index}
                      value={set}
                      onChange={(e) => handleRepsChange(index, +e.target.value)}
                      className="w-full bg-gray-200 rounded-md px-3 py-2"
                    />
                  ))}
              </div>
            </div>
          )}

          <div className="space-y-2 col-span-2">
            <label htmlFor="Exercise">Weight</label>
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
              onChange={(e) =>
                setData({ ...data, unit: e.target.value as Unit })
              }
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
