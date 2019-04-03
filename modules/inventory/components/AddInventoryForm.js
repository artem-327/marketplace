import React, { Component } from "react"
import Router from 'next/router'
import { Form, Input, Checkbox, Radio, Dropdown, Button } from 'formik-semantic-ui'
import { Segment, Header, Divider, Grid, GridColumn, FormGroup } from 'semantic-ui-react'
import styled from 'styled-components'
import * as val from 'yup'
import deepmerge from 'deepmerge'

// debug purposes only
import JSONPretty from 'react-json-pretty'
import { FieldArray } from "formik"

const TopDivider = styled(Divider)`
  padding-bottom: 20px;
`

const initValues = {
  inStock: true,
  product: "",
  processingTime: 0,
  doesExpire: true,
  pkgAmount: "",
  expirationDate: "",
  minimumRequirement: true,
  minimum: "",
  splits: "",
  priceTiers: 1,
  pricing: {
    tiers: [
      { price: null, quantityFrom: 0 }
    ]
  }
}

const validationScheme = val.object().shape({
  inStock: val.bool().required("Is required"),
  product: val.string().required("Is required"),
  processingTime: val.number().required("Is required"),
  doesExpire: val.bool(),
  pkgAmount: val.number(),
  expirationDate: val.date(),
  minimumRequirement: val.bool(),
  minimum: val.number(),
  splits: val.number(),
  priceTiers: val.number(),
  pricing: val.object().shape({
    tiers: val.array().of(val.object().shape({
      price: val.number().required(),
      quantityFrom: val.number().required()
    }))
  })
})

export default class AddInventoryForm extends Component {

  state = {
    initialState: {

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
          <Input name={`pricing.tiers[${i}].quantityFrom`} label="Minimum OQ" inputProps={{ type: 'number' }} />
          <Input name={`pricing.tiers[${i}].price`} label="FOB Price" inputProps={{ type: 'number' }} />
        </FormGroup>
      )
    }

    return (
      <>
        {tiers}
      </>
    )
  }

  componentDidMount() {
    //
    // load initial values here
    //
    setTimeout(() => this.setState({
      initialState: {
        priceTiers: 2,
        pricing: {
          tiers: [
            { price: 100, quantityFrom: 1 },
            { price: 90, quantityFrom: 10 }
          ]
        }
      }
    }), 500)
  }

  render() {
    const { 
      searchProducts, 
      searchedProducts, 
      searchedProductsLoading, 
      warehousesList
    } = this.props

    const {
      initialState
    } = this.state

    return (
      <Form 
        enableReinitialize
        initialValues={{...initValues, ...initialState}}
        validationSchema={validationScheme}
      >
        {({ values, errors }) => (
          <>
            <Header as="h2">ADD INVENTORY</Header>
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
                  <Dropdown label="Processing time" name="processingTime" options={this.getProcessingTimes(14)} />
                </FormGroup>

                <Header as='h3'>Does this product expire?</Header>
                <FormGroup inline>
                  <Radio label="No" value={false} name="doesExpire" />
                  <Radio label="Yes" value={true} name="doesExpire" />
                </FormGroup>
                <FormGroup>
                  <Input inputProps={{ type: 'date', disabled: !values.doesExpire }} label="Expiration date" name="expirationDate" />
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
                  <Dropdown label="Price tiers" name="priceTiers" options={this.getPriceTiers(10)} />
                </FormGroup>
                <FieldArray>
                  {this.renderPricingTiers(values.priceTiers)}
                </FieldArray>

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