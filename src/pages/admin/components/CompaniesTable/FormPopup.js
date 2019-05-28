import React from 'react'
import { connect } from 'react-redux'

import { Form, Modal, FormGroup, Divider, Accordion, Icon, Segment } from 'semantic-ui-react'

import { Formik } from 'formik'
import { closePopup, updateCompany, createCompany, getCountries, getPrimaryBranchProvinces, getMailingBranchProvinces } from '../../actions'
import { addZip, getZipCodes } from '~/modules/zip-dropdown/actions'
import { Input, Button, Checkbox, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
import { ZipDropdown } from '~/modules/zip-dropdown'
// debug purposes only
import JSONPretty from 'react-json-pretty'
import { FormattedMessage, injectIntl } from 'react-intl'
import { validationSchema } from '~/modules/company-form/constants'

import { CompanyForm } from '~/modules/company-form/'

const initialFormValues = {
  name: '',
  nacdMember: true,
  phone: '',
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

const formValidationNew = Yup.lazy(values => {
  let primaryUserRequired = values.primaryUser.email !== '' || values.primaryUser.name !== ''
  let mailingBranchRequired = values.mailingBranch.name.trim() !== '' || values.mailingBranch.contactEmail.trim() !== '' ||
    values.mailingBranch.contactName.trim() !== '' || values.mailingBranch.contactPhone.trim() !== '' ||
    values.mailingBranch.address.streetAddress.trim() !== '' || values.mailingBranch.address.city.trim() !== '' ||
    values.mailingBranch.address.zip !== '' || values.mailingBranch.address.country !== ''

  let validation = Yup.object().shape({
    name: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),

    mailingBranch: Yup.lazy(() => {
      if (mailingBranchRequired) return Yup.object().shape({
        name: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),
        contactEmail: Yup.string().trim().email('Enter valid e-mail address').required('Enter e-mail address'),
        contactName: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),
        contactPhone: Yup.string().trim().required('Enter phone number'),
        address: Yup.object().shape({
          city: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),
          streetAddress: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),
          zip: Yup.string().trim().required('Enter zip code'),
          country: Yup.number().required()
        })
      })
      return Yup.mixed().notRequired();
    }),

    primaryBranch: Yup.object().shape({
      name: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),
      contactEmail: Yup.string().trim().email('Enter valid e-mail address').required('Enter e-mail address'),
      contactName: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),
      contactPhone: Yup.string().trim().required('Enter phone number'),
      address: Yup.object().shape({
        city: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),
        streetAddress: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),
        zip: Yup.string().trim().required('Enter zip code'),
        country: Yup.number().required()
      })
    }),
    primaryUser: Yup.lazy(() => {
      if (primaryUserRequired) return Yup.object().shape({
        email: Yup.string().trim().email('Enter valid e-mail address').required('Enter e-mail address'),
        name: Yup.string().trim().min(2, 'Enter at least 2 characters').required('Enter at least 2 characters'),
      })
      return Yup.mixed().notRequired();
    }),
  })

  return validation
})

const removeEmpty = (obj) =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') {
      removeEmpty(val)
      if (Object.entries(val).length === 0) delete obj[key]
    }
    else {
      if (val == null) delete obj[key]
      else if (typeof val === 'string') {
        if (val.trim() === '') delete obj[key]
        else obj[key] = val.trim()
      }
    }
  })



class AddNewPopupCasProducts extends React.Component {
  state = {
    primaryBranchHasProvinces: false,
    mailingBranchHasProvinces: false,
    accordionActive: {
      companyAdmin: true,
      billingAddress: true,
      mailingAddress: false
    }
  }

  componentDidMount() {
    this.props.getCountries()
  }

  handlePrimaryBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value);
    if (country.hasProvinces) {
      this.props.getPrimaryBranchProvinces(country.id)
    }
    this.setState({ primaryBranchHasProvinces: country.hasProvinces })
  }

  handleMailingBranchCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id == d.value);
    if (country.hasProvinces) {
      this.props.getMailingBranchProvinces(country.id)
    }
    this.setState({ mailingBranchHasProvinces: country.hasProvinces })
  }

  handleAccordionChange = (e, { name }) => {
    let { accordionActive } = this.state
    accordionActive[name] = !accordionActive[name]
    this.setState({ accordionActive })
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
      intl
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
        validationSchema={popupValues ? validationSchema : formValidationNew}
        onSubmit={async (values, actions) => {
          if (popupValues) {
            let newValues = {}

            Object.keys(values)
              .forEach(key => {
                if (typeof values[key] === 'string') newValues[key] = values[key].trim()
                else newValues[key] = values[key]
              })

            await updateCompany(popupValues.id, newValues)
          }
          else {
            if (values.mailingBranch && !(values.mailingBranch.name.trim() !== '' || values.mailingBranch.contactEmail.trim() !== '' ||
              values.mailingBranch.contactName.trim() !== '' || values.mailingBranch.contactPhone.trim() !== '' ||
              values.mailingBranch.address.streetAddress.trim() !== '' || values.mailingBranch.address.city.trim() !== '' ||
              values.mailingBranch.address.zip !== '' || values.mailingBranch.address.country !== ''))
              delete values['mailingBranch']

            removeEmpty(values)
            await createCompany(values)
          }

          actions.setSubmitting(false)
        }}
        onReset={closePopup}
        render={props => {
          let { setFieldValue, values, isSubmitting } = props
          return (
            <Modal open centered={false} size='small'>
              <Modal.Header><FormattedMessage id={`global.${popupValues ? 'edit' : 'add'}`} /> {config.addEditText}</Modal.Header>
              <Segment basic>
                <Form loading={isSubmitting}>
                  <Accordion exclusive={false}>
                    <Modal.Content>
                      <CompanyForm />
                      {!popupValues && (
                        <>
                          <Divider />
                          <Accordion.Title active={accordionActive.companyAdmin} onClick={this.handleAccordionChange} name='companyAdmin'>
                            <h4>
                              <Icon color={accordionActive.companyAdmin && 'blue'} name={accordionActive.companyAdmin ? 'chevron up' : 'chevron down'} />
                              <FormattedMessage id='global.companyAdmin' defaultMessage='Company Admin (Primary User)' />
                            </h4>
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
                        <Divider />
                        <Accordion.Title active={accordionActive.billingAddress} onClick={this.handleAccordionChange} name='billingAddress'>
                          <h4>
                            <Icon color={accordionActive.billingAddress && 'blue'} name={accordionActive.billingAddress ? 'chevron up' : 'chevron down'} />
                            <FormattedMessage id='global.primaryBranch' defaultMessage='Primary Branch (Billing Address)' />
                          </h4>
                        </Accordion.Title>
                        <Accordion.Content active={accordionActive.billingAddress}>
                          <FormGroup widths='equal'>
                            <Input label={<FormattedMessage id='global.name' defaultMessage='Name' />} name='primaryBranch.name' />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <Input label={<FormattedMessage id='addCompany.contactEmail' defaultMessage='Contact email' />} name='primaryBranch.contactEmail' />
                            <Input label={<FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name' />} name='primaryBranch.contactName' />
                            <Input label={<FormattedMessage id='addCompany.contactPhone' defaultMessage='Contact Phone' />} name='primaryBranch.contactPhone' />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <Checkbox label={formatMessage({ id: 'global.warehouse', defaultMessage: 'Warehouse' })} name='primaryBranch.warehouse' />
                          </FormGroup>
                          <h5><FormattedMessage id='global.address' defaultMessage='Address' /></h5>
                          <FormGroup widths='equal'>
                            <Input label={<FormattedMessage id='global.streetAddress' defaultMessage='Street Address' />} name='primaryBranch.address.streetAddress' />
                            <Input label={<FormattedMessage id='global.city' defaultMessage='City' />} name='primaryBranch.address.city' />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <ZipDropdown name='primaryBranch.address.zip' countryId={values.primaryBranch.address.country} />
                            <Dropdown label={<FormattedMessage id='global.country' defaultMessage='Country' />} name='primaryBranch.address.country' options={countriesDropDown}
                              inputProps={{
                                search: true, onChange: (e, d) => {
                                  setFieldValue('primaryBranch.address.province', ''); this.handlePrimaryBranchCountry(e, d)
                                }
                              }} />
                            <Dropdown label={<FormattedMessage id='global.stateProvince' defaultMessage='State/Province' />} name='primaryBranch.address.province' options={primaryBranchProvinces}
                              inputProps={{ search: true, disabled: !this.state.primaryBranchHasProvinces, clearable: true }} />
                          </FormGroup>
                        </Accordion.Content>
                        <Divider />

                        <Accordion.Title active={accordionActive.mailingAddress} onClick={this.handleAccordionChange} name='mailingAddress'>
                          <h4>
                            <Icon color={accordionActive.mailingAddress && 'blue'} name={accordionActive.mailingAddress ? 'chevron up' : 'chevron down'} />
                            <FormattedMessage id='global.mailingBranch' defaultMessage='Mailing Branch (optional)' />
                          </h4>
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
                            <Input label={<FormattedMessage id='global.streetAddress' defaultMessage='Street Address' />} name='mailingBranch.address.streetAddress' />
                            <Input label={<FormattedMessage id='global.city' defaultMessage='City' />} name='mailingBranch.address.city' />
                          </FormGroup>
                          <FormGroup widths='equal'>
                            <ZipDropdown name='mailingBranch.address.zip' countryId={values.mailingBranch && values.mailingBranch.address.country} />
                            <Dropdown label={<FormattedMessage id='global.country' defaultMessage='Country' />} name='mailingBranch.address.country' options={countriesDropDown}
                              inputProps={{
                                search: true, onChange: (e, d) => {
                                  setFieldValue('mailingBranch.address.province', ''); this.handleMailingBranchCountry(e, d)
                                }
                              }} />
                            <Dropdown label={<FormattedMessage id='global.stateProvince' defaultMessage='State/Province' />} name='mailingBranch.address.province' options={mailingBranchProvinces}
                              inputProps={{ search: true, disabled: !this.state.mailingBranchHasProvinces, clearable: true }} />
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
  getZipCodes
}

const mapStateToProps = ({ admin, zip }) => {
  return {
    ...admin,
    zip,
    config: admin.config[admin.currentTab]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddNewPopupCasProducts))