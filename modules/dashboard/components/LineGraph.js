import React from 'react'
import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'
import { FormattedMessage } from 'react-intl'
//styled
import styled from 'styled-components'

const DivGraph = styled.div`
  margin: 20px;
`

const GraphTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`
const GraphSubTitle = styled.div`
  font-size: 12px;
  font-style: italic;
  text-align: center;
  color: #848893;
  margin-bottom: 10px;
`
const LineGraph = ({ data, title, titleId, valuesInTitle, subTitle, subTitleId }) => {
  return (
    <DivGraph>
      <GraphTitle>
        <FormattedMessage id={titleId} defaultMessage={title} values={valuesInTitle} />
      </GraphTitle>
      <GraphSubTitle>
        <FormattedMessage id={subTitleId} defaultMessage={subTitle} />
      </GraphSubTitle>
      <ResponsiveContainer width='100%' height='100%' minHeight={440}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <Area legendType='none' />
          <XAxis tickLine={false} dataKey='name' axisLine={false} />
          <YAxis unit='$' tickLine={false} axisLine={false} />
          <CartesianGrid vertical={false} strokeDasharray='2 10' />
          <Tooltip />
          <Legend />
          <Line
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
            legendType='circle'
            type='linear'
            dataKey='Transactions'
            stroke='#2599d5'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </DivGraph>
  )
}

LineGraph.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  titleId: PropTypes.string,
  valuesInTitle: PropTypes.string,
  subTitle: PropTypes.string,
  subTitleId: PropTypes.string
}

LineGraph.defaultProps = {
  data: [],
  title: '',
  titleId: '',
  valuesInTitle: '',
  subTitle: '',
  subTitleId: ''
}

export default LineGraph
