import { FormattedMessage } from 'react-intl'
import { Grid, GridRow, GridColumn, List } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Services
import { getSafe } from '../../../../utils/functions'
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
      </AddressGrid>
    )
  }

  const { row } = props

  return (
    <DetailMessage>
      <StyledGrid>
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
                        <List.Description as='span'>{item.product}</List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.grossWeight' defaultMessage='Gross Weight' />
                        </List.Header>
                        <List.Description as='span'>
                          {item.grossWeightLbs} {'lbs'}
                        </List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.nmfc' defaultMessage='NMFC' />
                        </List.Header>
                        <List.Description as='span'>{item.nmfc}</List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.freightClass' defaultMessage='Freight Class' />
                        </List.Header>
                        <List.Description as='span'>{item.freightClass}</List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage id='alerts.maxPkgsPallet' defaultMessage='Max PKGS / Pallet' />
                        </List.Header>
                        <List.Description as='span'>{item.maxPkgsPerPallet}</List.Description>
                      </List.Content>
                    </List.Item>

                    <List.Item>
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
                    <List.Item>
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
                    <List.Item>
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
              <GridColumn width={16}>
                <div style={{ float: 'right' }}>
                  <FormattedMessage id='alerts.shippingQuoteIdColon' defaultMessage='Shipping Quote ID:' />
                  <SpanIdValue>
                    {getSafe(() => row.info.shippingQuoteRequestId, 'N/A')}
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

export default RowDetail