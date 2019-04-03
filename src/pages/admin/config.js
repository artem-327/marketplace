export const config = {
    'Units of Measure': {
        columns: [
            {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
            {name: 'name', title: 'Name'},
            {name: 'nameAbbreviation', title: 'Name abbreviation',},
            {name: 'measureType', title: 'Measure type'},
        ],
        api: {
            get: {
                dataName: 'unitsOfMeasureRows',
                typeRequest: 'ADMIN_GET_UNITS_OF_MEASURE_DATA',
                typeSuccess: 'ADMIN_GET_UNITS_OF_MEASURE_DATA_SUCCESS',
                apiCall: '/prodex/api/units',
            },
        },
    },

    'Units of Packaging': {
        columns: [
            {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
            {name: 'name', title: 'Name'},
            {name: 'measureType', title: 'Measure type'},
        ],
        api: {
            get: {
                dataName: 'unitsOfPackagingRows',
                typeRequest: 'ADMIN_GET_UNITS_OF_PACKAGING_DATA',
                typeSuccess: 'ADMIN_GET_UNITS_OF_PACKAGING_DATA_SUCCESS',
                apiCall: '/prodex/api/packaging-types',
                retFcnProcess: (state, payload, groupName) => {
                    const rows = payload.map(data => {
                        return {
                            name: data.name,
                            measureType: data.measureType,
                        }
                    });
                    return {
                        ...state,
                        [config[groupName].api.get.dataName]: rows
                    }
                },
            },
        },
    },

    'Manufacturers': {
        columns: [
            {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
            {name: 'name', title: 'Name'},
        ],
        api: {
            get: {
                dataName: 'manufacturersRows',
                typeRequest: 'ADMIN_GET_MANUFACTURERS_DATA',
                typeSuccess: 'ADMIN_GET_MANUFACTURERS_DATA_SUCCESS',
                apiCall: '/prodex/api/manufacturers',
            },
        },
    },

    'Grades': {
        columns: [
            {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
            {name: 'name', title: 'Name'},
        ],
        api: {
            get: {
                dataName: 'gradesRows',
                typeRequest: 'ADMIN_GET_GRADES_DATA',
                typeSuccess: 'ADMIN_GET_GRADES_DATA_SUCCESS',
                apiCall: '/prodex/api/product-grades',
            },
        },
    },

    'Forms': {
        columns: [
            {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
            {name: 'name', title: 'Name'},
        ],
        api: {
            get: {
                dataName: 'formsRows',
                typeRequest: 'ADMIN_GET_FORMS_DATA',
                typeSuccess: 'ADMIN_GET_FORMS_DATA_SUCCESS',
                apiCall: '/prodex/api/product-forms',
            },
        },
    },

    'Conditions': {
        columns: [
            {name: 'editDeleteBtn', title: ' ', width: 45, dropdown: true},
            {name: 'name', title: 'Name'},
        ],
        api: {
            get: {
                dataName: 'conditionsRows',
                typeRequest: 'ADMIN_GET_CONDITIONS_DATA',
                typeSuccess: 'ADMIN_GET_CONDITIONS_DATA_SUCCESS',
                apiCall: '/prodex/api/product-conditions',
            },
        },
    },
}