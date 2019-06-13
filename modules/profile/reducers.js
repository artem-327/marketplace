//import * as AT from "./action-types"


export const initialState = {
  myData: null,

}



export default function reducer(state = initialState, action) {
  const {payload} = action

  switch (action.type) {


    default: {
      return state
    }

  }
}