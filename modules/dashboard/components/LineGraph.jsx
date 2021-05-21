import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'
import { FormattedMessage } from 'react-intl'
// Styles
import { DivGraph, GraphTitle, GraphSubTitle } from '../styles'
// Services
import { CustomTooltip, formatYAxis } from '../services'

/**
 * @category Dashboard - LineGraph
 * @component
 */
const LineGraph = ({ data, dataKey, isCurrency, title, titleId, subTitle, subTitleId, unitsCurrency }) => {
  return (
    <DivGraph>
      <GraphTitle>
        <FormattedMessage id={titleId} defaultMessage={title} />
      </GraphTitle>
      {/*commented subtitle  */}
      {false && (
        <GraphSubTitle>
          <FormattedMessage id={subTitleId} defaultMessage={subTitle} />
        </GraphSubTitle>
      )}
      {data && data.length > 0 ? (
        <ResponsiveContainer width='100%' height='100%' minHeight={440}>
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Area legendType='none' dataKey='Transactions' />
            <XAxis tickLine={false} dataKey='name' axisLine={false} />
            <YAxis tickFormatter={formatYAxis} tickLine={false} axisLine={false} width={80} />
            <CartesianGrid vertical={false} strokeDasharray='2 10' />
            {isCurrency && unitsCurrency > 0 ? (
              <Tooltip content={<CustomTooltip unitsCurrency={unitsCurrency} />} />
            ) : (
              <Tooltip />
            )}
            <Legend />
            <Line
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              legendType='circle'
              type='linear'
              dataKey={dataKey ? dataKey : 'Transactions'}
              stroke='#2599d5'
              isAnimationActive={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </DivGraph>
  )
}

LineGraph.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
  title: PropTypes.string,
  titleId: PropTypes.string,
  subTitle: PropTypes.string,
  subTitleId: PropTypes.string,
  isCurrency: PropTypes.bool,
  unitsCurrency: PropTypes.number
}

LineGraph.defaultProps = {
  data: [],
  dataKey: null,
  title: '',
  titleId: '',
  subTitle: '',
  subTitleId: '',
  isCurrency: true,
  unitsCurrency: 0
}

export default LineGraph
