/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Divider, Accordion, Icon, Loader, Dimmer } from 'semantic-ui-react'
import { Formik } from 'formik'
import { Input, Button, Checkbox, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'

// Components
import { validationSchema } from '../../../company-form/constants'
import { CompanyForm } from '../../../company-form/'
import { AddressForm } from '../../../address-form/'
import { addZip, getZipCodes } from '../../../zip-dropdown/actions'
import { removeAttachment, addW9Attachment } from '../../../inventory/actions'
import { postCompanyLogo, deleteCompanyLogo } from '../../../company-form/actions'
import { PhoneNumber } from '../../../phoneNumber'
import { Required } from '../../../../components/constants/layout'
import { withDatagrid } from '../../../datagrid'
import { FlexSidebar, FlexContent, HighSegment } from './AddEditCompanySidebar.styles'
import ErrorFocus from '../../../../components/error-focus'
// Services
import {
  getInitialFormValues,
  formValidationNew,
  handleAccordionChange,
  removeLogo,
  removeDoc,
  selectLogo,
  selectDoc,
  submitCompany
} from './AddEditCompanySidebar.services'
import { getSafe, deepSearch } from '../../../../utils/functions'
// debug purposes only
// import JSONPretty from 'react-json-pretty'

//Actions
import { getNaicsCodes } from '../../../velloci-register/actions'
import { HeaderAccordion, SegmentCustom, DivBottomButtons } from './AddEditCompanySidebar.styles'
import {
  closePopup,
  updateCompany,
  createCompany,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  getAddressSearchPrimaryBranch,
  getAddressSearchMailingBranch
} from '../../actions'

const AddEditCompanySidebar = props => {
  const [accordionActive, setAccordionActive] = useState({
    companyAdmin: true,
    billingAddress: true,
    mailingAddress: false
  })
  const [companyLogo, setCompanyLogo] = useState(null)
  const [companyDoc, setCompanyDoc] = useState(null)
  const [shouldUpdateLogo, setShouldUpdateLogo] = useState(false)
  const [shouldUpdateDoc, setShouldUpdateDoc] = useState(false)

  const state = {
    accordionActive,
    setAccordionActive,
    companyLogo,
    companyDoc,
    setCompanyLogo,
    setCompanyDoc,
    shouldUpdateLogo,
    shouldUpdateDoc,
    setShouldUpdateLogo,
    setShouldUpdateDoc,
  }

  const [companyName, setCompanyName] = useState({
    first_name: '',
    last_name: ''
  })
  const { closePopup, popupValues, intl, naicsCodes, getNaicsCodes } = props
  const { formatMessage } = intl

  return (
    <Formik
      enableReinitialize
      initialValues={getInitialFormValues(popupValues)}
      validationSchema={popupValues ? validationSchema : formValidationNew()}
      onSubmit={(values, actions) => submitCompany(values, actions, state, props)}
      onReset={closePopup}
      render={formikProps => {
        let { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps
        let colorIcon = accordionActive.companyAdmin && 'blue'
        let mailingBranchRequired = getSafe(() => values.mailingBranch.deliveryAddress, false)
          ? deepSearch(values.mailingBranch.deliveryAddress, val => val !== '')
          : ''
        const onFirstNameChange = (e) => {
          const first_name = e.target.value
          setCompanyName({
            ...companyName,
            first_name,
          })
        }
        const onLastNameChange = (e) => {
          const last_name = e.target.value
          setCompanyName({
            ...companyName,
            last_name,
          })
        }
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
                    selectLogo={(logo, isNew) => selectLogo(logo, isNew, state)}
                    selectDoc={(doc, isNew) => selectDoc(doc, isNew, state)}
                    removeLogo={() => removeLogo(state)}
                    removeDoc={() => removeDoc(state)}
                    companyLogo={companyLogo}
                    companyDoc={companyDoc}
                    values={values}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    errors={errors}
                    touched={touched}
                    isSubmitting={isSubmitting}
                    companyId={popupValues ? popupValues.id : null}
                    hasLogo={popupValues ? popupValues.hasLogo : false}
                    w9AttachmentId={popupValues ? popupValues.w9AttachmentId : null}
                    hasDoc={popupValues ? popupValues.hasDoc : false}
                    enableCheckbox={!!popupValues}
                    naicsCodes={naicsCodes}
                    getNaicsCodes={getNaicsCodes}
                  />
                  {!popupValues && (
                    <>
                      <Divider />
                      <Accordion.Title
                        active={accordionActive.companyAdmin}
                        onClick={(e, data) => handleAccordionChange(e, data, state)}
                        name='companyAdmin'
                        data-test='admin_popup_company_accordion_companyAdmin'>
                        <HeaderAccordion as='h4'>
                          <Icon
                            color={colorIcon}
                            name={accordionActive.companyAdmin ? 'chevron down' : 'chevron right'}
                          />
                          <FormattedMessage id='global.companyAdmin' defaultMessage='Company Admin (Primary User)' />
                        </HeaderAccordion>
                      </Accordion.Title>
                      <Accordion.Content active={accordionActive.companyAdmin}>
                        <SegmentCustom>
                          <FormGroup widths='equal' data-test='admin_popup_company_primaryUserName_inp'>
                            {/* <Input
                              label={
                                <>
                                  <FormattedMessage id='global.name' defaultMessage='Name' />
                                  <Required />
                                </>
                              }
                              name='primaryUser.name'
                            /> */}
                            <Input
                              label={
                                <>
                                  <FormattedMessage id='global.firstName' defaultMessage='First Name' />
                                </>
                              }
                              name='primaryUser.firstName'
                              // inputProps={{
                              //   onChange: onFirstNameChange
                              // }}
                            />
                            <Input
                              label={
                                <>
                                  <FormattedMessage id='global.lastName' defaultMessage='Last Name' />
                                  <Required />
                                </>
                              }
                              name='primaryUser.lastName'
                              // inputProps={{
                              //   onChange: onLastNameChange
                              // }}
                            />
                          </FormGroup>
                          <FormGroup widths='equal' data-test='admin_popup_company_primaryUserEmail_inp'>
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
                        </SegmentCustom>
                      </Accordion.Content>
                      {/* {AddressSuggestPrimaryBranchInput}
                      {AddressSuggestMailingBranchInput} */}
                      <Divider />
                      <Accordion.Title
                        active={accordionActive.billingAddress}
                        onClick={(e, data) => handleAccordionChange(e, data, state)}
                        name='billingAddress'
                        data-test='admin_popup_company_accordion_primaryBranch'>
                        <HeaderAccordion as='h4'>
                          <Icon
                            color={colorIcon}
                            name={accordionActive.billingAddress ? 'chevron down' : 'chevron right'}
                          />
                          <FormattedMessage
                            id='global.primaryBranch'
                            defaultMessage='Primary Branch (Billing Address)'
                          />
                        </HeaderAccordion>
                      </Accordion.Title>
                      <Accordion.Content active={accordionActive.billingAddress}>
                        <SegmentCustom>
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
                        </SegmentCustom>
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
                        onClick={(e, data) => handleAccordionChange(e, data, state)}
                        name='mailingAddress'
                        data-test='admin_popup_company_accordion_mailingBranch'>
                        <HeaderAccordion as='h4'>
                          <Icon
                            color={colorIcon}
                            name={accordionActive.mailingAddress ? 'chevron down' : 'chevron right'}
                          />
                          <FormattedMessage id='global.mailingBranch' defaultMessage='Mailing Branch (optional)' />
                        </HeaderAccordion>
                      </Accordion.Title>
                      <Accordion.Content active={accordionActive.mailingAddress}>
                        <SegmentCustom>
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
                        </SegmentCustom>
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
              <DivBottomButtons>
                <div>
                  <Button.Reset data-test='admin_popup_company_cancel_btn' onClick={formikProps.handleReset}>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Reset>
                  <Button.Submit
                    data-test='admin_popup_company_save_btn'
                    onClick={formikProps.handleSubmit}
                    disabled={isSubmitting}>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Submit>
                </div>
              </DivBottomButtons>
            </FlexSidebar>
            <ErrorFocus />
          </Form>
        )
      }}
    />
  )
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
  addW9Attachment,
  removeAttachment,
  postCompanyLogo,
  deleteCompanyLogo,
  getNaicsCodes,
}

const mapStateToProps = (state) => {
  const { companiesAdmin, zip, vellociRegister, globalData } = state;
  const { documentTypes } = globalData;
  const popupValues = companiesAdmin.popupValues
  return {
    ...companiesAdmin,
    popupValues,
    zip,
    naicsCodes: vellociRegister?.naicsCodes,
    naicsCode: companiesAdmin?.naicsCategory?.naicsId,
    documentTypes,
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddEditCompanySidebar)))