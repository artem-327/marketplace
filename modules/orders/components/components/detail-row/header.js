import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
import { GridRow, GridColumn, List } from 'semantic-ui-react'

import { getSafe } from '~/utils/functions'

import { StyledGrid, TableSegment, StyledList, DetailMessage, HeaderColumn } from './styles'

function Header({ row }) {
  console.log('row====================================')
  console.log(row)
  console.log('====================================')
  return (
    <DetailMessage>
      <StyledGrid>
        <GridRow>
          <HeaderColumn width={16}>
            <TableSegment>
              <StyledList divided relaxed horizontal size='large'>
                <List.Item>
                  <List.Content>
                    <List.Header as='label'>
                      <FormattedMessage id='orders.orderStatus' defaultMessage='Order Status' />
                    </List.Header>
                    <List.Description as='span'>{getSafe(() => row.orderStatus, '')}</List.Description>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Content>
                    <List.Header as='label'>
                      <FormattedMessage id='orders.deliveryStatus' defaultMessage='Delivery Status' />
                    </List.Header>
                    <List.Description as='span'>{getSafe(() => row.shippingStatus, '')}</List.Description>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Content>
                    <List.Header as='label'>
                      <FormattedMessage id='orders.reviewStatus' defaultMessage='Review Status' />
                    </List.Header>
                    <List.Description as='span'>{getSafe(() => row.reviewStatus, '')}</List.Description>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Content>
                    <List.Header as='label'>
                      <FormattedMessage id='orders.creditStatus' defaultMessage='Credit Status' />
                    </List.Header>
                    <List.Description as='span'>{getSafe(() => row.creditStatus, '')}</List.Description>
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Content>
                    <List.Header as='label'>
                      <FormattedMessage id='orders.paymentStatus' defaultMessage='Payment Status' />
                    </List.Header>
                    <List.Description as='span'>{getSafe(() => row.paymentStatus, '')}</List.Description>
                  </List.Content>
                </List.Item>
              </StyledList>
            </TableSegment>
          </HeaderColumn>
        </GridRow>
      </StyledGrid>
    </DetailMessage>
  )
}

Header.propTypes = {
  row: PropTypes.object
}

Header.defaultProps = {
  row: {}
}

export default injectIntl(Header)
