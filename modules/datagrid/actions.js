import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'

export const initTable = createAction('DATAGRID_INIT', opts => opts)
