import axios from "axios";

const SEARCH = 'SEARCH';

export const initialState = {
    searchForm: {
        isFetching: false,
        hasError: false,
        isValid: false,
        data: {
            fulltext: "",
        }
    },

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: {
            return state
        }
    }
}


export function search(fulltext) {
    return {
        type: SEARCH,
        payload: axios({
            method: 'post',
            url: "/api/v1/search",
            data: {
                email: fulltext,
            }
        })
    }
}


