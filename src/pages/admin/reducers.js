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
        {	name: 'Units of Packaging', id: 2 },
        {	name: 'Manufacturers', id: 3 },
        {	name: 'Grades', id: 4 },
        {	name: 'Forms', id: 5 },
        {	name: 'Conditions', id: 6 },
    ],
    currentTab: 'Manufacturers',
    currentEditForm: null,
    currentAddForm: null,
    filterValue: '',

    config: {
        'Units of Measure': {
            columns: [
                {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
                {name: 'name', title: 'Name'},
                {name: 'nameAbbreviation', title: 'Name abbreviation',},
                {name: 'measureType', title: 'Measure type'},
            ],
            cosiDalsiho: 10
        },
        'Units of Packaging': {
            columns: [
                {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
                {name: 'name', title: 'Name'},
                {name: 'measureType', title: 'Measure type'},
            ],
            cosiDalsiho: 20
        },
        'Manufacturers': {
            columns: [
                {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
                {name: 'name', title: 'Name'},
            ],
            cosiDalsiho: 30
        }
    },


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
            const rows = action.payload.map(data => {
                return (
                    {
                        name: data.name,
                        nameAbbreviation: data.nameAbbreviation,
                        measureType: data.measureType,
                        id: data.id
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