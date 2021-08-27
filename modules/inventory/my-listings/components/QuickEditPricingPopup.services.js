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

/**
 * Validation of form.
 * @category Inventory - My Listings
 * @method
 */
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

/**
 * Render Pricing Tiers
 * @category Inventory - My Listings
 * @method
 */
export const renderPricingTiers = (values, setFieldValue, props) => {
    const {
      intl: { formatMessage },
      rIndex,
      setState
    } = props

    let tiers = []

    for (let i = 0; i < values.pricingTiers.length; i++) {
      tiers.push(
        <GridRow key={i}>
          <GridColumn>
            <div className='quantity labeled'>
              <Input
                name={`pricingTiers[${i}].quantityFrom`}
                inputProps={{
                  placeholder: '0'
                }}
              />
              <div className='label'>{formatMessage({ id: 'myInventory.andAbove', defaultMessage: 'and above' })}</div>
            </div>
          </GridColumn>

          <GridColumn>
            <div className='price labeled'>
              <Input
                name={`pricingTiers[${i}].pricePerUOM`}
                inputProps={{
                  placeholder: '0.000'
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
                  setState(prevState => {
                    let newRows = prevState.rows
                    newRows[rIndex].pricingTiers = pricingTiers
                    newRows[rIndex].rawData.pricingTiers = pricingTiers
                    return {
                      ...prevState,
                      rows: newRows
                    }
                  })
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
              setState(prevState => {
                let newRows = prevState.rows
                newRows[rIndex].pricingTiers = pricingTiers
                newRows[rIndex].rawData.pricingTiers = pricingTiers
                return {
                  ...prevState,
                  rows: newRows
                }
              })
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
          <GridColumn>{formatMessage({ id: 'global.price', defaultMessage: 'Price' })}</GridColumn>
          <GridColumn></GridColumn>
        </GridRow>
        {tiers}
      </>
    )
}

/**
 * Submit form - add or edit Pricing Popup
 * @category Inventory - My Listings
 * @method
 */
export const submitForm = async (props, values, setState) => {
    const { closePricingEditPopup, rawData, datagrid, addProductOffer, rIndex, r } = props
    let isGrouped = getSafe(() => rawData.grouped, false)
    setState(prevState => ({ ...prevState, isSubmitting: true }))
    closePricingEditPopup()

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
      const {value} = await addProductOffer(payload, rawData.id, false, isGrouped)
      datagrid.updateRow(value.id, () => value)
      setState(prevState => ({ ...prevState, isSubmitting: false }))
    } catch (e) {
      console.error(e)
      setState(prevState => {
        let newRows = prevState.rows
        newRows[rIndex].pricingTiers = r.pricingTiers
        newRows[rIndex].rawData.pricingTiers = r.pricingTiers
        datagrid.updateRow(r.id, () => r)
        return {
          ...prevState,
          rows: newRows,
          isSubmitting: false
        }
      })
    }
}
