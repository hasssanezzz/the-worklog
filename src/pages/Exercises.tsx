import { useState } from 'react'
import { HiOutlinePlusCircle } from 'react-icons/hi2'
import Conatiner from '../components/containers/Container'
import AddExerciseModal from '../components/exercises/AddExerciseModal'
import ExerciseList from '../components/exercises/ExerciseList'

export default function Exercises() {
  const [isModalActive, setIsModalActive] = useState(false)

  return (
    <Conatiner className="pb-10">
      <h2 className="text-4xl font-bold my-5">Exercises</h2>

      <button
        onClick={() => setIsModalActive(true)}
        className="rounded-md w-full text-center bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-700 trns px-10 py-2 text-white text-sm flex items-center justify-center gap-1 mb-5"
      >
        <HiOutlinePlusCircle size={20} /> Add exercise
      </button>

      <AddExerciseModal active={isModalActive} setActive={setIsModalActive} />

      <ExerciseList />
    </Conatiner>
  )
}
