import React, { Component } from 'react'
import { array, string, func } from 'prop-types'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { Grid, GridRow, GridColumn, Header, Divider, Segment, Button, Icon, Modal, FormGroup } from 'semantic-ui-react'

import { RelaxedRow } from './styledComponents'
import { FormattedUnit } from '~/components/formatted-messages'
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
import styled from 'styled-components'

import {
  VerticalUnpaddedColumn,
  StyledRow,
  ItemDescriptionGrid,
  SummaryGrid,
  BottomUnpaddedColumn
} from '~/modules/cart/components/StyledComponents'
import { TopUnpaddedColumn } from '../../modules/cart/components/StyledComponents'

const BlueText = styled.label`
  color: #2599d5;
  cursor: pointer;
`

const DeleteButton = styled(Button)`
  min-width: unset !important;
  min-height: unset !important;
  width: 32px !important;
  height: 32px !important;
  padding: 6px !important;
  border: solid 1px #f16844 !important;
  background-color: #fff0ed !important;
  color: #f16844 !important;
`

const validationSchema = Yup.object().shape({
  freightClass: freightClassValidation()
})

class CartItemSummary extends Component {
  state = {
    edittingHazmatInfo: false,
    loadCartRequired: false,
    nmfcNumberInitOptions: [],
    unNumberInitOptions: [],
    openModal: false
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
    option = getSafe(() => item.productOffer.companyProduct.companyGenericProduct.cfUnNumber, null)
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

    this.setState({ nmfcNumberInitOptions: nmfcNumbers, unNumberInitOptions: unNumbers, openModal: true })
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
        getSafe(() => companyProduct.companyGenericProduct.cfUnNumber.id, null)
      ),
      packagingGroup: getSafe(
        () => item.cfPackagingGroup.id,
        getSafe(() => companyProduct.companyGenericProduct.cfPackagingGroup.id, null)
      ),
      hazardClass: getSafe(
        () => item.cfHazardClass.id,
        getSafe(() => companyProduct.companyGenericProduct.cfHazardClass.id, null)
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
      <>
        <Modal.Header>
          <FormattedMessage id='cart.deliveryInfo' defaultMessage='Delivery Information' />
        </Modal.Header>
        <Modal.Content>
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
            children={({ submitForm }) => {
              this.handleSubmit = submitForm
              return (
                <>
                  <FormGroup widths='equal'>
                    <Dropdown
                      options={unNumberOptions}
                      fieldProps={{
                        'data-test': 'shopping_cart_unNumber_inp'
                      }}
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

                    <Dropdown
                      options={packagingGroups.map(grp => ({
                        key: grp.id,
                        value: grp.id,
                        text: grp.groupCode
                      }))}
                      fieldProps={{
                        'data-test': 'shopping_cart_packagingGroup_inp'
                      }}
                      inputProps={{
                        disabled,
                        clearable: true,
                        selection: true,
                        search: true
                      }}
                      name='packagingGroup'
                      label={formatMessage({ id: 'cart.packagingGroup', defaultMessage: 'Packaging Group' })}
                    />
                  </FormGroup>

                  <FormGroup widths='equal'>
                    <Dropdown
                      options={hazardClasses.map(hazardClass => ({
                        key: hazardClass.id,
                        value: hazardClass.id,
                        text: `${hazardClass.classCode} - ${hazardClass.description}`
                      }))}
                      inputProps={{ disabled, search: true, clearable: true }}
                      fieldProps={{
                        'data-test': 'shopping_cart_hazardClass_inp'
                      }}
                      name='hazardClass'
                      label={formatMessage({ id: 'cart.hazardClass', defaultMessage: 'Hazard Class' })}
                    />

                    <Input
                      fieldProps={{
                        'data-test': 'shopping_cart_freightClass_inp'
                      }}
                      inputProps={{ disabled }}
                      name='freightClass'
                      label={formatMessage({ id: 'cart.freightClass', defaultMessage: 'Freight Class' })}
                    />
                  </FormGroup>

                  <FormGroup widths='2'>
                    <Dropdown
                      label={
                        <FormattedMessage id='cart.nmfcNumber' defaultMessage='NMFC Number'>
                          {text => text}
                        </FormattedMessage>
                      }
                      options={nmfcNumberOptions}
                      fieldProps={{
                        'data-test': 'shopping_cart_nmfcNumber_inp'
                      }}
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
                  </FormGroup>

                  <FormGroup widths='2'>
                    <Checkbox
                      inputProps={{ disabled, 'data-test': 'shopping_cart_stackable_chckb' }}
                      name='stackable'
                      label={formatMessage({ id: 'cart.stackable', defaultMessage: 'Stackable' })}
                    />
                  </FormGroup>
                </>
              )
            }}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button
            type='button'
            basic
            onClick={e => {
              this.setState({ edittingHazmatInfo: false, openModal: false })
            }}
            data-test='shopping_cart_hazmat_cancel'>
            <FormattedMessage id='global.close' defaultMessage='Close'>
              {text => text}
            </FormattedMessage>
          </Button>
          <Button
            type='button'
            {...(this.state.edittingHazmatInfo ? { positive: true } : { color: 'blue' })}
            onClick={() => {
              if (this.state.edittingHazmatInfo) this.handleSubmit()
              else this.setState(prevState => ({ edittingHazmatInfo: !prevState.edittingHazmatInfo }))
            }}
            data-test='shopping_cart_hazmat'>
            <FormattedMessage id={`global.${this.state.edittingHazmatInfo ? 'save' : 'edit'}`}>
              {text => text}
            </FormattedMessage>
          </Button>
        </Modal.Actions>
      </>
    )
  }

  renderItem = ({ item, lastChild }) => {
    let { productOffer } = item
    let { deleteCart } = this.props
    const externalNotes = getSafe(() => item.productOffer.externalNotes, '')
    const leadTime = getSafe(() => item.productOffer.leadTime, 'N/A')
    return (
      <>
        <GridColumn computer={16}>
          <Grid verticalAlign='middle' columns={2} style={{ fontSize: '16px' }}>
            <StyledRow verticallyUnpadded bottomShadow>
              <GridColumn computer={12}>
                {/* {productOffer.companyProduct.intProductCode + ' ' + productOffer.companyProduct.intProductName} */}
                <Header as='h2'>{productOffer.companyProduct.companyGenericProduct.name}</Header>
              </GridColumn>

              <GridColumn computer={4} textAlign='right'>
                <DeleteButton
                  type='button'
                  onClick={() => deleteCart(item.id)}
                  data-test={`shopping_cart_remove_${item.id}_btn`}
                  icon
                  negative>
                  <Icon name='trash alternate outline' />
                </DeleteButton>
              </GridColumn>
            </StyledRow>

            <RelaxedRow>
              <BottomUnpaddedColumn>
                <FormattedMessage id='global.location' defaultMessage='Location' />
              </BottomUnpaddedColumn>

              <VerticalUnpaddedColumn black>{item.locationStr}</VerticalUnpaddedColumn>
            </RelaxedRow>

            <RelaxedRow columns={2}>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='cart.deliveryInfo' defaultMessage='Delivery Information' />
              </VerticalUnpaddedColumn>
              <VerticalUnpaddedColumn>
                <Modal
                  open={this.state.openModal}
                  closeIcon
                  size='tiny'
                  onOpen={() => this.onHazmatPopup(item)}
                  onClose={() => {
                    if (this.state.loadCartRequired) this.props.getCart()
                    this.setState({ edittingHazmatInfo: false, loadCartRequired: false, openModal: false })
                  }}
                  trigger={
                    <BlueText>
                      <FormattedMessage id='global.viewEdit' defaultMessage='View/Edit'>
                        {text => text}
                      </FormattedMessage>
                    </BlueText>
                  }>
                  {this.hazmatMarkup(item)}
                </Modal>
              </VerticalUnpaddedColumn>
            </RelaxedRow>

            <RelaxedRow columns={2}>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='global.packages' defaultMessage='Packages' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn black>
                <FormattedNumber minimumFractionDigits={0} value={item.pkgAmount} /> x{' '}
                {item.productOffer.companyProduct.packagingSize}{' '}
                {item.productOffer.companyProduct.packagingUnit.nameAbbreviation}{' '}
                {item.productOffer.companyProduct.packagingType.name}
              </VerticalUnpaddedColumn>
            </RelaxedRow>

            <RelaxedRow>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='global.quantity' defaultMessage='Quantity' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn black>
                <FormattedUnit
                  unit={item.productOffer.companyProduct.packagingUnit.nameAbbreviation}
                  separator=' '
                  value={item.pkgAmount * item.productOffer.companyProduct.packagingSize}
                />
              </VerticalUnpaddedColumn>
            </RelaxedRow>

            {/* <RelaxedRow>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='global.weight' defaultMessage='Weight' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn floated='right'>
                <FormattedUnit
                  separator=''
                  unit={productOffer.companyProduct.packagingUnit.nameAbbreviation}
                  value={item.pkgAmount * productOffer.companyProduct.packagingSize}
                />
              </VerticalUnpaddedColumn>
            </RelaxedRow> */}

            <RelaxedRow>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='global.fobPrice' defaultMessage='!FOB Price' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn black>
                <FormattedNumber style='currency' currency={currency} id='cart.packs' value={item.cfPricePerUOM} /> /{' '}
                {productOffer.companyProduct.packagingUnit.nameAbbreviation}
              </VerticalUnpaddedColumn>
            </RelaxedRow>

            <RelaxedRow>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='cart.productTotal' defaultMessage='Product Total' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn black>
                <FormattedNumber style='currency' currency={currency} value={item.cfPriceSubtotal} />
              </VerticalUnpaddedColumn>
            </RelaxedRow>

            <RelaxedRow>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='global.leadTime' defaultMessage='!Lead Time' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn black>{leadTime}</VerticalUnpaddedColumn>
            </RelaxedRow>

            <RelaxedRow>
              <VerticalUnpaddedColumn>
                <FormattedMessage id='global.paymentTerms' defaultMessage='Payment Terms' />
              </VerticalUnpaddedColumn>

              <VerticalUnpaddedColumn black>{productOffer && productOffer.cfPaymentTerms}</VerticalUnpaddedColumn>
            </RelaxedRow>

            {externalNotes && (
              <RelaxedRow>
                <VerticalUnpaddedColumn computer={16}>
                  <ItemDescriptionGrid>
                    <GridRow>
                      <GridColumn className='default'>
                        <FormattedMessage id='cart.externalNotes' defaultMessage='!External Notes' />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <TopUnpaddedColumn black className='default'>
                        {externalNotes}
                      </TopUnpaddedColumn>
                    </GridRow>
                  </ItemDescriptionGrid>
                </VerticalUnpaddedColumn>
              </RelaxedRow>
            )}

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
        <SummaryGrid>
          <StyledRow verticalAlign='middle' topMarged bottomShadow>
            <VerticalUnpaddedColumn>
              <Header as='h2'>{header}</Header>
            </VerticalUnpaddedColumn>
          </StyledRow>
          {cartItems.map((item, i) => this.renderItem({ item, i, lastChild: cartItems.length - 1 === i }))}
        </SummaryGrid>
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
  header: <FormattedMessage id='cart.summary' defaultMessage='SUMMARY' />
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
