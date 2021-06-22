import { FormattedMessage } from 'react-intl'
// Components
import DataTable from './components/DataTable/DataTableContainer'
import UnitOfMeasureTable from './components/UnitOfMeasureTable/UnitOfMeasureTableContainer'
import UnitOfPackagingTable from './components/UnitOfPackagingTable/UnitOfPackagingTableContainer'
import NmfcTable from './components/NmfcTable/TableContainer'

import AddNewUnitOfMeasurePopup from './components/UnitOfMeasureTable/AddNewUnitOfMeasurePopupContainer'
import AddNewUnitOfPackagingPopup from './components/UnitOfPackagingTable/AddNewUnitOfPackagingPopupContainer'
import AddNewPopup1Parameter from './components/DataTable/AddNewPopup1ParameterContainer'
import NmfcPopup from './components/NmfcTable/PopupContainer'

import EditUnitOfMeasurePopup from './components/UnitOfMeasureTable/EditUnitOfMeasurePopupContainer'
import EditUnitOfPackagingPopup from './components/UnitOfPackagingTable/EditUnitOfPackagingPopupContainer'
import EditPopup1Parameter from './components/DataTable/EditPopup1ParameterContainer'

import CompaniesDwollaForm from './components/CompaniesDwolla/FormPopupContainer'

import Settings from '../../components/settings'

import LogisticsTable from './components/LogisticsTable/LogisticsTableContainer'
import AddEditLogisticProvider from './components/LogisticsTable/AddEditLogisticProviderContainer'
import Carriers from './components/Carriers/CarriersContainer'
import AddEditCarrier from './components/Carriers/AddEditCarrierContainer'
// Styles
import { FixyWrapper, AdminSegment } from './styles'


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
    addEditText: <FormattedMessage id='admin.unitOfMeasure' />,
    formattedMessageName: 'unitOfMeasurement',
    searchText: 'admin.searchUnitOfMeasure',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name' />
          )
        },
        {
          name: 'nameAbbreviation',
          title: (
            <FormattedMessage id='global.nameAbbreviation' defaultMessage='Name Abbreviation' />
          )
        },
        {
          name: 'measureType',
          title: (
            <FormattedMessage id='global.measureType' defaultMessage='Measure Type' />
          )
        },
        {
          name: 'ratioToBaseSiUnit',
          title: (
            <FormattedMessage id='global.ratioToBaseSiUnit' defaultMessage='Ratio to Base SI Unit' />
          )
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name' />
        ),
        type: 'text',
        required: true
      },
      {
        name: 'nameAbbreviation',
        title: (
          <FormattedMessage id='global.nameAbbreviation' defaultMessage='Name Abbreviation' />
        ),
        type: 'text',
        required: true
      },
      {
        name: 'measureType',
        title: (
          <FormattedMessage id='global.measureType' defaultMessage='Measure Type' />
        ),
        type: 'text',
        required: true
      },
      {
        name: 'ratioToBaseSiUnit',
        title: (
          <FormattedMessage id='global.ratioToBaseSiUnit' defaultMessage='Ratio to Base SI Unit' />
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
    addEditText: <FormattedMessage id='admin.unitOfPackaging' />,
    formattedMessageName: 'unitOfPackaging',
    searchText: 'admin.searchUnitOfPackaging',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name' />
          ),
          sortPath: 'PackagingType.name'
        },
        {
          name: 'measureType',
          title: (
            <FormattedMessage id='global.measureType' defaultMessage='Measure Type' />
          ),
          sortPath: 'PackagingType.measureType.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name' />
        ),
        type: 'text',
        required: false
      },
      {
        name: 'measureType',
        title: (
          <FormattedMessage id='global.measureType' defaultMessage='Measure Type' />
        ),
        type: 'text',
        step: 1,
        required: true
      },
      {
        name: 'height',
        title: (
          <FormattedMessage id='global.height' defaultMessage='Height' />
        ),
        type: 'number',
        step: 0.01,
        required: true
      },
      {
        name: 'length',
        title: (
          <FormattedMessage id='global.length' defaultMessage='Length' />
        ),
        type: 'number',
        step: 0.01,
        required: true
      },
      {
        name: 'width',
        title: (
          <FormattedMessage id='global.width' defaultMessage='Width' />
        ),
        type: 'number',
        step: 0.01,
        required: true
      },
      {
        name: 'dimensionUnit',
        title: (
          <FormattedMessage id='global.dimensionUnit' defaultMessage='Dimension Unit' />
        ),
        type: 'text',
        required: true
      },
      {
        name: 'palletPkgMax',
        title: (
          <FormattedMessage id='global.palletPkgMax' defaultMessage='Pallet Pkg Max' />
        ),
        type: 'number',
        step: 1,
        required: true
      },
      {
        name: 'palletPkgMin',
        title: (
          <FormattedMessage id='global.palletPkgMin' defaultMessage='Pallet Pkg Min' />
        ),
        type: 'number',
        step: 1,
        required: true
      },
      {
        name: 'weight',
        title: (
          <FormattedMessage id='global.weight' defaultMessage='Weight' />
        ),
        type: 'number',
        step: 0.01,
        required: true
      },
      {
        name: 'weightUnit',
        title: (
          <FormattedMessage id='global.weightUnit' defaultMessage='Weight Unit' />
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
    },
    globalReload: 'getPackagingTypes'
  },

  manufacturers: {
    tableName: 'admin_manufacturers',
    addEditText: <FormattedMessage id='admin.manufacturer' />,
    formattedMessageName: 'manufacturer',
    searchText: 'admin.searchManufacturer',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name' />
          ),
          sortPath: 'Manufacturer.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name' />
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
      <FormattedMessage id='admin.grade' defaultMessage='Grade' />
    ),
    formattedMessageName: 'grade',
    searchText: 'admin.searchGrade',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name' />
          ),
          sortPath: 'ProductGrade.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name' />
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
    },
    globalReload: 'getProductGrades'
  },

  forms: {
    tableName: 'admin_forms',
    addEditText: (
      <FormattedMessage id='admin.form' defaultMessage='Form' />
    ),
    formattedMessageName: 'form',
    searchText: 'admin.searchForm',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name' />
          ),
          sortPath: 'ProductForm.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name' />
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
    },
    globalReload: 'getProductForms'
  },

  conditions: {
    tableName: 'admin_conditions',
    addEditText: (
      <FormattedMessage id='admin.condition' defaultMessage='Condition' />
    ),
    formattedMessageName: 'condition',
    searchText: 'admin.searchCondition',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name' />
          ),
          sortPath: 'ProductCondition.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name' />
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
    },
    globalReload: 'getProductConditions'
  },

  'nmfc-numbers': {
    tableName: 'admin_nmfc_numbers',
    addEditText: (
      <FormattedMessage id='admin.nmfcNumber' defaultMessage='NMFC Number' />
    ),
    formattedMessageName: 'NmfcNumber',
    searchText: 'admin.searchNmfc',
    display: {
      columns: [
        {
          name: 'code',
          title: (
            <FormattedMessage id='global.code' defaultMessage='Code' />
          ),
          sortPath: 'NmfcNumber.prefix'
        },
        {
          name: 'description',
          title: (
            <FormattedMessage id='global.description' defaultMessage='Description' />
          ),
          sortPath: 'NmfcNumber.description'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name' />
        ),
        type: 'text',
        required: true
      }
    ]
  },

  associations: {
    tableName: 'admin_associations',
    addEditText: (
      <FormattedMessage id='admin.associations' defaultMessage='Associations' />
    ),
    formattedMessageName: 'association',
    searchText: 'admin.searchAssociations',
    display: {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name' />
          ),
          sortPath: 'Association.name'
        }
      ]
    },
    edit: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='global.name' defaultMessage='Name' />
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
      <FormattedMessage id='global.logistics' defaultMessage='Logistics' />
    ),
    searchText: 'admin.searchLogisticsProvider'
  },
  carriers: {
    tableName: 'admin_carriers',
    addEditText: (
      <FormattedMessage id='global.carriers' defaultMessage='Carriers' />
    ),
    searchText: 'admin.searchCarrier'
  },

  'admin-settings': {
    hideHandler: true
  }
}

export const tables = {
  'units-of-measure': <UnitOfMeasureTable />,
  'packaging-types': <UnitOfPackagingTable />,
  manufacturers: <DataTable currentTab={'manufacturers'} />,
  grades: <DataTable currentTab={'grades'} />,
  forms: <DataTable currentTab={'forms'} />,
  conditions: <DataTable currentTab={'conditions'} />,
  'nmfc-numbers': <NmfcTable />,
  associations: <DataTable currentTab={'associations'} />,
  logistics: <LogisticsTable />,
  carriers: <Carriers />,
  'admin-settings': (
    <FixyWrapper>
      <AdminSegment basic padded='very'>
        <Settings inputsInGroup={3} asModal={false} role='admin' />
      </AdminSegment>
    </FixyWrapper>
  )
}

export const datagridConfig = {
  conditions: {
    url: '/prodex/api/product-conditions/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductCondition.name', values: [`%${v.searchInput}%`] }] : []
  },
  'nmfc-numbers': {
    url: '/prodex/api/nmfc-numbers/datagrid',
    searchToFilter: v => {
      let filters = []
      if (v && v.searchInput) {
        filters.push({ operator: 'LIKE', path: 'NmfcNumber.description', values: [`%${v.searchInput}%`] })
        if (Number.isInteger(parseInt(v.searchInput)))
          filters.push({ operator: 'LIKE', path: 'NmfcNumber.prefix', values: [`${parseInt(v.searchInput)}%`] })
      }
      return filters
    }
  },
  associations: {
    url: '/prodex/api/associations/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'Association.name', values: [`%${v.searchInput}%`] }] : []
  },
  forms: {
    url: '/prodex/api/product-forms/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductForm.name', values: [`%${v.searchInput}%`] }] : []
  },
  grades: {
    url: '/prodex/api/product-grades/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'ProductGrade.name', values: [`%${v.searchInput}%`] }] : []
  },
  manufacturers: {
    url: '/prodex/api/manufacturers/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'Manufacturer.name', values: [`%${v.searchInput}%`] }] : []
  },
  'packaging-types': {
    url: '/prodex/api/packaging-types/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'PackagingType.name', values: [`%${v.searchInput}%`] }] : []
  },
  'units-of-measure': {
    url: '/prodex/api/units/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'Unit.name', values: [`%${v.searchInput}%`] }] : []
  },
  logistics: {
    url: '/prodex/api/logistics-providers/stored/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'LogisticsProvider.name', values: [`%${v.searchInput}%`] }] : []
  },
  carriers: {
    url: '/prodex/api/logistics-carriers/stored/datagrid',
    searchToFilter: v =>
      v && v.searchInput ? [{ operator: 'LIKE', path: 'LogisticsCarrier.code', values: [`%${v.searchInput}%`] }] : []
  }
}

export const editForms = {
  'units-of-measure': <EditUnitOfMeasurePopup />,
  'packaging-types': <EditUnitOfPackagingPopup />,
  manufacturers: <EditPopup1Parameter currentTab={'manufacturers'} />,
  grades: <EditPopup1Parameter currentTab={'grades'} />,
  forms: <EditPopup1Parameter currentTab={'forms'} />,
  conditions: <EditPopup1Parameter currentTab={'conditions'} />,
  'nmfc-numbers': <NmfcPopup />,
  associations: <EditPopup1Parameter currentTab={'associations'} />,
  logistics: <AddEditLogisticProvider />,
  carriers: <AddEditCarrier />
}

export const addForms = {
  'units-of-measure': <AddNewUnitOfMeasurePopup />,
  'packaging-types': <AddNewUnitOfPackagingPopup />,
  manufacturers: <AddNewPopup1Parameter currentTab={'manufacturers'} />,
  grades: <AddNewPopup1Parameter currentTab={'grades'} />,
  forms: <AddNewPopup1Parameter currentTab={'forms'} />,
  conditions: <AddNewPopup1Parameter currentTab={'conditions'} />,
  'nmfc-numbers': <NmfcPopup />,
  associations: <AddNewPopup1Parameter currentTab={'associations'} />,
  logistics: <AddEditLogisticProvider />,
  carriers: <AddEditCarrier />
}

export const addDwollaForms = {
  Companies: <CompaniesDwollaForm />
}
