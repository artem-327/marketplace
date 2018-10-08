const INIT_DATA_TABLE = 'INIT_DATA_TABLE';

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
        default: return state;
    }
}

export function initDataTable(id, header, rows){
    return {
        type: INIT_DATA_TABLE,
        payload: {id, header, rows}
    }
}
