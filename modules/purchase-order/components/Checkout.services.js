// Services
import Router from 'next/router'
import { FREIGHT_TYPES } from './Checkout.constants'

/**
 * @param {object} sectionState Object with section statuses
 * @return {string} Name of section to open for edit/accept
 */
export const findSectionToOpen = sectionState => {
  const keys = Object.keys(sectionState)
  const index = keys.findIndex(el => sectionState[el].accepted === false)

  if (index >= 0) {
    return keys[index]
  } else {
    return ''
  }
}

export const checkAllAccepted = sectionState =>
  sectionState.review.accepted &&
  sectionState.shipping.accepted &&
  sectionState.payment.accepted &&
  sectionState.freight.accepted

export const confirmSection = ({ openSection, setOpenSection, sectionState, setSectionState }) => {
  if (openSection) {
    const newSectionState = {
      ...sectionState,
      [openSection]: {
        ...sectionState[openSection],
        accepted: true
      }
    }
    const sectionToOpen = findSectionToOpen(newSectionState)
    setSectionState(newSectionState)
    setOpenSection(sectionToOpen)
  }
}

export const submitButton = async (props, state) => {
  const { getManualQuoteById } = props
  const { allAccepted, openSection, sectionState, shipmentQuoteId, clickedFriehgt, setClickedFriehgt } = state

  if ((sectionState[openSection] && sectionState[openSection].value) || allAccepted || openSection === 'review' || shipmentQuoteId) {
    if (allAccepted) {
      handleSubmitOrder(props, state)
    } else {
      if (openSection === 'review') submitUpdateCartItem(props, state)
      else if(openSection === 'freight' && shipmentQuoteId) {
        await getManualQuoteById(shipmentQuoteId)
        setClickedFriehgt(!clickedFriehgt)
      }
      else confirmSection(state)
    }
  }
}

/**
 * @param {string} name
 * // ! ! ...
 *
 * @return object Default component attributes and event handlings (isExpanded, onButtonClick, onChangeButtonClick, etc.)
 */
export const getComponentParameters = (props, state) => {
  const { name, allAccepted, openSection, setOpenSection, sectionState, setSummaryButtonCaption, shipmentQuoteId, setShipmentQuoteId } = state

  return {
    id: name,
    isExpanded: openSection === name,
    sectionState: sectionState[name],
    onChangeButtonClick: () => setOpenSection(name),
    onCloseButtonClick: () => {
      const sectionToOpen = findSectionToOpen(sectionState)
      setOpenSection(sectionToOpen)
    },
    onSubmitClick: () => submitButton(props, state),
    setSummaryButtonCaption,
    allAccepted,
    value: sectionState[name].value,
    shipmentQuoteId: shipmentQuoteId,
    setShipmentQuoteId: setShipmentQuoteId
  }
}

export const submitUpdateCartItem = async (props, state) => {
  const { cartItems, updateCartItem } = props
  const { sectionState, setSectionState, setOpenSection } = state

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
  confirmSection(state)
}

export const getShippingQuotes = async (props, value) => {
  try {
    const body = value.warehouse
      ? { warehouseId: value.id }
      : { deliveryAddressId: value.id }

    await props.getShippingQuotes(body)
  } catch (e) {
    console.error(e)
  }
}

export const handleSubmitOrder = async (props, state) => {
  const { sectionState } = state

  const warehouse = sectionState.shipping.value.warehouse
  const freightType = sectionState.freight.value.freightType
  let data = {
    ...(warehouse
      ? { warehouseId: sectionState.shipping.value.id }
      : { deliveryAddressId: sectionState.shipping.value.id }),
    bankAccountId: sectionState.payment.value,
    freightType
  }
  freightType === FREIGHT_TYPES.ECHO ? (data.shipmentQuoteId = sectionState.freight.value.quoteId) : null

  try {
    await props.postPurchaseOrder(data)
    Router.push('/orders/purchase')
  } catch (e) {
    console.error(e)
  }
}
