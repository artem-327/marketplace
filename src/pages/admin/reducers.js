import * as AT from './action-types'

export const initialState = {


    tabsNames: [
        {	name: 'Units of Measure', id: 1 },
        {	name: 'Unit of Packaging', id: 2 },
        {	name: 'Manufacturers', id: 3 },
        {	name: 'Grades', id: 4 },
        {	name: 'Forms', id: 5 },
        {	name: 'Conditions', id: 6 },
    ],
    currentTab: 'Manufacturers',
    currentEditForm: null,
    currentAddForm: null,

}

export default function reducer(state = initialState, action) {
    switch (action.type) {







        case AT.ADMIN_HANDLE_ACTIVE_TAB: {
            console.log('!!!!!!! - ADMIN_HANDLE_ACTIVE_TAB - Reducers - ', action.payload.tab);
            return {
                ...state,
                currentTab: action.payload.tab,
                currentAddForm: null,
                currentEditForm: null
            }
        }







        default: {
            return state
        }
    }
}