/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from "~/utils/functions"
import { currency } from '~/constants/index'

//Components
import { GridColumn, Icon, Button } from 'semantic-ui-react'

import {
  GridStyled, DivLine, ColumnWithLine, RowWithLine, RowWithRectangle, CustomMessage, ButtonCustom

} from './FreightLabel.styles'

// Constants
import { FREIGHT_TYPES } from '../Checkout.constants'

const FreightLabel = props => {
  const {
    isOwn,
    onChange
  } = props

  return (
    <GridStyled>
      <RowWithLine>
        <ColumnWithLine width={7}>
          <DivLine />
        </ColumnWithLine>
        <GridColumn textAlign='center' width={2}>
          <FormattedMessage id='cart.or' defaultMessage='OR' />
        </GridColumn>
        <ColumnWithLine width={7}>
          <DivLine />
        </ColumnWithLine>
      </RowWithLine>
      <RowWithRectangle>
        {isOwn ? (
          <GridColumn>
            <CustomMessage>
              <Icon size='large' name='check circle outline' />
              <FormattedMessage id='cart.usingOwnFreight' defaultMessage='You are using your own freight' />
              <Button type='button' basic onClick={() => onChange(null)}>
                <FormattedMessage id='global.cancel' defaultMessage='!Cancel'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </CustomMessage>
          </GridColumn>
        ) : (
          <GridColumn textAlign='center'>
            <ButtonCustom
              basic
              onClick={() =>
                onChange({
                  freightType: FREIGHT_TYPES.OWN,
                  carrierName:
                    <FormattedMessage id='cart.usingOwnFreight' defaultMessage='You are using your own freight' />,
                  cfEstimatedSubtotal: '',
                  estimatedDeliveryDate: '',
                  quoteId: ''
                })}
            >
              <Icon name='archive' />
              <FormattedMessage id='cart.ownFreight' defaultMessage='Own Freight'>
                {text => text}
              </FormattedMessage>
            </ButtonCustom>
          </GridColumn>
        )}
      </RowWithRectangle>
    </GridStyled>
  )
}

FreightLabel.propTypes = {

}

FreightLabel.defaultProps = {

}

function mapStateToProps(store, props) {
  return {

  }
}

export default injectIntl(connect(mapStateToProps, {  })(FreightLabel))