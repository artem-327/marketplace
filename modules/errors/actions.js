import Router from 'next/router'
import { createAction } from 'redux-promise-middleware-actions'

export const displayErrorForbidden = createAction('ERRORS_DISPLAY_FORBIDDEN', () => {
  const hasWindow = typeof window !== 'undefined'
  hasWindow && window.localStorage.setItem('errorStatus', '403')
  Router.push('/errors')
})