import React from 'react'
import { connect } from 'react-redux'

import { Form, Modal, FormGroup, Divider, Accordion, Icon, Segment, Header } from 'semantic-ui-react'

import { Formik } from 'formik'
import {
  closePopup, updateCompany, createCompany, getCountries, getPrimaryBranchProvinces, getMailingBranchProvinces,
  getAddressSearchPrimaryBranch, getAddressSearchMailingBranch, removeEmpty
} from '~/modules/admin/actions'
import { addZip, getZipCodes } from '~/modules/zip-dropdown/actions'
import { Input, Button, Checkbox, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
import { ZipDropdown } from '~/modules/zip-dropdown'
// debug purposes only
// import JSONPretty from 'react-json-pretty'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'

import { validationSchema } from '~/modules/company-form/constants'
import { provinceObjectRequired, errorMessages } from '~/constants/yupValidation'

import { CompanyForm } from '~/modules/company-form/'

import { generateToastMarkup } from '~/utils/functions'


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
    name: '',
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
    contactPhone: '',
    warehouse: true
  },
  primaryBranch: {
    name: '',
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
    contactPhone: '',
    warehouse: true
  },
  primaryUser: {
    email: '',
    name: '',
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
    }
  }

  componentDidMount() {
    this.props.getCountries()
  }


  formValidationNew = () => (Yup.lazy(values => {
    let primaryUserRequired = values.primaryUser.email !== '' || values.primaryUser.name !== ''
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
          address: Yup.object().shape({
            city: Yup.string().trim().min(2, minLength).required(minLength),
            streetAddress: Yup.string().trim().min(2, minLength).required(minLength),
            zip: Yup.string().trim().required(errorMessages.zipCode),
            country: Yup.number().required(),
            province: this.state.mailingBranchProvinceValidation
          })
        })
        return Yup.mixed().notRequired()
      }),

      primaryBranch: Yup.object().shape({
        name: Yup.string().trim().min(2, minLength).required(minLength),
        contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
        contactName: Yup.string().trim().min(2, minLength).required(minLength),
        contactPhone: Yup.string().trim().required(errorMessages.enterPhoneNumber),
        address: Yup.object().shape({
          city: Yup.string().trim().min(2, minLength).required(minLength),
          streetAddress: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.minLength(2)),
          zip: Yup.string().trim().required(),
          country: Yup.string().required(errorMessages.requiredMessage),
          province: this.state.primaryBranchProvinceValidation
        })
      }),
      primaryUser: Yup.lazy(() => {
        if (primaryUserRequired) return Yup.object().shape({
          email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
          name: Yup.string().trim().min(2, minLength).required(minLength),
        })
        return Yup.mixed().notRequired()
      }),
    })

    return validation
  })
  )

  handlePrimaryBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value)
    if (country.hasProvinces) {
      this.props.getPrimaryBranchProvinces(country.id)
    }
    this.setState({ primaryBranchHasProvinces: country.hasProvinces, primaryBranchProvinceValidation: provinceObjectRequired(country.hasProvinces) })
  }

  handleMailingBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value)
    if (country.hasProvinces) {
      this.props.getMailingBranchProvinces(country.id)
    }
    this.setState({ mailingBranchHasProvinces: country.hasProvinces, mailingBranchProvinceValidation: provinceObjectRequired(country.hasProvinces) })
  }

  handleAccordionChange = (e, { name }) => {
    let { accordionActive } = this.state
    accordionActive[name] = !accordionActive[name]
    this.setState({ accordionActive })
  }

  handleAddressSelectPrimaryBranch = (d, values, setFieldValue) => {
    const i = this.props.AddressSuggestPrimaryBranchOptions.indexOf(d.value)
    if (i >= 0) {
      setFieldValue('primaryBranch.address.streetAddress', this.props.AddressSuggestPrimaryBranchData[i].streetAddress)
      setFieldValue('primaryBranch.address.city', this.props.AddressSuggestPrimaryBranchData[i].city)
      setFieldValue('primaryBranch.address.zip', this.props.AddressSuggestPrimaryBranchData[i].zip && this.props.AddressSuggestPrimaryBranchData[i].zip.zip)
      setFieldValue('primaryBranch.address.country', this.props.AddressSuggestPrimaryBranchData[i].country.id)
      setFieldValue('primaryBranch.address.province', this.props.AddressSuggestPrimaryBranchData[i].province ? this.props.AddressSuggestPrimaryBranchData[i].province.id : '')
      this.setState({ primaryBranchHasProvinces: this.props.AddressSuggestPrimaryBranchData[i].country.hasProvinces })
      if (this.props.AddressSuggestPrimaryBranchData[i].country.hasProvinces) this.props.getPrimaryBranchProvinces(this.props.AddressSuggestPrimaryBranchData[i].country.id)
    }
    else {
      let newValues = { ...values.primaryBranch.address, [d.name.split('.')[2]]: d.value }

      const body = {
        city: newValues.city,
        countryId: newValues.country,
        provinceId: newValues.province,
        streetAddress: newValues.streetAddress,
        zip: newValues.zip
      }
      removeEmpty(body)
      if (Object.entries(body).length === 0) return
      this.props.getAddressSearchPrimaryBranch(body)
    }
  }

  handleAddressSelectMailingBranch = (d, values, setFieldValue) => {
    const i = this.props.AddressSuggestMailingBranchOptions.indexOf(d.value)
    if (i >= 0) {
      setFieldValue('mailingBranch.address.streetAddress', this.props.AddressSuggestMailingBranchData[i].streetAddress)
      setFieldValue('mailingBranch.address.city', this.props.AddressSuggestMailingBranchData[i].city)
      setFieldValue('mailingBranch.address.zip', this.props.AddressSuggestMailingBranchData[i].zip && this.props.AddressSuggestMailingBranchData[i].zip.zip)
      setFieldValue('mailingBranch.address.country', this.props.AddressSuggestMailingBranchData[i].country.id)
      setFieldValue('mailingBranch.address.province', this.props.AddressSuggestMailingBranchData[i].province ? this.props.AddressSuggestMailingBranchData[i].province.id : '')
      this.setState({ MailingBranchHasProvinces: this.props.AddressSuggestMailingBranchData[i].country.hasProvinces })
      if (this.props.AddressSuggestMailingBranchData[i].country.hasProvinces) this.props.getMailingBranchProvinces(this.props.AddressSuggestMailingBranchData[i].country.id)
    }
    else {
      let newValues = { ...values.mailingBranch.address, [d.name.split('.')[2]]: d.value }

      const body = {
        city: newValues.city,
        countryId: newValues.country,
        provinceId: newValues.province,
        streetAddress: newValues.streetAddress,
        zip: newValues.zip
      }
      removeEmpty(body)
      if (Object.entries(body).length === 0) return
      this.props.getAddressSearchMailingBranch(body)
    }
  }

  render() {
    const {
      closePopup,
      popupValues,
      updateCompany,
      createCompany,
      countriesDropDown,
      primaryBranchProvinces,
      mailingBranchProvinces,
      config,
      intl,
      AddressSuggestPrimaryBranchInput,
      AddressSuggestMailingBranchInput,
      toastManager
    } = this.props

    let { accordionActive } = this.state

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

              Object.keys(values)
                .forEach(key => {
                  if (typeof values[key] === 'string') newValues[key] = values[key].trim()
                  else newValues[key] = values[key]
                })

              await updateCompany(popupValues.id, { ...newValues, businessType: newValues.businessType && newValues.businessType.id })

            }
            else {
              if (values.mailingBranch && !(values.mailingBranch.name.trim() !== '' || values.mailingBranch.contactEmail.trim() !== '' ||
                values.mailingBranch.contactName.trim() !== '' || values.mailingBranch.contactPhone.trim() !== '' ||
                values.mailingBranch.address.streetAddress.trim() !== '' || values.mailingBranch.address.city.trim() !== '' ||
                values.mailingBranch.address.zip !== '' || values.mailingBranch.address.country !== ''))
                delete values['mailingBranch']

              if (values.businessType) values.businessType = values.businessType.id

              removeEmpty(values)

              await createCompany(values)
            }
            let status = popupValues ? 'companyUpdated' : 'companyCreated'


            toastManager.add(generateToastMarkup(
              <FormattedMessage id={`notifications.${status}.header`} />,
              <FormattedMessage id={`notifications.${status}.content`} values={{ name: values.name }} />
            ), {
                appearance: 'success'
              })

          } catch (err) {
            console.error(err)
          }
          finally {
            actions.setSubmitting(false)
          }
        }}
        onReset={closePopup}
        render={props => {
          let { setFieldValue, values, isSubmitting } = props
          return (
            <Modal open centered={false} size='small'>
              <Modal.Header><FormattedMessage id={`global.${popupValues ? 'edit' : 'add'}`} /> {config.addEditText}</Modal.Header>
              <Segment basic padded>
                <Form loading={isSubmitting}>
                  <Accordion exclusive={false}>
                    <Modal.Content>
                      <CompanyForm />
                      {!popupValues && (
                        <>
                          <Divider />
                          <Accordion.Title active={accordionActive.companyAdmin} onClick={this.handleAccordionChange} name='companyAdmin'>
                            <AccordionHeader as='h4'>
                              <Icon color={accordionActive.companyAdmin && 'blue'} name={accordionActive.companyAdmin ? 'chevron down' : 'chevron right'} />
                              <FormattedMessage id='global.companyAdmin' defaultMessage='Company Admin (Primary User)' />
                            </AccordionHeader>
                          </Accordion.Title>
                          <Accordion.Content active={accordionActive.companyAdmin}>
                            <FormGroup widths='equal'>
                              <Input label={<FormattedMessage id='global.name' defaultMessage='Name' />} name='primaryUser.name' />
                              <Input label={<FormattedMessage id='global.email' defaultMessage='Email' />} name='primaryUser.email' />
                            </FormGroup>
                            <FormGroup widths='equal'>
                              <Input label={<FormattedMessage id='global.jobTitle' defaultMessage='Job Title' />} name='primaryUser.jobTitle' />
                              <Input label={<FormattedMessage id='global.phone' defaultMessage='Phone' />} name='primaryUser.phone' />
                            </FormGroup>
                          </Accordion.Content>
                        </>
                      )}


                      {!popupValues && <>
                        {AddressSuggestPrimaryBranchInput}
                        {AddressSuggestMailingBranchInput}
                        <Divider />
                        <Accordion.Title active={accordionActive.billingAddress} onClick={this.handleAccordionChange} name='billingAddress'>
                          <AccordionHeader as='h4'>
                            <Icon color={accordionActive.billingAddress && 'blue'} name={accordionActive.billingAddress ? 'chevron down' : 'chevron right'} />
                            <FormattedMessage id='global.primaryBranch' defaultMessage='Primary Branch (Billing Address)' />
                          </AccordionHeader>
                        </Accordion.Title>
                        <Accordion.Content active={accordionActive.billingAddress}>
                          <FormGroup widths='equal'>
                            <Input label={<FormattedMessage id='global.name' defaultMessage='Name' />} name='primaryBranch.name' />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <Input label={<FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name' />} name='primaryBranch.contactName' />
                            <Input label={<FormattedMessage id='addCompany.contactEmail' defaultMessage='Contact email' />} name='primaryBranch.contactEmail' />
                            <Input label={<FormattedMessage id='addCompany.contactPhone' defaultMessage='Contact Phone' />} name='primaryBranch.contactPhone' />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <Checkbox label={formatMessage({ id: 'global.warehouse', defaultMessage: 'Warehouse' })} name='primaryBranch.warehouse' />
                          </FormGroup>
                          <h5><FormattedMessage id='global.address' defaultMessage='Address' /></h5>
                          <FormGroup widths='equal'>
                            <Input
                              inputProps={{ list: 'addressesPrimaryBranch', onChange: (e, d) => { this.handleAddressSelectPrimaryBranch(d, values, setFieldValue) } }}
                              label={<FormattedMessage id='global.streetAddress' defaultMessage='Street Address' />}
                              name='primaryBranch.address.streetAddress'
                            />
                            <Input
                              inputProps={{ list: 'addressesPrimaryBranch', onChange: (e, d) => { this.handleAddressSelectPrimaryBranch(d, values, setFieldValue) } }}
                              label={<FormattedMessage id='global.city' defaultMessage='City' />}
                              name='primaryBranch.address.city'
                            />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <ZipDropdown
                              inputProps={{ list: 'addressesPrimaryBranch', onChange: (e, d) => { this.handleAddressSelectPrimaryBranch(d, values, setFieldValue) } }}
                              name='primaryBranch.address.zip' countryId={values.mailingBranch && values.mailingBranch.country && values.mailingBranch.address.country}
                            />
                            <Dropdown label={<FormattedMessage id='global.country' defaultMessage='Country' />} name='primaryBranch.address.country'
                              options={countriesDropDown}
                              inputProps={{
                                search: true, onChange: (e, d) => {
                                  setFieldValue('primaryBranch.address.province', ''); this.handlePrimaryBranchCountry(e, d)
                                }
                              }} />
                            <Dropdown label={<FormattedMessage id='global.stateProvince' defaultMessage='State/Province' />}
                              name='primaryBranch.address.province' options={primaryBranchProvinces}
                              inputProps={{ search: true, disabled: !this.state.primaryBranchHasProvinces }} />
                          </FormGroup>
                        </Accordion.Content>
                        <Divider />

                        <Accordion.Title active={accordionActive.mailingAddress} onClick={this.handleAccordionChange} name='mailingAddress'>
                          <AccordionHeader as='h4'>
                            <Icon color={accordionActive.mailingAddress && 'blue'} name={accordionActive.mailingAddress ? 'chevron down' : 'chevron right'} />
                            <FormattedMessage id='global.mailingBranch' defaultMessage='Mailing Branch (optional)' />
                          </AccordionHeader>
                        </Accordion.Title>
                        <Accordion.Content active={accordionActive.mailingAddress}>
                          <FormGroup widths='equal'>
                            <Input label={<FormattedMessage id='global.name' defaultMessage='Name' />} name='mailingBranch.name' />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <Input label={<FormattedMessage id='addCompany.contactEmail' defaultMessage='Contact Email' />} name='mailingBranch.contactEmail' />
                            <Input label={<FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name' />} name='mailingBranch.contactName' />
                            <Input label={<FormattedMessage id='addCompany.contactPhone' defaultMessage='Contact Phone' />} name='mailingBranch.contactPhone' />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <Checkbox label={formatMessage({ id: 'global.warehouse', defaultMessage: 'Warehouse' })} name='mailingBranch.warehouse' />
                          </FormGroup>
                          <h5><FormattedMessage id='global.address' defaultMessage='Address' /></h5>
                          <FormGroup widths='equal'>
                            <Input
                              inputProps={{ list: 'addressesMailingBranch', onChange: (e, d) => { this.handleAddressSelectMailingBranch(d, values, setFieldValue) } }}
                              label={<FormattedMessage id='global.streetAddress' defaultMessage='Street Address' />}
                              name='mailingBranch.address.streetAddress'
                            />
                            <Input
                              inputProps={{ list: 'addressesMailingBranch', onChange: (e, d) => { this.handleAddressSelectMailingBranch(d, values, setFieldValue) } }}
                              label={<FormattedMessage id='global.city' defaultMessage='City' />}
                              name='mailingBranch.address.city'
                            />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <ZipDropdown
                              inputProps={{ list: 'addressesMailingBranch', onChange: (e, d) => { this.handleAddressSelectMailingBranch(d, values, setFieldValue) } }}
                              name='mailingBranch.address.zip' countryId={values.mailingBranch && values.mailingBranch.country && values.mailingBranch.address.country}
                            />
                            <Dropdown label={<FormattedMessage id='global.country' defaultMessage='Country' />} name='mailingBranch.address.country' options={countriesDropDown}
                              inputProps={{
                                search: true, onChange: (e, d) => {
                                  setFieldValue('mailingBranch.address.province', ''); this.handleMailingBranchCountry(e, d)
                                }
                              }} />
                            <Dropdown label={<FormattedMessage id='global.stateProvince' defaultMessage='State/Province' />}
                              name='mailingBranch.address.province' options={mailingBranchProvinces}
                              inputProps={{ search: true, disabled: !this.state.mailingBranchHasProvinces }} />
                          </FormGroup>
                        </Accordion.Content>
                      </>}
                    </Modal.Content>
                  </Accordion>

                </Form>
              </Segment>
              <Modal.Actions>
                <Button.Reset onClick={props.handleReset}><FormattedMessage id='global.cancel' defaultMessage='Cancel' /></Button.Reset>
                <Button.Submit onClick={props.handleSubmit}><FormattedMessage id='global.save' defaultMessage='Save' /></Button.Submit>
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
  updateCompany,
  createCompany,
  getCountries,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  addZip,
  getZipCodes,
  getAddressSearchPrimaryBranch,
  getAddressSearchMailingBranch
}

const prepareAddressSuggestPrimaryBranch = (AddressSuggestOptions) => (
  <datalist id='addressesPrimaryBranch'>
    {AddressSuggestOptions.map((a, id) => <option key={id} value={a} />)}
  </datalist>
)

const prepareAddressSuggestMailingBranch = (AddressSuggestOptions) => (
  <datalist id='addressesMailingBranch'>
    {AddressSuggestOptions.map((a, id) => <option key={id} value={a} />)}
  </datalist>
)

const mapStateToProps = ({ admin, zip }) => {
  const AddressSuggestOptionsPrimaryBranch = admin.addressSearchPrimaryBranch.map((a) => (
    a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  ))
  const AddressSuggestOptionsMailingBranch = admin.addressSearchMailingBranch.map((a) => (
    a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  ))
  return {
    ...admin,
    AddressSuggestPrimaryBranchInput: prepareAddressSuggestPrimaryBranch(AddressSuggestOptionsPrimaryBranch),
    AddressSuggestPrimaryBranchOptions: AddressSuggestOptionsPrimaryBranch,
    AddressSuggestPrimaryBranchData: admin.addressSearchPrimaryBranch,
    AddressSuggestMailingBranchInput: prepareAddressSuggestMailingBranch(AddressSuggestOptionsMailingBranch),
    AddressSuggestMailingBranchOptions: AddressSuggestOptionsMailingBranch,
    AddressSuggestMailingBranchData: admin.addressSearchMailingBranch,
    zip,
    config: admin.config[admin.currentTab]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(AddNewPopupCasProducts)))