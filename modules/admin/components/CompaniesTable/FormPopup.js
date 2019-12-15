import React from 'react'
import { connect } from 'react-redux'

import { Form, Modal, FormGroup, Divider, Accordion, Icon, Segment, Header } from 'semantic-ui-react'
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
} from '~/modules/admin/actions'
import { addZip, getZipCodes } from '~/modules/zip-dropdown/actions'
import { postCompanyLogo, deleteCompanyLogo } from '~/modules/company-form/actions'
import { Input, Button, Checkbox, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
// import { ZipDropdown } from '~/modules/zip-dropdown'
// debug purposes only
// import JSONPretty from 'react-json-pretty'

import { cloneDeep } from 'lodash'

import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'

import { validationSchema } from '~/modules/company-form/constants'
import { provinceObjectRequired, errorMessages, minOrZeroLength } from '~/constants/yupValidation'

import { CompanyForm } from '~/modules/company-form/'
import { AddressForm } from '~/modules/address-form/'
import { addressValidationSchema, phoneValidation, websiteValidation } from '~/constants/yupValidation'

import { getSafe, generateToastMarkup, deepSearch } from '~/utils/functions'
import { Datagrid } from '~/modules/datagrid'
import { PhoneNumber } from '~/modules/phoneNumber'

const AccordionHeader = styled(Header)`
  font-size: 18px;
  font-weight: bolder;
  > i {
    font-weight: bolder;
  }
`

const initialFormValues = {
  name: '',
  nacdMember: true,
  phone: '',
  businessType: {
    id: null
  },
  website: '',
  mailingBranch: {
    deliveryAddress: {
      addressName: '',
      accessorials: [],
      address: {
        city: '',
        country: '',
        province: '',
        streetAddress: '',
        zip: ''
      },
      contactEmail: '',
      contactName: '',
      contactPhone: ''
    },
    warehouse: true
  },
  primaryBranch: {
    deliveryAddress: {
      addressName: '',
      accessorials: [],
      address: {
        city: '',
        country: '',
        province: '',
        streetAddress: '',
        zip: ''
      },
      contactEmail: '',
      contactName: '',
      contactPhone: ''
    },
    warehouse: true
  },
  primaryUser: {
    email: '',
    name: ''
  }
}

class AddNewPopupCasProducts extends React.Component {
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
      let mailingBranchRequired = deepSearch(values.mailingBranch.deliveryAddress, val => val.trim() !== '')

      let minLength = errorMessages.minLength(2)

      let validation = Yup.object().shape({
        name: Yup.string()
          .trim()
          .min(2, minLength)
          .required(minLength),
        website: websiteValidation(),

        mailingBranch: Yup.lazy(() => {
          if (mailingBranchRequired)
            return Yup.object().shape({
              deliveryAddress: Yup.object().shape({
                addressName: minOrZeroLength(3),
                contactEmail: Yup.string()
                  .trim()
                  .email(errorMessages.invalidEmail)
                  .required(errorMessages.invalidEmail),
                contactName: Yup.string()
                  .trim()
                  .min(2, minLength)
                  .required(minLength),
                contactPhone: Yup.string()
                  .trim()
                  .required(errorMessages.enterPhoneNumber),
                address: addressValidationSchema()
              })
            })
          return Yup.mixed().notRequired()
        }),

        primaryBranch: Yup.object().shape({
          deliveryAddress: Yup.object().shape({
            addressName: minOrZeroLength(3),
            contactEmail: Yup.string()
              .trim()
              .email(errorMessages.invalidEmail)
              .required(errorMessages.invalidEmail),
            contactName: Yup.string()
              .trim()
              .min(2, minLength)
              .required(minLength),
            contactPhone: phoneValidation().concat(Yup.string().required(errorMessages.requiredMessage)),
            address: addressValidationSchema()
          })
        }),
        primaryUser: Yup.lazy(() => {
          // if (primaryUserRequired)
          return Yup.object().shape({
            email: Yup.string()
              .trim()
              .email(errorMessages.invalidEmail)
              .required(errorMessages.invalidEmail),
            name: Yup.string()
              .trim()
              .min(2, minLength)
              .required(minLength)
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

  selectLogo = logo => {
    this.setState({ companyLogo: logo })
  }

  removeLogo = () => {
    this.setState({ companyLogo: null })
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
      config,
      intl,
      // AddressSuggestPrimaryBranchInput,
      // AddressSuggestMailingBranchInput,
      toastManager,
      postCompanyLogo,
      deleteCompanyLogo
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
              let newValues = {}

              Object.keys(values).forEach(key => {
                // TODO: try to have reviewRequested in values not as React.element
                if (typeof values[key].$$typeof === 'undefined') {
                  if (typeof values[key] === 'string') newValues[key] = values[key].trim()
                  else newValues[key] = values[key]
                }
              })

              const data = await updateCompany(popupValues.id, {
                ...newValues,
                businessType: getSafe(() => newValues.businessType.id, null)
              })
              if (this.state.companyLogo) {
                postCompanyLogo(data.id, companyLogo)

                Datagrid.updateRow(data.id, () => ({ ...data, hasLogo: true }))
              } else {
                if (popupValues.hasLogo) deleteCompanyLogo(popupValues.id)

                Datagrid.updateRow(data.id, () => ({ ...data, hasLogo: false }))
              }
            } else {
              // Really ??
              // if (values.mailingBranch && !(values.mailingBranch.name.trim() !== '' || values.mailingBranch.contactEmail.trim() !== '' ||
              //   values.mailingBranch.contactName.trim() !== '' || values.mailingBranch.contactPhone.trim() !== '' ||
              //   values.mailingBranch.address.streetAddress.trim() !== '' || values.mailingBranch.address.city.trim() !== '' ||
              //   values.mailingBranch.address.zip !== '' || values.mailingBranch.address.country !== ''))
              //   delete values['mailingBranch']

              if (!values.deliveryAddress || !deepSearch(values.mailingBranch.deliveryAddress, val => val !== ''))
                delete values['mailingBranch']

              let branches = ['primaryBranch', 'mailingBranch']

              if (values.businessType) values.businessType = values.businessType.id

              let payload = cloneDeep(values)

              branches.forEach(branch => {
                let country = getSafe(() => JSON.parse(payload[branch].deliveryAddress.address.country).countryId)
                if (country) payload[branch].deliveryAddress.address.country = country
              })

              if (this.state.companyLogo) {
                let reader = new FileReader()
                reader.onload = async function() {
                  const loadedLogo = btoa(reader.result)
                  const data = await createCompany(payload)
                  await postCompanyLogo(data.id, companyLogo)

                  Datagrid.clear()
                  Datagrid.loadData()
                }
                reader.readAsBinaryString(this.state.companyLogo)
              } else {
                await createCompany(payload)

                Datagrid.clear()
                Datagrid.loadData()
              }
            }
            let status = popupValues ? 'companyUpdated' : 'companyCreated'

            toastManager.add(
              generateToastMarkup(
                <FormattedMessage id={`notifications.${status}.header`} />,
                <FormattedMessage id={`notifications.${status}.content`} values={{ name: values.name }} />
              ),
              {
                appearance: 'success'
              }
            )
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
          return (
            <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
              <Modal.Header>
                <FormattedMessage id={`global.${popupValues ? 'edit' : 'add'}`} /> {config.addEditText}
              </Modal.Header>
              <Segment basic padded>
                <Form loading={isSubmitting}>
                  <Accordion exclusive={false}>
                    <Modal.Content>
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
                              <FormattedMessage
                                id='global.companyAdmin'
                                defaultMessage='Company Admin (Primary User)'
                              />
                            </AccordionHeader>
                          </Accordion.Title>
                          <Accordion.Content active={accordionActive.companyAdmin}>
                            <FormGroup widths='equal' data-test='admin_popup_company_primaryUserNameEmail_inp'>
                              <Input
                                label={<FormattedMessage id='global.name' defaultMessage='Name' />}
                                name='primaryUser.name'
                              />
                              <Input
                                label={<FormattedMessage id='global.email' defaultMessage='Email' />}
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
                        </>
                      )}

                      {!popupValues && (
                        <>
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
                                label={<FormattedMessage id='global.name' defaultMessage='Name' />}
                                name='primaryBranch.deliveryAddress.addressName'
                              />
                            </FormGroup>
                            <FormGroup widths='equal' data-test='admin_popup_company_primaryBranchNameEmailPhone_inp'>
                              <Input
                                inputProps={{ fluid: true }}
                                label={<FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name' />}
                                name='primaryBranch.deliveryAddress.contactName'
                              />
                              <Input
                                inputProps={{ fluid: true }}
                                label={<FormattedMessage id='addCompany.contactEmail' defaultMessage='Contact email' />}
                                name='primaryBranch.deliveryAddress.contactEmail'
                              />
                              <PhoneNumber
                                label={<FormattedMessage id='addCompany.contactPhone' defaultMessage='Contact Phone' />}
                                name='primaryBranch.deliveryAddress.contactPhone'
                                values={values}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                errors={errors}
                                touched={touched}
                                isSubmitting={isSubmitting}
                              />
                            </FormGroup>
                            <FormGroup widths='equal'>
                              <Checkbox
                                label={formatMessage({ id: 'global.warehouse', defaultMessage: 'Warehouse' })}
                                name='primaryBranch.warehouse'
                                inputProps={{ 'data-test': 'admin_popup_company_primaryBranch_warehouse_chckb' }}
                              />
                            </FormGroup>
                            <AddressForm
                              values={values}
                              setFieldValue={setFieldValue}
                              prefix='primaryBranch.deliveryAddress'
                            />
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
                                label={<FormattedMessage id='addCompany.contactEmail' defaultMessage='Contact Email' />}
                                name='mailingBranch.deliveryAddress.contactEmail'
                              />
                              <Input
                                inputProps={{ fluid: true }}
                                label={<FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name' />}
                                name='mailingBranch.deliveryAddress.contactName'
                              />
                              <PhoneNumber
                                label={<FormattedMessage id='addCompany.contactPhone' defaultMessage='Contact Phone' />}
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
                              <Checkbox
                                label={formatMessage({ id: 'global.warehouse', defaultMessage: 'Warehouse' })}
                                name='mailingBranch.deliveryAddress.warehouse'
                                inputProps={{ 'data-test': 'admin_popup_company_mailingBranch_warehouse_chckb' }}
                              />
                            </FormGroup>
                            <AddressForm
                              values={values}
                              setFieldValue={setFieldValue}
                              prefix='mailingBranch.deliveryAddress'
                              datalistName='mailingAddresses.deliveryAddress'
                            />
                          </Accordion.Content>
                        </>
                      )}
                    </Modal.Content>
                  </Accordion>
                </Form>
              </Segment>
              <Modal.Actions>
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
              </Modal.Actions>
            </Modal>
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

// const prepareAddressSuggestPrimaryBranch = (AddressSuggestOptions) => (
//   <datalist id='addressesPrimaryBranch'>
//     {AddressSuggestOptions.map((a, id) => <option key={id} value={a} />)}
//   </datalist>
// )

// const prepareAddressSuggestMailingBranch = (AddressSuggestOptions) => (
//   <datalist id='addressesMailingBranch'>
//     {AddressSuggestOptions.map((a, id) => <option key={id} value={a} />)}
//   </datalist>
// )

const mapStateToProps = ({ admin, zip }) => {
  // const AddressSuggestOptionsPrimaryBranch = admin.addressSearchPrimaryBranch.map((a) => (
  //   a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  // ))
  // const AddressSuggestOptionsMailingBranch = admin.addressSearchMailingBranch.map((a) => (
  //   a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  // ))
  return {
    ...admin,
    // AddressSuggestPrimaryBranchInput: prepareAddressSuggestPrimaryBranch(AddressSuggestOptionsPrimaryBranch),
    // AddressSuggestPrimaryBranchOptions: AddressSuggestOptionsPrimaryBranch,
    // AddressSuggestPrimaryBranchData: admin.addressSearchPrimaryBranch,
    // AddressSuggestMailingBranchInput: prepareAddressSuggestMailingBranch(AddressSuggestOptionsMailingBranch),
    // AddressSuggestMailingBranchOptions: AddressSuggestOptionsMailingBranch,
    // AddressSuggestMailingBranchData: admin.addressSearchMailingBranch,
    zip,
    config: admin.config[admin.currentTab.name]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(AddNewPopupCasProducts)))
