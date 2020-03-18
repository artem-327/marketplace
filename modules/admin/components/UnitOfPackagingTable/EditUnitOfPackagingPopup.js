import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeEditPopup, putEditedDataRequest } from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'

const formValidation = Yup.object().shape({
  val0: Yup.string()
    .trim()
    .min(1, 'Too short')
    .required('Required'),
  val1: Yup.number().required('Required'),
  val2: Yup.number().required('Required'),
  val3: Yup.number().required('Required'),
  val4: Yup.number().required('Required')
})

class EditUnitOfPackagingPopup extends React.Component {
  render() {
    const { closeEditPopup, currentTab, config, popupValues, putEditedDataRequest, measureOptions } = this.props

    const { id } = popupValues

    const initialFormValues = {
      val0: popupValues[config.edit[0].name],
      val1: popupValues.measureTypeId,
      val2: popupValues.height,
      val3: popupValues.length,
      val4: popupValues.width
    }

    return (
      <Modal closeIcon onClose={() => closeEditPopup()} open centered={false}>
        <Modal.Header>
          <FormattedMessage id='global.edit' defaultMessage='Edit' /> {config.addEditText}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeEditPopup}
            onSubmit={async (values, { setSubmitting }) => {
              let data = {
                [config.edit[0].name]: values.val0.trim(),
                [config.edit[1].name]: values.val1,
                [config.edit[2].name]: parseFloat(values.val2),
                [config.edit[3].name]: parseFloat(values.val3),
                [config.edit[4].name]: parseFloat(values.val4)
              }
              try {
                await putEditedDataRequest(config, id, data)
              } catch (error) {
                console.error(error)
              } finally {
                setSubmitting(false)
              }
            }}>
            <FormGroup widths='equal' data-test='admin_edit_unit_packaging_name_inp'>
              <Input inputProps={{ type: config.edit[0].type }} label={config.edit[0].title} name='val0' />
            </FormGroup>
            <FormGroup widths='equal'>
              <Dropdown
                label={config.edit[1].title}
                options={measureOptions}
                name='val1'
                inputProps={{ 'data-test': 'admin_edit_unit_packaging_type_drpdn' }}
              />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_edit_unit_packaging_height_inp'>
              <Input
                inputProps={{ type: config.edit[2].type, step: config.edit[2].step }}
                label={config.edit[2].title}
                name='val2'
                step={config.edit[2].step}
              />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_edit_unit_packaging_length_inp'>
              <Input
                inputProps={{ type: config.edit[3].type, step: config.edit[3].step }}
                label={config.edit[3].title}
                name='val3'
                step={config.edit[3].step}
              />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_edit_unit_packaging_width_inp'>
              <Input
                inputProps={{ type: config.edit[4].type, step: config.edit[4].step }}
                label={config.edit[4].title}
                name='val4'
                step={config.edit[4].step}
              />
            </FormGroup>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset data-test='admin_edit_unit_packaging_cancel_btn'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                  {text => text}
                </FormattedMessage>
              </Button.Reset>
              <Button.Submit data-test='admin_edit_unit_packaging_save_btn'>
                <FormattedMessage id='global.save' defaultMessage='Save'>
                  {text => text}
                </FormattedMessage>
              </Button.Submit>
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
  let cfg = state.admin.config[state.admin.currentTab.name]
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    popupValues: state.admin.popupValues,
    measureOptions: state.admin.measureTypes.map(d => {
      return {
        id: d.id,
        text: d.name,
        value: d.id
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUnitOfPackagingPopup)
