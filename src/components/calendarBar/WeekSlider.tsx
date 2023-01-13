import { useSnapshot } from 'valtio'
import { state } from '../../store'
import DayBox from './DayBox'

export default function WeekSlider() {
  const { week } = useSnapshot(state)

  return (
    <div className="mb-[2rem]">
      <h4 className='font-semibold mb-2 text-sm'>
        {week[0].getMonth() + 1}/{week[0].getFullYear()}
      </h4>
      <div className="flex gap-3 ">
        {week.map((date) => (
          <DayBox key={date.getDate()} date={date} />
        ))}
      </div>
    </div>
  )
}
