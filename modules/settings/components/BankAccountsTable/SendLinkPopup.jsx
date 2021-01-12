import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Grid } from 'semantic-ui-react'
import { Formik } from 'formik'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
//Components
import BasicButton from '../../../../components/buttons/BasicButton'
//Services
import { initialFormValues, formValidation } from './services'
//Styles
import { ModalActions, GridColumnInputEmail } from './styles'

const SendLinkPopup = ({ isOpenPopup, closePopup, inviteToAddBankAccounts, companyId, intl: { formatMessage } }) => {
  return (
    <Modal
      open={isOpenPopup}
      closeIcon
      size='tiny'
      onClose={e => {
        closePopup()
      }}>
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        validationSchema={formValidation()}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await inviteToAddBankAccounts(companyId, values.email, 'name')
          } catch (e) {
            console.error(e)
          } finally {
            closePopup()
            setSubmitting(false)
          }
        }}>
        {({ submitForm }) => {
          return (
            <>
              <Modal.Header>
                <FormattedMessage id='settings.tables.bankAccounts.sendLink' defaultMessage='Send Link' />
              </Modal.Header>
              <Modal.Content>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <FormattedMessage
                        id='settings.sendLink.text'
                        defaultMessage='You may email a link to an account controller to add the bank accounts separately'>
                        {text => text}
                      </FormattedMessage>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <GridColumnInputEmail>
                      <Input
                        label={formatMessage({ id: 'global.emailAddress', defaultMessage: 'Email Address' })}
                        name='email'
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.enterEmailAddress',
                            defaultMessage: 'Enter Email Address'
                          }),
                          fluid: true
                        }}
                      />
                    </GridColumnInputEmail>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
              <ModalActions>
                <BasicButton
                  type='button'
                  noBorder
                  onClick={() => closePopup()}
                  data-test='settings_bank_account_send_link_popup_cancel_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                    {text => text}
                  </FormattedMessage>
                </BasicButton>
                <BasicButton
                  type='button'
                  onClick={() => submitForm()}
                  data-test='settings_bank_account_send_link_popup_send_btn'>
                  <FormattedMessage id='global.send' defaultMessage='Send'>
                    {text => text}
                  </FormattedMessage>
                </BasicButton>
              </ModalActions>
            </>
          )
        }}
      </Formik>
    </Modal>
  )
}

SendLinkPopup.propTypes = {
  isOpenPopup: PropTypes.bool,
  closePopup: PropTypes.func,
  companyId: PropTypes.number,
  inviteToAddBankAccounts: PropTypes.func,
  intl: { formatMessage: PropTypes.func }
}

SendLinkPopup.defaultProps = {
  isOpenPopup: false,
  companyId: null,
  closePopup: () => {},
  inviteToAddBankAccounts: () => {},
  intl: { formatMessage: () => {} }
}

export default injectIntl(SendLinkPopup)
