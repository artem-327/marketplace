import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import * as Actions from '../../actions'
import styled from 'styled-components'
import { ArrowRight } from 'react-feather'
import { openPopup as openPopupOperations } from '~/modules/operations/actions'

import { DetailMessage, StyledGrid } from '../layout'

import { Grid, GridRow, GridColumn, Segment, List, Input, Button } from 'semantic-ui-react'

import { TableSegment, ListTable } from '../Alerts.styles'

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

const SpanIdValue = styled.span`
  color: #20273a;
  margin-left: 7px;
  margin-right: 2px;
`

const ShippingQuoteRequest = props => {
  const displayAddress = ({ address, header, company }) => {
    return (
      <AddressGrid>
        <GridRow>
          <GridColumn className='header'>{header}</GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn className='company-name'>{company}</GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn>{address.streetAddress}</GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            {`${address.city}${address.province ? `, ${address.province}` : ''}, ${address.country}`}
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>{address.zip}</GridColumn>
        </GridRow>
      </AddressGrid>
    )
  }

  const { row, openPopupOperations } = props

  return (
    <DetailMessage>
      <StyledGrid>
        <GridRow>
          <GridColumn width={16}>
            <TableSegment>
              {row.info.items.map(item => {
                return (
                  <ListTable divided relaxed horizontal size='large'>
                    {
                      [
                        {
                          header: <FormattedMessage id='alerts.product' defaultMessage='Product' />,
                          description: item.product
                        },
                        {
                          header: <FormattedMessage id='alerts.grossWeight' defaultMessage='Gross Weight' />,
                          description: <>{item.grossWeightLbs} {'lbs'}</>
                        },
                        {
                          header: <FormattedMessage id='alerts.nmfc' defaultMessage='NMFC' />,
                          description: item.nmfc
                        },
                        {
                          header: <FormattedMessage id='alerts.freightClass' defaultMessage='Freight Class' />,
                          description: item.freightClass
                        },
                        {
                          header: <FormattedMessage id='alerts.maxPkgsPallet' defaultMessage='Max PKGS / Pallet' />,
                          description: item.maxPkgsPerPallet
                        },
                        {
                          header: <FormattedMessage id='alerts.hazardous' defaultMessage='Hazardous' />,
                          description: item.hazardous
                            ? (<FormattedMessage id='global.yes' defaultMessage='Yes' />)
                            : (<FormattedMessage id='global.no' defaultMessage='No' />)
                        },
                        {
                          header: <FormattedMessage id='alerts.stackable' defaultMessage='Stackable' />,
                          description: item.stackable
                            ? (<FormattedMessage id='global.yes' defaultMessage='Yes' />)
                            : (<FormattedMessage id='global.no' defaultMessage='No' />)
                        },
                        {
                          header: <FormattedMessage id='alerts.freezeProtect' defaultMessage='Freeze Protect' />,
                          description: item.freezeProtect
                            ? (<FormattedMessage id='global.yes' defaultMessage='Yes' />)
                            : (<FormattedMessage id='global.no' defaultMessage='No' />)
                        }
                      ].map((column, index) =>
                        <List.Item key={index}>
                          <List.Content>
                            <List.Header as='label'>{column.header}</List.Header>
                            <List.Description as='span'>{column.description}</List.Description>
                          </List.Content>
                        </List.Item>
                      )
                    }
                  </ListTable>
                )
              })}
            </TableSegment>
          </GridColumn>
        </GridRow>
      </StyledGrid>

      <AddressRow>
        <div className='addresses' style={{ margin: '0 -5px' }}>
          {displayAddress({
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
          {displayAddress({
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
                  <Button style={{ marginRight: '0' }} onClick={() => openPopupOperations(row)}>
                    <FormattedMessage id='alerts.addShippingQuote' defaultMessage='Add Shipping Quote'>
                      {text => text}
                    </FormattedMessage>
                    <ArrowRight size='18' style={{ marginLeft: '12px' }} />
                  </Button>
                </div>
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn width={16}>
                <div style={{ float: 'right' }}>
                  <FormattedMessage id='alerts.shippingQuoteIdColon' defaultMessage='Shipping Quote ID:' />
                  <SpanIdValue>
                    {getSafe(() => row.info.shippingQuoteRequestId, 'N/A')}
                  </SpanIdValue>
                </div>
              </GridColumn>
            </GridRow>
            {false && (
              <GridRow>
                <GridColumn>
                  <div style={{ display: 'flex', flexDirection: 'row', float: 'right' }}>
                    <Input style={{ marginRight: '5px' }} onChange={() => {}} />
                    <Button style={{ marginRight: '0' }} onClick={() => {}}>
                      <FormattedMessage id='alerts.send' defaultMessage='Send'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </div>
                </GridColumn>
              </GridRow>
            )}
          </Grid>
        </div>
      </AddressRow>
    </DetailMessage>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, { ...Actions, openPopupOperations })(
  injectIntl(withToastManager(ShippingQuoteRequest))
)
