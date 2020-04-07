import React, { Component } from 'react'
import Router from 'next/router'
import { FormattedNumber, FormattedMessage, injectIntl } from 'react-intl'
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
  Popup,
  Menu,
  Table
} from 'semantic-ui-react'

import { FormattedUnit, UnitOfPackaging } from '~/components/formatted-messages'
import { errorMessages } from '~/constants/yupValidation'
import { currency } from '~/constants/index'
import { getSafe, formatAssay } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'
import './AddCart.scss'
// import file from '../../../../images/file.svg'
import { checkToken } from '../../../../utils/auth'
import { tabsMarketPlace, echoProductGrouping, dropdownOptions, regulatoryFilter } from './constants'
import _ from 'lodash'
import {yesNoOptions} from "../../../../../modules/company-product-info/constants";

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

const CustomGridColumn = styled(GridColumn)`
  display: flex !important;
`

const CustomGrid = styled(Grid)`  
  margin: 14px !important;
    > .row.select-row {
      padding: 1.071428571em 0;
      > .column:first-child {
        padding: 0 0.714285714em 0 0;
      }
       > .column:last-child {
        padding: 0 0 0 0.714285714em;
      }
      > .column label {
        padding-bottom: 0.5em;
        color: #404040;
      }
      > .column .ui.dropdown {
        background-color: #fdfdfd;
        margin-top: 0.5em;
      }
    }
    
    > .row.table-name {
      padding: 1.071428571em 0 0.714285714em 0;
      > .column {
        padding: 0;
        color: #20273a;
      }
    }
    
    > table {
      padding: 0;
      margin: 0 0 1.428571429em 0;
      thead tr {
        th {
          font-size: 1em;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.43;
          letter-spacing: normal;
          color: #848893;
          background-color: #ffffff;
        }
      }
      tbody tr {
        font-size: 1em;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #20273a;
      }
    }
    
    > .row:not(.select-row):not(.table-name) {
      box-shadow: 0 1px 0 0 #dee2e6;
      padding: 16px 0 !important;
      > .column:first-child {
        padding: 0 0.714285714em 0 0;
      }
       > .column:last-child {
        padding: 0 0 0 0.714285714em;
      }
      > .column {
        
      }
    }
  

`



const optionsExpirationTime = [
  { text: '24 h', value: 24, key: 1 }
  // { text: '48 h', value: 48, key: 2 },
  // { text: '3 days', value: 72, key: 3 },
  // { text: '5 days', value: 120, key: 4 }
]
//export default class AddCart extends Component {
class AddCart extends Component {
  state = {
    showMore: false,
    expirationTime: '23:59',
    activeTab: 0,
    offer: null,
    echoProductGroup: echoProductGrouping[0].value,
    regulatoryFilter: regulatoryFilter.all.value,
    casProductIndex: 0
  }
  componentDidMount() {
    // this.props.getProductOffer(this.props.id, this.props.isEdit)
    // if (this.props.isEdit) this.props.getOrderDetail(this.props.orderId)
    this.setState({ offer: this.formatData() }) // Buy tab
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.sidebar.isOpen && !prevProps.sidebar.isOpen) {
      this.setState({ activeTab: 0 }) // Buy tab
    }
    if (this.props.offer !== prevProps.offer) {
      this.setState({ offer: this.formatData() })
    }
  }

  formatData = () => {
    const { offer } = this.props
    const companyProduct = getSafe(() => offer.companyProduct, null)
    const echoProduct = getSafe(() => offer.companyProduct.echoProduct, null)
    return {
      ...offer,
      companyProduct: {
        ...companyProduct,
        echoProduct: {
          ...echoProduct,
          mfrProductCodes: getSafe(() => echoProduct.mfrProductCodes.toString(), ''),
          sdsRevisionDate:
            echoProduct && echoProduct.sdsRevisionDate
              ? moment(echoProduct.sdsRevisionDate).format('MM/DD/YYYY') : ''
        }
      }
    }
  }

  createOrder = async () => {
    if (checkToken(this.props)) return
    const { addCartItem, createHold } = this.props
    let { sidebar } = this.props
    let { pkgAmount, id, isHoldRequest } = sidebar

    try {
      if (isHoldRequest) {
        const holdTime = encodeURIComponent(
          moment()
            .add({ hours: this.state.expirationTime.split(':')[0], minutes: this.state.expirationTime.split(':')[1] })
            .format()
        )
        const params = {
          holdTime,
          pkgAmount,
          productOfferId: id
        }
        await createHold(params)
        this.props.sidebarChanged({ isOpen: false, isHoldRequest: false })
        Router.push('/marketplace/holds')
      } else {
        await addCartItem({ productOffer: id, pkgAmount })
        Router.push('/cart')
      }
    } catch (error) {
      console.error(error)
    }
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
    let { pkgAmount, pricing, warning, isHoldRequest } = this.props.sidebar

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

    let canProceed = !warning && price && pkgAmount > 0 && this.state.expirationTime

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
                  {isHoldRequest ? (
                    <FormattedMessage id='cart.holdRequestInfo' defaultMessage='2. Hold Request Info' />
                  ) : (
                    <FormattedMessage id='cart.PurchaseHeader' defaultMessage='2. Purchase Info' />
                  )}
                </Header>
              </GridColumn>
            </GridRow>

            <CustomList selection>
              <ListHeader>
                <FormattedMessage id='cart.fobPricing' defaultMessage='FOB Pricing:' />
              </ListHeader>
              {dropdownOptions.map((el, i) => (
                <List.Item key={i} active={el.value.price === this.props.sidebar.pricing.price}>
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

            {isHoldRequest ? (
              <GridRow verticalAlign='middle' columns={2}>
                <GridColumn>
                  <FormattedMessage id='global.expirationTime' defaultMessage='Expiration Date:'>
                    {text => text}
                  </FormattedMessage>
                </GridColumn>
                <CustomGridColumn>
                  <Dropdown
                    options={[{ key: 0, text: '24:00', value: this.state.expirationTime }]}
                    selection
                    disabled
                    fluid
                    value={this.state.expirationTime}
                  />
                </CustomGridColumn>
              </GridRow>
            ) : null}

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
                    this.props.sidebarChanged({ isOpen: false, isHoldRequest: false })
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

  renderField = ({ id, defaultMessage, name }) => {
    const { offer } = this.state
    return (
      <GridRow>
        <GridColumn width={7} className='field-name'>
          <FormattedMessage id={id} defaultMessage={defaultMessage} />
        </GridColumn>

        <GridColumn width={9} className='field=value'>
          {_.get(offer, name, 'N/A')}
        </GridColumn>
      </GridRow>
    )
  }

  renderElements = ({ id, defaultMessage, elements }) => {
    return (
      <>
        <GridRow className='table-name'>
          <GridColumn width={16}>
            <FormattedMessage id={id} defaultMessage={defaultMessage} />
          </GridColumn>
        </GridRow>
        <Table celled table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <FormattedMessage id='global.elementName' defaultMessage='Element Name' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id='global.casNumber' defaultMessage='CAS Number' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id='global.assay' defaultMessage='Assay' />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {elements.map((element, index) => (
              <Table.Row>
                <Table.Cell>{element.proprietary ? element.name : element.casProduct.casIndexName}</Table.Cell>
                <Table.Cell>{element.proprietary ? '' : element.casProduct.casNumber}</Table.Cell>
                <Table.Cell>{formatAssay(element.assayMin, element.assayMax)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }

  renderDropdown = ({ id, defaultMessage, name, props }) => {
    const { offer } = this.state
    const value = _.get(offer, name, null)

    let displayValue = 'N/A'
    if (value !== null && props && props.options) {

      const index = props.options.findIndex(el => el.value === value)
      if (index >= 0) {
        displayValue = props.options[index].text
      }
    }

    return (
      <GridRow>
        <GridColumn width={7} className='field-name'>
          <FormattedMessage id={id} defaultMessage={defaultMessage}/>
        </GridColumn>

        <GridColumn width={9} className='field=value'>
          {displayValue}
        </GridColumn>
      </GridRow>
    )
  }
  renderCasProduct = () => {
    const { offer, casProductIndex } = this.state
    let casProducts = getSafe(() => offer.companyProduct.echoProduct.elements, [])
    const prefix = `companyProduct.echoProduct.elements[${casProductIndex}].`

    let markup = [
      this.renderField({
        id: 'global.casIndexName',
        defaultMessage: 'Cas Index Name',
        name: `${prefix}casProduct.casIndexName`
      }),
      this.renderField({
        id: 'global.recommendedUse',
        defaultMessage: 'Recommended Uses',
        name: `${prefix}casProduct.recommendedUses`
      }),
      this.renderField({
        id: 'global.usesAdvisedAgainst',
        defaultMessage: 'Uses Advised Against',
        name: `${prefix}casProduct.usesAdvisedAgainst`
      }),
      this.renderField({
        id: 'global.criticalTemperature',
        defaultMessage: 'Critical Temperature',
        name: `${prefix}casProduct.criticalTemperature`
      }),
      this.renderField({
        id: 'global.gasDensity',
        defaultMessage: 'Gas Density',
        name: `${prefix}casProduct.gasDensity`
      }),
      this.renderField({
        id: 'global.relativeDensity',
        defaultMessage: 'Relative Density',
        name: `${prefix}casProduct.relativeDensity`
      }),
      this.renderField({
        id: 'global.flowTime',
        defaultMessage: 'Flow Time (ISO 2431)',
        name: `${prefix}casProduct.flowTimeIso2431`
      }),
      this.renderField({
        id: 'global.heatOfCombustion',
        defaultMessage: 'Heat of Combustion',
        name: `${prefix}casProduct.heatOfCombustion`
      })
    ]

    let { epa, dhs, /*dot,*/ caProp65, rightToKnow, dea, international, all } = regulatoryFilter
    let dontBreak = this.state.regulatoryFilter === all.key

    switch (this.state.regulatoryFilter) {
      case all.key:
      case epa.key: {
        markup.push(
          this.renderField({
            id: 'casProduct.epaSection302EhsTPQ',
            defaultMessage: 'Section 302 (EHS) TPQ',
            name: `${prefix}casProduct.epaSection302EhsTPQ`
          }),
          /* not in response (swagger 1.0.3-COVID-19.9)
          this.renderDropdown({
            id: 'casProduct.epaSection304EhsRQ',
            defaultMessage: 'Section 304 (EHS) RQ',
            name: `${prefix}casProduct.displayField`
          }),
          */
          this.renderField({
            id: 'casProduct.epaCerclaRq',
            defaultMessage: 'CERCLA RQ',
            name: `${prefix}casProduct.epaCerclaRq`
          }),
          this.renderDropdown({
            id: 'casProduct.epaSection313Tri',
            defaultMessage: 'Section 313 (TRI)',
            name: `${prefix}casProduct.epaSection313Tri`,
            props: yesNoOptions
          }),
          this.renderField({
            id: 'casProduct.epaCaa112TTq',
            defaultMessage: 'CAA 112(r) TQ',
            name: `${prefix}casProduct.epaCaa112TTq`
          }),
          this.renderDropdown({
            id: 'casProduct.epaFifra',
            defaultMessage: 'FIFRA',
            name: `${prefix}casProduct.epaFifra`,
            props: yesNoOptions
          }),
          this.renderField({
            id: 'casProduct.epaTsca',
            defaultMessage: 'TSCA',
            name: `${prefix}casProduct.epaTsca`
          }),
          this.renderDropdown({
            id: 'casProduct.epaTsca12b',
            defaultMessage: 'TSCA 12(b)',
            name: `${prefix}casProduct.epaTsca12b`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.epaSaferChoice',
            defaultMessage: 'Safer Choice',
            name: `${prefix}casProduct.epaSaferChoice`,
            props: yesNoOptions
          })
        )

        if (!dontBreak) break
      }

      case all.key:
      case rightToKnow.key: {
        markup.push(
          this.renderDropdown({
            id: 'casProduct.rtkMassachusettes',
            defaultMessage: 'Massachusettes',
            name: `${prefix}casProduct.rtkMassachusettes`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.rtkNewJersey',
            defaultMessage: 'New Jersey',
            name: `${prefix}casProduct.rtkNewJersey`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.rtkPennslyvania',
            defaultMessage: 'Pennslyvania',
            name: `${prefix}casProduct.rtkPennslyvania`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.rtkIllinois',
            defaultMessage: 'Illinois',
            name: `${prefix}casProduct.rtkIllinois`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.rtkRhodeIsland',
            defaultMessage: 'Rhode Island',
            name: `${prefix}casProduct.rtkRhodeIsland`,
            props: yesNoOptions
          })
        )
        if (!dontBreak) break
      }

      case all.key:
      case dhs.key: {
        markup.push(
          this.renderField({
            id: 'casProduct.dhsReleaseMinimumConcentration',
            defaultMessage: 'Release: Minimum Concentration (%)',
            name: `${prefix}casProduct.dhsReleaseMinimumConcentration`
          }),
          this.renderField({
            id: 'casProduct.dhsReleaseScreeningThresholdQuantitie',
            defaultMessage: 'Release: Screening Threshold Quantitiees (in pounds)',
            name: `${prefix}casProduct.dhsReleaseScreeningThresholdQuantities`
          }),
          this.renderField({
            id: 'casProduct.dhsTheftMinimumConcentration',
            defaultMessage: 'Theft: Minimum Concentration (%)',
            name: `${prefix}casProduct.dhsTheftMinimumConcentration`
          }),
          this.renderField({
            id: 'casProduct.dhsTheftScreeningThresholdQuantities',
            defaultMessage: 'Theft: Screening Threshold Quantitie',
            name: `${prefix}casProduct.dhsTheftScreeningThresholdQuantities`
          }),
          this.renderField({
            id: 'casProduct.dhsSabotageMinimumConcentration',
            defaultMessage: 'Sabotage: Minimum Concentration (%)',
            name: `${prefix}casProduct.dhsSabotageMinimumConcentrationPercent`
          }),
          this.renderField({
            id: 'casProduct.dhsSabotageScreeningThresholdQuantities',
            defaultMessage: 'Sabotage: Screening Threshold Quantities',
            name: `${prefix}casProduct.dhsSabotageScreeningThresholdQuantities`
          }),
          this.renderDropdown({
            id: 'casProduct.dhsSecurityIssueReleaseToxic',
            defaultMessage: 'Security Issue: Release - Toxic',
            name: `${prefix}casProduct.dhsSecurityIssueReleaseToxic`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.dhsSecurityIssueReleaseFlammables',
            defaultMessage: 'Security Issue: Release - Flammables',
            name: `${prefix}casProduct.dhsSecurityIssueReleaseFlammables`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.dhsSecurityIssueReleaseExplosives',
            defaultMessage: 'Security Issue: Release - Explosives',
            name: `${prefix}casProduct.dhsSecurityIssueReleaseExplosives`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.dhsSecurityIssueTheftCWCWP',
            defaultMessage: 'Security Issue: Theft - CW/CWP',
            name: `${prefix}casProduct.dhsSecurityIssueTheftCWCWP`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.dhsSecurityIssueTheftWME',
            defaultMessage: 'Security Issue: Theft - WME',
            name: `${prefix}casProduct.dhsSecurityIssueTheftWME`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.dhsSecurityIssueTheftEXPIEDP',
            defaultMessage: 'Security Issue: Theft - EXP/IEDP',
            name: `${prefix}casProduct.dhsSecurityIssueTheftEXPIEDP`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.dhsSecurityIssueSabotageContamination',
            defaultMessage: 'Security Issue: Sabotage/Contamination',
            name: `${prefix}casProduct.dhsSecurityIssueSabotageContamination`,
            props: yesNoOptions
          })
        )
        if (!dontBreak) break
      }

      case all.key:
      case caProp65.key: {
        markup.push(
          this.renderField({
            id: 'casProduct.caprop65TypeofToxicity',
            defaultMessage: 'Type of Toxicity',
            name: `${prefix}casProduct.caprop65TypeofToxicity`
          }),
          this.renderField({
            id: 'casProduct.caprop65ListingMechanism',
            defaultMessage: 'Listing Mechanism',
            name: `${prefix}casProduct.caprop65ListingMechanism`
          }),
          this.renderField({
            id: 'casProduct.caprop65DateListed',
            defaultMessage: 'Date Listed',
            name: `${prefix}casProduct.caprop65DateListed`
          }),
          this.renderField({
            id: 'casProduct.caprop65NSRLorMADL',
            defaultMessage: 'NSRL or MADL (µg/day)',
            name: `${prefix}casProduct.caprop65NSRLorMADL`
          })
        )

        if (!dontBreak) break
      }

      case all.key:
      case dea.key: {
        markup.push(
          this.renderDropdown({
            id: 'casProduct.deaListII',
            defaultMessage: 'List II',
            name: `${prefix}casProduct.deaListII`,
            props: yesNoOptions
          }),
          this.renderField({
            id: 'casProduct.deaDeaCode',
            defaultMessage: 'DEA Code',
            name: `${prefix}casProduct.deaDeaCode`
          })
        )

        if (!dontBreak) break
      }

      case all.key:
      case international.key: {
        markup.push(
          this.renderDropdown({
            id: 'casProduct.internationalDSL',
            defaultMessage: 'DSL',
            name: `${prefix}casProduct.internationalDSL`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.internationalNDSL',
            defaultMessage: 'NDSL',
            name: `${prefix}casProduct.internationalNDSL`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.internationalEINECS',
            defaultMessage: 'EINECS',
            name: `${prefix}casProduct.internationalEINECS`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.internationalPICCS',
            defaultMessage: 'PICCS',
            name: `${prefix}casProduct.internationalPICCS`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.internationalENCS',
            defaultMessage: 'ENCS',
            name: `${prefix}casProduct.internationalENCS`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.internationalAICS',
            defaultMessage: 'AICS',
            name: `${prefix}casProduct.internationalAICS`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.internationalIECSC',
            defaultMessage: 'IECSC',
            name: `${prefix}casProduct.internationalIECSC`,
            props: yesNoOptions
          }),
          this.renderDropdown({
            id: 'casProduct.internationalKECL',
            defaultMessage: 'KECL',
            name: `${prefix}casProduct.internationalKECL`,
            props: yesNoOptions
          })
        )
        if (!dontBreak) break
      }
    }

    return (
      <>
        <GridRow className='select-row'>
          <GridColumn computer={8}>
            <label>
              <FormattedMessage id='global.casProduct' defaultMessage='CAS Product' />
            </label>
            <Dropdown
              fluid
              selection
              value={this.state.casProductIndex}
              options={casProducts.map((cp, index ) => {
                try {
                  var text = `${cp.casProduct.casNumber} ${cp.casProduct.casIndexName}`
                } catch {
                  var text = cp.displayName
                }
                return {
                  key: index,
                  text: `${text} ${formatAssay(cp.assayMin, cp.assayMax)}`,
                  value: index
                }
              })}
              onChange={(_, data) =>
                this.setState({
                  casProductIndex: data.value
                })
              }
            />
          </GridColumn>

          <GridColumn computer={8}>
            <label>
              <FormattedMessage id='global.propsFilter' defaultMessage='Properties Filter' />
            </label>
            <Dropdown
              fluid
              selection
              value={this.state.regulatoryFilter}
              options={Object.keys(regulatoryFilter).map(key => regulatoryFilter[key])}
              onChange={(_, { value }) => this.setState({ regulatoryFilter: value })}
            />
          </GridColumn>
        </GridRow>
        {markup.map(el => el)}
      </>
    )
  }

  getContent = () => {
    const { activeTab, offer } = this.state
    switch (activeTab) {
      case 0: {
        // Buy
        return this.getCartMarkup()
      }
      case 1: {
        // Info
        return (
          <FlexContent basic>
            <CustomGrid verticalAlign='middle'>
              {this.renderField({
                id: 'global.productName',
                defaultMessage: 'Product Name',
                name: 'companyProduct.echoProduct.name'
              })}
              {this.renderElements({
                id: 'global.mixtures',
                defaultMessage: 'Mixtures',
                elements: getSafe(() => offer.companyProduct.echoProduct.elements, [])
              })}
              {this.renderField({
                id: 'global.manufacturer',
                defaultMessage: 'Manufacturer',
                name: 'companyProduct.echoProduct.manufacturer.name'
              })}
              {this.renderField({
                id: 'global.manufacturerProductCode',
                defaultMessage: 'Manufacturer Product Code',
                name: 'companyProduct.echoProduct.mfrProductCodes'
              })}
              {this.renderField({
                id: 'global.emergencyNumber',
                defaultMessage: 'Emergency Number',
                name: 'companyProduct.echoProduct.emergencyPhone'
              })}
              {/* not in response (swagger 1.0.3-COVID-19.9)
                this.renderField({
                id: 'global.esin',
                defaultMessage: 'ESIN',
                name: 'companyProduct.echoProduct.esin'
              })*/
              }
              {this.renderField({
                id: 'global.recommendedUse',
                defaultMessage: 'Recommended Uses',
                name: 'companyProduct.echoProduct.recommendedUse'
              })}
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.recommendedRestrictions',
                defaultMessage: 'Recommended Restrictions',
                name: 'companyProduct.echoProduct.recommendedRestrictions'
              })*/
              }
              {this.renderField({
                id: 'global.version',
                defaultMessage: 'Version',
                name: 'companyProduct.echoProduct.sdsVersionNumber'
              })}
              {this.renderField({
                id: 'global.revisionDate',
                defaultMessage: 'Revision Date',
                name: 'companyProduct.echoProduct.sdsRevisionDate'
              })}
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.synonyms',
                defaultMessage: 'Synonyms',
                name: 'companyProduct.echoProduct.synonyms'
              })*/}
              {this.renderField({
                id: 'global.formula',
                defaultMessage: 'Formula',
                name: 'companyProduct.echoProduct.molecularFormula'
              })}
              {this.renderField({
                id: 'global.molecularWeight',
                defaultMessage: 'Molecular Weight',
                name: 'companyProduct.echoProduct.molecularWeight'
              })}
            </CustomGrid>
          </FlexContent>
        )
      }
      case 2: {
        // Properties
        const prefix = 'companyProduct.echoProduct.'
        return (
          <FlexContent basic>
            <CustomGrid verticalAlign='middle'>
              {this.renderField({
                id: 'global.physicalState',
                defaultMessage: 'Physical State',
                name: `${prefix}physicalState`
              })}
              {this.renderField({
                id: 'global.appearance',
                defaultMessage: 'Appearance',
                name: `${prefix}appearance`
              })}
              {this.renderField({
                id: 'global.odor',
                defaultMessage: 'Odor',
                name: `${prefix}odor`
              })}
              {this.renderField({
                id: 'global.odorThreshold',
                defaultMessage: 'Odor Threshold',
                name: `${prefix}odorThreshold`
              })}
              {this.renderField({
                id: 'global.ph',
                defaultMessage: 'pH',
                name: `${prefix}ph`
              })}
              {this.renderField({
                id: 'global.meltingPointRange',
                defaultMessage: 'Melting Point/Range',
                name: `${prefix}meltingPointRange`
              })}
              {this.renderField({
                id: 'global.boilingPointRange',
                defaultMessage: 'Boiling Point/Range',
                name: `${prefix}boilingPointRange`
              })}
              {this.renderField({
                id: 'global.flashPoint',
                defaultMessage: 'Flash Point',
                name: `${prefix}flashPoint`
              })}
              {this.renderField({
                id: 'global.evaporationPoint',
                defaultMessage: 'Evaporation Point',
                name: `${prefix}evaporationPoint`
              })}
              {this.renderField({
                id: 'global.flammabilitySolidGas',
                defaultMessage: 'Flammability (solid, gas)',
                name: `${prefix}flammabilitySolidGas`
              })}
              {this.renderField({
                id: 'global.flammabilityOrExplosiveUpper',
                defaultMessage: 'Flammability or Explosive Upper',
                name: `${prefix}flammabilityOrExplosiveUpper`
              })}
              {this.renderField({
                id: 'global.flammabilityOrExplosiveLower',
                defaultMessage: 'Flammability or Explosive Lower',
                name: `${prefix}flammabilityOrExplosiveLower`
              })}
              {this.renderField({
                id: 'global.vaporPressure',
                defaultMessage: 'Vapor Pressure',
                name: `${prefix}vaporPressure`
              })}
              {this.renderField({
                id: 'global.vaporDensity',
                defaultMessage: 'Vapor Density',
                name: `${prefix}vaporDensity`
              })}
              {/* {this.renderField({ id: 'global.specificGravity', defaultMessage: 'Specific Gravity', name: `${prefix}specificGravity` })} */}
              {this.renderField({
                id: 'global.solubility',
                defaultMessage: 'Solubility',
                name: `${prefix}solubility`
              })}
              {this.renderField({
                id: 'global.partitionCoefficient',
                defaultMessage: 'Partition Coefficient',
                name: `${prefix}partitionCoefficient`
              })}
              {this.renderField({
                id: 'global.autoIgnitionTemperature',
                defaultMessage: 'Auto Ignition Temperature',
                name: `${prefix}autoIgnitionTemperature`
              })}
              {this.renderField({
                id: 'global.decompositionTemperature',
                defaultMessage: 'Decomposition Temperature',
                name: `${prefix}decompositionTemperature`
              })}
              {this.renderField({
                id: 'global.viscosity',
                defaultMessage: 'Viscosity',
                name: `${prefix}viscosity`
              })}
              {this.renderField({
                id: 'global.molecularFormula',
                defaultMessage: 'Molecular Formula',
                name: `${prefix}molecularFormula`
              })}
              {this.renderField({
                id: 'global.molecularWeight',
                defaultMessage: 'Molecular Weight',
                name: `${prefix}molecularWeight`
              })}
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.specificVolume',
                defaultMessage: 'Specific Volume',
                name: `${prefix}specificVolume`
              })*/
              }
              {this.renderField({
                id: 'global.recommendedUse',
                defaultMessage: 'Recommended Uses',
                name: `${prefix}recommendedUse`
              })}
              {this.renderField({
                id: 'global.usesAdvisedAgainst',
                defaultMessage: 'Uses Advised Against',
                name: `${prefix}usesAdvisedAgainst`
              })}
            </CustomGrid>
          </FlexContent>
        )
      }
      case 3: {
        // Regulatory
        return (
          <FlexContent basic>
            <CustomGrid verticalAlign='middle'>
              {this.renderCasProduct()}
            </CustomGrid>
          </FlexContent>
        )
      }
      case 4: {
        // Transportation
        const prefix = 'companyProduct.echoProduct.'
        return (
          <FlexContent basic>
            <CustomGrid verticalAlign='middle'>
              <GridRow className='select-row'>
                <GridColumn computer={8}>
                  <label>
                    <FormattedMessage id='global.filter' defaultMessage='Filter' />
                  </label>
                </GridColumn>
                <GridColumn computer={8}>
                  <Dropdown
                    selection
                    fluid
                    options={echoProductGrouping}
                    value={this.state.echoProductGroup}
                    onChange={(_, { value }) => this.setState({ echoProductGroup: value })}
                  />
                </GridColumn>
              </GridRow>
              {this.renderField({
                id: 'global.unNumber',
                defaultMessage: 'UN Number',
                name: `${prefix}${this.state.echoProductGroup}UnNumber.unNumberCode`
              })}
              {this.renderField({
                id: 'global.properShippingName',
                defaultMessage: 'Proper Shipping Name',
                name: `${prefix}${this.state.echoProductGroup}ProperShippingName`
              })}
              {this.renderField({
                id: 'global.properTechnicalName',
                defaultMessage: 'Proper Technical Name',
                name: `${prefix}${this.state.echoProductGroup}ProperTechnicalName`
              })}
              {this.renderField({
                id: 'global.hazardClass',
                defaultMessage: 'Hazard Class',
                name: `${prefix}${this.state.echoProductGroup}HazardClass.classCode`
              })}
              {this.renderField({
                id: 'global.packagingGroup',
                defaultMessage: 'Packaging Group',
                name: `${prefix}${this.state.echoProductGroup}PackagingGroup.groupCode`
              })}
              {this.renderField({
                id: 'global.reportableQuantity',
                defaultMessage: 'Reportable Quantity',
                name: `${prefix}${this.state.echoProductGroup}ReportableQuantity`
              })}
              {this.renderField({
                id: 'global.enviromentalHazards',
                defaultMessage: 'Enviromental Hazards',
                name: `${prefix}${this.state.echoProductGroup}HazardLabel`  // ? (EnviromentalHazards)
              })}
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.emsNumbers',
                defaultMessage: 'Ems Numbers',
                name: `${prefix}${this.state.echoProductGroup}EmsNumbers`
              })*/
              }
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.exceptions',
                defaultMessage: 'Exceptions',
                name: `${prefix}${this.state.echoProductGroup}Exceptions`
              })*/}
              {this.renderField({
                id: 'global.specialPrecautionForUser',
                defaultMessage: 'Special Precautions For User',
                name: `${prefix}precautionaryStatements`  // ? (SpecialPrecautionsForUser)
              })}
              {this.renderField({
                id: 'global.marinePollutant',
                defaultMessage: 'Marine Pollutant',
                name: `${prefix}${this.state.echoProductGroup}MarinePollutant`
              })}
              {this.renderField({
                id: 'global.severeMarinePollutant',
                defaultMessage: 'Severe Marine Pollutant',
                name: `${prefix}${this.state.echoProductGroup}SevereMarinePollutant`
              })}
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.packagingExceptions',
                defaultMessage: 'Packaging Exceptions',
                name: `${prefix}${this.state.echoProductGroup}PackagingExceptions`
              })*/
              }
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.packagingNonBulk',
                defaultMessage: 'Packaging Non Bulk',
                name: `${prefix}${this.state.echoProductGroup}PackagingNonBulk`
              })*/
              }
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.packagingBulk',
                defaultMessage: 'Packaging Bulk',
                name: `${prefix}${this.state.echoProductGroup}PackagingBulk`
              })*/}
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.quantityLimitationsPassengerAircraftRail',
                defaultMessage: 'Quantity Limitations Passenger Aircraft/Rail',
                name: `${prefix}${this.state.echoProductGroup}QuantityLimitationsPassengerAircraftRail`
              })*/
              }
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.quantityLimitationsCargoAircraftOnly',
                defaultMessage: 'Quantity Limitations Cargo Aircraft Only',
                name: `${prefix}${this.state.echoProductGroup}QuantityLimitationsCargoAircraftOnly`
              })*/
              }
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.vesselStowageLocation',
                defaultMessage: 'Vessel Stowage Location',
                name: `${prefix}${this.state.echoProductGroup}VesselStowageLocation`
              })*/
              }
              {/* not in response (swagger 1.0.3-COVID-19.9)
              this.renderField({
                id: 'global.vesselStowageOther',
                defaultMessage: 'Vessel Stowage Other',
                name: `${prefix}${this.state.echoProductGroup}VesselStowageOther`
              })*/}
            </CustomGrid>
          </FlexContent>
        )
      }
    }
  }

  render() {
    let { sidebar, isEdit, orderDetailIsFetching, offerDetailIsFetching } = this.props
    const {
      sidebarChanged,
      intl: { formatMessage },
    } = this.props
    const { activeTab } = this.state
    let { isOpen } = sidebar
    return (
      <Sidebar
        onHide={e => {
          try {
            if (
              (e &&
                !(e.path[0] instanceof HTMLTableCellElement) &&
                !(e.path[1] instanceof HTMLTableCellElement) &&
                e.target &&
                e.target.className &&
                typeof e.target.className.includes !== 'undefined' &&
                e.target.className.includes('js-focus-visible')) ||
              (e &&
                e.target &&
                e.target.className &&
                typeof e.target.className.includes !== 'undefined' &&
                !(e.target.className.includes('item') || e.target.className.includes('text'))) ||
              !(e.target.nodeName === 'svg' || e.target.nodeName === 'circle' || e.target.nodeName === 'SPAN')
            ) {
              sidebarChanged({ isOpen: false, isHoldRequest: false })
            }
          } catch (e) {
            console.error(e)
          }
        }}
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
          <>
            <Menu pointing secondary>
              {tabsMarketPlace.map((tab, i) =>
                <Menu.Item onClick={() => this.setState({ activeTab: i })} active={activeTab === i}>
                  {formatMessage(tab.text)}
                </Menu.Item>
              )}
            </Menu>
            {this.getContent()}
          </>
        )}
      </Sidebar>
    )
  }
}

AddCart.propTypes = {
  offer: object,
  order: object,
  postNewOrder: func
  // id: number,
  // pkgAmount: number,
  // pricing: object,
  // warning: string
}

export default injectIntl(AddCart)