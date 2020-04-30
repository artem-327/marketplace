import React, { Component } from 'react'

import { GridRow, GridColumn } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
  VerticalUnpaddedColumn,
  BottomUnpaddedRow,
  ItemDescriptionGrid,
  TopUnpaddedColumn
} from '~/modules/cart/components/StyledComponents'

const CompanyHeader = styled.b`
  color: #000000;
`


export default class ShippingAddress extends Component {
  render() {
    let { billingInfo, companyName, additionalContent, header } = this.props
    if (!billingInfo) return null

    return (
      <ItemDescriptionGrid>
        <GridRow>
          <GridColumn>
            {header}
          </GridColumn>
        </GridRow>

        <BottomUnpaddedRow>
          <VerticalUnpaddedColumn>
            <CompanyHeader>{companyName}</CompanyHeader>
          </VerticalUnpaddedColumn>
        </BottomUnpaddedRow>

        <BottomUnpaddedRow>
          <VerticalUnpaddedColumn>
            {billingInfo.address.streetAddress}
          </VerticalUnpaddedColumn>
        </BottomUnpaddedRow>

        <BottomUnpaddedRow>
          <TopUnpaddedColumn>
            {billingInfo.address && billingInfo.address.city}
            {billingInfo.address &&
              billingInfo.address.province &&
              `, ${billingInfo.address.province.name}`}
      , {billingInfo.address && billingInfo.address.zip.zip}
          </TopUnpaddedColumn>
        </BottomUnpaddedRow>

        {additionalContent}
      </ItemDescriptionGrid>
    )
  }
}

ShippingAddress.defaultProps = {
  additionalContent: null,
  header: <FormattedMessage id='cart.billingInfo' defaultMessage='Billing Info' />
}