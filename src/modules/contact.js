import axios from "axios";

const SEND_MESSAGE= 'SEND_MESSAGE';
const SEND_MESSAGE_PENDING = 'SEND_MESSAGE_PENDING';
const SEND_MESSAGE_REJECTED = 'SEND_MESSAGE_REJECTED';
const SEND_MESSAGE_FULFILLED = 'SEND_MESSAGE_FULFILLED';

export const initialState = {
    landingForm: {
        isFetching: false,
        hasError: false,
        isValid: false,
        data:{
            name: "",
            email: "",
            phone: "",
            text: ""
        }
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE_PENDING: {
            return {...state, landingForm:{isFetching: true, hasError:false, isValid: false}}
        }
        case SEND_MESSAGE_REJECTED: {
            return {...state, landingForm:{isFetching: false, hasError:true, isValid: false}}
        }
        case SEND_MESSAGE_FULFILLED: {
            return {
                ...state,
                landingForm: {
                    isFetching: false,
                    hasError: false,
                    isValid: true,
                }
            }
        }
        default: {
            return state
        }
    }
}

export function sendMessage(name, email, phone, text){
    return {
        type: SEND_MESSAGE,
        payload: axios({
            method: 'post',
            url: "/api/v1/meetings",
            data: { name, email, phone, text }
        })
    }
}

