import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
//components
import { currency } from '../../../constants/index'
import { getSafe } from '../../../utils/functions'
//styles
import {
  RectanglePieGraph,
  DivPieGraphHeader,
  DivPieGraphTitle,
  DivPieGraphCircle,
  DivPieGraphLegend,
  DivRowLegend,
  DivTextLegend,
  DivNumberLegend,
  DivValueLegend,
  DivOval,
  DivOvalLegend,
  DivAfterNumberLegend,
  DivTitle
} from '../styles'

const COLORS = ['#2599d5', '#ffc65d', '#4cc3da', '#96d3b7', '#f16844']

const PieGraph = ({ innerRadius, isCurrency, valueLegend, data, title, titleId }) => {

  const slicedData = data.slice(0, 5)

  return (
    <RectanglePieGraph>
      <DivPieGraphHeader>
        <DivPieGraphTitle>
          <FormattedMessage id={titleId} defaultMessage={title} />
        </DivPieGraphTitle>
      </DivPieGraphHeader>
      <DivPieGraphCircle>
        {slicedData && slicedData.length > 0 ? (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                innerRadius={innerRadius}
                data={slicedData}
                dataKey='value'
                labelLine={false}
                outerRadius='83%'
                fill='#8884d8'>
                {slicedData &&
                  slicedData.length &&
                  slicedData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : null}
      </DivPieGraphCircle>
      <DivPieGraphLegend>
        {slicedData && slicedData.length
          ? slicedData.map((atr, index) => (
              <DivRowLegend key={index}>
                <DivOvalLegend>
                  <DivOval style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                </DivOvalLegend>

                <DivTextLegend>
                  <DivTitle>{atr.name}</DivTitle>
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
  innerRadius: '35%'
}

export default PieGraph
