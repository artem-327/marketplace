const INIT_DATA_TABLE = 'INIT_DATA_TABLE'
const SELECT_ROW = 'SELECT_ROW'
const SELECT_GROUP = 'SELECT_GROUP'
const TOGGLE_VISIBLE_COLUMN = 'TOGGLE_VISIBLE_COLUMN'
const SELECT_DATA_TABLE = 'SELECT_DATA_TABLE'

export const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_DATA_TABLE: {
      return {
        ...state,
        [action.payload.id]: {
          header: action.payload.header,
          rowsOpns: action.payload.rowsOpns
        }
      }
    }
    case SELECT_ROW: {
      const { id } = action.payload
      const { groupId, rowId, checked, othersChecked, disabling } = action.payload.data
      return {
        ...state,
        [id]: {
          ...state[id],
          rowsOpns: state[id].rowsOpns.map(row =>
            row.index === groupId
              ? // modify selection of checkbox
                {
                  ...state[id].rowsOpns[groupId],
                  rows: state[id].rowsOpns[groupId].rows.map(rw =>
                    rw.index === rowId
                      ? {
                          ...state[id].rowsOpns[groupId].rows[rowId],
                          disabled: false,
                          selected: checked
                        }
                      : {
                          ...state[id].rowsOpns[groupId].rows[rw.index],
                          disabled: false
                        }
                  )
                }
              : // modify other rows if disabling allowed
              disabling
              ? {
                  ...state[id].rowsOpns[row.index],
                  group: {
                    ...state[id].rowsOpns[row.index].group,
                    disabled: checked || othersChecked
                  },
                  rows: state[id].rowsOpns[row.index].rows.map(rw => ({
                    ...state[id].rowsOpns[row.index].rows[rw.index],
                    disabled: checked || othersChecked,
                    selected: false
                  }))
                }
              : row
          )
        }
      }
    }
    case SELECT_GROUP: {
      const { id } = action.payload
      const { groupId, rows, checked, disabling } = action.payload.data
      return {
        ...state,
        [id]: {
          ...state[id],
          rowsOpns: state[id].rowsOpns.map(row =>
            row.index === groupId
              ? // modify selection of checkboxes
                {
                  ...state[id].rowsOpns[groupId],
                  rows: rows
                }
              : // modify other rows if disabling allowed
              disabling
              ? {
                  ...state[id].rowsOpns[row.index],
                  group: {
                    ...state[id].rowsOpns[row.index].group,
                    disabled: checked
                  },
                  rows: state[id].rowsOpns[row.index].rows.map(rw => ({
                    ...state[id].rowsOpns[row.index].rows[rw.index],
                    disabled: checked
                  }))
                }
              : row
          )
        }
      }
    }
    case SELECT_DATA_TABLE: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          rowsOpns: action.payload.rowsOpns
        }
      }
    }
    case TOGGLE_VISIBLE_COLUMN: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          header: state[action.payload.id].header.map(h =>
            h.index === action.payload.headerId
              ? { ...state[action.payload.id].rowsOpns[action.payload.headerId], visible: action.payload.value }
              : h
          )
        }
      }
    }
    default:
      return state
  }
}

export function initDataTable(id, header, rowsOpns) {
  return {
    type: INIT_DATA_TABLE,
    payload: { id, header, rowsOpns }
  }
}

export function selectRow(id, data) {
  return {
    type: SELECT_ROW,
    payload: { id, data }
  }
}

export function selectGroup(id, data) {
  return {
    type: SELECT_GROUP,
    payload: { id, data }
  }
}

export function selectDataTable(id, rowsOpns) {
  return {
    type: SELECT_DATA_TABLE,
    payload: { id, rowsOpns }
  }
}

export function toggleVisibleColumn(id, headerId, value) {
  return {
    type: TOGGLE_VISIBLE_COLUMN,
    payload: { id, headerId, value }
  }
}
