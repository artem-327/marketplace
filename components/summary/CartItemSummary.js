import React, { Component } from 'react'
import { array, string, func } from 'prop-types'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { Grid, GridRow, GridColumn, Header, Divider, Segment, Icon, Popup, List, Label } from 'semantic-ui-react'

import './styles.scss'
import { RelaxedRow, HeaderTextRow, WiderPopup, CustomSpan, CustomHeader } from './styledComponents'
import { FormattedUnit, ArrayToMultiple } from '~/components/formatted-messages'
import { Form, Input, Checkbox, Dropdown } from 'formik-semantic-ui-fixed-validation'

import { withToastManager } from 'react-toast-notifications'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import * as Yup from 'yup'
import { currency } from '~/constants/index'
import { getPackagingGroupsDataRequest, getHazardClassesDataRequest, getUnNumbersByString, addUnNumber } from '~/modules/admin/actions'
import { getNmfcNumbersByString, addNmfcNumber } from '~/modules/settings/actions'
import { generateToastMarkup, getSafe, getFloatOrNull, getIntOrNull } from '~/utils/functions'
import { nmfcValidation, freightClassValidation } from '~/constants/yupValidation'

const validationSchema = Yup.object().shape({
  freightClass: freightClassValidation()
})


class CartItemSummary extends Component {

  state = {
    edittingHazmatInfo: false
  }

  async componentDidMount() {
    const {
      hazardClasses, packagingGroups, cartItems,
      getHazardClassesDataRequest, getPackagingGroupsDataRequest, addUnNumber } = this.props

    /* ! ! moved to onHazmatPopup() to reload every time popup is open
    let initialUnNumbers = []

    cartItems.forEach(item => {
      let unNumber = getSafe(() => item.unNumber)
      if (unNumber && !initialUnNumbers.find((num) => num.id === unNumber.id)) {
        initialUnNumbers.push(unNumber)
      }
    })

    if (initialUnNumbers.length !== 0) await addUnNumber(initialUnNumbers)
    */
    if (hazardClasses.length === 0) getHazardClassesDataRequest()
    if (packagingGroups.length === 0) getPackagingGroupsDataRequest()
  }

  onHazmatPopup = async (item) => {
    const { addUnNumber, addNmfcNumber } = this.props

    let nmfcNumber = getSafe(() => item.nmfcNumber, getSafe(() => item.productOffer.companyProduct.nmfcNumber, null))
    let unNumber = getSafe(() => item.unNumber)

    if (nmfcNumber) await addNmfcNumber([nmfcNumber])
    if (unNumber) await addUnNumber([unNumber])
  }

  handleUnNumberChange = debounce((_, { searchQuery }) => {
    this.props.getUnNumbersByString(searchQuery)
  }, 250)

  handleSearchNmfcNumberChange = debounce(searchQuery => {
    this.props.getNmfcNumbersByString(searchQuery)
  }, 250)

  hazmatMarkup = (item) => {
    const {
      intl: { formatMessage }, hazardClasses,
      packagingGroups, unNumbersFiltered,
      unNumbersFetching, updateHazmatInfo,
      toastManager,
      nmfcNumbersFetching, nmfcNumbersFiltered
    } = this.props
    let { productOffer: { companyProduct } } = item

    let initialValues = {
      unNumber: getSafe(() => item.unNumber.id, companyProduct.echoProduct.cfUnNumber),
      packagingGroup: getSafe(() => item.packagingGroup.id, companyProduct.cfPackagingGroup),
      hazardClass: getSafe(() => item.hazardClass.id, companyProduct.echoProduct.cfHazardClass),
      // item.hazardClasses ? item.hazardClasses.map((c) => c.id) : companyProduct.hazardClasses.map((hazardClass) => hazardClass.id),
      freightClass: getSafe(() => item.freightClass, companyProduct.freightClass || ''),
      nmfcNumber: getSafe(() => item.nmfcNumber.id, getSafe(() => companyProduct.nmfcNumber.id, null)),
      stackable: getSafe(() => item.stackable, companyProduct.stackable || false),
    }

    let disabled = !this.state.edittingHazmatInfo

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
            toastManager.add(generateToastMarkup(
              <FormattedMessage
                id='notifications.hazardInfoUpdated.header'
                defaultMessage={`Hazardous informations for ${item.productOffer.tradeName} updated`}
                values={{ name: item.productOffer.tradeName }} />,
              <FormattedMessage
                id='notifications.hazardInfoUpdated.content'
                defaultMessage='Hazardous informations successfully updated'
              />
            ), { appearance: 'success' })
          }
          catch (e) { console.error(e) }
          finally { setSubmitting(false) }

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
                  <CustomSpan positive={this.state.edittingHazmatInfo}
                    onClick={() => {
                      if (this.state.edittingHazmatInfo) handleSubmit()
                      else this.setState({ edittingHazmatInfo: !this.state.edittingHazmatInfo })
                    }}
                    data-test='shopping_cart_hazmat'>
                    <FormattedMessage id={`global.${this.state.edittingHazmatInfo ? 'save' : 'edit'}`}>{(text) => text}</FormattedMessage>
                  </CustomSpan>
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn data-test='shopping_cart_unNumber_inp'>
                  <Dropdown
                    options={unNumbersFiltered.map((num) => ({
                      id: num.id,
                      value: num.id,
                      text: num.unNumberCode
                    }))}
                    inputProps={{
                      loading: unNumbersFetching,
                      disabled,
                      clearable: true,
                      search: true,
                      selection: true,
                      onSearchChange: this.handleUnNumberChange
                    }}
                    name='unNumber'
                    label={formatMessage({ id: 'global.unNumber', defaultMessage: 'UN Number' })} />
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn data-test='shopping_cart_packagingGroup_inp'>
                  <Dropdown
                    options={packagingGroups.map((grp) => ({
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
                    label={formatMessage({ id: 'cart.packagingGroup', defaultMessage: 'Packaging Group' })} />
                </GridColumn>
              </GridRow>


              <GridRow>
                <GridColumn data-test='shopping_cart_hazardClass_inp'>
                  <Dropdown
                    options={hazardClasses.map((hazardClass) => ({
                      key: hazardClass.id,
                      value: hazardClass.id,
                      text: `${hazardClass.classCode} - ${hazardClass.description}`
                    }))}
                    inputProps={{ disabled, search: true, clearable: true }}
                    name='hazardClass' label={formatMessage({ id: 'cart.hazardClass', defaultMessage: 'Hazard Class' })} />
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn data-test='shopping_cart_freightClass_inp'>
                  <Input inputProps={{ disabled }} name='freightClass' label={formatMessage({ id: 'cart.freightClass', defaultMessage: 'Freight Class' })} />
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn data-test='shopping_cart_nmfcNumber_inp'>
                  <Dropdown
                    label={<FormattedMessage id='cart.nmfcNumber' defaultMessage='NMFC Number'>{text => text}</FormattedMessage>}
                    options={nmfcNumbersFiltered}
                    inputProps={{
                      disabled,
                      fluid: true,
                      search: (val) => val,
                      clearable: true, selection: true,
                      loading: nmfcNumbersFetching,
                      onSearchChange: (_, { searchQuery }) => this.handleSearchNmfcNumberChange(searchQuery)
                    }}
                    name='nmfcNumber'
                  />
                </GridColumn>
              </GridRow>


              <GridRow>
                <GridColumn>
                  <Checkbox inputProps={{ disabled, 'data-test': 'shopping_cart_stackable_chckb' }} name='stackable' label={formatMessage({ id: 'cart.stackable', defaultMessage: 'Stackable' })} />
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
          <Grid columns={2} className='light-gray cart-item-summary'>
            <HeaderTextRow>
              <GridColumn>
                {productOffer.companyProduct.intProductCode + ' ' + productOffer.companyProduct.intProductName}
              </GridColumn>

              <GridColumn floated='right'>
                <span
                  className='headerAddtext'
                  onClick={() => deleteCart(item.id)}
                  data-test={`shopping_cart_remove_${item.id}_btn`}>
                  <FormattedMessage id='global.remove' defaultMessage='Remove'>{(text) => text}</FormattedMessage>
                </span>
              </GridColumn>
            </HeaderTextRow>

            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.mixtures'
                  defaultMessage='Mixtures'
                />
              </GridColumn>

              <GridColumn floated='right'>
                <ArrayToMultiple values={
                  productOffer.companyProduct.echoProduct.elements.map(d => {
                    return d.proprietary
                      ? d.displayName
                      : d.displayName + ' - ' + d.casProduct.casNumber
                  })
                } />
              </GridColumn>
            </RelaxedRow>

            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.location'
                  defaultMessage='Location'
                />
              </GridColumn>

              <GridColumn floated='right'>
                {item.locationStr}
              </GridColumn>
            </RelaxedRow>

            <RelaxedRow columns={2}>
              <GridColumn>
                <FormattedMessage id='cart.hazmatInfo' defaultMessage='Hazmat Information' />
              </GridColumn>

              <WiderPopup
                wide
                onOpen={() => this.onHazmatPopup(item)}
                onClose={() => this.setState({ edittingHazmatInfo: false })}
                position='left center'
                on='click'
                trigger={
                  <GridColumn floated='right'><Icon name='info circle' color='blue' /></GridColumn>
                }
                content={this.hazmatMarkup(item)} />

            </RelaxedRow>



            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.quantity'
                  defaultMessage='Quantity'
                />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedUnit
                  unit={productOffer.companyProduct.packagingType.name}
                  separator=' '
                  value={item.pkgAmount}
                />
              </GridColumn>
            </RelaxedRow>



            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.weight'
                  defaultMessage='Weight'
                />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedUnit
                  separator=''
                  unit={productOffer.companyProduct.packagingUnit.nameAbbreviation}
                  value={item.pkgAmount * productOffer.companyProduct.packagingSize}
                />
              </GridColumn>
            </RelaxedRow>


            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.pricePer'
                  values={{ unit: productOffer.companyProduct.packagingUnit.nameAbbreviation }}
                />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedNumber
                  style='currency'
                  currency={currency}
                  id='cart.packs'
                  value={item.cfPricePerUOM}
                />
              </GridColumn>
            </RelaxedRow>


            <HeaderTextRow>
              <GridColumn>
                <FormattedMessage
                  id='cart.productTotal'
                  defaultMessage='Product Total'
                />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedNumber
                  style='currency'
                  currency={currency}
                  value={item.cfPriceSubtotal}
                />
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
          {
            cartItems.map((item, i) => this.renderItem({ item, i, lastChild: (cartItems.length - 1) === i }))
          }

        </Grid>

      </Segment>
    )
  }
}


CartItemSummary.propTypes = {
  cartItems: array,
  deleteCart: func,
  header: string,
  // currency: string
}

CartItemSummary.defaultProps = {
  header: <FormattedMessage id='cart.yourOrder' defaultMessage='YOUR ORDER' />,
  // currency: 'USD'
}


export default withToastManager(connect(
  ({
     admin: { packagingGroups, hazardClasses, unNumbersFiltered, unNumbersFetching },
    settings: { nmfcNumbersFetching, nmfcNumbersFiltered }

   }) =>
  ({
    packagingGroups, hazardClasses, unNumbersFiltered, unNumbersFetching,
    nmfcNumbersFetching, nmfcNumbersFiltered : nmfcNumbersFiltered.map(d => {
      return {
        key: d.id,
        text: d.code,
        value: d.id,
        content: <>
          <strong>{d.code}</strong>
          <div>{d.description}</div>
        </>
      }
    })
  })

  ,
  { getHazardClassesDataRequest, getPackagingGroupsDataRequest, getUnNumbersByString, addUnNumber,
    getNmfcNumbersByString, addNmfcNumber })(injectIntl(CartItemSummary)))