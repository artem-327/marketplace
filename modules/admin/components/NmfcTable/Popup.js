import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Modal, FormGroup, Form, Button } from 'semantic-ui-react'
import { Form as Formik, Input } from 'formik-semantic-ui-fixed-validation'
import { injectIntl } from 'react-intl'
import * as Yup from 'yup'

import { closeAddPopup } from '~/modules/admin/actions'

import { nmfcValidation } from '~/constants/yupValidation'
import { getSafe } from '~/utils/functions'
import { addNmfcNumber, editNmfcNumber } from '~/modules/admin/actions'
import { Required } from '~/components/constants/layout'
import ErrorFocus from '~/components/error-focus'

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`
class Popup extends Component {
  getInitialValues = () => {
    const { popupValues } = this.props
    if (popupValues) return popupValues

    return {
      code: '',
      description: ''
    }
  }

  validationSchema = () =>
    Yup.lazy(values => {
      return Yup.object().shape({
        code: nmfcValidation()
      })
    })

  render() {
    const {
      closeAddPopup,
      popupValues,
      intl: { formatMessage },
      config,
      addNmfcNumber,
      editNmfcNumber
    } = this.props

    let type = popupValues ? { id: 'edit', defaultMessage: 'Edit' } : { id: 'add', defaultMessage: 'Add' }

    return (
      <Modal open onClose={() => closeAddPopup()}>
        <Modal.Header>
          {formatMessage({ id: `global.${type.id}`, defaultMessage: type.defaultMessage })} {config.addEditText}
        </Modal.Header>
        <Modal.Content>
          <Formik
            validateOnChange={true}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (popupValues) {
                  await editNmfcNumber({ ...values, id: popupValues.id })
                } else {
                  await addNmfcNumber(values)
                }
                closeAddPopup()
              } catch (err) {}
              setSubmitting(false)
            }}
            validationSchema={this.validationSchema()}
            initialValues={this.getInitialValues()}
            render={props => {
              this.submitForm = props.submitForm
              return (
                <CustomForm autoComplete='off'>
                  <FormGroup widths='equal'>
                    <Input
                      name='code'
                      label={
                        <>
                          {formatMessage({ id: 'global.code', defaultMessage: '!Code' })}
                          <Required />
                        </>
                      }
                    />
                  </FormGroup>

                  <FormGroup widths='equal'>
                    <Input
                      name='description'
                      label={formatMessage({ id: 'global.description', defaultMessage: '!Description' })}
                    />
                    <ErrorFocus />
                  </FormGroup>
                </CustomForm>
              )
            }}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button type='button' onClick={() => closeAddPopup()}>
            {formatMessage({ id: 'global.cancel', defaultMessage: '!Cancel' })}
          </Button>
          <Button primary onClick={() => this.submitForm()}>
            {formatMessage({ id: `global.${type.id}`, defaultMessage: type.defaultMessage })}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeAddPopup,
  addNmfcNumber,
  editNmfcNumber
}

const mapStateToProps = ({ admin }) => {
  let config = admin.config['nmfc-numbers']

  return {
    config,
    popupValues: admin.popupValues
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Popup))
