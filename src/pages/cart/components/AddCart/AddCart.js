import React, { Component } from 'react'
import Router from 'next/router'
import { FormattedNumber, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { object, func } from 'prop-types'
import moment from 'moment/moment'
import {
  Sidebar,
  Button,
  Header,
  Grid,
  GridRow,
  GridColumn,
  Loader,
  Dimmer,
  Dropdown,
  Input,
  Divider,
  Segment,
  List,
  Popup
} from 'semantic-ui-react'

import { FormattedUnit, UnitOfPackaging } from '~/components/formatted-messages'
import { errorMessages } from '~/constants/yupValidation'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'
import './AddCart.scss'
// import file from '../../../../images/file.svg'
import { checkToken } from '../../../../utils/auth'

const CapitalizedColumn = styled(GridColumn)`
  text-transform: capitalize;
`

const FlexContent = styled(Segment)`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 0px !important;
`

const RelaxedSegment = styled(Segment)`
  padding-top: 0px;
  margin: 0 !important;
`

const ErrorLabel = styled.label`
  color: red;
`

const CustomList = styled(List)`
  pointer-events: none;
  margin-top: 0px !important;
`

const ListHeader = styled(List.Header)`
  font-size: 1rem !important;
  padding-bottom: 15px;
`
const CustomSpanShowMore = styled.span`
  font-size: medium;
  float: right;
  color: #2599d5;
  cursor: pointer;
`

export default class AddCart extends Component {
  state = {
    showMore: false
  }
  componentDidMount() {
    // this.props.getProductOffer(this.props.id, this.props.isEdit)
    // if (this.props.isEdit) this.props.getOrderDetail(this.props.orderId)
  }

  createOrder = async () => {
    if (checkToken(this.props)) return
    const { addCartItem } = this.props
    let { sidebar } = this.props
    let { pkgAmount, id } = sidebar

    await addCartItem({ productOffer: id, pkgAmount })
    Router.push('/cart')
  }

  editOrder = async () => {
    const { updateCartItem } = this.props
    let { sidebar } = this.props
    let { pkgAmount } = sidebar

    await updateCartItem({ cartItemId: sidebar.id, pkgAmount })
  }

  handleQuantity = e => {
    let { minPkg, splitPkg, pkgAvailable } = this.props.offer
    let pkgAmount = parseInt(e.target.value, 10)
    let warning = null

    if (pkgAmount < minPkg || !pkgAmount) {
      warning = `minimum is ${minPkg}`
    } else if (pkgAmount > pkgAvailable) {
      warning = `maximum is ${pkgAvailable}`
    } else if (!(pkgAmount % parseInt(splitPkg, 10) === 0 || pkgAmount === parseInt(minPkg, 10))) {
      warning = `split is ${splitPkg}`
    }

    this.props.sidebarChanged({ warning, pkgAmount })
  }

  getCartMarkup = () => {
    let { offer, order, isEdit } = this.props
    let { pkgAmount, pricing, warning } = this.props.sidebar

    let { pkgAvailable, pricingTiers } = offer

    const price = pricing ? pricing.price : null

    let { packagingUnit, packagingSize, packagingType } = offer.companyProduct
    let nameAbbreviation = packagingUnit ? packagingUnit.nameAbbreviation : null

    let totalPrice = pkgAmount && price ? price * pkgAmount * packagingSize : null
    let error = null

    let dropdownOptions = []
    //let currencyCode = getSafe(() => offer.pricingTiers[0].pricePerUOM.currency.code, currency)
    let currencyCode = currency // ! ! getSafe(() => offer.pricingTiers[0].pricePerUOM.currency.code, currency)

    if (pricingTiers.length > 0) {
      pricingTiers.forEach((tier, i) => {
        let quantityTo =
          i + 1 >= pricingTiers.length
            ? pkgAvailable
            : tier.quantityFrom > pricingTiers[i + 1].quantityFrom
            ? tier.quantityFrom
            : pricingTiers[i + 1].quantityFrom - 1

        let text = (
          <>
            <FormattedUnit unit='' separator=' - ' value={tier.quantityFrom} />
            <FormattedUnit unit='' separator=' : ' value={quantityTo} />
            <FormattedNumber style='currency' value={tier.pricePerUOM} currency={currencyCode} />
            {nameAbbreviation && ` / ${nameAbbreviation}`}
          </>
        )
        dropdownOptions.push({
          key: i,
          value: { quantityFrom: tier.quantityFrom, price: tier.pricePerUOM },
          text
        })
      })
    } else {
      let value = price

      dropdownOptions.push({
        key: 0,
        value: { quantityFrom: 1, price: value },
        text: (
          <>
            <FormattedNumber minimumFractionDigits={0} value={value} style='currency' currency={currencyCode} />
            {nameAbbreviation && ` / ${nameAbbreviation}`}
          </>
        )
      })
    }

    if (isNaN(pkgAmount)) error = <ErrorLabel>{errorMessages.requiredMessage}</ErrorLabel>
    else if (pkgAmount < offer.minPkg)
      error = (
        <ErrorLabel>
          <FormattedMessage id='validation.minimum' defaultMessage='Minimum is {min}' values={{ min: offer.minPkg }} />
        </ErrorLabel>
      )
    else if (pkgAmount > pkgAvailable)
      error = (
        <ErrorLabel>
          <FormattedMessage id='validation.maximum' defaultMessage='Maximum is {max}' values={{ max: pkgAvailable }} />
        </ErrorLabel>
      )
    else if (pkgAmount % offer.splitPkg !== 0)
      error = (
        <ErrorLabel>
          <FormattedMessage
            id='validation.multiplyOfSplit'
            defaultMessage='Must be multiply of split ({split})'
            values={{ split: offer.splitPkg }}
          />
        </ErrorLabel>
      )

    // let attachments = offer.attachments.map(att =>
    //   <div><img src={file} alt='File' className='fileicon'></img><p className='filedescription'>{att.fileName}</p></div>
    // )

    let canProceed = !warning && price && pkgAmount > 0

    return (
      <>
        <FlexContent basic>
          <Grid verticalAlign='top'>
            <GridRow className='action' columns={1}>
              <GridColumn>
                <Header>
                  <FormattedMessage id='cart.InfoHeader' defaultMessage='1. Product Information' />

                  <CustomSpanShowMore
                    positive={this.state.showMore}
                    onClick={() => {
                      this.setState(prevState => ({ showMore: !prevState.showMore }))
                    }}
                    data-test='cart_show_less_or_more'>
                    <FormattedMessage id={`global.show${this.state.showMore ? 'Less' : 'More'}`}>
                      {text => text}
                    </FormattedMessage>
                  </CustomSpanShowMore>
                </Header>
              </GridColumn>
            </GridRow>

            {/* <GridRow columns={1}>
              <GridColumn>
                <Header as='h4'>{offer.product.casProducts[0].casIndexName}</Header>
              </GridColumn>
            </GridRow> */}

            {/* <GridRow>
              <GridColumn computer={6}>
                Merchant:
          </GridColumn>
              <GridColumn computer={10}>
                {offer.owner && offer.owner.company.name ? offer.owner.company.name : 'Anonymous'}
              </GridColumn>
            </GridRow> */}

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.productName' defaultMessage='Product Name:' />
              </GridColumn>
              <GridColumn computer={10}>{offer.companyProduct.echoProduct.name}</GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.availablePkgs' defaultMessage='Available Packages:' />
              </GridColumn>
              <GridColumn computer={10}>
                <FormattedNumber minimumFractionDigits={0} value={pkgAvailable} />
                {'x '}
                <FormattedUnit unit={nameAbbreviation} separator={' '} value={packagingSize} />{' '}
                <UnitOfPackaging value={packagingType.name} />
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.availableQuantity' defaultMessage='Available Quantity:' />
              </GridColumn>

              <GridColumn company={10}>
                <FormattedUnit unit={nameAbbreviation} separator={' '} value={packagingSize * pkgAvailable} />{' '}
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.productLocation' defaultMessage='Location:' />
              </GridColumn>
              <GridColumn computer={10}>{offer.locationStr}</GridColumn>
            </GridRow>
            {this.state.showMore && (
              <>
                <GridRow>
                  <GridColumn computer={6}>
                    <FormattedMessage id='cart.manufacturer' defaultMessage='Manufacturer:' />
                  </GridColumn>
                  <GridColumn computer={10}>
                    {getSafe(() => offer.companyProduct.echoProduct.manufacturer.name, '')}
                  </GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn computer={6}>
                    <FormattedMessage id='cart.contryOrigin' defaultMessage='Country of Origin:' />
                  </GridColumn>
                  <GridColumn computer={10}>{getSafe(() => offer.origin.name, '')}</GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn computer={6}>
                    <FormattedMessage id='cart.condition' defaultMessage='Condition:' />
                  </GridColumn>
                  <GridColumn computer={10}>
                    {getSafe(() => offer.conforming, '') === true ? 'Conforming' : 'Non Conforming'}
                  </GridColumn>
                </GridRow>
                {offer && offer.conditionNotes && !offer.conforming && (
                  <GridRow>
                    <GridColumn computer={6}>
                      <FormattedMessage id='cart.conditionNotes' defaultMessage='Condition Notes:' />
                    </GridColumn>
                    <GridColumn computer={10}>{getSafe(() => offer.conditionNotes, '')}</GridColumn>
                  </GridRow>
                )}
                <GridRow>
                  <GridColumn computer={6}>
                    <FormattedMessage id='cart.expirationDate' defaultMessage='Expiration Date:' />
                  </GridColumn>
                  <GridColumn computer={10}>
                    {offer && offer.lotExpirationDate
                      ? moment(offer.lotExpirationDate).format(getLocaleDateFormat())
                      : 'N/A'}
                  </GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn computer={6}>
                    <FormattedMessage id='cart.form' defaultMessage='Form:' />
                  </GridColumn>
                  <GridColumn computer={10}>{getSafe(() => offer.form.name, '')}</GridColumn>
                </GridRow>{' '}
              </>
            )}
            {/* <GridRow>
              <GridColumn computer={6}>
                Attachments:
          </GridColumn>

              <GridColumn computer={10}>
                {attachments}
              </GridColumn>
            </GridRow> */}

            <GridRow className='action'>
              <GridColumn>
                <Header>
                  <FormattedMessage id='cart.PurchaseHeader' defaultMessage='2. Purchase Info' />
                </Header>
              </GridColumn>
            </GridRow>

            <CustomList selection>
              <ListHeader>
                <FormattedMessage id='cart.fobPricing' defaultMessage='FOB Pricing:' />
              </ListHeader>
              {dropdownOptions.map(el => (
                <List.Item active={el.value.price === this.props.sidebar.pricing.price}>
                  <List.Content>{el.text}</List.Content>
                </List.Item>
              ))}
            </CustomList>
            <GridRow columns={2}>
              <Popup
                trigger={
                  <GridColumn>
                    <FormattedMessage id='cart.minimumPackges' defaultMessage='Minimum Packages' />:
                  </GridColumn>
                }
                content={<FormattedMessage id='cart.minimumOrderQQ' defaultMessage='Minimum Order Quantity' />}
              />
              <GridColumn>{offer.minPkg}</GridColumn>
            </GridRow>

            <GridRow columns={2}>
              <GridColumn>
                <FormattedMessage id='cart.split' defaultMessage='Split' />:
              </GridColumn>
              <GridColumn>{offer.splitPkg}</GridColumn>
            </GridRow>

            <GridRow verticalAlign='middle' columns={2}>
              <GridColumn>
                <FormattedMessage id='cart.packagesRequested' defaultMessage='Packages Requested:' />
              </GridColumn>
              <GridColumn data-test='add_cart_quantity_inp'>
                <Input
                  step={offer.splitPkg}
                  error={!!error}
                  min={1}
                  value={this.props.sidebar.pkgAmount}
                  onChange={this.handleQuantity}
                  type='number'
                />
              </GridColumn>
            </GridRow>

            {error && (
              <GridRow columns={2}>
                <GridColumn />
                <GridColumn> {error}</GridColumn>
              </GridRow>
            )}

            <GridRow columns={1}></GridRow>

            <GridRow className='action'>
              <GridColumn>
                <Header>
                  <FormattedMessage id='cart.SummaryHeader' defaultMessage='3. Summary' />
                </Header>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.requestedQuantity' defaultMessage='Requested Quantity:' />
              </GridColumn>
              <GridColumn computer={10}>
                {(pkgAmount && pkgAmount > 0 ? (
                  <>
                    {' '}
                    <FormattedUnit unit={nameAbbreviation} separator={' '} value={packagingSize * pkgAmount} />{' '}
                  </>
                ) : (
                  <FormattedMessage id='cart.selectFirst' defaultMessage='Select Packages Requested first.' />
                )) ||
                  (isEdit ? (
                    <>
                      {' '}
                      <FormattedUnit
                        unit={nameAbbreviation}
                        separator={' '}
                        value={packagingSize * order.pkgAmount}
                      />{' '}
                    </>
                  ) : (
                    <FormattedMessage id='cart.selectFirst' defaultMessage='Select Packages Requested first.' />
                  ))}
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.price' defaultMessage='Price' />
              </GridColumn>
              <GridColumn computer={10}>
                {price && !isNaN(price) ? (
                  <>
                    <FormattedNumber style='currency' currency={currencyCode} value={price} />{' '}
                    {nameAbbreviation && `/ ${nameAbbreviation}`}
                  </>
                ) : null}
              </GridColumn>
            </GridRow>
            <Divider />
            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.subtotal' defaultMessage='Subtotal' />:
              </GridColumn>
              <GridColumn computer={10}>
                {totalPrice ? (
                  <FormattedNumber style='currency' currency={currencyCode} value={totalPrice} />
                ) : (
                  <FormattedMessage id='cart.selectFirst' defaultMessage='Select Packages Requested first.' />
                )}
              </GridColumn>
            </GridRow>
          </Grid>
        </FlexContent>

        <RelaxedSegment basic>
          <Grid>
            <GridRow className='action' columns={2}>
              <GridColumn>
                <Button
                  fluid
                  floated='right'
                  onClick={() => {
                    this.props.sidebarChanged({ isOpen: false })
                    this.setState({ showMore: false })
                  }}
                  data-test='add_cart_cancel_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </GridColumn>

              <GridColumn>
                {!isEdit ? (
                  <Button
                    disabled={!canProceed}
                    fluid
                    floated='right'
                    primary
                    onClick={this.createOrder}
                    data-test='add_cart_create_order_btn'>
                    <FormattedMessage id='global.continue' defaultMessage='Continue'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                ) : (
                  <Button
                    disabled={!canProceed}
                    fluid
                    floated='right'
                    primary
                    onClick={this.editOrder}
                    data-test='add_cart_edit_order_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                )}
              </GridColumn>
            </GridRow>
          </Grid>
        </RelaxedSegment>
      </>
    )
  }

  render() {
    let { sidebar, isEdit, orderDetailIsFetching, offerDetailIsFetching } = this.props
    const { sidebarChanged } = this.props
    let { isOpen } = sidebar

    return (
      <Sidebar
        onHide={() => sidebarChanged({ isOpen: false })}
        width='very wide'
        className='cart-sidebar flex'
        direction='right'
        animation='scale down'
        visible={isOpen}
        style={{ zIndex: 601 }}>
        {offerDetailIsFetching ? (
          <Dimmer active inverted>
            {' '}
            <Loader size='large' />{' '}
          </Dimmer>
        ) : (
          this.getCartMarkup()
        )}
      </Sidebar>
    )
  }
}

AddCart.propTypes = {
  offer: object,
  order: object,
  postNewOrder: func,
  casProductsChemNames: object,
  casProductsCasNumbers: object
  // id: number,
  // pkgAmount: number,
  // pricing: object,
  // warning: string
}
