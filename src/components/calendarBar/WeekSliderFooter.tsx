import { useState } from 'react'
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePlusCircle,
  HiOutlineCalendar,
} from 'react-icons/hi2'

import { datesOfweek } from '../../helpers'
import { state } from '../../store'
import AddWorkoutModal from './AddWorkoutModal'

export default function WeekSliderFooter() {
  const [isModalActive, setIsModalActive] = useState(false)
  let lastDate = new Date()

  function prevWeek() {
    state.week = datesOfweek(
      new Date(
        lastDate.getFullYear(),
        lastDate.getMonth(),
        lastDate.getDate() - 7
      )
    )

    lastDate = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate() - 7
    )
  }

  function nextWeek() {
    state.week = datesOfweek(
      new Date(
        lastDate.getFullYear(),
        lastDate.getMonth(),
        lastDate.getDate() + 7
      )
    )

    lastDate = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate() + 7
    )
  }

  function currWeek() {
    state.week = datesOfweek()
    lastDate = new Date()
  }

  return (
    <div className="w-full flex items-center justify-between">
      <button className="p-1 rounded-md hover:bg-gray-200" onClick={prevWeek}>
        <HiOutlineChevronLeft size={25} />
      </button>

      <button onClick={() => setIsModalActive(true)} className="rounded-md flex-auto mx-5 text-center bg-gray-900 hover:bg-gray-700 trns px-10 py-2 text-white text-sm flex items-center justify-center gap-1">
        <HiOutlinePlusCircle size={20} /> workout
      </button>

      <div className="flex items-center gap-3">
        <button className="p-1 rounded-md hover:bg-gray-200" onClick={currWeek}>
          <HiOutlineCalendar size={25} />
        </button>
        <button className="p-1 rounded-md hover:bg-gray-200" onClick={nextWeek}>
          <HiOutlineChevronRight size={25} />
        </button>
      </div>

      <AddWorkoutModal active={isModalActive} setActive={setIsModalActive} />
    </div>
  )
}
