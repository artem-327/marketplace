import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import * as Actions from '../../actions'
import styled from 'styled-components'
import { ArrowRight } from 'react-feather'
import { openPopup as openPopupOperations } from '~/modules/operations/actions'
import Router from 'next/router'

import {
  DetailMessage,
  StyledGrid
} from '../layout'

import {
  GridRow,
  GridColumn,
  Button
} from 'semantic-ui-react'

const StyledQuoteDiv = styled.div`
  padding: 9px 15px; 
  color: #20273a;
  font-size: 14px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
`

class ShippingQuoteInfo extends Component {

  render() {
    const { row } = this.props

    return (
      <DetailMessage>
        <StyledGrid>
          <GridRow>
            <GridColumn width={16} >
              {row.text}
            </GridColumn>
          </GridRow>

          <GridRow style={{ marginTop: '10px' }}>
            <GridColumn width={16}>
              <FormattedMessage id='alerts.shippingQuoteId' defaultMessage='Shipping Quote ID' />
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn width={16}>
              <StyledQuoteDiv>
                {row.info.shippingQuoteId}
              </StyledQuoteDiv>
            </GridColumn>
          </GridRow>

          <GridRow style={{ marginTop: '10px' }}>
            <GridColumn width={16}>
              <Button
                style={{ margin: '0'}}
                onClick={() => {
                  Router.push(`/purchase-order?shippingQuoteId=${row.info.shippingQuoteId}`)
                }}
              >
                <FormattedMessage id='alerts.checkout' defaultMessage='Checkout'>
                  {text => text}
                </FormattedMessage>
                <ArrowRight size='18'style={{ marginLeft: '12px' }}/>
              </Button>
            </GridColumn>
          </GridRow>
        </StyledGrid>
      </DetailMessage>
    )
  }
}


const mapStateToProps = state => {
  return {

  }
}

export default connect(
  mapStateToProps,
  { ...Actions, openPopupOperations }
)(injectIntl(withToastManager(ShippingQuoteInfo)))