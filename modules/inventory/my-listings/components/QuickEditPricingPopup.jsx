import { useEffect } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Grid } from 'semantic-ui-react'
import { Button } from 'formik-semantic-ui-fixed-validation'
// Actions
import * as Actions from '../../actions'
// Styles
import { StyledForm } from './MyListings.styles'
// Services
import { withDatagrid } from '../../../datagrid'
import { validationSchema, renderPricingTiers, submitForm } from './QuickEditPricingPopup.services'

const QuickEditPricingPopup = props => {
  let formikProps
  let obj

  useEffect(() => {
    if (props.focusInput && typeof obj[props.focusInput] !== 'undefined') obj[props.focusInput].focus()
  }, [])
  
  const {
    closePricingEditPopup,
    intl: { formatMessage },
    rawData
  } = props

  return (
    <StyledForm
      initialValues={props.rawData}
      validationSchema={validationSchema(rawData.minPkg)}
      onSubmit={async () => {
        await submitForm(props, formikProps)
      }}>
      {formikProps => {
        formikProps = formikProps
        const { values, setFieldValue } = formikProps

        return (
          <>
            <div className='high-segment'>
              {formatMessage({ id: 'myInventory.editPricing', defaultMessage: 'Edit Pricing' })}
            </div>

            <div className='content'>
              <Grid>{renderPricingTiers(values, setFieldValue, props, obj)}</Grid>
            </div>

            <div className='bottom-buttons'>
              <Button
                size='large'
                inputProps={{ type: 'button' }}
                onClick={closePricingEditPopup}
                data-test='inventory_quick_edit_pricing_popup_cancel_btn'>
                {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
              </Button>
              <Button.Submit
                primary
                size='large'
                type='button'
                data-test='inventory_quick_edit_pricing_popup_save_btn'>
                {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
              </Button.Submit>
            </div>
          </>
        )
      }}
    </StyledForm>
  )
}

const mapStateToProps = state => {
  return {}
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(QuickEditPricingPopup)))
