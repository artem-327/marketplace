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
import ErrorFocus from '~/components/error-focus'
import { errorMessages, multipleEmails } from '~/constants/yupValidation'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  .ui.modal {
    border-top: 1px solid #dee2e6;
    box-shadow: 0 0 0 0 transparent;

    > .actions {
      background: #ffffff;
    }
  }

  .ui.button {
    font-size: 1em;
    margin: 0 0.357142857em;
    color: #848893;
    background-color: #ffffff;
    border: solid 1px #dee2e6;
    min-width: 80px;
  }

  .ui.primary.button {
    color: #ffffff;
    background-color: #2599d5;
    border: none;
  }

  .ui.grid {
    margin: 30px 0 30px 25px;
    padding: 0;

    .row {
      padding: 5px 0;
      &.header {
        padding: 2px 0;
      }

      .column {
        padding: 0 5px;
        .field {
          margin: 0;
          .ui.input {
            height: 40px;
          }
        }
      }

      .ui.button {
        min-width: 40px;
        height: 40px;
        border-radius: 3px;
      }

      .ui.button.delete {
        padding: 0;
        border: solid 1px #f16844;
        background-color: #fff0ed;
        color: #f16844;
        line-height: 1.11;
        font-size: 18px;

        .icon {
          margin: 0 10px;
          width: 18px;
          height: 20px;
          color: #f16844;
          line-height: 1.11;
          font-size: 18px;
        }
      }

      .ui.button.add {
        margin: 0;
        padding-left: 17px;
        padding-right: 17px;
        border: solid 1px #2599d5;
        background-color: #ddf1fc;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        color: #2599d5;
      }
    }
  }
`

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
    companyId: null
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
      closeEmailPopup,
      inviteBeneficialOwners,
      emailPopup,
      intl: { formatMessage }
    } = this.props

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
            closeEmailPopup()
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
