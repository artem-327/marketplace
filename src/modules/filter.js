import axios from "axios";

const RESET_TAGS = "RESET_TAGS";
const TOGGLE_FILTER = "TOGGLE_FILTER";
const TOGGLE_FILTER_GROUP = 'TOGGLE_FILTER_GROUP';
const ADD_FILTER_TAG = 'ADD_FILTER_TAG';
const CLOSE_FILTER_TAG = 'CLOSE_FILTER_TAG';
const CLOSE_FILTER_TAG_FULFILLED = 'CLOSE_FILTER_TAG_FULFILLED';
const GET_SAVE_FILTERS = 'GET_SAVE_FILTERS';
const GET_SAVE_FILTERS_PENDING = 'GET_SAVE_FILTERS_PENDING'
const GET_SAVE_FILTERS_REJECTED = 'GET_SAVE_FILTERS_REJECTED'
const GET_SAVE_FILTERS_FULFILLED = 'GET_SAVE_FILTERS_FULFILLED'
const DELETE_SAVE_FILTER = 'DELETE_SAVE_FILTER';
const SAVE_SAVE_FILTER = 'SAVE_SAVE_FILTER';

import {
    GET_BROADCASTED_FILTERS_PENDING,
    GET_BROADCASTED_FILTERS_FULFILLED,
    GET_BROADCASTED_FILTERS_REJECTED
} from '~/modules/marketplace/action-types'

import {
    GET_SAVED_FILTERS_PENDING,
    GET_SAVED_FILTERS_FULFILLED,
    GET_SAVED_FILTERS_REJECTED
} from '~/modules/inventory/action-types'


export const initialState = {
    isOpen: false,
    data: {},
    filterGroup: {
        orderId: true,
        orderDate: true,
        customer: false,
        product: false,
        orderStatus: false,
        chemName: true,
        quantity: true,
        price: true,
        packaging: false,
        productGrade: false,
        chemSearch: false,
        productAge: false,
        location: false,
        date: false,
        condition: false,
        form: false
    },
    filterTags: [],
    savedFiltersFetching: false,
    saveFilters: [],
    savedBroadcastedFilters: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FILTER: {
            return {
                ...state,
                isOpen: action.payload ? action.payload : !state.isOpen
            }
        }
        case TOGGLE_FILTER_GROUP: {
            return {
                ...state,
                filterGroup: {
                    ...state.filterGroup,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case ADD_FILTER_TAG: {
            return {
                ...state,
                filterTags: action.payload
            }
        }
        case CLOSE_FILTER_TAG_FULFILLED: {
            return {
                ...state,
                filterTags: [...state.filterTags.slice(0, action.payload), ...state.filterTags.slice(action.payload + 1)]
            }
        }
        case RESET_TAGS: {
            return {
                ...state,
                filterTags: []
            }
        }

        case GET_SAVE_FILTERS_PENDING: {
            return {
                ...state,
                savedFiltersFetching: true
            }
        }

        case GET_SAVE_FILTERS_FULFILLED: {
            return {
                ...state,
                saveFilters: action.payload,
                savedFiltersFetching: false
            }
        }

        case GET_SAVE_FILTERS_REJECTED: {
            return {
                ...state,
                savedFiltersFetching: false
            }
        }

        /* GET BROADCASTED FILTERS */

        case GET_BROADCASTED_FILTERS_PENDING: {
            return {
                ...state,
                savedFiltersFetching: true
            }
        }

        case GET_BROADCASTED_FILTERS_FULFILLED: {
            return {
                ...state,
                savedFiltersFetching: false,
                savedBroadcastedFilters: action.payload
            }
        }

        case GET_BROADCASTED_FILTERS_REJECTED: {
            return {
                ...state,
                savedFiltersFetching: false
            }
        }

        /* GET SAVED FILTERS */

        // case GET_SAVED_FILTERS_PENDING: {
        //     return {
        //         ...state,
        //         savedFiltersFetching: true
        //     }
        // }

        // case GET_SAVED_FILTERS_FULFILLED: {
        //     return {
        //         ...state,
        //         saveFilters: action.payload
        //     }
        // }


        default: {
            return state
        }
    }
}

export function toggleFilter(value = null) {
    return {
        type: TOGGLE_FILTER,
        payload: value
    }
}

export function toggleFilterGroup(name, value) {
    return {
        type: TOGGLE_FILTER_GROUP,
        payload: { name, value }
    }
}
export function addFilterTag(data) {
    return {
        type: ADD_FILTER_TAG,
        payload: data
    }
}
export function closeFilterTag(index) {
    return {
        type: CLOSE_FILTER_TAG,
        payload: Promise.resolve(index)
    }
}

export function resetFilterTags() {
    return {
        type: RESET_TAGS
    }
}

export function fetchSavedFilters() {
    return {
        type: GET_SAVE_FILTERS,
        payload: axios.get('/prodex/api/product-offers/broadcasted/datagrid/saved-filters').then(response => response.data)
    }
}

export function deleteSaveFilter(id) {
    return {
        type: DELETE_SAVE_FILTER,
        payload: axios.delete(`/prodex/api/filters/${id}`)
    }
}

export function saveSaveFilter(inputs) {
    return {
        type: SAVE_SAVE_FILTER,
        payload: axios.post("/prodex/api/filters", inputs)
    }
}



