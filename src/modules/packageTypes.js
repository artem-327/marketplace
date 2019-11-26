import axios from 'axios'

const GET_PACKAGE_TYPES = 'GET_PACKAGE_TYPES'
const GET_PACKAGE_TYPES_FULFILLED = 'GET_PACKAGE_TYPES_FULFILLED'
const GET_PACKAGE_TYPES_PENDING = 'GET_PACKAGE_TYPES_PENDING'
const VALIDATE_PACKAGE_TYPE = 'VALIDATE_PACKAGE_TYPE'
const VALIDATE_PACKAGE_TYPE_FULFILLED = 'VALIDATE_PACKAGE_TYPE_FULFILLED'

export const initialState = {
  data: [],
  isFetching: false,
  packageTypeId: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PACKAGE_TYPES_PENDING: {
      return {
        ...state,
        isFetching: true
      }
    }
    case GET_PACKAGE_TYPES_FULFILLED: {
      return {
        ...state,
        data: action.payload,
        isFetching: false
      }
    }
    case VALIDATE_PACKAGE_TYPE_FULFILLED: {
      return {
        ...state,
        packageTypeId: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export function validatePackageType(name, measureType, capacity, unit) {
  return {
    type: VALIDATE_PACKAGE_TYPE,
    payload: axios
      .post('/prodex/api/package-types/', { name, measureType, capacity, unit })
      .then(response => response.data.packageType.id)
  }
}

export function fetchAll() {
  return {
    type: GET_PACKAGE_TYPES,
    payload: axios.get('/prodex/api/package-types/').then(response => response.data.packageTypes)
  }
}
