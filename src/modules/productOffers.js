import axios from 'axios';

//Veškeré konstanty pro tento reducer
const GET_PRODUCTOFF = 'GET_PRODUCTOFF';
const GET_PRODUCTOFF_FULFILLED = 'GET_PRODUCTOFF_FULFILLED';
const GET_PRODUCTOFF_PENDING = 'GET_PRODUCTOFF_PENDING';

export const initialState = {
    data: [],
    isFetching: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTOFF_PENDING: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case GET_PRODUCTOFF_FULFILLED: {
            return {
                ...state,
                data: action.payload,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}

export function fetchAll(filter = {}) {
    return {
        type: GET_PRODUCTOFF,
        payload: axios({
            method: 'get',
            url: "/api/v1/product-offers/",
            params: {
                search: filter.search,
                qntylb: filter.qntylb,
                qntyub: filter.qntyub,
                prclb: filter.prclb,
                prcub: filter.prcub,
                loc: filter.loc,
                pckgs: filter.pckgs
            }
        }).then((response) => {
            return response.data.data.productOffers
        })
    }
}
