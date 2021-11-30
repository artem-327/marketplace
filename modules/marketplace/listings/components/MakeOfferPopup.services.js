import * as Yup from 'yup'
// Constants
import { errorMessages } from '../../../../constants/yupValidation'
// Services
import { removeEmpty } from '../../../../utils/functions'

/**
 * Form validation
 * @category Marketplace - Listings
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
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

/**
 * Initial form values
 * @category Marketplace - Listings
 * @method
 */
export const getInitialFormValues = props => {
  const { popupValues } = props
  return {
    message: '',
    pkgAmount: '',
    pricePerUOM: '',
    sellerId: popupValues.sellerId,
    productOffer: popupValues.id
  }
}

/**
 * Submit offer
 * @category Marketplace - Listings
 * @method
 */
export const submitOffer = async ({ values, setSubmitting }, props) => {
  const { closePopup, makeOffer, datagrid } = props
  const body = {
    pkgAmount: parseInt(values.pkgAmount),
    productOffer: values.productOffer,
    pricePerUOM: parseFloat(values.pricePerUOM),
    sellerId: values.sellerId,
    message: values.message
  }
  removeEmpty(body)

  try {
    await makeOffer(body)
    datagrid.loadData()
    closePopup()
  } catch (e) {
    console.error(e)
  }
  setSubmitting(false)
}


