import { FormattedMessage } from 'react-intl'

export const config = {
  'CAS Products': {
    addEditText: <FormattedMessage id='admin.casProduct' defaultMessage='CAS Product'>{(text) => text}</FormattedMessage>,
    formattedMessageName: 'casProduct',
    addEditText2: <FormattedMessage id='admin.casProductAltNames' />,
    searchText: 'admin.searchCasProduct',
    display: {
      columns: [
        { name: 'casIndexName', title: <FormattedMessage id='global.indexName' defaultMessage='Index Name'>{text => text}</FormattedMessage>, width: 375, sortPath: 'CasProduct.casIndexName' },
        { name: 'casNumber', title: <FormattedMessage id='global.casNumber' defaultMessage='CAS Number'>{text => text}</FormattedMessage>, width: 150, sortPath: 'CasProduct.casNumber' },
        { name: 'chemicalName', title: <FormattedMessage id='global.chemicalName' defaultMessage='Chemical Name'>{text => text}</FormattedMessage>, width: 375, sortPath: 'CasProduct.chemicalName' },
        { name: 'unNumberCode', title: <FormattedMessage id='global.unNumber' defaultMessage='UN Number'>{text => text}</FormattedMessage>, width: 150, sortPath: 'CasProduct.unNumber.unNumberCode' },
        { name: 'packagingGroup', title: <FormattedMessage id='global.packagingGroup' defaultMessage='Packaging Group'>{text => text}</FormattedMessage>, width: 150, sortPath: 'CasProduct.packagingGroup.groupCode' },
        { name: 'hazardClasses', title: <FormattedMessage id='global.hazardClasses' defaultMessage='Hazard Classes'>{text => text}</FormattedMessage>, width: 150 },
      ],
    },
  },

  'Companies': {
    addEditText: <FormattedMessage id='admin.company' defaultMessage='Company'>{text => text}</FormattedMessage>,
    formattedMessageName: 'company',
    searchText: 'admin.searchCompany',
    display: {
      columns: [
        { name: 'displayName', title: <FormattedMessage id='global.companyName' defaultMessage='Company Name'>{text => text}</FormattedMessage>, sortPath: 'Company.name' },
        { name: 'primaryBranchAddress', title: <FormattedMessage id='global.headquaterAddress' defaultMessage='Headquarters Address'>{text => text}</FormattedMessage>, sortPath: 'Company.primaryBranch.address.streetAddress' },
        { name: 'primaryContact', title: <FormattedMessage id='global.primaryContact' defaultMessage='Primary Contact'>{text => text}</FormattedMessage>, sortPath: 'ClientCompany.primaryBranch.contactName' },
        { name: 'contactEmail', title: <FormattedMessage id='global.contactEmail' defaultMessage='Contact E-mail'>{text => text}</FormattedMessage>, sortPath: 'ClientCompany.primaryBranch.contactEmail' },
        { name: 'hasDwollaAccount', title: <FormattedMessage id='global.dwollaAccount' defaultMessage='Dwolla Account'>{text => text}</FormattedMessage> },
        { name: 'hasLogisticsAccounts', title: <FormattedMessage id='global.logisticAccounts' defaultMessage='Logistics Accounts'>{text => text}</FormattedMessage> },
        { name: 'reviewRequested', title: <FormattedMessage id='global.reviewRequested' defaultMessage='Review Requested'>{text => text}</FormattedMessage> }
      ]
    }
  },

  'Product Catalog': {
    addEditText: <FormattedMessage id='admin.echoProducts' defaultMessage='Echo Product'>{text => text}</FormattedMessage>,
    formattedMessageName: 'echoProducts',
    searchText: 'admin.searchEchoProduct',
    display: {
      columns: [
        { name: 'name', title: <FormattedMessage id='global.productName' defaultMessage='Product Name'>{text => text}</FormattedMessage>, sortPath: 'EchoProduct.name' },
        { name: 'code', title: <FormattedMessage id='global.productCode' defaultMessage='Product Code'>{text => text}</FormattedMessage>, sortPath: 'EchoProduct.code' },
        { name: 'manufacturerName', title: <FormattedMessage id='admin.manufacturer' defaultMessage='Manufacturer'>{text => text}</FormattedMessage>, sortPath: 'EchoProduct.manufacturer.name' },
        { name: 'sds', title: <FormattedMessage id='admin.echoProducts.sds' defaultMessage='SDS'>{text => text}</FormattedMessage> },
        { name: 'sdsVersionNumber', title: <FormattedMessage id='admin.echoProducts.sdsVersion' defaultMessage='SDS Version'>{text => text}</FormattedMessage>, sortPath: 'EchoProduct.sdsVersionNumber' },
        { name: 'sdsRevisionDate', title: <FormattedMessage id='admin.echoProducts.sdsRevisionDate' defaultMessage='SDS Revision Date'>{text => text}</FormattedMessage>, sortPath: 'EchoProduct.sdsRevisionDate' }
      ]
    }
  },

  'Units of Measure': {
    addEditText: <FormattedMessage id='admin.unitOfMeasure'>{text => text}</FormattedMessage>,
    formattedMessageName: 'unitOfMeasurement',
    searchText: 'admin.searchUnitOfMeasure',
    display: {
      columns: [
        { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage> },
        { name: 'nameAbbreviation', title: <FormattedMessage id='global.nameAbbreviation' defaultMessage='Name Abbreviation'>{text => text}</FormattedMessage> },
        { name: 'measureType', title: <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>{text => text}</FormattedMessage> },
      ],
    },
    edit: [
      { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, type: 'text', required: true },
      { name: 'nameAbbreviation', title: <FormattedMessage id='global.nameAbbreviation' defaultMessage='Name Abbreviation'>{text => text}</FormattedMessage>, type: 'text', required: true },
      { name: 'measureType', title: <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>{text => text}</FormattedMessage>, type: 'text', required: true },
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
      update: {
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
    addEditText: <FormattedMessage id='admin.unitOfPackaging'>{text => text}</FormattedMessage>,
    formattedMessageName: 'unitOfPackaging',
    searchText: 'admin.searchUnitOfPackaging',
    display: {
      columns: [
        { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, sortPath: 'PackagingType.name' },
        { name: 'measureType', title: <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>{text => text}</FormattedMessage>, sortPath: 'PackagingType.measureType.name' },
      ],
    },
    edit: [
      { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, type: 'text', required: true },
      { name: 'measureType', title: <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>{text => text}</FormattedMessage>, type: 'text', required: true },
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
      update: {
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
    addEditText: <FormattedMessage id='admin.manufacturer'>{text => text}</FormattedMessage>,
    formattedMessageName: 'manufacturer',
    searchText: 'admin.searchManufacturer',
    display: {
      columns: [
        { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, sortPath: 'Manufacturer.name' },
      ],
    },
    edit: [
      { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, type: 'text', required: true },
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
      update: {
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
    addEditText: <FormattedMessage id='admin.grade' defaultMessage='Grade'>{text => text}</FormattedMessage>,
    formattedMessageName: 'grade',
    searchText: 'admin.searchGrade',
    display: {
      columns: [
        { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, sortPath: 'ProductGrade.name' },
      ],
    },
    edit: [
      { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, type: 'text', required: true },
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
      update: {
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
    addEditText: <FormattedMessage id='admin.form' defaultMessage='Form'>{text => text}</FormattedMessage>,
    formattedMessageName: 'form',
    searchText: 'admin.searchForm',
    display: {
      columns: [
        { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, sortPath: 'ProductForm.name' },
      ],
    },
    edit: [
      { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, type: 'text', required: true },
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
      update: {
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
    addEditText: <FormattedMessage id='admin.condition' defaultMessage='Condition'>{text => text}</FormattedMessage>,
    formattedMessageName: 'condition',
    searchText: 'admin.searchCondition',
    display: {
      columns: [
        { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, sortPath: 'ProductCondition.name' },
      ],
    },
    edit: [
      { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, type: 'text', required: true },
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
      update: {
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
    addEditText: <FormattedMessage id='admin.documentType' defaultMessage='Document Type'>{text => text}</FormattedMessage>,
    formattedMessageName: 'documentType',
    searchText: 'admin.searchDocumentType',
    display: {
      columns: [
        { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, sortPath: 'DocumentType.name' },
      ],
    },
    edit: [
      { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, type: 'text', required: true },
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
      update: {
        method: 'patch',
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
    addEditText: <FormattedMessage id='admin.marketSegment' defaultMessage='Market Segment'>{text => text}</FormattedMessage>,
    formattedMessageName: 'marketSegment',
    searchText: 'admin.searchMarketSegment',
    display: {
      columns: [
        { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, sortPath: 'MarketSegment.name' }
      ]
    },
    edit: [
      { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage>, type: 'text', required: true }
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
      update: {
        typeRequest: 'ADMIN_PUT_MARKET_SEGMENTS_DATA',
        apiCall: '/prodex/api/market-segments/id/',
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_MARKET_SEGMENTS_DATA',
        apiCall: '/prodex/api/market-segments/id/',
      }
    }
  },
  'Admin Settings': {
    hideHandler: true,
  }
}