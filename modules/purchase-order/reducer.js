import * as AT from './action-types'

import { getLocationString, addFirstTier, getSafe } from '../../utils/functions'

export const initialState = {
  offerDetail: {},
  orderDetail: {},
  cart: { cartItems: [] },
  cartItemsCount: 0,
  deliveryAddresses: [],
  payments: [],
  isFetching: true,
  cartIsFetching: false,
  orderDetailIsFetching: true,
  offerDetailIsFetching: false,
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
  shippingQuotes: {},
  manualShipmentRequested: false,
  manualShipmentPending: false,
  manualShipmentError: false,
  manualQuoteById: null,
  preFilledValues: null,
  sidebar: {
    isOpen: false,
    pricing: null,
    quantity: null,
    pkgAmount: '',
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
  identity: null,
  isOpenSidebar: false,
  shippingQuotesAreFetching: false,
  loading: false,
  isOpenModal: false,
  isThirdPartyConnectionException: false,
  twoPhaseAuthLoading: false,
  twoPhaseErrorMessage: null,
  twoPhaseAuthSentDatetime: null
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

    case AT.CHECKOUT_SEARCH_DELIVERY_ADDRESSES_PENDING:
    case AT.DELIVERY_ADDRESSES_FETCH_PENDING: {
      return {
        ...state,
        isFetching: true
      }
    }

    case AT.CHECKOUT_SEARCH_DELIVERY_ADDRESSES_FULFILLED:
    case AT.DELIVERY_ADDRESSES_FETCH_FULFILLED: {
      return {
        ...state,
        deliveryAddresses: action.payload,
        isFetching: false
      }
    }

    case AT.CHECKOUT_SEARCH_DELIVERY_ADDRESSES_REJECTED:
    case AT.DELIVERY_ADDRESSES_FETCH_REJECTED: {
      return {
        ...state,
        isFetching: true
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

    case AT.DELIVERY_ADDRESS_EDIT_REJECTED: {
      return {
        ...state,
        isFetching: false
      }
    }

    case AT.DELIVERY_ADDRESS_EDIT_PENDING: {
      return {
        ...state,
        isFetching: true
      }
    }

    case AT.WAREHOUSE_CREATE: {
      return {
        ...state,
        isFetching: true
      }
    }

    case AT.WAREHOUSE_CREATE_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        shipping: { ...state.shipping, selectedAddress: action.payload.deliveryAddresses, isShippingEdit: false },
        warehouses: state.warehouses.concat(action.payload)
      }
    }
    case AT.WAREHOUSE_CREATE_REJECTED: {
      return {
        ...state,
        isFetching: false
      }
    }

    case AT.UPDATE_WAREHOUSE: {
      return {
        ...state,
        isFetching: true
      }
    }

    case AT.UPDATE_WAREHOUSE_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        warehouses: Object.assign([], state.warehouses, {
          [state.warehouses.findIndex(value => value.id === action.payload.id)]: action.payload
        }),
        shipping: { ...state.shipping, selectedAddress: action.payload, isShippingEdit: false }
      }
    }

    case AT.UPDATE_WAREHOUSE_REJECTED: {
      return {
        ...state,
        isFetching: false
      }
    }

    case AT.UPDATE_WAREHOUSE_PENDING: {
      return {
        ...state,
        isFetching: true
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
        payments: action.payload.map(acc => ({
          id: acc.id || acc.account_public_id,
          name: acc.name || acc.display_name,
          status: acc.status,
          type: acc.bankAccountType || acc.account_type, // Nebo: acc.type || acc.account_type ?
          institutionName: acc.bankName || acc.institution_name
        })),
        isFetching: false
      }
    }

    case AT.PAYMENTS_FETCH_REJECTED: {
      return {
        ...state,
        payments: [],
        isFetching: false,
        isThirdPartyConnectionException:
          getSafe(() => action.payload.response.data.exceptionMessage, '') === 'THIRD_PARTY_CONNECTION_EXCEPTION'
      }
    }

    /* OFFER_FETCH */
    case AT.OFFER_FETCH_REJECTED: {
      return {
        ...state,
        offerDetailIsFetching: false
      }
    }
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
        loading: true
      }
    }
    case AT.CART_FETCH_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }
    case AT.CART_FETCH_FULFILLED: {
      let { payload } = action

      if (payload.cartItems) {
        let { cartItems } = payload
        cartItems.forEach(item => {
          item.locationStr = getLocationString(item.productOffer)
        })
      }

      return {
        ...state,
        cart: payload,
        loading: false
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
        shippingQuotes: [],
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
        shippingQuotes: {}
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
      let { payload } = action
      if (payload.cartItems) {
        let { cartItems } = payload
        cartItems.forEach(item => {
          item.locationStr = getLocationString(item.productOffer)
        })
      }
      return {
        ...state,
        isPurchasing: false,
        sidebar: { ...state.cart.sidebar, isOpen: false },
        cart: payload
      }
    }

    case AT.ADD_CART_ITEM_REJECTED: {
      return {
        ...state,
        isPurchasing: false
      }
    }

    /* UPDATE_CART_ITEM */
    case AT.UPDATE_CART_ITEM_REJECTED: {
      return {
        ...state,
        offerDetailIsFetching: false
      }
    }

    case AT.UPDATE_CART_ITEM_PENDING: {
      return {
        ...state,
        offerDetailIsFetching: true
      }
    }

    case AT.UPDATE_CART_ITEM_FULFILLED: {
      const { payload } = action
      if (payload.cartItems) {
        let { cartItems } = payload
        cartItems.forEach(item => {
          item.locationStr = getLocationString(item.productOffer)
        })
      }
      return {
        ...state,
        cart: { ...state.cart, ...payload },
        sidebar: { ...state.cart.sidebar, isOpen: false },
        offerDetailIsFetching: false
      }
    }

    /* DELETE_CART_ITEM */
    case AT.DELETE_CART_ITEM_PENDING: {
      return {
        ...state,
        cartIsFetching: true
      }
    }

    case AT.DELETE_CART_ITEM_REJECTED: {
      return {
        ...state,
        cartIsFetching: false
      }
    }

    case AT.DELETE_CART_ITEM_FULFILLED: {
      return {
        ...state,
        cart: action.payload.data,
        cartItemsCount: action.payload.data.cartItems.length,
        cartIsFetching: false
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
        shipping: { ...state.shipping, selectedAddress: action.payload }
      }
    }

    /* GET_WAREHOUSES */

    case AT.CHECKOUT_SEARCH_WAREHOUSES_PENDING:
    case AT.GET_WAREHOUSES_PENDING: {
      return {
        ...state,
        warehousesFetching: true
      }
    }

    case AT.CHECKOUT_SEARCH_WAREHOUSES_FULFILLED:
    case AT.GET_WAREHOUSES_FULFILLED: {
      return {
        ...state,
        warehouses: action.payload,
        warehousesFetching: false
      }
    }

    case AT.CHECKOUT_SEARCH_WAREHOUSES_REJECTED:
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

    /* GET_MANUAL_QUOTE_BY_ID */

    case AT.GET_MANUAL_QUOTE_BY_ID_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_MANUAL_QUOTE_BY_ID_FULFILLED: {
      return {
        ...state,
        manualQuoteById: action.payload,
        loading: false
      }
    }

    case AT.GET_MANUAL_QUOTE_BY_ID_REJECTED: {
      return {
        ...state,
        manualQuoteById: null,
        loading: false
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
        identity: action.payload
      }
    }

    case AT.SET_PRE_FILLED_VALUES: {
      return {
        ...state,
        preFilledValues: action.payload,
        country: action.payload.country,
        zip: action.payload.zip,
        shippingQuotes: {
          rates: action.payload.quotes.rates.map(quote => ({
            productOfferId: quote.productOfferId,
            ...quote.shipmentRate
          }))
        }
      }
    }

    case AT.CLEAR_PRE_FILLED_VALUES: {
      return {
        ...state,
        preFilledValues: null
      }
    }

    case AT.OPEN_SIDEBAR_ADDRESS: {
      return {
        ...state,
        isOpenSidebar: true
      }
    }

    case AT.CLOSE_SIDEBAR_ADDRESS: {
      return {
        ...state,
        isOpenSidebar: false
      }
    }

    case AT.CART_GET_COUNT_ITEMS_FULFILLED: {
      return {
        ...state,
        cartItemsCount: action.payload
      }
    }

    /* POST_PURCHASE_ORDER */

    case AT.PURCHASE_ORDER_MFA_GET_OPTIONS_PENDING:
    case AT.PURCHASE_ORDER_VALIDATE_PENDING:
    case AT.POST_PURCHASE_ORDER_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.PURCHASE_ORDER_MFA_GET_OPTIONS_FULFILLED:
    case AT.PURCHASE_ORDER_VALIDATE_FULFILLED:
    case AT.POST_PURCHASE_ORDER_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.PURCHASE_ORDER_MFA_GET_OPTIONS_REJECTED:
    case AT.PURCHASE_ORDER_VALIDATE_REJECTED:
    case AT.POST_PURCHASE_ORDER_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.PURCHASE_ORDER_MFA_REQUEST_CODE_PENDING:
    case AT.PURCHASE_ORDER_MFA_GET_PASS_PENDING: {
      return {
        ...state,
        twoPhaseAuthLoading: true,
        twoPhaseErrorMessage: null
      }
    }

    case AT.PURCHASE_ORDER_MFA_REQUEST_CODE_FULFILLED:
    {
      return {
        ...state,
        twoPhaseAuthLoading: false,
        twoPhaseAuthSentDatetime: Date.now()
      }
    }

    case AT.PURCHASE_ORDER_MFA_GET_PASS_FULFILLED: {
      return {
        ...state,
        twoPhaseAuthLoading: false
      }
    }

    case AT.PURCHASE_ORDER_MFA_REQUEST_CODE_REJECTED:
    case AT.PURCHASE_ORDER_MFA_GET_PASS_REJECTED: {
      return {
        ...state,
        twoPhaseAuthLoading: false,
        twoPhaseErrorMessage: action.payload.response.data.clientMessage
      }
    }

    case AT.SET_IS_OPEN_MODAL: {
      return {
        ...state,
        isOpenModal: action.payload
      }
    }

    default: {
      return state
    }
  }
}
