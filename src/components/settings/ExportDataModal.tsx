import { useSnapshot } from 'valtio'
import { state } from '../../store'
import Modal from '../containers/Modal'

interface Props {
  active: boolean
  setActive: Function
}

export default function ExportDataModal({ active, setActive }: Props) {
  const snap = useSnapshot(state)

  return (
    <Modal active={active} setActive={setActive}>
      <Modal.Header title="Export data" />

      <main className="p-5 w-full">
        <h3 className="mb-3">User data:</h3>
        <textarea
          readOnly
          value={JSON.stringify(snap, null, 2)}
          className="h-[200px] overflow-auto p-3 bg-gray-300 rounded-xl w-full"
        ></textarea>
      </main>

      <Modal.Footer className="flex items-center justify-between gap-5">
        <button
          className="px-10 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 flex-auto"
          onClick={() => [
            navigator.clipboard.writeText(JSON.stringify(snap, null, 2)),
            setActive(false),
          ]}
        >
          Copy
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
