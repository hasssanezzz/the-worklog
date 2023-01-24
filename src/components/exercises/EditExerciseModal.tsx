/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormEvent, useState } from 'react'
import { useSnapshot } from 'valtio'
import { getUniqueExerciseCategories } from '../../helpers'
import { state } from '../../store'
import { Exercise } from '../../types'
import Modal from '../containers/Modal'

interface Props {
  exId: string
  active: boolean
  setActive: Function
}

export default function EditExerciseModal({ exId, active, setActive }: Props) {
  const { exercises } = useSnapshot(state)

  const selectedExercise = exercises.find(e => e.id === exId)

  const [name, setName] = useState(selectedExercise?.name)
  const [category, setCategory] = useState(selectedExercise?.category)
  const [customCat, setCustomCat] = useState('')


  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const index = exercises.map(e => e.id).indexOf(exId)

    state.exercises[index].name = name!
    state.exercises[index].category = (customCat || category)!

    setName('')
    setCategory('')
    setActive(false)
  }

  return (
    <Modal active={active} setActive={setActive}>
      <form onSubmit={handleSubmit}>
        <Modal.Header title="Edit exercise" />

        <main className="p-5 grid grid-cols-2 space-y-5 gap-x-5">
          <div className="space-y-2 col-span-2">
            <label htmlFor="Exercise">Exercise Category</label>
            <div>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2"
              >
                <option value="">Select</option>
                <option value="custom">Add custom</option>
                {getUniqueExerciseCategories(exercises as Exercise[]).map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {category === 'custom' ? (
            <div className="space-y-2 col-span-2">
              <label htmlFor="Exercise">Custom category</label>
              <div>
                <input
                  required
                  type="text"
                  value={customCat}
                  onChange={(e) => setCustomCat(e.target.value)}
                  placeholder="Your custom category..."
                  className="w-full bg-gray-200 rounded-md px-3 py-2"
                />
              </div>
            </div>
          ) : (
            ''
          )}

          <div className="space-y-2 col-span-2">
            <label htmlFor="Exercise">Exercise name</label>
            <div>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Exercise name..."
                className="w-full bg-gray-200 rounded-md px-3 py-2"
              />
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
