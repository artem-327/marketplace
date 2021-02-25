import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment, Button } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'

//Components
//Styles
import { ColumnDetail } from '../../../../components/detail-row/styles'
import {
  SegmentGroupHeader,
  SegmentCustom,
  DivTransactions,
  DivCollectionStat,
  DivAvarageValue,
  DivValue,
  DivPadding,
  GridColumnDetail
} from './DetailRow.style'
//Constants
import { currency } from '../../../../constants'

const Header = props => {
  return (
    <Grid.Row>
      <GridColumnDetail>
        <SegmentGroupHeader horizontal>
          <SegmentCustom textAlign='left'>{props.logo}</SegmentCustom>
          <SegmentCustom textAlign='center'>
            <DivCollectionStat>
              <DivTransactions>
                <DivPadding>
                  <FormattedMessage id='myNetworks.detailRow.transactions' defaultMessage='Transactions' />
                  <DivValue>{props.transactions}</DivValue>
                </DivPadding>
              </DivTransactions>
              <DivAvarageValue>
                <DivPadding>
                  <FormattedMessage id='myNetworks.detailRow.averageValue' defaultMessage='Average Value' />
                  <DivValue>
                    <FormattedNumber
                      minimumFractionDigits={0}
                      maximumFractionDigits={0}
                      style='currency'
                      value={props.averageValue}
                      currency={currency}
                    />
                  </DivValue>
                </DivPadding>
              </DivAvarageValue>
            </DivCollectionStat>
          </SegmentCustom>
          <SegmentCustom textAlign='right'>
            <Button>{props.button.text}</Button>
          </SegmentCustom>
        </SegmentGroupHeader>
      </GridColumnDetail>
    </Grid.Row>
  )
}

Header.propTypes = {
  logo: PropTypes.string,
  transactions: PropTypes.number,
  averageValue: PropTypes.number,
  button: PropTypes.shape({
    text: PropTypes.string
  })
}

Header.defaultProps = {
  logo: '',
  transactions: 0,
  averageValue: 0,
  button: {
    text: 'Disconect'
  }
}

export default Header
