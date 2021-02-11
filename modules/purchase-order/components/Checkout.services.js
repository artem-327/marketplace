// Services
import Router from 'next/router'
import { getSafe } from '~/utils/functions'
import { FREIGHT_TYPES } from './Checkout.constants'

/**
 * @param {object} sectionState Object with section statuses
 * @return {string} Name of section to open for edit/accept
 */
export const findSectionToOpen = (sectionState) => {
  const keys = Object.keys(sectionState)
  const index = keys.findIndex(el => sectionState[el].accepted === false)

  if (index >= 0) {
    return keys[index]
  } else {
    return ''
  }
}

/**
 * @param {string} name
 * // ! ! ...
 *
 * @return object Default component attributes and event handlings (isExpanded, onButtonClick, onChangeButtonClick, etc.)
 */
export const getComponentParameters = ({
  name,
  openSection,
  setOpenSection,
  sectionState,
  setSectionState,
  setSummaryButtonCaption,
  setSummarySubmitFunction,
  setSectionSubmitValue
}) => {

  return {
    id: name, // ! ! temporary
    isExpanded: openSection === name,
    sectionState: sectionState[name],
    onChangeButtonClick: () => setOpenSection(name),
    onCloseButtonClick: () => {
      const sectionToOpen = findSectionToOpen(sectionState)
      setOpenSection(sectionToOpen)
    },
    onSubmitClick: () => {
      if (name) {

        const newSectionState = {
          ...sectionState,
          [name]: {
            ...sectionState[name],
            accepted: true
          }
        }
        const sectionToOpen = findSectionToOpen(newSectionState)
        setSectionState(newSectionState)
        setOpenSection(sectionToOpen)
      }
    },
    onChangeSubmitButton: value => {
      setSummaryButtonCaption(value.caption)
      setSummarySubmitFunction(() => value.submitFunction)
    },
    value: name && sectionState[name] ? sectionState[name].value : null,
    setSectionSubmitValue: (val) => setSectionSubmitValue(val)
  }
}

export const submitUpdateCartItem = async (props, sectionState, setSectionState, setOpenSection) => {
  const { cartItems, updateCartItem } = props

  if (sectionState.review.value) {
    await sectionState.review.value.reduce(async (acc, val, index) => {
      await acc
      if (val.quantity !== cartItems[index].pkgAmount.toString()) {
        try {
          await updateCartItem({ cartItemId: cartItems[index].id, pkgAmount: val.quantity })
        } catch (e) {
          console.error(e)
        }
      }
    }, undefined)
  }

  const newSectionState = {
    ...sectionState,
    review: {
      ...sectionState.review,
      accepted: true
    }
  }
  const sectionToOpen = findSectionToOpen(newSectionState)
  setSectionState(newSectionState)
  setOpenSection(sectionToOpen)
}

export const handleSummarySubmit = async (
  summarySubmitFunction,
  props,
  sectionState,
  setSectionState,
  setOpenSection,
  openSection
) => {
  if (openSection === 'review') {
    submitUpdateCartItem(props, sectionState, setSectionState, setOpenSection)
  } else {
    summarySubmitFunction(sectionState)
  }
}

export const getShippingQuotes = async (props, countryId, zip) => {
  try {
    await props.getShippingQuotes(countryId, zip)
  } catch (e) {
    console.error(e)
  }
}

export const handleSubmitOrder = async (values, props) => {
  const warehouse = values.shipping.value.warehouse
  const freightType = values.freight.value.freightType
  let data = {
    ...(warehouse ? { warehouseId: values.shipping.value.id } : { deliveryAddressId: values.shipping.value.id }),
    bankAccountId: values.payment.value,
    freightType
  }
  // ! ! freightType === FREIGHT_TYPES.ECHO ? (data.shipmentQuoteId = shipmentQuoteId) : null


  //shipmentQuoteId

  //values.freight.value.quoteId

  try {
    console.log('!!!!!!!!!! aaaaa aaaaa', data)
    //await props.postPurchaseOrder(data)
    //Router.push('/orders/purchase')
  } catch (e) {
    console.error(e)
  }

}