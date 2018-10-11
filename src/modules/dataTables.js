const INIT_DATA_TABLE = 'INIT_DATA_TABLE';
const SELECT_ROW = 'SELECT_ROW';
const SELECT_GROUP = 'SELECT_GROUP';
const TOGGLE_VISIBLE_COLUMN = 'TOGGLE_VISIBLE_COLUMN';

export const initialState = {

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INIT_DATA_TABLE:{
            return{
                ...state,
                [action.payload.id]: {
                    header: action.payload.header,
                    rows: action.payload.rows
                }
            }
        }
        case SELECT_ROW:{
            return{
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    rows: state[action.payload.id].rows.map((row) => (
                        row.index === action.payload.groupId ?
                            {...state[action.payload.id].rows[action.payload.groupId],
                                rows: state[action.payload.id].rows[action.payload.groupId].rows.map((rw) => (
                                    rw.index === action.payload.rowId ?
                                        {...state[action.payload.id].rows[action.payload.groupId].rows[action.payload.rowId],
                                            selected: action.payload.value
                                        } : rw
                                ))
                            } : row
                    ))
                }
            }
        }
        case SELECT_GROUP:{
            return{
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    rows: state[action.payload.id].rows.map((row) => (
                        row.index === action.payload.groupId ?
                            {...state[action.payload.id].rows[action.payload.groupId],
                                rows: action.payload.rows
                            } : row
                    ))
                }
            }
        }
        case TOGGLE_VISIBLE_COLUMN: {
            return{
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    header: state[action.payload.id].header.map((h) => (
                        h.index === action.payload.headerId ?
                            {...state[action.payload.id].rows[action.payload.headerId],
                                visible: action.payload.value
                            } : h
                    ))
                }
            }
        }
        default: return state;
    }
}

export function initDataTable(id, header, rows){
    return {
        type: INIT_DATA_TABLE,
        payload: {id, header, rows}
    }
}

export function selectRow(id, groupId, rowId, value){
    return {
        type: SELECT_ROW,
        payload: {id, groupId, rowId, value}
    }
}

export function selectGroup(id, groupId, rows){
    return {
        type: SELECT_GROUP,
        payload: {id, groupId, rows}
    }
}

export function toggleVisibleColumn(id, headerId, value){
    return {
        type: TOGGLE_VISIBLE_COLUMN,
        payload: {id, headerId, value}
    }
}