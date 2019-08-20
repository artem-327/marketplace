import React from 'react'
import { connect } from 'react-redux'
import { Header, Modal, FormGroup, Accordion, Icon, Popup } from 'semantic-ui-react'
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
import { withToastManager } from 'react-toast-notifications'


import { AddressForm } from '~/modules/address-form/'

import { errorMessages, dateValidation, ssnValidation } from '~/constants/yupValidation'
import { addressValidationSchema } from '~/modules/address-form/constants'
import { generateToastMarkup, deepSearch } from '~/utils/functions'


const AccordionHeader = styled(Header)`
  font-size: 18px;
  font-weight: bolder;
  > i {
    font-weight: bolder;
  }
`

const RightAlignedDiv = styled.div`
  text-align: right !important;
`

const USA = JSON.stringify({ countryId: 1, hasProvinces: true })

let beneficialOwner = {
  address: {
    streetAddress: '',
    city: '',
    country: USA,
    zip: '',
    province: ''
  },
  dateOfBirth: '',
  firstName: '',
  lastName: '',
  ssn: ''
}

const maxBeneficialOwners = 4

const formValidation = Yup.object().shape({

  beneficialOwners: Yup.array().of(Yup.lazy((values) => {
    let isAnyValueFilled = deepSearch(values, (val, key) => val !== '' && key !== 'country')

    if (!isAnyValueFilled) return Yup.mixed().notRequired()

    return (
      Yup.object().shape({
        address: addressValidationSchema(),
        dateOfBirth: dateValidation(),
        firstName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
        lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
        ssn: ssnValidation()
      })
    )
  })),
  dwollaController: Yup.object().shape({
    address: addressValidationSchema(),
    dateOfBirth: dateValidation(),
    firstName: Yup.string().trim().min(3, errorMessages.minLength(3)),
    lastName: Yup.string().trim().min(3, errorMessages.minLength(3)),
    // passport: Yup.object().shape({
    //   country: Yup.string().required(errorMessages.requiredMessage),
    //   number: Yup.string().required(errorMessages.requiredMessage),
    // }),
    ssn: Yup.number()
      .typeError(errorMessages.mustBeNumber)
      .positive(errorMessages.mustBeNumber)
      .test('num-length', errorMessages.exactDigits(4), (value) => (value + '').length === 4)
      .required(errorMessages.requiredMessage),
    title: Yup.string().trim().min(3, errorMessages.minLength(3))
  })
})

class BankAccountsPopup extends React.Component {
  state = {
    hasProvinces: this.props.hasProvinces,
    accordionActive: {
      controllerAddress: true
    },
    beneficialOwnersCount: 1,
    initialFormValues: {
      beneficialOwners: [beneficialOwner],
      dwollaController: {
        address: {
          streetAddress: '',
          city: '',
          country: USA,
          zip: '',
          province: ''
        },
        dateOfBirth: '',
        firstName: '',
        lastName: '',
        ssn: ''
      }
    }
  }

  async componentDidMount() {
    if (this.props.countriesDropDown.length === 0) await this.props.getCountries()
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


  getBeneficialOwners = (values, setFieldValue) => {
    let beneficialOwners = []
    let { intl: { formatMessage }, countries } = this.props

    for (let i = 0; i < this.state.beneficialOwnersCount; i++) {
      beneficialOwners.push(
        <>
          <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_namePostal_inp'>
            <Input label={formatMessage({ id: 'global.firstName', defaultMessage: 'First Name' })} name={`beneficialOwners[${i}].firstName`} />
            <Input label={formatMessage({ id: 'global.lastName', defaultMessage: 'Last Name' })} name={`beneficialOwners[${i}].lastName`} />
          </FormGroup>
          <AddressForm
            countryPopup={{
              disabled: false,
              content: <FormattedMessage id='settings.dwollaOnlyForUSA' defaultMessage='Dwolla is only supported for companies located in USA.' />
            }}
            values={values}
            setFieldValue={setFieldValue}
            index={i}
            prefix={`beneficialOwners`}
            displayHeader={false}
            additionalCountryInputProps={{ disabled: true }} />

          <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_nameSsn_inp'>
            <Input inputProps={{ placeholder: '123-45-6789' }} label={formatMessage({ id: 'settings.ssn', defaultMessage: 'SSN' })} name={`beneficialOwners[${i}].ssn`} />
            <Input inputProps={{ placeholder: 'YYYY-MM-DD' }} label={formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })} name={`beneficialOwners[${i}].dateOfBirth`} />
          </FormGroup>
        </>
      )
    }

    return beneficialOwners
  }

  handleOwnerCountChange = (direction = 0, values, resetForm) => {
    let { beneficialOwnersCount } = this.state
    if ((beneficialOwnersCount + direction) > 0 && (beneficialOwnersCount + direction) <= maxBeneficialOwners) {
      let { beneficialOwners } = this.state.initialFormValues
      direction === -1 ? beneficialOwners.pop() : beneficialOwners.push(beneficialOwner)

      this.setState({
        beneficialOwnersCount: beneficialOwnersCount + direction,
        initialFormValues: {
          ...this.state.initialFormValues,
          beneficialOwners
        },
      }, () => {
        this.handleFormReset(values, resetForm)
        // setFieldValue(`beneficialOwners[${this.state.beneficialOwnersCount - 1}].firstName`, direction === 1 ? '' : null)
      })
    }
  }


  handleFormReset = (values, resetForm) => {
    let beneficialOwners = values.beneficialOwners.slice()
    if (beneficialOwners.length === this.state.beneficialOwnersCount) return

    beneficialOwners.length < this.state.beneficialOwnersCount ? beneficialOwners.push(beneficialOwner) : beneficialOwners.pop()

    let nextValues = {
      beneficialOwners,
      dwollaController: values.dwollaController,
    }

    resetForm(nextValues)
  }


  render() {
    const {
      closeDwollaPopup,
      countriesDropDown,
      provincesDropDown,
      postDwollaAccount,
      auth,
      intl: { formatMessage },
      toastManager
    } = this.props
    const { accordionActive } = this.state

    return (
      <Modal open centered={false}>
        <Modal.Header>
          <FormattedMessage id='settings.registerDwollaAcc' defaultMessage='Register Dwolla Account' />
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.state.initialFormValues}
            // enableReinitialize={true}
            validationSchema={formValidation}
            onReset={() => closeDwollaPopup()}
            validateOnChange={true}
            onSubmit={async (values, { setSubmitting }) => {

              let payload = {
                beneficialOwners: [],
                dwollaController: {
                  ...values.dwollaController,
                  ...values.dwollaController.address,
                  country: JSON.parse(values.dwollaController.address.country).countryId
                }
              }

              values.beneficialOwners.forEach((owner, i) => {
                // If we find any value that is empty it means all values are empty, due to validation
                // so we dont care about such beneficialOwner...
                if (!deepSearch(owner, (val, key) => val === '' && key !== 'country')) {
                  payload.beneficialOwners.push({
                    ...owner,
                    ...owner.address,
                    country: JSON.parse(owner.address.country).countryId
                  })
                  delete payload.beneficialOwners[i].address
                }
              })

              delete payload.dwollaController.address


              if(payload.beneficialOwners.length === 0) delete payload.beneficialOwners

              try {
                await postDwollaAccount(payload)
                toastManager.add(generateToastMarkup(
                  <FormattedMessage id='notifications.dwollaAccountCreated.header' defaultMessage='Dwolla account created' />,
                  <FormattedMessage id='notifications.dwollaAccountCreated.content' defaultMessage='Dwolla account successfully created' />
                ), { appearance: 'success' })
                closeDwollaPopup()
              }
              catch (e) { console.error(e) }
              finally { setSubmitting(false) }
            }}
            render={({ values, errors, setFieldValue, resetForm }) => {

              return (
                <>
                  {this.getBeneficialOwners(values, setFieldValue).map((owner, i) =>
                    <>
                      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                      <Header as='h3'>
                        <FormattedMessage
                          id='settings.beneficialOwnerNum'
                          defaultMessage={`Beneficial owner # ${i + 1}`}
                          values={{ num: i + 1 }}
                        /></Header>
                      {owner}
                    </>
                  )}

                  <RightAlignedDiv>
                    <Popup trigger={
                      <Button
                        negative
                        disabled={this.state.beneficialOwnersCount === 1}
                        onClick={() => this.handleOwnerCountChange(-1, values, resetForm)}
                        icon>
                        <Icon name='minus' />
                      </Button>
                    } content={<FormattedMessage id='settings.removeBeneficialOwner' defaultMessage='Remove beneficial owner' />} />

                    <Popup trigger={
                      <Button
                        positive
                        disabled={this.state.beneficialOwnersCount === maxBeneficialOwners}
                        onClick={() => this.handleOwnerCountChange(1, values, resetForm)}
                        icon>
                        <Icon name='plus' />
                      </Button>
                    } content={<FormattedMessage id='settings.addBeneficialOwner' defaultMessage='Add beneficial owner' />} />
                  </RightAlignedDiv>
                  {/* <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_address123_inp'>
                  <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 1' }, { num: 1 })} name='beneficialOwner.address.address1' />
                  <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 2' }, { num: 2 })} name='beneficialOwner.address.address2' />
                  <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 3' }, { num: 3 })} name='beneficialOwner.address.address3' />
                </FormGroup> */}

                  {/* <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_addressDatePassport_inp'>
                  <Input label={formatMessage({ id: 'global.city', defaultMessage: 'City' })} name='beneficialOwner.address.city' />
                  
                  <Dropdown label={formatMessage({ id: 'settings.passportCountry', defaultMessage: 'Passport Country' })} name='beneficialOwner.passport.country' options={countriesDropDown} inputProps={{ 'data-test': 'settings_dwolla_account_beneficialOwner_passport_country_drpdn' }} />
                  <Input label={formatMessage({ id: 'settings.passportNumber', defaultMessage: 'Passport Number' })} name='beneficialOwner.passport.number' />
                </FormGroup> */}

                  {/* <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_namePostal_inp'> */}
                  {/* <Input label={formatMessage({ id: 'global.postalCode', defaultMessage: 'Postal Code' })} name='beneficialOwner.address.postalCode' /> */}
                  {/* <Input label={formatMessage({ id: 'global.firstName', defaultMessage: 'First Name' })} name='beneficialOwner.firstName' />
                  <Input label={formatMessage({ id: 'global.lastName', defaultMessage: 'Last Name' })} name='beneficialOwner.lastName' />
                </FormGroup> */}
                  {/* <AddressForm
                  values={values}
                  setFieldValue={setFieldValue}
                  prefix='beneficialOwner'
                  displayHeader={false} /> */}

                  {/* <FormGroup widths='equal'>
                  <Dropdown label={formatMessage({ id: 'global.country', defaultMessage: 'Country' })} name='beneficialOwner.address.country' options={countriesDropDown}
                    inputProps={{
                      'data-test': 'settings_dwolla_account_beneficialOwner_address_country_drpdn',
                      search: true, onChange: (e, d) => {
                        this.handleCountry(e, d)
                      }
                    }} />
                  <Dropdown label={formatMessage({ id: 'global.stateProvince', defaultMessage: 'State/Province' })} name='beneficialOwner.address.stateProvinceRegion' options={provincesDropDown}
                    inputProps={{ search: true, disabled: !this.state.hasProvinces, clearable: true, 'data-test': 'settings_dwolla_account_beneficialOwner_address_province_drpdn' }} />
                </FormGroup> */}

                  {/* <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_nameSsn_inp'>
                  <Input label={formatMessage({ id: 'settings.ssn', defaultMessage: 'SSN' })} name='beneficialOwner.ssn' />
                  <Input label={formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })} name='beneficialOwner.dateOfBirth' />
                </FormGroup> */}
                  <Accordion exclusive={false}>
                    <Accordion.Title active={accordionActive.controllerAddress} onClick={this.handleAccordionChange} name='controllerAddress' data-test='settings_dwolla_accordion_change'>
                      <AccordionHeader as='h4'>
                        <Icon color={accordionActive.controllerAddress && 'blue'} name={accordionActive.controllerAddress ? 'chevron down' : 'chevron right'} />
                        <FormattedMessage id='global.controller' defaultMessage='Controlling Person' />
                      </AccordionHeader>
                    </Accordion.Title>
                    <Accordion.Content active={accordionActive.controllerAddress}>
                      <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_address123_inp'>
                        {/* <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 1' }, { num: 1 })} name='dwollaController.address.address1' />
                      <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 2' }, { num: 2 })} name='dwollaController.address.address2' />
                      <Input label={formatMessage({ id: 'settings.addressNum', defaultMessage: 'Address 3' }, { num: 3 })} name='dwollaController.address.address3' /> */}
                      </FormGroup>
                      {/* <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_address_inp'>
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
                    </FormGroup> */}
                      <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_name_inp'>
                        <Input label={formatMessage({ id: 'global.firstName', defaultMessage: 'First Name' })} name='dwollaController.firstName' />
                        <Input label={formatMessage({ id: 'global.lastName', defaultMessage: 'Last Name' })} name='dwollaController.lastName' />
                        {/* <Dropdown label={formatMessage({ id: 'settings.passportCountry', defaultMessage: 'Passport Country' })} name='dwollaController.passport.country' options={countriesDropDown} inputProps={{ 'data-test': 'settings_dwolla_account_dwollaController_passport_country_drpdn' }} /> */}
                        {/* <Input label={formatMessage({ id: 'settings.passportNumber', defaultMessage: 'Passport Number' })} name='dwollaController.passport.number' /> */}
                      </FormGroup>

                      <AddressForm
                        countryPopup={{
                          disabled: false,
                          content: <FormattedMessage id='settings.dwollaOnlyForUSA' defaultMessage='!Dwolla is only supported for companies located in USA.' />
                        }}
                        additionalCountryInputProps={{ disabled: true }}
                        values={values}
                        setFieldValue={setFieldValue}
                        displayHeader={false}
                        prefix='dwollaController'
                      />
                      <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_ssnTitle_inp'>
                        <Input label={formatMessage({ id: 'settings.ssn', defaultMessage: 'SSN' })} name='dwollaController.ssn' />
                        <Input label={formatMessage({ id: 'global.title', defaultMessage: 'Title' })} name='dwollaController.jobTitle' />
                        <Input inputProps={{ placeholder: 'YYYY-MM-DD' }} label={formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })} name='dwollaController.dateOfBirth' />
                      </FormGroup>
                      {/* <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_dateOfBirth_inp'>
                    </FormGroup> */}
                    </Accordion.Content>
                  </Accordion>
                  <RightAlignedDiv>
                    <Button.Reset onClick={closeDwollaPopup} data-test='settings_dwolla_account_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
                    </Button.Reset>
                    <Button.Submit data-test='settings_dwolla_account_submit_btn'>
                      <FormattedMessage id='global.save' defaultMessage='Save' />
                    </Button.Submit>
                  </RightAlignedDiv>
                </>
              )
            }
            }
          >
          </Form>
        </Modal.Content>
      </Modal >
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

export default withToastManager(injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountsPopup)))
