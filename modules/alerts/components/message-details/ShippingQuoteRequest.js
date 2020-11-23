import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import * as Actions from '../../actions'
import styled from 'styled-components'
import { ArrowRight } from 'react-feather'

import {
  DetailMessage,
  StyledGrid
} from '../layout'

import {
  Grid,
  GridRow,
  GridColumn,
  Segment,
  List,
  Input,
  Button
} from 'semantic-ui-react'

const TableSegment = styled(Segment)`
  margin: 0;

  &.ui.segment {
    padding: 10px 15px;
  }
`

const StyledList = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: space-between;

    > .item {
      flex-grow: 1;
      max-width: 150px;
      padding: 2px 15px !important;

      .header {
        margin: 0;
        padding: 0 0 3px;
        font-size: 12px;
        font-weight: 400;
        color: #848893;
        line-height: 1.1666667;
      }

      .description {
        font-size: 14px;
        color: #20273a;
        line-height: 1.2142857;
      }
    }
  }
`

const AddressRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 10px; 
  
  .addresses {
    display: flex;
    flex-direction: row;
  }
  
  .right-buttons {
    
    .grid {
      margin: 0;
      
      .row {
        margin: 0;
        padding: 10px 0;
      }
      
      .column {
        margin: 0;
        padding: 0;
      }
    }
  
    .ui.button {
      display: flex;
      align-items: center;      
      height: 40px;
      border-radius: 3px;
      font-weight: 500;
      color: #848893;
      margin: 0 5px;  
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;

      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }

      &:active {
        border: solid 1px #dee2e6;
        background-color: #edeef2;
        color: #20273a;
      }
    }
  }
`

export const AddressGrid = styled(Grid)`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  font-size: 14px;
    
  &.ui.grid {
    margin: 0 5px;
    padding: 12px 10px;
    width: 240px;
    
    .row {
      margin: 0;
      padding: 0;
    }
    
    .column {
      margin: 0;
      padding: 0 5px;
      color: #20273a;

      &.header {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #848893;
        margin-bottom: 3px;
      }  
  
      &.company-name {
        color: #20273a;
        font-weight: bolder;
      }    
      
    }
  }
`

class ShippingQuoteRequest extends Component {

  displayAddress = ({ address, header, company }) => {

    return (
      <AddressGrid>
        <GridRow>
          <GridColumn className='header'>
            {header}
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn className='company-name'>
            {company}
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn>
            {address.streetAddress}
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            {`${address.city}${address.province ? `, ${address.province.name}`: '' }, ${address.country.name}`}
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            {address.zip.zip}
          </GridColumn>
        </GridRow>
      </AddressGrid>
    )
  }

  render() {
    const { row } = this.props

    const order = {
      productName: 'test product name',
      weight: '1000 lbs',
      nmfc: '55660',
      freightClass: '50',
      maxPkgsPallet: 1,
      hazardous: true,
      stackable: false,
      freezeProtect: false
    }

    const testAddress = {
      streetAddress: '16564 35th Ave NE',
      city: 'Lake Forest Park',
      province: {
        name: 'WA'
      },
      country: {
        name: 'USA'
      },
      zip: {
        zip: '98155'
      }
    }

    return (
      <DetailMessage>
        <StyledGrid>
          <GridRow>
            <GridColumn width={16}>
              <FormattedMessage
                id='alerts.shippingQuoteRequest'
                defaultMessage='{name} from {company} has requested a quote for the following order:'
                values={{
                  name: 'Some Name',
                  company: 'Company name'
                }}
              />
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn width={16}>
              <TableSegment>
                <StyledList divided relaxed horizontal size='large'>
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='alerts.product' defaultMessage='Product' />
                      </List.Header>
                      <List.Description as='span'>
                        {order.productName}
                      </List.Description>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='alerts.grossWeight' defaultMessage='Gross Weight' />
                      </List.Header>
                      <List.Description as='span'>
                        {order.weight}
                      </List.Description>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='alerts.nmfc' defaultMessage='NMFC' />
                      </List.Header>
                      <List.Description as='span'>
                        {order.nmfc}
                      </List.Description>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='alerts.freightClass' defaultMessage='Freight Class' />
                      </List.Header>
                      <List.Description as='span'>
                        {order.freightClass}
                      </List.Description>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='alerts.maxPkgsPallet' defaultMessage='Max PKGS / Pallet' />
                      </List.Header>
                      <List.Description as='span'>
                        {order.maxPkgsPallet}
                      </List.Description>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='alerts.hazardous' defaultMessage='Hazardous' />
                      </List.Header>
                      <List.Description as='span'>
                        {order.hazardous
                          ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                          : <FormattedMessage id='global.no' defaultMessage='No' />
                        }
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='alerts.stackable' defaultMessage='Stackable' />
                      </List.Header>
                      <List.Description as='span'>
                        {order.stackable
                          ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                          : <FormattedMessage id='global.no' defaultMessage='No' />
                        }
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id='alerts.freezeProtect' defaultMessage='Freeze Protect' />
                      </List.Header>
                      <List.Description as='span'>
                        {order.freezeProtect
                          ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                          : <FormattedMessage id='global.no' defaultMessage='No' />
                        }
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </StyledList>
              </TableSegment>
            </GridColumn>
          </GridRow>
        </StyledGrid>

        <AddressRow>
          <div className='addresses' style={{ margin: '0 -5px' }}>
            {this.displayAddress({
              header: 'From',
              company: 'Longwood Corp',
              address: testAddress
            })}
            {this.displayAddress({
              header: 'To',
              company: 'Longwood Corp',
              address: testAddress
            })}
          </div>
          <div className='right-buttons'>
            <Grid>
              <GridRow>
                <GridColumn>
                  <div style={{ float: 'right' }}>
                    <Button
                      onClick={() => console.log('!!!!!!!!!! Add Shipping Quote')}
                    >
                      <FormattedMessage id='alerts.addShippingQuote' defaultMessage='Add Shipping Quote'>
                        {text => text}
                      </FormattedMessage>
                      <ArrowRight size='18'/>
                    </Button>
                  </div>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  <div style={{ display: 'flex', flexDirection: 'row', float: 'right' }}>
                    <Input
                      style={{ marginRight: '5px' }}
                      onChange={() => console.log('!!!!!!!!!! Input onChange')}
                    />
                    <Button
                      onClick={() => console.log('!!!!!!!!!! Send')}
                    >
                      <FormattedMessage id='alerts.send' defaultMessage='Send'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </div>
                </GridColumn>
              </GridRow>
            </Grid>
          </div>
        </AddressRow>
      </DetailMessage>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(withToastManager(ShippingQuoteRequest)))