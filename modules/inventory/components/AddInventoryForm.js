import React, { Component } from "react"
import Router from 'next/router'
import { Form, Input, Checkbox, Radio, Dropdown, Button } from 'formik-semantic-ui'
import { Modal, Icon, Segment, Header, Divider, Grid, GridColumn, FormGroup } from 'semantic-ui-react'
import styled from 'styled-components'
import * as val from 'yup'
import {DateInput} from '~/components/custom-formik'
import UploadLot from './upload/UploadLot'
import { FieldArray } from "formik"

// debug purposes only
import JSONPretty from 'react-json-pretty'


const TopDivider = styled(Divider)`
  padding-bottom: 20px;
`

const initValues = {
  doesExpire: false,
  inStock: true,
  minimumRequirement: true,
  minimum: 1,
  pkgAmount: "0",
  priceTiers: 1,
  pricing: {
    tiers: [
      { price: null, quantityFrom: 1 }
    ]
  },
  product: "",
  processingTimeDays: 1,
  splits: 1,
  validityDate: ""
}

const validationScheme = val.object().shape({
  inStock: val.bool().required("required"),
  product: val.string().required("required"),
  processingTimeDays: val.number().required("required"),
  doesExpire: val.bool(),
  pkgAmount: val.number().nullable().required("Is required"),
  validityDate: val.string().matches(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/, { message: 'not valid date' }),
  minimumRequirement: val.bool(),
  minimum: val.number().nullable().moreThan(0, "Must be greater than 0"),
  splits: val.number().nullable().moreThan(0, "Must be greater than 0"),
  priceTiers: val.number(),
  pricing: val.object().shape({
    tiers: val.array().of(val.object().shape({
      quantityFrom: val.number().nullable().moreThan(0, "Must be greater than 0").required("Minimum quantity must be set"),
      price: val.number().nullable().moreThan(0, "Must be greater than 0").required("Price must be set")
    }))
  }),
  warehouse: val.number().required('required')
})

export default class AddInventoryForm extends Component {

  state = {
    initialState: {

    }
  }

  uploadedDocuments = (files) => {
    if (!this.state.documents) {
      this.setState({
        ...this.state,
        documents: files
      })
    } else {
      this.setState({
        ...this.state,
        documents: this.state.documents.concat(files)
      })
    }
  }

  getProcessingTimes = (max) => {
    let processingTimes = []

    for (let i = 1; i <= max; i++) {
      processingTimes.push({
        value: i,
        key: i,
        text: i + ' Day' + (i > 1 ? 's' : '')
      })
    }

    return processingTimes
  }

  getPriceTiers = (max) => {
    let priceTiers = []

    for (let i = 1; i <= max; i++) {
      priceTiers.push({
        value: i,
        key: i,
        text: i
      })
    }

    return priceTiers
  }

  renderPricingTiers = (count) => {
    let tiers = []

    for (let i = 0; i < count; i++) {
      tiers.push(
        <FormGroup widths="equal" key={i}>
          <Input name={`pricing.tiers[${i}].quantityFrom`} label="Minimum OQ" inputProps={{ type: 'number', readOnly: i === 0, value: null }} />
          <Input name={`pricing.tiers[${i}].price`} label="FOB Price" inputProps={{ type: 'number', step: '0.001', value: null }} />
        </FormGroup>
      )
    }

    return (
      <>
        {tiers}
      </>
    )
  }

  resetForm = () => {
    this.props.resetForm()
  }

  goToList = () => {
    this.resetForm()
    Router.push('/inventory/my')
  }

  componentDidMount = () => {
    this.props.getWarehouses()
    if (this.props.edit) {
      this.props.getProductOffer(this.props.edit).then(async (response) => {
        // need to prepare searchedProducts before filling form data
        await this.props.fillProduct(response.value.data.product)
        this.setState({
          initialState: {
            doesExpire: !!response.value.data.lots[0].expirationDate,
            lots: response.value.data.lots,
            minimum: response.value.data.minimum,
            pkgAmount: response.value.data.pkgAmount,
            priceTiers: response.value.data.pricing.tiers.length,
            pricing: response.value.data.pricing,
            //processingTimeDays: response.value.data.processingTimeDays,
            product: response.value.data.product,
            splits: response.value.data.splits,
            validityDate: response.value.data.lots[0].expirationDate.substring(0, 10), // TODO: check all lots and get one date (nearest or farthest date?)
            warehouse: response.value.data.warehouse.id
          }
        })
      })
    }
  }

  render() {
    const { 
      searchProducts, 
      searchedProducts, 
      searchedProductsLoading, 
      warehousesList,
      addProductOffer,
      editProductOffer,
      uploadDocuments
    } = this.props

    const {
      initialState
    } = this.state

    return (
      <Form
        enableReinitialize
        initialValues={{...initValues, ...initialState}}
        validationSchema={validationScheme}
        onSubmit={(values, actions) => {
          if (this.props.fileIds.length) {
            values.attachments = this.props.fileIds.map(fi => {
              return fi.id.id
            })
          }
          addProductOffer(values, this.props.edit).then((productOffer) => {
            //Router.push('/inventory/my')
          })
          setTimeout(() => {
            actions.setSubmitting(false)
            actions.resetForm(initValues);
          }, 1000)
        }}
      >
        {({ values, errors, setFieldValue }) => (
          <>
            <Modal open={this.props.poCreated} closeOnDimmerClick={false} size='tiny'>
              <Modal.Header>Product Offer was created</Modal.Header>
              <Modal.Content>
                  What now?
              </Modal.Content>
              <Modal.Actions>
                <Button icon='add' labelPosition='right' content='Add another one' onClick={this.resetForm} />
                <Button primary icon='checkmark' labelPosition='right' content='Go to My Inventory' onClick={this.goToList} />
              </Modal.Actions>
            </Modal>
            <Header as="h2">{this.props.edit ? 'EDIT' : 'ADD'} INVENTORY</Header>
            <TopDivider />
            <Grid columns="equal" divided>
              <Grid.Column>

                <Header as='h3'>What product do you want to list?</Header>
                <FormGroup>
                  <Dropdown
                    label="Product search"
                    name="product"
                    options={searchedProducts}
                    inputProps={{
                      style: { width: '300px' },
                      size: 'large',
                      minCharacters: 3,
                      icon: "search",
                      search: true,
                      selection: true,
                      clearable: true,
                      loading: searchedProductsLoading,
                      onChange: (e, v) => { console.log(v) },
                      onSearchChange: (e, { searchQuery }) => searchQuery.length > 2 && searchProducts(searchQuery)
                    }}
                  />

                </FormGroup>

                <Header as='h3'>Is this product in stock?</Header>
                <FormGroup inline>
                  <Radio label="No" value={false} name="inStock" />
                  <Radio label="Yes" value={true} name="inStock" />
                </FormGroup>
                <FormGroup>
                  <Dropdown label="Processing time" name="processingTimeDays" options={this.getProcessingTimes(14)} />
                </FormGroup>

                <Header as='h3'>Does this product expire?</Header>
                <FormGroup inline>
                  <Radio label="No" value={false} name="doesExpire" />
                  <Radio label="Yes" value={true} name="doesExpire" />
                </FormGroup>
                <FormGroup>
                  <DateInput inputProps={{ disabled: !values.doesExpire }} label="Expiration date" name="validityDate" />
                </FormGroup>

                <Header as='h3'>Where will this product ship from?</Header>
                <FormGroup>
                  <Dropdown label="Warehouse" name="warehouse" options={warehousesList} />
                </FormGroup>

                <Header as='h3'>How many packages are available?</Header>
                <FormGroup>
                  <Input label="Total Packages" inputProps={{ type: 'number' }} name="pkgAmount" />
                </FormGroup>

              </Grid.Column>
              <GridColumn>

                <Header as="h3">Is there any order minimum requirement?</Header>
                <FormGroup>
                  <Radio label="No" value={false} name="minimumRequirement" />
                  <Radio label="Yes" value={true} name="minimumRequirement" />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input label="Minimum OQ" name="minimum" inputProps={{ type: 'number', disabled: !values.minimumRequirement }} />
                  <Input label="Splits" name="splits" inputProps={{ type: 'number', disabled: !values.minimumRequirement }} />
                </FormGroup>

                <Header as='h3'>How many price tiers would you like to offer?</Header>
                <FormGroup>
                  <Dropdown
                    label="Price tiers"
                    name="priceTiers"
                    options={this.getPriceTiers(10)}
                    inputProps={{
                      onChange: (e,{value}) => setFieldValue(
                        "pricing.tiers",
                        [
                          ...values.pricing.tiers.slice(0, value),
                          ...[...new Array((value - values.priceTiers) > 0 ? value - values.priceTiers : 0)].map(t => ({price: '0', quantityFrom: '0'}))
                        ]
                      )
                    }}
                  />
                </FormGroup>
                <FieldArray>
                  {this.renderPricingTiers(values.priceTiers)}
                </FieldArray>

                <Header as='h3'>Upload Spec Sheet</Header>
                <UploadLot {...this.props}
                           control={UploadLot}
                           name='documents'
                           type='Spec Sheet'
                           fileMaxSize={20}
                           onChange={(files) => setFieldValue(
                             "documents",
                             files
                           )}
                >
                  Drag and drop spec sheet file here or <a>select</a> from computer
                </UploadLot>

              </GridColumn>

              <GridColumn>

                <Header as="h3">Model values</Header>
                <Segment>
                  <JSONPretty data={values} />
                </Segment>



                <Button.Submit>Submit values</Button.Submit>
              </GridColumn>
            </Grid>
          </>
        )}
      </Form>
    )
  }
}