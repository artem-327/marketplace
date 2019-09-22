import React from 'react'
import { connect } from 'react-redux'

import { Form, Modal, Segment, Header, FormGroup, FormField, Search, Icon } from 'semantic-ui-react'
import { Formik, FieldArray } from 'formik'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import {
  closePopup, updateCompany, createCompany, getCountries, getPrimaryBranchProvinces, getMailingBranchProvinces,
  getAddressSearchPrimaryBranch, getAddressSearchMailingBranch, removeEmpty, getProductsCatalogRequest, searchCasProduct,
  prepareSearchedCasProducts, getDocumentTypes, newElementsIndex, removeElementsIndex, putEchoProduct, searchManufacturers
} from '~/modules/admin/actions'
import { addZip, getZipCodes } from '~/modules/zip-dropdown/actions'
import { postCompanyLogo, deleteCompanyLogo } from '~/modules/company-form/actions'
import { Button, Input, Dropdown, TextArea, Checkbox } from 'formik-semantic-ui'
import { DateInput } from '~/components/custom-formik'
import * as Yup from 'yup'

import { cloneDeep } from 'lodash'

import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'

import { validationSchema } from '~/modules/company-form/constants'
import { provinceObjectRequired, errorMessages } from '~/constants/yupValidation'

import { CompanyForm } from '~/modules/company-form/'
import { AddressForm } from '~/modules/address-form/'
import { addressValidationSchema } from '~/constants/yupValidation'

import { getSafe, generateToastMarkup } from '~/utils/functions'
import { Datagrid } from '~/modules/datagrid'
import debounce from "lodash/debounce"
import escapeRegExp from "lodash/escapeRegExp"

const initialFormValues = {
}

class AddNewPopupEchoProduct extends React.Component {
  state = {
    isLoading: false,
    value: ''
  }

  componentDidMount() {
    this.props.getProductsCatalogRequest()

    if (getSafe(() => this.props.popupValues.elements.length, 0)) {
      this.props.prepareSearchedCasProducts(this.props.popupValues.elements)
    }

    console.log('manufacturer', getSafe(() => this.props.popupValues.manufacturer, 'XXX'))
    this.props.searchManufacturers(getSafe(() => this.props.popupValues.manufacturer.name, ''), 200)
  }

  formValidationNew = () => (Yup.lazy(values => {
    // let primaryUserRequired = values.primaryUser.email !== '' || values.primaryUser.name !== ''
    let mailingBranchRequired = values.mailingBranch.name.trim() !== '' || values.mailingBranch.contactEmail.trim() !== '' ||
      values.mailingBranch.contactName.trim() !== '' || values.mailingBranch.contactPhone.trim() !== '' ||
      values.mailingBranch.address.streetAddress.trim() !== '' || values.mailingBranch.address.city.trim() !== '' ||
      values.mailingBranch.address.zip !== '' || values.mailingBranch.address.country !== ''

    let minLength = errorMessages.minLength(2)

    let validation = Yup.object().shape({
      name: Yup.string().trim().min(2, minLength).required(minLength),

      mailingBranch: Yup.lazy(() => {
        if (mailingBranchRequired) return Yup.object().shape({
          name: Yup.string().trim().min(2, minLength).required(minLength),
          contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
          contactName: Yup.string().trim().min(2, minLength).required(minLength),
          contactPhone: Yup.string().trim().required(errorMessages.enterPhoneNumber),
          address: addressValidationSchema()
        })
        return Yup.mixed().notRequired()
      }),

      primaryBranch: Yup.object().shape({
        name: Yup.string().trim().min(2, minLength).required(minLength),
        contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
        contactName: Yup.string().trim().min(2, minLength).required(minLength),
        contactPhone: Yup.string().trim().required(errorMessages.enterPhoneNumber),
        address: addressValidationSchema()
      }),
      primaryUser: Yup.lazy(() => {
        // if (primaryUserRequired) 
        return Yup.object().shape({
          email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
          name: Yup.string().trim().min(2, minLength).required(minLength),
        })
        // return Yup.mixed().notRequired()
      }),
    })

    return validation
  }))

  getInitialFormValues = () => {
    const { popupValues } = this.props
    let initialValues = {
      attachments: [],
      elements: [{ casProduct: undefined, assayMin: 100, assayMax: 100 }],
      description: '',
      hazardClass: [],
      unShippingName: undefined,
      name: '',
      code: '',
      packagingGroup: null,
      packagingUnit: '',
      expirationDate: '',
      ...popupValues,
      elements: popupValues.elements.map(element => ({
        name: getSafe(() => element.displayName, ''),
        casProduct: getSafe(() => element.casProduct.id),
        assayMin: element.assayMin,
        assayMax: element.assayMax,
        proprietary: element.proprietary,
      })),
      unNumber: getSafe(() => popupValues.unNumber.unNumberCode, ''),
      hazardClass: popupValues.hazardClass.id
    }
    if (initialValues.elements.length === 0) {
      initialValues.elements = [{ name: '', casProduct: undefined, assayMin: 100, assayMax: 100, proprietary: false }]
    }
    return initialValues
  }

  /*handleCasProduct = () => {
    return this.props.productsCatalogRows.map(e => ({
      casProduct: e.casProduct
    }))
  }*/

  handleSearchChange = debounce((e, { searchQuery, dataindex }) => {
    this.setState({ isLoading: true, value: searchQuery })

    this.props.searchCasProduct(searchQuery, dataindex)

    setTimeout(() => {
      const re = new RegExp(escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.casProduct)

      this.setState({
        isLoading: false
      })
    }, 250)
  }, 500)

  render() {
    const {
      closePopup,
      popupValues,
      config,
      intl: { formatMessage },
      isLoading,
      packagingGroups,
      hazardClasses,
      putEchoProduct,
      searchedManufacturers,
      searchedManufacturersLoading
    } = this.props

    const casProduct = getSafe(() => popupValues.casProduct, null)
    const unNumber = getSafe(() => popupValues.unNumber, null)
    const searchedCasProducts = this.props.searchedCasProducts && this.props.searchedCasProducts.length ? this.props.searchedCasProducts : (casProduct ? [casProduct] : [])
    const searchedUnNumbers = this.props.searchedUnNumbers && this.props.searchedUnNumbers.length ? this.props.searchedUnNumbers : (unNumber ? [unNumber] : [])

    console.log('UN', unNumber, searchedUnNumbers)

    return (
      <Formik
        enableReinitialize
        initialValues={this.getInitialFormValues()/*, popupValues ? popupValues : {}*/}
        validationSchema={popupValues ? validationSchema : this.formValidationNew()}
        onSubmit={async (values, actions) => {
          console.log('VALUES', values)
          const editValues = {
            code: values.code,
            elements: values.elements.map(element => element.proprietary ? ({
              assayMin: element.assayMin,
              assayMax: element.assayMax,
              name: element.name
            }) : ({
              assayMin: element.assayMin,
              assayMax: element.assayMax,
              casProduct: element.casProduct,
            })),
            emergencyNumber: values.emergencyNumber,
            hazardClass: values.hazardClass,
            hazardLabels: values.hazardLabels,
            manufacturer: values.manufacturer,
            mfrProductCodes: [values.mfrProductCodes],
            name: values.name,
            packagingGroup: values.packagingGroup,
            sdsRevisionDate: values.sdsRevisionDate,
            sdsVersionNumber: values.sdsVersionNumber,
            unNumber: values.unNumber,
            unShippingName: values.unShippingName
          }
          if (getSafe(() => popupValues.id, false))
            putEchoProduct(popupValues.id, editValues)
        }}
        onReset={closePopup}
        render={props => {
          let { setFieldValue, values, isSubmitting } = props

          return (
            <Modal open centered={false} size='small'>

              <Modal.Header><FormattedMessage id={`global.${popupValues ? 'edit' : 'add'}`} /> {config.addEditText}</Modal.Header>
              <Segment basic padded>
                <Form loading={isSubmitting}>
                  <FormGroup widths='equal' data-test='settings_product_popup_nameCodeInci_inp'>
                    <Input type='text' label={formatMessage({ id: 'global.productName', defaultMessage: 'Product Name' })} name='name' />
                    <Input type='text' label={formatMessage({ id: 'global.productNumber', defaultMessage: 'Product Number' })} name='code' />
                  </FormGroup>

                    <FormGroup style={{ alignItems: 'flex-end', marginBottom: '0' }}>
                      <FormField width={5}>
                        <label><FormattedMessage id='settings.associatedCasIndexes' defaultMessage='What are the associated CAS Index Numbers?' /></label>
                      </FormField>
                      <FormField width={3}>
                        <label><FormattedMessage id='settings.minConcetration' defaultMessage='Min Concentration' /></label>
                      </FormField>
                      <FormField width={3}>
                        <label><FormattedMessage id='settings.maxConcetration' defaultMessage='Max Concentration' /></label>
                      </FormField>
                      <FormField width={3}>
                        <label><FormattedMessage id='admin.proprietary' defaultMessage='Proprietary' /></label>
                      </FormField>
                    </FormGroup>
                    <FieldArray name='elements'
                                render={arrayHelpers => (
                                  <>
                                    {values.elements && values.elements.length ? values.elements.map((element, index) => (
                                      <FormGroup key={index}>
                                        <FormField width={5}>
                                          {values.elements[index].proprietary ? (
                                            <Input name={`elements[${index}].name`} defaultValue={''} inputProps={{ 'data-test': `admin_product_popup_element_${index}_name`}} />
                                          ) : (
                                            <Dropdown name={`elements[${index}].casProduct`}
                                                      options={searchedCasProducts.length > index ? searchedCasProducts[index].map(item => {
                                                        return {
                                                          key: item.id,
                                                          id: item.id,
                                                          text: item.casNumber + ' ' + item.chemicalName,
                                                          value: item.id,
                                                          content: <Header content={item.casNumber} subheader={item.chemicalName} style={{ fontSize: '1em' }} />
                                                        }
                                                      }) : []}
                                                      inputProps={{
                                                        'data-test': `admin_product_popup_cas_${index}_drpdn`,
                                                        size: 'large',
                                                        minCharacters: 3,
                                                        icon: 'search',
                                                        search: options => options,
                                                        selection: true,
                                                        clearable: true,
                                                        loading: isLoading,
                                                        onSearchChange: this.handleSearchChange,
                                                        dataindex: index
                                                      }}
                                                      defaultValue={getSafe(() => element.casProduct.casNumber, false) ? element.casProduct.casNumber : ''}
                                            />
                                          )}
                                        </FormField>
                                        <FormField width={3} data-test='admin_product_popup_assayMin_inp'>
                                          <Input type='text' name={`elements[${index}].assayMin`} />
                                        </FormField>
                                        <FormField width={3} data-test='admin_product_popup_assayMax_inp'>
                                          <Input type='text' name={`elements[${index}].assayMax`} />
                                        </FormField>
                                        <FormField width={2} data-text='admin_product_popup_proprietary'>
                                          <Checkbox name={`elements[${index}].proprietary`} />
                                        </FormField>
                                        <FormField width={3}>
                                          {index ? (
                                            <Button basic icon onClick={() => {
                                              arrayHelpers.remove(index)
                                              this.props.removeElementsIndex(index)
                                            }}
                                                    data-test={`settings_product_popup_remove_${index}_btn`}>
                                              <Icon name='minus' />
                                            </Button>
                                          ) : ''}
                                          {values.elements.length === (index + 1) ? (
                                            <Button basic icon color='green' onClick={() => {
                                              arrayHelpers.push({ casProduct: '', name: '', assayMin: 0, assayMax: 0, proprietary: false })
                                              this.props.newElementsIndex()
                                            }}
                                                    data-test='settings_product_popup_add_btn'>
                                              <Icon name='plus' />
                                            </Button>
                                          ) : ''}
                                        </FormField>
                                      </FormGroup>
                                    )) : ''}
                                  </>
                                )} />
                  <FormGroup widths='equal'>
                    <FormField>
                      <Dropdown
                        label={formatMessage({ id: 'addInventory.manufacturer', defaultMessage: 'Manufacturer' })}
                        name='manufacturer'
                        options={searchedManufacturers}
                        inputProps={{
                          'data-test': 'new_inventory_manufacturer_drpdn',
                          size: 'large',
                          minCharacters: 0,
                          icon: 'search',
                          search: true,
                          selection: true,
                          clearable: true,
                          loading: searchedManufacturersLoading,
                          onSearchChange: debounce((e, { searchQuery }) => searchManufacturers(searchQuery), 500)
                        }}
                      />
                    </FormField>
                    <FormField>
                      <Input
                        label={formatMessage({ id: 'global.mfrProductCodes', defaultMessage: 'Manufacturer Product Codes' })}
                        name='mfrProductCodes'
                      />
                    </FormField>
                  </FormGroup>
                    <FormGroup widths='equal'>
                      <FormField>
                        <label><FormattedMessage id='global.unNumber' defaultMessage='UN Number' /></label>
                        <Search isLoading={false}
                                onResultSelect={this.handleUnNumberSelect}
                                onSearchChange={this.handleSearchUnNumber}
                                results={searchedUnNumbers.map(item => {
                                  return {
                                    id: item.id,
                                    title: item.unNumberCode,
                                    description: item.description
                                  }
                                })}
                                defaultValue={getSafe(() => unNumber.unNumberCode, '')}
                                data-test='settings_product_popup_unNumberCode_inp'
                        />
                      </FormField>
                      <FormField data-test='admin_product_popup_unShippingName_inp'>
                        <Input
                          label={formatMessage({ id: 'global.unShippingName', defaultMessage: 'UN Shipping Name' })}
                          type='text'
                          name='unShippingName'
                        />
                      </FormField>
                      <FormField data-test='admin_product_popup_emergencyPhone_inp'>
                        <Input
                          label={formatMessage({ id: 'global.emergencyPhone', defaultMessage: 'Emergency Phone' })}
                          type='number'
                          name='emergencyNumber'
                        />
                      </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                      <Dropdown
                        label={formatMessage({ id: 'global.hazardClass', defaultMessage: 'Hazard Class' })}
                        name='hazardClass'
                        options={hazardClasses}
                        inputProps={{
                          'data-test': 'settings_product_popup_hazardClass_drpdn',
                          multiple: false,
                          selection: true,
                          search: true,
                          clearable: true
                        }}
                      />
                      <Dropdown
                        label={formatMessage({ id: 'global.packagingGroup', defaultMessage: 'Packaging Group' })}
                        name='packagingGroup'
                        options={packagingGroups}
                        inputProps={{ 'data-test': 'settings_product_popup_packagingGroup_drpdn' }}
                      />
                    </FormGroup>
                    <FormGroup widths='equal'>
                      <Dropdown
                        label={formatMessage({ id: 'global.hazardLabels', defaultMessage: 'Hazard Labels' })}
                        name='hazardLabels'
                        options={hazardClasses}
                        inputProps={{
                          'data-test': 'settings_product_popup_hazardClass_drpdn',
                          multiple: true,
                          selection: true,
                          search: true,
                          clearable: true
                        }}
                      />
                    </FormGroup>
                    <FormGroup widths='equal'>
                      <FormField>
                        <Input label={formatMessage({ id: 'admin.sds.revisionNumber', defaultMessage: 'SDS Revision Number' })}
                               name={`revisionNumber`}
                               inputProps={{ type: 'text' }} />
                        <DateInput
                          label={formatMessage({ id: 'admin.sds.revisionDate', defaultMessage: 'SDS Revision Date' })}
                          name='revisionDate'
                          inputProps={{ 'data-test': 'settings_product_popup_expirationDate_dtin' }}
                        />
                      </FormField>
                      <FormField>
                        <label><FormattedMessage id='global.doc' defaultMessage='Document' /></label>
                        <UploadLot {...this.props}
                                   attachments={values.attachments}
                                   edit={this.props.popupValues ? this.props.popupValues.id : ''}
                                   name='attachments'
                                   type={values.attachmentType ? '' + values.attachmentType : 'Unspecified'}
                                   expiration={values.expirationDate ? values.expirationDate + 'T00:00:00Z' : ''}
                                   unspecifiedTypes={['Unspecified']}
                                   fileMaxSize={20}
                                   onChange={(files) => setFieldValue(
                                     `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
                                     {
                                       id: files.id,
                                       name: files.name
                                     }
                                   )}
                                   data-test='settings_product_import_attachments'
                                   emptyContent={(
                                     <label>
                                       <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
                                       <br />
                                       <FormattedMessage id='addInventory.dragDropOr'
                                                         defaultMessage={'or {link} to select from computer'}
                                                         values={{
                                                           link: (
                                                             <a>
                                                               <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                                             </a>
                                                           )
                                                         }} />
                                     </label>
                                   )}
                                   uploadedContent={(
                                     <label>
                                       <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
                                       <br />
                                       <FormattedMessage id='addInventory.dragDropOr'
                                                         defaultMessage={'or {link} to select from computer'}
                                                         values={{
                                                           link: (
                                                             <a>
                                                               <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                                             </a>
                                                           )
                                                         }} />
                                     </label>
                                   )}
                        />
                      </FormField>
                    </FormGroup>
                </Form>
              </Segment>
              <Modal.Actions>
                <Button.Reset data-test='admin_popup_company_cancel_btn' onClick={props.handleReset}>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{text => text}</FormattedMessage>
                  </Button.Reset>
                <Button.Submit data-test='admin_popup_company_save_btn' onClick={props.handleSubmit}>
                  <FormattedMessage id='global.save' defaultMessage='Save'>{text => text}</FormattedMessage>
                  </Button.Submit>
              </Modal.Actions>
            </Modal>
          )
        }}>
      </Formik>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  getDocumentTypes,
  getProductsCatalogRequest,
  prepareSearchedCasProducts,
  searchCasProduct,
  newElementsIndex,
  removeElementsIndex,
  putEchoProduct,
  searchManufacturers
}

const mapStateToProps = ({ admin }) => {
  return {
    ...admin,
    isLoading: false,
    config: admin.config[admin.currentTab.name],
    documentTypes: admin.documentTypes,
    packagingGroups: admin.productsPackagingGroups,
    hazardClasses: admin.productsHazardClasses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(AddNewPopupEchoProduct)))