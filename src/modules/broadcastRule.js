import axios from 'axios';

const CHANGE_RULES = "CHANGE_RULES";

export const initialState = {
    rules:[]
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        
        default: {
            return state
        }
    }
}

export function sendRules(data) {
    return {
        type: CHANGE_RULES,
        payload: axios.post("/api/vz2734/broadcast-rules/",data)
    }
}
