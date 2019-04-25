import React, { Component } from "react"
import Router from 'next/router'
import { Form, Input, Checkbox, Radio, Dropdown, Button } from 'formik-semantic-ui'
import { FormattedMessage } from 'react-intl';
import { Modal, Icon, Segment, Container, Menu, Header, Divider, Grid, GridColumn, FormGroup, FormField, Accordion, Message, Label, GridRow } from 'semantic-ui-react'
import styled from 'styled-components'
import * as val from 'yup'
import { DateInput } from '~/components/custom-formik'
import UploadLot from './upload/UploadLot'
import { FieldArray } from "formik"

// debug purposes only
import JSONPretty from 'react-json-pretty'


const TopDivider = styled(Divider)`
  padding-bottom: 20px;
`

const CustomPaddedColumn = styled(GridColumn)`
  padding-top: 0px !important; 
`

const CustomMargedGrid = styled(Grid)`
  margin: 0px 5px 5px 5px !important;
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
              <Label name={`pricing.tiers[${i}].level`}>{i + 1}</Label>
            ) : (
                <div className='field'>
                  <label>Level</label>
                  <Label name={`pricing.tiers[${i}].level`}>{i + 1}</Label>
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
    await this.props.getWarehouses()
    if (this.props.edit) {
      this.props.getProductOffer(this.props.edit).then(async (response) => {
        // need to prepare searchedProducts before filling form data
        await this.props.fillProduct(response.value.data.product)
        setTimeout(() => {
          this.setState({
            initialState: {
              doesExpire: !!response.value.data.lots[0].expirationDate,
              lots: response.value.data.lots,
              minimum: response.value.data.minimum,
              pkgAmount: response.value.data.pkgAmount,
              priceTiers: response.value.data.pricing.tiers.length,
              pricing: {
                ...response.value.data.pricing,
                price: response.value.data.pricing.price.amount
              },
              processingTimeDays: 1,
              product: response.value.data.product,
              splits: response.value.data.splits,
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
          initialValues={{ ...initValues, ...initialState }}
          validationSchema={validationScheme}
          onSubmit={(values, actions) => {
            if (this.props.fileIds.length) {
              values.attachments = this.props.fileIds.map(fi => {
                return fi.id
              })
            }
            addProductOffer(values, this.props.edit)
              .then((productOffer) => {
                //Router.push('/inventory/my') xxx
              })
              .finally(() => {
                actions.setSubmitting(false)
                actions.resetForm(initValues)
              })
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
                              onChange: (e, { value }) => setFieldValue(
                                "pricing.tiers",
                                [
                                  ...values.pricing.tiers.slice(0, value),
                                  ...[...new Array((value - values.priceTiers) > 0 ? value - values.priceTiers : 0)].map(t => ({ price: '0', quantityFrom: '0' }))
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

                      <Divider style={{ marginTop: '3rem', marginBottom: '3rem' }} />

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

                <CustomPaddedColumn width={5}>
                  <CustomMargedGrid className='product-details' relaxed='very'>
                    <Segment fluid attached={values.product ? false : 'top'} style={{ padding: '1.5em' }}>
                      <Accordion>
                        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.accClick}>
                          <Header as='h4'>
                            <Icon name={activeIndex === 0 ? 'chevron down' : 'chevron right'} />PRODUCT DETAILS
                          </Header>
                        </Accordion.Title>
                        <CustomPaddedContent active={activeIndex === 0}>
                          <Grid verticalAlign='middle' className='data-grid'>
                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Product Name</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product ? values.product.productName : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Product Number</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product ? values.product.productCode : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Measurement</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product ? values.product.packagingSize : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>U/M</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product && values.product.packagingUnit ? values.product.packagingUnit.name : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>U/P</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product && values.product.packagingType ? values.product.packagingType.name : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>CAS Index Name</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product && values.product.casProduct ? values.product.casProduct.casIndexName : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>CAS Number</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product && values.product.casProduct ? values.product.casProduct.casNumber : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Master Product</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product ? !!values.product.masterProduct : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Chemical Name</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product && values.product.casProduct ? values.product.casProduct.chemicalName : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Hazaardous</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product && values.product.hazaardous ? !!values.product.hazaardous : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>UN Code</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product && values.product.unNumber ? values.product.unNumber.unNumberCode : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Packaging Group</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product && values.product.packagingGroup ? values.product.packagingGroup.groupCode : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Hazaardous Class</GridColumn>
                              <GridColumn computer={8} mobile={16}><Label.Group color='blue'>{values.product && values.product.hazardClasses ? values.product.hazardClasses.map(hClass => { return (<Label title={hClass.description}>{hClass.classCode}</Label>) }) : ''}</Label.Group></GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Stackable</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product ? values.product.stackable : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>Freight Class</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product ? values.product.freightClass : ''}</GridColumn>
                            </GridRow>

                            <GridRow>
                              <GridColumn computer={8} mobile={16}>NMFC Number</GridColumn>
                              <GridColumn computer={8} mobile={16}>{values.product ? values.product.nmfcNumber : ''}</GridColumn>
                            </GridRow>
                          </Grid>
                        </CustomPaddedContent>
                      </Accordion>
                    </Segment>
                    <Segment>
                      <Grid verticalAlign='middle'>
                        {values.product ? '' : (
                          <GridRow>
                            <GridColumn computer={16}>
                              <Message attached='bottom'>
                                <Icon name='info circle outline' size='large' color='blue' />
                                Please search product to fill data above.
                            </Message>
                            </GridColumn>
                          </GridRow>
                        )}

                        <GridRow>
                          <ResponsiveColumn computer={8} mobile={16}>
                            <Button fluid size='big' floated='left'>Discard</Button>
                          </ResponsiveColumn>
                          <GridColumn computer={8} mobile={16}>
                            <Button.Submit fluid size='big' floated='right'>Submit values</Button.Submit>
                          </GridColumn>
                        </GridRow>
                      </Grid>
                    </Segment>
                  </CustomMargedGrid>
                </CustomPaddedColumn>
              </Grid>
            </>
          )}
        </Form>
      </>
    )
  }
}