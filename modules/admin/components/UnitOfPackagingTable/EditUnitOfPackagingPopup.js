import { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeEditPopup, putEditedDataRequest } from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { Required } from '~/components/constants/layout'
import ErrorFocus from '~/components/error-focus'
import {makeGetDimensionUnits, makeGetWeightUnits} from '../../selectors'
import { errorMessages } from '~/constants/yupValidation'

const formValidation = Yup.object().shape({
  val0: Yup.string().trim().min(1, 'Too short').required('Required'),
  val1: Yup.number().required('Required'),
  val2: Yup.number().moreThan(0, errorMessages.greaterThan(0)).required('Required'),
  val3: Yup.number().moreThan(0, errorMessages.greaterThan(0)).required('Required'),
  val4: Yup.number().moreThan(0, errorMessages.greaterThan(0)).required('Required'),
  val5: Yup.number().required('Required'),
  val6: Yup.number().integer(errorMessages.integer).min(1, errorMessages.minimum(1)).required('Required'),
  val7: Yup.number().integer(errorMessages.integer).min(1, errorMessages.minimum(1)).required('Required'),
  val8: Yup.number().min(0, errorMessages.minimum(0)).required('Required'),
  val9: Yup.number().required('Required')
})

class EditUnitOfPackagingPopup extends Component {
  render() {
    const { closeEditPopup, config, popupValues, putEditedDataRequest, measureOptions, dimensionUnits, weightUnits } = this.props

    const { id } = popupValues

    const initialFormValues = {
      val0: popupValues[config.edit[0].name],
      val1: popupValues.measureTypeId,
      val2: popupValues.height,
      val3: popupValues.length,
      val4: popupValues.width,
      val5: popupValues.dimensionUnit?.id,
      val6: popupValues.palletPkgMax,
      val7: popupValues.palletPkgMin,
      val8: popupValues.weight,
      val9: popupValues.weightUnit?.id
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
                [config.edit[4].name]: parseFloat(values.val4),
                [config.edit[5].name]: values.val5,
                [config.edit[6].name]: parseFloat(values.val6),
                [config.edit[7].name]: parseFloat(values.val7),
                [config.edit[8].name]: parseFloat(values.val8),
                [config.edit[9].name]: values.val9
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
                label={
                  <>
                    {config.edit[1].title}
                    <Required />
                  </>
                }
                options={measureOptions}
                name='val1'
                inputProps={{ 'data-test': 'admin_edit_unit_packaging_type_drpdn' }}
              />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_edit_unit_packaging_height_inp'>
              <Input
                inputProps={{ type: config.edit[2].type, step: config.edit[2].step }}
                label={
                  <>
                    {config.edit[2].title}
                    <Required />
                  </>
                }
                name='val2'
                step={config.edit[2].step}
              />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_edit_unit_packaging_length_inp'>
              <Input
                inputProps={{ type: config.edit[3].type, step: config.edit[3].step }}
                label={
                  <>
                    {config.edit[3].title}
                    <Required />
                  </>
                }
                name='val3'
                step={config.edit[3].step}
              />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_edit_unit_packaging_width_inp'>
              <Input
                inputProps={{ type: config.edit[4].type, step: config.edit[4].step }}
                label={
                  <>
                    {config.edit[4].title}
                    <Required />
                  </>
                }
                name='val4'
                step={config.edit[4].step}
              />
            </FormGroup>
            <FormGroup widths='equal'>
              <Dropdown
                label={
                  <>
                    {config.edit[5].title}
                    <Required />
                  </>
                }
                options={dimensionUnits}
                name='val5'
                inputProps={{ 'data-test': 'admin_add_pallet_pkg_dimension_unit' }}
              />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_add_pallet_pkg_max_inp'>
              <Input
                inputProps={{ type: config.edit[6].type, step: config.edit[6].step }}
                label={
                  <>
                    {config.edit[6].title}
                    <Required />
                  </>
                }
                name='val6'
                step={config.edit[6].step}
              />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_add_pallet_pkg_min_inp'>
              <Input
                inputProps={{ type: config.edit[7].type, step: config.edit[7].step }}
                label={
                  <>
                    {config.edit[7].title}
                    <Required />
                  </>
                }
                name='val7'
                step={config.edit[7].step}
              />
            </FormGroup>
            <FormGroup widths='equal' data-test='admin_add_pallet_pkg_weight'>
              <Input
                inputProps={{ type: config.edit[8].type, step: config.edit[8].step }}
                label={
                  <>
                    {config.edit[8].title}
                    <Required />
                  </>
                }
                name='val8'
                step={config.edit[8].step}
              />
            </FormGroup>
            <FormGroup widths='equal'>
              <Dropdown
                label={
                  <>
                    {config.edit[9].title}
                    <Required />
                  </>
                }
                options={weightUnits}
                name='val9'
                inputProps={{ 'data-test': 'admin_add_pallet_pkg_weight_unit' }}
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
            <ErrorFocus />
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

const makeMapStateToProps = () => {
  const getDimensionUnits = makeGetDimensionUnits()
  const getWeightUnits = makeGetWeightUnits()
  const mapStateToProps = state => {
    let cfg = state.admin.config['packaging-types']
    return {
      config: cfg,
      popupValues: state.admin.popupValues,
      measureOptions: state.admin.measureTypes.map(d => {
        return {
          id: d.id,
          text: d.name,
          value: d.id
        }
      }),
      dimensionUnits: getDimensionUnits(state),
      weightUnits: getWeightUnits(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(EditUnitOfPackagingPopup)
