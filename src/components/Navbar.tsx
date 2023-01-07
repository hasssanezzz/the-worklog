import { Link } from 'react-router-dom'
import { HiOutlineCog, HiOutlineTableCells } from 'react-icons/hi2'
import Conatiner from './containers/Container'

export default function Navbar() {
  return (
    <nav className="h-16 w-full">
      <Conatiner className="h-full w-full flex items-center justify-between px-5">
        <Link to="/" className=" text-2xl font-semibold">
          The Worklog 💪
        </Link>

        <div className="space-x-3 flex">
          <Link
            to="/exercises"
            className="bg-gray-200 p-1 rounded-md hover:bg-blue-500 hover:text-white trns"
          >
            <HiOutlineTableCells size={25} />
          </Link>
          <Link
            to="/settings"
            className="bg-gray-200 p-1 rounded-md hover:bg-blue-500 hover:text-white trns"
          >
            <HiOutlineCog size={25} />
          </Link>
        </div>
      </Conatiner>
    </nav>
  )
}