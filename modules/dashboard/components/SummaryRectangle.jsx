import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import Router from 'next/router'
// Services
import { getSafe } from '../../../utils/functions'
// Styles
import {
  RectangleSummary,
  RectangleSummaryHeader,
  DivIcon,
  Circle,
  DivSummary,
  DivNumbers,
  DivTotalText,
  RectangleSummaryBottom,
  DivTotalTextBottom,
  ButtonViewAll
} from '../styles'


/**
 * @category Dashboard - SummaryRectangle
 * @component
 */
const SummaryRectangle = ({
  icon,
  data,
  titleId,
  title,
  textAverageId,
  textAverage,
  average,
  styleCircle,
  isLastSummary,
  onClickUrl,
  style,
  currency
}) => {
  return (
    <RectangleSummary
      style={{
        ...(onClickUrl && { cursor: 'pointer' })
      }}
      onClick={onClickUrl ? () => Router.push(onClickUrl) : undefined}>
      <RectangleSummaryHeader>
        <DivIcon>
          <Circle
            style={
              styleCircle
                ? styleCircle
                : {
                    width: '82px',
                    height: '82px',
                    margin: '0 -6px -12px',
                    borderRadius: '0',
                    border: '0 none',
                    backgroundColor: 'transparent'
                  }
            }>
            {icon}
          </Circle>
        </DivIcon>
        <DivSummary>
          <DivNumbers>
            <FormattedNumber
              minimumFractionDigits={0}
              value={getSafe(() => data, 0)}
              {...(style && { style: style })}
              {...(currency && { currency: currency })}
            />
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
  data: PropTypes.number,
  titleId: PropTypes.string,
  title: PropTypes.string,
  textAverageId: PropTypes.string,
  textAverage: PropTypes.string,
  average: PropTypes.number,
  styleCircle: PropTypes.object,
  isLastSummary: PropTypes.bool,
  onClickUrl: PropTypes.string,
  style: PropTypes.string,
  currency: PropTypes.string
}

SummaryRectangle.defaultProps = {
  icon: <></>,
  data: 0,
  title: 'Total',
  titelId: 'dashboard.total',
  textAverage: ' average',
  textAverageId: 'dashboard.avg',
  average: 0,
  styleCircle: { border: 'solid 5px #c5ebff', backgroundColor: '#2599d5' },
  isLastSummary: false,
  onClickUrl: ''
}

export default SummaryRectangle
