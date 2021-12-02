import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Grid, Image, List } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
// Components
import BasicButton from '../../../../../components/buttons/BasicButton'
// Styles
import {
  DivRectangle,
  DivName,
  DivAddress,
  ChevronLeftStyled,
  ChevronRightStyled,
  SegmentDetailRow,
  InputMarkup,
  DivFlexRow,
  DivSimpleColumn
} from './ListingDetail.styles'
import { StyledGrid, TableSegment, StyledList } from '../../../../../components/detail-row/styles'
import {
  SegmentGroupHeader,
  GridColumnDetail,
  DivPricingHeaderRow,
  DivPricingHeader
} from '../../../../my-network/components/DetailRow/DetailRow.style'
// Services
import { submitHandler } from './Header.services'
import { getSafe } from '../../../../../utils/functions'

/**
 * Header Component
 * @category Inventory - Shared Listings
 * @component
 */
const Header = props => {
  const { row, values, onChange, loadingMarkup, companyType, defaultMarkup } = props
  const ref = useRef(null)

  useEffect(() => {
    if (values?.priceMultiplier) {
      if (typeof ref !== 'undefined') ref.current.focus()
    }
  }, [values?.priceMultiplier])

  const priceColumnsLength = row?.priceColumns?.length
  const { pricingTabIndex } = values
  const priceColumns =
    priceColumnsLength > 4 ? row?.priceColumns?.slice(pricingTabIndex, pricingTabIndex + 4) : row?.priceColumns

  return (
    <SegmentGroupHeader horizontal $noneBorder>
      <SegmentDetailRow textAlign='left'>
        <StyledGrid>
          <Grid.Row>
            <GridColumnDetail>
              <FormattedMessage id={`sharedListings.detailRow.seller`} defaultMessage='SELLER' />
            </GridColumnDetail>
          </Grid.Row>
          <Grid.Row>
            <GridColumnDetail width={16}>
              <DivFlexRow>
                <DivRectangle>
                  <Image verticalAlign='middle' src={row?.owner?.logoUrl} fluid rounded size='tiny' />
                </DivRectangle>
                <DivSimpleColumn>
                  <DivName> {row?.companyProduct?.intProductName}</DivName>
                  <DivAddress>{row?.address}</DivAddress>
                </DivSimpleColumn>
              </DivFlexRow>
            </GridColumnDetail>
          </Grid.Row>
        </StyledGrid>
      </SegmentDetailRow>

      <SegmentDetailRow textAlign='left'>
        <StyledGrid>
          <Grid.Row>
            <GridColumnDetail>
              <FormattedMessage id={`sharedListings.detailRow.pricing`} defaultMessage='PRICING' />
            </GridColumnDetail>
          </Grid.Row>

          <Grid.Row>
            <GridColumnDetail width={16}>
              <TableSegment $oldDesign={true}>
                <StyledList divided relaxed horizontal size='large' $oldDesign={true}>
                  {priceColumns?.map((p, i) => (
                    <List.Item key={i}>
                      <List.Content>
                        <List.Header as='label'>
                          <FormattedMessage
                            id={`detailRow.pricing.${row?.companyProduct?.packagingType?.name}`}
                            defaultMessage='{titleNumbers} bag'
                            values={{ titleNumbers: p.titleNumbers }}
                          />
                        </List.Header>
                        <List.Description as='span'>{getSafe(() => p.value, '')}</List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </StyledList>
              </TableSegment>
              {priceColumnsLength > 4 && (
                <ChevronLeftStyled
                  size={24}
                  onClick={() => {
                    if (pricingTabIndex > 0) {
                      onChange({ ...values, pricingTabIndex: pricingTabIndex - 1 })
                    }
                  }}
                  clickable={(pricingTabIndex > 0).toString()}
                />
              )}
              {priceColumnsLength > 4 && (
                <ChevronRightStyled
                  size={24}
                  onClick={() => {
                    if (pricingTabIndex < priceColumnsLength - 4) {
                      onChange({ ...values, pricingTabIndex: pricingTabIndex + 1 })
                    }
                  }}
                  clickable={(pricingTabIndex < priceColumnsLength - 4).toString()}
                />
              )}
            </GridColumnDetail>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <DivPricingHeaderRow>
                <DivPricingHeader $colorText='#404040'>
                  <FormattedMessage id='detailRow.pricing.markup' defaultMessage='Markup' />
                </DivPricingHeader>
                {companyType === 'BROKER' && (
                  <DivPricingHeader $colorText='#f16844'>
                    <FormattedMessage
                      id='detailRow.pricing.defaultSharedListingsMarkup'
                      defaultMessage={`Note: When no mark-up is set, default  company mark-up of ${defaultMarkup} % will be applied.`}
                      values={{ value: defaultMarkup }}
                    />
                  </DivPricingHeader>
                )}
                </DivPricingHeaderRow>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <GridColumnDetail width={8}>
              <InputMarkup
                ref={ref}
                fluid
                label='%'
                labelPosition='right'
                name='priceMultiplier'
                placeholder={'Enter Markup'}
                readOnly={!values.id || loadingMarkup}
                disabled={loadingMarkup}
                onChange={(e, data) => {
                  onChange({ ...values, priceMultiplier: data.value })
                }}
                value={values?.priceMultiplier}
              />
            </GridColumnDetail>
            <GridColumnDetail width={8}>
              <BasicButton
                noBorder
                textcolor='#ffffff !important'
                background='#00c7f9 !important'
                fluid
                disabled={
                  !values?.priceMultiplier ||
                  isNaN(parseFloat(values.priceMultiplier)) ||
                  parseFloat(values.priceMultiplier) <= 0 ||
                  !values.id ||
                  loadingMarkup
                }
                loading={loadingMarkup}
                onClick={() => submitHandler(values, props)}
                data-test='shared_listings_markup_save_btn'>
                <FormattedMessage id='global.save' defaultMessage='Save' />
              </BasicButton>
            </GridColumnDetail>
          </Grid.Row>
        </StyledGrid>
      </SegmentDetailRow>
    </SegmentGroupHeader>
  )
}

Header.propTypes = {
  loadingMarkup: PropTypes.bool,
  onChange: PropTypes.func,
  updateMarkUp: PropTypes.func,
  getSharedProductOffer: PropTypes.func,
  row: PropTypes.object,
  values: PropTypes.object,
  datagrid: PropTypes.object,
  companyType: PropTypes.string,
  defaultMarkup: PropTypes.string
}

Header.defaultProps = {
  loadingMarkup: false,
  onChange: () => {},
  updateMarkUp: () => {},
  getSharedProductOffer: () => {},
  row: {},
  values: {},
  datagrid: {},
  companyType: '',
  defaultMarkup: '0'
}

export default Header
