import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as val from 'yup'
import { currencyId, currencySymbol } from '~/constants/index'
import { Required } from '~/components/constants/layout'
import styled from 'styled-components'
import { getSafe, removeEmpty } from '~/utils/functions'
import { withDatagrid } from '~/modules/datagrid'

import {
  Grid,
  GridRow,
  GridColumn,
  Icon,
} from 'semantic-ui-react'

const StyledForm = styled(Form)`
  .high-segment {
    padding: 16px 30px;
    
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    color: #20273a;
    height: 50px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
    background-color: #ffffff;
  }

  .content {
    max-height: 60vh;
    overflow-y: auto;
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
          .ui.input,
          .ui.dropdown {
            height: 40px;
          }
          .ui.disabled {
            opacity: 1;
            .dropdown.icon {
              opacity: 0.45;
            }
          }
        }

        .right-labeled {         
          position: relative;
          > div.label {
            position: absolute !important;
            height: 28px !important;
            max-height: 28px !important;
            min-width: 28px;            
            top: 6px;
            right: 6px;
            border-radius: 2px;
            text-align: center;    
            padding: 4px 6px 6px 6px;    
          }
          
          &.price > div.label {
            color: #84c225;
            background-color: rgba(132, 194, 37, 0.15);
          }
          
          &.quantity > div.label {
            color: #848893;
            background-color: #edeef2;
          }
        }
      }

      .column:nth-child(1) {
        width: 210px;
      }
      .column:nth-child(2) {
        width: 130px;
        padding-right: 15px;
      }
      .column:nth-child(3) {
        width: 130px;
      }
      .column:nth-child(4) {
        width: 50px;
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
  
  .bottom-buttons {
    position: relative;
    overflow: visible;
    margin: 0;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
    padding: 10px 5px;
    text-align: right;
  
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
    
    .ui.modal & {
      border-top: 1px solid #dee2e6;
      box-shadow: 0 0 0 0 transparent;
    }  
  }
`

val.addMethod(val.object, 'uniqueProperty', function(propertyName, message) {
  return this.test('unique', message, function(value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const currentIndex = options.indexOf(value)

    const subOptions = options.slice(0, currentIndex)

    if (subOptions.some(option => option[propertyName] === value[propertyName])) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message
      })
    }

    return true
  })
})

const validationSchema = (min) => val.object().shape({
  pricingTiers: val.array().of(
    val
      .object()
      .uniqueProperty('quantityFrom', 'Quantity has to be unique')
      .shape({
        quantityFrom: val
          .number()
          .typeError(errorMessages.mustBeNumber)
          .required(errorMessages.requiredMessage)
          //.moreThan(min, errorMessages.greaterThan(min))
          .min(min, errorMessages.minimum(min)),
        pricePerUOM: val
          .number()
          .typeError(errorMessages.mustBeNumber)
          .required(errorMessages.requiredMessage)
          .moreThan(0, errorMessages.greaterThan(0))
          .test('maxdec', errorMessages.maxDecimals(3), val => {
            return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
          })
      })
  )
})

class QuickEditPricingPopup extends React.Component {

  componentDidMount() {
    const { pricingEditOpenId, pricingEditValues } = this.props

    //console.log('!!!!!!!!!! componentDidMount pricingEditOpenId', pricingEditOpenId)
    //console.log('!!!!!!!!!! componentDidMount pricingEditValues', pricingEditValues)
    //console.log('!!!!!!!!!! componentDidMount formikProps', this.formikProps)

    if (pricingEditOpenId && this.formikProps && pricingEditValues) {
      this.formikProps.values.pricingTiers = pricingEditValues
    }
  }

  componentWillUnmount = async () => {
    const { pricingEditOpenId, pricingEditValues } = this.props

    //console.log('!!!!!!!!!! componentWillUnmount props', this.props)
    //console.log('!!!!!!!!!! componentWillUnmount pricingEditValues', pricingEditValues)

    if (this.formikProps && pricingEditValues !== this.formikProps.values.pricingTiers) {
      await this.props.handleVariableSave('pricingEditValues', this.formikProps.values.pricingTiers)
    }
  }

  renderPricingTiers = () => {
    const {
      intl: { formatMessage }
    } = this.props

    let {
      values,
      touched,
      setTouched,
      setFieldTouched,
      setFieldValue,
      validateForm,
      submitForm,
      setSubmitting,
      resetForm
    } = this.formikProps

    const options = [{
      key: values.companyProduct.packagingUnit.id,
      text: values.companyProduct.packagingUnit.name,
      value: values.companyProduct.packagingUnit.name
    }]
    let tiers = []

    for (let i = 0; i < values.pricingTiers.length; i++) {
      tiers.push(
        <GridRow>
          <GridColumn>
            <div className='quantity right-labeled'>
              <Input
                name={`pricingTiers[${i}].quantityFrom`}
                inputProps={{
                  placeholder: '0'
                }}
              />
              <div className='label'>
                {formatMessage({ id: 'myInventory.andAbove', defaultMessage: 'and above' })}
              </div>
            </div>
          </GridColumn>

          <GridColumn>
            <Dropdown
              name={'companyProduct.packagingUnit.name'}
              inputProps={{ disabled: true, className: 'unit' }}
              options={options}
              readOnly={true}
            />
          </GridColumn>

          <GridColumn>
            <div className='price right-labeled'>
              <Input
                name={`pricingTiers[${i}].pricePerUOM`}
                inputProps={{
                  placeholder: '0.00'
                }}
              />
              <div className='label'>{currencySymbol}</div>
            </div>
          </GridColumn>

          <GridColumn>
            {
              i > 0
                ? (<Button
                    className='delete'
                    onClick={() => {
                      let pricingTiers = values.pricingTiers.slice()
                      pricingTiers.splice(i, 1)
                      setFieldValue('pricingTiers', pricingTiers)
                    }}
                  >
                    <Icon name='trash alternate outline' />
                  </Button>
                ) : null
            }
          </GridColumn>
        </GridRow>
      )
    }
    tiers.push(
      <GridRow>
        <GridColumn></GridColumn>
        <GridColumn></GridColumn>
        <GridColumn>
          <Button
            className='add'
            floated='right'
            onClick={() => {
              let pricingTiers = values.pricingTiers.slice()
              pricingTiers.push({ quantityFrom: '', pricePerUOM: '' })
              setFieldValue('pricingTiers', pricingTiers)
            }}
          >
            {formatMessage({ id: 'global.add', defaultMessage: 'Add' })}
          </Button>
        </GridColumn>
        <GridColumn></GridColumn>
      </GridRow>
    )

    return (
      <>
        <GridRow className='header'>
          <GridColumn>
            {formatMessage({ id: 'global.quantity', defaultMessage: 'Quantity' })}
          </GridColumn>
          <GridColumn>
          </GridColumn>
          <GridColumn>
            {formatMessage({ id: 'global.price', defaultMessage: 'Price' })}
          </GridColumn>
          <GridColumn>
          </GridColumn>
        </GridRow>
        {tiers}
      </>
    )
  }

  submitForm = async () => {
    const {
      closePricingEditPopup,
      rawData,
      datagrid,
      addProductOffer
    } = this.props

    let {
      values,
      setSubmitting,
    } = this.formikProps

    let sendSuccess = false
    let isGrouped = getSafe(() => rawData.grouped, false)
    let data = null

    let payload = {
      anonymous: rawData.anonymous,
      assayMax: rawData.assayMax,
      assayMin: rawData.assayMin,
      broadcasted: rawData.broadcasted,
      certOfAnalysis: getSafe(() => rawData.certOfAnalysis.id, null),
      product: getSafe(() => rawData.companyProduct.id, null),
      productCondition: getSafe(() => rawData.condition.id, null),
      conditionNotes: rawData.conditionNotes,
      conforming: rawData.conforming,
      costPerUOM: rawData.costPerUOM,
      costRecords: rawData.costRecords
        ? rawData.costRecords.map(d =>
          ({
            attachment: d.attachment,
            description: d.description,
            // ! ! lotNumber ! ! ??
            value: d.value
          })
        )
        : null,
      externalNotes: rawData.externalNotes,
      productForm: getSafe(() => rawData.form.id, null),
      productGrades: rawData.grades
        ? rawData.grades.map(d => ({ id: d.id }))
        : null,
      inStock: rawData.inStock,
      internalNotes: rawData.internalNotes,
      leadTime: rawData.leadTime,
      lotExpirationDate: rawData.lotExpirationDate,
      lotManufacturedDate: rawData.lotManufacturedDate,
      lotNumber: rawData.lotNumber,
      minimum: rawData.minPkg,
      origin: getSafe(() => rawData.origin.id, null),
      pkgAvailable: rawData.pkgAvailable,
      pricingTiers: values.pricingTiers.map(d => ({
        quantityFrom: Number(d.quantityFrom),
        price: Number(d.pricePerUOM)
      }))
      ,
      splits: rawData.splitPkg,
      expirationDate: rawData.validityDate,
      warehouse: getSafe(() => rawData.warehouse.id, null)
    }
    const attachmentFiles = rawData.attachments.map(d => ({ id: d.id }))
    removeEmpty(payload)

    try {
      data = await addProductOffer(payload, rawData.id, false, isGrouped, attachmentFiles)
      datagrid.updateRow(data.id, () => data)
      sendSuccess = true
    } catch (e) {
      console.error(e)
    }
    setSubmitting(false)
    if (sendSuccess) {
      closePricingEditPopup()
    }
  }

  render() {
    const {
      closePricingEditPopup,
      intl: { formatMessage },
      rawData
    } = this.props

    return (
      <StyledForm
        initialValues={rawData}
        validationSchema={validationSchema(rawData.minPkg)}

        onSubmit={async () => {
          await this.submitForm()
        }}
      >
        {formikProps => {
          this.formikProps = formikProps

          return (
            <>
              <div className='high-segment'>
                {formatMessage({ id: 'myInventory.editPricing', defaultMessage: 'Edit Pricing' })}
              </div>

              <div className='content'>
                <Grid>
                  {this.renderPricingTiers()}
                </Grid>
              </div>

              <div className='bottom-buttons'>
                <Button
                  size='large'
                  inputProps={{ type: 'button' }}
                  onClick={closePricingEditPopup}
                  data-test='inventory_quick_edit_pricing_popup_cancel_btn'
                >
                  {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                </Button>
                <Button.Submit
                  primary
                  size='large'
                  type='button'
                  data-test='inventory_quick_edit_pricing_popup_save_btn'
                >
                  {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                </Button.Submit>
              </div>
            </>
          )
        }}
      </StyledForm>
    )
  }
}

const mapStateToProps = store => {
  return {
    pricingEditOpenId: store.simpleAdd.pricingEditOpenId,
    pricingEditValues: store.simpleAdd.pricingEditValues
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(QuickEditPricingPopup)))