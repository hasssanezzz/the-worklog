import { useSnapshot } from 'valtio'
import { state } from '../../store'
import DayBox from './DayBox'

export default function WeekSlider() {
  const { week } = useSnapshot(state)

  return (
    <div className="flex gap-3 mb-[2rem]">
      {week.map((date) => (
        <DayBox key={date.getDate()} date={date} />
      ))}
    </div>
  )
}
