import { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Grid, GridRow, GridColumn, Icon, Dimmer, Loader } from 'semantic-ui-react'
import { Formik } from 'formik'

import * as Actions from '../../actions'

import { Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'

import { getSafe } from '~/utils/functions'
import { AddressForm } from '~/modules/address-form'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import { removeEmpty } from '~/utils/functions'
import { EmailConfirmation } from '~/modules/velloci-register/components/EmailConfirmation'
import ErrorFocus from '~/components/error-focus'
import { errorMessages, multipleEmails } from '~/constants/yupValidation'
import { StyledModal } from '../styles'

const initialFormValues = {
  invitations: [{ name: '', email: '' }]
}

const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      invitations: Yup.array()
        .min(1, errorMessages.minOneRole)
        .of(
          Yup.object().shape({
            name: Yup.string(errorMessages.requiredMessage).trim().required(errorMessages.requiredMessage),
            email: multipleEmails().required(errorMessages.requiredMessage)
          })
        )
    })
  )

class BeneficialOwnersPopupPopup extends Component {
  state = {
    companyId: null,
    showConfirmation: false
  }

  componentDidMount() {
    let companyId = null
    if (!this.props.companyId && typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(getSafe(() => window.location.search, ''))
      if (searchParams.has('companyId')) {
        companyId = Number(searchParams.get('companyId'))
      }
    } else {
      companyId = this.props.companyId
    }
    this.setState({ companyId })
  }

  render() {
    const {
      activeStep,
      closeEmailPopup,
      emailPopup,
      intl: { formatMessage },
      inviteBeneficialOwners,
      nextStep
    } = this.props

    if (this.state.showConfirmation) {
      return <EmailConfirmation
        activeStep={activeStep}
        nextStep={nextStep}
        onClose={() => closeEmailPopup()}
      />
    }

    return (
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        validationSchema={formValidation()}
        onReset={closeEmailPopup}
        onSubmit={async (values, { setSubmitting }) => {
          const { companyId } = this.state

          try {
            await inviteBeneficialOwners(values, companyId)
            // closeEmailPopup()
            this.setState({ showConfirmation: true });
          } catch (e) {
            console.error(e)
          }
          setSubmitting(false)
        }}>
        {formikProps => {
          const { values, setFieldValue, isSubmitting, handleSubmit } = formikProps
          return (
            <StyledModal onClose={() => closeEmailPopup()} open centered={true} size='small'>
              <Dimmer inverted active={emailPopup.isUpdating || isSubmitting}>
                <Loader />
              </Dimmer>
              <Modal.Header>
                <FormattedMessage id='velloci.emailPopup.header' defaultMessage='Invite Beneficial Owners' />
              </Modal.Header>
              <Modal.Content scrolling>
                <Grid>
                  <GridRow className='header'>
                    <GridColumn width={7}>{formatMessage({ id: 'global.name', defaultMessage: 'Name' })}</GridColumn>
                    <GridColumn width={7}>{formatMessage({ id: 'global.email', defaultMessage: 'E-mail' })}</GridColumn>
                  </GridRow>
                  {values.invitations.map((value, i) => (
                    <GridRow key={i}>
                      <GridColumn width={7} data-test={`beneficial_owner_name${i}_inp`}>
                        <Input
                          name={`invitations[${i}].name`}
                          inputProps={{
                            placeholder: formatMessage({ id: 'global.enterName', defaultMessage: 'Enter Name' }),
                            fluid: true
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={7} data-test={`beneficial_owner_email${i}_inp`}>
                        <Input
                          name={`invitations[${i}].email`}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'global.enterEmailAddress',
                              defaultMessage: 'Enter Email Address'
                            }),
                            fluid: true
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={2}>
                        {i > 0 ? (
                          <Button
                            className='delete'
                            data-test='beneficial_owner_emails_delete_btn'
                            onClick={() => {
                              let invitations = values.invitations.slice()
                              invitations.splice(i, 1)
                              setFieldValue('invitations', invitations)
                            }}>
                            <Icon name='trash alternate outline' />
                          </Button>
                        ) : null}
                      </GridColumn>
                    </GridRow>
                  ))}
                  <GridRow>
                    <GridColumn width={14}>
                      <Button
                        className='add'
                        floated='right'
                        data-test='beneficial_owner_emails_add_btn'
                        onClick={() => {
                          let invitations = values.invitations.slice()
                          invitations.push({ name: '', email: '' })
                          setFieldValue('invitations', invitations)
                        }}>
                        {formatMessage({ id: 'global.add', defaultMessage: 'Add' })}
                      </Button>
                    </GridColumn>
                    <GridColumn width={2}></GridColumn>
                  </GridRow>
                </Grid>
              </Modal.Content>
              <Modal.Actions>
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset data-test='beneficial_owner_emails_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Reset>
                  <Button.Submit
                    data-test='beneficial_owner_emails_submit_btn'
                    onClick={handleSubmit}
                    disabled={emailPopup.isUpdating || isSubmitting}>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Submit>
                </div>
              </Modal.Actions>
              <ErrorFocus />
            </StyledModal>
          )
        }}
      </Formik>
    )
  }
}

const mapStateToProps = store => ({
  ...store.vellociRegister,
  companyId: getSafe(() => store.auth.identity.company.id, 0)
})

export default injectIntl(connect(mapStateToProps, { ...Actions })(BeneficialOwnersPopupPopup))
