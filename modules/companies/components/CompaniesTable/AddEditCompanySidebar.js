import { Component } from 'react'
import { connect } from 'react-redux'

import { Form, FormGroup, Divider, Accordion, Icon, Header, Loader, Dimmer, Segment } from 'semantic-ui-react'
import { Formik } from 'formik'
import {
  closePopup,
  updateCompany,
  createCompany,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  getAddressSearchPrimaryBranch,
  getAddressSearchMailingBranch
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

import { getSafe, deepSearch, removeEmpty } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { BottomButtons } from '../../constants'

import { FlexSidebar, FlexContent, HighSegment, LabeledRow } from '~/modules/admin/constants/layout'
import ErrorFocus from '~/components/error-focus'
//Actions
import { getNaicsCodes } from '../../../velloci-register/actions'

const AccordionHeader = styled(Header)`
  font-size: 18px;
  font-weight: bolder;
  > i {
    font-weight: bolder;
  }
`

const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
`

const initialFormValues = {
  name: '',
  enabled: false,
  phone: '',
  purchaseHazmatEligible: false,
  businessType: {
    id: null
  },
  tinType: '',
  tin: '',
  type: '',
  associations: [],
  cin: '',
  dba: '',
  dunsNumber: '',
  naicsCode: '',
  industryType: '',
  socialFacebook: '',
  socialInstagram: '',
  socialLinkedin: '',
  socialTwitter: '',
  website: '',
  tagline: '',
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

const getInitialFormValues = values => {
  return {
    ...initialFormValues,
    ...(values !== null && { ...values }),
    naicsCode: values?.naicsCategory?.naicsId
  }
}

class AddEditCompanySidebar extends Component {
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
      let mailingBranchRequired = getSafe(() => values.mailingBranch.deliveryAddress, false)
        ? deepSearch(values.mailingBranch.deliveryAddress, val => val !== '')
        : ''

      let minLength = errorMessages.minLength(2)

      let validation = Yup.object().shape({
        name: Yup.string().trim().min(2, minLength).required(minLength),
        tinType: Yup.string().required(errorMessages.requiredMessage),
        website: websiteValidationNotRequired(),
        phone: phoneValidation(10),

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
                contactPhone: phoneValidation(10),
                address: addressValidationSchema()
              })
            })
          return Yup.object().shape({
            deliveryAddress: Yup.object().shape({
              contactPhone: phoneValidation(10)
            })
          })
        }),

        primaryBranch: Yup.object().shape({
          deliveryAddress: Yup.object().shape({
            addressName: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
            contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
            contactName: Yup.string().trim().min(2, minLength).required(minLength),
            contactPhone: phoneValidation(10).concat(Yup.string().required(errorMessages.requiredMessage)),
            address: addressValidationSchema()
          })
        }),
        primaryUser: Yup.lazy(() => {
          // if (primaryUserRequired)
          return Yup.object().shape({
            email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
            name: Yup.string().trim().min(2, minLength).required(minLength),
            phone: phoneValidation(10)
          })
          // return Yup.mixed().notRequired()
        })
      })

      return validation
    })

  handleAccordionChange = (e, { name }) => {
    let { accordionActive } = this.state
    accordionActive[name] = !accordionActive[name]
    this.setState({ accordionActive })
  }

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
      intl,
      postCompanyLogo,
      deleteCompanyLogo,
      datagrid,
      naicsCodes,
      naicsCode,
      getNaicsCodes
    } = this.props

    const { selectLogo, removeLogo } = this

    let { accordionActive, companyLogo } = this.state

    const { formatMessage } = intl

    return (
      <Formik
        enableReinitialize
        initialValues={getInitialFormValues(popupValues)}
        validationSchema={popupValues ? validationSchema : this.formValidationNew()}
        onSubmit={async (values, actions) => {
          try {
            if (popupValues) {
              let associations = []
              if (getSafe(() => values.associations[0].id, false)) {
                associations = values.associations.map(assoc => assoc.id)
              } else {
                associations = getSafe(() => values.associations, [])
              }
              let newValues = {
                associations,
                businessType: getSafe(() => values.businessType.id, null),
                cin: getSafe(() => values.cin, ''),
                dba: getSafe(() => values.dba, ''),
                dunsNumber: getSafe(() => values.dunsNumber, ''),
                naicsCode: values?.naicsCode,
                enabled: getSafe(() => values.enabled, false),
                industryType: getSafe(() => values.industryType, ''),
                name: getSafe(() => values.name, ''),
                phone: getSafe(() => values.phone, ''),
                purchaseHazmatEligible: getSafe(() => values.purchaseHazmatEligible, false),
                socialFacebook: getSafe(() => values.socialFacebook, ''),
                socialInstagram: getSafe(() => values.socialInstagram, ''),
                socialLinkedin: getSafe(() => values.socialLinkedin, ''),
                socialTwitter: getSafe(() => values.socialTwitter, ''),
                tagline: getSafe(() => values.tagline, ''),
                tin: getSafe(() => values.tin, ''),
                tinType: getSafe(() => values.tinType, ''),
                website: getSafe(() => values.website, '')
              }
              if (values.type) newValues['type'] = values.type
              removeEmpty(newValues)

              const data = await updateCompany(popupValues.id, newValues)
              if (this.state.shouldUpdateLogo) {
                if (this.state.companyLogo) await postCompanyLogo(data.id, companyLogo)
                else await deleteCompanyLogo(popupValues.id)
              }
              datagrid.updateRow(data.id, () => ({ ...data, hasLogo: !!this.state.companyLogo }))
              actions.setSubmitting(false)
              closePopup()
            } else {
              let branches = ['primaryBranch', 'mailingBranch']

              if (values.businessType) values.businessType = values.businessType.id

              let payload = cloneDeep(values)
              payload.primaryUser.email = payload.primaryUser.email.trim()
              payload.primaryBranch.deliveryAddress.contactEmail = payload.primaryBranch.deliveryAddress.contactEmail.trim()

              branches.forEach(branch => {
                let country = getSafe(() => JSON.parse(payload[branch].deliveryAddress.address.country).countryId)
                if (country) payload[branch].deliveryAddress.address.country = country
              })

              if (
                !getSafe(() => values.primaryBranch.deliveryAddress, '') ||
                !deepSearch(
                  getSafe(() => values.mailingBranch.deliveryAddress, ''),
                  val => val !== ''
                )
              ) {
                delete payload['mailingBranch']
              } else {
                if (payload.mailingBranch.deliveryAddress.contactEmail !== '')
                  payload.mailingBranch.deliveryAddress.contactEmail = payload.mailingBranch.deliveryAddress.contactEmail.trim()
              }

              if (!payload.type) delete payload.type
              delete payload.enabled
              if (!payload.businessType) delete payload.businessType
              removeEmpty(payload)
              if (this.state.companyLogo) {
                let reader = new FileReader()
                reader.onload = async function () {
                  const loadedLogo = btoa(reader.result)
                  const data = await createCompany(payload)
                  await postCompanyLogo(data.id, companyLogo)
                  datagrid.clear()
                  datagrid.loadData()
                  actions.setSubmitting(false)
                  closePopup()
                }
                reader.readAsBinaryString(this.state.companyLogo)
              } else {
                await createCompany(payload)
                datagrid.clear()
                datagrid.loadData()
                actions.setSubmitting(false)
                closePopup()
              }
            }
          } catch (err) {
            actions.setSubmitting(false)
            console.error(err)
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
                    <Dropdown
                      label={<FormattedMessage id='company.companyType' defaultMessage='Company Type' />}
                      options={[
                        {
                          id: 0,
                          text: formatMessage({ id: 'company.regular', defaultMessage: 'Regular' }),
                          value: 'REGULAR'
                        },
                        {
                          id: 1,
                          text: formatMessage({ id: 'company.broker', defaultMessage: 'Broker' }),
                          value: 'BROKER'
                        }
                      ]}
                      name='type'
                      inputProps={{ 'data-test': 'admin_popup_company_company_type_drpdn' }}
                    />
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
                      enableCheckbox={!!popupValues}
                      naicsCodes={naicsCodes}
                      getNaicsCodes={getNaicsCodes}
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
                          <CustomSegment>
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
                                clearable
                              />
                            </FormGroup>
                          </CustomSegment>
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
                          <CustomSegment>
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
                          </CustomSegment>
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
                          <CustomSegment>
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
                                clearable={!mailingBranchRequired}
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
                          </CustomSegment>
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
                    <Button.Submit
                      data-test='admin_popup_company_save_btn'
                      onClick={props.handleSubmit}
                      disabled={isSubmitting}>
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
        }}
      />
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  updateCompany,
  createCompany,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  addZip,
  getZipCodes,
  getAddressSearchPrimaryBranch,
  getAddressSearchMailingBranch,
  postCompanyLogo,
  deleteCompanyLogo,
  getNaicsCodes
}

const mapStateToProps = ({ companiesAdmin, zip, vellociRegister }) => {
  const popupValues = companiesAdmin.popupValues
  return {
    ...companiesAdmin,
    popupValues,
    zip,
    naicsCodes: vellociRegister?.naicsCodes,
    naicsCode: companiesAdmin?.naicsCategory?.naicsId
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddEditCompanySidebar)))
