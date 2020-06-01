import { FormattedMessage } from 'react-intl'
import { companyDatagridColumns } from '~/constants/index'
import React from 'react'

export const config = {
  'Units of Measure': {
    tableName: 'units_of_measure',
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

  'Packaging Types': {
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

  Manufacturers: {
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

  Grades: {
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

  Forms: {
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

  Conditions: {
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

  'NMFC Numbers': {
    tableName: 'nmfc_numbers',
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

  Associations: {
    tableName: 'admin_associations',
    addEditText: (
      <FormattedMessage id='admin.associations' defaultMessage='Associations'>
        {text => text}
      </FormattedMessage>
    ),
    formattedMessageName: 'associations',
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
  'Admin Settings': {
    hideHandler: true
  }
}
