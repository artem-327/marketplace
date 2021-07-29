import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { FormattedMessage } from 'react-intl'
import { DivTooltip, DivLabel } from './HorizontalBarGraph.styles'

const HorizontalBarGraph = props => {
  const { values, max } = props

  const data = values.map(val => ({
    name: val.name,
    value: val.value,
    space: 1,
    end: (max - val.value) > 0 ? max - val.value - 1 : max - val.value,
    tooltip: val.tooltip
  }))
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={data}
        layout='vertical'
        margin={{
          top: 5,
          right: 0,
          left: 40,
          bottom: 5,
        }}
      >
        <XAxis type="number" hide={true} domain={[0, max]} />
        <YAxis
          type="category"
          dataKey="name"
          hide={false}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
        <Tooltip
          content={props => {
            if (props.active && props.payload && props.payload.length) {
              return (
                <DivTooltip>
                  <DivLabel>{`${props.label}`}</DivLabel>
                  <p>{`${props.payload[0].value} (${props.payload[0].payload.tooltip})`}</p>
                </DivTooltip>
              )
            } else return null
          }}
        />
        <Bar
          dataKey='value'
          fill='#00C6F8'
          isAnimationActive={false}
          barSize={10}
          stackId='a'
        />
        <Bar
          dataKey='space'
          fill='transparent'
          isAnimationActive={false}
          barSize={10}
          stackId='a'
        />
        <Bar
          dataKey='end'
          fill='#d4d6e2'
          isAnimationActive={false}
          barSize={10}
          stackId='a'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default HorizontalBarGraph