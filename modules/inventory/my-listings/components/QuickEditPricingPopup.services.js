import * as val from 'yup'
import { GridRow, GridColumn, Icon } from 'semantic-ui-react'
import { Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
// Services
import { errorMessages } from '../../../../constants/yupValidation'
import { currencySymbol } from '../../../../constants/index'
import { getSafe, removeEmpty } from '../../../../utils/functions'

val.addMethod(val.object, 'uniqueProperty', function (propertyName, message) {
    return this.test('unique', message, function (value) {
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

export const validationSchema = min =>
    val.object().shape({
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

export const renderPricingTiers = (values, setFieldValue, props, obj) => {
    const {
      intl: { formatMessage }
    } = props

    const options = [
      {
        key: values.companyProduct.packagingUnit.id,
        text: values.companyProduct.packagingUnit.name,
        value: values.companyProduct.packagingUnit.name
      }
    ]
    let tiers = []

    for (let i = 0; i < values.pricingTiers.length; i++) {
      tiers.push(
        <GridRow key={i}>
          <GridColumn>
            <div className='quantity labeled'>
              <Input
                name={`pricingTiers[${i}].quantityFrom`}
                inputProps={{
                  ref: input => {
                    obj[`pricingTiers[${i}].quantityFrom`] = input
                  },
                  placeholder: '0',
                  onChange: (e, { name, value }) => {
                    e.persist()
                    props.handlechange(
                      { quantityFrom: value, pricePerUOM: values.pricingTiers[i].pricePerUOM },
                      i,
                      `pricingTiers[${i}].quantityFrom`
                    )
                  }
                }}
              />
              <div className='label'>{formatMessage({ id: 'myInventory.andAbove', defaultMessage: 'and above' })}</div>
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
            <div className='price labeled'>
              <Input
                name={`pricingTiers[${i}].pricePerUOM`}
                inputProps={{
                  ref: input => {
                    obj[`pricingTiers[${i}].pricePerUOM`] = input
                  },
                  placeholder: '0.000',
                  onChange: (e, { name, value }) => {
                    e.persist()
                    props.handlechange(
                      { quantityFrom: values.pricingTiers[i].quantityFrom, pricePerUOM: value },
                      i,
                      `pricingTiers[${i}].pricePerUOM`
                    )
                  }
                }}
              />
              <div className='label'>{currencySymbol}</div>
            </div>
          </GridColumn>

          <GridColumn>
            {i > 0 ? (
              <Button
                className='delete'
                onClick={() => {
                  let pricingTiers = values.pricingTiers.slice()
                  pricingTiers.splice(i, 1)
                  setFieldValue('pricingTiers', pricingTiers)
                  props.handlechange(pricingTiers)
                }}>
                <Icon name='trash alternate outline' />
              </Button>
            ) : null}
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
              props.handlechange(pricingTiers)
            }}>
            {formatMessage({ id: 'global.add', defaultMessage: 'Add' })}
          </Button>
        </GridColumn>
        <GridColumn></GridColumn>
      </GridRow>
    )

    return (
      <>
        <GridRow className='header'>
          <GridColumn>{formatMessage({ id: 'global.quantity', defaultMessage: 'Quantity' })}</GridColumn>
          <GridColumn></GridColumn>
          <GridColumn>{formatMessage({ id: 'global.price', defaultMessage: 'Price' })}</GridColumn>
          <GridColumn></GridColumn>
        </GridRow>
        {tiers}
      </>
    )
}


export const submitForm = async (props, formikProps) => {
    const { closePricingEditPopup, rawData, datagrid, addProductOffer } = props

    let { values, setSubmitting } = formikProps

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
        ? rawData.costRecords.map(d => ({
            attachment: d.attachment,
            description: d.description,
            // ! ! lotNumber ! ! ??
            value: d.value
          }))
        : null,
      externalNotes: rawData.externalNotes,
      productForm: getSafe(() => rawData.form.id, null),
      productGrades: rawData.grades ? rawData.grades.map(d => ({ id: d.id })) : null,
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
      })),
      splits: rawData.splitPkg,
      expirationDate: rawData.validityDate,
      warehouse: getSafe(() => rawData.warehouse.id, null)
    }
    removeEmpty(payload)

    try {
      data = await addProductOffer(payload, rawData.id, false, isGrouped)
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
