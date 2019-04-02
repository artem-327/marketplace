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
                typeRequest: 'ADMIN_GET_UNITS_OF_MEASURE_DATA'
            }
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
                typeRequest: 'ADMIN_GET_UNITS_OF_PACKAGING_DATA'
            }
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
                typeRequest: 'ADMIN_GET_MANUFACTURERS_DATA'
            }
        },

    },
}