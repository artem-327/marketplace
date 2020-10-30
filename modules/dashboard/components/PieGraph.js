import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Button } from 'semantic-ui-react'
//components
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
//style
import styled from 'styled-components'

const COLORS = ['#2599d5', '#f16844', '#4cc3da', '#ffc65d']

const RectanglePieGraph = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
`

const DivPieGraphHeader = styled.div`
  width: 100%;
  height: 55px;
  border-bottom: solid 1px #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`

const DivPieGraphTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #848893;
`

const ButtonViewAll = styled(Button)`
  width: 80px;
  height: 32px;
  border-radius: 3px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  line-height: 1.54 !important;
  text-align: center !important;
  color: #848893 !important;
  padding: 0 !important;
`

const DivPieGraphCircle = styled.div`
  height: 60%;
  width: 100%;
`

const DivPieGraphLegend = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 2.14;
  color: #848893;
  padding: 0 20px;
`

const DivRowLegend = styled.div`
  display: flex;
`

const DivTextLegend = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DivNumberLegend = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 2.14;
  color: #242424;
`

const DivValueLegend = styled.div`
  display: flex;
`

const DivOval = styled.div`
  margin-right: 10px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #2599d5;
  color: #fff;
`

const DivOvalLegend = styled.div`
  display: flex;
  align-items: center;
`

const DivAfterNumberLegend = styled.div`
  margin-left: 5px;
  font-size: 14px;
  line-height: 2.14;
  color: #848893;
`

const DivTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    overflow: visible;
  }
`

const PieGraph = ({ innerRadius, isCurrency, valueLegend, data, title, titleId }) => {
  return (
    <RectanglePieGraph>
      <DivPieGraphHeader>
        <DivPieGraphTitle>
          <FormattedMessage id={titleId} defaultMessage={title} />
        </DivPieGraphTitle>
      </DivPieGraphHeader>
      <DivPieGraphCircle style={{ height: '40%', width: '100%' }}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                innerRadius={innerRadius}
                data={data}
                dataKey='value'
                labelLine={false}
                outerRadius='75%'
                fill='#8884d8'>
                {data &&
                  data.length &&
                  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : null}
      </DivPieGraphCircle>
      <DivPieGraphLegend>
        {data && data.length
          ? data.map((atr, index) => (
              <DivRowLegend key={index}>
                <DivOvalLegend>
                  <DivOval style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                </DivOvalLegend>

                <DivTextLegend>
                  <DivTitle>{atr.name.toUpperCase()}</DivTitle>
                  <DivValueLegend>
                    <DivNumberLegend>
                      {isCurrency ? (
                        <>
                          <FormattedNumber
                            style='currency'
                            currency={currency}
                            minimumFractionDigits={2}
                            maximumFractionDigits={2}
                            value={getSafe(() => atr.value, 0)}
                          />
                        </>
                      ) : (
                        <>
                          <FormattedNumber minimumFractionDigits={0} value={getSafe(() => atr.value, 0)} />{' '}
                        </>
                      )}
                    </DivNumberLegend>
                    {valueLegend && <DivAfterNumberLegend>{valueLegend}</DivAfterNumberLegend>}
                  </DivValueLegend>
                </DivTextLegend>
              </DivRowLegend>
            ))
          : null}
      </DivPieGraphLegend>
    </RectanglePieGraph>
  )
}

PieGraph.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  titelId: PropTypes.string,
  valueLegend: PropTypes.string,
  isCurrency: PropTypes.bool,
  innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

PieGraph.defaultProps = {
  data: [],
  title: '',
  titelId: '',
  valueLegend: '',
  isCurrency: false,
  innerRadius: 0
}

export default PieGraph
