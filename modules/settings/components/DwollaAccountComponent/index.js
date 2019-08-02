import React from 'react'
import { connect } from 'react-redux'
import { Header, Modal, FormGroup, Accordion, Icon } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import {
  closeDwollaPopup,
  getCountries,
  getProvinces,
  postDwollaAccount
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
import styled from 'styled-components'

import { errorMessages } from '~/constants/yupValidation'

const AccordionHeader = styled(Header)`
  font-size: 18px;
  font-weight: bolder;
  > i {
    font-weight: bolder;
  }
`

const initialFormValues = {
  beneficialOwner: {
    address: {
      address1: '',
      city: '',
      country: '',
      postalCode: '',
      stateProvinceRegion: ''
    },
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    passport: {
      country: '',
      number: ''
    },
    ssn: ''
  }
}

const formValidation = Yup.object().shape({

  beneficialOwner: Yup.object().shape({
    address: Yup.object().shape({
      address1: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
      address2: Yup.string().trim().min(3, errorMessages.minLength(3)),
      address3: Yup.string().trim().min(3, errorMessages.minLength(3)),
      city: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
      country: Yup.string().required(errorMessages.requiredMessage),
      postalCode: Yup.string().required(errorMessages.requiredMessage),
      stateProvinceRegion: Yup.string().trim(),
    }),
    dateOfBirth: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    // 'id': 'string',
    lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    passport: Yup.object().shape({
      country: Yup.string().required(errorMessages.requiredMessage),
      number: Yup.string().required(errorMessages.requiredMessage),
    }),
    ssn: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    // 'status': 'string'
  }),
  dwollaController: Yup.object().shape({
    address: Yup.object().shape({
      address1: Yup.string().trim().min(3, errorMessages.minLength(3)),
      address2: Yup.string().trim().min(3, errorMessages.minLength(3)),
      address3: Yup.string().trim().min(3, errorMessages.minLength(3)),
      city: Yup.string().trim().min(3, errorMessages.minLength(3)),
      country: Yup.string(),
      postalCode: Yup.string(),
      stateProvinceRegion: Yup.string().trim(),
    }),
    dateOfBirth: Yup.string().trim().min(3, errorMessages.minLength(3)),
    firstName: Yup.string().trim().min(3, errorMessages.minLength(3)),
    lastName: Yup.string().trim().min(3, errorMessages.minLength(3)),
    passport: Yup.object().shape({
      country: Yup.string().required(errorMessages.requiredMessage),
      number: Yup.string().required(errorMessages.requiredMessage),
    }),
    ssn: Yup.string().trim().min(3, errorMessages.minLength(3)),
    title: Yup.string().trim().min(3, errorMessages.minLength(3))
  })
})

class BankAccountsPopup extends React.Component {
  state = {
    hasProvinces: this.props.hasProvinces,
    accordionActive: {
      controllerAddress: false
    }
  }

  componentDidMount() {
    this.props.countriesDropDown.length < 1 && this.props.getCountries()
  }

  handleCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id === d.value)
    if (country.hasProvinces) {
      this.props.getProvinces(country.id)
    }
    this.setState({ hasProvinces: country.hasProvinces })
  }

  handleAccordionChange = (e, { name }) => {
    let { accordionActive } = this.state
    accordionActive[name] = !accordionActive[name]
    this.setState({ accordionActive })
  }

  render() {
    const {
      closeDwollaPopup,
      countriesDropDown,
      provincesDropDown,
      postDwollaAccount,
      auth,
      intl: { formatMessage }
    } = this.props
    const { accordionActive } = this.state

    return (
      <Modal open centered={false}>
        <Modal.Header>
          <FormattedMessage id='settings.registerDwollaAcc' defaultMessage='Register Dwolla Account' />
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            enableReinitialize
            validationSchema={formValidation}
            onReset={closeDwollaPopup}
            onSubmit={(values, actions) => {
              values.beneficialOwner.address.country += ''
              values.beneficialOwner.passport.country += ''
              values.beneficialOwner.address.stateProvinceRegion += ''
              if (values.dwollaController && values.dwollaController.address && values.dwollaController.address.country) {
                values.dwollaController.address.country += ''
              }
              if (values.dwollaController && values.dwollaController.passport && values.dwollaController.passport.country) {
                values.dwollaController.passport.country += ''
              }
              if (values.dwollaController && values.dwollaController.address && values.dwollaController.address.stateProvinceRegion) {
                values.dwollaController.address.stateProvinceRegion += ''
              }

              values.beneficialOwner.status = 'status'
              values.beneficialOwner.id = auth.identity.id + ''

              closeDwollaPopup()
              postDwollaAccount(values)

              actions.setSubmitting(false)
            }}
          >

            <Accordion exclusive={false}>
              <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_address123_inp'>
                <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 1' }, { num: 1 })} name='beneficialOwner.address.address1' />
                <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 2' }, { num: 2 })} name='beneficialOwner.address.address2' />
                <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 3' }, { num: 3 })} name='beneficialOwner.address.address3' />
              </FormGroup>

              <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_addressDatePassport_inp'>
                <Input label={formatMessage({ id: 'global.city', defaultMessage: 'City' })} name='beneficialOwner.address.city' />
                <Input label={formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })} name='beneficialOwner.dateOfBirth' />
                <Dropdown label={formatMessage({ id: 'settings.passportCountry', defaultMessage: 'Passport Country' })} name='beneficialOwner.passport.country' options={countriesDropDown} inputProps={{ 'data-test': 'settings_dwolla_account_beneficialOwner_passport_country_drpdn' }} />
                <Input label={formatMessage({ id: 'settings.passportNumber', defaultMessage: 'Passport Number' })} name='beneficialOwner.passport.number' />
              </FormGroup>

              <FormGroup widths='equal'>
                <Dropdown label={formatMessage({ id: 'global.country', defaultMessage: 'Country' })} name='beneficialOwner.address.country' options={countriesDropDown}
                  inputProps={{
                    'data-test': 'settings_dwolla_account_beneficialOwner_address_country_drpdn',
                    search: true, onChange: (e, d) => {
                      this.handleCountry(e, d)
                    }
                  }} />
                <Dropdown label={formatMessage({ id: 'global.stateProvince', defaultMessage: 'State/Province' })} name='beneficialOwner.address.stateProvinceRegion' options={provincesDropDown}
                  inputProps={{ search: true, disabled: !this.state.hasProvinces, clearable: true, 'data-test': 'settings_dwolla_account_beneficialOwner_address_province_drpdn' }} />
              </FormGroup>

              <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_namePostal_inp'>
                <Input label={formatMessage({ id: 'global.postalCode', defaultMessage: 'Postal Code' })} name='beneficialOwner.address.postalCode' />
                <Input label={formatMessage({ id: 'global.firstName', defaultMessage: 'First Name' })} name='beneficialOwner.firstName' />
              </FormGroup>
              <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_nameSsn_inp'>
                <Input label={formatMessage({ id: 'global.lastName', defaultMessage: 'Last Name' })} name='beneficialOwner.lastName' />
                <Input label={formatMessage({ id: 'settings.ssn', defaultMessage: 'SSN' })} name='beneficialOwner.ssn' />
              </FormGroup>

              <Accordion.Title active={accordionActive.controllerAddress} onClick={this.handleAccordionChange} name='controllerAddress'>
                <AccordionHeader as='h4'>
                  <Icon color={accordionActive.controllerAddress && 'blue'} name={accordionActive.controllerAddress ? 'chevron down' : 'chevron right'} />
                  <FormattedMessage id='global.controller' defaultMessage='Controlling Person' />
                </AccordionHeader>
              </Accordion.Title>
              <Accordion.Content active={accordionActive.controllerAddress}>
                <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_address123_inp'>
                  <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 1' }, { num: 1 })} name='dwollaController.address.address1' />
                  <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 2' }, { num: 2 })} name='dwollaController.address.address2' />
                  <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 3' }, { num: 3 })} name='dwollaController.address.address3' />
                </FormGroup>
                <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_address_inp'>
                  <Input label={formatMessage({ id: 'global.city', defaultMessage: 'City' })} name='dwollaController.address.city' />
                  <Input label={formatMessage({ id: 'global.postalCode', defaultMessage: 'Postal Code' })} name='dwollaController.address.postalCode' />
                  <Dropdown label={formatMessage({ id: 'global.country', defaultMessage: 'Country' })} name='dwollaController.address.country' options={countriesDropDown}
                    inputProps={{
                      'data-test': 'settings_dwolla_account_dwollaController_address_country_drpdn',
                      search: true, onChange: (e, d) => {
                        this.handleCountry(e, d)
                      }
                    }} />
                  <Dropdown label={formatMessage({ id: 'global.stateProvince', defaultMessage: 'State/Province' })} name='dwollaController.address.stateProvinceRegion' options={provincesDropDown}
                    inputProps={{ search: true, disabled: !this.state.hasProvinces, clearable: true, 'data-test': 'settings_dwolla_account_dwollaController_address_province_drpdn' }} />
                </FormGroup>
                <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_name_inp'>
                  <Input label={formatMessage({ id: 'global.firstName', defaultMessage: 'First Name' })} name='dwollaController.firstName' />
                  <Input label={formatMessage({ id: 'global.lastName', defaultMessage: 'Last Name' })} name='dwollaController.lastName' />
                  <Dropdown label={formatMessage({ id: 'settings.passportCountry', defaultMessage: 'Passport Country' })} name='dwollaController.passport.country' options={countriesDropDown} inputProps={{ 'data-test': 'settings_dwolla_account_dwollaController_passport_country_drpdn' }} />
                  <Input label={formatMessage({ id: 'settings.passportNumber', defaultMessage: 'Passport Number' })} name='dwollaController.passport.number' />
                </FormGroup>
                <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_ssnTitle_inp'>
                  <Input label={formatMessage({ id: 'settings.ssn', defaultMessage: 'SSN' })} name='dwollaController.ssn' />
                  <Input label={formatMessage({ id: 'global.title', defaultMessage: 'Title' })} name='dwollaController.title' />
                </FormGroup>
                <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_dateOfBirth_inp'>
                  <Input label={formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })} name='dwollaController.dateOfBirth' />
                </FormGroup>
              </Accordion.Content>
            </Accordion>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset onClick={closeDwollaPopup} data-test='settings_dwolla_account_reset_btn'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
              </Button.Reset>
              <Button.Submit data-test='settings_dwolla_account_submit_btn'>
                <FormattedMessage id='global.save' defaultMessage='Save' />
              </Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeDwollaPopup,
  getCountries,
  getProvinces,
  postDwollaAccount
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    hasProvinces: state.settings.hasProvinces,
    provincesDropDown: state.settings.provincesDropDown,
    popupValues: state.settings.popupValues,
    countries: state.settings.countries,
    countriesDropDown: state.settings.countriesDropDown,
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountsPopup))
