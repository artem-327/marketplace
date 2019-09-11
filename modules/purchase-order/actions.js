import * as AT from './action-types'
import * as api from './api'

export const getProductOffer = (id, isEdit = false) => ({
  type: AT.OFFER_FETCH, async payload() {
    let productOffer = await api.getProductOffer(id)

    return {
      productOffer, isEdit
    }
  }
})

export const updateDeliveryAddress = address => ({ type: AT.DELIVERY_ADDRESS_EDIT, payload: api.updateDeliveryAddress(address) })

export const getShippingQuotes = (countryId, zip) => ({ type: AT.SHIPPING_QUOTES_FETCH, payload: api.getShippingQuotes(countryId, zip) })

export const getCart = () => ({ type: AT.CART_FETCH, payload: api.getCart() })

export const sidebarChanged = payload => ({ type: AT.SIDEBAR_CHANGED, payload })

export const getBranches = () => ({ type: AT.BRANCHES_FETCH, payload: api.getBranches() })

export const shippingQuoteSelected = (payload) => ({ type: AT.SHIPPING_QUOTE_SELECTED, payload })

export const addCartItem = (payload) => ({ type: AT.ADD_CART_ITEM, payload: api.addCartItem({ ...payload }) })

export const updateCartItem = (payload) => ({ type: AT.UPDATE_CART_ITEM, payload: api.updateCartItem({ ...payload }) })

export const deleteCartItem = (id) => ({
  type: AT.DELETE_CART_ITEM, async payload() {
    await api.deleteCartItem(id)
    return id
  }
})

export const deleteCart = (id) => ({ type: AT.DELETE_CART, payload: api.deleteCart(id) })

export const getCartItem = (payload) => ({ type: AT.GET_CART_ITEM_REQUESTED, payload }) // NOT TESTED

export const shippingChanged = (values) => ({ type: AT.SHIPPING_CHANGED, payload: values })

export const getDeliveryAddresses = () => ({ type: AT.DELIVERY_ADDRESSES_FETCH, payload: api.getDeliveryAddresses() })

export const getPayments = () => ({ type: AT.PAYMENTS_FETCH, payload: api.getPayments() })

export const postNewDeliveryAddress = (address) => ({ type: AT.DELIVERY_ADDRESS_CREATE, payload: api.postNewDeliveryAddress(address) })

export const getProvinces = (countryId, search = null) => ({ type: AT.PROVINCES_FETCH, payload: api.getProvinces({ countryId, search }) })

export const getStates = (search = null) => ({ type: AT.STATES_FETCH, payload: api.getStates(search) })

export const getWarehouses = () => ({ type: AT.GET_WAREHOUSES, payload: api.getWarehouses() })

export const updateHazmatInfo = (cartItemId, payload) => ({ type: AT.UPDATE_HAZMAT_INFO, payload: api.updateHazmatInfo(cartItemId, payload) })

export const postPurchaseOrder = (values) => ({ type: AT.POST_PURCHASE_ORDER, payload: api.postPurchaseOrder(values) })