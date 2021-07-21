import { useEffect, useState } from 'react'
import { Form, Input, Radio, Dropdown, Button, TextArea } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import {
  Modal,
  Input as SemanticInput,
  Icon,
  Dimmer,
  Loader,
  Menu,
  Header,
  Divider,
  Grid,
  GridColumn,
  Table,
  TableCell,
  TableHeaderCell,
  FormGroup,
  FormField,
  Message,
  Tab,
  Popup
} from 'semantic-ui-react'
// Components
import { DateInput } from '../../../../components/custom-formik'
import UploadAttachment from '../../components/upload/UploadAttachment'
import { FieldArray } from 'formik'
import { AttachmentManager } from '../../../attachments'
// Services
import { debounce } from 'lodash'
import { getSafe } from '../../../../utils/functions'
import { 
  initValues, 
  validationScheme, 
  getProcessingTimes, 
  getPriceTiers, 
  switchTab,
  onSplitsChange,
  renderEditDocuments,
  renderPricingTiers,
  renderProductDetails,
  resetForm,
  goToList,
  removeLot
} from './AddInventoryForm.services'
// Styles
import {
  TableCellBig,
  FileUploadDiv,
  TableCellSmall,
  TableCellMini,
  InnerRow
} from './MyListings.styles'
// Hooks
import { usePrevious } from '../../../../hooks'


// validation array
let tabs = []
// 1st tab
tabs.push([
  'inStock',
  'product',
  'processingTimeDays',
  'doesExpire',
  'pkgAvailable',
  'validityDate',
  'minimumRequirement',
  'minimum',
  'splits',
  'priceTiers',
  'pricingTiers',
  'warehouse'
])
// 2nd tab
tabs.push(['costs', 'lots', 'origin', 'touchedLot'])
// 3rd tab
tabs.push([])

/**
 * AddInventoryForm Component
 * @category Inventory - My Listings
 * @components
 */
const AddInventoryForm = props => {
  const [state, setState] = useState({
    initialState: {},
    activeIndex: 0,
    activeTab: 0,
    searchedProducts: [],
    documents: [],
    openedDocuments: null
  })

  useEffect(() => {
    const { initProductOfferEdit, edit } = props
    const init = async () => {
      await props.resetForm(initValues)
      initProductOfferEdit(edit)
    }
    init()    
  }, [])

  const prevSearchedProducts = usePrevious(props.searchedProducts)
  useEffect(() => {
    if (typeof prevSearchedProducts !== 'undefined') {
      // prepare state for searchedProducts when opened edit form
      if (!state.searchedProducts.length && !prevSearchedProducts.length && props.searchedProducts.length)
        setState({ ...state, searchedProducts: props.searchedProducts })
    }
  }, [props.searchedProducts])

  const searchProducts = debounce(text => {
    props.getAutocompleteData({
      searchUrl: `/prodex/api/company-products/own/search?pattern=${text}&onlyMapped=false`
    })
  }, 250)

  const {
    documentTypesDropdown,
    productConditionsDropdown,
    productFormsDropdown,
    productGradesDropdown,
    searchOrigins,
    searchedOrigins,
    searchedOriginsLoading,
    warehousesList,
    addProductOffer,
    initialState,
    loading,
    intl
  } = props

  let { formatMessage } = intl

  return (
    <div id='page' className='flex stretched'>
      <Dimmer active={loading} inverted>
        <Loader inverted>
          <FormattedMessage id='global.loading' defaultMessage='Loading' />
        </Loader>
      </Dimmer>
      <div className='header-top' style={{ padding: '0 32px' }}>
        <Menu secondary>
          <Menu.Item header>
            <Header as='h1' size='medium'>
              <FormattedMessage
                id={props.edit ? 'addInventory.editInventory' : 'addInventory.addInventory'}
                defaultMessage={props.edit ? 'EDIT INVENTORY' : 'ADD INVENTORY'}
              />
            </Header>
          </Menu.Item>
        </Menu>
      </div>

      <Form
        enableReinitialize={true}
        validateOnChange={false}
        initialValues={{ ...initValues, ...initialState }}
        validationSchema={validationScheme}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await addProductOffer(values, props.edit)
          } catch (e) {
            console.error(e)
          } finally {
            setSubmitting(false)
          }
        }}
        className='flex stretched'
        style={{ padding: '20px' }}>
        {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
          return (
            <>
              <Modal closeIcon onClose={() => resetForm(props)} open={props.poCreated} size='tiny'>
                <Modal.Header>
                  <FormattedMessage
                    id={props.edit ? 'addInventory.editDone' : 'addInventory.addDone'}
                    defaultMessage={props.edit ? 'Product Offer was edited' : 'Product Offer was created'}
                  />
                </Modal.Header>
                {props.edit ? (
                  ''
                ) : (
                  <Modal.Content>
                    <FormattedMessage id='addInventory.whatNow' defaultMessage='What now?' />
                  </Modal.Content>
                )}
                <Modal.Actions>
                  {props.edit ? (
                    ''
                  ) : (
                    <Button onClick={() => resetForm(props)} data-test='new_inventory_add_one_btn'>
                      <FormattedMessage id='addInventory.addAnotherOne' defaultMessage='Add another one' />
                    </Button>
                  )}
                  <Button primary onClick={() => goToList(props)} data-test='new_inventory_go_btn'>
                    <FormattedMessage id='addInventory.goToMyInventory' defaultMessage='Go to My Inventory' />
                  </Button>
                </Modal.Actions>
              </Modal>
              <div className='flex stretched'>
                <Tab
                  className='inventory tab-menu flex stretched'
                  menu={{ secondary: true, pointing: true }}
                  renderActiveOnly={false}
                  activeIndex={state.activeTab}
                  panes={[
                    {
                      menuItem: (
                        <Menu.Item
                          key='productOffer'
                          onClick={() => {
                            validateForm()
                              .then(r => {
                                // stop when errors found
                                if (
                                  Object.keys(r).length &&
                                  Object.keys(r).some(r => tabs[state.activeTab].includes(r))
                                ) {
                                  submitForm() // show errors
                                  return false
                                }

                                // if validation is correct - switch tabs
                                switchTab(0, values, setFieldValue, state, setState)
                              })
                              .catch(e => {
                                console.error('CATCH', e)
                              })
                          }}
                          data-test='new_inventory_productOffer'>
                          {formatMessage({ id: 'addInventory.productOffer', defaultMessage: 'PRODUCT OFFER' })}
                        </Menu.Item>
                      ),
                      pane: (
                        <Tab.Pane key='productOffer' style={{ padding: '0 32px' }}>
                          <Grid divided style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <Grid.Row>
                              <Grid.Column computer={5} tablet={5} mobile={7}>
                                <Grid>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage
                                          id='addInventory.whatToList'
                                          defaultMessage='What product do you want to list?'>
                                          {text => (
                                            <>
                                              {text}
                                              <Popup
                                                content={
                                                  <>
                                                    <FormattedMessage
                                                      id='addInventory.enterProductInfo1'
                                                      defaultMessage='Enter product name or number from your product catalog for the product offer that you want to list. Once you do that, the data related to specified product will populate in the right hand column.'
                                                    />
                                                    <br />
                                                    <br />
                                                    <FormattedMessage
                                                      id='addInventory.enterProductInfo2'
                                                      defaultMessage='If you do not see the product that you want to list, then make sure in Settings/Product Catalog that the product exists and then return to this page.'
                                                    />
                                                    <br />
                                                    <br />
                                                    <FormattedMessage
                                                      id='addInventory.enterProductInfo3'
                                                      defaultMessage='Mapping a product from product catalog is required before entering a product offer.'
                                                    />
                                                  </>
                                                }
                                                trigger={<Icon name='info circle' color='blue' />}
                                                wide
                                              />
                                            </>
                                          )}
                                        </FormattedMessage>
                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn width={10}>
                                      <Dropdown
                                        label={formatMessage({
                                          id: 'addInventory.companyProduct',
                                          defaultMessage: 'Company Product'
                                        })}
                                        name='product'
                                        options={props.autocompleteData.map(el => ({
                                          key: el.id,
                                          text: `${getSafe(() => el.intProductCode, '')} ${getSafe(
                                            () => el.intProductName,
                                            ''
                                          )}`,
                                          value: el.id
                                        }))}
                                        inputProps={{
                                          placeholder: (
                                            <FormattedMessage
                                              id='global.startTypingToSearch'
                                              defaultMessage='Start typing to begin search'
                                            />
                                          ),
                                          loading: props.autocompleteDataLoading,
                                          'data-test': 'new_inventory_product_search_drpdn',
                                          style: { width: '300px' },
                                          size: 'large',
                                          minCharacters: 3,
                                          icon: 'search',
                                          search: options => options,
                                          selection: true,
                                          clearable: true,
                                          onSearchChange: (e, { searchQuery }) =>
                                            searchQuery.length > 2 && searchProducts(searchQuery)
                                        }}
                                      />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage
                                          id='addInventory.isInStock'
                                          defaultMessage='Is this product in stock?'
                                        />
                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={5} tablet={8}>
                                      <Radio
                                        fieldProps={{ width: 5 }}
                                        label={formatMessage({ id: 'global.no', defaultMessage: 'No' })}
                                        value={false}
                                        name='inStock'
                                        data-test='add_inventory_instock_no_rad'
                                      />
                                    </GridColumn>
                                    <GridColumn computer={5} tablet={8}>
                                      <Radio
                                        fieldProps={{ width: 5 }}
                                        label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })}
                                        value={true}
                                        name='inStock'
                                        data-test='add_inventory_instock_yes_rad'
                                      />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage
                                          id='addInventory.pickupDays'
                                          defaultMessage='How many business days to pick up?'>
                                          {text => (
                                            <>
                                              {text}
                                              <Popup
                                                content={
                                                  <FormattedMessage
                                                    id='addInventory.pickupDays.description'
                                                    defaultMessage='Processing Time is the number of business days from when an order is confirmed that it will take you to have your product offer ready for pick up at your designated warehouse. NOTE: Saturdays and Sundays do not count for Processing Time.'
                                                  />
                                                }
                                                trigger={<Icon name='info circle' color='blue' />}
                                                wide
                                              />
                                            </>
                                          )}
                                        </FormattedMessage>
                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={5} tablet={8} mobile={16}>
                                      <Dropdown
                                        label='Processing Time'
                                        name='processingTimeDays'
                                        options={getProcessingTimes()}
                                        inputProps={{
                                          'data-test': 'new_inventory_processing_time_days_weeks_drpdn',
                                          onChange: (e, { value }) => {
                                            setFieldValue(`processingTimeDays`, value * values.processingTimeDW)
                                          }
                                        }}
                                      />
                                    </GridColumn>
                                    <GridColumn computer={5} tablet={8} mobile={16}>
                                      <Dropdown
                                        label='Days / Weeks'
                                        name='processingTimeDW'
                                        options={[
                                          { value: 1, key: 1, text: 'Days' },
                                          { value: 5, key: 5, text: 'Weeks' }
                                        ]}
                                        inputProps={{
                                          'data-test': 'new_inventory_processing_time_value_drpdn',
                                          onChange: (e, { value }) => {
                                            setFieldValue(`processingTimeDays`, values.processingTimeNum * value)
                                          }
                                        }}
                                      />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage
                                          id='addInventory.expiration'
                                          defaultMessage='Does this offer expire?'>
                                          {text => (
                                            <>
                                              {text}
                                              <Popup
                                                content={
                                                  <FormattedMessage
                                                    id='addInventory.expirationDescription'
                                                    defaultMessage='If you would like to limit this pricing for a certain time period then enter the last date that you would like to make this offer available. After the date this product will not be available on the Marketplace until you adjust the date till into the future.'
                                                  />
                                                }
                                                trigger={<Icon name='info circle' color='blue' />}
                                                wide
                                              />
                                            </>
                                          )}
                                        </FormattedMessage>
                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={5} tablet={8}>
                                      <Radio
                                        fieldProps={{ width: 5 }}
                                        label={formatMessage({ id: 'global.no', defaultMessage: 'No' })}
                                        value={false}
                                        name='doesExpire'
                                        data-test='add_inventory_expire_no_rad'
                                      />
                                    </GridColumn>
                                    <GridColumn computer={5} tablet={8}>
                                      <Radio
                                        fieldProps={{ width: 5 }}
                                        label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })}
                                        value={true}
                                        name='doesExpire'
                                        data-test='add_inventory_expire_yes_rad'
                                      />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={10} tablet={16}>
                                      <DateInput
                                        inputProps={{
                                          disabled: !values.doesExpire,
                                          placeholder: formatMessage({ id: 'date.standardFormat', defaultMessage: 'MM/DD/YYYY' }),
                                          'data-test': 'add_inventory_product_expirationDate_dtin'
                                        }}
                                        label={formatMessage({
                                          id: 'addInventory.expirationDate',
                                          defaultMessage: 'Expiration Date'
                                        })}
                                        name='expirationDate'
                                        inputOnly
                                        addSeparator
                                      />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage
                                          id='addInventory.shipFrom.header'
                                          defaultMessage='Where will this product ship from?'>
                                          {text => (
                                            <>
                                              {text}
                                              <Popup
                                                content={
                                                  <FormattedMessage
                                                    id='addInventory.shipFrom.description'
                                                    defaultMessage='Warehouse is the physical location where your product offer will be picked up after an order is accepted. If you do not see the warehouse you need to list then go to Settings/Warehouses and add the information there. If you do not have permissions to add a new Warehouse then contact your company Admin.'
                                                  />
                                                }
                                                trigger={<Icon name='info circle' color='blue' />}
                                                wide
                                              />
                                            </>
                                          )}
                                        </FormattedMessage>
                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={10} tablet={16}>
                                      <Dropdown
                                        label={formatMessage({ id: 'global.warehouse', defaultMessage: 'Warehouse' })}
                                        name='warehouse'
                                        options={warehousesList}
                                        inputProps={{
                                          selection: true,
                                          value: 0,
                                          'data-test': 'new_inventory_warehouse_drpdn'
                                        }}
                                      />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage
                                          id='addInventory.availablePackages'
                                          defaultMessage='How many packages are available?'>
                                          {text => (
                                            <>
                                              {text}
                                              <Popup
                                                content={
                                                  <FormattedMessage
                                                    id='addInventory.availablePackages.description'
                                                    defaultMessage='Total packages represents the number of drums, totes, super sacks etc that you will be listing for this product offer. Your packaging type and measurement for this product offer will populate on the right panel as soon as you select a product name/number.'
                                                  />
                                                }
                                                trigger={<Icon name='info circle' color='blue' />}
                                              />
                                            </>
                                          )}
                                        </FormattedMessage>
                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn
                                      computer={10}
                                      tablet={16}
                                      data-test='add_inventory_product_totalPackages_inp'>
                                      <div style={{ marginBottom: '4px' }}>
                                        <label>
                                          <FormattedMessage
                                            id='addInventory.totalPackages'
                                            defaultMessage='Total Packages'>
                                            {text => (
                                              <>
                                                {text}{' '}
                                                {values.lots.length > 1 && (
                                                  <Popup
                                                    trigger={<Icon name='info circle' color='blue' />}
                                                    content={
                                                      <FormattedMessage
                                                        id='addInventory.multipleLots'
                                                        defaultMessage='This value can not be edited as you have specified multiple lots.'
                                                      />
                                                    }
                                                  />
                                                )}
                                              </>
                                            )}
                                          </FormattedMessage>
                                        </label>
                                      </div>
                                      <SemanticInput
                                        type='number'
                                        min='1'
                                        step='1'
                                        disabled={values.lots.length > 1}
                                        onChange={(_, { value }) => setFieldValue('lots[0].pkgAvailable', value)}
                                        value={
                                          values.lots.length > 1
                                            ? values.lots.reduce(
                                                (prev, curr) => parseInt(prev, 10) + parseInt(curr.pkgAvailable),
                                                0
                                              )
                                            : parseInt(values.lots[0].pkgAvailable, 10)
                                        }
                                        name='quantity'
                                      />
                                    </GridColumn>
                                  </InnerRow>
                                </Grid>
                              </Grid.Column>
                              <GridColumn computer={6} tablet={6} mobile={8}>
                                <Grid centered>
                                  <GridColumn width={12}>
                                    <Grid>
                                      <InnerRow className='header'>
                                        <GridColumn>
                                          <Header as='h3'>
                                            <FormattedMessage
                                              id='addInventory.minimumOrderRequirement'
                                              defaultMessage='Is there any order minimum requirement?'>
                                              {text => (
                                                <>
                                                  {text}
                                                  <Popup
                                                    content={
                                                      <>
                                                        <FormattedMessage
                                                          id='addInventory.minimumOrderRequirement.description1'
                                                          defaultMessage='Minimum OQ is the minimum amount of packages you want to sell for any single order. If you want to sell no less than 10 drums for an order then enter 10. If you have no minimum order requirement then enter 1.'
                                                        />
                                                        <br /> <br />
                                                        <FormattedMessage
                                                          id='addInventory.minimumOrderRequirement.description2'
                                                          defaultMessage='Splits is the multiples you are willing to accept for any single order. If you only want to sell multiples of 4 drums then enter 4. If you have no split requirements then enter 1.'
                                                        />{' '}
                                                      </>
                                                    }
                                                    trigger={<Icon name='info circle' color='blue' />}
                                                    wide
                                                  />
                                                </>
                                              )}
                                            </FormattedMessage>
                                          </Header>
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow>
                                        <GridColumn computer={8} tablet={16}>
                                          <Radio
                                            label={formatMessage({ id: 'global.no', defaultMessage: 'No' })}
                                            value={false}
                                            name='minimumRequirement'
                                            inputProps={{
                                              onClick: () => {
                                                setFieldValue('minimum', values.splits)
                                                //setFieldValue('pricingTiers[0].quantityFrom', 1)
                                              }
                                            }}
                                            data-test='add_inventory_minimumRequirement_no_rad'
                                          />
                                        </GridColumn>
                                        <GridColumn computer={8} tablet={16}>
                                          <Radio
                                            label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })}
                                            value={true}
                                            name='minimumRequirement'
                                            data-test='add_inventory_minimumRequirement_yes_rad'
                                          />
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow>
                                        <GridColumn
                                          computer={8}
                                          tablet={16}
                                          data-test='add_inventory_product_minimumOQ_inp'>
                                          <Input
                                            label={formatMessage({
                                              id: 'addInventory.minimumOQ',
                                              defaultMessage: 'Minimum OQ'
                                            })}
                                            name='minimum'
                                            inputProps={{
                                              disabled: !values.minimumRequirement,
                                              type: 'number',
                                              min: 1,
                                              onChange: (e, { value }) => {
                                                value = parseInt(value)
                                                if (value > 1 && !isNaN(value)) {
                                                  setFieldValue('minimumRequirement', true)
                                                  setFieldValue('pricingTiers[0].quantityFrom', value)
                                                }
                                              }
                                            }}
                                          />
                                        </GridColumn>

                                        <GridColumn
                                          computer={8}
                                          tablet={16}
                                          data-test='add_inventory_product_splits_inp'>
                                          <Input
                                            label={formatMessage({
                                              id: 'addInventory.splits',
                                              defaultMessage: 'Splits'
                                            })}
                                            name='splits'
                                            inputProps={{
                                              type: 'number',
                                              min: 1,
                                              onChange: (e, { value }) =>
                                                onSplitsChange(value, values, setFieldValue, validateForm)
                                            }}
                                          />
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow className='header'>
                                        <GridColumn>
                                          <Header as='h3'>
                                            <FormattedMessage
                                              id='addInventory.pricesCount'
                                              defaultMessage='How many price tiers would you like to offer?'>
                                              {text => (
                                                <>
                                                  {text}
                                                  <Popup
                                                    content={
                                                      <>
                                                        <FormattedMessage
                                                          id='addInventory.pricesCount.description1'
                                                          defaultMessage='Price Tiers allow you to set different prices related to total quantities ordered for a single product offer.'
                                                        />
                                                        <br /> <br />
                                                        <FormattedMessage
                                                          id='addInventory.pricesCount.description2'
                                                          defaultMessage='Price Tiers allow you to set different prices related to total quantities ordered for a single product offer.'
                                                        />
                                                        <br /> <br />
                                                        <FormattedMessage
                                                          id='addInventory.pricesCount.description3'
                                                          defaultMessage='Price Tiers allow you to set different prices related to total quantities ordered for a single product offer.'
                                                        />
                                                      </>
                                                    }
                                                    trigger={<Icon name='info circle' color='blue' />}
                                                    wide
                                                  />
                                                </>
                                              )}
                                            </FormattedMessage>
                                          </Header>
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow>
                                        <GridColumn computer={16} tablet={16}>
                                          <Dropdown
                                            label={formatMessage({
                                              id: 'addInventory.priceTiers',
                                              defaultMessage: 'Price Tiers'
                                            })}
                                            name='priceTiers'
                                            options={getPriceTiers(10)}
                                            inputProps={{
                                              'data-test': 'new_inventory_price_tiers_drpdn',
                                              fluid: true,
                                              onChange: (e, { value }) => {
                                                let pricingTiers = values.pricingTiers.slice()
                                                let difference = value - pricingTiers.length
                                                if (difference < 0) pricingTiers.splice(pricingTiers.length - value)
                                                else
                                                  for (let i = 0; i < difference; i++)
                                                    pricingTiers.push({ price: null, quantityFrom: 1 })
                                                setFieldValue('pricingTiers', pricingTiers)
                                              }
                                            }}
                                          />
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow className='header'>
                                        <GridColumn>
                                          <Header as='h3'>
                                            <FormattedMessage
                                              id='addInventory.fobPrice.header'
                                              defaultMessage='What is the FOB price for each tier?'>
                                              {text => (
                                                <>
                                                  {text}
                                                  <Popup
                                                    content={
                                                      <FormattedMessage
                                                        id='addInventory.fobPrice.description'
                                                        defaultMessage='FOB stands for free on board and freight on board and designates that the buyer is responsible for shipping costs. It also represents that ownership and liability is passed from seller to the buyer when the good are loaded at the originating location.'
                                                      />
                                                    }
                                                    trigger={<Icon name='info circle' color='blue' />}
                                                    wide
                                                  />
                                                </>
                                              )}
                                            </FormattedMessage>
                                          </Header>
                                        </GridColumn>
                                      </InnerRow>
                                      {/* <Grid> */}
                                      {renderPricingTiers(values.priceTiers, setFieldValue)}
                                      {/* </Grid> */}
                                      <InnerRow className='divider'>
                                        <GridColumn>
                                          <Divider />
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow className='header'>
                                        <GridColumn>
                                          <Header as='h3'>
                                            <FormattedMessage
                                              id='addInventory.uploadSpecSheet.header'
                                              defaultMessage='Upload Spec Sheet'>
                                              {text => (
                                                <>
                                                  {text}
                                                  <Popup
                                                    content={
                                                      <>
                                                        <FormattedMessage
                                                          id='addInventory.uploadSpecSheet.description1'
                                                          defaultMessage='The Spec Sheet, also known as a Technical Data Sheet (TDS), is required for a product offer to broadcast to the marketplace.'
                                                        />
                                                        <br /> <br />
                                                        <FormattedMessage
                                                          id='addInventory.uploadSpecSheet.description2'
                                                          defaultMessage='You can drag and drop a file from your computer or click on the box to search for the file as well.'
                                                        />
                                                        <br />
                                                        <br />
                                                        <FormattedMessage
                                                          id='addInventory.uploadSpecSheet.description3'
                                                          defaultMessage={`IMPORTANT! Your company name and contact information cannot be listed on this document and non compliance is against {companyName}'s Terms and Conditions.`}
                                                          values={{
                                                            companyName: props.applicationName
                                                          }}
                                                        />
                                                      </>
                                                    }
                                                    trigger={<Icon name='info circle' color='blue' />}
                                                    wide
                                                  />
                                                </>
                                              )}
                                            </FormattedMessage>
                                          </Header>
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow>
                                        <GridColumn>
                                          <UploadAttachment
                                            {...props}
                                            attachments={values.attachments}
                                            name='attachments'
                                            type={2}
                                            fileMaxSize={20}
                                            onChange={files =>
                                              setFieldValue(
                                                `attachments[${
                                                  values.attachments && values.attachments.length
                                                    ? values.attachments.length
                                                    : 0
                                                }]`,
                                                {
                                                  id: files.id,
                                                  name: files.name,
                                                  documentType: files.documentType
                                                }
                                              )
                                            }
                                            data-test='new_inventory_attachments_drop'
                                            emptyContent={
                                              <>
                                                {formatMessage({ id: 'addInventory.dragDrop' })}
                                                <br />
                                                <FormattedMessage
                                                  id='addInventory.dragDropOr'
                                                  defaultMessage={'or {link} to select from computer'}
                                                  values={{
                                                    link: (
                                                      <a>
                                                        <FormattedMessage
                                                          id='global.clickHere'
                                                          defaultMessage={'click here'}
                                                        />
                                                      </a>
                                                    )
                                                  }}
                                                />
                                              </>
                                            }
                                            uploadedContent={
                                              <label>
                                                <FormattedMessage
                                                  id='addInventory.dragDrop'
                                                  defaultMessage={'Drag and drop to add file here'}
                                                />
                                                <br />
                                                <FormattedMessage
                                                  id='addInventory.dragDropOr'
                                                  defaultMessage={'or {link} to select from computer'}
                                                  values={{
                                                    link: (
                                                      <a>
                                                        <FormattedMessage
                                                          id='global.clickHere'
                                                          defaultMessage={'click here'}
                                                        />
                                                      </a>
                                                    )
                                                  }}
                                                />
                                              </label>
                                            }
                                          />
                                        </GridColumn>
                                      </InnerRow>
                                      {/* </Segment> */}
                                    </Grid>
                                  </GridColumn>
                                </Grid>
                              </GridColumn>

                              <GridColumn computer={5} tablet={5} mobile={16}>
                                {renderProductDetails(values, validateForm, setFieldValue, props, state, setState)}
                              </GridColumn>
                            </Grid.Row>
                          </Grid>
                        </Tab.Pane>
                      )
                    },
                    {
                      menuItem: (
                        <Menu.Item
                          key='productOptional'
                          onClick={() => {
                            validateForm()
                              .then(r => {
                                // stop when errors found
                                if (
                                  Object.keys(r).length &&
                                  Object.keys(r).some(r => tabs[state.activeTab].includes(r))
                                ) {
                                  submitForm() // show errors
                                  return false
                                }

                                // if validation is correct - switch tabs
                                switchTab(1, values, setFieldValue, state, setState)
                              })
                              .catch(e => {
                                console.error('CATCH', e)
                              })
                          }}
                          data-test='new_inventory_productOptional'>
                          {formatMessage({
                            id: 'addInventory.optionalProductInfo',
                            defaultMessage: 'OPTIONAL PRODUCT INFO'
                          })}
                        </Menu.Item>
                      ),
                      pane: (
                        <Tab.Pane key='productOptional' style={{ padding: '0 32px' }}>
                          <Grid style={{ marginTop: '2rem' }}>
                            <GridColumn computer={11} tablet={11} mobile={16}>
                              <Grid columns={3} centered>
                                <GridColumn width={5} floated='left'>
                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({ id: 'addInventory.origin', defaultMessage: 'Origin' })}
                                      name='origin'
                                      options={searchedOrigins}
                                      inputProps={{
                                        'data-test': 'new_inventory_origin_drpdn',
                                        size: 'large',
                                        minCharacters: 0,
                                        icon: 'search',
                                        search: true,
                                        selection: true,
                                        clearable: true,
                                        loading: searchedOriginsLoading,
                                        onChange: (e, { value }) => {
                                          value && searchOrigins('')
                                        },
                                        onSearchChange: debounce(
                                          (e, { searchQuery }) => searchOrigins(searchQuery),
                                          250
                                        )
                                      }}
                                    />
                                  </FormField>
                                  <FormField width={16} data-test='add_inventory_product_tradeName_inp'>
                                    <Input
                                      label={formatMessage({
                                        id: 'addInventory.tradeName',
                                        defaultMessage: 'Trade Name'
                                      })}
                                      name='tradeName'
                                      inputProps={{ type: 'text' }}
                                    />
                                  </FormField>

                                  <FormGroup>
                                    <FormField width={8} data-test='add_inventory_product_assayMin_inp'>
                                      <Input
                                        name='assayMin'
                                        label={formatMessage({
                                          id: 'addInventory.assayMin',
                                          defaultMessage: 'Assay Min %'
                                        })}
                                        inputProps={{ type: 'number', min: 0, step: '0.001', value: null }}
                                      />
                                    </FormField>
                                    <FormField width={8} data-test='add_inventory_product_assayMax_inp'>
                                      <Input
                                        name='assayMax'
                                        label={formatMessage({
                                          id: 'addInventory.assayMax',
                                          defaultMessage: 'Assay Max %'
                                        })}
                                        inputProps={{ type: 'number', min: 0, step: '0.001', value: null }}
                                      />
                                    </FormField>
                                  </FormGroup>
                                </GridColumn>
                                <GridColumn width={5}>
                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({ id: 'addInventory.form', defaultMessage: 'Form' })}
                                      name='productForm'
                                      options={productFormsDropdown}
                                      inputProps={{ 'data-test': 'new_inventory_form_drpdn' }}
                                    />
                                  </FormField>

                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({
                                        id: 'addInventory.condition',
                                        defaultMessage: 'Condition'
                                      })}
                                      name='productCondition'
                                      options={productConditionsDropdown}
                                      inputProps={{ 'data-test': 'new_inventory_condition_drpdn' }}
                                    />
                                  </FormField>

                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({ id: 'addInventory.grade', defaultMessage: 'Grade' })}
                                      name='productGrades'
                                      options={productGradesDropdown}
                                      inputProps={{
                                        'data-test': 'new_inventory_grade_drpdn',
                                        selection: true,
                                        multiple: true
                                      }}
                                    />
                                  </FormField>
                                </GridColumn>
                                <GridColumn width={5} floated='right'>
                                  <FormField width={16}>
                                    <TextArea
                                      name='externalNotes'
                                      label={formatMessage({
                                        id: 'addInventory.externalNotes',
                                        defaultMessage: 'External Notes'
                                      })}
                                    />
                                  </FormField>
                                  <FormField width={16}>
                                    <TextArea
                                      name='internalNotes'
                                      label={formatMessage({
                                        id: 'addInventory.internalNotes',
                                        defaultMessage: 'Internal Notes'
                                      })}
                                    />
                                  </FormField>
                                </GridColumn>
                              </Grid>

                              <Divider />

                              <FieldArray
                                name='lots'
                                render={arrayHelpers => (
                                  <>
                                    <Message attached='top' className='header-table-fields'>
                                      <Button
                                        type='button'
                                        icon='plus'
                                        color='blue'
                                        size='small'
                                        floated='right'
                                        style={{ marginTop: '-0.5em' }}
                                        onClick={() =>
                                          arrayHelpers.push({
                                            lotNumber: null,
                                            pkgAvailable: null,
                                            manufacturedDate: null,
                                            expirationDate: null
                                          })
                                        }
                                        data-test='new_inventory_add_lot_btn'
                                      />
                                      <FormattedMessage
                                        id='addInventory.lotDetails.header'
                                        defaultMessage='Lot Details'>
                                        {text => (
                                          <>
                                            {text}
                                            <Popup
                                              content={
                                                <FormattedMessage
                                                  id='addInventory.lotDetails.description'
                                                  defaultMessage={`This is where you can track lot(s) that make up your product offer. For example if your product offer consists of three separate lots then hit the plus button to the right twice to add two more lots. Then enter the Lot # for each, the amount of packages that are associated to that lot within this product offer, the MFG date, the expiration date, and the associated Certificate of Analysis. This does not have to be completed when listing a product offer but it is required to designate lot info and CofA's within 48 hours of an order being shipped.`}
                                                />
                                              }
                                              trigger={<Icon name='info circle' color='blue' />}
                                              wide
                                            />
                                          </>
                                        )}
                                      </FormattedMessage>
                                    </Message>
                                    <Table attached='bottom' className='table-fields'>
                                      <Table.Header>
                                        <Table.Row>
                                          <Popup
                                            content={
                                              <FormattedMessage
                                                id='addInventory.whatIsTheLotNumber.description'
                                                defaultMessage='What is the lot number?'
                                              />
                                            }
                                            trigger={
                                              <TableHeaderCell>
                                                <FormattedMessage
                                                  id='addInventory.whatIsTheLotNumber.header'
                                                  defaultMessage='#Lot'
                                                />
                                              </TableHeaderCell>
                                            }
                                          />

                                          <Popup
                                            content={
                                              <FormattedMessage
                                                id='addInventory.packagesInLot.description'
                                                defaultMessage='How many packages in this lot?'
                                              />
                                            }
                                            trigger={
                                              <TableHeaderCell>
                                                <FormattedMessage
                                                  id='addInventory.packagesInLot.header'
                                                  defaultMessage='Total'
                                                />
                                              </TableHeaderCell>
                                            }
                                          />

                                          <TableHeaderCell>
                                            <FormattedMessage
                                              id='addInventory.available'
                                              defaultMessage='Available'
                                            />
                                          </TableHeaderCell>
                                          <TableHeaderCell>
                                            <FormattedMessage
                                              id='addInventory.allocated'
                                              defaultMessage='Allocated'
                                            />
                                          </TableHeaderCell>
                                          <Popup
                                            content={
                                              <FormattedMessage
                                                id='addInventory.mfg.description'
                                                defaultMessage='Date when specified product Lot was manufactured'
                                              />
                                            }
                                            trigger={
                                              <TableHeaderCell>
                                                <FormattedMessage
                                                  id='addInventory.mfg.header'
                                                  defaultMessage='MFG Date'
                                                />
                                              </TableHeaderCell>
                                            }
                                          />
                                          <Popup
                                            content={
                                              <FormattedMessage
                                                id='addInventory.expiration.description'
                                                defaultMessage='Expiration date for products in specified Lot'
                                              />
                                            }
                                            trigger={
                                              <TableHeaderCell>
                                                <FormattedMessage
                                                  id='addInventory.expiration.header'
                                                  defaultMessage='Expiration Date'
                                                />
                                              </TableHeaderCell>
                                            }
                                          />

                                          <TableHeaderCell>
                                            <FormattedMessage id='addInventory.cofA' defaultMessage='C of A' />
                                          </TableHeaderCell>
                                          <TableHeaderCell>&nbsp;</TableHeaderCell>
                                        </Table.Row>
                                      </Table.Header>
                                      <Table.Body>
                                        {values.lots && values.lots.length
                                          ? values.lots.map((lot, index) => (
                                              <Table.Row key={index}>
                                                <TableCellBig
                                                  data-test={`add_inventory_product_lotNumber_${index}_inp`}>
                                                  <Input
                                                    name={`lots[${index}].lotNumber`}
                                                    inputProps={{ onClick: () => setFieldValue('touchedLot', true) }}
                                                  />
                                                </TableCellBig>
                                                <TableCellSmall
                                                  data-test={`add_inventory_product_pkgAvailable_${index}_inp`}>
                                                  <Input
                                                    name={`lots[${index}].pkgAvailable`}
                                                    inputProps={{
                                                      type: 'number',
                                                      min: '1',
                                                      step: '1',
                                                      onClick: () => setFieldValue('touchedLot', true),
                                                      onChange: (e, { value }) => {
                                                        let total = 0

                                                        values.lots.forEach((lot, i) => {
                                                          if (i !== index) total += parseInt(value, 10)
                                                          else total += parseInt(lot.pkgAvailable, 10)
                                                        })

                                                        // setFieldValue('quantity', total)
                                                      }
                                                    }}
                                                  />
                                                </TableCellSmall>
                                                <TableCellSmall>0</TableCellSmall>
                                                <TableCellSmall>0</TableCellSmall>
                                                <TableCellBig>
                                                  <DateInput
                                                    name={`lots[${index}].manufacturedDate`}
                                                    inputProps={{
                                                      placeholder: formatMessage({ id: 'date.standardFormat', defaultMessage: 'MM/DD/YYYY' }),
                                                      'data-test': 'add_inventory_product_manufacturedDate_dtin'
                                                    }}
                                                    inputOnly
                                                    addSeparator
                                                  />
                                                </TableCellBig>
                                                <TableCellBig>
                                                  <DateInput
                                                    name={`lots[${index}].expirationDate`}
                                                    inputProps={{
                                                      placeholder: formatMessage({ id: 'date.standardFormat', defaultMessage: 'MM/DD/YYYY' }),
                                                      'data-test': 'add_inventory_product_expirationDate_dtin'
                                                    }}
                                                    inputOnly
                                                    addSeparator
                                                  />
                                                </TableCellBig>
                                                <TableCellBig>
                                                  <AttachmentManager
                                                    tableProps={{
                                                      defaultSelection: getSafe(
                                                        () =>
                                                          values.lots[index].attachments.map(
                                                            attachment => attachment.index
                                                          ),
                                                        []
                                                      )
                                                    }}
                                                    trigger={
                                                      <FileUploadDiv>
                                                        {getSafe(() => `(${values.lots[index].attachments.length}) `)}
                                                        {getSafe(
                                                          () =>
                                                            values.lots[index].attachments.map(attachment => (
                                                              <label>{attachment.name}</label>
                                                            )),
                                                          <FormattedMessage
                                                            id='addInventory.clickUpload'
                                                            defaultMessage='Click to upload'
                                                          />
                                                        )}
                                                      </FileUploadDiv>
                                                    }
                                                    returnSelectedRows={rows =>
                                                      setFieldValue(`lots[${index}].attachments`, rows)
                                                    }
                                                  />
                                                </TableCellBig>
                                                <TableCellMini textAlign='center'>
                                                  <Icon
                                                    name='trash alternate outline'
                                                    size='large'
                                                    style={{ margin: 0 }}
                                                    disabled={values.lots.length <= 1}
                                                    onClick={() =>
                                                      values.lots.length > 1 &&
                                                      removeLot(
                                                        arrayHelpers,
                                                        setFieldValue,
                                                        {
                                                          costs: values.costs,
                                                          lots: values.lots,
                                                          packagingSize: values.product.packagingSize
                                                        },
                                                        index
                                                      )
                                                    }
                                                    data-test='add_inventory_removeLot_btn'
                                                  />
                                                </TableCellMini>
                                              </Table.Row>
                                            ))
                                          : null}
                                      </Table.Body>
                                    </Table>
                                  </>
                                )}
                              />

                              <Header as='h3'>
                                <FormattedMessage id='addInventory.productCost' defaultMessage='Product Cost' />
                              </Header>
                              <Grid>
                                <GridColumn width={4}>
                                  <FormField width={12} data-test='add_inventory_costUOM_inp'>
                                    <Input
                                      name='cost'
                                      label={formatMessage({
                                        id: 'addInventory.costUOM',
                                        defaultMessage: 'Cost/UOM'
                                      })}
                                      inputProps={{ type: 'number', step: '0.01', value: null, min: 0 }}
                                    />
                                  </FormField>
                                  <FormField>
                                    <label>
                                      <FormattedMessage
                                        id='addInventory.trackSubCosts'
                                        defaultMessage='Track Sub-Costs'
                                      />
                                    </label>
                                    <FormGroup>
                                      <FormField width={5}>
                                        <Radio
                                          label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })}
                                          value={true}
                                          name='trackSubCosts'
                                          data-test='add_inventory_trackSubCosts_yes_rad'
                                        />
                                      </FormField>
                                      <FormField width={5}>
                                        <Radio
                                          label={formatMessage({ id: 'global.no', defaultMessage: 'No' })}
                                          value={false}
                                          name='trackSubCosts'
                                          data-test='add_inventory_trackSubCosts_no_rad'
                                        />
                                      </FormField>
                                    </FormGroup>
                                  </FormField>
                                </GridColumn>
                                <GridColumn width={12}>
                                  <FieldArray
                                    name='costs'
                                    render={arrayHelpers => (
                                      <>
                                        <Message attached='top' className='header-table-fields'>
                                          <Button
                                            type='button'
                                            icon='plus'
                                            color='blue'
                                            size='small'
                                            disabled={!values.trackSubCosts}
                                            floated='right'
                                            style={{ marginTop: '-0.5em' }}
                                            onClick={() =>
                                              arrayHelpers.push({
                                                description: '',
                                                lot: 0,
                                                cost: null,
                                                costUom: null
                                              })
                                            }
                                            data-test='new_inventory_add_sub_cost_btn'
                                          />
                                          <FormattedMessage
                                            id='addInventory.subCostBreakdown'
                                            defaultMessage='Sub-Cost Breakdown'
                                          />
                                        </Message>
                                        <Table attached='bottom' className='table-fields'>
                                          <Table.Header>
                                            <Table.Row>
                                              <TableHeaderCell width={4}>
                                                <FormattedMessage
                                                  id='addInventory.description'
                                                  defaultMessage='Description'
                                                />
                                              </TableHeaderCell>
                                              <TableHeaderCell width={2}>
                                                <FormattedMessage id='addInventory.lot' defaultMessage='Lot' />
                                              </TableHeaderCell>
                                              <TableHeaderCell width={3}>
                                                <FormattedMessage id='addInventory.cost' defaultMessage='Cost' />
                                              </TableHeaderCell>
                                              <TableHeaderCell width={3}>
                                                <FormattedMessage
                                                  id='addInventory.costUOM'
                                                  defaultMessage='Cost/UOM'
                                                />
                                              </TableHeaderCell>
                                              <TableHeaderCell width={3}>
                                                <FormattedMessage
                                                  id='addInventory.attachment'
                                                  defaultMessage='Attachment'
                                                />
                                              </TableHeaderCell>
                                              <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                                            </Table.Row>
                                          </Table.Header>
                                          <Table.Body>
                                            {values.costs && values.costs.length
                                              ? values.costs.map((costRow, index) => (
                                                  <Table.Row key={index}>
                                                    <TableCell width={4}>
                                                      <FormField
                                                        width={16}
                                                        data-test={`add_inventory_trackSubCosts_${index}_inp`}>
                                                        <Input
                                                          inputProps={{ disabled: !values.trackSubCosts }}
                                                          name={`costs[${index}].description`}
                                                        />
                                                      </FormField>
                                                    </TableCell>
                                                    <TableCell width={2}>
                                                      <FormField width={16}>
                                                        <Dropdown
                                                          name={`costs[${index}].lot`}
                                                          options={[
                                                            {
                                                              key: 0,
                                                              text: 'All',
                                                              value: 0
                                                            }
                                                          ].concat(
                                                            values.lots && values.lots.length
                                                              ? values.lots.map((lot, index) => {
                                                                  return {
                                                                    key: index + 1,
                                                                    text: lot.lotNumber,
                                                                    value: index + 1
                                                                  }
                                                                })
                                                              : []
                                                          )}
                                                          inputProps={{
                                                            'data-test': `new_inventory_cost_${index}_drpdn`,
                                                            onChange: (e, { value }) => {
                                                              let count = parseInt(value)
                                                                ? parseFloat(values.lots[value - 1].pkgAvailable)
                                                                : values.lots.reduce(
                                                                    (all, lot) => all + parseFloat(lot.pkgAvailable),
                                                                    0
                                                                  )

                                                              setFieldValue(
                                                                `costs[${index}].costUom`,
                                                                (
                                                                  parseFloat(values.costs[index].cost) /
                                                                  (count * values.product.packagingSize)
                                                                ).toFixed(3)
                                                              )
                                                            },
                                                            disabled: !values.trackSubCosts
                                                          }}
                                                        />
                                                      </FormField>
                                                    </TableCell>
                                                    <TableCell width={3}>
                                                      <FormField
                                                        width={16}
                                                        data-test={`add_inventory_cost_${index}_inp`}>
                                                        <Input
                                                          name={`costs[${index}].cost`}
                                                          inputProps={{
                                                            type: 'number',
                                                            step: '1',
                                                            value: null,
                                                            min: 0,
                                                            disabled: !values.trackSubCosts,
                                                            onChange: (e, { value }) => {
                                                              let count = parseInt(values.costs[index].lot)
                                                                ? parseFloat(
                                                                    values.lots[parseInt(values.costs[index].lot) - 1]
                                                                      .pkgAvailable
                                                                  )
                                                                : values.lots.reduce(
                                                                    (all, lot) => all + parseFloat(lot.pkgAvailable),
                                                                    0
                                                                  )

                                                              setFieldValue(
                                                                `costs[${index}].costUom`,
                                                                (
                                                                  parseFloat(value) /
                                                                  (count * values.product.packagingSize)
                                                                ).toFixed(3)
                                                              )
                                                            }
                                                          }}
                                                        />
                                                      </FormField>
                                                    </TableCell>
                                                    <TableCell width={3}>
                                                      <FormField
                                                        width={16}
                                                        data-test={`add_inventory_costUom_${index}_inp`}>
                                                        <Input
                                                          name={`costs[${index}].costUom`}
                                                          inputProps={{
                                                            type: 'text',
                                                            step: '0.01',
                                                            value: null,
                                                            min: 0,
                                                            disabled: true
                                                          }}
                                                        />
                                                      </FormField>
                                                    </TableCell>
                                                    <TableCell width={3}>
                                                      <AttachmentManager
                                                        tableProps={{
                                                          singleSelection: true,
                                                          defaultSelection: getSafe(
                                                            () =>
                                                              values.costs[index].attachments.map(
                                                                attachment => attachment.index
                                                              ),
                                                            []
                                                          )
                                                        }}
                                                        trigger={
                                                          <FileUploadDiv>
                                                            {getSafe(
                                                              () =>
                                                                values.costs[index].attachments.map(attachment => (
                                                                  <label>{attachment.name}</label>
                                                                )),
                                                              <FormattedMessage
                                                                id='addInventory.clickUpload'
                                                                defaultMessage='Click to upload'
                                                              />
                                                            )}
                                                          </FileUploadDiv>
                                                        }
                                                        returnSelectedRows={rows =>
                                                          setFieldValue(`costs[${index}].attachments`, rows)
                                                        }
                                                      />
                                                    </TableCell>
                                                    <TableCell width={1}>
                                                      <Icon
                                                        name='trash alternate outline'
                                                        size='large'
                                                        disabled={!values.trackSubCosts}
                                                        onClick={() => arrayHelpers.remove(index)}
                                                        data-test={`add_inventory_delete_${index}`}
                                                      />
                                                    </TableCell>
                                                  </Table.Row>
                                                ))
                                              : null}
                                          </Table.Body>
                                        </Table>
                                      </>
                                    )}
                                  />
                                </GridColumn>
                              </Grid>
                            </GridColumn>

                            <GridColumn computer={5} tablet={5} mobile={16}>
                              {renderProductDetails(values, validateForm, setFieldValue, props, state, setState)}
                            </GridColumn>
                          </Grid>
                        </Tab.Pane>
                      )
                    },
                    {
                      menuItem: (
                        <Menu.Item
                          key='productDocuments'
                          onClick={() => {
                            validateForm()
                              .then(r => {
                                // stop when errors found
                                if (
                                  Object.keys(r).length &&
                                  Object.keys(r).some(r => tabs[state.activeTab].includes(r))
                                ) {
                                  submitForm() // show errors
                                  return false
                                }

                                // if validation is correct - switch tabs
                                switchTab(2, values, setFieldValue, state, setState)
                              })
                              .catch(e => {
                                console.error('CATCH', e)
                              })
                          }}
                          data-test='new_inventory_productDocuments'>
                          {formatMessage({ id: 'addInventory.productDocuments', defaultMessage: 'DOCUMENTS' })}
                        </Menu.Item>
                      ),
                      pane: (
                        <Tab.Pane key='productDocuments' style={{ padding: '0 32px' }}>
                          <Grid style={{ marginTop: '2rem' }}>
                            <GridColumn computer={11} tablet={11} mobile={16}>
                              {renderEditDocuments(values, setFieldValue, validateForm, props)}
                              <Header as='h3'>
                                <FormattedMessage
                                  id='addInventory.additionalDocs'
                                  defaultMessage='Additional Documents'
                                />
                              </Header>
                              <Grid>
                                <GridColumn width={10}>
                                  <UploadAttachment
                                    {...props}
                                    attachments={values.additional}
                                    name='additional'
                                    type={values.additionalType}
                                    unspecifiedTypes={['Unspecified']}
                                    fileMaxSize={20}
                                    onChange={files =>
                                      setFieldValue(
                                        `additional[${
                                          values.additional && values.additional.length ? values.additional.length : 0
                                        }]`,
                                        {
                                          id: files.id,
                                          name: files.name,
                                          documentType: files.documentType
                                        }
                                      )
                                    }
                                    data-test='add_inventory_additional_attachments'
                                    emptyContent={
                                      <label>
                                        <FormattedMessage
                                          id='addInventory.dragDropAdditional'
                                          defaultMessage={'Drop additional documents here'}
                                        />
                                        <br />
                                        <FormattedMessage
                                          id='addInventory.dragDropOr'
                                          defaultMessage='or select from computer'
                                        />
                                      </label>
                                    }
                                    uploadedContent={
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
                                    }
                                  />
                                </GridColumn>
                                <GridColumn width={5}>
                                  <FormField width={16}>
                                    <label>
                                      <FormattedMessage
                                        id='addInventory.documentType'
                                        defaultMessage={'Document Type'}
                                      />
                                    </label>
                                    <Dropdown
                                      name={`additionalType`}
                                      options={documentTypesDropdown}
                                      inputProps={{ 'data-test': 'new_inventory_doc_type_drpdn' }}
                                    />
                                  </FormField>
                                </GridColumn>
                              </Grid>
                            </GridColumn>
                            <GridColumn computer={5} tablet={5} mobile={16}>
                              {renderProductDetails(values, validateForm, setFieldValue, props, state, setState)}
                            </GridColumn>
                          </Grid>
                        </Tab.Pane>
                      )
                    }
                  ]}
                />
              </div>
            </>
          )
        }}
      </Form>
    </div>
  )
}

AddInventoryForm.propTypes = {
  searchedOriginsLoading: PropTypes.bool,
  poCreated: PropTypes.bool,
  loading: PropTypes.bool,
  autocompleteDataLoading: PropTypes.bool,
  searchedProducts: PropTypes.array,
  documentTypesDropdown: PropTypes.array,
  productConditionsDropdown: PropTypes.array,
  productFormsDropdown: PropTypes.array,
  productGradesDropdown: PropTypes.array,
  searchedOrigins: PropTypes.array,
  warehousesList: PropTypes.array,
  autocompleteData: PropTypes.array,
  initialState: PropTypes.object,
  intl: PropTypes.object,
  applicationName: PropTypes.string,
  id: PropTypes.number,
  searchOrigins: PropTypes.func,
  addProductOffer: PropTypes.func,
  getAutocompleteData: PropTypes.func,
  resetForm: PropTypes.func,
  initProductOfferEdit: PropTypes.func,
  downloadAttachment: PropTypes.func,
  removeAttachment: PropTypes.func,
  edit: PropTypes.any,
  toastManager: PropTypes.any
}

AddInventoryForm.defaultProps = {
  searchedOriginsLoading: false,
  poCreated: false,
  loading: false,
  autocompleteDataLoading: false,
  searchedProducts: [],
  documentTypesDropdown: [],
  productConditionsDropdown: [],
  productFormsDropdown: [],
  productGradesDropdown: [],
  searchedOrigins: [],
  warehousesList: [],
  autocompleteData: [],
  initialState: {},
  intl: {},
  applicationName: '',
  id: null,
  searchOrigins: () => {},
  addProductOffer: () => {},
  getAutocompleteData: () => {},
  resetForm: () => {},
  initProductOfferEdit: () => {},
  downloadAttachment: () => {},
  removeAttachment: () => {},
  edit: false,
  toastManager: null
}

export default injectIntl(AddInventoryForm)
