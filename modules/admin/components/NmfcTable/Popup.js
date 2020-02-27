import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup, Button } from 'semantic-ui-react'
import { closeAddPopup } from '~/modules/admin/actions'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { nmfcValidation } from '../../../../constants/yupValidation'
import { addNmfcNumber, editNmfcNumber } from '~/modules/admin/actions'

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
          {formatMessage({ id: `global.${type.id}`, defaultMessage: type.defaultMessage })}{' '}
          {formatMessage({ id: config.addEditText })}
        </Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={async (values, { setSubmitting }) => {
              let payload = {
                ...values,
                code: values.code.replace('-', '')
              }

              if (popupValues) {
                await editNmfcNumber({ ...payload, id: popupValues.id })
              } else {
                await addNmfcNumber(payload)
              }
              setSubmitting(false)
              closeAddPopup()
            }}
            validationSchema={validationSchema}
            initialValues={this.getInitialValues()}
            render={props => {
              this.submitForm = props.submitForm
              return (
                <>
                  <FormGroup widths='equal'>
                    <Input name='code' label={formatMessage({ id: 'global.code', defaultMessage: '!Code' })} />
                  </FormGroup>

                  <FormGroup widths='equal'>
                    <Input
                      name='description'
                      label={formatMessage({ id: 'global.description', defaultMessage: '!Description' })}
                    />
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
