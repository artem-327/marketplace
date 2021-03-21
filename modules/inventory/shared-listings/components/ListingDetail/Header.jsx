import { memo, useEffect, useRef } from 'react'
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
  DivTextButton
} from './ListingDetail.styles'
import { StyledGrid, TableSegment, StyledList } from '../../../../../components/detail-row/styles'
import {
  SegmentGroupHeader,
  GridColumnDetail,
  SegmentBottom as SegmentHeader
} from '../../../../my-network/components/DetailRow/DetailRow.style'
import { getSafe } from '../../../../../utils/functions'

/**
 * @category Inventory - Shared Listings
 * @component
 */
const Header = props => {
  const { row, values, onChange } = props
  const ref = useRef(null)

  useEffect(() => {
    if (values?.markup) {
      if (typeof ref !== 'undefined') ref.current.focus()
    }
  }, [values?.markup])

  return (
    <SegmentGroupHeader horizontal $noneBorder>
      <SegmentHeader textAlign='left'>
        <StyledGrid>
          <Grid.Row>
            <GridColumnDetail>
              <FormattedMessage id={`sharedListings.detailRow.seller`} defaultMessage='SELLER' />
            </GridColumnDetail>
          </Grid.Row>
          <Grid.Row>
            <GridColumnDetail width={4} textAlign='center' verticalAlign='middle'>
              <DivRectangle>
                <Image verticalAlign='middle' src={row?.createdBy?.company?.base64Logo} />
              </DivRectangle>
            </GridColumnDetail>
            <GridColumnDetail width={12}>
              <DivName> {row?.companyProduct?.intProductName}</DivName>
              <DivAddress>{row?.address}</DivAddress>
              <DivButtons>
                <BasicButtonCustom
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
                </BasicButtonCustom>
              </DivButtons>
            </GridColumnDetail>
          </Grid.Row>
        </StyledGrid>
      </SegmentHeader>

      <SegmentHeader textAlign='left'>
        <StyledGrid>
          <Grid.Row>
            <GridColumnDetail>
              <FormattedMessage id={`sharedListings.detailRow.pricing`} defaultMessage='PRICING' />
            </GridColumnDetail>
          </Grid.Row>

          <Grid.Row>
            <GridColumnDetail width={16}>
              <TableSegment>
                <StyledList divided relaxed horizontal size='large'>
                  {row?.priceColumns?.map((p, i) => (
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
            </GridColumnDetail>
          </Grid.Row>
          <Grid.Row>
            <GridColumnDetail width={8}>
              <Input
                ref={ref}
                fluid
                label='%'
                labelPosition='right'
                name='markup'
                placeholder={'Enter Markup'}
                onChange={(e, data) => {
                  onChange({ ...values, markup: data.value })
                }}
                value={values?.markup}
              />
            </GridColumnDetail>
            <GridColumnDetail width={8}>
              <BasicButton
                noBorder
                textcolor='#ffffff !important'
                background='#00c7f9 !important'
                fluid
                onClick={() => console.log('click save and value is: ', values?.markup)}
                data-test='shared_listings_markup_save_btn'>
                <FormattedMessage id='global.save' defaultMessage='Save' />
              </BasicButton>
            </GridColumnDetail>
          </Grid.Row>
        </StyledGrid>
      </SegmentHeader>
    </SegmentGroupHeader>
  )
}

Header.propTypes = {}

function areEqual(prevProps, nextProps) {
  return prevProps?.row?.id === nextProps?.row?.id && prevProps?.values?.markup === nextProps?.values?.markup
}

export default memo(Header, areEqual)
