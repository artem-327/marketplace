import {createAction} from 'redux-promise-middleware-actions'

export const addMessage = createAction('ADD_MESSAGE', (message) => message)
export const removeMessage = createAction('REMOVE_MESSAGE', (index) => index)