import React from 'react'
import { connect } from 'react-redux'
import { Header, Modal, FormGroup, Accordion, Icon, Popup } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { closeDwollaPopup, getCountries, getProvinces, postDwollaAccount } from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import styled from 'styled-components'
import { PlaidLink } from 'react-plaid-link'

import { DateInput } from '~/components/custom-formik'
import { AddressForm } from '~/modules/address-form/'
import { dwollaControllerValidation, beneficialOwnersValidation } from '~/constants/yupValidation'
import { deepSearch } from '~/utils/functions'
import { beneficialOwner, USA, ownersToPayload } from '~/constants/beneficialOwners'
import { BeneficialOwnersForm } from '~/components/custom-formik'

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

const formValidation = Yup.object().shape({
  beneficialOwners: beneficialOwnersValidation(),
  dwollaController: dwollaControllerValidation()
})

class BankAccountsPopup extends React.Component {
  state = {
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
        ssn: '',
        jobTitle: ''
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
  onExit = (error, metadata) => console.log('onExit', error, metadata)
  onEvent = (eventName, metadata) => console.log('onEvent', eventName, metadata)
  onSuccess = (token, metadata) => console.log('onSuccess', token, metadata)

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
      <Modal closeIcon onClose={() => closeDwollaPopup()} open centered={false}>
        <Modal.Header>
          <FormattedMessage id='settings.registerDwollaAcc' defaultMessage='Register Dwolla Account' />
        </Modal.Header>
        <Modal.Content>
          <PlaidLink
            className='CustomButton'
            style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
            clientName={this.props.clientName || 'Your app name'}
            env={this.props.env || 'sandbox'}
            product={this.props.product || ['auth', 'transactions']}
            publicKey={this.props.publicKey || '...'}
            onExit={this.onExit}
            onSuccess={this.onSuccess}
            onEvent={this.onEvent}>
            Open Link and connect your bank!
          </PlaidLink>
          <Form
            initialValues={this.state.initialFormValues}
            enableReinitialize
            validationSchema={formValidation}
            onReset={() => closeDwollaPopup()}
            validateOnChange={true}
            onSubmit={async (values, { setSubmitting }) => {
              let payload = {
                beneficialOwners: ownersToPayload(values.beneficialOwners),
                dwollaController: {
                  ...values.dwollaController,
                  ...values.dwollaController.address,
                  country: JSON.parse(values.dwollaController.address.country).countryId
                }
              }

              if (payload.beneficialOwners.length === 0) delete payload.beneficialOwners

              try {
                await postDwollaAccount(payload)
                closeDwollaPopup()
              } catch (e) {
                console.error(e)
              } finally {
                setSubmitting(false)
              }
            }}
            render={({ values, errors, setFieldValue, resetForm }) => {
              return (
                <>
                  <BeneficialOwnersForm
                    handleOwnerCountChange={values => {
                      this.setState(
                        {
                          initialFormValues: {
                            ...this.state.initialFormValues,
                            beneficialOwners: values.beneficialOwners
                          },
                          beneficialOwnersCount: values.beneficialOwners.length
                        },
                        () => resetForm(values)
                      )
                    }}
                    beneficialOwnersCount={this.state.beneficialOwnersCount}
                    values={values}
                    setFieldValue={setFieldValue}
                  />

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
                    <Accordion.Title
                      active={accordionActive.controllerAddress}
                      onClick={this.handleAccordionChange}
                      name='controllerAddress'
                      data-test='settings_dwolla_accordion_change'>
                      <AccordionHeader as='h4'>
                        <Icon
                          color={accordionActive.controllerAddress && 'blue'}
                          name={accordionActive.controllerAddress ? 'chevron down' : 'chevron right'}
                        />
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
                        <Input
                          label={formatMessage({ id: 'global.firstName', defaultMessage: 'First Name' })}
                          name='dwollaController.firstName'
                        />
                        <Input
                          label={formatMessage({ id: 'global.lastName', defaultMessage: 'Last Name' })}
                          name='dwollaController.lastName'
                        />
                        {/* <Dropdown label={formatMessage({ id: 'settings.passportCountry', defaultMessage: 'Passport Country' })} name='dwollaController.passport.country' options={countriesDropDown} inputProps={{ 'data-test': 'settings_dwolla_account_dwollaController_passport_country_drpdn' }} /> */}
                        {/* <Input label={formatMessage({ id: 'settings.passportNumber', defaultMessage: 'Passport Number' })} name='dwollaController.passport.number' /> */}
                      </FormGroup>

                      <AddressForm
                        countryPopup={{
                          disabled: false,
                          content: (
                            <FormattedMessage
                              id='settings.dwollaOnlyForUSA'
                              defaultMessage='!Dwolla is only supported for companies located in USA.'
                            />
                          )
                        }}
                        additionalCountryInputProps={{ disabled: true }}
                        values={values}
                        setFieldValue={setFieldValue}
                        displayHeader={false}
                        prefix='dwollaController'
                      />
                      <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_ssnTitle_inp'>
                        <Input
                          label={
                            <FormattedMessage id='settings.ssn' defaultMessage='SSN'>
                              {text => (
                                <>
                                  <Popup
                                    trigger={<Icon name='info circle' color='blue' />}
                                    content={
                                      <FormattedMessage
                                        id='settings.lastFourDigits'
                                        defaultMessage='Enter only last four digits'
                                      />
                                    }
                                  />
                                  {text}
                                </>
                              )}
                            </FormattedMessage>
                          }
                          name='dwollaController.ssn'
                        />
                        <Input
                          label={formatMessage({ id: 'global.title', defaultMessage: 'Title' })}
                          name='dwollaController.jobTitle'
                        />
                        {/* <Input inputProps={{ placeholder: 'YYYY-MM-DD' }} label={formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })} name='dwollaController.dateOfBirth' /> */}
                        <DateInput
                          label={formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })}
                          name='dwollaController.dateOfBirth'
                        />
                      </FormGroup>
                      {/* <FormGroup widths='equal' data-test='settings_dwolla_dwollaController_dateOfBirth_inp'>
                    </FormGroup> */}
                    </Accordion.Content>
                  </Accordion>
                  <RightAlignedDiv>
                    <Button.Reset onClick={closeDwollaPopup} data-test='settings_dwolla_account_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='settings_dwolla_account_submit_btn'>
                      <FormattedMessage id='global.save' defaultMessage='Save'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Submit>
                  </RightAlignedDiv>
                </>
              )
            }}></Form>
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
    countriesDropDown: state.settings.countriesDropDown
  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BankAccountsPopup))
