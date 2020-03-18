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
  getAddressSearchMailingBranch
} from '~/modules/admin/actions'
import { addZip, getZipCodes } from '~/modules/zip-dropdown/actions'
import { postCompanyLogo, deleteCompanyLogo } from '~/modules/company-form/actions'
import { Input, Button, Checkbox, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'

import { cloneDeep } from 'lodash'

import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { validationSchema } from '~/modules/company-form/constants'
import { provinceObjectRequired, errorMessages, minOrZeroLength } from '~/constants/yupValidation'

import { CompanyForm } from '~/modules/company-form/'
import { AddressForm } from '~/modules/address-form/'
import { addressValidationSchema, phoneValidation, websiteValidation } from '~/constants/yupValidation'

import { getSafe, deepSearch } from '~/utils/functions'
import { Datagrid } from '~/modules/datagrid'
import { PhoneNumber } from '~/modules/phoneNumber'
import { string, objectOf, bool, func } from 'prop-types'

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

class CompanyModal extends React.Component {
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

  formValidationNew = () =>
    Yup.lazy(values => {
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
      config,
      intl,
      header,
      postCompanyLogo,
      deleteCompanyLogo,
      isClientCompany,
      onSubmit
    } = this.props

    const { selectLogo, removeLogo } = this

    let { accordionActive, companyLogo } = this.state

    const { formatMessage } = intl
    let isEdit = !!popupValues

    return (
      <Formik
        enableReinitialize
        initialValues={isEdit ? popupValues : initialFormValues}
        validationSchema={isEdit ? validationSchema : this.formValidationNew()}
        onSubmit={async (values, actions) => {
          try {
            let payload = null

            if (isEdit) {
              let newValues = {}
              Object.keys(values).forEach(key => {
                // TODO: try to have reviewRequested in values not as React.element
                if (typeof values[key].$$typeof === 'undefined') {
                  if (typeof values[key] === 'string') newValues[key] = values[key].trim()
                  else newValues[key] = values[key]
                }
              })
              payload = { ...popupValues, ...newValues, businessType: getSafe(() => newValues.businessType.id, null) }
    
            } else {
              if (!values.deliveryAddress || !deepSearch(values.mailingBranch.deliveryAddress, val => val !== ''))
                delete values['mailingBranch']
              let branches = ['primaryBranch', 'mailingBranch']
              if (values.businessType) values.businessType = values.businessType.id
              payload = cloneDeep(values)
              branches.forEach(branch => {
                let country = getSafe(() => JSON.parse(payload[branch].deliveryAddress.address.country).countryId)
                if (country) payload[branch].deliveryAddress.address.country = country
              })
          
            }

            let data = await onSubmit(payload, isEdit)

            if (!isClientCompany) {
              if (companyLogo) postCompanyLogo(data.id, companyLogo)
              else if (!companyLogo && getSafe(() => popupValues.hasLogo, false)) deleteCompanyLogo(data.id)
            }

            if (isEdit) Datagrid.updateRow(data.id, () => ({ ...data, hasLogo: !!companyLogo }))
            else {
              Datagrid.clear()
              Datagrid.loadData()
            }
          } catch (err) {
            console.error(err)
          }
          actions.setSubmitting(false)
        }}
        onReset={closePopup}
        render={props => {
          let { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = props
          let colorIcon = accordionActive.companyAdmin && 'blue'
          return (
            <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
              <Modal.Header>
                <FormattedMessage id={`global.${isEdit ? 'edit' : 'add'}`} />{' '}
                <FormattedMessage id={header.id} defaultMessage={header.defaultMessage} />
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
                                name='mailingBranch.warehouse'
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

const mapStateToProps = ({ admin, zip }) => {
  const popupValues = admin.popupValues ? admin.popupValues.rawData : null
  return {
    ...admin,
    popupValues,
    zip
  }
}

CompanyModal.propTypes = {
  header: objectOf({
    id: string,
    defaultMessage: string
  }),
  isClientCompany: bool,
  onSubmit: func.isRequired
}

CompanyModal.defaultProps = {
  header: {
    id: 'global.company',
    defaultMessage: 'Company'
  },
  isClientCompany: false
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CompanyModal))
