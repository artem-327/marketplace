import React, { Component } from 'react'
import { array, string, func } from 'prop-types'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { Grid, GridRow, GridColumn, Header, Divider, Segment, Button } from 'semantic-ui-react'

import './styles.scss'
import { RelaxedRow, HeaderTextRow, WiderPopup, CustomSpan, CustomHeader } from './styledComponents'
import { FormattedUnit, ArrayToMultiple } from '~/components/formatted-messages'
import { Form, Input, Checkbox, Dropdown } from 'formik-semantic-ui-fixed-validation'

import { withToastManager } from 'react-toast-notifications'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import * as Yup from 'yup'
import { currency } from '~/constants/index'
import {
  getPackagingGroupsDataRequest,
  getHazardClassesDataRequest,
  getUnNumbersByString,
  addUnNumber
} from '~/modules/admin/actions'
import { getCart } from '~/modules/purchase-order/actions'
import { getNmfcNumbersByString, addNmfcNumber } from '~/modules/settings/actions'
import { generateToastMarkup, getSafe, getFloatOrNull, getIntOrNull } from '~/utils/functions'
import { freightClassValidation } from '~/constants/yupValidation'

const validationSchema = Yup.object().shape({
  freightClass: freightClassValidation()
})

class CartItemSummary extends Component {
  state = {
    edittingHazmatInfo: false,
    loadCartRequired: false,
    nmfcNumberInitOptions: [],
    unNumberInitOptions: []
  }

  async componentDidMount() {
    const { hazardClasses, packagingGroups, getHazardClassesDataRequest, getPackagingGroupsDataRequest } = this.props

    if (hazardClasses.length === 0) getHazardClassesDataRequest()
    if (packagingGroups.length === 0) getPackagingGroupsDataRequest()
  }

  onHazmatPopup = async item => {
    let option,
      nmfcNumbers = []

    option = getSafe(() => item.cfNmfcNumber, null)
    if (option) nmfcNumbers.push(option)
    option = getSafe(() => item.productOffer.companyProduct.nmfcNumber, null)
    if (nmfcNumbers && option && nmfcNumbers[0].id !== option.id) nmfcNumbers.push(option)

    let unNumbers = []
    option = getSafe(() => item.cfUnNumber, null)
    if (option) unNumbers.push(option)
    option = getSafe(() => item.productOffer.companyProduct.echoProduct.cfUnNumber, null)
    if (unNumbers && option && unNumbers[0].id !== option.id) unNumbers.push(option)

    nmfcNumbers = nmfcNumbers.map(d => {
      return {
        key: d.id,
        text: d.code,
        value: d.id,
        content: <Header content={d.code} subheader={d.description} style={{ fontSize: '1em' }} />
      }
    })

    unNumbers = unNumbers.map(d => {
      return {
        key: d.id,
        text: d.unNumberCode,
        value: d.id,
        content: <Header content={d.unNumberCode} subheader={d.description} style={{ fontSize: '1em' }} />
      }
    })

    this.setState({ nmfcNumberInitOptions: nmfcNumbers, unNumberInitOptions: unNumbers })
  }

  handleUnNumberChange = debounce((_, { searchQuery }) => {
    this.props.getUnNumbersByString(searchQuery)
  }, 250)

  handleSearchNmfcNumberChange = debounce(searchQuery => {
    this.props.getNmfcNumbersByString(searchQuery)
  }, 250)

  hazmatMarkup = item => {
    const {
      intl: { formatMessage },
      hazardClasses,
      packagingGroups,
      unNumbersFiltered,
      unNumbersFetching,
      updateHazmatInfo,
      toastManager,
      nmfcNumbersFetching,
      nmfcNumbersFiltered
    } = this.props
    let {
      productOffer: { companyProduct }
    } = item

    let initialValues = {
      unNumber: getSafe(
        () => item.cfUnNumber.id,
        getSafe(() => companyProduct.echoProduct.cfUnNumber.id, null)
      ),
      packagingGroup: getSafe(
        () => item.cfPackagingGroup.id,
        getSafe(() => companyProduct.echoProduct.cfPackagingGroup.id, null)
      ),
      hazardClass: getSafe(
        () => item.cfHazardClass.id,
        getSafe(() => companyProduct.echoProduct.cfHazardClass.id, null)
      ),
      freightClass: getSafe(
        () => item.cfFreightClass,
        getSafe(() => companyProduct.freightClass, '')
      ),
      nmfcNumber: getSafe(
        () => item.cfNmfcNumber.id,
        getSafe(() => companyProduct.nmfcNumber.id, null)
      ),
      stackable: getSafe(() => item.stackable, companyProduct.stackable || false)
    }

    let disabled = !this.state.edittingHazmatInfo

    let unNumberOptions = [...this.state.unNumberInitOptions, ...unNumbersFiltered].filter(
      (v, i, a) => a.findIndex(t => t.key === v.key) === i
    )
    let nmfcNumberOptions = [...this.state.nmfcNumberInitOptions, ...nmfcNumbersFiltered].filter(
      (v, i, a) => a.findIndex(t => t.key === v.key) === i
    )

    return (
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            this.setState({ edittingHazmatInfo: false })
            await updateHazmatInfo(item.id, {
              unNumber: getIntOrNull(values.unNumber),
              packagingGroup: getIntOrNull(values.packagingGroup),
              hazardClass: getIntOrNull(values.hazardClass),
              freightClass: getFloatOrNull(values.freightClass),
              nmfcNumber: getIntOrNull(values.nmfcNumber),
              stackable: values.stackable
            })
            this.setState({ loadCartRequired: true })
            toastManager.add(
              generateToastMarkup(
                <FormattedMessage
                  id='notifications.hazardInfoUpdated.header'
                  defaultMessage={`Hazardous informations for ${item.productOffer.tradeName} updated`}
                  values={{ name: item.productOffer.tradeName }}
                />,
                <FormattedMessage
                  id='notifications.hazardInfoUpdated.content'
                  defaultMessage='Hazardous informations successfully updated'
                />
              ),
              { appearance: 'success' }
            )
          } catch (e) {
            console.error(e)
          } finally {
            setSubmitting(false)
          }
        }}
        children={({ handleSubmit, errors }) => (
          <Segment basic>
            <Grid verticalAlign='middle'>
              <GridRow>
                <GridColumn computer={12}>
                  <CustomHeader as='h2'>
                    <FormattedMessage id='cart.hazmatInfo' defaultMessage='Hazmat Information' />
                  </CustomHeader>
                </GridColumn>

                <GridColumn computer={4}>
                  <CustomSpan
                    positive={this.state.edittingHazmatInfo}
                    onClick={() => {
                      if (this.state.edittingHazmatInfo) handleSubmit()
                      else this.setState({ edittingHazmatInfo: !this.state.edittingHazmatInfo })
                    }}
                    data-test='shopping_cart_hazmat'>
                    <FormattedMessage id={`global.${this.state.edittingHazmatInfo ? 'save' : 'edit'}`}>
                      {text => text}
                    </FormattedMessage>
                  </CustomSpan>
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn data-test='shopping_cart_unNumber_inp'>
                  <Dropdown
                    options={unNumberOptions}
                    inputProps={{
                      loading: unNumbersFetching,
                      disabled,
                      clearable: true,
                      search: true,
                      selection: true,
                      onSearchChange: this.handleUnNumberChange
                    }}
                    name='unNumber'
                    label={formatMessage({ id: 'global.unNumber', defaultMessage: 'UN Number' })}
                  />
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn data-test='shopping_cart_packagingGroup_inp'>
                  <Dropdown
                    options={packagingGroups.map(grp => ({
                      key: grp.id,
                      value: grp.id,
                      text: grp.groupCode
                    }))}
                    inputProps={{
                      disabled,
                      clearable: true,
                      selection: true,
                      search: true
                    }}
                    name='packagingGroup'
                    label={formatMessage({ id: 'cart.packagingGroup', defaultMessage: 'Packaging Group' })}
                  />
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn data-test='shopping_cart_hazardClass_inp'>
                  <Dropdown
                    options={hazardClasses.map(hazardClass => ({
                      key: hazardClass.id,
                      value: hazardClass.id,
                      text: `${hazardClass.classCode} - ${hazardClass.description}`
                    }))}
                    inputProps={{ disabled, search: true, clearable: true }}
                    name='hazardClass'
                    label={formatMessage({ id: 'cart.hazardClass', defaultMessage: 'Hazard Class' })}
                  />
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn data-test='shopping_cart_freightClass_inp'>
                  <Input
                    inputProps={{ disabled }}
                    name='freightClass'
                    label={formatMessage({ id: 'cart.freightClass', defaultMessage: 'Freight Class' })}
                  />
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn data-test='shopping_cart_nmfcNumber_inp'>
                  <Dropdown
                    label={
                      <FormattedMessage id='cart.nmfcNumber' defaultMessage='NMFC Number'>
                        {text => text}
                      </FormattedMessage>
                    }
                    options={nmfcNumberOptions}
                    inputProps={{
                      disabled,
                      fluid: true,
                      search: val => val,
                      clearable: true,
                      selection: true,
                      loading: nmfcNumbersFetching,
                      onSearchChange: (_, { searchQuery }) => this.handleSearchNmfcNumberChange(searchQuery)
                    }}
                    name='nmfcNumber'
                  />
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn>
                  <Checkbox
                    inputProps={{ disabled, 'data-test': 'shopping_cart_stackable_chckb' }}
                    name='stackable'
                    label={formatMessage({ id: 'cart.stackable', defaultMessage: 'Stackable' })}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>
        )}
      />
    )
  }

  renderItem = ({ item, lastChild }) => {
    let { productOffer } = item
    let { deleteCart } = this.props
    // let currency = this.props.currency
    
    return (
      <>
        <GridColumn computer={16}>
          <Grid columns={2} className='light-gray cart-item-summary' style={{ fontSize: '16px' }}>
            <HeaderTextRow>
              <GridColumn>
                {/* {productOffer.companyProduct.intProductCode + ' ' + productOffer.companyProduct.intProductName} */}
                {productOffer.companyProduct.echoProduct.name}
              </GridColumn>

              <GridColumn floated='right'>
                <span
                  className='headerAddtext'
                  onClick={() => deleteCart(item.id)}
                  data-test={`shopping_cart_remove_${item.id}_btn`}>
                  <FormattedMessage id='global.remove' defaultMessage='Remove'>
                    {text => text}
                  </FormattedMessage>
                </span>
              </GridColumn>
            </HeaderTextRow>

            {/* <RelaxedRow>
              <GridColumn>
                <FormattedMessage id='global.mixtures' defaultMessage='Mixtures' />
              </GridColumn>

              <GridColumn floated='right'>
                <ArrayToMultiple
                  values={productOffer.companyProduct.echoProduct.elements.map(d => {
                    return d.proprietary ? d.displayName : d.displayName + ' - ' + d.casProduct.casNumber
                  })}
                />
              </GridColumn>
            </RelaxedRow> */}

            <RelaxedRow>
              <GridColumn>
                <FormattedMessage id='global.location' defaultMessage='Location' />
              </GridColumn>

              <GridColumn floated='right'>{item.locationStr}</GridColumn>
            </RelaxedRow>

            <RelaxedRow columns={2}>
              <GridColumn>
                <FormattedMessage id='cart.shipingInformation' defaultMessage='Shipping Information' />
              </GridColumn>
              <GridColumn floated='right'>
                <WiderPopup
                  wide
                  onOpen={() => this.onHazmatPopup(item)}
                  onClose={() => {
                    if (this.state.loadCartRequired) this.props.getCart()
                    this.setState({ edittingHazmatInfo: false, loadCartRequired: false })
                  }}
                  position='left center'
                  on='click'
                  trigger={<Button type='button' size='mini' color='blue' content='Edit' />}
                  content={this.hazmatMarkup(item)}
                />
              </GridColumn>
            </RelaxedRow>

            <RelaxedRow columns={2}>
              <GridColumn>
                <FormattedMessage id='global.packages' defaultMessage='Packages' />
              </GridColumn>

              <GridColumn>
                <FormattedNumber minimumFractionDigits={0} value={item.pkgAmount} /> x{' '}
                {item.productOffer.companyProduct.packagingSize}{' '}
                {item.productOffer.companyProduct.packagingUnit.nameAbbreviation}{' '}
                {item.productOffer.companyProduct.packagingType.name}
              </GridColumn>
            </RelaxedRow>

            <RelaxedRow>
              <GridColumn>
                <FormattedMessage id='global.quantity' defaultMessage='Quantity' />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedUnit
                  unit={item.productOffer.companyProduct.packagingUnit.nameAbbreviation}
                  separator=' '
                  value={item.pkgAmount * item.productOffer.companyProduct.packagingSize}
                />
              </GridColumn>
            </RelaxedRow>

            {/* <RelaxedRow>
              <GridColumn>
                <FormattedMessage id='global.weight' defaultMessage='Weight' />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedUnit
                  separator=''
                  unit={productOffer.companyProduct.packagingUnit.nameAbbreviation}
                  value={item.pkgAmount * productOffer.companyProduct.packagingSize}
                />
              </GridColumn>
            </RelaxedRow> */}

            <RelaxedRow>
              <GridColumn>
                <FormattedMessage id='global.fobPrice' defaultMessage='!FOB Price' />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedNumber style='currency' currency={currency} id='cart.packs' value={item.cfPricePerUOM} /> /{' '}
                {productOffer.companyProduct.packagingUnit.nameAbbreviation}
              </GridColumn>
            </RelaxedRow>

            <HeaderTextRow>
              <GridColumn>
                <FormattedMessage id='cart.productTotal' defaultMessage='Product Total' />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedNumber style='currency' currency={currency} value={item.cfPriceSubtotal} />
              </GridColumn>
            </HeaderTextRow>

            {!lastChild ? <Divider /> : null}
          </Grid>
        </GridColumn>
      </>
    )
  }

  render() {
    let { cartItems, header } = this.props

    return (
      <Segment>
        <Grid className='bottom-padded'>
          <GridRow className='header'>
            <GridColumn>
              <Header>{header}</Header>
            </GridColumn>
          </GridRow>
          {cartItems.map((item, i) => this.renderItem({ item, i, lastChild: cartItems.length - 1 === i }))}
        </Grid>
      </Segment>
    )
  }
}

CartItemSummary.propTypes = {
  cartItems: array,
  deleteCart: func,
  header: string
  // currency: string
}

CartItemSummary.defaultProps = {
  header: <FormattedMessage id='cart.yourOrder' defaultMessage='YOUR ORDER' />
  // currency: 'USD'
}

export default withToastManager(
  connect(
    ({
      admin: { packagingGroups, hazardClasses, unNumbersFiltered, unNumbersFetching },
      settings: { nmfcNumbersFetching, nmfcNumbersFiltered }
    }) => ({
      packagingGroups,
      hazardClasses,
      unNumbersFiltered: unNumbersFiltered.map(d => {
        return {
          key: d.id,
          text: d.unNumberCode,
          value: d.id,
          content: <Header content={d.unNumberCode} subheader={d.description} style={{ fontSize: '1em' }} />
        }
      }),
      unNumbersFetching,
      nmfcNumbersFetching,
      nmfcNumbersFiltered: nmfcNumbersFiltered.map(d => {
        return {
          key: d.id,
          text: d.code,
          value: d.id,
          content: <Header content={d.code} subheader={d.description} style={{ fontSize: '1em' }} />
        }
      })
    }),

    {
      getHazardClassesDataRequest,
      getPackagingGroupsDataRequest,
      getUnNumbersByString,
      addUnNumber,
      getNmfcNumbersByString,
      addNmfcNumber,
      getCart
    }
  )(injectIntl(CartItemSummary))
)
