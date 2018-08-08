import axios from 'axios';

//Veškeré konstanty pro tento reducer
const GET_MERCHANT = 'GET_MERCHANT';
const ACCEPT_MERCHANT = 'ACCEPT_MERCHANT';
const REJECT_MERCHANT = 'REJECT_MERCHANT';
const UPDATE_APPROVE = 'UPDATE_APPROVE';


export const initialState = {
    data:[],
    approvedMerchants:{},
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        
        case GET_MERCHANT: {
            return {
                ...state,
                data: action.payload,
                isFetching: false
            }
        }

        case UPDATE_APPROVE: {
            return {
                
                ...state,
                
            }
        }
        default: {
            return state
        }
    }
}

export function getData() {
    return {
        type: GET_MERCHANT,
        payload:[
            {
                id:1,
                name:"Mic",
                surname:"Hal",
                email:"gg@nore.com",
                approve:true
            },
            {
                id:2,
                name:"Hor",
                surname:"Nak",
                email:"rip@inpc.com",
                approve:false
            }
        ]
    }
}

export function approveMerchant(id){
    return {
        type: UPDATE_APPROVE,
        payload: axios({
          method: 'post',
          url: "api/v1/merchant/"+id+"/approved/"  
        })
    }
}

export function acceptMerchant(id) {
    return {
        type: ACCEPT_MERCHANT,
        payload: axios({
            method: 'get',
            url: "/api/v1/operator/approve-merchant/" + id,
        })
    }
}

export function rejectMerchant(id) {
    return {
        type: REJECT_MERCHANT,
        payload: axios({
            method: 'get',
            url: "/api/v1/operator/reject-merchant/" + id,
        })
    }
}

