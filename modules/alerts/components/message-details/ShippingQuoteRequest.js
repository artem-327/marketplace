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
    margin: 0;
    &:nth-child(n+2) {
      border-top: 1px solid rgba(34, 36, 38, 0.15);
    }

    > .item {
      flex-grow: 1;
      max-width: 150px;
      padding: 10px 15px !important;

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
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
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
            {`${address.city}${address.province ? `, ${address.province}`: '' }, ${address.country}`}
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            {address.zip}
          </GridColumn>
        </GridRow>
      </AddressGrid>
    )
  }

  render() {
    const { row, openPopupOperations } = this.props

    return (
      <DetailMessage>
        <StyledGrid>
          {false && (<GridRow>
            <GridColumn width={16} style={{ color: '#20273a' }}>
              {row.text}
              {false && (<FormattedMessage
                id='alerts.shippingQuoteRequest'
                defaultMessage='{name} from {company} has requested a quote for the following order:'
                values={{
                  name: 'Some Name',
                  company: 'Company name'
                }}
              />) /* temporary disabled*/}
            </GridColumn>
          </GridRow>)}

          <GridRow>
            <GridColumn width={16}>
              <TableSegment>
                {row.info.items.map(item => {
                  return (
                    <StyledList divided relaxed horizontal size='large'>
                      <List.Item>
                        <List.Content>
                          <List.Header as='label'>
                            <FormattedMessage id='alerts.product' defaultMessage='Product' />
                          </List.Header>
                          <List.Description as='span'>
                            {item.product}
                          </List.Description>
                        </List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Content>
                          <List.Header as='label'>
                            <FormattedMessage id='alerts.grossWeight' defaultMessage='Gross Weight' />
                          </List.Header>
                          <List.Description as='span'>
                            {item.grossWeightLbs}{' '}{'lbs'}
                          </List.Description>
                        </List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Content>
                          <List.Header as='label'>
                            <FormattedMessage id='alerts.nmfc' defaultMessage='NMFC' />
                          </List.Header>
                          <List.Description as='span'>
                            {item.nmfc}
                          </List.Description>
                        </List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Content>
                          <List.Header as='label'>
                            <FormattedMessage id='alerts.freightClass' defaultMessage='Freight Class' />
                          </List.Header>
                          <List.Description as='span'>
                            {item.freightClass}
                          </List.Description>
                        </List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Content>
                          <List.Header as='label'>
                            <FormattedMessage id='alerts.maxPkgsPallet' defaultMessage='Max PKGS / Pallet' />
                          </List.Header>
                          <List.Description as='span'>
                            {item.maxPkgsPerPallet}
                          </List.Description>
                        </List.Content>
                      </List.Item>

                      <List.Item>
                        <List.Content>
                          <List.Header as='label'>
                            <FormattedMessage id='alerts.hazardous' defaultMessage='Hazardous' />
                          </List.Header>
                          <List.Description as='span'>
                            {item.hazardous
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
                            {item.stackable
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
                            {item.freezeProtect
                              ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                              : <FormattedMessage id='global.no' defaultMessage='No' />
                            }
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    </StyledList>
                  )
                })}
              </TableSegment>
            </GridColumn>
          </GridRow>
        </StyledGrid>

        <AddressRow>
          <div className='addresses' style={{ margin: '0 -5px' }}>
            {this.displayAddress({
              header: 'From',
              company: getSafe(() => row.info.sellerCompanyName, ''),
              address: {
                country: getSafe(() => row.info.originCountry, ''),
                province: getSafe(() => row.info.originProvince, ''),
                city: getSafe(() => row.info.originCity, ''),
                streetAddress: getSafe(() => row.info.originStreet, ''),
                zip: getSafe(() => row.info.originZip, '')
              }
            })}
            {this.displayAddress({
              header: 'To',
              company: getSafe(() => row.info.buyerCompanyName, ''),
              address: {
                country: getSafe(() => row.info.destinationCountry, ''),
                province: getSafe(() => row.info.destinationProvince, ''),
                city: getSafe(() => row.info.destinationCity, ''),
                streetAddress: getSafe(() => row.info.destinationStreet, ''),
                zip: getSafe(() => row.info.destinationZip, '')
              }
            })}
          </div>
          <div className='right-buttons'>
            <Grid>
              <GridRow>
                <GridColumn>
                  <div style={{ float: 'right' }}>
                    <Button
                      style={{ marginRight: '0'}}
                      onClick={() => openPopupOperations()}
                    >
                      <FormattedMessage id='alerts.addShippingQuote' defaultMessage='Add Shipping Quote'>
                        {text => text}
                      </FormattedMessage>
                      <ArrowRight size='18'style={{ marginLeft: '12px' }}/>
                    </Button>
                  </div>
                </GridColumn>
              </GridRow>
              {false && (<GridRow>
                <GridColumn>
                  <div style={{ display: 'flex', flexDirection: 'row', float: 'right' }}>
                    <Input
                      style={{ marginRight: '5px' }}
                      onChange={() => {}}
                    />
                    <Button
                      style={{ marginRight: '0'}}
                      onClick={() => {}}
                    >
                      <FormattedMessage id='alerts.send' defaultMessage='Send'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </div>
                </GridColumn>
              </GridRow>)}
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

export default connect(
  mapStateToProps,
  { ...Actions, openPopupOperations }
  )(injectIntl(withToastManager(ShippingQuoteRequest)))