import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'
import { FormattedMessage } from 'react-intl'
// Styles
import { DivGraph, GraphTitle, GraphSubTitle } from '../styles'
// Services
import { CustomTooltip, formatYAxis } from '../services'

/**
 * @category Dashboard - BarGraph
 * @component
 */
const BarGraph = ({ data, dataKey, isCurrency, title, titleId, subTitle, subTitleId, unitsCurrency }) => {
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
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <Area legendType='none' dataKey='Transactions' />
            <XAxis tickLine={false} dataKey='name' axisLine={false} />
            <YAxis tickFormatter={formatYAxis} tickLine={false} axisLine={false} width={80} />
            <CartesianGrid vertical={false} strokeDasharray='2 10' />
            {isCurrency && unitsCurrency > 0 ? (
              <Tooltip content={<CustomTooltip unitsCurrency={unitsCurrency} />} cursor={false} />
            ) : (
              <Tooltip cursor={false} />
            )}
            <Legend />
            <Bar
              legendType='circle'
              dataKey={dataKey ? dataKey : 'Transactions'}
              fill='#2599d5'
              isAnimationActive={false}
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </DivGraph>
  )
}

BarGraph.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
  title: PropTypes.string,
  titleId: PropTypes.string,
  subTitle: PropTypes.string,
  subTitleId: PropTypes.string,
  isCurrency: PropTypes.bool,
  unitsCurrency: PropTypes.number
}

BarGraph.defaultProps = {
  data: [],
  dataKey: null,
  title: '',
  titleId: '',
  subTitle: '',
  subTitleId: '',
  isCurrency: true,
  unitsCurrency: 0
}

export default BarGraph
