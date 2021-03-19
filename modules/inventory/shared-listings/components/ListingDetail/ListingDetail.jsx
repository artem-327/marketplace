/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import {
  Header,
  GridColumn,
  GridRow,
  Grid,
  Segment,
  Message,
  Button,
  ButtonGroup,
  Image,
  List,
  Input
} from 'semantic-ui-react'
import { ChevronsUp, Mail } from 'react-feather'

// Components
//import ErrorFocus from '../../../components/error-focus'
import BasicButton from '../../../../../components/buttons/BasicButton'
import Logo from '../../../../../assets/images/login/logo-bluepallet.png'
import HeaderPricing from '../../../../../components/detail-row/header'
// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import {
  DivDetailWrapper,
  GridStyled,
  GridRowButton,
  DivRectangle,
  DivName,
  DivAddress,
  DivButtons,
  BasicButtonCustom,
  DivMail,
  DivTextButton
} from './ListingDetail.styles'
import {
  StyledGrid,
  TableSegment,
  StyledList,
  DetailMessage,
  ColumnDetail
} from '../../../../../components/detail-row/styles'
import {
  SegmentGroupHeader,
  GridColumnDetail,
  GridRowBottomSegment,
  DivTitleBottomSegment,
  DivValue,
  SegmentBottom as SegmentHeader,
  DivTitleTradeCriteria,
  DivCollapse,
  DivIconCollapse,
  DivCollapseText,
  DivTradePassLogo,
  GridRowLoadingBottomSegment
} from '../../../../my-network/components/DetailRow/DetailRow.style'

// Services
//import {} from './ListingDetail.services'

const ListingDetail = props => {
  const [tmp, set] = useState(false)
  const [markup, setMarkup] = useState('')

  const { parentState, row, intl } = props

  const { expandedRowIds, setExpandedRowIds } = parentState

  // Similar to call componentDidMount:
  useEffect(() => {}, []) // If [] is empty then is similar as componentDidMount.

  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {}, [
    /* variableName */
  ])

  console.log('!!!!!!!!!! ListingDetail props', props)

  let address = row?.warehouse?.deliveryAddress?.address?.city //MOVE to mapStateToProps and services

  if (row?.warehouse?.deliveryAddress?.address?.province?.abbreviation) {
    address = `${address}, ${row?.warehouse?.deliveryAddress?.address?.province?.abbreviation}`
  } else {
    address = `${address}, ${row?.warehouse?.deliveryAddress?.address?.country?.code}`
  }

  return (
    <StyledGrid>
      <GridRowBottomSegment>
        <GridColumnDetail>
          <SegmentGroupHeader horizontal $noneBorder>
            <SegmentHeader textAlign='left'>
              <Grid.Row>
                <GridColumnDetail>
                  <FormattedMessage id={`sharedListings.detailRow.seller`} defaultMessage='SELLER' />
                </GridColumnDetail>
              </Grid.Row>
              <Grid.Row>
                <GridColumnDetail textAlign='center' verticalAlign='middle'>
                  <DivRectangle>
                    <Image verticalAlign='middle' src={Logo} />
                  </DivRectangle>
                </GridColumnDetail>
                <GridColumnDetail>
                  <DivName> {row?.companyProduct?.intProductName}</DivName>
                  <DivAddress>{address}</DivAddress>
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
                          <FormattedMessage
                            id='sharedListings.detailRow.messageSeller'
                            defaultMessage='Message Seller'
                          />
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
            </SegmentHeader>

            <SegmentHeader textAlign='left'>
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
                    label='%'
                    labelPosition='right'
                    name='markup'
                    placeholder={intl.formatMessage({ id: 'sharedListings.detailRow.enterMarkup' })}
                    onChange={(e, data) => setMarkup(data.value)}
                    value={markup}
                  />
                </GridColumnDetail>
                <GridColumnDetail width={8}>
                  <BasicButton
                    noBorder
                    textcolor='#ffffff !important'
                    background='#00c7f9 !important'
                    fluid
                    onClick={() => console.log('click save')}
                    data-test='shared_listings_markup_save_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save' />
                  </BasicButton>
                </GridColumnDetail>
              </Grid.Row>
            </SegmentHeader>
          </SegmentGroupHeader>
        </GridColumnDetail>
      </GridRowBottomSegment>
      <DivCollapse
        onClick={() => {
          let ids = expandedRowIds.slice()
          if (ids.includes(row.id)) {
            setExpandedRowIds(ids.filter(id => id !== row.id))
          }
        }}
        data-test='shared_listings_detail_close_btn'>
        <div>
          <DivIconCollapse>
            <ChevronsUp size='18' />
          </DivIconCollapse>
          <DivCollapseText>Collapse</DivCollapseText>
        </div>
        <DivTradePassLogo>Close</DivTradePassLogo>
      </DivCollapse>
    </StyledGrid>
  )

  return (
    <DivDetailWrapper>
      <GridStyled divided='horizontally'>
        <GridRow>
          <GridColumn width={8}>Seller ! !</GridColumn>
          <GridColumn width={8}>Pricing ! !</GridColumn>
        </GridRow>
      </GridStyled>

      <GridStyled>
        <GridRow>
          <GridColumn width={16}>menu ... ! !</GridColumn>
        </GridRow>

        <GridRowButton>
          <GridColumn>
            <BasicButton
              noBorder
              onClick={() => {
                let ids = expandedRowIds.slice()
                if (ids.includes(row.id)) {
                  setExpandedRowIds(ids.filter(id => id !== row.id))
                }
              }}
              data-test='shared_listings_detail_close_btn'>
              <FormattedMessage id='global.close' defaultMessage='Close'>
                {text => text}
              </FormattedMessage>
            </BasicButton>
          </GridColumn>
        </GridRowButton>
      </GridStyled>
    </DivDetailWrapper>
  )
}

ListingDetail.propTypes = {
  //PropTypes.number
}

ListingDetail.defaultProps = {}

function mapStateToProps(store) {
  return {}
}

//export default injectIntl(ListingDetail)
export default injectIntl(connect(mapStateToProps, {})(ListingDetail))
