import * as AT from './action-types'
import { config } from './config'

export const initialState = {
    editPopupBoolean: false,
    addNewPopup: false,
    popupValues: [],
    unitsOfMeasureRows: [],
    unitsOfPackagingRows: [],
    manufacturersRows: [],
    gradesRows: [],
    formsRows: [],
    conditionsRows: [],
    casProductsRows: [],

    columnsForFormatter: {
        checkboxColumns: ['checkbox'],
        permissionsColumns: ['permissions'],
        editDeleteColumns: ['editDeleteBtn']
    },

    tabsNames: [
        {	name: 'CAS Products', id: 7 },
        {	name: 'Units of Measure', id: 1 },
        {	name: 'Units of Packaging', id: 2 },
        {	name: 'Manufacturers', id: 3 },
        {	name: 'Grades', id: 4 },
        {	name: 'Forms', id: 5 },
        {	name: 'Conditions', id: 6 },
    ],
    currentTab: 'Units of Measure',
    casListDataRequest: { pageSize: 50, pageStart: 0},
    currentEditForm: null,
    currentAddForm: null,
    confirmMessage: null,
    filterValue: '',
    config: config,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {


        case AT.ADMIN_OPEN_ADD_POPUP: {
            return {
                ...state,
                currentAddForm: state.currentTab,
                popupValues: action.payload
            };
        }
        case AT.ADMIN_CLOSE_ADD_POPUP: {
            return {
                ...state,
                currentAddForm: null,
                currentEditForm: null
            };
        }

        case AT.ADMIN_OPEN_EDIT_POPUP: {
            return {
                ...state,
                currentEditForm: state.currentTab,
                editPopupBoolean: state.editPopupBoolean === false ? true : false,
                popupValues: action.payload
            };
        }
        case AT.ADMIN_CLOSE_EDIT_POPUP: {
            return {
                ...state,
                currentEditForm: null
            };
        }



        case AT.ADMIN_HANDLE_ACTIVE_TAB: {
            return {
                ...state,
                currentTab: action.payload.tab,
                currentAddForm: null,
                currentEditForm: null
            }
        }

        case AT.ADMIN_HANDLE_FILTERS_VALUE: {
            return {
                ...state,
                filterValue: action.payload
            }
        }

        case AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER_FULFILLED:
        case AT.ADMIN_GET_CAS_PRODUCT_BY_STRING_FULFILLED: {
            return {
                ...state,
                casProductsRows: action.payload
            }
        }




        default: {
            for (let groupName in config) {
                if (typeof config[groupName].api !== 'undefined') {
                    for (let item in config[groupName].api) {
                        switch (item) {
                            case 'get':
                                    if (config[groupName].api.get.typeSuccess === action.type)
                                    {
                                        if (typeof config[groupName].api.get.retFcnProcess !== 'undefined') {
                                            return config[groupName].api.get.retFcnProcess(state, action, config[groupName]);
                                        }
                                        else {
                                            const rows = action.payload.map(data => {
                                                return data
                                            });

                                            return {
                                                ...state,
                                                [config[groupName].api.get.dataName]: rows
                                            }
                                        }
                                    }
                                break;
                        }
                    }
                }
            }
            return state
        }
    }
}