import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeEditPopup, putEditedDataRequest } from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'

import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'

const formValidation = Yup.object().shape({
  val0: Yup.string().min(1, 'Too short').required('Required'),
  val1: Yup.string().min(1, 'Too short').required('Required'),
  val2: Yup.number().required('Required')
})

class EditUnitOfMeasurePopup extends React.Component {
  render() {
    const {
      closeEditPopup,
      currentTab,
      config,
      popupValues,
      putEditedDataRequest,
      measureOptions,
      toastManager
    } = this.props

    const { id } = popupValues

    const initialFormValues = {
      val0: popupValues[config.edit[0].name],
      val1: popupValues[config.edit[1].name],
      val2: popupValues.measureTypeId,
    }

    return (
      <Modal open centered={false}>
        <Modal.Header><FormattedMessage id='global.edit' defaultMessage='Edit' /> {config.addEditText}</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeEditPopup}
            onSubmit={async (values, { setSubmitting }) => {
              let data = {
                [config.edit[0].name]: values.val0,
                [config.edit[1].name]: values.val1,
                [config.edit[2].name]: values.val2,
              }
              await putEditedDataRequest(config, id, data)

              toastManager.add(generateToastMarkup(
                <FormattedMessage id='notifications.unitOfMeasurementUpdated.header' />,
                <FormattedMessage id='notifications.unitOfMeasurementUpdated.content' values={{ name: values.val0 }} />
              ),
                {
                  appearance: 'success'
                })

              setSubmitting(false)
            }}
          >
            <FormGroup widths='equal' data-test='admin_edit_unit_measure_name_inp' >
              <Input type={config.edit[0].type} label={config.edit[0].title} name='val0' />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_edit_unit_measure_nameAbb_inp'>
              <Input type={config.edit[1].type} label={config.edit[1].title} name='val1' />
            </FormGroup>
            <FormGroup widths='equal'>
              <Dropdown label={config.edit[2].title} options={measureOptions} name='val2' inputProps={{ 'data-test': 'admin_edit_unit_measure_type_drpdn' }} />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Button.Reset data-test='admin_edit_unit_measure_cancel_btn'><FormattedMessage id='global.cancel' defaultMessage='Cancel' /></Button.Reset>
              <Button.Submit data-test='admin_edit_unit_measure_save_btn'><FormattedMessage id='global.save' defaultMessage='Save' /></Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeEditPopup,
  putEditedDataRequest
}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    popupValues: state.admin.popupValues,
    measureOptions: state.admin.measureTypes.map(d => {
      return {
        id: d.id,
        text: d.name,
        value: d.id,
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditUnitOfMeasurePopup))
