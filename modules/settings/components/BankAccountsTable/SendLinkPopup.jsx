import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Grid } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'

//Components
import BasicButton from '../../../../components/buttons/BasicButton'
import { errorMessages, multipleEmails } from '~/constants/yupValidation'

const initialFormValues = {
  email: ''
}

const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      email: multipleEmails().required(errorMessages.requiredMessage)
    })
  )

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
                    <Grid.Column>
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
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
              <Modal.Actions>
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
              </Modal.Actions>
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
