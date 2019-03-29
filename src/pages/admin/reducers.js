import * as AT from './action-types'

export const initialState = {
    editPopupBoolean: false,
    unitsOfMeasureRows: [],

    columnsForFormatter: {
        checkboxColumns: ['checkbox'],
        permissionsColumns: ['permissions'],
        editDeleteColumns: ['editDeleteBtn']
    },

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
    filterValue: '',

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

        case AT.ADMIN_HANDLE_FILTERS_VALUE: {
            console.log('!!!!!!! - ADMIN_HANDLE_FILTERS_VALUE - Reducers - ', action.payload);
            return {
                ...state,
                filterValue: action.payload
            }
        }

        case AT.ADMIN_OPEN_ADD_POPUP: {
            console.log('!!!!!!! - ADMIN_OPEN_ADD_POPUP - Reducers - ', action.payload);
            return {
                ...state,
                currentAddForm: state.currentTab,
                popupValues: action.payload
            }
        }





        case AT.ADMIN_GET_UNITS_OF_MEASURE_DATA_SUCCESS: {
            const rows = action.payload.map(unitsOfMeasure => {
                return (
                    {
                        name: unitsOfMeasure.name,
                        nameAbbreviation: unitsOfMeasure.nameAbbreviation,
                        measureType: unitsOfMeasure.measureType,
                        id: unitsOfMeasure.id
                    }
                )
            })

            return {
                ...state,
                unitsOfMeasureRows: rows
            }
        }










        default: {
            return state
        }
    }
}