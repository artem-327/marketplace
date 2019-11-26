import { CHANGE_ELEMENT } from '../constants/SaveFilterItem.constants'

const initialState = {
  bell0: false,
  notifications0: false,
  selected0: false,
  active0: false,
  email0: false,
  mobile0: false,
  system0: false,
  toolTip0: false,
  bellKey: 0,
  notificationsKey: 0,
  selectedKey: 0,
  activeKey: 0,
  emailKey: 0,
  mobileKey: 0,
  systemKey: 0,
  toolTipKey: 0
}

export const show = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_ELEMENT:
      return Object.assign({}, state, {
        [action.payload + action.key]: !state[action.payload + action.key],
        [action.payload + 'Key']: action.key
      })
    default:
      return state
  }
}
