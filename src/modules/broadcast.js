import {
  BROADCAST_FETCH_REQUESTED, 
  BROADCAST_FETCH_SUCCEEDED
} from "../constants/broadcast";

export const initialState = {
  broadcastData: {},
  isFetching: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
      case BROADCAST_FETCH_REQUESTED: {
          return {
              ...state,
              isFetching: true,
          }
      }
      case BROADCAST_FETCH_SUCCEEDED: {
          return {
              ...state,
              broadcastData: action.payload,
              isFetching: false
          }
      }
      default: {
          return state
      }
  }
}
export function fetchBroadcast(){
  return {type: BROADCAST_FETCH_REQUESTED}
}
