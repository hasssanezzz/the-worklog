import WeekSlider from './WeekSlider'
import WeekSliderFooter from './WeekSliderFooter'

export default function CalendarBar() {
  return (
    <div className="relative my-5">
      <WeekSlider />
      <WeekSliderFooter />
    </div>
  )
}
