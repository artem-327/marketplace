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

const SendLinkPopup = ({ isOpenPopup, closePopup, intl: { formatMessage } }) => {
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
            //await props.sendLink(values.email)
            closePopup()
          } catch (e) {
            console.error(e)
          }
          setSubmitting(false)
        }}>
        {formikProps => {
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
                  noBorder
                  onClick={() => closePopup()}
                  data-test='settings_bank_account_send_link_popup_cancel_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                    {text => text}
                  </FormattedMessage>
                </BasicButton>
                <BasicButton
                  onClick={() => console.log('add endpoint')} //TODO add endpoint
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
  intl: { formatMessage: PropTypes.func }
}

SendLinkPopup.defaultProps = {
  isOpenPopup: false,
  closePopup: () => {},
  intl: { formatMessage: () => {} }
}

export default injectIntl(SendLinkPopup)
