import {
  OFFER_FETCH_SUCCEEDED, OFFER_FETCH_REQUESTED,
  CART_FETCH_REQUESTED_FULFILLED, CART_FETCH_REQUESTED,
  PAYMENTS_FETCH_REQUESTED, PAYMENTS_FETCH_SUCCEEDED,
  DELIVERYADDRESSES_FETCH_SUCCEEDED, DELIVERYADDRESSES_FETCH_REQUESTED,
  PRODUCTFROMCART_REMOVE_REQUESTED,
  CARTITEM_CREATE_REQUESTED,
  DELIVERYADDRESS_CREATE_REQUESTED,
  ORDERDETAIL_FETCH_REQUESTED, ORDERDETAIL_FETCH_SUCCEEDED,
  ORDER_EDIT_REQUESTED,
  DELIVERYADDRESS_EDIT_REQUESTED,
  SHIPPING_QUOTES_FETCH_SUCCEEDED,
  SHIPPING_QUOTES_FETCH_REQUESTED,
  SIDEBAR_CHANGED
} from "../constants/cart";
import Api from "~/src/api/cart"
import { getPricing } from "../utils/functions";

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
  selectedAddressId: null,
  selectedCardId: null,
  shippingQuotes: [],
  sidebar: {
    isOpen: false,
    pricing: null,
    quantity: null,
    warning: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ORDERDETAIL_FETCH_REQUESTED: {
      return {
        ...state,
        orderDetailIsFetching: true,
      }
    }
    case ORDERDETAIL_FETCH_SUCCEEDED: {
      return {
        ...state,
        orderDetail: action.payload,
        sidebar: { ...state.sidebar, quantity: action.payload.quantity },
        orderDetailIsFetching: false
      }
    }
    case DELIVERYADDRESSES_FETCH_REQUESTED: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case DELIVERYADDRESSES_FETCH_SUCCEEDED: {
      return {
        ...state,
        deliveryAddresses: action.payload,
        isFetching: false
      }
    }
    case PAYMENTS_FETCH_REQUESTED: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case PAYMENTS_FETCH_SUCCEEDED: {

      return {
        ...state,
        payments: action.payload,
        isFetching: false
      }
    }
    case OFFER_FETCH_REQUESTED: {
      return {
        ...state,
        offerDetailIsFetching: true,
      }
    }
    case OFFER_FETCH_SUCCEEDED: {
      let { payload } = action

      return {
        ...state,
        offerDetail: payload,
        sidebar: { ...state.sidebar, quantity: !payload.isEdit ? payload.minimum : state.sidebar.quantity },
        offerDetailIsFetching: false
      }
    }
    case CART_FETCH_REQUESTED: {
      return {
        ...state,
        cartIsFetching: true,
      }
    }
    case CART_FETCH_REQUESTED_FULFILLED: {
      return {
        ...state,
        cart: action.payload,
        cartIsFetching: false
      }
    }
    case SHIPPING_QUOTES_FETCH_REQUESTED: {
      return {
        ...state,
        country: action.country,
        zip: action.zip,
        shippingQuotesAreFetching: true
      }
    }
    case SHIPPING_QUOTES_FETCH_SUCCEEDED: {
      return {
        ...state,
        shippingQuotes: action.payload,
        shippingQuotesAreFetching: false
      }
    }

    case SIDEBAR_CHANGED: {
      return {
        ...state,
        sidebar: { ...state.sidebar, ...action.payload }
      }
    }

    default: {
      return state
    }
  }
}

export function getProductOffer(id, isEdit = false) {
  return {
    type: OFFER_FETCH_REQUESTED, payload: { id, isEdit }
  }
}

export function getCart() {
  return { type: CART_FETCH_REQUESTED, payload: Api.getCart() }
}

export function getDeliveryAddresses() {
  return { type: DELIVERYADDRESSES_FETCH_REQUESTED }
}

export function getPayments() {
  return { type: PAYMENTS_FETCH_REQUESTED }
}

export function deleteCart(id) {
  return { type: PRODUCTFROMCART_REMOVE_REQUESTED, payload: { id } }
}

export function postNewOrder(product) {
  return { type: CARTITEM_CREATE_REQUESTED, payload: { product } }
}

export function postNewDeliveryAddress(address) {
  return { type: DELIVERYADDRESS_CREATE_REQUESTED, payload: { address } }
}

export function getOrderDetail(id) {
  return { type: ORDERDETAIL_FETCH_REQUESTED, payload: { id } }
}

export function postOrderEdit(order) {
  return { type: ORDER_EDIT_REQUESTED, payload: { order } }
}

export function putDeliveryAddressEdit(address) {
  return { type: DELIVERYADDRESS_EDIT_REQUESTED, payload: { address } }
}

export function getShippingQuotes(countryId, zip) {
  return { type: SHIPPING_QUOTES_FETCH_REQUESTED, payload: { countryId, zip } }
}

export function sidebarChanged(payload) {
  return { type: SIDEBAR_CHANGED, payload }
}