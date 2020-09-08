import React from 'react'
import { connect } from 'react-redux'

import { FormGroup, Segment } from 'semantic-ui-react'

import { closeSidebar, putBankAccountRequest, postNewBankAccountRequest } from '../../actions'

import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import Router from 'next/router'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'

import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'
import { Required } from '~/components/constants/layout'
import ErrorFocus from '~/components/error-focus'
import { FlexSidebar, HighSegment, FlexContent } from '~/modules/inventory/constants/layout'
import styled from 'styled-components'

const CustomHighSegment = styled(HighSegment)`
  margin: 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
  background-color: #ffffff;
  z-index: 1;
`

const CustomSegmentContent = styled(Segment)`
  padding-top: 0px !important;
`

const BottomButtons = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
`

const ButtonSubmit = styled(Button.Submit)`
  background-color: #2599d5 !important;
  color: #ffffff !important;
`

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

const initialFormValues = {
  accountNumber: '',
  bankAccountType: '',
  name: '',
  routingNumber: ''
}

const formValidation = Yup.object().shape({
  accountNumber: Yup.string()
    .trim()
    .min(4, errorMessages.minLength(4))
    .max(17, errorMessages.maxLength(17))
    .test('numeric-string', errorMessages.mustBeNumber, value => /^[0-9]*$/gm.test(value))
    .required(errorMessages.requiredMessage),
  bankAccountType: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  routingNumber: Yup.string()
    .trim()
    .matches(/^\d{9}$/, errorMessages.exactLength(9))
    .required(errorMessages.requiredMessage)
})

const bankAccountType = [
  {
    key: 1,
    text: <FormattedMessage id='settings.checking' defaultMessage='Checking' />,
    value: 'checking'
  },
  {
    key: 2,
    text: <FormattedMessage id='settings.savings' defaultMessage='Savings' />,
    value: 'savings'
  }
]

class BankAccountsSidebar extends React.Component {
  submitHandler = async (values, { setSubmitting }) => {
    const { postNewBankAccountRequest } = this.props

    try {
      await postNewBankAccountRequest(values)
    } catch {
    } finally {
      setSubmitting(false)
    }
  }

  render() {
    const {
      closeSidebar,
      popupValues,
      intl: { formatMessage }
    } = this.props

    return (
      <CustomForm
        enableReinitialize
        initialValues={{
          ...initialFormValues,
          ...popupValues
        }}
        validationSchema={formValidation}
        onReset={closeSidebar}
        onSubmit={this.submitHandler}
        // validateOnChange={false}
        validateOnBlur={false}>
        <FlexSidebar visible={true} width='very wide' style={{ width: '630px' }} direction='right' animation='overlay'>
          <div>
            <CustomHighSegment basic>
              {popupValues ? (
                <FormattedMessage id='settings.EditBankAcc' defaultMessage='Edit Bank Account' />
              ) : (
                <FormattedMessage id='settings.AddBankAcc' defaultMessage='Add Bank Account' />
              )}
            </CustomHighSegment>
          </div>
          <FlexContent style={{ padding: '16px' }}>
            <CustomSegmentContent basic>
              <FormGroup widths='equal' data-test='settings_bank_account_accountNumber_inp'>
                <Input
                  type='text'
                  label={
                    <>
                      {formatMessage({ id: 'settings.accountNumber', defaultMessage: 'Account Number' })}
                      <Required />
                    </>
                  }
                  name='accountNumber'
                />
                <Dropdown
                  label={
                    <>
                      {formatMessage({ id: 'settings.accountType', defaultMessage: 'Account Type' })}
                      <Required />
                    </>
                  }
                  name='bankAccountType'
                  options={bankAccountType}
                  inputProps={{ 'data-test': 'settings_bank_account_popup_type_drpdn' }}
                />
              </FormGroup>
              <FormGroup widths='equal' data-test='settings_bank_account_nameNumber_inp'>
                <Input
                  type='text'
                  label={
                    <>
                      {formatMessage({ id: 'global.name', defaultMessage: 'Name' })}
                      <Required />
                    </>
                  }
                  name='name'
                />
                <Input
                  type='text'
                  label={
                    <>
                      {formatMessage({ id: 'settings.routingNumber', defaultMessage: 'Routing Number' })}
                      <Required />
                    </>
                  }
                  name='routingNumber'
                />
              </FormGroup>
            </CustomSegmentContent>
          </FlexContent>
          <BottomButtons>
            <Button type='button' basic onClick={closeSidebar} data-test='settings_bank_account_popup_reset_btn'>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                {text => text}
              </FormattedMessage>
            </Button>
            <ButtonSubmit data-test='settings_bank_account_popup_submit_btn'>
              <FormattedMessage id='global.save' defaultMessage='Save'>
                {text => text}
              </FormattedMessage>
            </ButtonSubmit>
          </BottomButtons>
        </FlexSidebar>
        <ErrorFocus />
      </CustomForm>
    )
  }
}

const mapDispatchToProps = {
  postNewBankAccountRequest,
  putBankAccountRequest,
  closeSidebar
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    country: state.settings.country,
    currency: getSafe(() => state.settings.currency, currency),
    currentTab:
      Router && Router.router && Router.router.query && Router.router.query.type
        ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
        : state.settings.tabsNames[0]
  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BankAccountsSidebar))
