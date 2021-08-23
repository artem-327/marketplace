import {
  Modal,
  FormGroup,
  Grid,
  GridRow,
  GridColumn
} from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import ErrorFocus from '../../../../components/error-focus'
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'
// Services
import { errorMessages } from '../../../../constants/yupValidation'
// Styles
import { Required } from '../../../../components/constants/layout'

/**
 * Validation of form.
 * @category Admin Settings - Edit Packaging Types
 * @method
 */
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

/**
 * EditUnitOfPackagingPopup Component
 * @category Admin Settings - Edit Packaging Types
 * @components
 */
const EditUnitOfPackagingPopup = props => {
  const {
    closeEditPopup,
    config,
    popupValues,
    postNewRequest,
    putEditedDataRequest,
    measureOptions,
    dimensionUnits,
    weightUnits
  } = props

  /**
   * Get initial values for form.
   * @category Admin Settings - Edit Packaging Types
   * @method
   */
  const initialFormValues = popupValues
    ? {
      val0: popupValues.name,
      val1: popupValues.measureTypeId,
      val2: popupValues.height,
      val3: popupValues.length,
      val4: popupValues.width,
      val5: popupValues.dimensionUnit?.id,
      val6: popupValues.palletPkgMax,
      val7: popupValues.palletPkgMin,
      val8: popupValues.weight,
      val9: popupValues.weightUnit?.id
    } : {
      val0: '',
      val1: '',
      val2: '',
      val3: '',
      val4: '',
      val5: '',
      val6: '',
      val7: '',
      val8: '',
      val9: ''
    }

  return (
    <Modal closeIcon onClose={() => closeEditPopup()} open centered={false}>
      <Modal.Header>
        {popupValues ? (
          <><FormattedMessage id='global.edit' defaultMessage='Edit' /> {config.addEditText}</>
        ) : (
          <><FormattedMessage id='global.add' defaultMessage='Add' /> {config.addEditText}</>
        )}
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
              if (popupValues) {
                await putEditedDataRequest(config, popupValues.id, data)
              } else {
                await postNewRequest(config, data)
              }
              if (config.globalReload) props[config.globalReload]()
            } catch (error) {
              console.error(error)
            } finally {
              setSubmitting(false)
            }
          }}>


          <Grid>
            <GridRow>
              <GridColumn width={10}>
                <FormGroup widths='equal' data-test='admin_edit_unit_packaging_name_inp'>
                  <Input
                    inputProps={{ type: config.edit[0].type }}
                    label={
                      <>
                        {config.edit[0].title}
                        <Required />
                      </>
                    }
                    name='val0'
                  />
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
              </GridColumn>
              <GridColumn width={6}>
                <UploadAttachment
                  acceptFiles='image/jpeg, image/png, image/gif, image/svg'
                  name='packagingTypeImage'
                  filesLimit={1}
                  fileMaxSize={2}
                  onChange={async files => {
                    if (files.length) {
                      try {
                        //await ...
                      } catch (error) {
                        console.error(error)
                      }
                    }
                  }}
                  attachments={popupValues && popupValues.packagingTypeImage ? [popupValues.packagingTypeImage] : []}
                  removeAttachment={async () => {
                    try {
                      //await ...
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                  emptyContent={
                    <div>nic tam neni zatim</div>
                  }
                  uploadedContent={
                    <div>
                      cosi tu je nahrane uz
                    </div>
                  }
                />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn width={3}>
                <FormGroup widths='equal' data-test='admin_edit_unit_packaging_width_inp'>
                  W
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
              </GridColumn>

              <GridColumn width={3}>
                <FormGroup widths='equal' data-test='admin_edit_unit_packaging_length_inp'>
                  L
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
              </GridColumn>

              <GridColumn width={3}>
                <FormGroup widths='equal' data-test='admin_edit_unit_packaging_height_inp'>
                  H
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
              </GridColumn>
              <GridColumn width={5}>
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
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn width={3}>
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
              </GridColumn>
              <GridColumn width={6}></GridColumn>
              <GridColumn width={5}>
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
              </GridColumn>
              <GridColumn width={2}></GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn width={3}>
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
              </GridColumn>
              <GridColumn width={6}></GridColumn>
              <GridColumn width={3}>
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
              </GridColumn>
              <GridColumn width={4}></GridColumn>
            </GridRow>
          </Grid>
          <div style={{ textAlign: 'right' }}>
            <Button.Reset data-test='admin_edit_unit_packaging_cancel_btn'>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
            </Button.Reset>
            <Button.Submit data-test='admin_edit_unit_packaging_save_btn'>
              <FormattedMessage id='global.save' defaultMessage='Save' />
            </Button.Submit>
          </div>
          <ErrorFocus />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

EditUnitOfPackagingPopup.propTypes = {
  dimensionUnits: PropTypes.array,
  weightUnits: PropTypes.array,
  measureOptions: PropTypes.array,
  closeEditPopup: PropTypes.func,
  putEditedDataRequest: PropTypes.func,
  popupValues: PropTypes.object,
  config: PropTypes.object
}

EditUnitOfPackagingPopup.defaultValues = {
  dimensionUnits: [],
  weightUnits: [],
  measureOptions: [],
  closeEditPopup: () => {},
  putEditedDataRequest: () => {},
  popupValues: null,
  config: {}
}

export default EditUnitOfPackagingPopup
