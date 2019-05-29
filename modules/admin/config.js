export const config = {
  'CAS Products': {
    addEditText: 'CAS Product',
    addEditText2: 'CAS Product Alternative Names',
    searchText: 'Search cas product by name or number ...',
    display: {
      columns: [
        { name: 'casIndexName', title: 'Index Name' },
        { name: 'casNumber', title: 'CAS Number' },
        { name: 'chemicalName', title: 'Chemical Name' },
        { name: 'unNumberCode', title: 'UN Number' },
        { name: 'packagingGroup', title: 'Packaging Group' },
        { name: 'hazardClasses', title: 'Hazard Classes' },
      ],
    },
  },

  'Companies': {
    addEditText: 'Company',
    searchText: 'Search company by name',
    display: {
      columns: [
        { name: 'name', title: 'Company Name'},
        { name: 'primaryBranchAddress', title: 'Headquarters Address'},
        { name: 'primaryContact', title: 'Primary Contact'},
        { name: 'contactEmail', title: 'Contact E-mail'}
      ]
    }
  },

  'Units of Measure': {
    addEditText: 'Unit of Measure',
    searchText: 'Search unit of measure by name or measure type',
    display: {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'nameAbbreviation', title: 'Name Abbreviation' },
        { name: 'measureType', title: 'Measure Type' },
      ],
    },
    edit: [
      { name: 'name', title: 'Name', type: 'text', required: true },
      { name: 'nameAbbreviation', title: 'Name Abbreviation', type: 'text', required: true },
      { name: 'measureType', title: 'Measure Type', type: 'text', required: true },
    ],
    api: {
      get: {
        dataName: 'unitsOfMeasureRows',
        typeRequest: 'ADMIN_GET_UNITS_OF_MEASURE_DATA',
        typeSuccess: 'ADMIN_GET_UNITS_OF_MEASURE_DATA_FULFILLED',
        apiCall: '/prodex/api/units',
      },
      post: {
        typeRequest: 'ADMIN_POST_UNITS_OF_MEASURE_DATA',
        apiCall: '/prodex/api/units',
      },
      put: {
        typeRequest: 'ADMIN_PUT_UNITS_OF_MEASURE_DATA',
        apiCall: '/prodex/api/units/',
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_UNITS_OF_MEASURE_DATA',
        apiCall: '/prodex/api/units/',
      },
    },
  },

  'Units of Packaging': {
    addEditText: 'Unit of Packaging',
    searchText: 'Search unit of packaging by name or measure type',
    display: {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'measureType', title: 'Measure Type' },
      ],
    },
    edit: [
      { name: 'name', title: 'Name', type: 'text', required: true },
      { name: 'measureType', title: 'Measure Type', type: 'text', required: true },
    ],
    api: {
      get: {
        dataName: 'unitsOfPackagingRows',
        typeRequest: 'ADMIN_GET_UNITS_OF_PACKAGING_DATA',
        typeSuccess: 'ADMIN_GET_UNITS_OF_PACKAGING_DATA_FULFILLED',
        apiCall: '/prodex/api/packaging-types',
        /*
        retFcnProcess: (state, action, config) => {
          const rows = action.payload.map(data => {
            return {
              id: data.id,
              name: data.name,
              measureType: data.measureType,
            }
          })
          return {
            ...state,
            loading: false,
            [config.api.get.dataName]: rows
          }
        },*/
      },
      post: {
        typeRequest: 'ADMIN_POST_UNITS_OF_PACKAGING_DATA',
        apiCall: '/prodex/api/packaging-types',
      },
      put: {
        typeRequest: 'ADMIN_PUT_UNITS_OF_PACKAGING_DATA',
        apiCall: '/prodex/api/packaging-types/',
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_UNITS_OF_PACKAGING_DATA',
        apiCall: '/prodex/api/packaging-types/',
      },
    },
  },

  'Manufacturers': {
    addEditText: 'Manufacturer',
    searchText: 'Search manufacturer by name',
    display: {
      columns: [
        { name: 'name', title: 'Name' },
      ],
    },
    edit: [
      { name: 'name', title: 'Name', type: 'text', required: true },
    ],
    api: {
      get: {
        dataName: 'manufacturersRows',
        typeRequest: 'ADMIN_GET_MANUFACTURERS_DATA',
        typeSuccess: 'ADMIN_GET_MANUFACTURERS_DATA_FULFILLED',
        apiCall: '/prodex/api/manufacturers/search',
        retFcnProcess: (state, action, config) => { // Order alphabetically by name
          const rows = action.payload.sort(function(a, b){
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          })
          return {
            ...state,
            loading: false,
            [config.api.get.dataName]: rows
          }
        },
      },
      post: {
        typeRequest: 'ADMIN_POST_MANUFACTURERS_DATA',
        apiCall: '/prodex/api/manufacturers',
      },
      put: {
        typeRequest: 'ADMIN_PUT_MANUFACTURERS_DATA',
        apiCall: '/prodex/api/manufacturers/id/',
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_MANUFACTURERS_DATA',
        apiCall: '/prodex/api/manufacturers/id/',
      },
    },
  },

  'Grades': {
    addEditText: 'Grade',
    searchText: 'Search grade by name',
    display: {
      columns: [
        { name: 'name', title: 'Name' },
      ],
    },
    edit: [
      { name: 'name', title: 'Name', type: 'text', required: true },
    ],
    api: {
      get: {
        dataName: 'gradesRows',
        typeRequest: 'ADMIN_GET_GRADES_DATA',
        typeSuccess: 'ADMIN_GET_GRADES_DATA_FULFILLED',
        apiCall: '/prodex/api/product-grades',
      },
      post: {
        typeRequest: 'ADMIN_POST_GRADES_DATA',
        apiCall: '/prodex/api/product-grades',
      },
      put: {
        typeRequest: 'ADMIN_PUT_GRADES_DATA',
        apiCall: '/prodex/api/product-grades/',
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_GRADES_DATA',
        apiCall: '/prodex/api/product-grades/',
      },
    },
  },

  'Forms': {
    addEditText: 'Form',
    searchText: 'Search form by name',
    display: {
      columns: [
        { name: 'name', title: 'Name' },
      ],
    },
    edit: [
      { name: 'name', title: 'Name', type: 'text', required: true },
    ],
    api: {
      get: {
        dataName: 'formsRows',
        typeRequest: 'ADMIN_GET_FORMS_DATA',
        typeSuccess: 'ADMIN_GET_FORMS_DATA_FULFILLED',
        apiCall: '/prodex/api/product-forms',
      },
      post: {
        typeRequest: 'ADMIN_POST_FORMS_DATA',
        apiCall: '/prodex/api/product-forms',
      },
      put: {
        typeRequest: 'ADMIN_PUT_FORMS_DATA',
        apiCall: '/prodex/api/product-forms/',
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_FORMS_DATA',
        apiCall: '/prodex/api/product-forms/',
      },
    },
  },

  'Conditions': {
    addEditText: 'Condition',
    searchText: 'Search condition by name',
    display: {
      columns: [
        { name: 'name', title: 'Name' },
      ],
    },
    edit: [
      { name: 'name', title: 'Name', type: 'text', required: true },
    ],
    api: {
      get: {
        dataName: 'conditionsRows',
        typeRequest: 'ADMIN_GET_CONDITIONS_DATA',
        typeSuccess: 'ADMIN_GET_CONDITIONS_DATA_FULFILLED',
        apiCall: '/prodex/api/product-conditions',
      },
      post: {
        typeRequest: 'ADMIN_POST_CONDITIONS_DATA',
        apiCall: '/prodex/api/product-conditions',
      },
      put: {
        typeRequest: 'ADMIN_PUT_CONDITIONS_DATA',
        apiCall: '/prodex/api/product-conditions/',
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_CONDITIONS_DATA',
        apiCall: '/prodex/api/product-conditions/',
      },
    },
  },

  'Document Types': {
    addEditText: 'Document Type',
    searchText: 'Search document type by name',
    display: {
      columns: [
        { name: 'name', title: 'Name' },
      ],
    },
    edit: [
      { name: 'name', title: 'Name', type: 'text', required: true },
    ],
    api: {
      get: {
        dataName: 'documentTypesRows',
        typeRequest: 'ADMIN_GET_DOCUMENT_TYPES_DATA',
        typeSuccess: 'ADMIN_GET_DOCUMENT_TYPES_DATA_FULFILLED',
        apiCall: '/prodex/api/document-types',
      },
      post: {
        typeRequest: 'ADMIN_POST_DOCUMENT_TYPES_DATA',
        apiCall: '/prodex/api/document-types',
      },
      put: {
        typeRequest: 'ADMIN_PUT_DOCUMENT_TYPES_DATA',
        apiCall: '/prodex/api/document-types/id/',
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_DOCUMENT_TYPES_DATA',
        apiCall: '/prodex/api/document-types/id/',
      },
    },
  },
}