import Router from 'next/router'
import * as Yup from 'yup'
// Services
import { errorMessages } from '../../../constants/yupValidation'
import { removeEmpty, getSafe } from '../../../utils/functions'

/**
 * Form Validation
 * @category Marketplace - Bids received / sent
 * @method
 */
export const formValidation = requiredInputs =>
  Yup.object().shape({
    ...(requiredInputs && {
      pricePerUOM: Yup.number()
        .min(0.001, errorMessages.minimum(0.001))
        .typeError(errorMessages.mustBeNumber)
        .test('maxdec', errorMessages.maxDecimals(3), val => {
          return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
        })
        .required(errorMessages.requiredMessage),
      pkgAmount: Yup.number()
        .min(1, errorMessages.minimum(1))
        .required(errorMessages.requiredMessage)
        .test('int', errorMessages.integer, val => {
          return val % 1 === 0
        })
    })
  })

/**
 * Submit offer
 * @category Marketplace - Bids received / sent
 * @method
 */
export const submitOffer = async ({ values, setSubmitting }, props, state) => {
  const { popupValues, onClose, counterOffer, acceptOffer, rejectOffer, datagrid } = props
  const { radioState } = state

  switch (radioState) {
    case 'counter': {
      const body = {
        pkgAmount: parseInt(values.pkgAmount),
        pricePerUOM: parseFloat(values.pricePerUOM),
        message: values.message
      }
      removeEmpty(body)

      try {
        const { value } = await counterOffer(popupValues.id, body)
        datagrid.updateRow(popupValues.id, () => value)
        onClose(popupValues)
      } catch (e) {
        console.error(e)
      }
      break
    }
    case 'accept': {
      try {
        const { value } = await acceptOffer(popupValues.id)
        datagrid.updateRow(popupValues.id, () => value)
        onClose(popupValues)
      } catch (e) {
        console.error(e)
      }
      break
    }
    case 'reject': {
      try {
        const { value } = await rejectOffer(popupValues.id)
        datagrid.updateRow(popupValues.id, () => value)
        onClose(popupValues)
      } catch (e) {
        console.error(e)
      }
      break
    }
  }
  setSubmitting(false)
}

/**
 * Handle checkout
 * @category Marketplace - Bids received / sent
 * @method
 */
export const handleCheckout = async (id, props) => {
  const { addOfferToCart } = props

  try {
    await addOfferToCart(id)
    Router.push('/cart')
  } catch (e) {
    console.error(e)
  }
}

/**
 * Check buy attempt
 * @category Marketplace - Bids received / sent
 * @method
 */
export const checkBuyAttempt = (row, state, props) => {
  let skipBuy = false
  const elements = getSafe(() => row.productOffer.companyProduct.companyGenericProduct.elements, [])
  const hasDea = elements.some(el => getSafe(() => el.casProduct.deaListII, false))
  const hasDhs = elements.some(el => getSafe(() => el.casProduct.cfChemicalOfInterest, false))

  if (hasDea) {
    state.setBuyAttemptHasDea(row)
    skipBuy = true
  }
  if (hasDhs) {
    state.setBuyAttemptHasDhs(row)
    skipBuy = true
  }
  if (skipBuy) return
  handleCheckout(row.id, props)
}
