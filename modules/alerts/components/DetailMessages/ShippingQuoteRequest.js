import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { ArrowRight } from 'react-feather'
import { Grid, GridRow, GridColumn, Table, Input, Button } from 'semantic-ui-react'

// Services
import { getSafe } from '../../../../utils/functions'

// Actions
import * as Actions from '../../actions'
import { openPopup as openPopupOperations } from '../../../operations/actions'

// Styles
import { TableSegment, DetailMessage, StyledGrid, AddressGrid } from '../Alerts.styles'
import {
  AddressRow,
  DivCellContent,
  DivCellHeader,
  DivCellValue,
  SpanIdValue,
  TableStyled
} from './ShippingQuoteRequest.styles'

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
        {false && (
          <GridRow>
            <GridColumn width={16} style={{ color: '#20273a' }}>
              {row.text}
              {
                false && (
                  <FormattedMessage
                    id='alerts.shippingQuoteRequest'
                    defaultMessage='{name} from {company} has requested a quote for the following order:'
                    values={{
                      name: 'Some Name',
                      company: 'Company name'
                    }}
                  />
                ) /* temporary disabled*/
              }
            </GridColumn>
          </GridRow>
        )}
        <GridRow>
          <GridColumn width={16}>
            <TableSegment>
              <TableStyled>
                <Table.Body>
                  {row.info.items.map((item, index) => {
                    return (
                      <Table.Row key={index}>
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
                          ].map((column, i) =>
                            <Table.Cell key={i}>
                              <DivCellContent>
                                <DivCellHeader>
                                  {column.header}
                                </DivCellHeader>
                                <DivCellValue>
                                  {column.description}
                                </DivCellValue>
                              </DivCellContent>
                            </Table.Cell>
                          )
                        }
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </TableStyled>
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

export default connect(null, { ...Actions, openPopupOperations })(
  injectIntl(withToastManager(ShippingQuoteRequest))
)
