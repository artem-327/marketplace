import * as AT from './action-types'

import { getLocationString, getPricing, addFirstTier, calculateTotalPrice } from '~/src/utils/functions'

export const initialState = {
  offerDetail: {},
  orderDetail: {},
  cart: {},
  deliveryAddresses: [],
  payments: [],
  isFetching: true,
  cartIsFetching: true,
  orderDetailIsFetching: true,
  offerDetailIsFetching: true,
  isPurchasing: false,
  branchesAreFetching: false,
  warehousesFetching: false,
  selectedAddressId: null,
  selectedCardId: null,
  states: [],
  branches: [],
  provinces: [],
  warehouses: [],
  // TODO remove shippingQuotes, keep them in shipping obj only
  shippingQuotes: [],
  manualShipmentRequested: false,
  manualShipmentPending: false,
  manualShipmentError: false,
  sidebar: {
    isOpen: false,
    pricing: null,
    quantity: null,
    warning: null
  },
  shipping: {
    selectedAddress: null,
    selectedPayment: {},
    isShippingEdit: false,
    isNewAddress: true,
    savedShippingPreferences: true,
    selectedShippingQuote: null
  },
  identity: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AT.ORDERDETAIL_FETCH_REQUESTED: {
      return {
        ...state,
        orderDetailIsFetching: true
      }
    }
    case AT.ORDERDETAIL_FETCH_SUCCEEDED: {
      return {
        ...state,
        orderDetail: { ...action.payload, locationStr: getLocationString(action.payload.productOffer) },
        sidebar: { ...state.sidebar, quantity: action.payload.quantity },
        orderDetailIsFetching: false
      }
    }

    /* DELIVERY_ADDRESSES_FETCH */

    case AT.DELIVERY_ADDRESSES_FETCH_PENDING: {
      return {
        ...state,
        isFetching: true
      }
    }

    case AT.DELIVERY_ADDRESSES_FETCH_FULFILLED: {
      return {
        ...state,
        deliveryAddresses: action.payload,
        isFetching: false
      }
    }

    /* DELIVERY_ADDRESS_CREATE */

    case AT.DELIVERY_ADDRESS_CREATE: {
      return {
        ...state,
        isFetching: true
      }
    }

    case AT.DELIVERY_ADDRESS_CREATE_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        deliveryAddresses: state.deliveryAddresses.concat(action.payload),
        shipping: { ...state.shipping, selectedAddress: action.payload, isShippingEdit: false }
      }
    }
    case AT.DELIVERY_ADDRESS_CREATE_REJECTED: {
      return {
        ...state,
        isFetching: false
      }
    }

    /* DELIVERY_ADDRESS_EDIT */

    case AT.DELIVERY_ADDRESS_EDIT: {
      return {
        ...state,
        isFetching: true
      }
    }

    case AT.DELIVERY_ADDRESS_EDIT_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        deliveryAddresses: Object.assign([], state.deliveryAddresses, {
          [state.deliveryAddresses.findIndex(value => value.id === action.payload.id)]: action.payload
        }),
        shipping: { ...state.shipping, selectedAddress: action.payload, isShippingEdit: false }
      }
    }

    case AT.DELIVERY_ADDRESS_EDIT_PENDING: {
      return {
        ...state,
        isFetching: false
      }
    }

    /* PAYMENTS_FETCH */

    case AT.PAYMENTS_FETCH_PENDING: {
      return {
        ...state,
        isFetching: true
      }
    }
    case AT.PAYMENTS_FETCH_FULFILLED: {
      return {
        ...state,
        payments: action.payload,
        isFetching: false
      }
    }

    case AT.PAYMENTS_FETCH_REJECTED: {
      return {
        ...state,
        payments: [],
        isFetching: false
      }
    }

    /* OFFER_FETCH */

    case AT.OFFER_FETCH_PENDING: {
      return {
        ...state,
        offerDetailIsFetching: true
      }
    }
    case AT.OFFER_FETCH_FULFILLED: {
      let { payload } = action

      return {
        ...state,
        offerDetail: addFirstTier(payload.productOffer),
        sidebar: {
          ...state.sidebar,
          quantity: !payload.isEdit ? payload.productOffer.minimum : state.sidebar.quantity
        },
        offerDetailIsFetching: false
      }
    }

    /* CART_FETCH */

    case AT.CART_FETCH_PENDING: {
      return {
        ...state,
        cartIsFetching: true
      }
    }
    case AT.CART_FETCH_FULFILLED: {
      let { payload } = action

      if (payload.cartItems) {
        let { cartItems } = payload
        cartItems.forEach(item => {
          item.locationStr = getLocationString(item.productOffer)
          //! !item.pricing = {price: item.cfPricePerUOM} // ! ! getPricing(item.productOffer, item.quantity)
          //! ! item.productOffer = addFirstTier(item.productOffer)
        })
      }
      return {
        ...state,
        //cart: calculateTotalPrice(payload),
        cart: payload,
        cartIsFetching: false
      }
    }

    /* PROVINCES_FETCH */

    case AT.PROVINCES_FETCH_PENDING: {
      return {
        ...state,
        provincesAreFetching: true
      }
    }

    case AT.PROVINCES_FETCH_FULFILLED: {
      return {
        ...state,
        provinces: action.payload,
        provincesAreFetching: false
      }
    }

    case AT.PROVINCES_FETCH_REJECTED: {
      return {
        ...state,
        provinces: [],
        provincesAreFetching: false
      }
    }

    /* STATES_FETCH */

    case AT.STATES_FETCH_PENDING: {
      return {
        ...state,
        statesAreFetching: true
      }
    }

    case AT.STATES_FETCH_FULFILLED: {
      return {
        ...state,
        states: action.payload,
        statesAreFetching: false
      }
    }

    case AT.STATES_FETCH_REJECTED: {
      return {
        ...state,
        states: [],
        statesAreFetching: false
      }
    }

    /* BRANCHES_FETCH */

    case AT.BRANCHES_FETCH: {
      return {
        ...state,
        branchesAreFetching: true,
        shippingQuotesAreFetching: true
      }
    }

    case AT.BRANCHES_FETCH_FULFILLED: {
      return {
        ...state,
        branchesAreFetching: false,
        branches: action.payload,
        shippingQuotesAreFetching: false
      }
    }

    case AT.BRANCHES_FETCH_REJECTED: {
      return {
        ...state,
        branchesAreFetching: false,
        branches: []
      }
    }

    /* SHIPPING_QUOTES_FETCH */

    case AT.SHIPPING_QUOTES_FETCH_PENDING: {
      return {
        ...state,
        country: action.country,
        zip: action.zip,
        shippingQuotesAreFetching: true,
        cart: { ...state.cart, selectedShipping: null }
      }
    }
    case AT.SHIPPING_QUOTES_FETCH_FULFILLED: {
      return {
        ...state,
        shippingQuotes: action.payload,
        shippingQuotesAreFetching: false
      }
    }

    case AT.SHIPPING_QUOTES_FETCH_REJECTED: {
      return {
        ...state,
        shippingQuotesAreFetching: false,
        shippingQuotes: []
      }
    }

    /* ADD_CART_ITEM */

    case AT.ADD_CART_ITEM_PENDING: {
      return {
        ...state,
        isPurchasing: true
      }
    }

    case AT.ADD_CART_ITEM_FULFILLED: {
      return {
        ...state,
        isPurchasing: false,
        sidebar: { ...state.cart.sidebar, isOpen: false }
      }
    }

    case AT.ADD_CART_ITEM_REJECTED: {
      return {
        ...state,
        isPurchasing: false
      }
    }

    /* UPDATE_CART_ITEM */

    case AT.UPDATE_CART_ITEM_PENDING: {
      return {
        ...state,
        offerDetailIsFetching: true
      }
    }

    case AT.UPDATE_CART_ITEM_FULFILLED: {
      return {
        ...state,
        cart: { ...state.cart, ...action.payload },
        sidebar: { ...state.cart.sidebar, isOpen: false },
        offerDetailIsFetching: false
      }
    }

    /* DELETE_CART_ITEM */
    case AT.DELETE_CART_ITEM_FULFILLED: {
      return {
        ...state,
        cart: action.payload.data
      }
    }

    /* DELETE_CART */
    case AT.DELETE_CART_FULFILLED: {
      return {
        ...state,
        cart: action.payload.data
      }
    }

    case AT.DELETE_CART_REJECTED: {
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] }
      }
    }

    case AT.SIDEBAR_CHANGED: {
      return {
        ...state,
        sidebar: { ...state.sidebar, ...action.payload }
      }
    }

    case AT.SHIPPING_QUOTE_SELECTED: {
      return {
        ...state,
        cart: { ...state.cart, selectedShipping: action.payload }
      }
    }

    case AT.PRODUCTFROMCART_REMOVE_REQUESTED: {
      return {
        ...state,
        cartIsFetching: true
      }
    }

    case AT.PRODUCTFROMCART_REMOVE_SUCCEEDED: {
      return {
        ...state,
        cartIsFetching: false
      }
    }

    case AT.SHIPPING_CHANGED: {
      return {
        ...state,
        shipping: { ...state.shipping, ...action.payload }
      }
    }

    /* GET_WAREHOUSES */

    case AT.GET_WAREHOUSES_PENDING: {
      return {
        ...state,
        warehousesFetching: true
      }
    }

    case AT.GET_WAREHOUSES_FULFILLED: {
      return {
        ...state,
        warehouses: action.payload,
        warehousesFetching: false
      }
    }

    case AT.GET_WAREHOUSES_REJECTED: {
      return {
        ...state,
        warehousesFetching: false
      }
    }

    /* UPDATE_HAZMAT_INFO */

    case AT.UPDATE_HAZMAT_INFO_FULFILLED: {
      let cartItems = []
      for (let i = 0; i < state.cart.cartItems.length; i++) {
        cartItems.push({ ...state.cart.cartItems[i], ...action.payload.cartItems[i] })
      }
      return {
        ...state,
        cart: { ...state.cart, ...action.payload, cartItems }
      }
    }

    /* REQUEST_MANUAL_SHIPMENT */

    case AT.REQUEST_MANUAL_SHIPMENT_PENDING: {
      return {
        ...state,
        manualShipmentPending: true,
        manualShipmentRequested: true
      }
    }

    case AT.REQUEST_MANUAL_SHIPMENT_FULFILLED: {
      return {
        ...state,
        manualShipmentPending: false
      }
    }

    case AT.REQUEST_MANUAL_SHIPMENT_REJECTED: {
      return {
        ...state,
        manualShipmentPending: false,
        manualShipmentError: true
      }
    }

    case AT.PURCHASE_GET_IDENTITY_FULFILLED: {
      return {
        ...state,
        identity: action.payload,
      }
    }

    default: {
      return state
    }
  }
}
