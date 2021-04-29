import { memo, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Image, Input, List } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { Mail } from 'react-feather'
// Components
import BasicButton from '../../../../../components/buttons/BasicButton'

// Styles
import {
  DivRectangle,
  DivName,
  DivAddress,
  DivButtons,
  BasicButtonCustom,
  DivMail,
  DivTextButton,
  ChevronLeftStyled,
  ChevronRightStyled,
  SegmentDetailRow,
  InputMarkup
} from './ListingDetail.styles'
import { StyledGrid, TableSegment, StyledList } from '../../../../../components/detail-row/styles'
import { SegmentGroupHeader, GridColumnDetail } from '../../../../my-network/components/DetailRow/DetailRow.style'
import { getSafe } from '../../../../../utils/functions'

// Services
import { submitHandler } from './Header.services'
import { updateMarkUp, getSharedProductOffer } from '../../../actions'

/**
 * @category Inventory - Shared Listings
 * @component
 */
const Header = props => {
  const { row, values, onChange, loadingMarkup } = props
  const ref = useRef(null)

  useEffect(() => {
    if (values?.priceMultiplier) {
      if (typeof ref !== 'undefined') ref.current.focus()
    }
  }, [values?.priceMultiplier])

  const priceColumnsLength = row?.priceColumns?.length
  const { pricingTabIndex } = values
  const priceColumns =
    priceColumnsLength > 4 ? row.priceColumns.slice(pricingTabIndex, pricingTabIndex + 4) : row.priceColumns

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
            <GridColumnDetail width={5} textAlign='center' verticalAlign='middle'>
              <DivRectangle>
                <Image verticalAlign='middle' src={row?.owner?.base64Logo} fluid rounded size='tiny' />
              </DivRectangle>
            </GridColumnDetail>
            <GridColumnDetail width={11}>
              <DivName> {row?.companyProduct?.intProductName}</DivName>
              <DivAddress>{row?.address}</DivAddress>
              <DivButtons>
                {/* <BasicButtonCustom
                  fluid
                  onClick={() => console.log('click message seller')}
                  data-test='shared_listings_message_seller_btn'>
                  <DivTextButton>
                    <DivMail>
                      <Mail size='14' color='black' />
                    </DivMail>
                    <span>
                      <FormattedMessage id='sharedListings.detailRow.messageSeller' defaultMessage='Message Seller' />
                    </span>
                  </DivTextButton>
                </BasicButtonCustom>
                <BasicButtonCustom
                  fluid
                  onClick={() => console.log('click trade pass')}
                  data-test='shared_listings_trade_pass_btn'>
                  <FormattedMessage id='sharedListings.detailRow.tradePass' defaultMessage='Trade Pass' />
                </BasicButtonCustom> */}
              </DivButtons>
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
                  {priceColumns.map((p, i) => (
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
            <GridColumnDetail width={8} $colorText='#404040'>
              <FormattedMessage id='detailRow.pricing.markup' defaultMessage='Markup' />
            </GridColumnDetail>
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

Header.propTypes = {}

function mapStateToProps(store) {
  return {
    loadingMarkup: store.simpleAdd.loadingMarkup
  }
}

function areEqual(prevProps, nextProps) {
  return prevProps?.row?.id === nextProps?.row?.id &&
    prevProps?.values?.priceMultiplier === nextProps?.values?.priceMultiplier &&
    prevProps?.loadingMarkup === nextProps?.loadingMarkup
}

const MemoHeader =  memo(Header, areEqual)

export default connect(mapStateToProps, { updateMarkUp, getSharedProductOffer })(MemoHeader)
