import React, { Component } from "react"
import Router from 'next/router'
import { Form, Input, Checkbox, Radio, Dropdown, Button, TextArea } from 'formik-semantic-ui'
import { FormattedMessage } from 'react-intl'
import { Modal, Icon, Segment, Dimmer, Loader, Container, Menu, Header, Divider, Grid, GridRow, GridColumn, Table, TableCell, TableHeaderCell, FormGroup, FormField, Accordion, Message, Label, Tab, Popup } from 'semantic-ui-react'
import styled from 'styled-components'
import * as val from 'yup'
import { DateInput } from '~/components/custom-formik'
import UploadLot from './upload/UploadLot'
import { FieldArray } from "formik"
import ProdexGrid from '~/components/table'

// debug purposes only
import JSONPretty from 'react-json-pretty'


const TopDivider = styled(Divider)`
  padding-bottom: 20px;
`

const CustomPaddedColumn = styled(GridColumn)`
  width: 75% !important;
  padding-top: 0px !important;
  
  @media only screen and (max-width: 1680px) {
    width: 100% !important;
  }
`

const CustomPaddedContent = styled(Accordion.Content)`
  padding-top: 15px !important;
`

const ResponsiveColumn = styled(GridColumn)`
  @media only screen and (max-device-width: 991px) {
    padding-bottom: 14px;
}
`

const initValues = {
  additionalType: 'Unspecified',
  costs: [],
  doesExpire: false,
  inStock: true,
  lots: [],
  minimumRequirement: true,
  minimum: 1,
  multipleLots: false,
  pkgAmount: 0,
  priceTiers: 1,
  pricingTiers: [
    { price: null, quantityFrom: 1 }
  ],
  product: "",
  processingTimeDays: 1,
  splits: 1,
  touchedLot: false,
  trackSubCosts: true,
  validityDate: "",
  warehouse: 0
}

val.addMethod(val.object, 'uniqueProperty', function (propertyName, message) {
  return this.test('unique', message, function (value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const currentIndex = options.indexOf(value)

    const subOptions = options.slice(0, currentIndex)

    if (subOptions.some((option) => option[propertyName] === value[propertyName])) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message,
      })
    }

    return true
  })
})

const validationScheme = val.object().shape({
  costs: val.array().of(val.object().shape({
    description: val.string(),
    lot: val.number().moreThan(-1, 'Lot has to be selected').required("required"),
    cost: val.number().nullable().moreThan(0, "Must be greater than 0").required("required").test("maxdec", "There can be maximally 3 decimal places.", val => {
      return !val || val.toString().indexOf('.') === -1 || val.toString().split(".")[1].length <= 3
    })
  })),
  inStock: val.bool().required("required"),
  product: val.string().required("required"),
  processingTimeDays: val.number().required("required"),
  doesExpire: val.bool(),
  pkgAmount: val.number().typeError('must be number').nullable().moreThan(0, 'Amount has to be greater than 0').required("required"),
  validityDate: val.string().matches(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/, { message: 'not valid date' }),
  lots: val.array().of(val.object().uniqueProperty('lotNumber', 'LOT number has to be unique').shape({
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
  pricingTiers: val.array().of(val.object().shape({
    quantityFrom: val.number().typeError('must be number').nullable().moreThan(0, "Must be greater than 0").required("Minimum quantity must be set"),
    price: val.number().typeError('must be number').nullable().moreThan(0, "Must be greater than 0").required("required").test("maxdec", "There can be maximally 3 decimal places.", val => {
      return !val || val.toString().indexOf('.') === -1 || val.toString().split(".")[1].length <= 3
    })
  })),
  touchedLot: val.bool(),
  warehouse: val.number().moreThan(0, "required").required('required')
})

class AddInventoryForm extends Component {

  state = {
    initialState: {

    },
    activeIndex: 0,
    activeTab: 0
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

  switchTab = (newTab, values, setFieldValue) => {
    let lotAmount = values.lots.length === 0 ? parseInt(values.pkgAmount) : 0
    if (newTab === 1 && lotAmount > 0) {
      setFieldValue('lots[0].lotNumber', '1')
      setFieldValue('lots[0].pkgAmount', lotAmount)
      this.setState({
        activeTab: newTab
      })
    } else {
      this.setState({
        activeTab: newTab
      })
    }
  }

  renderPricingTiers = (count) => {
    let tiers = []

    for (let i = 0; i < count; i++) {
      tiers.push(
        <Grid.Row key={i}>
          <Grid.Column width={2}>
            {i ? (
              <Label name={`pricingTiers[${i}].level`}>{i + 1}</Label>
            ) : (
                <div className='field'>
                  <label>Level</label>
                  <Label name={`pricingTiers[${i}].level`}>{i + 1}</Label>
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
                <Input name={`pricingTiers[${i}].quantityFrom`} label={i ? '' : "Minimum OQ"} inputProps={{ type: 'number', readOnly: i === 0, value: null }} />
              </FormField>
              <Form.Field width={8}>
                <Input name={`pricingTiers[${i}].price`} label={i ? '' : "FOB Price"} inputProps={{ type: 'number', step: '0.001', value: null }} />
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

  renderProductDetails = (values, validateForm) => {
    const {
      activeIndex
    } = this.state

    const {toastManager} = this.props

    return (
      <Grid className='product-details' centered>
        <CustomPaddedColumn>
          <Segment fluid attached={values.product ? false : 'top'} style={{ padding: '1.5em' }}>
            <Accordion>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.accClick}>
                <Header as='h4'>
                  <Icon name={activeIndex === 0 ? 'chevron down' : 'chevron right'} />PRODUCT DETAILS
                </Header>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Grid columns={2} className='data-grid'>
                  <GridColumn computer={8} mobile={16}>Product Name</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.productName : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>Product Number</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.productCode : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>Measurement</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.packagingSize : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>U/M</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.packagingUnit ? values.product.packagingUnit.name : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>U/P</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.packagingType ? values.product.packagingType.name : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>CAS Index Name</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.casProduct ? values.product.casProduct.casIndexName : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>CAS Number</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.casProduct ? values.product.casProduct.casNumber : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>Master Product</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? !!values.product.masterProduct : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>Chemical Name</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.casProduct ? values.product.casProduct.chemicalName : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>Hazaardous</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.hazaardous ? !!values.product.hazaardous : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>UN Code</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.unNumber ? values.product.unNumber.unNumberCode : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>Packaging Group</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.packagingGroup ? values.product.packagingGroup.groupCode : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>Hazaardous Class</GridColumn>
                  <GridColumn computer={8} mobile={16}><Label.Group color='blue'>{values.product && values.product.hazardClasses ? values.product.hazardClasses.map(hClass => { return (<Popup content={hClass.description} trigger={<Label>{hClass.classCode}</Label>} />) }) : ''}</Label.Group></GridColumn>

                  <GridColumn computer={8} mobile={16}>Stackable</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.stackable : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>Freight Class</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.freightClass : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}>NMFC Number</GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.nmfcNumber : ''}</GridColumn>
                </Grid>
              </Accordion.Content>
            </Accordion>
          </Segment>
          {values.product ? '' : (
            <Message attached='bottom'>
              <Icon name='info circle outline' size='large' color='blue' />
              Please search product to fill data above.
            </Message>
          )}

          <Segment className='segment-fixed'>
            <Grid verticalAlign='middle'>
              <GridRow>
                <ResponsiveColumn computer={6} mobile={16}>
                  <Button fluid size='big' floated='left' onClick={() => this.goToList()}>
                    <FormattedMessage id='addInventory.cancel' defaultMessage='Cancel'/></Button>
                </ResponsiveColumn>
                <GridColumn computer={10} mobile={16}>
                  <Button.Submit fluid
                                 size='big'
                                 floated='right'
                                 onClick={(e, data={data, validateForm}) => {
                                   validateForm()
                                     .then(r => {
                                       // stop when errors found
                                       if (Object.keys(r).length) {
                                         toastManager.add((
                                           <div>
                                             <strong>Form is invalid</strong>
                                             <div>There are errors on current tab. Please, fix them before submit.</div>
                                           </div>
                                         ), {
                                           appearance: 'error',
                                           autoDismiss: true
                                         })
                                       }
                                     }).catch(e => {
                                       console.log('CATCH', e)
                                     })
                                 }}
                                 style={{ paddingLeft: '1em', paddingRight: '1em' }}
                  >
                    <FormattedMessage id={this.props.edit ? 'addInventory.editButton' : 'addInventory.addButton'}
                                      defaultMessage={this.props.edit ? 'Save Product Offer' : 'Add Product Offer'} />
                  </Button.Submit>
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>
        </CustomPaddedColumn>
      </Grid>
    )
  }

  resetForm = () => {
    this.props.resetForm(initValues)
  }

  goToList = () => {
    this.resetForm()
    Router.push('/inventory/my')
  }

  modifyCosts = (setFieldValue, values) => {
    if (!values.costs.length)
      return true

    for (let i = 0; i < values.costs.length; i++) {
      setFieldValue(`costs[${i}].costUom`, +(parseFloat(values.costs[i].cost) * (parseInt(values.costs[i].lot) > 0 ? parseFloat(values.lots[parseInt(values.costs[i].lot) - 1].pkgAmount) : (parseInt(values.costs[i].lot) < 0 ? 0 : values.lots.reduce((all, lot) => all + parseFloat(lot.pkgAmount), 0))).toFixed(3)))
    }
  }

  removeLot = (lotHelpers, setFieldValue, values, lotIndex) => {
    if (values.costs.length) {
      for (let i = 0; i < values.costs.length; i++) {
        // unset all cost rows if they are using only removed lot
        if (parseInt(values.costs[i].lot - 1) === lotIndex) {
          values.costs[i].lot = -1
          setFieldValue(`costs[${i}].lot`, -1)
        }
        // if used lot has higher index then it has to be moved down as one lot will be completely removed
        if (parseInt(values.costs[i].lot - 1) > lotIndex) {
          values.costs[i].lot = parseInt(values.costs[i].lot) - 1
          setFieldValue(`costs[${i}].lot`, parseInt(values.costs[i].lot))
        }
      }
    }

    // remove lot row
    lotHelpers.remove(lotIndex)
    values.lots = values.lots.filter((lot, index) => {
      return index !== lotIndex
    })

    // modify costs
    this.modifyCosts(setFieldValue, values)
  }

  componentWillMount = async () => {
    await this.props.resetForm()
  }

  componentDidMount = () => {
    const {initProductOfferEdit, edit} = this.props
    
    initProductOfferEdit(edit)
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
      initialState,
      editProductOffer,
      uploadDocuments,
      loading
    } = this.props

    const {
      //initialState,
      activeIndex
    } = this.state

    return (
      <div id="page" className='flex stretched'>
        <Dimmer active={loading} inverted>
          <Loader inverted>
            <FormattedMessage id='global.loading' defaultMessage='Loading' />
          </Loader>
        </Dimmer>
        <div className='header-top' style={{padding: '0 32px'}}>
          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage id={this.props.edit ? 'addInventory.editInventory' : 'addInventory.addInventory'}
                                  defaultMessage={this.props.edit ? 'EDIT INVENTORY' : 'ADD INVENTORY'} />
              </Header>
            </Menu.Item>
          </Menu>
        </div>

        <Form
          enableReinitialize
          initialValues={{ ...initValues, ...initialState }}
          validationSchema={validationScheme}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false)
            addProductOffer(values, this.props.edit)
              .then((productOffer) => {
                //Router.push('/inventory/my') xxx
              })
              .finally(() => {
                actions.resetForm()
              })
          }}
          className='inventory flex'
          style={{padding: '20px'}}
        >
          {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => (
            <>
              <Modal open={this.props.poCreated} closeOnDimmerClick={false} size='tiny'>
                <Modal.Header>
                  <FormattedMessage id={this.props.edit ? 'addInventory.editDone' : 'addInventory.addDone'}
                                    defaultMessage={this.props.edit ? 'Product Offer was edited' : 'Product Offer was created'} />
                </Modal.Header>
                {this.props.edit ? '' : (
                  <Modal.Content>
                    <FormattedMessage id={'addInventory.whatNow'}
                                      defaultMessage={'What now?'} />
                  </Modal.Content>
                )}
                <Modal.Actions>
                  {this.props.edit ? '' : (
                    <Button icon='add' labelPosition='right' content='Add another one' onClick={this.resetForm} />
                  )}
                  <Button primary icon='checkmark' labelPosition='right' content='Go to My Inventory' onClick={this.goToList} />
                </Modal.Actions>
              </Modal>
              <div className="flex stretched" style={{padding: '0 32px'}}>
              <Tab className='inventory flex stretched' menu={{ secondary: true, pointing: true }} renderActiveOnly={false} activeIndex={this.state.activeTab} style={{height: '100%'}} panes={[
                {
                  menuItem: (
                    <Menu.Item key='productOffer' onClick={() => {
                      validateForm()
                        .then(r => {
                          // stop when errors found
                          if (Object.keys(r).length) {
                            submitForm() // show errors
                            return false
                          }

                          // if validation is correct - switch tabs
                          this.switchTab(0, values, setFieldValue)
                        })
                        .catch(e => {
                          console.log('CATCH', e)
                        })
                    }}>
                      PRODUCT OFFER
                    </Menu.Item>
                  ),
                  pane: (
                    <Tab.Pane style={{height: '1px', flexGrow: '10', flexShrink: '10'}}>
                      <Grid divided style={{ marginTop: '2rem' }}>
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
                              <Dropdown label="Warehouse" name="warehouse" options={warehousesList} inputProps={{
                                selection: true,
                                value: 0
                              }} />
                            </FormField>
                          </FormGroup>

                          <Header as='h3'>How many packages are available?</Header>
                          <FormGroup>
                            <FormField width={4}>
                              <Input label="Total Packages" inputProps={{ type: 'number'}} name="pkgAmount" />
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
                                      onChange: (e, { value }) => setFieldValue(
                                        "pricingTiers",
                                        [
                                          ...values.pricingTiers.slice(0, value),
                                          ...[...new Array((value - values.priceTiers) > 0 ? value - values.priceTiers : 0)].map(t => ({price: '0', quantityFrom: '0'}))
                                        ]
                                      )
                                    }}
                                  />
                                </FormField>
                              </FormGroup>

                              <Header as='h3' style={{ marginBottom: '2rem' }}>What is the FOB price for each tier?</Header>
                              <Grid className='tier-prices'>
                                {this.renderPricingTiers(values.priceTiers)}
                              </Grid>

                              <Divider style={{ marginTop: '3rem', marginBottom: '3rem' }}/>

                              <Header as='h3'>Upload Spec Sheet</Header>
                              <UploadLot {...this.props}
                                         attachments={values.attachments}
                                         name='attachments'
                                         type='Spec Sheet'
                                         fileMaxSize={20}
                                         onChange={(files) => setFieldValue(
                                           `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
                                           {
                                             id: files.id,
                                             name: files.name
                                           }
                                         )}
                                         emptyContent={(
                                           <label>
                                             <FormattedMessage
                                               id='addInventory.dragDrop'
                                               defaultMessage={'Drag and drop ' + this.props.type + ' file here'}
                                               values={{docType: this.props.type}}
                                             />
                                             <br />
                                             <FormattedMessage
                                               id='addInventory.dragDropOr'
                                               defaultMessage={'or select from computer'}
                                             />
                                           </label>
                                         )}
                                         uploadedContent={(
                                           <label>
                                             <FormattedMessage
                                               id='addInventory.dragDrop'
                                               defaultMessage={'Drag and drop ' + this.props.type + ' file here'}
                                               values={{docType: this.props.type}}
                                             />
                                             <br />
                                             <FormattedMessage
                                               id='addInventory.dragDropOr'
                                               defaultMessage={'or select from computer'}
                                             />
                                           </label>
                                         )}
                              />

                            </GridColumn>
                          </Grid>
                        </GridColumn>

                        <GridColumn width={5}>
                          {this.renderProductDetails(values, validateForm)}
                        </GridColumn>
                      </Grid>
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: (
                    <Menu.Item key='productOptional' onClick={() => {
                      validateForm()
                        .then(r => {
                          // stop when errors found
                          if (Object.keys(r).length) {
                            submitForm() // show errors
                            return false
                          }

                          // if validation is correct - switch tabs
                          this.switchTab(1, values, setFieldValue)
                        })
                        .catch(e => {
                          console.log('CATCH', e)
                        })
                    }}>
                      OPTIONAL PRODUCT INFO
                    </Menu.Item>
                  ),
                  pane: (
                    <Tab.Pane style={{height: '1px', flexGrow: '10', flexShrink: '10'}}>
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
                                <Message attached='top' className='header-table-fields'>
                                  <Button type='button' icon='plus' color='blue' size='small' floated='right' style={{marginTop: '-0.5em'}} onClick={() => arrayHelpers.push({lotNumber: null, pkgAmount: null, manufacturedDate: '', expirationDate: ''})} />
                                  Lot Details
                                </Message>
                                <Table attached='bottom' className='table-fields'>
                                  <Table.Header>
                                    <Table.Row>
                                      <Popup content={'What is the lot number?'} trigger={<TableHeaderCell>Lot #</TableHeaderCell>} />
                                      <Popup content={'How many packages in this lot?'} trigger={<TableHeaderCell>Total</TableHeaderCell>} />
                                      <TableHeaderCell>Available</TableHeaderCell>
                                      <TableHeaderCell>Allocated</TableHeaderCell>
                                      <Popup content={'What is the MFG?'} trigger={<TableHeaderCell>MFG Date</TableHeaderCell>} />
                                      <Popup content={'What is the expiration?'} trigger={<TableHeaderCell>Expiration Date</TableHeaderCell>} />
                                      <TableHeaderCell>C of A</TableHeaderCell>
                                      <TableHeaderCell>&nbsp;</TableHeaderCell>
                                    </Table.Row>
                                  </Table.Header>
                                  <Table.Body>
                                    {values.lots && values.lots.length ? values.lots.map((lot, index) => (
                                      <Table.Row key={index}>
                                        <TableCell><Input name={`lots[${index}].lotNumber`} inputProps={{onClick: () => setFieldValue('touchedLot', true)}} /></TableCell>
                                        <TableCell><Input name={`lots[${index}].pkgAmount`} inputProps={{
                                          onClick: () => setFieldValue('touchedLot', true),
                                          onChange: (e, data) => this.modifyCosts(setFieldValue, {
                                            costs: values.costs,
                                            lots: values.lots.map((bLot, bIndex) => {
                                              return {
                                                pkgAmount: bIndex === index ? data.value : bLot.pkgAmount
                                              }
                                            })
                                          })
                                        }} /></TableCell>
                                        <TableCell>0</TableCell>
                                        <TableCell>0</TableCell>
                                        <TableCell><DateInput name={`lots[${index}].manufacturedDate`} /></TableCell>
                                        <TableCell><DateInput name={`lots[${index}].expirationDate`} /></TableCell>
                                        <TableCell>
                                          <UploadLot {...this.props}
                                                     attachments={values.lots[index].attachments}
                                                     name={`lots[${index}].attachments`}
                                                     type='Lot Attachment'
                                                     lot={true}
                                                     filesLimit={1}
                                                     fileMaxSize={20}
                                                     onChange={(files) => setFieldValue(
                                                       `lots[${index}].attachments[${values.lots[index].attachments && values.lots[index].attachments.length ? values.lots[index].attachments.length : 0}]`,
                                                       {
                                                         id: files.id,
                                                         name: files.name
                                                       }
                                                     )}
                                                     emptyContent={(
                                                       <FormattedMessage
                                                         id='addInventory.clickUpload'
                                                         defaultMessage={'Click to upload'}
                                                       />
                                                     )}
                                          />
                                        </TableCell>
                                        <TableCell><Icon name='trash alternate outline' size='large' onClick={() => this.removeLot(arrayHelpers, setFieldValue, { costs: values.costs, lots: values.lots }, index)} /></TableCell>
                                      </Table.Row>
                                    )) : ''
                                    }
                                  </Table.Body>
                                </Table>
                              </>
                            )}
                          />

                          <Header as='h3'>PRODUCT COST</Header>
                          <Grid>
                            <GridColumn width={4}>
                              <FormField width={12}>
                                <Input name='cost' label='Cost/UOM' inputProps={{ type: 'number', step: '0.01', value: null, min: 0 }} />
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
                                      <Button type='button' icon='plus' color='blue' size='small' disabled={!values.trackSubCosts} floated='right' style={{marginTop: '-0.5em'}} onClick={() => arrayHelpers.push({description: '', lot: 0, cost: null, costUom: null})} />
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
                                        {values.costs && values.costs.length ? values.costs.map((costRow, index) => (
                                          <Table.Row key={index}>
                                            <TableCell width={4}><FormField width={16}><Input inputProps={{disabled: !values.trackSubCosts}} name={`costs[${index}].description`} /></FormField></TableCell>
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
                                                        value: index + 1
                                                      }
                                                    }) : [])
                                                  }
                                                  inputProps={{
                                                    onChange: (e, data) => setFieldValue(`costs[${index}].costUom`, +(parseFloat(values.costs[index].cost) * (parseInt(data.value) ? parseFloat(values.lots[parseInt(data.value) - 1].pkgAmount) : values.lots.reduce((all, lot) => all + parseFloat(lot.pkgAmount), 0))).toFixed(3)),
                                                    disabled: !values.trackSubCosts
                                                  }}
                                                />
                                              </FormField>
                                            </TableCell>
                                            <TableCell width={3}><FormField width={16}><Input name={`costs[${index}].cost`} inputProps={{ type: 'number', step: '1', value: null, min: 0, disabled: !values.trackSubCosts, onChange: (e, data) => setFieldValue(`costs[${index}].costUom`, +(parseFloat(data.value) * (parseInt(values.costs[index].lot) ? parseFloat(values.lots[parseInt(values.costs[index].lot) - 1].pkgAmount) : values.lots.reduce((all, lot) => all + parseFloat(lot.pkgAmount), 0))).toFixed(3))}} /></FormField></TableCell>
                                            <TableCell width={3}><FormField width={16}><Input name={`costs[${index}].costUom`} inputProps={{ type: 'text', step: '0.01', value: null, min: 0, disabled: true }} /></FormField></TableCell>
                                            <TableCell width={3}>
                                              <UploadLot {...this.props}
                                                         attachments={values.costs[index].attachments}
                                                         name={`costs[${index}].attachments`}
                                                         type='Cost Attachment'
                                                         lot={false}
                                                         filesLimit={1}
                                                         fileMaxSize={20}
                                                         disabled={!values.trackSubCosts}
                                                         onChange={(files) => setFieldValue(
                                                           `costs[${index}].attachments[${values.costs[index].attachments && values.costs[index].attachments.length ? values.costs[index].attachments.length : 0}]`,
                                                           {
                                                             id: files.id,
                                                             name: files.name
                                                           }
                                                         )}
                                                         emptyContent={(
                                                           <FormattedMessage
                                                             id='addInventory.clickUpload'
                                                             defaultMessage={'Click to upload'}
                                                           />
                                                         )}
                                              />
                                            </TableCell>
                                            <TableCell width={1}><Icon name='trash alternate outline' size='large' disabled={!values.trackSubCosts} onClick={() => arrayHelpers.remove(index)} /></TableCell>
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

                          <Header as='h3'>ADDITIONAL DOCUMENTS</Header>
                          <Grid>
                            <GridColumn width={10}>
                              <UploadLot {...this.props}
                                         attachments={values.additional}
                                         name='additional'
                                         type={values.additionalType}
                                         unspecifiedTypes={['Unspecified']}
                                         fileMaxSize={20}
                                         onChange={(files) => setFieldValue(
                                           `additional[${values.additional && values.additional.length ? values.additional.length : 0}]`,
                                           {
                                             id: files.id,
                                             name: files.name
                                           }
                                         )}
                                         emptyContent={(
                                           <label>
                                             <FormattedMessage
                                               id='addInventory.dragDropAdditional'
                                               defaultMessage={'Drop additional documents here'}
                                             />
                                             <br />
                                             <FormattedMessage
                                               id='addInventory.dragDropOr'
                                               defaultMessage={'or select from computer'}
                                             />
                                           </label>
                                         )}
                                         uploadedContent={(
                                           <label>
                                             <FormattedMessage
                                               id='addInventory.dragDropAdditional'
                                               defaultMessage={'Drop additional documents here'}
                                             />
                                             <br />
                                             <FormattedMessage
                                               id='addInventory.dragDropOr'
                                               defaultMessage={'or select from computer'}
                                             />
                                           </label>
                                         )}
                              />
                            </GridColumn>
                            <GridColumn width={5}>
                              <FormField width={16}>
                                <Dropdown
                                  name={`additionalType`}
                                  options={[{
                                      key: 0,
                                      text: 'Select Type',
                                      value: 'Unspecified'
                                    }, {
                                      key: 1,
                                      text: 'B/L',
                                      value: 'B/L'
                                    }, {
                                      key: 1,
                                      text: 'SDS',
                                      value: 'SDS'
                                  }]}
                                />
                              </FormField>
                            </GridColumn>
                          </Grid>

                        </GridColumn>

                        <GridColumn width={5}>
                          {this.renderProductDetails(values, validateForm)}
                        </GridColumn>
                      </Grid>
                    </Tab.Pane>
                  )
                }
              ]} />
              </div>
            </>
          )}
        </Form>
      </div>
    )
  }
}

export default AddInventoryForm