import { Workout } from '../../types'

export default function Stats({ data }: { data: Workout[] }) {
  return (
    <ul className="divide-y-[1px] divide-black">
      <li className="flex items-center justify-between px-3 py-2">
        <span className="font-semibold mr-2">Average hit:</span>
        <span>
          {data.length
            ? data.map((w) => Math.max(...w.weight)).reduce((a, b) => a + b) /
              data.length
            : 0}
        </span>
      </li>
      <li className="flex items-center justify-between px-3 py-2">
        <span className="font-semibold mr-2">Min hit:</span>
        <span>{data.length ? Math.max(...data.map((w) => Math.max(...w.weight))) : 0}</span>
      </li>
      <li className="flex items-center justify-between px-3 py-2">
        <span className="font-semibold mr-2">Max hit:</span>
        <span>{data.length ? Math.min(...data.map((w) => Math.max(...w.weight))) : 0}</span>
      </li>
    </ul>
  )
}
