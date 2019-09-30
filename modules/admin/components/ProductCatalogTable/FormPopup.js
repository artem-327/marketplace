import React from 'react'
import { connect } from 'react-redux'

import { Grid, Form, Modal, Segment, Header, FormGroup, FormField, Search, Label, Icon, Accordion } from 'semantic-ui-react'
import { Formik, FieldArray } from 'formik'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import {
  closePopup, updateCompany, createCompany, getCountries, getPrimaryBranchProvinces, getMailingBranchProvinces,
  getAddressSearchPrimaryBranch, getAddressSearchMailingBranch, removeEmpty, getProductsCatalogRequest,
  searchCasProduct, prepareSearchedCasProducts, getDocumentTypes, newElementsIndex, removeElementsIndex, putEchoProduct,
  postEchoProduct, searchManufacturers, searchUnNumber, loadFile, addAttachment, linkAttachment, removeAttachmentLink,
  removeAttachment
} from '~/modules/admin/actions'
import { addZip, getZipCodes } from '~/modules/zip-dropdown/actions'
import { postCompanyLogo, deleteCompanyLogo } from '~/modules/company-form/actions'
import { Button, Input, Dropdown, TextArea, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { DateInput } from '~/components/custom-formik'
import { PhoneNumber } from '~/modules/phoneNumber'
import * as Yup from 'yup'

import { cloneDeep } from 'lodash'

import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'

import { validationSchema } from '~/modules/company-form/constants'
import { errorMessages } from '~/constants/yupValidation'

import { CompanyForm } from '~/modules/company-form/'
import { AddressForm } from '~/modules/address-form/'
import { addressValidationSchema } from '~/constants/yupValidation'

import { getSafe, generateToastMarkup } from '~/utils/functions'
import { Datagrid } from '~/modules/datagrid'
import debounce from "lodash/debounce"
import escapeRegExp from "lodash/escapeRegExp"
import filter from "lodash/filter"

const AccordionHeader = styled(Header)`
  font-size: 18px;
  font-weight: bolder;
  > i {
    font-weight: bolder;
  }
`


const validationScheme = Yup.object().shape({
  code: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.minLength(2)),
  elements: Yup.array().of(Yup.object().shape({
    name: Yup.string().trim().test('requiredIfProprietary', errorMessages.requiredMessage, function (value) {
      const { proprietary } = this.parent
      if (proprietary) {
        return value != null
      }
      return true
    }),
    casProduct: Yup.string().nullable().trim().test('requiredIfNotProprietary', errorMessages.requiredMessage, function (value) {
      const { proprietary } = this.parent
      if (!proprietary) {
        return parseInt(value)
      }
      return true
    }),
    minAssay: Yup.number().min(0).max(100),
    maxAssay: Yup.number().min(0).max(100)
  })),
  emergencyNumber: Yup.string().min(2, errorMessages.requiredMessage).required(errorMessages.requiredMessage),
  hazardClass: Yup.number(errorMessages.requiredMessage).integer(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
  hazardLabels: Yup.array().of(Yup.number().integer()).required(errorMessages.requiredMessage),
  manufacturer: Yup.number().integer().min(1).required(errorMessages.requiredMessage),
  mfrProductCodes: Yup.array().of(Yup.string().trim()).required(errorMessages.requiredMessage),
  name: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.minLength(2)),
  packagingGroup: Yup.number(errorMessages.requiredMessage).integer(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
  sdsRevisionDate: Yup.string().trim().required(errorMessages.requiredMessage),
  sdsVersionNumber: Yup.string().trim().required(errorMessages.requiredMessage),
  unNumber: Yup.number(errorMessages.requiredMessage).integer(errorMessages.requiredMessage).min(1, errorMessages.minLength(1, errorMessages.requiredMessage)).required(errorMessages.requiredMessage),
  unShippingName: Yup.string().trim().required(errorMessages.requiredMessage)
})

class AddNewPopupEchoProduct extends React.Component {
  state = {
    isLoading: false,
    isUnLoading: false,
    value: '',
    optionalOpened: false,
    unNumberCode: '',
    unNumberShippingName: '',
  }

  componentDidMount() {
    this.props.getProductsCatalogRequest()

    if (getSafe(() => this.props.popupValues.elements.length, false)) {
      this.props.prepareSearchedCasProducts(this.props.popupValues.elements)
    } else {
      this.props.newElementsIndex()
    }

    const unNumber = getSafe(() => this.props.popupValues.unNumber, null)

    this.setState({
      unNumber,
      ...(unNumber && {unNumberCode: unNumber.unNumberCode, unNumberShippingName: unNumber.description})
    })

    this.props.searchManufacturers(getSafe(() => this.props.popupValues.manufacturer.name, ''), 200)

    this.props.getDocumentTypes()
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    let initialValues = {
      attachments: [],
      description: '',
      name: '',
      code: '',
      packagingUnit: '',
      expirationDate: '',
      ...popupValues,
      elements: getSafe(() => popupValues.elements.map(element => ({
        name: getSafe(() => element.displayName, ''),
        casProduct: getSafe(() => element.casProduct.id, null),
        assayMin: element.assayMin,
        assayMax: element.assayMax,
        proprietary: element.proprietary,
      })), [{ casProduct: '', assayMin: 100, assayMax: 100 }]),
      manufacturer: getSafe(() => popupValues.manufacturer.id, ''),
      mfrProductCodes: getSafe(() => popupValues.mfrProductCodes, []),
      unNumber: getSafe(() => popupValues.unNumber.id, ''),
      unShippingName: getSafe(() => popupValues.unNumber.description, ''),
      hazardClass: getSafe(() => popupValues.hazardClass.id, ''),
      hazardLabels: getSafe(() => popupValues.hazardLabels.map(hL => hL.id), []),
      packagingGroup: getSafe(() => popupValues.packagingGroup.id, ''),
      emergencyNumber: ''+getSafe(() => popupValues.emergencyNumber, ''),
      sdsRevisionDate: getSafe(() => popupValues.sdsRevisionDate.substring(0, 10), '')
    }
    if (initialValues.elements.length === 0) {
      initialValues.elements = [{ name: '', casProduct: null, assayMin: 100, assayMax: 100, proprietary: false }]
    }
    return initialValues
  }

  handleOptionalAccordion = () => {
    this.setState({ optionalOpened: !this.state.optionalOpened })
  }

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

  handleSearchUnNumber = debounce((e, { value }) => {
    this.setState({ isUnLoading: true, unNumber: value })

    this.props.searchUnNumber(value)

    setTimeout(() => {
      const re = new RegExp(escapeRegExp(this.state.unNumber), 'i')
      const isMatch = result => re.test(result.unNumberCode)

      this.setState({
        isUnLoading: false,
        unNumbers: filter(this.handleUnNumber(), isMatch)
      })
    }, 300)
  }, 500)

  handleUnNumber = () => {
    return this.props.searchedUnNumbers.map(unNumber => ({
      unNumberCode: unNumber.unNumberCode
    }))
  }

  render() {
    const {
      closePopup,
      popupValues,
      config,
      intl: { formatMessage },
      toastManager,
      isLoading,
      packagingGroups,
      hazardClasses,
      postEchoProduct,
      putEchoProduct,
      searchedManufacturers,
      searchedManufacturersLoading,
      linkAttachment,
      listDocumentTypes
    } = this.props

    const stateUnNumber = this.state.unNumber
    const casProduct = getSafe(() => popupValues.casProduct, null)
    const unNumber = getSafe(() => popupValues.unNumber, null)
    const searchedCasProducts = this.props.searchedCasProducts && this.props.searchedCasProducts.length ? this.props.searchedCasProducts : (casProduct ? [casProduct] : [])
    const searchedUnNumbers = this.props.searchedUnNumbers && this.props.searchedUnNumbers.length ? this.props.searchedUnNumbers : (unNumber ? [unNumber] : [])

    return (
      <Formik
        enableReinitialize
        initialValues={this.getInitialFormValues()}
        validationSchema={validationScheme}
        onSubmit={async (values, actions) => {
          let formValues = {
            ...values,
            code: values.code,
            elements: values.elements.map(element => element.proprietary ? ({
              assayMin: element.assayMin,
              assayMax: element.assayMax,
              name: element.name
            }) : ({
              assayMin: parseInt(element.assayMin),
              assayMax: parseInt(element.assayMax),
              casProduct: parseInt(element.casProduct),
            })),
            emergencyNumber: values.emergencyNumber,
            hazardClass: values.hazardClass,
            hazardLabels: values.hazardLabels,
            manufacturer: values.manufacturer,
            mfrProductCodes: values.mfrProductCodes,
            name: values.name,
            packagingGroup: values.packagingGroup,
            sdsRevisionDate: values.sdsRevisionDate+'T00:00:00.00000Z',
            sdsVersionNumber: values.sdsVersionNumber,
            unNumber: getSafe(() => values.unNumber, null),
            unShippingName: values.unShippingName
          }
          delete formValues.mfrProductCode
          delete formValues.attachments

          try {
            let data = {}
            if (getSafe(() => popupValues.id, false))
              data = await putEchoProduct(popupValues.id, formValues)
            else
              data = await postEchoProduct(formValues)

            let echoProduct = data.value.data
            const notLinkedAttachments = values.attachments.filter(att => !getSafe(() => att.linked, false))
            await linkAttachment(false, echoProduct.id, notLinkedAttachments)

            const docType = listDocumentTypes.find(dt => dt.id === 3)
            notLinkedAttachments.map(att => {
              return {
                id: att.id,
                name: att.name,
                documentType: docType,
                linked: true
              }
            })

            Datagrid.updateRow(echoProduct.id, () => ({
              ...echoProduct,
              attachments: echoProduct.attachments.concat(notLinkedAttachments)
            }))

            const status = popupValues ? 'echoProductUpdated' : 'echoProductCreated'
            toastManager.add(generateToastMarkup(
              <FormattedMessage id={`notifications.${status}.header`}/>,
              <FormattedMessage id={`notifications.${status}.content`} values={{name: values.name}}/>
            ), {
              appearance: 'success'
            })

            actions.setSubmitting(false)
            closePopup()
          } catch (err) {
            actions.setSubmitting(false)
          }
        }}
        onReset={closePopup}
        render={props => {
          let { setFieldValue, values, isSubmitting, errors } = props

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
                                                    options={getSafe(() => searchedCasProducts[index].map(item => {
                                                      return {
                                                        key: item.id,
                                                        id: item.id,
                                                        text: item.casNumber + ' ' + item.chemicalName,
                                                        value: item.id,
                                                        content: <Header content={item.casNumber} subheader={item.chemicalName} style={{ fontSize: '1em' }} />
                                                      }
                                                    }), [])}
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
                                                    defaultValue={getSafe(() => element.casProduct.casNumber, false) ? element.casProduct.casNumber : null}
                                          />
                                        )}
                                      </FormField>
                                      <FormField width={3} data-test='admin_product_popup_assayMin_inp'>
                                        <Input type='number' name={`elements[${index}].assayMin`} />
                                      </FormField>
                                      <FormField width={3} data-test='admin_product_popup_assayMax_inp'>
                                        <Input type='number' name={`elements[${index}].assayMax`} />
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
                                            arrayHelpers.push({ casProduct: null, name: '', assayMin: 0, assayMax: 0, proprietary: false })
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
                      <FormattedMessage id='global.mfrProductCodes' defaultMessage='Manufacturer Product Codes' />
                      <FieldArray name='mfrProductCodes' render={arrayHelpers => (
                        <>
                          {values.mfrProductCodes && values.mfrProductCodes.length ? values.mfrProductCodes.map((mfrProductCode, index) => (
                            <Label>
                              {mfrProductCode}
                              <Icon name='delete' onClick={() => arrayHelpers.remove(index)} />
                            </Label>
                          )) : ''}
                        </>
                      )} />
                    </FormField>
                    <FormField error={errors.mfrProductCodes ? true : false}>
                      <Input
                        icon='tags'
                        iconPosition='left'
                        placeholder='Enter tags'
                        name='mfrProductCode'
                      />
                      <Button onClick={() => {
                        const newTag = values.mfrProductCode
                        let productCodes = values.mfrProductCodes
                        productCodes.push(newTag)
                        setFieldValue('mfrProductCodes', productCodes)
                        setFieldValue('mfrProductCode', '')
                      }}><FormattedMessage id='admin.echoProduct.addCode' defaultMessage='Add Code'>{text => text}</FormattedMessage></Button>
                      {errors.mfrProductCodes ? (
                        <span className='sui-error-message'>{errors.mfrProductCodes}</span>
                      ) : null}
                    </FormField>
                  </FormGroup>
                  <FormGroup widths='equal'>
                    <FormField error={errors.unNumber ? true : false}>
                      <label><FormattedMessage id='global.unNumber' defaultMessage='UN Number' /></label>
                      <Search isLoading={false}
                              onResultSelect={(e, { result }) => {
                                setFieldValue('unNumber', result.value)
                                setFieldValue('unShippingName', result.description)
                                this.setState({unNumberCode: result.title, unNumberShippingName: result.description})
                              }}
                              onSearchChange={(e, d) => {
                                this.setState({unNumberCode: d.value})
                                this.handleSearchUnNumber(e, d)
                              }}
                              /*onBlur={(e, data) => {
                                const searchResults = data.results.filter(unNumber => unNumber.value === values.unNumber)
                                if (!searchResults.length) {
                                  setFieldValue('unNumber', '')
                                }
                              }}*/
                              results={searchedUnNumbers.map(item => {
                                return {
                                  id: item.id,
                                  title: item.unNumberCode,
                                  description: item.description,
                                  value: item.id
                                }
                              })}
                              value={this.state.unNumberCode}
                              data-test='settings_product_popup_unNumberCode_inp'
                      />
                      <Input type='hidden' name='unNumber' inputProps={{ style: { position: 'absolute', top: '-30000px', left: '-30000px' } }} />
                    </FormField>
                    <FormField data-test='admin_product_popup_unShippingName_inp'>
                      <label><FormattedMessage id='global.unShippingName' defaultMessage='UN Shipping Name' /></label>
                      <Search isLoading={false}
                              onResultSelect={(e, { result }) => {
                                setFieldValue('unShippingName', result.title)
                                setFieldValue('unNumber', result.value)
                                this.setState({unNumberCode: result.description, unNumberShippingName: result.title})
                              }}
                              onSearchChange={(e, d) => {
                                this.setState({unNumberShippingName: d.value})
                                this.handleSearchUnNumber(e, d)
                              }}
                              results={searchedUnNumbers.map(item => {
                                return {
                                  id: item.id,
                                  title: item.description,
                                  description: item.unNumberCode,
                                  value: item.id
                                }
                              })}
                              value={this.state.unNumberShippingName}
                              data-test='settings_product_popup_unNumberCode_inp'
                      />
                      <Input type='hidden' name='unShippingName' inputProps={{ style: { position: 'absolute', top: '-30000px', left: '-30000px' } }} />
                    </FormField>
                    <FormField data-test='admin_product_popup_emergencyPhone_inp' error={errors.emergencyNumber ? true : false}>
                      <PhoneNumber
                        label={formatMessage({ id: 'global.emergencyPhone', defaultMessage: 'Emergency Phone' })}
                        name='emergencyNumber'
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                      {errors.emergencyNumber ? (
                        <span className='sui-error-message'>{errors.emergencyNumber}</span>
                      ) : null}
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
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <FormGroup widths='equal'>
                          <FormField error={errors.sdsVersionNumber ? true : false}>
                            <Input type='text' label={formatMessage({ id: 'admin.sds.versionNumber', defaultMessage: 'SDS Version Number' })} name='sdsVersionNumber' />
                          </FormField>
                        </FormGroup>
                        <FormGroup widths='equal'>
                          <FormField>
                            <DateInput
                              label={formatMessage({ id: 'admin.sds.revisionDate', defaultMessage: 'SDS Revision Date' })}
                              name='sdsRevisionDate'
                              inputProps={{ 'data-test': 'settings_product_popup_expirationDate_dtin' }}
                            />
                          </FormField>
                        </FormGroup>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <FormGroup widths='equal'>
                          <FormField>
                            <label><FormattedMessage id='global.doc' defaultMessage='Document' /></label>
                            <UploadLot {...this.props}
                                       attachments={values.attachments}
                                       edit={getSafe(() => popupValues.id, '')}
                                       name='attachments'
                                       type={3}
                                       filesLimit={1}
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
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <Accordion>
                    <Accordion.Title active={this.state.optionalOpened} onClick={this.handleOptionalAccordion} name='optionalValues' data-test='admin_popup_product_accordion_optional'>
                      <AccordionHeader as='h4'>
                        <Icon color={this.state.optionalOpened && 'blue'} name={this.state.optionalOpened ? 'chevron down' : 'chevron right'} />
                        <FormattedMessage id='global.optional' defaultMessage='Optional' />
                      </AccordionHeader>
                    </Accordion.Title>
                    <Accordion.Content active={this.state.optionalOpened}>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.appearance', defaultMessage: 'Appearance' })}
                                 name='appearance'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.aspirationHazard', defaultMessage: 'Aspiration Hazard' })}
                                 name='aspirationHazard'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.autoIgnitionTemperature', defaultMessage: 'Auto Ignition Temperature' })}
                                 name='autoIgnitionTemperature'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.boilingPointRange', defaultMessage: 'Boiling Point Range' })}
                                 name='boilingPointRange'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.chronicHealthHazard', defaultMessage: 'Chronic Health Hazard' })}
                                 name='chronicHealthHazard'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.conditionsToAvoid', defaultMessage: 'Conditions to Avoid' })}
                                 name='conditionsToAvoid'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.decompositionTemperature', defaultMessage: 'Decomposition Temperature' })}
                                 name='decompositionTemperature'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.developmentalEffects', defaultMessage: 'Developmental Effects' })}
                                 name='developmentalEffects'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.dotHazardClass', defaultMessage: 'Dot Hazard Class' })}
                                 name='dotHazardClass'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.dotMarinePollutant', defaultMessage: 'Dot Marine Pollutant' })}
                                 name='dotMarinePollutant'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.dotProperShippingName', defaultMessage: 'Dot Proper Shipping Name' })}
                                 name='dotProperShippingName'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.dotProperTechnicalName', defaultMessage: 'Dot Proper Technical Name' })}
                                 name='dotProperTechnicalName'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.dotReportableQuantity', defaultMessage: 'Dot Reportable Quantity' })}
                                 name='dotReportableQuantity'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.dotSevereMarinePollutant', defaultMessage: 'Dot Severe Marine Pollutant' })}
                                 name='dotSevereMarinePollutant'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.dotUnNumber', defaultMessage: 'Dot UN Number' })}
                                 name='dotUnNumber'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.endocrineDisruptorInformation', defaultMessage: 'Endocrine Disruptor Information' })}
                                 name='endocrineDisruptorInformation'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.evaporationPoint', defaultMessage: 'Evaporation Point' })}
                                 name='evaporationPoint'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.eyeContact', defaultMessage: 'Eye Contact' })}
                                 name='eyeContact'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.flashPoint', defaultMessage: 'Flash Point' })}
                                 name='flashPoint'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.fireHazard', defaultMessage: 'Fire Hazard' })}
                                 name='fireHazard'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.flammability', defaultMessage: 'Flammability' })}
                                 name='flammability'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.flammabilityOrExplosiveLower', defaultMessage: 'Flammability or Explosive Lower' })}
                                 name='flammabilityOrExplosiveLower'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.flammabilityOrExplosiveUpper', defaultMessage: 'Flammability or Explosive Upper' })}
                                 name='flammabilityOrExplosiveUpper'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.flammabilitySolidGas', defaultMessage: 'Flammability Solid Gas' })}
                                 name='flammabilitySolidGas'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.generalAdvice', defaultMessage: 'General Advice' })}
                                 name='generalAdvice'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.healthHazard', defaultMessage: 'Health Hazard' })}
                                 name='healthHazard'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.hazardStatement', defaultMessage: 'Hazard Statement' })}
                                 name='hazardStatement'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.hazardousDecompositionProducts', defaultMessage: 'Hazardous Decomposition Products' })}
                                 name='hazardousDecompositionProducts'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.hazardousPolymerization', defaultMessage: 'Hazardous Polymerization' })}
                                 name='hazardousPolymerization'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.hazardousReactions', defaultMessage: 'Hazardous Reactions' })}
                                 name='hazardousReactions'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.hmis', defaultMessage: 'HMIS' })}
                                 name='hmis'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.hnoc', defaultMessage: 'HNOC' })}
                                 name='hnoc'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.iataHazardClass', defaultMessage: 'IATA Hazard Class' })}
                                 name='iataHazardClass'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.iataProperShippingName', defaultMessage: 'IATA Proper Shipping Name' })}
                                 name='iataProperShippingName'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.iataProperTechnicalName', defaultMessage: 'IATA Proper Technical Name' })}
                                 name='iataProperTechnicalName'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.iataUnNumber', defaultMessage: 'IATA UN Number' })}
                                 name='iataUnNumber'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.imdgImoHazardClass', defaultMessage: 'IMDG IMO Hazard Class' })}
                                 name='imdgImoHazardClass'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.imdgImoProperShippingName', defaultMessage: 'IMDG IMO Proper Shipping Name' })}
                                 name='imdgImoProperShippingName'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.imdgImoProperTechnicalName', defaultMessage: 'IMDG IMO Proper Technical Name' })}
                                 name='imdgImoProperTechnicalName'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.imdgImoUnNumber', defaultMessage: 'IMDG IMO UN Number' })}
                                 name='imdgImoUnNumber'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.incompatibleMaterials', defaultMessage: 'Incompatible Materials' })}
                                 name='incompatibleMaterials'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.ingestion', defaultMessage: 'Ingestion' })}
                                 name='ingestion'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.inhalation', defaultMessage: 'Inhalation' })}
                                 name='inhalation'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.irritation', defaultMessage: 'Irritation' })}
                                 name='irritation'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.labelElements', defaultMessage: 'Label Elements' })}
                                 name='labelElements'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.meltingPointRange', defaultMessage: 'Melting Point Range' })}
                                 name='meltingPointRange'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.mexicoGrade', defaultMessage: 'Mexico Grade' })}
                                 name='mexicoGrade'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.molecularFormula', defaultMessage: 'Molecular Formula' })}
                                 name='molecularFormula'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.molecularWeight', defaultMessage: 'Molecular Weight' })}
                                 name='molecularWeight'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.mostImportantSymptomsAndEffects', defaultMessage: 'Most Important Symptoms and Effects' })}
                                 name='mostImportantSymptomsAndEffects'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.mutagenicEffects', defaultMessage: 'Mutagenic Effects' })}
                                 name='mutagenicEffects'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.nfpa', defaultMessage: 'NFPA' })}
                                 name='nfpa'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.notesToPhysician', defaultMessage: 'Notes to Physician' })}
                                 name='notesToPhysician'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.odor', defaultMessage: 'Odor' })}
                                 name='odor'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.odorThreshold', defaultMessage: 'Odor Threshold' })}
                                 name='odorThreshold'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.oshaDefinedHazards', defaultMessage: 'OSHA Defined Hazards' })}
                                 name='oshaDefinedHazards'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.otherAdverseEffects', defaultMessage: 'Other Adverse Effects' })}
                                 name='otherAdverseEffects'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.partitionCoefficient', defaultMessage: 'Partition Coefficient' })}
                                 name='partitionCoefficient'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.ph', defaultMessage: 'pH' })}
                                 name='ph'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.physicalHazard', defaultMessage: 'Physical Hazard' })}
                                 name='physicalHazard'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.physicalState', defaultMessage: 'Physical State' })}
                                 name='physicalState'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.precautionaryStatements', defaultMessage: 'Precautionary Statements' })}
                                 name='precautionaryStatements'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.productLc50Inhalation', defaultMessage: 'Product LC50 Inhalation' })}
                                 name='productLc50Inhalation'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.productLd50Dermal', defaultMessage: 'Product LD50 Dermal' })}
                                 name='productLd50Dermal'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.productLd50Oral', defaultMessage: 'Product LD50 Oral' })}
                                 name='productLd50Oral'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.reactiveHazard', defaultMessage: 'Reactive Hazard' })}
                                 name='reactiveHazard'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.reactivityHazard', defaultMessage: 'Reactivity Hazard' })}
                                 name='reactivityHazard'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.recommendedUse', defaultMessage: 'Recommended Use' })}
                                 name='recommendedUse'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.reproductiveEffects', defaultMessage: 'Reproductive Effects' })}
                                 name='reproductiveEffects'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.sdsIssueDate', defaultMessage: 'SDS Issue Date' })}
                                 name='sdsIssueDate'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.sdsPreparedBy', defaultMessage: 'SDS Prepared by' })}
                                 name='sdsPreparedBy'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.sensitization', defaultMessage: 'Sensitization' })}
                                 name='sensitization'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.signalWord', defaultMessage: 'Signal Word' })}
                                 name='signalWord'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.skinContact', defaultMessage: 'Skin Contact' })}
                                 name='skinContact'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.solubility', defaultMessage: 'Solubility' })}
                                 name='solubility'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.specialHazard', defaultMessage: 'Special Hazard' })}
                                 name='specialHazard'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.specificGravity', defaultMessage: 'Specific Gravity' })}
                                 name='specificGravity'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.stability', defaultMessage: 'Stability' })}
                                 name='stability'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.stotRepeatedExposure', defaultMessage: 'STOT Repeated Exposure' })}
                                 name='stotRepeatedExposure'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.stotSingleExposure', defaultMessage: 'STOT Single Exposure' })}
                                 name='stotSingleExposure'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.supplementalInformation', defaultMessage: 'Supplemental Information' })}
                                 name='supplementalInformation'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.symptomsEffects', defaultMessage: 'Symptoms Effects' })}
                                 name='symptomsEffects'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.tdgHazardClass', defaultMessage: 'TDG Hazard Class' })}
                                 name='tdgHazardClass'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.tdgProperShippingName', defaultMessage: 'TDG Proper Shipping Name' })}
                                 name='tdgProperShippingName'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.tdgProperTechnicalName', defaultMessage: 'TDG Proper Technical Name' })}
                                 name='tdgProperTechnicalName'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.tdgUnNumber', defaultMessage: 'TDG UN Number' })}
                                 name='tdgUnNumber'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.teratogenicity', defaultMessage: 'Teratogenicity' })}
                                 name='teratogenicity'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.usesAdvisedAgainst', defaultMessage: 'Uses Advised against' })}
                                 name='usesAdvisedAgainst'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.vaporDensity', defaultMessage: 'Vapor Density' })}
                                 name='vaporDensity'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.vaporPressure', defaultMessage: 'Vapor Pressure' })}
                                 name='vaporPressure'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                      <FormGroup widths='equal'>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.viscosity', defaultMessage: 'Viscosity' })}
                                 name='viscosity'
                                 type='text' />
                        </FormField>
                        <FormField>
                          <Input label={formatMessage({ id: 'global.wasteDisposalMethods', defaultMessage: 'Waste Disposal Methods' })}
                                 name='wasteDisposalMethods'
                                 type='text' />
                        </FormField>
                      </FormGroup>
                    </Accordion.Content>
                  </Accordion>
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
  loadFile,
  addAttachment,
  linkAttachment,
  removeAttachment,
  removeAttachmentLink,
  closePopup,
  getDocumentTypes,
  getProductsCatalogRequest,
  prepareSearchedCasProducts,
  searchCasProduct,
  newElementsIndex,
  removeElementsIndex,
  putEchoProduct,
  postEchoProduct,
  searchManufacturers,
  searchUnNumber
}

const mapStateToProps = ({ admin }) => {
  return {
    ...admin,
    isLoading: false,
    config: admin.config[admin.currentTab.name],
    listDocumentTypes: admin.documentTypes,
    packagingGroups: admin.productsPackagingGroups,
    hazardClasses: admin.productsHazardClasses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(AddNewPopupEchoProduct)))