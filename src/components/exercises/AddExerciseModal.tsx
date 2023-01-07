import { FormEvent, useState } from 'react'
import { state } from '../../store'
import { CATEGORIES, Category } from '../../types'
import Modal from '../containers/Modal'

interface Props {
  active: boolean
  setActive: Function
}

export default function AddExerciseModal({ active, setActive }: Props) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    state.exercises.push({
      id: Date.now().toString(),
      name,
      category: category as Category,
    })

    setName('')
    setCategory('')
    setActive(false)
  }

  return (
    <Modal active={active} setActive={setActive}>
      <form onSubmit={handleSubmit}>
        <Modal.Header title="Add Workout" />

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
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
