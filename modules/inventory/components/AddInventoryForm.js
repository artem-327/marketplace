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
    const { searchProducts, searchedProducts, searchedProductsFetched } = this.props

    return (
      <Form>
        {({ values }) => (
          <>
            {JSON.stringify(values)}
            <Header as="h2">ADD INVENTORY</Header>
            <TopDivider />
            <Grid columns="equal" divided>
              <Grid.Column>
                <Header as='h3'>What product do you want to list?</Header>
                <FormGroup widths='1'>
                  <Dropdown
                    label="Product search"
                    name="product"
                    inputProps={{
                      minCharacters: 3,
                      search: true,
                      selection: true,
                      clearable: true,
                      options: searchedProducts,
                      onSearchChange: (e, { searchQuery }) => searchQuery.length > 2 && searchProducts(searchQuery)
                    }}
                  />

                </FormGroup>

                <Header as='h3'>Is this product in stock?</Header>
                <FormGroup inline>
                  <Radio label="No" value="" name="inStock" />
                  <Radio label="Yes" value="yes" name="inStock" />
                </FormGroup>
                <FormGroup widths='3'>
                  <Dropdown label="Processing time" name="processingTime" options={this.getProcessingTimes(14)} />
                </FormGroup>

                <Header as='h3'>Does this product expire?</Header>
                <FormGroup inline>
                  <Radio label="No" value={false} name="doesExpire" />
                  <Radio label="Yes" value={true} name="doesExpire" />
                </FormGroup>
                <FormGroup widths='3'>
                  {values.doesExpire && <Input inputProps={{type: 'date'}} label="Expiration date" name="expirationDate" />}
                </FormGroup>

                <Header as='h3'>Where will this product ship from?</Header>
                <FormGroup widths='1'>

                </FormGroup>

                <Header as='h3'>How many packages are available?</Header>
                <FormGroup widths='3'>

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