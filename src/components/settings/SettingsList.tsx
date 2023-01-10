import { useSnapshot } from 'valtio'
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowDownOnSquareStack,
  HiOutlineEye,
  HiOutlineCheckBadge,
} from 'react-icons/hi2'
import Checkbox from '../Checkbox'
import { state } from '../../store'

export default function SettingsList() {
  const { dark } = useSnapshot(state)

  return (
    <div className="space-y-8">
      <main>
        <p className="font-bold mb-3">App data</p>
        <div className="border-t border-b divide-y-[1px]">
          <button className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-50 trns">
            <span>
              <HiOutlineArrowDownOnSquareStack size={25} />
            </span>
            <span>Import data</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-50 trns">
            <span>
              <HiOutlineArrowTopRightOnSquare size={22} />
            </span>
            <span>Export data</span>
          </button>
        </div>
      </main>

      <main>
        <p className="font-bold mb-3">Appearance</p>
        <div className="border-t border-b divide-y-[1px]">
          <div className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-50 trns justify-between">
            <div className="flex items-center gap-3">
              <span>
                <HiOutlineEye size={25} />
              </span>
              <span>Dark theme</span>
            </div>

            <Checkbox checked={dark} setChecked={() => state.dark = !state.dark} />
          </div>
        </div>
      </main>

      <main>
        <p className="font-bold mb-3">Version</p>
        <div className="border-t border-b divide-y-[1px]">
          <div className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-50 trns">
            <span>
              <HiOutlineCheckBadge size={25} />
            </span>
            <span>V0.1</span>
          </div>
        </div>
      </main>
    </div>
  )
}
