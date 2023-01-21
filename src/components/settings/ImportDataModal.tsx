import { useState } from 'react'
import { State, state } from '../../store'
import Modal from '../containers/Modal'
import { dateTimeReviver } from '../../helpers'

interface Props {
  active: boolean
  setActive: Function
}

export default function ImportDataModal({ active, setActive }: Props) {
  const [value, setValue] = useState('')

  function handleClick() {
    try {
      const data: State = JSON.parse(value, dateTimeReviver)
      try {
        state.selectedDate = data.selectedDate
        state.dark = data.dark
        state.workouts = data.workouts
        state.exercises = data.exercises
      } catch {
        localStorage.clear()
        alert('Malformed input found.')
      }
    } catch (e) {
      alert('Malformed input found.')
    }
  }

  return (
    <Modal active={active} setActive={setActive}>
      <Modal.Header title="Export data" />

      <main className="p-5 w-full">
        <p className="font-semibold text-yellow-500 mb-1 text-sm">
          <strong>Warning:</strong> once you import data, all the current
          collected data will be deleted.
        </p>
        <h3 className="mb-3">Data to import:</h3>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-[200px] overflow-auto p-3 bg-gray-300 rounded-xl w-full"
          placeholder="Paste your data here..."
        ></textarea>
      </main>

      <Modal.Footer className="flex items-center justify-between gap-5">
        <button
          className="px-10 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 flex-auto"
          onClick={() => [handleClick(), setActive(false)]}
        >
          Import
        </button>
        <button
          onClick={() => setActive(false)}
          className="px-10 py-2 rounded-md border border-gray-300 hover:bg-gray-100 flex-auto"
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  )
}
