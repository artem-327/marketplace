import React, { Component } from 'react'
import { Modal, Grid, GridRow, GridColumn, Form, Button, Divider } from 'semantic-ui-react'
import { node } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Dropdown, Input } from 'formik-semantic-ui-fixed-validation'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Router from 'next/router'
import { debounce } from 'lodash'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'
import * as Yup from 'yup'
import { CompanyProductMixtures } from '~/components/shared-components/'

import { Datagrid } from '~/modules/datagrid'
import { uniqueArrayByKey, getSafe, generateToastMarkup, getDesiredCasProductsProps } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'

import { getWarehouses } from '~/modules/purchase-order/actions'
import { simpleEditTrigger, getAutocompleteData, addProductOffer } from '~/modules/inventory/actions'

const BoldLabel = styled.label`
  font-weight: bolder;
`
const EllipsisColumn = styled(GridColumn)`
& input {
  text-overflow: ellipsis !important;
}
`


const { requiredMessage, mustBeNumber, minimum } = errorMessages

const validationSchema = Yup.object().shape({
  product: Yup.number().required(requiredMessage).typeError(requiredMessage),
  pricingTiers: Yup.array(Yup.object().shape({
    price: Yup.number().required(requiredMessage).typeError(mustBeNumber).positive(minimum(0.001)),
  })),
  quantity: Yup.number().required(requiredMessage).typeError(mustBeNumber).positive(minimum(1)),
  warehouse: Yup.number().required(requiredMessage).typeError(requiredMessage)
})



class SimpleEdit extends Component {
  state = {
    open: false,
    submitting: false
  }

  componentDidMount() {
    const { warehouses, getWarehouses, isAdmin, takeover } = this.props

    if (warehouses.length === 0 && (!isAdmin || takeover)) getWarehouses()
  }


  handleSearch = debounce((searchQuery) => {
    this.props.getAutocompleteData({ searchUrl: `/prodex/api/company-products/own/search?pattern=${searchQuery}&onlyMapped=false` })
  }, 250)


  render() {
    const { open } = this.state
    const {
      trigger, simpleEditOpen, simpleEditTrigger,
      popupValues, autocompleteData,
      autocompleteDataLoading, preferredCurrency,
      warehouses, warehousesFetching,
      addProductOffer, toastManager } = this.props


    let productOptions = autocompleteData
    let warehouseOptions = warehouses


    if (popupValues.id && popupValues.companyProduct) productOptions.push(popupValues.companyProduct)
    if (getSafe(() => popupValues.warehouse.id)) warehouseOptions.push({
      name: popupValues.warehouse.warehouseName,
      id: popupValues.warehouse.id
    })

    let initialValues = {
      packagingSize: getSafe(() => popupValues.companyProduct.packagingSize),
      product: getSafe(() => popupValues.companyProduct.id),
      uom: getSafe(() => popupValues.companyProduct.packagingUnit.nameAbbreviation),
      packaging: getSafe(() => popupValues.companyProduct.packagingType.name),
      casTradeName: getSafe(() => popupValues.companyProduct.echoProduct.name),
      casProducts: getDesiredCasProductsProps(getSafe(() => popupValues.companyProduct.echoProduct.elements, [])),
      // price: getSafe(() => popupValues.pricingTiers[0].price.amount),
      pricingTiers: getSafe(() => popupValues.pricingTiers.map((el) => ({
        quantityFrom: el.quantityFrom,
        price: el.price.amount
      })), [{ quantityFrom: 1, price: '' }]),
      quantity: getSafe(() => popupValues.pkgAmount),
      warehouse: getSafe(() => popupValues.warehouse.id)
    }

    return (
      <Formik
        onSubmit={async (values) => {
          this.setState({ submitting: true })
          let payload = {
            pricingTiers: values.pricingTiers.map((el) => ({
              quantityFrom: el.quantityFrom,
              price: parseFloat(el.price)
            })),
            companyProduct: values.product,
            lots: [{
              lotNumber: '1',
              pkgAmount: parseInt(values.quantity)
            }],
            tradeName: values.casTradeName,
            warehouse: values.warehouse
          }

          try {
            await addProductOffer(payload, popupValues.id, true)

            let status = popupValues.id ? 'edited' : 'created'

            toastManager.add(generateToastMarkup(
              <FormattedMessage
                id={`notifications.productOffer.${status}.header`}
                defaultMessage={`Product Offer ${popupValues.id ? 'Edited' : 'Listed'}`}
              />,
              <FormattedMessage
                id={`notifications.productOffer.${status}.content`}
                defaultMessage={`Product Offer successfully ${popupValues.id ? 'edited' : 'listed'}`}
              />
            ), { appearance: 'success' })

            Datagrid.loadData()

          }
          catch (e) { console.error(e) }
          finally {
            this.setState({ submitting: false })
            simpleEditTrigger({}, false)
          }
        }}

        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        render={({ submitForm, values }) => {
          this.submitForm = submitForm

          return (
            <Modal
              closeIcon
              centered={false}
              size='small'
              onClose={() => simpleEditTrigger({}, false)}
              open={open || simpleEditOpen}
              trigger={trigger && React.cloneElement(trigger, { onClick: () => this.setState({ open: false }) })}>
              <Modal.Header>
                <FormattedMessage
                  id={`global.${popupValues.id ? 'editListing' : 'addListing'}`}
                  defaultMessage={`${popupValues.id ? 'Edit' : 'Add'} Listing`}
                />
              </Modal.Header>


              <Modal.Content>
                <Form loading={this.state.submitting}>
                  <Grid>
                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          name='product'
                          label={<FormattedMessage id='global.companyProduct' defaultMessage='Company Product'>{text => text}</FormattedMessage>}
                          inputProps={{
                            placeholder: <FormattedMessage id='global.startTypingToSearch' defaultMessage='Start typing to begin search' />,
                            fluid: true,
                            icon: 'search',
                            search: true,
                            loading: autocompleteDataLoading,
                            onChange: (_, { value }) => {
                              simpleEditTrigger({
                                ...popupValues,
                                companyProduct: autocompleteData.find((el) => el.id === value)
                              }, true)
                            },
                            onSearchChange: (_, { searchQuery }) => this.handleSearch(searchQuery)
                          }}
                          options={
                            uniqueArrayByKey(productOptions, 'id').map((el) => ({
                              key: el.id,
                              text: el.intProductName,
                              value: el.id
                            }))
                          }
                        />
                      </GridColumn>
                    </GridRow>
                    {values.product &&
                      <>
                        <GridRow columns={4}>
                          <GridColumn>
                            <Input
                              label={<BoldLabel><FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size'>{text => text}</FormattedMessage></BoldLabel>}
                              name='packagingSize'
                              inputProps={{ transparent: true, readOnly: true }}
                            />
                          </GridColumn>
                          <GridColumn>
                            <Input
                              label={<BoldLabel><FormattedMessage id='global.uom' defaultMessage='UOM'>{text => text}</FormattedMessage></BoldLabel>}
                              name='uom'
                              inputProps={{ transparent: true, readOnly: true }}
                            />
                          </GridColumn>

                          <GridColumn>
                            <Input
                              label={<BoldLabel><FormattedMessage id='global.packaging' defaultMessage='Packaging'>{text => text}</FormattedMessage></BoldLabel>}
                              name='packaging'
                              inputProps={{ transparent: true, readOnly: true }}
                            />
                          </GridColumn>

                          <EllipsisColumn>
                            <Input
                              label={<BoldLabel><FormattedMessage id='global.casTradeName' defaultMessage='CAS/Trade Name'>{text => text}</FormattedMessage></BoldLabel>}
                              name='casTradeName'
                              inputProps={{ transparent: true, readOnly: true }}
                            />
                          </EllipsisColumn>
                        </GridRow>
                        <Divider />
                        <CompanyProductMixtures casProducts={values.casProducts} />
                        <Divider />
                      </>
                    }
                    <GridRow>
                      <GridColumn width={4}>
                        <Input
                          inputProps={{
                            type: 'number',
                            step: 0.001,
                            min: 0.001,
                            label: getSafe(() => preferredCurrency.symbol, 'US$'),
                            fluid: true
                          }}
                          name='pricingTiers[0].price'
                          label={<FormattedMessage id='global.fobPrice' defaultMessage='FOB Price'>{text => text}</FormattedMessage>}
                        />
                      </GridColumn>

                      <GridColumn width={4}>
                        <Input
                          inputProps={{
                            type: 'number',
                            min: 1,
                            step: 1
                          }}
                          name='quantity'
                          label={<FormattedMessage id='global.packagesAvailable' defaultMessage='Packages Available'>{text => text}</FormattedMessage>}
                        />
                      </GridColumn>

                      <GridColumn width={8}>
                        <Dropdown
                          inputProps={{
                            loading: warehousesFetching
                          }}
                          options={uniqueArrayByKey(warehouseOptions, 'id').map((wh) => ({
                            key: wh.id,
                            text: wh.name,
                            value: wh.id
                          }))}
                          name='warehouse'
                          label={<FormattedMessage id='global.warehouse' defaultMessage='Warehouse'>{text => text}</FormattedMessage>}
                        />
                      </GridColumn>
                    </GridRow>
                  </Grid>
                </Form>
              </Modal.Content>

              <Modal.Actions>
                <Button basic primary onClick={() => Router.push(`/inventory/${popupValues.id ? `edit?id=${popupValues.id}` : 'add'}`)}>
                  <FormattedMessage id='global.advanced' defaultMessage='Advanced'>{text => text}</FormattedMessage>
                </Button>
                <Button primary type='submit' onClick={() => this.submitForm()}>
                  <FormattedMessage
                    id={`global.${popupValues.id ? 'editListing' : 'addListing'}'`}
                    defaultMessage={`${popupValues.id ? 'Edit Listing' : 'Add Listing'}`}>
                    {text => text}
                  </FormattedMessage >
                </Button >
              </Modal.Actions >
            </Modal >
          )
        }}
      />
    )
  }
}

SimpleEdit.propTypes = {
  trigger: node,
}

const mapDispatchToProps = {
  simpleEditTrigger,
  getAutocompleteData,
  getWarehouses,
  addProductOffer
}

const mapStateToProps = ({ simpleAdd: {
  simpleEditOpen,
  popupValues,
  autocompleteData,
  autocompleteDataLoading
}, auth, cart }) => ({
  simpleEditOpen,
  popupValues,
  autocompleteData,
  autocompleteDataLoading,
  preferredCurrency: getSafe(() => auth.identity.preferredCurrency),
  isAdmin: getSafe(() => auth.identity.isAdmin),
  takeover: getSafe(() => auth.identity.company, false),
  owner: getSafe(() => auth.identity.id),
  warehouses: cart.warehouses,
  warehousesFetching: cart.warehousesFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(SimpleEdit))