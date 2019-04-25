import React, { Component } from "react"
import Router from 'next/router'
import { Form, Input, Checkbox, Radio, Dropdown, Button, TextArea } from 'formik-semantic-ui'
import {FormattedMessage} from 'react-intl';
import { Modal, Icon, Segment, Container, Menu, Header, Divider, Grid, GridRow, GridColumn, Table, TableCell, TableHeaderCell, FormGroup, FormField, Accordion, Message, Label, Tab } from 'semantic-ui-react'
import styled from 'styled-components'
import * as val from 'yup'
import {DateInput} from '~/components/custom-formik'
import UploadLot from './upload/UploadLot'
import { FieldArray } from "formik"
import ProdexGrid from '~/components/table'

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
  multipleLots: false,
  pkgAmount: 0,
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
  lots: val.array().of(val.object().shape({
    lotNumber: val.string().nullable().required("required"),
    pkgAmount: val.number().nullable().moreThan(0, "Must be greater than 0").required("required"),
    manufacturedDate: val.string().nullable().matches(/^([0-9]{4}\-[0-9]{2}\-[0-9]{2})?$/, { message: 'not valid date' }),
    expirationDate: val.string().nullable().matches(/^([0-9]{4}\-[0-9]{2}\-[0-9]{2})?$/, { message: 'not valid date' })
  })).nullable(),
  manufacturer: val.number().nullable().moreThan(0, 'Manufacturer value is invalid'),
  minimumRequirement: val.bool(),
  minimum: val.number().nullable().moreThan(0, "Must be greater than 0"),
  splits: val.number().nullable().moreThan(0, "Must be greater than 0"),
  origin: val.number().nullable().moreThan(0, 'Origin value is invalid'),
  priceTiers: val.number(),
  pricing: val.object().shape({
    tiers: val.array().of(val.object().shape({
      quantityFrom: val.number().nullable().moreThan(0, "Must be greater than 0").required("Minimum quantity must be set"),
      price: val.number().nullable().moreThan(0, "Must be greater than 0").required("Price must be set").test("maxdec", "There can be maximally 3 decimal places.", val => {
        return !val || val.toString().indexOf('.') === -1 || val.toString().split(".")[1].length <= 3
      })
    }))
  }),
  warehouse: val.number().required('required')
})

export default class AddInventoryForm extends Component {

  state = {
    initialState: {

    },
    activeIndex: 0
  }

  accClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
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
        <Grid.Row key={i}>
          <Grid.Column width={2}>
            {i ? (
              <Label name={`pricing.tiers[${i}].level`}>{i+1}</Label>
            ) : (
              <div className='field'>
                <label>Level</label>
                <Label name={`pricing.tiers[${i}].level`}>{i+1}</Label>
              </div>
            )}
          </Grid.Column>
          <Grid.Column width={1}>
            <Icon.Group>
              <Icon name='chevron right' />
              <Icon name='window minimize outline' />
            </Icon.Group>
          </Grid.Column>
          <Grid.Column width={10}>
            <FormGroup widths='equal'>
              <FormField width={8}>
                <Input name={`pricing.tiers[${i}].quantityFrom`} label={i ? '' : "Minimum OQ"} inputProps={{ type: 'number', readOnly: i === 0, value: null }} />
              </FormField>
              <Form.Field width={8}>
                <Input name={`pricing.tiers[${i}].price`} label={i ? '' : "FOB Price"} inputProps={{ type: 'number', step: '0.001', value: null }} />
              </Form.Field>
            </FormGroup>
          </Grid.Column>
        </Grid.Row>
      )
    }

    return (
      <>
        {tiers}
      </>
    )
  }

  renderProductDetails = (values) => {
    const {
      activeIndex
    } = this.state

    return (
      <Grid centered>
        <GridColumn width={12}>
          <Segment attached={values.product ? false : 'top'} style={{padding: '2em'}}>
            <Accordion>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.accClick}>
                <Header as="h3">PRODUCT DETAILS</Header>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Grid columns={2} className='data-grid'>
                  <GridColumn>Product Name</GridColumn>
                  <GridColumn>{values.product ? values.product.productName : ''}</GridColumn>

                  <GridColumn>Product Number</GridColumn>
                  <GridColumn>{values.product ? values.product.productCode : ''}</GridColumn>

                  <GridColumn>Measurement</GridColumn>
                  <GridColumn>{values.product ? values.product.packagingSize : ''}</GridColumn>

                  <GridColumn>U/M</GridColumn>
                  <GridColumn>{values.product && values.product.packagingUnit ? values.product.packagingUnit.name : ''}</GridColumn>

                  <GridColumn>U/P</GridColumn>
                  <GridColumn>{values.product && values.product.packagingType ? values.product.packagingType.name : ''}</GridColumn>

                  <GridColumn>CAS Index Name</GridColumn>
                  <GridColumn>{values.product && values.product.casProduct ? values.product.casProduct.casIndexName : ''}</GridColumn>

                  <GridColumn>CAS Number</GridColumn>
                  <GridColumn>{values.product && values.product.casProduct ? values.product.casProduct.casNumber : ''}</GridColumn>

                  <GridColumn>Master Product</GridColumn>
                  <GridColumn>{values.product ? !!values.product.masterProduct : ''}</GridColumn>

                  <GridColumn>Chemical Name</GridColumn>
                  <GridColumn>{values.product && values.product.casProduct ? values.product.casProduct.chemicalName : ''}</GridColumn>

                  <GridColumn>Hazaardous</GridColumn>
                  <GridColumn>{values.product && values.product.hazaardous ? !!values.product.hazaardous : ''}</GridColumn>

                  <GridColumn>UN Code</GridColumn>
                  <GridColumn>{values.product && values.product.unNumber ? values.product.unNumber.unNumberCode : ''}</GridColumn>

                  <GridColumn>Packaging Group</GridColumn>
                  <GridColumn>{values.product && values.product.packagingGroup ? values.product.packagingGroup.groupCode : ''}</GridColumn>

                  <GridColumn>Hazaardous Class</GridColumn>
                  <GridColumn><Label.Group color='blue'>{values.product && values.product.hazardClasses ? values.product.hazardClasses.map(hClass => { return (<Label title={hClass.description}>{hClass.classCode}</Label>) }) : ''}</Label.Group></GridColumn>

                  <GridColumn>Stackable</GridColumn>
                  <GridColumn>{values.product ? values.product.stackable : ''}</GridColumn>

                  <GridColumn>Freight Class</GridColumn>
                  <GridColumn>{values.product ? values.product.freightClass : ''}</GridColumn>

                  <GridColumn>NMFC Number</GridColumn>
                  <GridColumn>{values.product ? values.product.nmfcNumber : ''}</GridColumn>
                </Grid>
              </Accordion.Content>
            </Accordion>
          </Segment>
          {values.product ? '' : (
            <Message attached='bottom'>
              <Icon name='info circle' size='large' color='blue' />
              Please search product to fill data above.
            </Message>
          )}

          <Button size='big' floated='left'>Discard</Button>
          <Button.Submit size='big' floated='right'>Submit values</Button.Submit>

          <JSONPretty data={values} />
        </GridColumn>
      </Grid>
    )
  }

  resetForm = () => {
    this.props.resetForm()
  }

  goToList = () => {
    this.resetForm()
    Router.push('/inventory/my')
  }

  componentWillMount = async () => {
    await this.props.resetForm()
  }

  componentDidMount = async () => {
    await this.props.getProductConditions()
    await this.props.getProductForms()
    await this.props.getProductGrades()
    await this.props.getWarehouses()
    if (this.props.edit) {
      this.props.getProductOffer(this.props.edit).then(async (response) => {
        // need to prepare searchedProducts before filling form data
        await this.props.fillProduct(response.value.data.product)
        setTimeout(() => {
          this.setState({
            initialState: {
              assayMax: response.value.data.assayMax,
              assayMin: response.value.data.assayMin,
              doesExpire: !!response.value.data.lots[0].expirationDate,
              externalNotes: response.value.data.externalNotes,
              lots: response.value.data.lots.map(lot => {
                return {
                  ...lot,
                  expirationDate: lot.expirationDate ? lot.expirationDate.substring(0, 10) : '',
                  manufacturedDate: lot.manufacturedDate ? lot.manufacturedDate.substring(0, 10) : ''
                }
              }),
              internalNotes: response.value.data.internalNotes,
              manufacturer: response.value.data.manufacturer ? response.value.data.manufacturer.id : null,
              minimum: response.value.data.minimum,
              numberOfLots: response.value.data.lots.length,
              origin: response.value.data.origin ? response.value.data.origin.id : null,
              pkgAmount: response.value.data.pkgAmount,
              priceTiers: response.value.data.pricing.tiers.length,
              pricing: {
                ...response.value.data.pricing,
                price: response.value.data.pricing.price.amount
              },
              processingTimeDays: 1,
              product: response.value.data.product,
              productCondition: response.value.data.productCondition ? response.value.data.productCondition.id : null,
              productForm: response.value.data.productForm ? response.value.data.productForm.id : null,
              productGrade: response.value.data.productGrades ? response.value.data.productGrades[0].id : null,
              splits: response.value.data.splits,
              tradeName: response.value.data.tradeName,
              validityDate: response.value.data.lots[0].expirationDate ? response.value.data.lots[0].expirationDate.substring(0, 10) : '', // TODO: check all lots and get one date (nearest or farthest date?)
              warehouse: response.value.data.warehouse.id
            }
          })
        }, 500)
      })
    }
  }

  render() {
    const {
      listConditions,
      listForms,
      listGrades,
      searchManufacturers,
      searchedManufacturers,
      searchedManufacturersLoading,
      searchOrigins,
      searchedOrigins,
      searchedOriginsLoading,
      searchProducts, 
      searchedProducts, 
      searchedProductsLoading,
      warehousesList,
      addProductOffer,
      editProductOffer,
      uploadDocuments
    } = this.props

    const {
      initialState,
      activeIndex
    } = this.state

    return (
      <>
        <div className='header-top'>
          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage id='myInventory.myInventory'
                                  defaultMessage={this.props.edit ? 'EDIT INVENTORY' : 'ADD INVENTORY'} />
              </Header>
            </Menu.Item>
          </Menu>
        </div>

        <Form
          enableReinitialize
          initialValues={{...initValues, ...initialState}}
          validationSchema={validationScheme}
          onSubmit={(values, actions) => {
            if (this.props.fileIds.length) {
              values.attachments = this.props.fileIds.map(fi => {
                return fi.id
              })
            }
            addProductOffer(values, this.props.edit).then((productOffer) => {
              //Router.push('/inventory/my') xxx
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
              <Tab className='inventory' menu={{ secondary: true, pointing: true }} panes={[
                {
                  menuItem: 'PRODUCT OFFER',
                  render: () => (
                    <Tab.Pane>
                      <Grid divided style={{marginTop: '2rem'}}>
                        <Grid.Column width={5}>
                          <Header as='h3'>What product do you want to list?</Header>
                          <FormGroup>
                            <FormField width={13}>
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
                            </FormField>
                          </FormGroup>

                          <Header as='h3'>Is this product in stock?</Header>
                          <FormGroup inline>
                            <Radio label="No" value={false} name="inStock" />
                            <Radio label="Yes" value={true} name="inStock" />
                          </FormGroup>
                          <FormGroup>
                            <FormField width={4}>
                              <Dropdown label="Processing time" name="processingTimeDays" options={this.getProcessingTimes(14)} />
                            </FormField>
                          </FormGroup>

                          <Header as='h3'>Does this product expire?</Header>
                          <FormGroup inline>
                            <Radio label="No" value={false} name="doesExpire" />
                            <Radio label="Yes" value={true} name="doesExpire" />
                          </FormGroup>
                          <FormGroup>
                            <FormField width={5}>
                              <DateInput inputProps={{ disabled: !values.doesExpire }} label="Expiration date" name="validityDate" />
                            </FormField>
                          </FormGroup>

                          <Header as='h3'>Where will this product ship from?</Header>
                          <FormGroup>
                            <FormField width={10}>
                              <Dropdown label="Warehouse" name="warehouse" options={warehousesList} />
                            </FormField>
                          </FormGroup>

                          <Header as='h3'>How many packages are available?</Header>
                          <FormGroup>
                            <FormField width={4}>
                              <Input label="Total Packages" inputProps={{ type: 'number' }} name="pkgAmount" />
                            </FormField>
                          </FormGroup>

                        </Grid.Column>
                        <GridColumn width={6}>
                          <Grid centered>
                            <GridColumn width={12}>

                              <Header as="h3">Is there any order minimum requirement?</Header>
                              <FormGroup>
                                <Radio label="No" value={false} name="minimumRequirement" />
                                <Radio label="Yes" value={true} name="minimumRequirement" />
                              </FormGroup>
                              <FormGroup>
                                <FormField width={5}>
                                  <Input label="Minimum OQ" name="minimum" inputProps={{ type: 'number', disabled: !values.minimumRequirement }} />
                                </FormField>
                                <FormField width={5}>
                                  <Input label="Splits" name="splits" inputProps={{ type: 'number', disabled: !values.minimumRequirement }} />
                                </FormField>
                              </FormGroup>

                              <Header as='h3'>How many price tiers would you like to offer?</Header>
                              <FormGroup>
                                <FormField width={5}>
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
                                </FormField>
                              </FormGroup>

                              <Header as='h3' style={{marginBottom: '2rem'}}>What is the FOB price for each tier?</Header>
                              <Grid className='tier-prices'>
                                {this.renderPricingTiers(values.priceTiers)}
                              </Grid>

                              <Divider style={{marginTop: '3rem', marginBottom: '3rem'}}/>

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
                          </Grid>
                        </GridColumn>

                        <GridColumn width={5}>
                          {this.renderProductDetails(values)}
                        </GridColumn>
                      </Grid>
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: 'OPTIONAL PRODUCT INFO',
                  render: () => (
                    <Tab.Pane>
                      <Grid style={{marginTop: '2rem'}}>
                        <GridColumn width={11}>
                          <Grid columns={3} centered>
                            <GridColumn width={5} floated='left'>
                              <FormField width={16}>
                                <Dropdown
                                  label="Origin"
                                  name="origin"
                                  options={searchedOrigins}
                                  inputProps={{
                                    size: 'large',
                                    minCharacters: 3,
                                    icon: "search",
                                    search: true,
                                    selection: true,
                                    clearable: true,
                                    loading: searchedOriginsLoading,
                                    onChange: (e, v) => { console.log(v) },
                                    onSearchChange: (e, { searchQuery }) => searchQuery.length > 2 && searchOrigins(searchQuery)
                                  }}
                                />
                              </FormField>
                              <FormField width={16}>
                                <Dropdown
                                  label="Manufacturer"
                                  name="manufacturer"
                                  options={searchedManufacturers}
                                  inputProps={{
                                    size: 'large',
                                    minCharacters: 3,
                                    icon: "search",
                                    search: true,
                                    selection: true,
                                    clearable: true,
                                    loading: searchedManufacturersLoading,
                                    onChange: (e, v) => { console.log(v) },
                                    onSearchChange: (e, { searchQuery }) => searchQuery.length > 2 && searchManufacturers(searchQuery)
                                  }}
                                />
                              </FormField>
                              <FormField width={16}>
                                <Input label="Trade Name" name="tradeName" inputProps={{ type: 'text' }} />
                              </FormField>
                            </GridColumn>
                            <GridColumn width={5}>
                              <FormField width={16}>
                                <Dropdown label="Form" name="productForm" options={listForms} />
                              </FormField>
                              <FormGroup>
                                <FormField width={8}>
                                  <Dropdown label="Condition" name="productCondition" options={listConditions} />
                                </FormField>
                                <FormField width={8}>
                                  <Dropdown label="Grade" name="productGrade" options={listGrades} />
                                </FormField>
                              </FormGroup>
                              <FormGroup>
                                <FormField width={8}>
                                  <Input name={`assayMin`} label="Assay Min %" inputProps={{ type: 'number', step: '0.001', value: null }} />
                                </FormField>
                                <FormField width={8}>
                                  <Input name={`assayMax`} label="Assay Max %" inputProps={{ type: 'number', step: '0.001', value: null }} />
                                </FormField>
                              </FormGroup>
                            </GridColumn>
                            <GridColumn width={5} floated='right'>
                              <FormField width={16}>
                                <TextArea name='externalNotes' label='External Notes' />
                              </FormField>
                              <FormField width={16}>
                                <TextArea name='internalNotes' label='Internal Notes' />
                              </FormField>
                            </GridColumn>
                          </Grid>

                          <Divider />

                          <Header as='h3'>Does this Product Offer consist of multiple lots?</Header>

                          <FieldArray
                            name="lots"
                            render={arrayHelpers => (
                              <>
                                <FormGroup inline>
                                  <Radio label="No" value={false} name="multipleLots" inputProps={{onClick: (event, data = {data, values, arrayHelpers}) => {
                                      if (values.lots) {
                                        for (let i = values.lots.length; i >= 0; i--) {
                                          arrayHelpers.remove(i)
                                        }
                                      }
                                    }}} />
                                  <Radio label="Yes" value={true} name="multipleLots" inputProps={{onClick: (event, data = {data, values, arrayHelpers}) => {
                                      if (!values.lots || !values.lots.length) {
                                        arrayHelpers.push({
                                          lotNumber: null,
                                          pkgAmount: null,
                                          manufacturedDate: '',
                                          expirationDate: ''
                                        })
                                      }
                                    }}} />
                                </FormGroup>

                                {values.multipleLots ? (
                                  <>
                                    <Message attached='top' className='header-table-fields'>
                                      <Button type='button' icon='plus' color='blue' size='small' floated='right' style={{marginTop: '-0.5em'}} onClick={() => arrayHelpers.push({lotNumber: null, pkgAmount: null, manufacturedDate: '', expirationDate: ''})} />
                                      Lot Details
                                    </Message>
                                    <Table attached='bottom' className='table-fields'>
                                      <Table.Header>
                                        <Table.Row>
                                          <TableHeaderCell title='What is the lot number?'>Lot #</TableHeaderCell>
                                          <TableHeaderCell title='How many packages in this lot?'>Total</TableHeaderCell>
                                          <TableHeaderCell>Available</TableHeaderCell>
                                          <TableHeaderCell>Allocated</TableHeaderCell>
                                          <TableHeaderCell title='What is the MFG?'>MFG Date</TableHeaderCell>
                                          <TableHeaderCell title='What is the expiration?'>Expiration Date</TableHeaderCell>
                                          <TableHeaderCell>C of A</TableHeaderCell>
                                          <TableHeaderCell>&nbsp;</TableHeaderCell>
                                        </Table.Row>
                                      </Table.Header>
                                      <Table.Body>
                                        {values.lots && values.lots.length ? values.lots.map((lot, index) => (
                                          <Table.Row key={index}>
                                            <TableCell><Input name={`lots[${index}].lotNumber`} /></TableCell>
                                            <TableCell><Input name={`lots[${index}].pkgAmount`} /></TableCell>
                                            <TableCell>0</TableCell>
                                            <TableCell>0</TableCell>
                                            <TableCell><DateInput name={`lots[${index}].manufacturedDate`} /></TableCell>
                                            <TableCell><DateInput name={`lots[${index}].expirationDate`} /></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell><Icon name='trash alternate outline' size='large' onClick={() => arrayHelpers.remove(index)} /></TableCell>
                                          </Table.Row>
                                        )) : ''
                                        }
                                      </Table.Body>
                                    </Table>
                                  </>
                                ) : ''}
                              </>
                            )}
                          />

                          <Header as='h3'>PRODUCT COST</Header>
                          <Grid>
                            <GridColumn width={4}>
                              <FormField width={12}>
                                <Input name='costUom' label='Cost/UOM' inputProps={{ type: 'number', step: '0.01', value: null, min: 0 }} />
                              </FormField>
                              <FormField>
                                <label>Track Sub-Costs</label>
                                <Radio label="Yes" value={true} name="trackSubCosts" />
                                <Radio label="No" value={false} name="trackSubCosts" />
                              </FormField>
                            </GridColumn>
                            <GridColumn width={12}>
                              <FieldArray name="costs"
                                          render={arrayHelpers => (
                                  <>
                                    <Message attached='top' className='header-table-fields'>
                                      <Button type='button' icon='plus' color='blue' size='small' floated='right' style={{marginTop: '-0.5em'}} onClick={() => arrayHelpers.push({description: '', lot: 0, cost: null, costUom: null})} />
                                      Sub-Cost Breakdown
                                    </Message>
                                    <Table attached='bottom' className='table-fields'>
                                      <Table.Header>
                                        <Table.Row>
                                          <TableHeaderCell width={4}>Description</TableHeaderCell>
                                          <TableHeaderCell width={2}>Lot</TableHeaderCell>
                                          <TableHeaderCell width={3}>Cost</TableHeaderCell>
                                          <TableHeaderCell width={3}>Cost/UOM</TableHeaderCell>
                                          <TableHeaderCell width={3}>Attachment</TableHeaderCell>
                                          <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                                        </Table.Row>
                                      </Table.Header>
                                      <Table.Body>
                                        {values.costs && values.costs.length ? values.costs.map((lot, index) => (
                                          <Table.Row key={index}>
                                            <TableCell width={4}><FormField width={16}><Input name={`costs[${index}].description`} /></FormField></TableCell>
                                            <TableCell width={2}>
                                              <FormField width={16}>
                                                <Dropdown
                                                  name={`costs[${index}].lot`}
                                                  options={[{
                                                      key: 0,
                                                      text: 'All',
                                                      value: 0
                                                    }].concat(values.lots && values.lots.length ? values.lots.map((lot, index) => {
                                                      return {
                                                        key: index + 1,
                                                        text: lot.lotNumber,
                                                        value: lot.lotNumber
                                                      }
                                                    }) : [])
                                                  }
                                                />
                                              </FormField>
                                            </TableCell>
                                            <TableCell width={3}><FormField width={16}><Input name={`costs[${index}].cost`} /></FormField></TableCell>
                                            <TableCell width={3}><FormField width={16}><Input name={`costs[${index}].costUom`} /></FormField></TableCell>
                                            <TableCell width={3}>&nbsp;</TableCell>
                                            <TableCell width={1}><Icon name='trash alternate outline' size='large' onClick={() => arrayHelpers.remove(index)} /></TableCell>
                                          </Table.Row>
                                        )) : ''
                                        }
                                      </Table.Body>
                                    </Table>
                                  </>
                                )}
                              />
                            </GridColumn>
                          </Grid>

                        </GridColumn>

                        <GridColumn width={5} floated='right'>{this.renderProductDetails(values)}</GridColumn>
                      </Grid>
                    </Tab.Pane>
                  )
                }
              ]} />
            </>
          )}
        </Form>
      </>
    )
  }
}