import CalendarBar from '../components/calendarBar/CalendarBar'
import Conatiner from '../components/containers/Container'
import DayView from '../components/DayView/DayView'

export default function Home() {
  return (
    <Conatiner className='pb-10'>
      <CalendarBar />
      <DayView />
    </Conatiner>
  )
}
