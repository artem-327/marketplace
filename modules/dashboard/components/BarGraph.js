import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'
import { FormattedMessage } from 'react-intl'
//styled
import styled from 'styled-components'

const DivGraph = styled.div`
  margin: 10px;
`

const GraphTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`
const GraphSubTitle = styled.div`
  font-size: 12px;
  font-style: italic;
  text-align: center;
  color: #848893;
  margin-bottom: 10px;
`

function CustomTooltip({ payload, label, active, unitsCurrency }) {
  if (active) {
    return (
      <div
        className='recharts-default-tooltip'
        style={{
          margin: '0px',
          padding: '10px',
          backgroundColor: 'rgb(255, 255, 255)',
          border: '1px solid rgb(204, 204, 204)',
          whiteSpace: 'nowrap'
        }}>
        <p className='recharts-tooltip-label' style={{ margin: '0px' }}>
          {label}
        </p>
        <ul className='recharts-tooltip-item-list' style={{ padding: '0px', margin: '0px' }}>
          <li
            className='recharts-tooltip-item'
            style={{ display: 'block', paddingTop: '4px', paddingBottom: '4px', color: 'rgb(37, 153, 213)' }}>
            <span className='recharts-tooltip-item-name'>{payload[0].name}</span>
            <span className='recharts-tooltip-item-separator'> : </span>
            <span className='recharts-tooltip-item-value'>{payload[0].value}</span>
            <span className='recharts-tooltip-item-unit'>
              {unitsCurrency === 0
                ? '$'
                : unitsCurrency === 1
                  ? 'k$'
                  : unitsCurrency === 2
                    ? 'M$'
                    : unitsCurrency === 3
                      ? 'B$'
                      : 'T$'}
            </span>
          </li>
        </ul>
      </div>
    )
  }
  return null
}

const formatYAxis = tickItem => {
  return `$${tickItem}`
}

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
