
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'
import { FormattedMessage } from 'react-intl'


import { } from './HorizontalBarGraph.styles'

const HorizontalBarGraph = props => {
  const { values } = props

  return (

    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={values}
        layout='vertical'

      >

        <XAxis type="number" hide={true} />
        <YAxis type="category" dataKey="value" hide={true} />

        <Bar
          dataKey='value'
          fill='#2599d5'
          isAnimationActive={false}
          barSize={10}
        />


      </BarChart>
    </ResponsiveContainer>

  )
}

export default HorizontalBarGraph