import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup, Button } from 'semantic-ui-react'
import { closeAddPopup } from '~/modules/admin/actions'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { nmfcValidation } from '../../../../constants/yupValidation'
import { getSafe } from '~/utils/functions'
import { addNmfcNumber, editNmfcNumber } from '~/modules/admin/actions'
import { Required } from '~/components/constants/layout'
import ErrorFocus from '~/components/error-focus'

const validationSchema = Yup.object().shape({
  code: nmfcValidation()
})

class Popup extends Component {
  getInitialValues = () => {
    const { popupValues } = this.props
    if (popupValues) return popupValues

    return {
      code: '',
      description: ''
    }
  }

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
          <Form
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
            validationSchema={validationSchema}
            initialValues={this.getInitialValues()}
            render={props => {
              this.submitForm = props.submitForm
              return (
                <>
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
                </>
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
  let config = admin.config[admin.currentTab.name]

  return {
    config,
    popupValues: admin.popupValues
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Popup))
