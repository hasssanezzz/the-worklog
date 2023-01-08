import Chart from 'react-apexcharts'
import { Workout } from '../../types'

export default function Graph({ data }: { data: Workout[] }) {
  return (
    <Chart
      options={{
        theme: {},
        colors: ['#000'],
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
