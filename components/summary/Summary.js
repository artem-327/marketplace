import { Component } from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { string, array, func, number, node } from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { RelaxedRow, HeaderTextRow } from './styledComponents'
import { currency } from '~/constants/index'

import {
  CapitalizedText,
  CartColumn,
  SummaryColumn,
  ContentSegment,
  VerticalUnpaddedColumn,
  StyledRow,
  TopUnpaddedRow,
  BottomUnpaddedRow,
  ItemDescriptionGrid,
  Item,
  DescriptionValue,
  TotalRow,
  SummaryGrid,
  BottomUnpaddedColumn,
  TotalPriceRow
} from '~/modules/cart/components/StyledComponents'

export default class Summary extends Component {
  render() {
    let { header, cart, totalPrice, additionalContent } = this.props
    let { cartItems } = cart

    if (cartItems.length === 0) return null

    let shipping = cart?.selectedShipping?.quote?.cfEstimatedSubtotal || 0

    return (
      <>
        <Segment>
          <SummaryGrid verticalAlign='middle'>
            <StyledRow bottomShadow>
              <VerticalUnpaddedColumn>
                <Header as='h2'>{header}</Header>
              </VerticalUnpaddedColumn>
            </StyledRow>

            <RelaxedRow columns={2}>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='cart.subtotal' defaultMessage='Subtotal' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn black>
                <FormattedNumber
                  minimumFractionDigits={2}
                  maximumFractionDigits={2}
                  style='currency'
                  currency={currency}
                  value={totalPrice}
                />
              </VerticalUnpaddedColumn>
            </RelaxedRow>

            {
              <RelaxedRow columns={2}>
                <VerticalUnpaddedColumn>
                  <FormattedMessage id='cart.freightCost' defaultMessage='Freight Cost' />
                </VerticalUnpaddedColumn>

                <VerticalUnpaddedColumn black>
                  <FormattedNumber
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                    style='currency'
                    currency={currency}
                    value={shipping}
                  />
                </VerticalUnpaddedColumn>
              </RelaxedRow>
            }

            <RelaxedRow columns={2}>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='cart.estimatedTax' defaultMessage='Estimated Tax' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn black>
                <FormattedNumber
                  minimumFractionDigits={2}
                  maximumFractionDigits={2}
                  style='currency'
                  currency={currency}
                  value={0}
                />
              </VerticalUnpaddedColumn>
            </RelaxedRow>

            {/*
              <RelaxedRow columns={2}>
                <VerticalUnpaddedColumn>
                  <FormattedMessage
                    id='global.pricePer'
                    values={{ unit: cartItems[0].productOffer.companyProduct.packagingUnit.nameAbbreviation }}
                  />
                </VerticalUnpaddedColumn>

                <VerticalUnpaddedColumn>
                  <FormattedNumber
                    style='currency'
                    currency={currency}
                    value={cart.cfPricePerUomTotal}
                  />

                </VerticalUnpaddedColumn>
              </RelaxedRow>
              */}

            <TotalPriceRow columns={2}>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='cart.total' defaultMessage='Total' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn>
                <FormattedNumber
                  minimumFractionDigits={2}
                  maximumFractionDigits={2}
                  style='currency'
                  currency={currency}
                  value={totalPrice + (shipping !== 'N/A' ? shipping : 0)}
                />
              </VerticalUnpaddedColumn>
            </TotalPriceRow>
          </SummaryGrid>
        </Segment>
        {additionalContent}
      </>
    )
  }
}

Summary.propTypes = {
  header: string,
  cartItems: array,
  handleContinue: func,
  totalPrice: number,
  additionalContent: node
}

Summary.defaultProps = {
  header: 'SUMMARY',
  cartItems: [],
  additionalContent: null
}
