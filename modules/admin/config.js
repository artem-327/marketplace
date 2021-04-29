import { FormattedMessage } from 'react-intl'
import { companyDatagridColumns } from '~/constants/index'

export const defaultTabs = [
  { name: 'Units of Measure', id: 1, type: 'units-of-measure' },
  { name: 'Packaging Types', id: 2, type: 'packaging-types' },
  { name: 'Manufacturers', id: 3, type: 'manufacturers' },
  { name: 'Grades', id: 4, type: 'grades' },
  { name: 'Forms', id: 5, type: 'forms' },
  { name: 'Conditions', id: 6, type: 'conditions' },
  { name: 'NMFC Numbers', id: 14, type: 'nmfc-numbers' },
  { name: 'Associations', id: 15, type: 'associations' },
  { name: 'Logistics', id: 16, type: 'logistics' },
  { name: 'Carriers', id: 17, type: 'carriers' },
  { name: 'Admin Settings', id: 11, type: 'admin-settings' }
]

export const config = {
  'units-of-measure': {
    tableName: 'admin_units_of_measure',
    addEditText: <FormattedMessage id='admin.unitOfMeasure'>{text => text}</FormattedMessage>,
    formattedMessageName: 'unitOfMeasurement',
    searchText: 'admin.searchUnitOfMeasure',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          )
        },
        {
          name: 'nameAbbreviation',
          title: (
            <FormattedMessage id='global.nameAbbreviation' defaultMessage='Name Abbreviation'>
              {text => text}
            </FormattedMessage>
          )
        },
        {
          name: 'measureType',
          title: (
            <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>
              {text => text}
            </FormattedMessage>
          )
        },
        {
          name: 'ratioToBaseSiUnit',
          title: (
            <FormattedMessage id='global.ratioToBaseSiUnit' defaultMessage='Ratio to Base SI Unit'>
              {text => text}
            </FormattedMessage>
          )
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      },
      {
        name: 'nameAbbreviation',
        title: (
          <FormattedMessage id='global.nameAbbreviation' defaultMessage='Name Abbreviation'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      },
      {
        name: 'measureType',
        title: (
          <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      },
      {
        name: 'ratioToBaseSiUnit',
        title: (
          <FormattedMessage id='global.ratioToBaseSiUnit' defaultMessage='Ratio to Base SI Unit'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'number',
        required: true
      }
    ],
    api: {
      get: {
        dataName: 'unitsOfMeasureRows',
        typeRequest: 'ADMIN_GET_UNITS_OF_MEASURE_DATA',
        typeSuccess: 'ADMIN_GET_UNITS_OF_MEASURE_DATA_FULFILLED',
        apiCall: '/prodex/api/units'
      },
      post: {
        typeRequest: 'ADMIN_POST_UNITS_OF_MEASURE_DATA',
        pendingRequest: 'ADMIN_POST_UNITS_OF_MEASURE_DATA_PENDING',
        fulfilledRequest: 'ADMIN_POST_UNITS_OF_MEASURE_DATA_FULFILLED',
        rejectedRequest: 'ADMIN_POST_UNITS_OF_MEASURE_DATA_REJECTED',
        apiCall: '/prodex/api/units'
      },
      update: {
        typeRequest: 'ADMIN_PUT_UNITS_OF_MEASURE_DATA',
        apiCall: '/prodex/api/units/'
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_UNITS_OF_MEASURE_DATA',
        apiCall: '/prodex/api/units/'
      }
    }
  },

  'packaging-types': {
    tableName: 'admin_packaging_types',
    addEditText: <FormattedMessage id='admin.unitOfPackaging'>{text => text}</FormattedMessage>,
    formattedMessageName: 'unitOfPackaging',
    searchText: 'admin.searchUnitOfPackaging',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'PackagingType.name'
        },
        {
          name: 'measureType',
          title: (
            <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'PackagingType.measureType.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: false
      },
      {
        name: 'measureType',
        title: (
          <FormattedMessage id='global.measureType' defaultMessage='Measure Type'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        step: 1,
        required: true
      },
      {
        name: 'height',
        title: (
          <FormattedMessage id='global.height' defaultMessage='Height'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'number',
        step: 0.01,
        required: true
      },
      {
        name: 'length',
        title: (
          <FormattedMessage id='global.length' defaultMessage='Length'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'number',
        step: 0.01,
        required: true
      },
      {
        name: 'width',
        title: (
          <FormattedMessage id='global.width' defaultMessage='Width'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'number',
        step: 0.01,
        required: true
      },
      {
        name: 'dimensionUnit',
        title: (
          <FormattedMessage id='global.dimensionUnit' defaultMessage='Dimension Unit'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      },
      {
        name: 'palletPkgMax',
        title: (
          <FormattedMessage id='global.palletPkgMax' defaultMessage='Pallet Pkg Max'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'number',
        step: 1,
        required: true
      },
      {
        name: 'palletPkgMin',
        title: (
          <FormattedMessage id='global.palletPkgMin' defaultMessage='Pallet Pkg Min'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'number',
        step: 1,
        required: true
      },
      {
        name: 'weight',
        title: (
          <FormattedMessage id='global.weight' defaultMessage='Weight'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'number',
        step: 0.01,
        required: true
      },
      {
        name: 'weightUnit',
        title: (
          <FormattedMessage id='global.weightUnit' defaultMessage='Weight Unit'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      }
    ],
    api: {
      get: {
        dataName: 'unitsOfPackagingRows',
        typeRequest: 'ADMIN_GET_UNITS_OF_PACKAGING_DATA',
        typeSuccess: 'ADMIN_GET_UNITS_OF_PACKAGING_DATA_FULFILLED',
        apiCall: '/prodex/api/packaging-types'
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
        pendingRequest: 'ADMIN_POST_UNITS_OF_PACKAGING_PENDING',
        fulfilledRequest: 'ADMIN_POST_UNITS_OF_PACKAGING_FULFILLED',
        rejectedRequest: 'ADMIN_POST_UNITS_OF_PACKAGING_REJECTED',
        apiCall: '/prodex/api/packaging-types'
      },
      update: {
        typeRequest: 'ADMIN_PUT_UNITS_OF_PACKAGING_DATA',
        apiCall: '/prodex/api/packaging-types/'
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_UNITS_OF_PACKAGING_DATA',
        apiCall: '/prodex/api/packaging-types/'
      }
    }
  },

  manufacturers: {
    tableName: 'admin_manufacturers',
    addEditText: <FormattedMessage id='admin.manufacturer'>{text => text}</FormattedMessage>,
    formattedMessageName: 'manufacturer',
    searchText: 'admin.searchManufacturer',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'Manufacturer.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      }
    ],
    api: {
      get: {
        dataName: 'manufacturersRows',
        typeRequest: 'ADMIN_GET_MANUFACTURERS_DATA',
        typeSuccess: 'ADMIN_GET_MANUFACTURERS_DATA_FULFILLED',
        apiCall: '/prodex/api/manufacturers/search',
        retFcnProcess: (state, action, config) => {
          // Order alphabetically by name
          const rows = action.payload.sort(function (a, b) {
            let x = a.name.toLowerCase()
            let y = b.name.toLowerCase()
            if (x < y) {
              return -1
            }
            if (x > y) {
              return 1
            }
            return 0
          })
          return {
            ...state,
            loading: false,
            [config.api.get.dataName]: rows
          }
        }
      },
      post: {
        typeRequest: 'ADMIN_POST_MANUFACTURERS_DATA',
        pendingRequest: 'ADMIN_POST_MANUFACTURERS_DATA_PENDING',
        fulfilledRequest: 'ADMIN_POST_MANUFACTURERS_DATA_FULFILLED',
        rejectedRequest: 'ADMIN_POST_MANUFACTURERS_DATA_REJECTED',
        apiCall: '/prodex/api/manufacturers'
      },
      update: {
        typeRequest: 'ADMIN_PUT_MANUFACTURERS_DATA',
        apiCall: '/prodex/api/manufacturers/id/'
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_MANUFACTURERS_DATA',
        apiCall: '/prodex/api/manufacturers/id/'
      }
    }
  },

  grades: {
    tableName: 'admin_grades',
    addEditText: (
      <FormattedMessage id='admin.grade' defaultMessage='Grade'>
        {text => text}
      </FormattedMessage>
    ),
    formattedMessageName: 'grade',
    searchText: 'admin.searchGrade',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'ProductGrade.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      }
    ],
    api: {
      get: {
        dataName: 'gradesRows',
        typeRequest: 'ADMIN_GET_GRADES_DATA',
        typeSuccess: 'ADMIN_GET_GRADES_DATA_FULFILLED',
        apiCall: '/prodex/api/product-grades'
      },
      post: {
        typeRequest: 'ADMIN_POST_GRADES_DATA',
        pendingRequest: 'ADMIN_POST_GRADES_DATA_PENDING',
        fulfilledRequest: 'ADMIN_POST_GRADES_DATA_FULFILLED',
        rejectedRequest: 'ADMIN_POST_GRADES_DATA_REJECTED',
        apiCall: '/prodex/api/product-grades'
      },
      update: {
        typeRequest: 'ADMIN_PUT_GRADES_DATA',
        apiCall: '/prodex/api/product-grades/'
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_GRADES_DATA',
        apiCall: '/prodex/api/product-grades/'
      }
    }
  },

  forms: {
    tableName: 'admin_forms',
    addEditText: (
      <FormattedMessage id='admin.form' defaultMessage='Form'>
        {text => text}
      </FormattedMessage>
    ),
    formattedMessageName: 'form',
    searchText: 'admin.searchForm',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'ProductForm.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      }
    ],
    api: {
      get: {
        dataName: 'formsRows',
        typeRequest: 'ADMIN_GET_FORMS_DATA',
        typeSuccess: 'ADMIN_GET_FORMS_DATA_FULFILLED',
        apiCall: '/prodex/api/product-forms'
      },
      post: {
        typeRequest: 'ADMIN_POST_FORMS_DATA',
        pendingRequest: 'ADMIN_POST_FORMS_DATA_PENDING',
        fulfilledRequest: 'ADMIN_POST_FORMS_DATA_FULFILLED',
        rejectedRequest: 'ADMIN_POST_FORMS_DATA_REJECTED',
        apiCall: '/prodex/api/product-forms'
      },
      update: {
        typeRequest: 'ADMIN_PUT_FORMS_DATA',
        apiCall: '/prodex/api/product-forms/'
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_FORMS_DATA',
        apiCall: '/prodex/api/product-forms/'
      }
    }
  },

  conditions: {
    tableName: 'admin_conditions',
    addEditText: (
      <FormattedMessage id='admin.condition' defaultMessage='Condition'>
        {text => text}
      </FormattedMessage>
    ),
    formattedMessageName: 'condition',
    searchText: 'admin.searchCondition',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'ProductCondition.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      }
    ],
    api: {
      get: {
        dataName: 'conditionsRows',
        typeRequest: 'ADMIN_GET_CONDITIONS_DATA',
        typeSuccess: 'ADMIN_GET_CONDITIONS_DATA_FULFILLED',
        apiCall: '/prodex/api/product-conditions'
      },
      post: {
        typeRequest: 'ADMIN_POST_CONDITIONS_DATA',
        pendingRequest: 'ADMIN_POST_CONDITIONS_DATA_PENDING',
        fulfilledRequest: 'ADMIN_POST_CONDITIONS_DATA_FULFILLED',
        rejectedRequest: 'ADMIN_POST_CONDITIONS_DATA_REJECTED',
        apiCall: '/prodex/api/product-conditions'
      },
      update: {
        typeRequest: 'ADMIN_PUT_CONDITIONS_DATA',
        apiCall: '/prodex/api/product-conditions/'
      },
      delete: {
        typeRequest: 'ADMIN_DELETE_CONDITIONS_DATA',
        apiCall: '/prodex/api/product-conditions/'
      }
    }
  },

  'nmfc-numbers': {
    tableName: 'admin_nmfc_numbers',
    addEditText: (
      <FormattedMessage id='admin.nmfcNumber' defaultMessage='NMFC Number'>
        {text => text}
      </FormattedMessage>
    ),
    formattedMessageName: 'NmfcNumber',
    searchText: 'admin.searchNmfc',
    display: {
      columns: [
        {
          name: 'code',
          title: (
            <FormattedMessage id='global.code' defaultMessage='Code'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'NmfcNumber.prefix'
        },
        {
          name: 'description',
          title: (
            <FormattedMessage id='global.description' defaultMessage='Description'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'NmfcNumber.description'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      }
    ]
  },

  associations: {
    tableName: 'admin_associations',
    addEditText: (
      <FormattedMessage id='admin.associations' defaultMessage='Associations'>
        {text => text}
      </FormattedMessage>
    ),
    formattedMessageName: 'association',
    searchText: 'admin.searchAssociations',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'Association.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name'>
            {text => text}
          </FormattedMessage>
        ),
        type: 'text',
        required: true
      }
    ],
    api: {
      get: {
        dataName: 'associationsRows',
        typeRequest: 'GET_ASSOCIATIONS',
        typeSuccess: 'GET_ASSOCIATIONS_FULFILLED',
        apiCall: '/prodex/api/associations'
      },
      post: {
        typeRequest: 'ADD_ASSOCIATION',
        pendingRequest: 'ADD_ASSOCIATION_PENDING',
        fulfilledRequest: 'ADD_ASSOCIATION_FULFILLED',
        rejectedRequest: 'ADD_ASSOCIATION_REJECTED',
        apiCall: '/prodex/api/associations',
        typeQuery: true
      },
      update: {
        method: 'patch',
        typeRequest: 'EDIT_ASSOCIATION',
        apiCall: '/prodex/api/associations/id/',
        typeQuery: true
      },
      delete: {
        typeRequest: 'DELETE_ASSOCIATION',
        apiCall: '/prodex/api/associations/id/'
      }
    }
  },

  logistics: {
    tableName: 'admin_logistics',
    addEditText: (
      <FormattedMessage id='global.logistics' defaultMessage='Logistics'>
        {text => text}
      </FormattedMessage>
    ),
    searchText: 'admin.searchLogisticsProvider'
  },
  carriers: {
    tableName: 'admin_carriers',
    addEditText: (
      <FormattedMessage id='global.carriers' defaultMessage='Carriers'>
        {text => text}
      </FormattedMessage>
    ),
    searchText: 'admin.searchCarrier'
  },

  'admin-settings': {
    hideHandler: true
  }
}
