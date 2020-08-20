import React from 'react'
import { connect } from 'react-redux'

import { Form, FormGroup, Divider, Accordion, Icon, Header, Loader, Dimmer } from 'semantic-ui-react'
import { Formik } from 'formik'
import {
  closePopup,
  updateCompany,
  createCompany,
  getCountries,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  getAddressSearchPrimaryBranch,
  getAddressSearchMailingBranch,
  removeEmpty
} from '~/modules/companies/actions'
import { addZip, getZipCodes } from '~/modules/zip-dropdown/actions'
import { postCompanyLogo, deleteCompanyLogo } from '~/modules/company-form/actions'
import { Input, Button, Checkbox, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
// debug purposes only
// import JSONPretty from 'react-json-pretty'

import { cloneDeep } from 'lodash'

import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { validationSchema } from '~/modules/company-form/constants'
import { provinceObjectRequired, errorMessages, minOrZeroLength } from '~/constants/yupValidation'

import { CompanyForm } from '~/modules/company-form/'
import { AddressForm } from '~/modules/address-form/'
import { addressValidationSchema, phoneValidation, websiteValidationNotRequired } from '~/constants/yupValidation'

import { getSafe, deepSearch } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { BottomButtons } from '../../constants'

import { FlexSidebar, FlexContent, HighSegment, LabeledRow } from '~/modules/admin/constants/layout'
import ErrorFocus from '~/components/error-focus'

const AccordionHeader = styled(Header)`
  font-size: 18px;
  font-weight: bolder;
  > i {
    font-weight: bolder;
  }
`

const initialFormValues = {
  name: '',
  enabled: false,
  phone: '',
  purchaseHazmatEligible: false,
  businessType: {
    id: null
  },
  website: '',
  primaryUser: {
    name: '',
    email: '',
    jobTitle: '',
    phone: ''
  },
  primaryBranch: {
    deliveryAddress: {
      addressName: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      address: {
        streetAddress: '',
        country: '',
        province: '',
        city: '',
        zip: ''
      }
    },
    warehouse: false
  },
  mailingBranch: {
    deliveryAddress: {
      addressName: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      address: {
        streetAddress: '',
        country: '',
        province: '',
        city: '',
        zip: ''
      }
    },
    warehouse: false
  }
}

class AddEditCompanySidebar extends React.Component {
  state = {
    primaryBranchHasProvinces: false,
    mailingBranchHasProvinces: false,
    primaryBranchProvinceValidation: Yup.mixed().notRequired(),
    mailingBranchProvinceValidation: Yup.mixed().notRequired(),
    accordionActive: {
      companyAdmin: true,
      billingAddress: true,
      mailingAddress: false
    },
    companyLogo: null
  }

  // componentDidMount() {
  //   this.props.getCountries()
  // }

  formValidationNew = () =>
    Yup.lazy(values => {
      // let primaryUserRequired = values.primaryUser.email !== '' || values.primaryUser.name !== ''
      // let mailingBranchRequired = values.mailingBranch.name.trim() !== '' || values.mailingBranch.contactEmail.trim() !== '' ||
      //   values.mailingBranch.contactName.trim() !== '' || values.mailingBranch.contactPhone.trim() !== '' ||
      //   values.mailingBranch.address.streetAddress.trim() !== '' || values.mailingBranch.address.city.trim() !== '' ||
      //   values.mailingBranch.address.zip !== '' || values.mailingBranch.address.country !== ''
      let mailingBranchRequired = getSafe(() => values.mailingBranch.deliveryAddress, false)
        ? deepSearch(values.mailingBranch.deliveryAddress, val => val !== '')
        : ''

      let minLength = errorMessages.minLength(2)

      let validation = Yup.object().shape({
        name: Yup.string().trim().min(2, minLength).required(minLength),
        website: websiteValidationNotRequired(),
        phone: phoneValidation(),

        mailingBranch: Yup.lazy(() => {
          if (mailingBranchRequired)
            return Yup.object().shape({
              deliveryAddress: Yup.object().shape({
                addressName: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
                contactEmail: Yup.string()
                  .trim()
                  .email(errorMessages.invalidEmail)
                  .required(errorMessages.invalidEmail),
                contactName: Yup.string().trim().min(2, minLength).required(minLength),
                contactPhone: phoneValidation().concat(Yup.string().required(errorMessages.requiredMessage)),
                address: addressValidationSchema()
              })
            })
          return Yup.mixed().notRequired()
        }),

        primaryBranch: Yup.object().shape({
          deliveryAddress: Yup.object().shape({
            addressName: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
            contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
            contactName: Yup.string().trim().min(2, minLength).required(minLength),
            contactPhone: phoneValidation().concat(Yup.string().required(errorMessages.requiredMessage)),
            address: addressValidationSchema()
          })
        }),
        primaryUser: Yup.lazy(() => {
          // if (primaryUserRequired)
          return Yup.object().shape({
            email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
            name: Yup.string().trim().min(2, minLength).required(minLength),
            phone: phoneValidation()
          })
          // return Yup.mixed().notRequired()
        })
      })

      return validation
    })

  handlePrimaryBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value)
    if (country.hasProvinces) {
      this.props.getPrimaryBranchProvinces(country.id)
    }
    this.setState({
      primaryBranchHasProvinces: country.hasProvinces,
      primaryBranchProvinceValidation: provinceObjectRequired(country.hasProvinces)
    })
  }

  handleMailingBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value)
    if (country.hasProvinces) {
      this.props.getMailingBranchProvinces(country.id)
    }
    this.setState({
      mailingBranchHasProvinces: country.hasProvinces,
      mailingBranchProvinceValidation: provinceObjectRequired(country.hasProvinces)
    })
  }

  handleAccordionChange = (e, { name }) => {
    let { accordionActive } = this.state
    accordionActive[name] = !accordionActive[name]
    this.setState({ accordionActive })
  }

  // handleAddressSelectPrimaryBranch = (d, values, setFieldValue) => {
  //   const i = this.props.AddressSuggestPrimaryBranchOptions.indexOf(d.value)
  //   if (i >= 0) {
  //     setFieldValue('primaryBranch.address.streetAddress', this.props.AddressSuggestPrimaryBranchData[i].streetAddress)
  //     setFieldValue('primaryBranch.address.city', this.props.AddressSuggestPrimaryBranchData[i].city)
  //     setFieldValue('primaryBranch.address.zip', this.props.AddressSuggestPrimaryBranchData[i].zip && this.props.AddressSuggestPrimaryBranchData[i].zip.zip)
  //     setFieldValue('primaryBranch.address.country', this.props.AddressSuggestPrimaryBranchData[i].country.id)
  //     setFieldValue('primaryBranch.address.province', this.props.AddressSuggestPrimaryBranchData[i].province ? this.props.AddressSuggestPrimaryBranchData[i].province.id : '')
  //     this.setState({ primaryBranchHasProvinces: this.props.AddressSuggestPrimaryBranchData[i].country.hasProvinces })
  //     if (this.props.AddressSuggestPrimaryBranchData[i].country.hasProvinces) this.props.getPrimaryBranchProvinces(this.props.AddressSuggestPrimaryBranchData[i].country.id)
  //   }
  //   else {
  //     let newValues = { ...values.primaryBranch.address, [d.name.split('.')[2]]: d.value }

  //     const body = {
  //       city: newValues.city,
  //       countryId: newValues.country,
  //       provinceId: newValues.province,
  //       streetAddress: newValues.streetAddress,
  //       zip: newValues.zip
  //     }
  //     removeEmpty(body)
  //     if (Object.entries(body).length === 0) return
  //     this.props.getAddressSearchPrimaryBranch(body)
  //   }
  // }

  // handleAddressSelectMailingBranch = (d, values, setFieldValue) => {
  //   const i = this.props.AddressSuggestMailingBranchOptions.indexOf(d.value)

  //   if (i >= 0) {
  //     setFieldValue('mailingBranch.address.streetAddress', this.props.AddressSuggestMailingBranchData[i].streetAddress)
  //     setFieldValue('mailingBranch.address.city', this.props.AddressSuggestMailingBranchData[i].city)
  //     setFieldValue('mailingBranch.address.zip', this.props.AddressSuggestMailingBranchData[i].zip && this.props.AddressSuggestMailingBranchData[i].zip.zip)
  //     setFieldValue('mailingBranch.address.country', this.props.AddressSuggestMailingBranchData[i].country.id)
  //     setFieldValue('mailingBranch.address.province', this.props.AddressSuggestMailingBranchData[i].province ? this.props.AddressSuggestMailingBranchData[i].province.id : '')
  //     this.setState({ MailingBranchHasProvinces: this.props.AddressSuggestMailingBranchData[i].country.hasProvinces })
  //     if (this.props.AddressSuggestMailingBranchData[i].country.hasProvinces) this.props.getMailingBranchProvinces(this.props.AddressSuggestMailingBranchData[i].country.id)
  //   }
  //   else {
  //     let newValues = { ...values.mailingBranch.address, [d.name.split('.')[2]]: d.value }

  //     const body = {
  //       city: newValues.city,
  //       countryId: newValues.country,
  //       provinceId: newValues.province,
  //       streetAddress: newValues.streetAddress,
  //       zip: newValues.zip
  //     }
  //     removeEmpty(body)
  //     if (Object.entries(body).length === 0) return
  //     this.props.getAddressSearchMailingBranch(body)
  //   }
  // }

  selectLogo = (logo, isNew = true) => {
    this.setState({ companyLogo: logo, shouldUpdateLogo: isNew })
  }

  removeLogo = () => {
    this.setState({ companyLogo: null, shouldUpdateLogo: true })
  }

  render() {
    const {
      closePopup,
      popupValues,
      updateCompany,
      createCompany,
      // countriesDropDown,
      // primaryBranchProvinces,
      // mailingBranchProvinces,
      intl,
      // AddressSuggestPrimaryBranchInput,
      // AddressSuggestMailingBranchInput,
      postCompanyLogo,
      deleteCompanyLogo,
      datagrid
    } = this.props

    const { selectLogo, removeLogo } = this

    let { accordionActive, companyLogo } = this.state

    const { formatMessage } = intl
    // const {
    //   initialState,
    //   primaryBranchHasProvinces,
    //   mailingBranchHasProvinces
    // } = this.state

    return (
      <Formik
        enableReinitialize
        initialValues={popupValues ? popupValues : initialFormValues}
        validationSchema={popupValues ? validationSchema : this.formValidationNew()}
        onSubmit={async (values, actions) => {
          try {
            if (popupValues) {
              let newAssociations = []
              if (getSafe(() => values.associations[0].id, false)) {
                newAssociations = values.associations.map(assoc => assoc.id)
              } else {
                newAssociations = getSafe(() => values.associations, [])
              }
              let newValues = {
                associations: newAssociations,
                businessType: getSafe(() => values.businessType.id, null),
                cin: getSafe(() => values.cin, ''),
                dba: getSafe(() => values.dba, ''),
                dunsNumber: getSafe(() => values.dunsNumber, ''),
                enabled: getSafe(() => values.enabled, false),
                name: getSafe(() => values.name, ''),
                phone: getSafe(() => values.phone, ''),
                tin: getSafe(() => values.tin, ''),
                website: getSafe(() => values.website, ''),
                purchaseHazmatEligible: getSafe(() => values.purchaseHazmatEligible, false)
              }

              const data = await updateCompany(popupValues.id, newValues)
              if (this.state.shouldUpdateLogo) {
                if (this.state.companyLogo) postCompanyLogo(data.id, companyLogo)
                else deleteCompanyLogo(popupValues.id)
              }
              datagrid.updateRow(data.id, () => ({ ...data, hasLogo: !!this.state.companyLogo }))
            } else {
              if (
                !getSafe(() => values.primaryBranch.deliveryAddress, '') ||
                !deepSearch(
                  getSafe(() => values.mailingBranch.deliveryAddress, ''),
                  val => val !== ''
                )
              ) {
                delete values['mailingBranch']
              } else {
                if (values.mailingBranch.deliveryAddress.contactEmail !== '')
                  values.mailingBranch.deliveryAddress.contactEmail = values.mailingBranch.deliveryAddress.contactEmail.trim()
              }

              let branches = ['primaryBranch', 'mailingBranch']

              if (values.businessType) values.businessType = values.businessType.id

              let payload = cloneDeep(values)
              payload.primaryUser.email = payload.primaryUser.email.trim()
              payload.primaryBranch.deliveryAddress.contactEmail = payload.primaryBranch.deliveryAddress.contactEmail.trim()

              branches.forEach(branch => {
                let country = getSafe(() => JSON.parse(payload[branch].deliveryAddress.address.country).countryId)
                if (country) payload[branch].deliveryAddress.address.country = country
              })

              if (!payload.businessType) delete payload.businessType
              if (this.state.companyLogo) {
                let reader = new FileReader()
                reader.onload = async function () {
                  const loadedLogo = btoa(reader.result)
                  const data = await createCompany(payload)
                  await postCompanyLogo(data.id, companyLogo)

                  datagrid.clear()
                  datagrid.loadData()
                }
                reader.readAsBinaryString(this.state.companyLogo)
              } else {
                await createCompany(payload)

                datagrid.clear()
                datagrid.loadData()
              }
            }
          } catch (err) {
            console.error(err)
          } finally {
            actions.setSubmitting(false)
          }
        }}
        onReset={closePopup}
        render={props => {
          let { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = props
          let colorIcon = accordionActive.companyAdmin && 'blue'
          let mailingBranchRequired = getSafe(() => values.mailingBranch.deliveryAddress, false)
            ? deepSearch(values.mailingBranch.deliveryAddress, val => val !== '')
            : ''
          return (
            <Form>
              <FlexSidebar
                visible={true}
                width='very wide'
                style={{ width: '630px' }}
                direction='right'
                animation='overlay'>
                <Dimmer inverted active={isSubmitting}>
                  <Loader />
                </Dimmer>
                <HighSegment basic>
                  <FormattedMessage id={`global.${popupValues ? 'edit' : 'add'}`} />
                </HighSegment>
                <FlexContent>
                  <Accordion exclusive={false}>
                    <CompanyForm
                      admin={true}
                      selectLogo={selectLogo}
                      removeLogo={removeLogo}
                      companyLogo={companyLogo}
                      values={values}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      errors={errors}
                      touched={touched}
                      isSubmitting={isSubmitting}
                      companyId={popupValues ? popupValues.id : null}
                      hasLogo={popupValues ? popupValues.hasLogo : false}
                    />
                    {!popupValues && (
                      <>
                        <Divider />
                        <Accordion.Title
                          active={accordionActive.companyAdmin}
                          onClick={this.handleAccordionChange}
                          name='companyAdmin'
                          data-test='admin_popup_company_accordion_companyAdmin'>
                          <AccordionHeader as='h4'>
                            <Icon
                              color={colorIcon}
                              name={accordionActive.companyAdmin ? 'chevron down' : 'chevron right'}
                            />
                            <FormattedMessage id='global.companyAdmin' defaultMessage='Company Admin (Primary User)' />
                          </AccordionHeader>
                        </Accordion.Title>
                        <Accordion.Content active={accordionActive.companyAdmin}>
                          <FormGroup widths='equal' data-test='admin_popup_company_primaryUserNameEmail_inp'>
                            <Input
                              label={
                                <>
                                  <FormattedMessage id='global.name' defaultMessage='Name' />
                                  <Required />
                                </>
                              }
                              name='primaryUser.name'
                            />
                            <Input
                              label={
                                <>
                                  <FormattedMessage id='global.email' defaultMessage='Email' />
                                  <Required />
                                </>
                              }
                              name='primaryUser.email'
                            />
                          </FormGroup>
                          <FormGroup widths='equal' data-test='admin_popup_company_primaryUserTitlePhone_inp'>
                            <Input
                              label={<FormattedMessage id='global.jobTitle' defaultMessage='Job Title' />}
                              name='primaryUser.jobTitle'
                            />
                            <PhoneNumber
                              label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
                              name='primaryUser.phone'
                              values={values}
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                              errors={errors}
                              touched={touched}
                              isSubmitting={isSubmitting}
                            />
                          </FormGroup>
                        </Accordion.Content>
                        {/* {AddressSuggestPrimaryBranchInput}
                        {AddressSuggestMailingBranchInput} */}
                        <Divider />
                        <Accordion.Title
                          active={accordionActive.billingAddress}
                          onClick={this.handleAccordionChange}
                          name='billingAddress'
                          data-test='admin_popup_company_accordion_primaryBranch'>
                          <AccordionHeader as='h4'>
                            <Icon
                              color={colorIcon}
                              name={accordionActive.billingAddress ? 'chevron down' : 'chevron right'}
                            />
                            <FormattedMessage
                              id='global.primaryBranch'
                              defaultMessage='Primary Branch (Billing Address)'
                            />
                          </AccordionHeader>
                        </Accordion.Title>
                        <Accordion.Content active={accordionActive.billingAddress}>
                          <FormGroup widths='equal' data-test='admin_popup_company_primaryBranchName_inp'>
                            <Input
                              label={
                                <>
                                  <FormattedMessage id='global.name' defaultMessage='Name' />
                                  <Required />
                                </>
                              }
                              name='primaryBranch.deliveryAddress.addressName'
                            />
                          </FormGroup>
                          <FormGroup widths='equal' data-test='admin_popup_company_primaryBranchNameEmailPhone_inp'>
                            <Input
                              inputProps={{ fluid: true }}
                              label={
                                <>
                                  <FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name' />
                                  <Required />
                                </>
                              }
                              name='primaryBranch.deliveryAddress.contactName'
                            />
                            <PhoneNumber
                              label={
                                <>
                                  <FormattedMessage id='addCompany.contactPhone' defaultMessage='Contact Phone' />
                                  <Required />
                                </>
                              }
                              name='primaryBranch.deliveryAddress.contactPhone'
                              values={values}
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                              errors={errors}
                              touched={touched}
                              isSubmitting={isSubmitting}
                            />
                          </FormGroup>
                          <FormGroup widths='equal' data-test='admin_popup_company_primaryBranchNameEmailPhone_inp'>
                            <Input
                              inputProps={{ fluid: true }}
                              label={
                                <>
                                  <FormattedMessage id='addCompany.contactEmail' defaultMessage='Contact email' />
                                  <Required />
                                </>
                              }
                              name='primaryBranch.deliveryAddress.contactEmail'
                            />
                          </FormGroup>
                          <AddressForm
                            values={values}
                            setFieldValue={setFieldValue}
                            prefix='primaryBranch.deliveryAddress'
                            required={true}
                          />
                          <FormGroup widths='equal'>
                            <Checkbox
                              label={formatMessage({
                                id: 'admin.createWarehouseWith',
                                defaultMessage: 'Create Warehouse with same parameters'
                              })}
                              name='primaryBranch.warehouse'
                              inputProps={{ 'data-test': 'admin_popup_company_primaryBranch_warehouse_chckb' }}
                            />
                          </FormGroup>
                        </Accordion.Content>
                        <Divider />

                        <Accordion.Title
                          active={accordionActive.mailingAddress}
                          onClick={this.handleAccordionChange}
                          name='mailingAddress'
                          data-test='admin_popup_company_accordion_mailingBranch'>
                          <AccordionHeader as='h4'>
                            <Icon
                              color={colorIcon}
                              name={accordionActive.mailingAddress ? 'chevron down' : 'chevron right'}
                            />
                            <FormattedMessage id='global.mailingBranch' defaultMessage='Mailing Branch (optional)' />
                          </AccordionHeader>
                        </Accordion.Title>
                        <Accordion.Content active={accordionActive.mailingAddress}>
                          <FormGroup widths='equal' data-test='admin_popup_company_mailingBranchNameEmailPhone_inp'>
                            <Input
                              label={<FormattedMessage id='global.name' defaultMessage='Name' />}
                              name='mailingBranch.deliveryAddress.addressName'
                            />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <Input
                              inputProps={{ fluid: true }}
                              label={
                                <>
                                  <FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name' />
                                  {mailingBranchRequired && <Required />}
                                </>
                              }
                              name='mailingBranch.deliveryAddress.contactName'
                            />
                            <PhoneNumber
                              label={
                                <>
                                  <FormattedMessage id='addCompany.contactPhone' defaultMessage='Contact Phone' />
                                  {mailingBranchRequired && <Required />}
                                </>
                              }
                              name='mailingBranch.deliveryAddress.contactPhone'
                              values={values}
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                              errors={errors}
                              touched={touched}
                              isSubmitting={isSubmitting}
                            />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <Input
                              inputProps={{ fluid: true }}
                              label={
                                <>
                                  <FormattedMessage id='addCompany.contactEmail' defaultMessage='Contact Email' />
                                  {mailingBranchRequired && <Required />}
                                </>
                              }
                              name='mailingBranch.deliveryAddress.contactEmail'
                            />
                          </FormGroup>
                          <AddressForm
                            values={values}
                            setFieldValue={setFieldValue}
                            prefix='mailingBranch.deliveryAddress'
                            datalistName='mailingAddresses.deliveryAddress'
                            required={mailingBranchRequired}
                          />
                          <FormGroup widths='equal'>
                            <Checkbox
                              label={formatMessage({
                                id: 'admin.createWarehouseWith',
                                defaultMessage: 'Create Warehouse with same parameters'
                              })}
                              name='mailingBranch.warehouse'
                              inputProps={{ 'data-test': 'admin_popup_company_mailingBranch_warehouse_chckb' }}
                            />
                          </FormGroup>
                        </Accordion.Content>
                      </>
                    )}
                  </Accordion>
                </FlexContent>
                <BottomButtons>
                  <div>
                    <Button.Reset data-test='admin_popup_company_cancel_btn' onClick={props.handleReset}>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='admin_popup_company_save_btn' onClick={props.handleSubmit}>
                      <FormattedMessage id='global.save' defaultMessage='Save'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Submit>
                  </div>
                </BottomButtons>
              </FlexSidebar>
              <ErrorFocus />
            </Form>
          )
        }}></Formik>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  updateCompany,
  createCompany,
  getCountries,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  addZip,
  getZipCodes,
  getAddressSearchPrimaryBranch,
  getAddressSearchMailingBranch,
  postCompanyLogo,
  deleteCompanyLogo
}

const mapStateToProps = ({ companiesAdmin, zip }) => {
  const popupValues = companiesAdmin.popupValues
  return {
    ...companiesAdmin,
    popupValues,
    zip
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddEditCompanySidebar)))
