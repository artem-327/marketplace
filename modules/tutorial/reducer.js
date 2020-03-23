import * as AT from './action-types'

export const initialState = {
  isChangedTutorial: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AT.CHANGE_TUTORIAL_TAB: {
      console.log('CHANGE_TUTORIAL_TAB')

      return {
        isChangedTutorial: !state.isChangedTutorial
      }
    }

    default: {
      return state
    }
  }
}
