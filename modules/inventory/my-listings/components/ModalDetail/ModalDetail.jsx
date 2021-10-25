import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Formik, FieldArray } from 'formik'
import _, { debounce } from 'lodash'
import {
  Dimmer,
  Loader,
  Tab,
  Menu,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Icon,
  Popup,
  FormField,
  Modal,
  Form
} from 'semantic-ui-react'
import { Plus, ChevronDown, ChevronUp, Folder } from 'react-feather'
import moment from 'moment'
import { Warning } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
//Components
import { DateInput } from '../../../../../components/custom-formik'
import confirm from '../../../../../components/Confirmable/confirm'
import ModalTdsSaveAs from '../ModalsTds/ModalTdsSaveAs'
import ModalTdsList from '../ModalsTds/ModalTdsList'
import { Broadcast } from '../../../../broadcast'
import DocumentTab from '../../../../../components/document-tab'
import { Required } from '../../../../../components/constants/layout'
import { SelectTemplates } from '../ModalsTds/ModalsTds.styles'
import ErrorFocus from '../../../../../components/error-focus'
//Services
import { 
  validationScheme,
  fetchIfNoData,
  loadProductOffer,
  validateSaveOrSwitchToErrors,
  changedForm,
  onSplitsChange,
  renderPricingTiers,
  searchProducts,
  submitFormFunc,
  switchTab,
  switchToErrors,
  handleChangeProduct,
  onChange,
  inputWrapper,
  inputLabeledWrapper,
  closeTdsModal
} from './ModalDetail.services'
import { getSafe, generateToastMarkup } from '../../../../../utils/functions'
import { onClickBroadcast } from '../MyListings.services'
//Styles
import {
  FlexModal,
  FlexTabs,
  FlexModalContent,
  HighSegment,
  DivIconOptions,
  HeaderOptions,
  GridColumnOptionalInformation,
  TextAreaField
} from '../../../styles'
import {
  GridFields,
  DivRequiredFields,
  DivTitle,
  DivButtonPlus,
  DivIconPlusCircle,
  IconPlusCircle,
  IconTrash,
  DivAddInputTds,
  GridColumnRequired,
  CustomGridColumn,
  CustomGridRow,
  DivFlex
} from './ModalDetail.styles'
//Constants
import { INIT_VALUES, OPTIONS_YES_NO, LIST_CONFORMING, OPTIONS_BROADCAST } from './ModalDetail.constants'
// Hooks
import { usePrevious } from '../../../../../hooks'

/**
 * ModalDetail Component
 * @component
 * @category Inventory - My Listings
 */
const ModalDetail = props => {
  let formikPropsNew
  let resetFormNew

  const [state, setState] = useState({
    tabs: ['edit', 'tds', 'documents', 'priceBook', 'priceTiers'],
    activeTab: 0,
    broadcastLoading: true,
    saveBroadcast: 0,
    changedForm: false,
    documentType: 1,
    openUploadAttachment: false,
    edited: false,
    detailValues: null,
    initValues: INIT_VALUES,
    attachmentFiles: [],
    isOpenOptionalInformation: false,
    openedTdsList: false,
    openedTdsSaveAs: false
  })
  const [isOverMinPkgs, setIsOverMinPkgs] = useState(false)

  useEffect(() => {
    const {
      detailValues,
      getProductForms,
      getProductGrades,
      getWarehouses,
      modalActiveTab
    } = props
    if (detailValues) {
      loadProductOffer(null, props, state, setState, formikPropsNew, resetFormNew) // Start editing, reload product offer
    }
    fetchIfNoData('productFormsDropdown', getProductForms, props)
    fetchIfNoData('productGradesDropdown', getProductGrades, props)
    fetchIfNoData('warehousesList', getWarehouses, props)

    switchTab(props, state, setState, modalActiveTab, detailValues)
    if (detailValues?.minPkg) {
      detailValues?.minPkg > detailValues?.pkgAvailable
        ? setIsOverMinPkgs(true)
        : setIsOverMinPkgs(false)
    }
  }, [])

  const prevEditProductOfferInitTrig = usePrevious(props.editProductOfferInitTrig)
  const prevModalActiveTab = usePrevious(props.modalActiveTab)

  useEffect(() => {
    if (typeof prevEditProductOfferInitTrig !== 'undefined' && typeof prevModalActiveTab !== 'undefined') {
      const shouldSwitchTab =
        (props.modalActiveTab > -1 && prevModalActiveTab !== props.modalActiveTab) ||
        state.activeTab === 3 /* To Reload Broadcast rules */

      if (props.detailValues) {
        // Edit mode
        if (!prevModalActiveTab) {
          // Add new to Edit mode
          validateSaveOrSwitchToErrors(props, state, setState, formikPropsNew, () => {
            loadProductOffer(shouldSwitchTab, props, state, setState, formikPropsNew, resetFormNew)
          })
        } else {
          // Edit to Edit mode
          validateSaveOrSwitchToErrors(props, state, setState, formikPropsNew, () => {
            loadProductOffer(shouldSwitchTab, props, state, setState, formikPropsNew, resetFormNew)
          })
        }
      } else {
        // Add new mode
        validateSaveOrSwitchToErrors(props, state, setState, formikPropsNew, () => {
          setState({ ...state, detailValues: null, initValues: INIT_VALUES })
          resetFormNew()
          if (shouldSwitchTab) {
            switchTab(props, state, setState, props.modalActiveTab)
          }
        })
      }
    }
  }, [props.editProductOfferInitTrig, props.modalActiveTab])

  let {
    productFormsDropdown,
    productGradesDropdown,
    loading,
    detailValues,
    searchedOrigins,
    searchOrigins,
    warehousesList,
    documentTypesDropdown,
    intl: { formatMessage },
    toastManager,
    loadFile,
    addAttachment,
    removeAttachmentLinkProductOffer,
    removeAttachment,
    currencySymbol,
    datagrid,
    isLoadingBroadcast,
    autocompleteDataLoading,
    broadcastTemplates,
    tdsTemplatesLoading,
    tdsTemplates,
    broadcastChange,
    autocompleteData,
    applicationName,
    countriesDropdown,
    openGlobalAddForm
  } = props
  const { openedTdsList, openedTdsSaveAs } = state

  const optionsProduct = autocompleteData.map((el, i) => {
    const code = getSafe(() => el.intProductCode, '')
    const name = getSafe(() => el.intProductName, '')
    const dispName = code && name ? `${name} (${code})` : code ? code : name
    const packagingSize = getSafe(() => el.packagingSize, '')
    const packagingUnit = getSafe(() => el.packagingUnit.nameAbbreviation, '')
    const packagingType = getSafe(() => el.packagingType.name, '')
    return {
      key: i,
      text: `${dispName}: ${packagingSize} ${packagingUnit} ${packagingType}`,
      value: el.id
    }
  })
  const optionsSeeOffer = OPTIONS_BROADCAST.map(opt => {
    if (opt.titleId && opt.titleText)
      return {
        ...opt,
        title: formatMessage({ id: opt.titleId, defaultMessage: opt.titleText }, { companyName: applicationName }),
        subtitle: formatMessage(
          { id: opt.subtitleId, defaultMessage: opt.subtitleText },
          { companyName: applicationName }
        )
      }
    else
      return {
        ...opt,
        subtitle: formatMessage(
          { id: opt.subtitleId, defaultMessage: opt.subtitleText },
          { companyName: applicationName }
        )
      }
  }).concat([
    ...broadcastTemplates.map(template => {
      return {
        icon: (
          <DivIconOptions>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
              <g fill='none' fill-rule='evenodd'>
                <path
                  d='M0 0L24 0 24 24 0 24z'
                  transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
                />
                <path
                  fill='#848893'
                  fill-rule='nonzero'
                  d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z'
                  transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
                />
              </g>
            </svg>
          </DivIconOptions>
        ),
        title: template.name,
        subtitle: formatMessage({ id: 'myInventory.customTemplate', defaultMessage: 'Custom Template' }),
        id: template.id,
        tmp: template.name,
        value: `BROADCAST_TEMPLATE|${template.id}`
      }
    })
  ])
  
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={state.initValues}
        validationSchema={validationScheme}
        onSubmit={async (values, { setSubmitting, setTouched }) => {
          await submitFormFunc(values, setSubmitting, setTouched, props, state, setState)
        }}>
        {formikProps => {
          let {
            values,
            touched,
            setTouched,
            setFieldTouched,
            setValues,
            setFieldValue,
            validateForm,
            submitForm,
            setSubmitting,
            resetForm
          } = formikProps
          resetFormNew = resetForm
          formikPropsNew = formikProps
          return (
            <Form onChange={() => onChange(state, setState)}>
              <FlexModal
                open={true}
                closeIcon
                onClose={e => {
                  e.stopPropagation()
                  setState({ ...state, edited: false })
                  props.closeModalDetail()
                  !!openGlobalAddForm && openGlobalAddForm('')
                }}>
                <FlexModalContent>
                  <Dimmer inverted active={loading || autocompleteDataLoading}>
                    <Loader active={loading || autocompleteDataLoading} />
                  </Dimmer>
                  <HighSegment basic>
                    <DivTitle>
                      {formatMessage({
                        id: getSafe(() => state.detailValues.id, false)
                          ? 'inventory.modal.editListing'
                          : 'inventory.modal.addListing',
                        defaultMessage: getSafe(() => state.detailValues.id, false)
                          ? 'Edit Listing'
                          : 'Add Listing'
                      })}
                    </DivTitle>
                    <FlexTabs>
                      <Tab
                        className='inventory-sidebar tab-menu flex stretched'
                        menu={{ secondary: true, pointing: true }}
                        renderActiveOnly={false}
                        activeIndex={state.activeTab}
                        panes={[
                          {
                            menuItem: (
                              <Menu.Item
                                key='edit'
                                onClick={() => {
                                  if (Object.keys(touched).length || state.changedForm) {
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.saveFirst' defaultMessage='Save First' />,
                                        <FormattedMessage
                                          id='addInventory.poDataSaved'
                                          defaultMessage='Due to form changes you have to save the tab first'
                                        />
                                      ),
                                      {
                                        appearance: 'warning'
                                      }
                                    )
                                    return false
                                  }
                                  validateForm()
                                    .then(r => {
                                      // stop when errors found
                                      if (Object.keys(r).length) {
                                        submitForm() // show errors
                                        switchToErrors(props, state, setState, r)
                                        return false
                                      }

                                      // if validation is correct - switch tabs
                                      switchTab(props, state, setState, 0)
                                    })
                                    .catch(e => {
                                      console.error(e)
                                    })
                                }}
                                data-test='detail_inventory_tab_edit'>
                                {formatMessage({
                                  id: getSafe(() => state.detailValues.id, false)
                                    ? 'addInventory.editHeader'
                                    : 'addInventory.addHeader',
                                  defaultMessage: getSafe(() => state.detailValues.id, false) ? 'EDIT' : 'ADD'
                                })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='edit' style={{ padding: '18px', margin: '0' }}>
                                <Grid>
                                  {detailValues && detailValues.grouped && (
                                    <CustomGridRow>
                                      <CustomGridColumn>
                                        <FormattedMessage
                                          id='addInventory.virtualProductGroup'
                                          defaultMessage='This Product Offer is part of virtual Product Group, only Lot Number and PKGs Available fields can be edited.' />
                                      </CustomGridColumn>
                                    </CustomGridRow>
                                  )}

                                  <CustomGridRow>
                                    <GridColumnRequired>
                                      <FormattedMessage id='global.required' defaultMessage='Required' />
                                    </GridColumnRequired>
                                  </CustomGridRow>
                                  <GridRow>
                                    <GridColumn>
                                      <DivRequiredFields>
                                        <Grid>
                                          <CustomGridRow>
                                            <CustomGridColumn>
                                              <FormField>
                                                <FormattedMessage
                                                  id='addInventory.companyProduct'
                                                  defaultMessage='Company Product'>
                                                  {text => (
                                                    <label>
                                                      {text}
                                                      <Required />
                                                    </label>
                                                  )}
                                                </FormattedMessage>
                                                <Dropdown
                                                  name='edit.product'
                                                  options={optionsProduct}
                                                  inputProps={{
                                                    placeholder: (
                                                      <FormattedMessage
                                                        id='addInventory.searchByProductName'
                                                        defaultMessage='Search by product name'
                                                      />
                                                    ),
                                                    disabled: detailValues && detailValues.grouped,
                                                    loading: props.autocompleteDataLoading,
                                                    'data-test': 'new_inventory_product_search_drpdn',
                                                    minCharacters: 1,
                                                    icon: 'search',
                                                    fluid: true,
                                                    search: true,
                                                    selection: true,
                                                    clearable: true,
                                                    onChange: (e, { value }) =>
                                                      handleChangeProduct(value, setFieldValue, props, state, setState),
                                                    onSearchChange: (e, { searchQuery }) =>
                                                      searchQuery.length > 0 && searchProducts(searchQuery, props)
                                                  }}
                                                />
                                              </FormField>
                                            </CustomGridColumn>
                                          </CustomGridRow>
                                          <CustomGridRow>
                                            <CustomGridColumn>
                                              <FormField>
                                                <FormattedMessage id='global.warehouse' defaultMessage='Warehouse'>
                                                  {text => (
                                                    <label>
                                                      {text}
                                                      <Required />
                                                    </label>
                                                  )}
                                                </FormattedMessage>
                                                <Dropdown
                                                  name='edit.warehouse'
                                                  options={warehousesList}
                                                  inputProps={{
                                                    disabled: detailValues && detailValues.grouped,
                                                    onChange: () => onChange(state, setState),
                                                    selection: true,
                                                    value: 0,
                                                    fluid: true,
                                                    'data-test': 'new_inventory_warehouse_drpdn',
                                                    placeholder: (
                                                      <FormattedMessage
                                                        id='addInventory.selectWarehouse'
                                                        defaultMessage='Select Warehouse'
                                                      />
                                                    )
                                                  }}
                                                />
                                              </FormField>
                                            </CustomGridColumn>
                                          </CustomGridRow>
                                          <CustomGridRow>
                                            <CustomGridColumn width={8}>
                                              <FormField width={8}>
                                                <FormattedMessage
                                                  id='addInventory.pkgsAvailable'
                                                  defaultMessage='PKGs Available'>
                                                  {text => (
                                                    <DivFlex>
                                                      {text}
                                                      <Required />
                                                      {isOverMinPkgs ? (
                                                        <Popup
                                                          size='tiny'
                                                          position='top center'
                                                          inverted
                                                          style={{
                                                            fontSize: '12px',
                                                            color: '#cecfd4',
                                                            opacity: '0.9'
                                                          }}
                                                          header={
                                                            <div>
                                                              <FormattedMessage
                                                                id='inventory.isBelowMin'
                                                                defaultMessage='The available quantity is below the min quantity'
                                                              />
                                                            </div>
                                                          }
                                                          trigger={
                                                            <div>
                                                              <Warning
                                                                className='title-icon'
                                                                style={{ fontSize: '16px', color: '#f16844' }}
                                                              />
                                                            </div>
                                                          } // <div> has to be there otherwise popup will be not shown
                                                        />
                                                      ) : null}
                                                    </DivFlex>
                                                  )}
                                                </FormattedMessage>

                                                <Input
                                                  name='edit.pkgAvailable'
                                                  inputProps={{
                                                    placeholder: '0',
                                                    type: 'number',
                                                    min: 1,
                                                    fluid: true,
                                                    onChange: (e, { value }) => {
                                                      value = parseInt(value)
                                                      if (!isNaN(value)) {
                                                        setFieldValue('edit.pkgAvailable', value)
                                                        if (values?.edit?.minimum) {
                                                          values.edit.minimum > value
                                                            ? setIsOverMinPkgs(true)
                                                            : setIsOverMinPkgs(false)
                                                        }
                                                      }
                                                    }
                                                  }}
                                                />
                                              </FormField>
                                            </CustomGridColumn>
                                            <CustomGridColumn
                                              width={4}
                                              data-test='add_inventory_product_minimumOQ_inp'>
                                              <FormField width={4}>
                                                <FormattedMessage
                                                  id='global.minimumPkgs'
                                                  defaultMessage='Minimum PKGs'>
                                                  {text => (
                                                    <label>
                                                      {text}
                                                      <Required />
                                                    </label>
                                                  )}
                                                </FormattedMessage>
                                                <Input
                                                  name='edit.minimum'
                                                  inputProps={{
                                                    placeholder: '0',
                                                    disabled: detailValues && detailValues.grouped,
                                                    type: 'number',
                                                    fluid: true,
                                                    min: 1,
                                                    onChange: (e, { value }) => {
                                                      value = parseInt(value)
                                                      if (value > 1 && !isNaN(value)) {
                                                        onSplitsChange(
                                                          value,
                                                          values,
                                                          setFieldValue,
                                                          validateForm
                                                        )

                                                        // It seems to do bug when created new inventory
                                                        // value is adding in handleSubmit
                                                        //setFieldValue('priceTiers.pricingTiers[0].quantityFrom', value)
                                                      }
                                                      if (values?.edit?.pkgAvailable && !isNaN(value)) {
                                                        values.edit.pkgAvailable < value
                                                          ? setIsOverMinPkgs(true)
                                                          : setIsOverMinPkgs(false)
                                                      }
                                                    }
                                                  }}
                                                />
                                              </FormField>
                                            </CustomGridColumn>
                                            <CustomGridColumn width={4} data-test='add_inventory_product_splits_inp'>
                                              <FormField width={4}>
                                                <FormattedMessage id='global.splitPkgs' defaultMessage='Split PKGs'>
                                                  {text => (
                                                    <label>
                                                      {text}
                                                      <Required />
                                                    </label>
                                                  )}
                                                </FormattedMessage>
                                                <Input
                                                  name='edit.splits'
                                                  inputProps={{
                                                    placeholder: '0',
                                                    disabled: detailValues && detailValues.grouped,
                                                    type: 'number',
                                                    min: 1,
                                                    fluid: true,
                                                    onChange: (e, { value }) =>
                                                      onSplitsChange(value, values, setFieldValue, validateForm)
                                                  }}
                                                />
                                              </FormField>
                                            </CustomGridColumn>
                                          </CustomGridRow>
                                          <CustomGridRow>
                                            <CustomGridColumn width={8}>
                                              <FormField width={4}>
                                                {inputWrapper(
                                                  'edit.fobPrice',
                                                  {
                                                    disabled: detailValues && detailValues.grouped,
                                                    type: 'number',
                                                    min: '0',
                                                    onChange: (e, { value }) => {
                                                      if (getSafe(() => values.priceTiers.pricingTiers.length, 0)) {
                                                        setFieldValue(`priceTiers.pricingTiers[0].price`, value)
                                                      }
                                                    },
                                                    placeholder: '0.000',
                                                    fluid: true
                                                  },
                                                  <>
                                                    <FormattedMessage id='global.fobPrice' defaultMessage='FOB Price' />
                                                    <Required />
                                                  </>,
                                                  currencySymbol
                                                )}
                                              </FormField>
                                            </CustomGridColumn>
                                            <CustomGridColumn width={4}>
                                              <FormField width={4}>
                                                <FormattedMessage id='global.inStock' defaultMessage='In Stock'>
                                                  {text => (
                                                    <label>
                                                      {text}
                                                      <Required />
                                                    </label>
                                                  )}
                                                </FormattedMessage>
                                                <Dropdown
                                                  name='edit.inStock'
                                                  options={OPTIONS_YES_NO}
                                                  inputProps={{
                                                    onChange: () => onChange(state, setState),
                                                    disabled: detailValues && detailValues.grouped,
                                                    'data-test': 'add_inventory_instock',
                                                    fluid: true
                                                  }}
                                                />
                                              </FormField>
                                            </CustomGridColumn>
                                            <CustomGridColumn width={4}>
                                              <FormField width={4}>
                                                {inputLabeledWrapper(
                                                  'edit.leadTime',
                                                  {
                                                    label: formatMessage({
                                                      id: 'filter.days',
                                                      defaultMessage: 'days'
                                                    }),
                                                    labelPosition: 'right',
                                                    type: 'number',
                                                    min: '0',
                                                    disabled: detailValues && detailValues.grouped
                                                  },
                                                  <>
                                                    <FormattedMessage id='global.leadTime' defaultMessage='Lead Time' />
                                                    <Required />
                                                  </>
                                                )}
                                              </FormField>
                                            </CustomGridColumn>
                                          </CustomGridRow>
                                        </Grid>
                                      </DivRequiredFields>
                                    </GridColumn>
                                  </GridRow>

                                  <CustomGridRow>
                                    <GridColumn width={8}>
                                      <FormField width={8}>
                                        <FormattedMessage
                                          id='myInventory.whoShouldSee'
                                          defaultMessage='Who should see this offer?'>
                                          {text => <label>{text}</label>}
                                        </FormattedMessage>
                                        <Dropdown
                                          name='edit.broadcastOption'
                                          inputProps={{
                                            onChange: () => onChange(state, setState),
                                            'data-test': 'add_inventory_whoShouldSee',
                                            fluid: true,
                                            closeOnChange: true,
                                            loading: isLoadingBroadcast
                                          }}
                                          options={optionsSeeOffer.map((option, optIndex) => {
                                            return {
                                              key: option.id ? option.id : optIndex * -1 - 1,
                                              text: (
                                                <HeaderOptions
                                                  icon={option.icon}
                                                  content={option.title}
                                                  subheader={option.subtitle}
                                                />
                                              ),
                                              value: option.value,
                                              content: (
                                                <HeaderOptions
                                                  icon={option.icon}
                                                  content={option.title}
                                                  subheader={option.subtitle}
                                                />
                                              ),
                                              onClick: () => {
                                                getSafe(() => state.detailValues.id, false) &&
                                                  onClickBroadcast(
                                                    state.detailValues,
                                                    option.value,
                                                    broadcastChange,
                                                    props.datagrid,
                                                    option.id ? { id: option.id, name: option.tmp } : null
                                                  )
                                                setFieldValue('edit.broadcastOption', option.value)
                                              }
                                            }
                                          })}
                                        />
                                      </FormField>
                                    </GridColumn>
                                    <GridColumn width={8}>
                                      <FormField width={8}>
                                        <FormattedMessage
                                          id='myInventory.listingShare'
                                          defaultMessage='Enable Listing Share for this offer?'>
                                          {text => <label>{text}</label>}
                                        </FormattedMessage>
                                        <Dropdown
                                          name='edit.shared'
                                          options={OPTIONS_YES_NO}
                                          inputProps={{
                                            onChange: () => onChange(state, setState),
                                            'data-test': 'add_inventory_shared',
                                            fluid: true
                                          }}
                                        />
                                      </FormField>
                                    </GridColumn>
                                  </CustomGridRow>

                                  <CustomGridRow>
                                    <GridColumn width={8}>
                                      <FormField width={8}>
                                        <FormattedMessage
                                          id='myInventory.acceptBids'
                                          defaultMessage='Accept bids on offer?'>
                                          {text => <label>{text}</label>}
                                        </FormattedMessage>
                                        <Dropdown
                                          name='edit.acceptBids'
                                          options={OPTIONS_YES_NO}
                                          inputProps={{
                                            onChange: () => onChange(state, setState),
                                            'data-test': 'add_inventory_acceptBids',
                                            fluid: true
                                          }}
                                        />
                                      </FormField>
                                    </GridColumn>
                                  </CustomGridRow>
                                  <CustomGridRow>
                                    <GridColumnOptionalInformation
                                      onClick={() =>
                                        setState({ ...state, isOpenOptionalInformation: !state.isOpenOptionalInformation })
                                      }>
                                      <FormattedMessage
                                        id='myInventory.optionalInformation'
                                        defaultMessage='Optional Information'
                                      />
                                      {state.isOpenOptionalInformation ? <ChevronUp /> : <ChevronDown />}
                                    </GridColumnOptionalInformation>
                                  </CustomGridRow>
                                  {state.isOpenOptionalInformation ? (
                                    <>
                                      <CustomGridRow>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            {inputWrapper(
                                              'edit.costPerUOM',
                                              {
                                                disabled: detailValues && detailValues.grouped,
                                                type: 'number',
                                                min: '0',
                                                placeholder: '0.000',
                                                fluid: true
                                              },
                                              <FormattedMessage id='global.cost' defaultMessage='Cost' />,
                                              currencySymbol
                                            )}
                                          </FormField>
                                        </GridColumn>
                                        <GridColumn width={3}>
                                          <FormField width={3}>
                                            <FormattedMessage
                                              id='global.offerExpiration'
                                              defaultMessage='Offer Expiration'>
                                              {text => <label>{text}</label>}
                                            </FormattedMessage>
                                            <Dropdown
                                              name='edit.doesExpire'
                                              options={OPTIONS_YES_NO}
                                              inputProps={{
                                                onChange: () => onChange(state, setState),
                                                disabled: detailValues && detailValues.grouped,
                                                'data-test': 'add_inventory_doesExpire',
                                                fluid: true
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                        <GridColumn width={5}>
                                          <DateInput
                                            label={
                                              <FormattedMessage
                                                id='addInventory.offerExpirationDate'
                                                defaultMessage='Offer Expiration Date'
                                              />
                                            }
                                            inputProps={{
                                              disabled:
                                                !values.edit.doesExpire || (detailValues && detailValues.grouped),
                                              'data-test': 'modal_detail_expiration_date',
                                              fluid: true
                                              }}
                                            name='edit.expirationDate'
                                            inputOnly
                                            addSeparator
                                          />
                                        </GridColumn>
                                      </CustomGridRow>
                                      <CustomGridRow>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            <FormattedMessage id='addInventory.form' defaultMessage='Form'>
                                              {text => <label>{text}</label>}
                                            </FormattedMessage>
                                            <Dropdown
                                              name='edit.productForm'
                                              options={productFormsDropdown}
                                              inputProps={{
                                                onChange: () => onChange(state, setState),
                                                disabled: detailValues && detailValues.grouped,
                                                'data-test': 'new_inventory_form_drpdn',
                                                placeholder: (
                                                  <FormattedMessage
                                                    id='addInventory.selectForm'
                                                    defaultMessage='Select Form'
                                                  />
                                                ),
                                                fluid: true
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            <FormattedMessage id='addInventory.grades' defaultMessage='Grades'>
                                              {text => <label>{text}</label>}
                                            </FormattedMessage>
                                            <Dropdown
                                              name='edit.productGrades'
                                              options={productGradesDropdown}
                                              inputProps={{
                                                placeholder: (
                                                  <FormattedMessage
                                                    id='addInventory.selectGrades'
                                                    defaultMessage='Select Grades'
                                                  />
                                                ),
                                                onChange: () => onChange(state, setState),
                                                'data-test': 'new_inventory_grade_drpdn',
                                                disabled: detailValues && detailValues.grouped,
                                                selection: true,
                                                multiple: true,
                                                fluid: true
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                      </CustomGridRow>
                                      <CustomGridRow>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            <FormattedMessage id='global.lotNumber' defaultMessage='Lot Number'>
                                              {text => <label>{text}</label>}
                                            </FormattedMessage>
                                            <Input
                                              type='text'
                                              name='edit.lotNumber'
                                              inputProps={{
                                                placeholder: '0',
                                                fluid: true
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            <FormattedMessage
                                              id='addInventory.origin'
                                              defaultMessage='Country of Origin'>
                                              {text => <label>{text}</label>}
                                            </FormattedMessage>
                                            <Dropdown
                                              name='edit.origin'
                                              options={searchedOrigins}
                                              inputProps={{
                                                onChange: () => onChange(state, setState),
                                                'data-test': 'new_inventory_origin_drpdn',
                                                size: 'large',
                                                minCharacters: 0,
                                                icon: 'search',
                                                search: true,
                                                selection: true,
                                                clearable: true,
                                                disabled: detailValues && detailValues.grouped,
                                                onSearchChange: debounce(
                                                  (e, { searchQuery }) => searchOrigins(countriesDropdown, searchQuery),
                                                  250
                                                ),
                                                placeholder: (
                                                  <FormattedMessage
                                                    id='addInventory.selectCountry'
                                                    defaultMessage='Select Country'
                                                  />
                                                ),
                                                fluid: true
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                      </CustomGridRow>
                                      <CustomGridRow>
                                        <GridColumn width={8}>
                                          <DateInput
                                            label={
                                              <FormattedMessage
                                                id='global.lotExpiredDate'
                                                defaultMessage='Lot Expired Date' />
                                            }
                                            inputProps={{
                                              'data-test': 'modal_detail_lot_exp_date',
                                              disabled: detailValues && detailValues.grouped,
                                              fluid: true
                                            }}
                                            name='edit.lotExpirationDate'
                                            inputOnly
                                            addSeparator
                                          />
                                        </GridColumn>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            <FormattedMessage id='addInventory.condition' defaultMessage='Condition'>
                                              {text => <label>{text}</label>}
                                            </FormattedMessage>
                                            <Dropdown
                                              name='edit.conforming'
                                              options={LIST_CONFORMING}
                                              inputProps={{
                                                onChange: () => onChange(state, setState),
                                                disabled: detailValues && detailValues.grouped,
                                                'data-test': 'new_inventory_conforming_drpdn',
                                                fluid: true
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                      </CustomGridRow>
                                      <CustomGridRow>
                                        <GridColumn width={8}>
                                          <DateInput
                                            label={
                                              <FormattedMessage id='global.mfgDate' defaultMessage='Mfg Date' />
                                            }
                                            inputProps={{
                                              'data-test': 'modal_detail_lot_mfg_date',
                                              disabled: detailValues && detailValues.grouped,
                                              maxDate: moment(),
                                              fluid: true
                                            }}
                                            name='edit.lotManufacturedDate'
                                            inputOnly
                                            addSeparator
                                          />
                                        </GridColumn>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            <FormattedMessage
                                              id='addInventory.conditionNotes'
                                              defaultMessage='Condition Notes'>
                                              {text => (
                                                <label>
                                                  {text}
                                                  {values.edit.conforming ? null : <Required />}
                                                </label>
                                              )}
                                            </FormattedMessage>
                                            <Input
                                              name='edit.conditionNotes'
                                              inputProps={{
                                                disabled: detailValues && detailValues.grouped,
                                                placeholder: formatMessage({
                                                  id: 'addInventory.writeShortNotesHere',
                                                  defaultMessage: 'Write short notes here'
                                                }),
                                                fluid: true
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                      </CustomGridRow>

                                      <CustomGridRow>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            <FormattedMessage
                                              id='addInventory.externalNotes'
                                              defaultMessage='External Notes'>
                                              {text => <label>{text}</label>}
                                            </FormattedMessage>
                                            <TextAreaField
                                              name='edit.externalNotes'
                                              inputProps={{
                                                disabled: detailValues && detailValues.grouped,
                                                placeholder: formatMessage({
                                                  id: 'addInventory.writeExternalNotesHere',
                                                  defaultMessage: 'Write external notes here'
                                                }),
                                                className: 'fluid'
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                        <GridColumn width={8}>
                                          <FormField width={8}>
                                            <FormattedMessage
                                              id='addInventory.internalNotes'
                                              defaultMessage='Internal Notes'>
                                              {text => <label>{text}</label>}
                                            </FormattedMessage>
                                            <TextAreaField
                                              name='edit.internalNotes'
                                              inputProps={{
                                                disabled: detailValues && detailValues.grouped,
                                                placeholder: formatMessage({
                                                  id: 'addInventory.writeInternalNotesHere',
                                                  defaultMessage: 'Write internal notes here'
                                                }),
                                                className: 'fluid'
                                              }}
                                            />
                                          </FormField>
                                        </GridColumn>
                                      </CustomGridRow>
                                    </>
                                  ) : null}
                                </Grid>
                              </Tab.Pane>
                            )
                          },
                          {
                            menuItem: (
                              <Menu.Item
                                key='tds'
                                disabled={detailValues && detailValues.grouped}
                                onClick={() => {
                                  if (Object.keys(touched).length || state.changedForm) {
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.saveFirst' defaultMessage='Save First' />,
                                        <FormattedMessage
                                          id='addInventory.poDataSaved'
                                          defaultMessage='Due to form changes you have to save the tab first'
                                        />
                                      ),
                                      {
                                        appearance: 'warning'
                                      }
                                    )
                                    return false
                                  }
                                  validateForm()
                                    .then(r => {
                                      // stop when errors found
                                      if (Object.keys(r).length) {
                                        submitForm() // show errors
                                        switchToErrors(props, state, setState, r)
                                        return false
                                      }

                                      // if validation is correct - switch tabs
                                      switchTab(props, state, setState, 1)
                                    })
                                    .catch(e => {
                                      console.error(e)
                                    })
                                }}
                                data-test='detail_inventory_tab_documents'>
                                {formatMessage({ id: 'addInventory.tds', defaultMessage: 'TDS' })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='tds' style={{ padding: '16px' }}>
                                <Grid>
                                  <Grid.Row>
                                    <Grid.Column width={6}>
                                      <ModalTdsList
                                        open={openedTdsList}
                                        tdsTemplates={tdsTemplates}
                                        tdsTemplatesLoading={tdsTemplatesLoading}
                                        closeTdsModal={() => closeTdsModal(state, setState)}
                                        deleteTdsTemplate={props.deleteTdsTemplate}
                                        values={values}
                                        setValues={setValues}
                                        setFieldTouched={setFieldTouched}
                                      />
                                      <SelectTemplates
                                        onClick={() => {
                                          props.getTdsTemplates()
                                          setState({ ...state, openedTdsList: true })
                                        }}>
                                        <Folder />
                                        <FormattedMessage
                                          id='addInventory.selectFromTemplates'
                                          defaultMessage='Select From Templates'
                                        />
                                      </SelectTemplates>
                                    </Grid.Column>
                                  </Grid.Row>
                                  <Grid.Row>
                                    <Grid.Column width={4}>
                                      <FormattedMessage id='addInventory.property' defaultMessage='Property' />
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                      <FormattedMessage
                                        id='addInventory.specifications'
                                        defaultMessage='Specifications'
                                      />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                      <FormattedMessage id='addInventory.testMethod' defaultMessage='Test Method' />
                                    </Grid.Column>
                                  </Grid.Row>
                                  <GridFields>
                                    <FieldArray
                                      name='edit.tdsFields'
                                      render={arrayHelpers => (
                                        <>
                                          {getSafe(() => values.edit.tdsFields.length, '')
                                            ? values.edit.tdsFields.map((property, index) => {
                                                return (
                                                  <>
                                                    <GridRow>
                                                      <GridColumn width={4}>
                                                        <Input
                                                          type='text'
                                                          name={`edit.tdsFields[${index}].property`}
                                                          inputProps={{
                                                            placeholder: formatMessage({
                                                              id: 'addInventory.tdsFields.enterProperty',
                                                              defaultMessage: 'Enter Property'
                                                            })
                                                          }}
                                                        />
                                                      </GridColumn>
                                                      <GridColumn width={6}>
                                                        <Input
                                                          type='text'
                                                          name={`edit.tdsFields[${index}].specifications`}
                                                          inputProps={{
                                                            placeholder: formatMessage({
                                                              id: 'addInventory.tdsFields.enterSpecifications',
                                                              defaultMessage: 'Enter Specifications'
                                                            }),
                                                            fluid: true
                                                          }}
                                                        />
                                                      </GridColumn>
                                                      <GridColumn width={4}>
                                                        <Input
                                                          type='text'
                                                          name={`edit.tdsFields[${index}].testMethods`}
                                                          inputProps={{
                                                            placeholder: formatMessage({
                                                              id: 'addInventory.tdsFields.enterTestMethod',
                                                              defaultMessage: 'Enter Test Method'
                                                            }),
                                                            fluid: true
                                                          }}
                                                        />
                                                      </GridColumn>
                                                      <GridColumn
                                                        width={2}
                                                        verticalAlign='middle'
                                                        textAlign='center'
                                                        onClick={e => {
                                                          arrayHelpers.remove(index)
                                                          setState({ ...state, changedForm: true })
                                                        }}>
                                                        <IconTrash />
                                                      </GridColumn>
                                                    </GridRow>
                                                    {index === getSafe(() => values.edit.tdsFields.length, 0) - 1 ? (
                                                      <GridRow>
                                                        <GridColumn
                                                          width={2}
                                                          verticalAlign='middle'
                                                          textAlign='center'
                                                          onClick={e => {
                                                            arrayHelpers.push({ property: '', specifications: '' })
                                                            setState({ ...state, changedForm: true })
                                                          }}>
                                                          <DivAddInputTds>
                                                            <DivIconPlusCircle>
                                                              <IconPlusCircle />
                                                            </DivIconPlusCircle>
                                                          </DivAddInputTds>
                                                        </GridColumn>
                                                      </GridRow>
                                                    ) : null}
                                                  </>
                                                )
                                              })
                                            : null}
                                        </>
                                      )}
                                    />
                                  </GridFields>
                                </Grid>
                              </Tab.Pane>
                            )
                          },
                          {
                            menuItem: (
                              <Menu.Item
                                key='documents'
                                disabled={detailValues && detailValues.grouped}
                                onClick={() => {
                                  if (Object.keys(touched).length || state.changedForm) {
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.saveFirst' defaultMessage='Save First' />,
                                        <FormattedMessage
                                          id='addInventory.poDataSaved'
                                          defaultMessage='Due to form changes you have to save the tab first'
                                        />
                                      ),
                                      {
                                        appearance: 'warning'
                                      }
                                    )
                                    return false
                                  }
                                  validateForm()
                                    .then(r => {
                                      // stop when errors found
                                      if (Object.keys(r).length) {
                                        submitForm() // show errors
                                        switchToErrors(props, state, setState, r)
                                        return false
                                      }

                                      // if validation is correct - switch tabs
                                      switchTab(props, state, setState, 2)
                                    })
                                    .catch(e => {
                                      console.error(e)
                                    })
                                }}
                                data-test='detail_inventory_tab_documents'>
                                {formatMessage({ id: 'addInventory.productDocuments', defaultMessage: 'DOCUMENTS' })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='documents' style={{ padding: '16px' }}>
                                {state.activeTab === 2 ? (
                                  <DocumentTab
                                    listDocumentTypes={documentTypesDropdown}
                                    values={values.documents}
                                    setFieldValue={setFieldValue}
                                    setFieldNameAttachments='documents.attachments'
                                    dropdownName='documents.documentType'
                                    removeAttachmentLink={removeAttachmentLinkProductOffer}
                                    removeAttachment={removeAttachment}
                                    addAttachment={addAttachment}
                                    loadFile={loadFile}
                                    changedForm={files =>
                                      setState({ ...state, changedForm: true, attachmentFiles: state.attachmentFiles.concat(files) })
                                    }
                                    idForm={getSafe(() => detailValues.id, 0)}
                                    attachmentFiles={state.attachmentFiles}
                                    removeAttachmentFromUpload={id => {
                                      const attachmentFiles = state.attachmentFiles.filter(
                                        attachment => attachment.id !== id
                                      )
                                      setState({ ...state, attachmentFiles })
                                    }}
                                  />
                                ) : null}
                              </Tab.Pane>
                            )
                          },
                          {
                            menuItem: (
                              <Menu.Item
                                key='priceBook'
                                disabled={detailValues && detailValues.grouped}
                                onClick={() => {
                                  if (Object.keys(touched).length || state.changedForm) {
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.saveFirst' defaultMessage='Save First' />,
                                        <FormattedMessage
                                          id='addInventory.poDataSaved'
                                          defaultMessage='Due to form changes you have to save the tab first'
                                        />
                                      ),
                                      {
                                        appearance: 'warning'
                                      }
                                    )
                                    return false
                                  }
                                  validateForm()
                                    .then(r => {
                                      // stop when errors found
                                      if (Object.keys(r).length) {
                                        submitForm() // show errors
                                        switchToErrors(props, state, setState, r)
                                        return false
                                      }

                                      // if validation is correct - switch tabs

                                      switchTab(props, state, setState, 3)
                                    })
                                    .catch(e => {
                                      console.error(e)
                                    })
                                }}
                                data-test='detail_inventory_tab_priceBook'>
                                {formatMessage({ id: 'addInventory.priceBook', defaultMessage: 'PRICE BOOK' })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane
                                loading={
                                  isLoadingBroadcast &&
                                  !loading &&
                                  !autocompleteDataLoading
                                }
                                key='priceBook'
                                style={{ padding: '18px' }}>
                                {state.activeTab === 3 ? (
                                  <Broadcast
                                    isPrepared={!state.broadcastLoading}
                                    asModal={true}
                                    saveBroadcast={state.saveBroadcast}
                                    changedForm={(isChanged = true) => changedForm(isChanged, state, setState)}
                                    close={props.closeModalDetail}
                                    detailValues={detailValues}
                                    inventoryGrid={datagrid}
                                  />
                                ) : null}
                              </Tab.Pane>
                            )
                          },
                          {
                            menuItem: (
                              <Menu.Item
                                key='priceTiers'
                                disabled={detailValues && detailValues.grouped}
                                onClick={() => {
                                  if (Object.keys(touched).length || state.changedForm) {
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.saveFirst' defaultMessage='Save First' />,
                                        <FormattedMessage
                                          id='addInventory.poDataSaved'
                                          defaultMessage='Due to form changes you have to save the tab first'
                                        />
                                      ),
                                      {
                                        appearance: 'warning'
                                      }
                                    )
                                    return false
                                  }
                                  validateForm()
                                    .then(r => {
                                      // stop when errors found
                                      if (Object.keys(r).length) {
                                        submitForm() // show errors
                                        switchToErrors(props, state, setState, r)
                                        return false
                                      }

                                      // if validation is correct - switch tabs
                                      switchTab(props, state, setState, 4)
                                    })
                                    .catch(e => {
                                      console.error(e)
                                    })
                                }}
                                data-test='detail_inventory_tab_priceTiers'>
                                {formatMessage({
                                  id: 'addInventory.priceTiersHeader',
                                  defaultMessage: 'PRICE TIERS'
                                })}
                              </Menu.Item>
                            ),
                            pane: (
                              <Tab.Pane key='priceTiers' style={{ padding: '18px' }}>
                                <Grid>
                                  <GridRow>
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
                                  </GridRow>
                                  {/* <Grid> */}
                                  <GridRow>
                                    <GridColumn>{renderPricingTiers(props, state, setState, formikPropsNew, values.priceTiers.pricingTiers)}</GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn verticalAlign='middle'>
                                      <DivButtonPlus
                                        onClick={() => {
                                          let pricingTiers = values.priceTiers.pricingTiers
                                          pricingTiers.push({ quantityFrom: '', price: '' })
                                          setFieldValue('priceTiers.pricingTiers', pricingTiers)
                                        }}>
                                        <Plus size='18' color='#20273a' />
                                      </DivButtonPlus>
                                    </GridColumn>
                                  </GridRow>
                                  {/* </Grid> */}
                                </Grid>
                              </Tab.Pane>
                            )
                          }
                        ]}
                      />
                    </FlexTabs>
                  </HighSegment>
                </FlexModalContent>
                {state.activeTab !== 3 && (
                  <Modal.Actions>
                    <div>
                      <Button
                        size='large'
                        inputProps={{ type: 'button' }}
                        onClick={() => {
                          setState({ ...state, edited: false })
                          props.closeModalDetail()
                          !!openGlobalAddForm && openGlobalAddForm('')
                        }}
                        data-test='modal_inventory_cancel'>
                        {Object.keys(touched).length || state.changedForm
                          ? formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })
                          : formatMessage({ id: 'global.close', defaultMessage: 'Close' })}
                      </Button>
                      {state.activeTab === 1 ? (
                        <Button
                          primary
                          size='large'
                          type='button'
                          onClick={() => {
                            setState({ ...state, openedTdsSaveAs: true })
                          }}
                          data-test='modal_inventory_save_as'>
                          {formatMessage({ id: 'global.saveAs', defaultMessage: 'Save as' })}
                        </Button>
                      ) : null}
                      <ModalTdsSaveAs
                        open={openedTdsSaveAs}
                        closeTdsModal={() => closeTdsModal(state, setState)}
                        saveTdsAsTemplate={props.saveTdsAsTemplate}
                        tdsFields={values.edit.tdsFields}
                      />
                      <Button
                        disabled={!(Object.keys(touched).length || state.changedForm)}
                        primary
                        size='large'
                        type='button'
                        onClick={() => {
                          // Dont validate if it is a broadcast tab
                          if (state.activeTab === 3) {
                            submitFormFunc(values, setSubmitting, setTouched, props, state, setState)
                            return true
                          }

                          return validateForm().then(async r => {
                            if (Object.keys(r).length && state.activeTab !== 2) {
                              switchToErrors(props, state, setState, r)
                              submitForm() // to show errors
                            } else {
                              let { data } = await submitFormFunc(values, setSubmitting, setTouched, props, state, setState)

                              if (data && !getSafe(() => state.detailValues.id, false)) {
                                confirm(
                                  formatMessage({
                                    id: 'confirm.editOrAddNew.header',
                                    defaultMessage: 'Edit or Add New'
                                  }),
                                  formatMessage({
                                    id: 'confirm.editOrAddNew.content',
                                    defaultMessage:
                                      'If you like to continue editing this product offer by adding documents, price tiers, or price book rules, click Edit. If you would like to add a new Inventory Item, click New.'
                                  }),
                                  {
                                    cancelText: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
                                    proceedText: formatMessage({ id: 'global.new', defaultMessage: 'New' })
                                  }
                                ).then(
                                  () => {
                                    setState(state => ({
                                      ...state,
                                      detailValues: { ...state.detailValues, id: null }
                                    })) // confirm (New)
                                  },
                                  () => {
                                    setState(state => ({
                                      ...state,
                                      detailValues: { ...state.detailValues, id: data.id }
                                    })) // cancel (Edit)
                                    props.getProductOffer({ ...state.detailValues, ...data })
                                  }
                                )
                              }
                            }
                          })
                        }}
                        data-test='modal_inventory_save_new'>
                        {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                      </Button>
                    </div>
                  </Modal.Actions>
                )}
              </FlexModal>
              <ErrorFocus />
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

ModalDetail.propTypes = {
  detailValues: PropTypes.object,
  intl: PropTypes.object,
  datagrid: PropTypes.object,
  modalActiveTab: PropTypes.number,
  editProductOfferInitTrig: PropTypes.bool,
  loading: PropTypes.bool,
  isLoadingBroadcast: PropTypes.bool,
  autocompleteDataLoading: PropTypes.bool,
  tdsTemplatesLoading: PropTypes.bool,
  productFormsDropdown: PropTypes.array,
  productGradesDropdown: PropTypes.array,
  searchedOrigins: PropTypes.array,
  warehousesList: PropTypes.array,
  documentTypesDropdown: PropTypes.array,
  broadcastTemplates: PropTypes.array,
  tdsTemplates: PropTypes.array,
  autocompleteData: PropTypes.array,
  toastManager: PropTypes.any,
  applicationName: PropTypes.string,
  currencySymbol: PropTypes.string,
  loadFile: PropTypes.func,
  addAttachment: PropTypes.func,
  removeAttachmentLinkProductOffer: PropTypes.func,
  removeAttachment: PropTypes.func,
  broadcastChange: PropTypes.func,
  getProductForms: PropTypes.func,
  getProductGrades: PropTypes.func,
  getWarehouses: PropTypes.func,
  searchOrigins: PropTypes.func,
  closeModalDetail: PropTypes.func,
  deleteTdsTemplate: PropTypes.func,
  getTdsTemplates: PropTypes.func,
  saveTdsAsTemplate: PropTypes.func,
  getAutocompleteData: PropTypes.func,
  addProductOffer: PropTypes.func,
  openBroadcast: PropTypes.func
}

ModalDetail.defaultProps = {
  detailValues: {},
  intl: {},
  datagrid: {},
  modalActiveTab: 0,
  editProductOfferInitTrig: false,
  loading: false,
  isLoadingBroadcast: false,
  autocompleteDataLoading: false,
  tdsTemplatesLoading: false,
  productFormsDropdown: [],
  productGradesDropdown: [],
  searchedOrigins: [],
  warehousesList: [],
  documentTypesDropdown: [],
  broadcastTemplates: [],
  tdsTemplates: [],
  autocompleteData: [],
  toastManager: null,
  applicationName: '',
  currencySymbol: '$',
  loadFile: () => {},
  addAttachment: () => {},
  removeAttachmentLinkProductOffer: () => {},
  removeAttachment: () => {},
  broadcastChange: () => {},
  getProductForms: () => {},
  getProductGrades: () => {},
  getWarehouses: () => {},
  searchOrigins: () => {},
  closeModalDetail: () => {},
  deleteTdsTemplate: () => {},
  getTdsTemplates: () => {},
  saveTdsAsTemplate: () => {},
  getAutocompleteData: () => {},
  addProductOffer: () => {},
  openBroadcast: () => {}
}

export default injectIntl(ModalDetail)
