import React from 'react'
import PropTypes from 'prop-types'
import AnimatedNumber from 'animated-number-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Button } from 'semantic-ui-react'
//styled
import styled from 'styled-components'
//components
import { getSafe } from '~/utils/functions'

const RectangleSummary = styled.div`
  width: 100%;
  height: 103px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin-bottom: 16px;
`

const RectangleSummaryHeader = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
`

const DivIcon = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border: solid 5px #c5ebff;
  background-color: #2599d5;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: relative;
  text-align: center; */
`

const DivSummary = styled.div`
  width: 200px;
  height: 100px;
  background-color: #ffffff;
`

const DivNumbers = styled.div`
  opacity: 0.89;
  font-size: 32px;
  font-weight: bold;
  line-height: 1.25;
  color: #242424;
  padding-top: 25px;
`

const DivTotalText = styled.div`
  font-size: 14px;
  line-height: 1.43;
  color: #848893;
`

const RectangleSummaryBottom = styled.div`
  width: 100%;
  height: 50px;
  border-top: solid 1px #dee2e6;
  background-color: #f8f9fb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`

const DivTotalTextBottom = styled.div`
  font-size: 12px;
  line-height: 1.67;
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

const SummaryRectangle = ({
  icon,
  data,
  titleId,
  title,
  textAverageId,
  textAverage,
  average,
  styleCircle,
  isLastSummary
}) => {
  const formatValue = value => <FormattedNumber minimumFractionDigits={0} value={getSafe(() => value, 0)} />

  return (
    <RectangleSummary style={{ marginBottom: isLastSummary ? '0px' : '16px' }}>
      <RectangleSummaryHeader>
        <DivIcon>
          <Circle style={styleCircle}>{icon}</Circle>
        </DivIcon>
        <DivSummary>
          <DivNumbers>
            <AnimatedNumber value={data} formatValue={formatValue} />
          </DivNumbers>
          <DivTotalText>
            <FormattedMessage id={titleId} defaultMessage={title} />
          </DivTotalText>
        </DivSummary>
      </RectangleSummaryHeader>
      {/* div for average data or show detail*/}
      {false && (
        <RectangleSummaryBottom>
          <DivTotalTextBottom>
            <b>{average}</b>
            <FormattedMessage id={textAverageId} defaultMessage={textAverage} />
          </DivTotalTextBottom>
          <ButtonViewAll type='button'>
            <FormattedMessage id='dashboard.viewAll' defaultMessage='View all' />
          </ButtonViewAll>
        </RectangleSummaryBottom>
      )}
      {/* div for average data or show detail*/}
    </RectangleSummary>
  )
}

SummaryRectangle.propTypes = {
  icon: PropTypes.element,
  data: PropTypes.array,
  titleId: PropTypes.string,
  title: PropTypes.string,
  textAverageId: PropTypes.string,
  textAverage: PropTypes.string,
  average: PropTypes.number,
  styleCircle: PropTypes.object,
  isLastSummary: PropTypes.bool
}

SummaryRectangle.defaultProps = {
  icon: <></>,
  data: [],
  title: 'Total',
  titelId: 'dashboard.total',
  textAverage: ' average',
  textAverageId: 'dashboard.avg',
  average: 0,
  styleCircle: { border: 'solid 5px #c5ebff', backgroundColor: '#2599d5' },
  isLastSummary: false
}

export default SummaryRectangle