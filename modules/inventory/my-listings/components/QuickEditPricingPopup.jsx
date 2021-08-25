import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Grid } from 'semantic-ui-react'
import { Button } from 'formik-semantic-ui-fixed-validation'
import PropTypes from 'prop-types'
// Actions
import * as Actions from '../../actions'
// Styles
import { StyledForm } from './MyListings.styles'
// Services
import { withDatagrid } from '../../../datagrid'
import { validationSchema, renderPricingTiers, submitForm } from './QuickEditPricingPopup.services'

/**
 * QuickEditPricingPopup Component
 * @category Inventory - My Listings
 * @components
 */
const QuickEditPricingPopup = props => {
  const {
    closePricingEditPopup,
    intl: { formatMessage },
    rawData,
    setState,
    rIndex,
    r
  } = props

  return (
    <StyledForm
      initialValues={props.rawData}
      validationSchema={validationSchema(rawData.minPkg)}
      onSubmit={async values => {
        await submitForm(props, values, setState)
      }}
      render = {formikProps => {
        const { values, setFieldValue } = formikProps

        return (
          <>
            <div className='high-segment'>
              {formatMessage({ id: 'myInventory.editPricing', defaultMessage: 'Edit Pricing' })}
            </div>

            <div className='content'>
              <Grid>
                {renderPricingTiers(values, setFieldValue, props)}
              </Grid>
            </div>

            <div className='bottom-buttons'>
              <Button
                size='large'
                inputProps={{ type: 'button' }}
                onClick={() => {
                  setState(prevState => {
                    let newRows = prevState.rows
                    newRows[rIndex].pricingTiers = r.pricingTiers
                    newRows[rIndex].rawData.pricingTiers = r.pricingTiers
                    return {
                      ...prevState,
                      rows: newRows
                    }
                  })
                  closePricingEditPopup()
                }}
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
    />
  )
}

QuickEditPricingPopup.propTypes = {
  focusInput: PropTypes.string,
  intl: PropTypes.object,
  rawData: PropTypes.object,
  datagrid: PropTypes.object,
  closePricingEditPopup: PropTypes.func,
  addProductOffer: PropTypes.func
}

QuickEditPricingPopup.defaultProps = {
  focusInput: '',
  intl: {},
  rawData: {},
  datagrid: {},
  closePricingEditPopup: () => {},
  addProductOffer: () => {}
}

export default withDatagrid(connect(null, { ...Actions })(injectIntl(QuickEditPricingPopup)))
