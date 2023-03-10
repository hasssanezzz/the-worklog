import { useState } from 'react'
import { useSnapshot } from 'valtio'
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineArrowDownOnSquareStack,
  HiOutlineEye,
  HiOutlineCheckBadge,
} from 'react-icons/hi2'
import Checkbox from '../Checkbox'
import { state } from '../../store'
import ExportDataModal from './ExportDataModal'

export default function SettingsList() {
  const { dark } = useSnapshot(state)
  const [isExportDataModalActive, setIsExportDataModalActive] = useState(false)

  return (
    <div className="space-y-8">
      <main>
        <p className="font-bold mb-3">App data</p>
        <div className="border-t border-b dark:border-gray-700 dark:divide-gray-700 divide-y-[1px]">
          <button className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-50 dark:hover:bg-gray-800 trns">
            <span>
              <HiOutlineArrowDownOnSquareStack size={25} />
            </span>
            <span>Import data</span>
          </button>
          <button
            onClick={() => setIsExportDataModalActive(true)}
            className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-50 dark:hover:bg-gray-800 trns"
          >
            <span>
              <HiOutlineArrowTopRightOnSquare size={22} />
            </span>
            <span>Export data</span>
          </button>
        </div>
      </main>

      <ExportDataModal
        active={isExportDataModalActive}
        setActive={setIsExportDataModalActive}
      />

      <main>
        <p className="font-bold mb-3">Appearance</p>
        <div className="border-t border-b dark:border-gray-700 dark:divide-gray-700 divide-y-[1px]">
          <div className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-50 dark:hover:bg-gray-800 trns justify-between">
            <div className="flex items-center gap-3">
              <span>
                <HiOutlineEye size={25} />
              </span>
              <span>Dark theme</span>
            </div>

            <Checkbox
              checked={dark}
              setChecked={() => (state.dark = !state.dark)}
            />
          </div>
        </div>
      </main>

      <main>
        <p className="font-bold mb-3">Version</p>
        <div className="border-t border-b dark:border-gray-700 dark:divide-gray-700 divide-y-[1px]">
          <div className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-50 dark:hover:bg-gray-800 trns">
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
