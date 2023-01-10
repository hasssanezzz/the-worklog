import Chart from 'react-apexcharts'
import { useSnapshot } from 'valtio'
import { state } from '../../store'
import { Workout } from '../../types'

export default function Graph({ data }: { data: Workout[] }) {
  const { dark } = useSnapshot(state)
  return (
    <Chart
      options={{
        theme: { mode: dark ? 'dark' : 'light' },
        colors: ['#0080ffdd'],
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: data.map((w) => w.date.toLocaleDateString()),
        },
      }}
      series={[
        {
          name: 'Weight units',
          data: data.map((w) => Math.max(...w.weight)),
        },
      ]}
      type={'bar'}
      width={'100%'}
    />
  )
}
