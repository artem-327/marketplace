import { FormattedMessage } from 'react-intl'

export const config = {
  'CAS Products': {
    addEditText: <FormattedMessage id='admin.casProduct' defaultMessage='CAS Product' />,
    formattedMessageName: 'casProduct',
    addEditText2: <FormattedMessage id='admin.casProductAltNames' />,
    searchText: 'admin.searchCasProduct',
    display: {
      columns: [
        { name: 'casIndexName', title: 'Index Name', width: 375, sortPath: 'CasProduct.casIndexName' },
        { name: 'casNumber', title: 'CAS Number', width: 150, sortPath: 'CasProduct.casNumber' },
        { name: 'chemicalName', title: 'Chemical Name', width: 375, sortPath: 'CasProduct.chemicalName' },
        { name: 'unNumberCode', title: 'UN Number', width: 150, sortPath: 'CasProduct.unNumber.unNumberCode' },
        { name: 'packagingGroup', title: 'Packaging Group', width: 150, sortPath: 'CasProduct.packagingGroup.groupCode' },
        { name: 'hazardClasses', title: 'Hazard Classes', width: 150 },
      ],
    },
  },

  'Companies': {
    addEditText: <FormattedMessage id='admin.company' defaultMessage='COMPENY' />,
    formattedMessageName: 'company',
    searchText: 'admin.searchCompany',
    display: {
      columns: [
        { name: 'displayName', title: 'Company Name', sortPath: 'Company.name' },
        { name: 'primaryBranchAddress', title: 'Headquarters Address', sortPath: 'Company.primaryBranch.address.streetAddress' },
        { name: 'primaryContact', title: 'Primary Contact', sortPath: 'ClientCompany.primaryBranch.contactName' },
        { name: 'contactEmail', title: 'Contact E-mail', sortPath: 'ClientCompany.primaryBranch.contactEmail' },
        { name: 'hasDwollaAccount', title: 'Dwolla Account' },
      ]
    }
  },

  'Units of Measure': {
    addEditText: <FormattedMessage id='admin.unitOfMeasure' />,
    formattedMessageName: 'unitOfMeasurement',
    searchText: 'admin.searchUnitOfMeasure',
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
    addEditText: <FormattedMessage id='admin.unitOfPackaging' />,
    formattedMessageName: 'unitOfPackaging',
    searchText: 'admin.searchUnitOfPackaging',
    display: {
      columns: [
        { name: 'name', title: 'Name', sortPath: 'PackagingType.name' },
        { name: 'measureType', title: 'Measure Type', sortPath: 'PackagingType.measureType.name' },
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
    tableName: 'admin_manufacturers',
    addEditText: <FormattedMessage id='admin.manufacturer' />, 
    formattedMessageName: 'manufacturer',
    searchText: 'admin.searchManufacturer',
    display: {
      columns: [
        { name: 'name', title: 'Name', sortPath: 'Manufacturer.name' },
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
          const rows = action.payload.sort(function (a, b) {
            let x = a.name.toLowerCase()
            let y = b.name.toLowerCase()
            if (x < y) { return -1 }
            if (x > y) { return 1 }
            return 0
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
    tableName: 'admin_grades',
    addEditText: <FormattedMessage id='admin.grade' defaultMessage='Grade' />,
    formattedMessageName: 'grade',
    searchText: 'admin.searchGrade',
    display: {
      columns: [
        { name: 'name', title: 'Name', sortPath: 'ProductGrade.name' },
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
    tableName: 'admin_forms',
    addEditText: <FormattedMessage id='admin.form' defaultMessage='Form' />,
    formattedMessageName: 'form',
    searchText: 'admin.searchForm',
    display: {
      columns: [
        { name: 'name', title: 'Name', sortPath: 'ProductForm.name' },
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
    tableName: 'admin_conditions',
    addEditText: <FormattedMessage id='admin.condition' defaultMessage='Condition' />,
    formattedMessageName: 'condition',
    searchText: 'admin.searchCondition',
    display: {
      columns: [
        { name: 'name', title: 'Name', sortPath: 'ProductCondition.name' },
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
    tableName: 'admin_document_types',
    addEditText: <FormattedMessage id='admin.documentType' defaultMessage='Document Type' />,
    formattedMessageName: 'documentType',
    searchText: 'admin.searchDocumentType',
    display: {
      columns: [
        { name: 'name', title: 'Name', sortPath: 'DocumentType.name' },
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

  'Market Segments': {
    tableName: 'admin_market_segments',
    addEditText: <FormattedMessage id='admin.marketSegment' defaultMessage='Market Segment' />,
    formattedMessageName: 'marketSegment',
    searchText: 'admin.searchMarketSegment',
    display: {
      columns: [
        { name: 'name', title: 'Name', sortPath: 'MarketSegment.name' }
      ]
    },
    edit: [
      { name: 'name', title: 'Name', type: 'text', required: true }
    ],
    api: {
      get: {
        dataName: 'marketSegmentsRows',
        typeRequest: 'ADMIN_GET_MARKET_SEGMENTS_DATA',
        typeSuccess: 'ADMIN_GET_MARKET_SEGMENTS_DATA_FULFILLED',
        apiCall: '/prodex/api/market-segments',
      },
      post: {
        typeRequest: 'ADMIN_POST_MARKET_SEGMENTS_DATA',
        apiCall: '/prodex/api/market-segments',
      },
      put: {
        typeRequest: 'ADMIN_PUT_MARKET_SEGMENTS_DATA',
        apiCall: '/prodex/api/market-segments/id/',
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_MARKET_SEGMENTS_DATA',
        apiCall: '/prodex/api/market-segments/id/',
      }
    }
  }
}