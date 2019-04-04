export const config = {
    'Units of Measure': {
        display: {
            columns: [
                {name: 'name', title: 'Name'},
                {name: 'nameAbbreviation', title: 'Name abbreviation',},
                {name: 'measureType', title: 'Measure type'},
            ],
        },
        edit: [
            {name: 'name', title: 'Name', type: 'text', required: true},
            {name: 'nameAbbreviation', title: 'Name abbreviation', type: 'text', required: true},
            {name: 'measureType', title: 'Measure type',  type: 'text', required: true},
        ],
        api: {
            get: {
                dataName: 'unitsOfMeasureRows',
                typeRequest: 'ADMIN_GET_UNITS_OF_MEASURE_DATA',
                typeSuccess: 'ADMIN_GET_UNITS_OF_MEASURE_DATA_SUCCESS',
                apiCall: '/prodex/api/units',
            },
            post: {
                typeRequest: 'ADMIN_POST_UNITS_OF_MEASURE_DATA',
                apiCall: '/prodex/api/units',
            },
            delete: {
                typeRequest: 'ADMIN_DELETE_UNITS_OF_MEASURE_DATA',
                apiCall: '/prodex/api/units/',
            },
        },
    },

    'Units of Packaging': {
        display: {
            columns: [
                {name: 'name', title: 'Name'},
                {name: 'measureType', title: 'Measure type'},
            ],
        },
        edit: [
            {name: 'name', title: 'Name', type: 'text', required: true},
            {name: 'measureType', title: 'Measure type', type: 'text', required: true},
        ],
        api: {
            get: {
                dataName: 'unitsOfPackagingRows',
                typeRequest: 'ADMIN_GET_UNITS_OF_PACKAGING_DATA',
                typeSuccess: 'ADMIN_GET_UNITS_OF_PACKAGING_DATA_SUCCESS',
                apiCall: '/prodex/api/packaging-types',
                retFcnProcess: (state, action, config) => {
                    const rows = action.payload.map(data => {
                        return {
                            id: data.id,
                            name: data.name,
                            measureType: data.measureType,
                        }
                    });
                    return {
                        ...state,
                        [config.api.get.dataName]: rows
                    }
                },
            },
            post: {
                typeRequest: 'ADMIN_POST_UNITS_OF_PACKAGING_DATA',
                apiCall: '/prodex/api/packaging-types',
            },
            delete: {
                typeRequest: 'ADMIN_DELETE_UNITS_OF_PACKAGING_DATA',
                apiCall: '/prodex/api/packaging-types/',
            },
        },
    },

    'Manufacturers': {
        display: {
            columns: [
                {name: 'name', title: 'Name'},
            ],
        },
        edit: [
            {name: 'name', title: 'Name', type: 'text', required: true},
        ],
        api: {
            get: {
                dataName: 'manufacturersRows',
                typeRequest: 'ADMIN_GET_MANUFACTURERS_DATA',
                typeSuccess: 'ADMIN_GET_MANUFACTURERS_DATA_SUCCESS',
                apiCall: '/prodex/api/manufacturers',
            },
            post: { //! ! chybi POST na BE
                typeRequest: 'ADMIN_POST_MANUFACTURERS_DATA',
                apiCall: '/prodex/api/manufacturers',
            },
            delete: {
                typeRequest: 'ADMIN_DELETE_MANUFACTURERS_DATA',
                apiCall: '/prodex/api/manufacturers/',
            },
        },
    },

    'Grades': {
        display: {
            columns: [
                {name: 'name', title: 'Name'},
            ],
        },
        edit: [
            {name: 'name', title: 'Name', type: 'text', required: true},
        ],
        api: {
            get: {
                dataName: 'gradesRows',
                typeRequest: 'ADMIN_GET_GRADES_DATA',
                typeSuccess: 'ADMIN_GET_GRADES_DATA_SUCCESS',
                apiCall: '/prodex/api/product-grades',
            },
            post: {
                typeRequest: 'ADMIN_POST_GRADES_DATA',
                apiCall: '/prodex/api/product-grades',
            },
            delete: {
                typeRequest: 'ADMIN_DELETE_GRADES_DATA',
                apiCall: '/prodex/api/product-grades/',
            },
        },
    },

    'Forms': {
        display: {
            columns: [
                {name: 'name', title: 'Name'},
            ],
        },
        edit: [
            {name: 'name', title: 'Name', type: 'text', required: true},
        ],
        api: {
            get: {
                dataName: 'formsRows',
                typeRequest: 'ADMIN_GET_FORMS_DATA',
                typeSuccess: 'ADMIN_GET_FORMS_DATA_SUCCESS',
                apiCall: '/prodex/api/product-forms',
            },
            post: {
                typeRequest: 'ADMIN_POST_FORMS_DATA',
                apiCall: '/prodex/api/product-forms',
            },
            delete: {
                typeRequest: 'ADMIN_DELETE_FORMS_DATA',
                apiCall: '/prodex/api/product-forms/',
            },
        },
    },

    'Conditions': {
        display: {
            columns: [
                {name: 'name', title: 'Name'},
            ],
        },
        edit: [
            {name: 'name', title: 'Name', type: 'text', required: true},
        ],
        api: {
            get: {
                dataName: 'conditionsRows',
                typeRequest: 'ADMIN_GET_CONDITIONS_DATA',
                typeSuccess: 'ADMIN_GET_CONDITIONS_DATA_SUCCESS',
                apiCall: '/prodex/api/product-conditions',
            },
            post: {
                typeRequest: 'ADMIN_POST_CONDITIONS_DATA',
                apiCall: '/prodex/api/product-conditions',
            },
            delete: {
                typeRequest: 'ADMIN_DELETE_CONDITIONS_DATA',
                apiCall: '/prodex/api/product-conditions/',
            },
        },
    },
}