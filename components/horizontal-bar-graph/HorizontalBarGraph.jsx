import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { DivTooltip, DivLabel } from './HorizontalBarGraph.styles'

const HorizontalBarGraph = props => {
  const { values, max } = props

  const data = values.map(val => {
    const value = val.value && !isNaN(parseInt(val.value)) ? parseInt(val.value) : 0
    const spaceWidth = value ? (value === max ? 0 : 1) : 0

    return {
      name: val.name,
      value: value,
      space: spaceWidth,
      end: spaceWidth ? max - value - 1 : max - value,
      tooltip: val.tooltip
        ? val.tooltip
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        : ''
    }
  })
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart
        data={data}
        layout='vertical'
        margin={{
          top: 5,
          right: 0,
          left: 40,
          bottom: 5
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
                  {`${props.payload[0].value}${props.payload[0].payload.tooltip ? ` (${props.payload[0].payload.tooltip})` : ''}`}
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

HorizontalBarGraph.propTypes = {
  values: PropTypes.array,
  max: PropTypes.number
}

HorizontalBarGraph.defaultProps = {
  values: [],
  max: 100
}

export default HorizontalBarGraph