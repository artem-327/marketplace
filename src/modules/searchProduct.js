import axios from "axios";

const SEARCH_PRODUCT = 'SEARCH_PRODUCT';

export const initialState = {
    results: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: {
            return state
        }
    }
}


export function searchProduct(fulltext) {
    return {
        type: SEARCH_PRODUCT,
        payload: axios({
            method: 'post',
            url: "/api/v1/search",
            data: {
                email: fulltext,
            }
        })
    }
}


