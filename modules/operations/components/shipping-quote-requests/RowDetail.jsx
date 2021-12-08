import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Grid, GridRow, GridColumn, List, Button } from 'semantic-ui-react'
import { ArrowRight } from 'react-feather'
import PropTypes from 'prop-types'
import moment from 'moment'
// Services
import { getSafe } from '../../../../utils/functions'
import { getLocaleDateFormat } from '../../../../components/date-format'
// Styles
import {
  DetailMessage,
  StyledGrid,
  TableSegment,
  StyledList,
  AddressRow,
  AddressGrid,
  SpanIdValue
} from '../../styles'
import { GridRowMargin } from "../../../alerts/components/DetailMessages/ShippingQuoteRequest.styles";

import { openPopup as openPopupOperations } from '../../../operations/actions'

/**
 * RowDetail Component
 * @category Operations - Shipping quote requests
 * @components
 */
const RowDetail = props => {
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

        <GridRowMargin margin='10px 0 0'>
          <GridColumn>
            <FormattedMessage id='alerts.warehouseHours' defaultMessage='Warehouse Hours:' />
          </GridColumn>
        </GridRowMargin>
        <GridRow>
          <GridColumn>{address.warehouseHours}</GridColumn>
        </GridRow>
      </AddressGrid>
    )
  }

  const { row, openPopupOperations } = props
  const preferredDeliveryDate = getSafe(() => row.info.preferredDeliveryDate, false)

  return (
    <DetailMessage>
      <StyledGrid>
        <GridRow>
          <GridColumn width={16}>
            <TableSegment>
              {row.info.items.map(item => {
                return (
                  <StyledList divided relaxed horizontal size='large'>
                    <List.Item style={{ width: 100 }}>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.product' defaultMessage='Product' />
                        </List.Header>
                        <List.Description as='span'>{item.product}</List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item style={{ width: 90 }}>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.grossWeight' defaultMessage='Gross Weight' />
                        </List.Header>
                        <List.Description as='span'>
                          {item.grossWeightLbs} {'lbs'}
                        </List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item style={{ width: 80 }}>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.nmfc' defaultMessage='NMFC' />
                        </List.Header>
                        <List.Description as='span'>{item.nmfc}</List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item style={{ width: 80 }}>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.freightClass' defaultMessage='Freight Class' />
                        </List.Header>
                        <List.Description as='span'>{item.freightClass}</List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item style={{ width: 80 }}>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.palletCount' defaultMessage='Pallet Count' />
                        </List.Header>
                        <List.Description as='span'>{item.palletCount}</List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item style={{ width: 80 }}>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.hazardous' defaultMessage='Hazardous' />
                        </List.Header>
                        <List.Description as='span'>
                          {item.hazardous ? (
                            <FormattedMessage id='global.yes' defaultMessage='Yes' />
                          ) : (
                            <FormattedMessage id='global.no' defaultMessage='No' />
                          )}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ width: 80 }}>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.stackable' defaultMessage='Stackable' />
                        </List.Header>
                        <List.Description as='span'>
                          {item.stackable ? (
                            <FormattedMessage id='global.yes' defaultMessage='Yes' />
                          ) : (
                            <FormattedMessage id='global.no' defaultMessage='No' />
                          )}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item style={{ width: 80 }}>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.freezeProtect' defaultMessage='Freeze Protect' />
                        </List.Header>
                        <List.Description as='span'>
                          {item.freezeProtect ? (
                            <FormattedMessage id='global.yes' defaultMessage='Yes' />
                          ) : (
                            <FormattedMessage id='global.no' defaultMessage='No' />
                          )}
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
          {displayAddress({
            header: 'From',
            company: getSafe(() => row.info.sellerCompanyName, ''),
            address: {
              country: getSafe(() => row.info.originCountry, ''),
              province: getSafe(() => row.info.originProvince, ''),
              city: getSafe(() => row.info.originCity, ''),
              streetAddress: getSafe(() => row.info.originStreet, ''),
              zip: getSafe(() => row.info.originZip, ''),
              warehouseHours: getSafe(() => row.info.sellerWarehouseHours, 'N/A')
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
              zip: getSafe(() => row.info.destinationZip, ''),
              warehouseHours: getSafe(() => row.info.buyerWarehouseHours, 'N/A')
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
            <GridRow>
              <GridColumn>
                <div style={{ float: 'right' }}>
                  <FormattedMessage id='alerts.requestedDeliveryDate' defaultMessage='Requested delivery date:' />
                  <SpanIdValue>
                    {preferredDeliveryDate ? moment(preferredDeliveryDate).format(getLocaleDateFormat()) : 'N/A'}
                  </SpanIdValue>
                </div>
              </GridColumn>
            </GridRow>
          </Grid>
        </div>
      </AddressRow>
    </DetailMessage>
  )
}

RowDetail.propTypes = {
  rows: PropTypes.array
}

RowDetail.defaultValues = {
  rows: []
}

export default connect(null, { openPopupOperations })(RowDetail)
