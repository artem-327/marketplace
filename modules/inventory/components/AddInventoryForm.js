import React, { Component } from "react"
import Router from 'next/router'
import { Form, Input, Checkbox, Radio, Dropdown, Button } from 'formik-semantic-ui'
import { Segment, Header, Divider, Grid, GridColumn, FormGroup } from 'semantic-ui-react'
import styled from 'styled-components'

const TopDivider = styled(Divider)`
  padding-bottom: 20px;
`

export default class AddInventoryForm extends Component {

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

  render() {
    const { searchProducts, searchedProducts, searchedProductsLoading, warehousesList } = this.props

    return (
      <Form>
        {({ values }) => (
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
                      minCharacters: 3,
                      icon:"search",
                      search: true,
                      selection: true,
                      clearable: true,
                      loading: searchedProductsLoading,
                      onSearchChange: (e, { searchQuery }) => searchQuery.length > 2 && searchProducts(searchQuery)
                    }}
                  />

                </FormGroup>

                <Header as='h3'>Is this product in stock?</Header>
                <FormGroup inline>
                  <Radio label="No" value="" name="inStock" />
                  <Radio label="Yes" value="yes" name="inStock" />
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
                  {values.doesExpire && <Input inputProps={{ type: 'date' }} label="Expiration date" name="expirationDate" />}
                </FormGroup>

                <Header as='h3'>Where will this product ship from?</Header>
                <FormGroup>
                  <Dropdown label="Warehouse" name="warehouse" options={warehousesList} />
                </FormGroup>

                <Header as='h3'>How many packages are available?</Header>
                <FormGroup>
                  <Input label="Total Packages" inputProps={{type:'number'}} name="pkgAmount" />
                </FormGroup>
              </Grid.Column>
              <GridColumn>
                <Header as="h3">First</Header>
              </GridColumn>
              <GridColumn>
                <Header as="h3">First</Header>
              </GridColumn>
            </Grid>
          </>
        )}
      </Form>
    )
  }
}