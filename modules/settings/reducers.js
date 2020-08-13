import * as AT from './action-types'
import * as inventoryAT from '~/modules/inventory/action-types'
import Link from 'next/link'

import { defaultTabs } from './contants'

import { currency } from '~/constants/index'
import { FormattedMessage } from 'react-intl'

export const initialState = {
  editPopupBoolean: false,
  addNewWarehousePopup: false,
  popupLoading: false,
  popupValues: null,
  isOpenPopup: false,
  editTrig: false,
  updating: false,
  isOpenUploadDocumentsPopup: null,
  usersRows: [],
  userEditRoles: false,
  roles: [],
  clientCompanyRoles: [],
  warehousesRows: [],
  branchesRows: [],
  branchesAll: [],
  creditCardsRows: [],
  bankAccountsRows: [],
  productsCatalogRows: [],
  productsPackagingType: null,
  packagingTypes: [],
  productsUnitsType: [],
  units: [],
  packageWeightUnits: [],
  productsFreightClasses: [],
  productsHazardClasses: [],
  productsPackagingGroups: [],
  productDataLoading: false,
  deliveryAddressesRows: [],
  countries: [],
  provinces: [],
  countriesDropDown: [],
  provincesDropDown: [],
  country: [],
  currency: [],
  currentUser: null,
  systemSettings: [],
  systemSettingsLoading: false,
  systemSettingsModalOpen: false,
  sysSettingsUpdating: false,
  tabsNames: defaultTabs,
  currentTab: [],
  locationsTab: 'delivery-locations',
  isOpenImportPopup: false,
  isDwollaOpenPopup: false,
  currentEditForm: null,
  currentAddForm: null,
  confirmMessage: null,
  toast: { message: null, isSuccess: null },
  deleteUserById: null,
  deleteRowById: null,
  filterValue: '',
  productCatalogUnmappedValue: 'ALL',
  editPopupSearchProducts: [],
  fileCSVId: null,
  CSV: null,
  mappedHeaders: null,
  missingRequired: [],
  dataHeaderCSV: null,
  loading: false,
  isSaveMapCSV: false,
  mapName: null,
  maps: null,
  selectedSavedMap: null,
  loaded: false,
  searchedCasProducts: [[]],
  searchedUnNumbers: [],
  deliveryAddressesFilter: { pageSize: 50 }, //,pageNumber: 0
  productsFilter: { pageSize: 50 }, //,pageNumber: 0
  documentTypes: [],
  addressSearch: [],
  logisticsAccounts: [],
  logisticsProviders: [],
  logisticsProvidersFetching: false,
  dwollaAccBalance: null,
  businessClassifications: [],
  dwollaSaving: false,
  countriesLoading: false,
  verificationDocumentTypes: [],
  agreementModal: {
    open: false,
    declineButtonContent: (
      <FormattedMessage id='global.logout' defaultMessage='Logout'>
        {text => text}
      </FormattedMessage>
    ),
    acceptButtonContent: (
      <FormattedMessage id='global.accept' defaultMessage='Accept'>
        {text => text}
      </FormattedMessage>
    ),
    modalHeader: <FormattedMessage id='agree.withTOS.header' defaultMessage='Agree with Terms of Service' />,
    modalContent: (
      <FormattedMessage
        id='agree.withTOS.content'
        values={{
          tos: (
            <FormattedMessage id='verification.termsOfService'>
              {text => (
                <Link href='https://www.echosystem.com/terms-of-service'>
                  <a target='_blank'>{text}</a>
                </Link>
              )}
            </FormattedMessage>
          )
        }}
      />
    )
  },
  languages: [],
  languagesFetching: false,
  companyGenericProduct: [],
  companyGenericProductFetching: false,
  nmfcNumbersFiltered: [],
  nmfcNumbersFetching: false,
  csvImportError: null,
  tabClicked: false,
  isOpenSidebar: false,
  openTab: 0,
  documentsOwner: [],
  csvWithoutHeader: false,
  tableHandlersFiltersSettings: null,
  tableHandlersFiltersLocations: null,
  logisticsFilter: '',
  'bank-accountsFilter': '',
  renderCopyright: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.OPEN_POPUP: {
      return {
        ...state,
        loaded: false,
        isOpenPopup: true,
        editTrig: !state.editTrig,
        popupValues: action.payload
      }
    }
    case AT.CLOSE_POPUP: {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null
      }
    }
    case AT.OPEN_SIDEBAR: {
      return {
        ...state,
        loaded: false,
        isOpenSidebar: true,
        editTrig: !state.editTrig,
        openTab: action.payload.openTab,
        popupValues: action.payload.data
      }
    }
    case AT.CLOSE_SIDEBAR: {
      return {
        ...state,
        isOpenSidebar: false,
        openTab: null,
        popupValues: null
      }
    }
    case AT.OPEN_DWOLLA_POPUP: {
      return {
        ...state,
        isDwollaOpenPopup: true
      }
    }
    case AT.CLOSE_DWOLLA_POPUP: {
      return {
        ...state,
        isDwollaOpenPopup: false
      }
    }
    case AT.OPEN_IMPORT_POPUP: {
      return {
        ...state,
        isOpenImportPopup: true
        //popupValues: action.payload
      }
    }
    case AT.SETTINGS_CLOSE_IMPORT_POPUP: {
      return {
        ...state,
        isOpenImportPopup: false
        //popupValues: null
      }
    }
    case AT.SETTINGS_OPEN_UPLOAD_DOCUMENTS_POPUP: {
      return {
        ...state,
        isOpenUploadDocumentsPopup: true
      }
    }
    case AT.SETTINGS_CLOSE_UPLOAD_DOCUMENTS_POPUP: {
      return {
        ...state,
        isOpenUploadDocumentsPopup: false
      }
    }
    case AT.OPEN_ROLES_POPUP: {
      return {
        ...state,
        isOpenPopup: true,
        popupValues: action.payload,
        userEditRoles: true
      }
    }
    case AT.CLOSE_ROLES_POPUP: {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null,
        userEditRoles: false
      }
    }
    case AT.OPEN_EDIT_POPUP: {
      return {
        ...state,
        currentForm: state.currentTab, // ! ! ???
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: action.payload
      }
    }
    case AT.CLOSE_EDIT_POPUP: {
      return {
        ...state,
        currentForm: null,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: null
      }
    }
    case AT.OPEN_CONFIRM_POPUP: {
      return {
        ...state,
        confirmMessage: true,
        deleteRowById: action.payload
      }
    }
    case AT.OPEN_TOAST: {
      return {
        ...state,
        toast: action.payload
      }
    }
    case AT.CLOSE_TOAST: {
      return {
        ...state,
        toast: { message: null, isSuccess: null }
      }
    }
    /* DELETE DELIVERY ADDRESS */

    case AT.SETTINGS_DELETE_DELIVERY_ADDRESSES_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.SETTINGS_DELETE_DELIVERY_ADDRESSES_FULFILLED: {
      return {
        ...state,
        loading: false,
        deliveryAddressesRows: state.deliveryAddressesRows.filter(address => address.id !== payload)
      }
    }

    case AT.SETTINGS_DELETE_DELIVERY_ADDRESSES_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.CLOSE_CONFIRM_POPUP: {
      return {
        ...state,
        deleteRowById: null,
        confirmMessage: null
      }
    }
    case AT.CONFIRM_FULFILLED: {
      return {
        ...state,
        deleteRowById: null,
        confirmMessage: null
      }
    }

    case AT.OPEN_ADD_POPUP: {
      return {
        ...state,
        currentForm: state.currentTab,
        popupValues: action.payload
      }
    }
    case AT.CLOSE_ADD_POPUP: {
      return {
        ...state,
        currentForm: null,
        currentEditForm: null
      }
    }

    /*case AT.HANDLE_ACTIVE_TAB: {
      return {
        ...state,
        currentTab: action.payload.tab,
        currentAddForm: null,
        currentEditForm: null
      }
    }*/

    case AT.HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: action.payload
      }
    }

    case AT.SAVE_MAP_CSV: {
      return {
        ...state,
        isSaveMapCSV: !state.isSaveMapCSV
      }
    }

    case AT.CHANGE_MAP_CSV_NAME: {
      return {
        ...state,
        mapName: action.payload
      }
    }

    case AT.HANDLE_PRODUCT_CATALOG_UNMAPPED_VALUE: {
      return {
        ...state,
        productCatalogUnmappedValue: action.payload
      }
    }

    case AT.GET_USERS_DATA_PENDING: {
      // ! ! vsude zmenit na pending
      return { ...state, loading: true }
    }

    case AT.GET_USERS_DATA_FULFILLED: {
      const usersRows = action.payload.map(user => {
        return {
          //checkbox: " ",
          name: user.name,
          jobTitle: user.jobTitle || '',
          email: user.email,
          //phone: user.homeBranch.contactPhone || '',
          phone: user.phone || '',
          homeBranchId: user.homeBranch.id,
          enabled: user.enabled,
          /*preferredCurrency: user.preferredCurrency
            ? user.preferredCurrency.code
              ? user.preferredCurrency.code
              : null
            : null,
            */
          // preferredCurrency: (user.preferredCurrency || {}).id || 0,
          preferredCurrency: currency,
          homeBranch: user.homeBranch.name,
          permissions: user.roles ? user.roles.name : '', // ! ! array?
          id: user.id,
          allUserRoles: user.roles || [],
          lastLoginAt: user.lastLoginAt
        }
      })
      return {
        ...state,
        loading: false,
        usersRows: usersRows
      }
    }

    case AT.GET_ROLES_DATA: {
      return {
        ...state,
        roles: action.payload
      }
    }

    case AT.SETTINGS_GET_CLIENT_COMPANY_ROLES_DATA: {
      return {
        ...state,
        clientCompanyRoles: action.payload
      }
    }

    case AT.GET_CURRENT_USER_DATA_FULFILLED: {
      return {
        ...state,
        currentUser: action.payload
      }
    }

    case AT.GET_WAREHOUSES_DATA_PENDING: {
      // ! ! pending
      return { ...state, loading: true }
    }

    case AT.GET_WAREHOUSES_DATA_FULFILLED: {
      const warehousesRows = action.payload.warehouses.map(warehouse => ({
        name: warehouse.name,
        address: warehouse.address.streetAddress + ', ' + warehouse.address.city,
        streetAddress: warehouse.address.streetAddress,
        city: warehouse.address.city,
        countryName: warehouse.address.country.name,
        countryId: warehouse.address.country.id,
        hasProvinces: warehouse.address.country.hasProvinces,
        provinceName: warehouse.address.province ? warehouse.address.province.name : '',
        provinceId: warehouse.address.province ? warehouse.address.province.id : '',
        zip: warehouse.address.zip.zip,
        zipID: warehouse.address.zip.id,
        contactName: warehouse.contactName,
        phone: warehouse.contactPhone,
        email: warehouse.contactEmail,
        branchId: warehouse.id,
        id: warehouse.id,
        warehouse: warehouse.warehouse
      }))

      warehousesRows.forEach(element => {
        for (let key in element) {
          if (element[key] === 'unknown') {
            element[key] = ''
          }
        }
      })

      return {
        ...state,
        loading: false,
        warehousesRows: warehousesRows,
        country: action.payload.newCountryFormat,
        countries: action.payload.country
      }
    }

    case AT.GET_BRANCHES_DATA_PENDING: {
      // ! ! pending
      return { ...state, loading: true }
    }

    case AT.GET_BRANCHES_DATA_FULFILLED: {
      const branchesRows = action.payload.branches.map(branch => {
        return {
          name: branch.name,
          address: branch.address.streetAddress + ', ' + branch.address.city,
          streetAddress: branch.address.streetAddress,
          city: branch.address.city,
          countryName: branch.address.country.name,
          countryId: branch.address.country.id,
          hasProvinces: branch.address.country.hasProvinces,
          provinceName: branch.address.province ? branch.address.province.name : '',
          provinceId: branch.address.province ? branch.address.province.id : '',
          zip: branch.address.zip.zip,
          zipID: branch.address.zip.id,
          contactName: branch.contactName,
          phone: branch.contactPhone,
          email: branch.contactEmail,
          branchId: branch.id,
          id: branch.id,
          warehouse: branch.warehouse
        }
      })
      branchesRows.forEach(element => {
        for (let key in element) {
          if (element[key] === 'unknown') {
            element[key] = ''
          }
        }
      })

      return {
        ...state,
        loading: false,
        branchesRows: branchesRows,
        country: action.payload.newCountryFormat,
        countries: action.payload.country
      }
    }

    case AT.GET_ALL_BRANCHES_DATA: {
      let branches = []
      action.payload.forEach(
        branch =>
          branch.warehouse === false &&
          branches.push({
            value: branch.id,
            text: branch.deliveryAddress.cfName
          })
      )
      return {
        ...state,
        branchesAll: branches
      }
    }

    case AT.GET_CREDIT_CARDS_DATA_PENDING: {
      // ! ! pending
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_CREDIT_CARDS_DATA_FULFILLED: {
      const rows = action.payload.map(card => {
        return {
          id: card.id,
          cardNumber: `**** **** **** ${card.last4}`,
          cvc: card.cvcCheck,
          expirationMonth: card.expMonth,
          expirationYear: card.expYear,
          last4: `**** **** **** ${card.last4}`,
          expMonthYear: card.expMonth + ' / ' + card.expYear
        }
      })

      return {
        ...state,
        loading: false,
        creditCardsRows: rows
      }
    }

    case AT.GET_BANK_ACCOUNTS_DATA_PENDING: {
      // ! ! pending
      return { ...state, loading: true }
    }

    case AT.GET_BANK_ACCOUNTS_DATA_FULFILLED: {
      const {
        bankAccountsData,
        newCountryFormat
        // newCurrencyFormat
      } = action.payload

      return {
        ...state,
        loading: false,
        bankAccountsRows: bankAccountsData,
        country: newCountryFormat
        // currency: newCurrencyFormat
      }
    }

    case AT.SETTINGS_GET_DWOLLA_BALANCE_FULFILLED: {
      return {
        ...state,
        dwollaAccBalance: action.payload
      }
    }

    case AT.SETTINGS_GET_CURRENCIES_FULFILLED: {
      return {
        ...state,
        currency: action.payload
      }
    }

    case AT.SETTINGS_GET_PRODUCTS_CATALOG_DATA_FULFILLED: {
      const packagingType = action.payload.productsTypes.map((type, id) => {
        return {
          key: id,
          text: type.name,
          value: type.id
        }
      })
      const packagingUnitsType = action.payload.units.map((type, id) => {
        return {
          key: id,
          text: type.name,
          value: type.id
        }
      })
      // TODO: Freight Classes - should be used same array as anywhere else
      const fClassArray = [50, 55, 60, 65, 70, 77.5, 85, 92.5, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500]
      const freightClasses = fClassArray.map(fClass => {
        return {
          key: fClass,
          text: fClass,
          value: fClass
        }
      })
      const hazardClasses = action.payload.hazardClasses.map((hClass, id) => {
        return {
          key: id,
          text: hClass.classCode + ': ' + hClass.description,
          value: hClass.id
        }
      })
      const packagingGroups = action.payload.packagingGroups.map((pGroup, id) => {
        return {
          key: id,
          text: pGroup.groupCode + ': ' + pGroup.description,
          value: pGroup.id
        }
      })
      const packageWeightUnits = action.payload.units
        .filter(unit => unit.measureType.id === 1) // Weight only
        .map((type, id) => {
          return {
            key: id,
            text: type.name,
            value: type.id
          }
        })

      return {
        ...state,
        productDataLoading: false,
        loaded: true,
        //productsCatalogRows: rows,
        productsPackagingType: packagingType,
        packagingTypes: action.payload.productsTypes,
        productsUnitsType: packagingUnitsType,
        units: action.payload.units,
        productsHazardClasses: hazardClasses,
        productsFreightClasses: freightClasses,
        productsPackagingGroups: packagingGroups,
        packageWeightUnits: packageWeightUnits
      }
    }

    case AT.SETTINGS_SET_PRIMARY_USER_PENDING:
    case AT.DELETE_PRODUCT_PENDING:
    case AT.DELETE_USER_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.SETTINGS_SET_PRIMARY_USER_FULFILLED:
    case AT.DELETE_PRODUCT_FULFILLED:
    case AT.DELETE_USER_FULFILLED:
    case AT.SETTINGS_SET_PRIMARY_USER_REJECTED:
    case AT.DELETE_PRODUCT_REJECTED:
    case AT.DELETE_USER_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.GET_PRODUCTS_WITH_REQUIRED_PARAM_FULFILLED: {
      const editPopupSearchProducts = action.payload.map(item => {
        return {
          id: item.id,
          productName: item.productName,
          productNumber: item.product.unNumber,
          productId: item.product.id,
          packagingType: item.packaging.packagingType === undefined ? '' : item.packaging.packagingType.name,
          packagingSize: item.packaging.size
        }
      })
      return {
        ...state,
        editPopupSearchProducts
      }
    }

    case AT.SETTINGS_GET_STORED_CSV_FULFILLED: {
      const CSV = {
        headerCSV: action.payload.lines[0].columns.map(column => ({
          ...column,
          content: column.content.trim()
        })),
        bodyCSV: action.payload.lines.slice(1)
      }
      return {
        ...state,
        CSV
      }
    }

    case AT.GET_CSV_MAP_COMPANY_GENERIC_PRODUCT_FULFILLED:
    case AT.GET_CSV_MAP_PRODUCT_OFFER_FULFILLED:
    case AT.GET_CSV_MAP_COMPANIES_FULFILLED: {
      return {
        ...state,
        maps: action.payload
      }
    }

    case AT.SELECT_SAVED_MAP: {
      return {
        ...state,
        selectedSavedMap: action.payload
      }
    }

    case AT.CHANGE_HEADERS_CSV: {
      return {
        ...state,
        mappedHeaders: action.payload.mappedHeaders,
        missingRequired: action.payload.missingRequired
      }
    }

    case AT.DATA_HEADER_CSV: {
      return {
        ...state,
        dataHeaderCSV: action.payload
      }
    }

    case AT.POST_NEW_WAREHOUSE_POPUP: {
      return {
        ...state,
        currentAddForm: state.currentTab
      }
    }

    case AT.POST_UPLOAD_CSV_FILE_FULFILLED: {
      return {
        ...state,
        fileCSVId: action.payload.id
      }
    }

    case AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS_PENDING:
    case AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS_OFFER_PENDING:
    case AT.SETTINGS_POST_CSV_IMPORT_COMPANY_GENERIC_PRODUCTS_PENDING: {
      return {
        ...state,
        csvImportError: null
      }
    }

    case AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS_REJECTED:
    case AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS_OFFER_REJECTED:
    case AT.SETTINGS_POST_CSV_IMPORT_COMPANY_GENERIC_PRODUCTS_REJECTED:
    case AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS_OFFER_FULFILLED:
    case AT.SETTINGS_POST_CSV_IMPORT_COMPANY_GENERIC_PRODUCTS_FULFILLED:
    case AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS_FULFILLED:
    case AT.POST_CSV_IMPORT_COMPANIES_FULFILLED: {
      return {
        ...state,
        csvImportError: action.payload
      }
    }

    case AT.SETTINGS_CLOSE_IMPORT_POPUP_FULFILLED: {
      return {
        ...state,
        fileCSVId: null,
        mappedHeaders: null,
        missingRequired: [],
        dataHeaderCSV: null,
        isOpenImportPopup: false,
        isSaveMapCSV: false,
        mapName: null,
        selectedSavedMap: null,
        csvImportError: null
      }
    }

    case AT.SETTINGS_CLEAR_DATA_OF_CSV: {
      return {
        ...state,
        fileCSVId: null,
        mappedHeaders: null,
        missingRequired: [],
        dataHeaderCSV: null,
        isSaveMapCSV: false,
        mapName: null,
        selectedSavedMap: null,
        csvImportError: null
      }
    }

    case AT.SETTINGS_CREATE_CAS_PRODUCTS_INDEX: {
      // ADD new array to casProducts
      let { searchedCasProducts } = state
      searchedCasProducts.push([])

      return {
        ...state,
        searchedCasProducts
      }
    }

    case AT.SETTINGS_REMOVE_CAS_PRODUCTS_INDEX: {
      // REMOVE array from casProducts
      let { searchedCasProducts } = state
      searchedCasProducts.splice(action.payload.index, 1)

      return {
        ...state,
        searchedCasProducts
      }
    }

    case AT.SETTINGS_PREPARE_CAS_PRODUCTS: {
      return {
        ...state,
        searchedCasProducts: action.payload.casProducts.map(casProduct => {
          return [casProduct.item.casProduct]
        })
      }
    }

    case AT.SEARCH_CAS_PRODUCT_FULFILLED: {
      return {
        ...state,
        searchedCasProducts: state.searchedCasProducts.map((list, listIndex) => {
          if (listIndex === action.payload.index) {
            return action.payload.data
          } else {
            return list
          }
        })
      }
    }

    case AT.SEARCH_UN_NUMBER_FULFILLED: {
      return {
        ...state,
        searchedUnNumbers: action.payload.data
      }
    }

    case AT.SETTINGS_UPDATE_DELIVERY_ADDRESSES_PENDING:
    case AT.SETTINGS_CREATE_NEW_DELIVERY_ADDRESS_PENDING:
    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_STRING_PENDING:
    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_FILTER_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.SETTINGS_UPDATE_DELIVERY_ADDRESSES_FULFILLED:
    case AT.SETTINGS_CREATE_NEW_DELIVERY_ADDRESS_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.SETTINGS_GET_ADDRESSES_SEARCH_PENDING: {
      return {
        ...state
        //loading: true  //it is bug if fill Address fields in Add or Edit warehouse. Load all settings - warehouses page.
      }
    }

    case AT.SETTINGS_GET_ADDRESSES_SEARCH_FULFILLED: {
      return {
        ...state,
        addressSearch: action.payload,
        loading: false
      }
    }

    case AT.SETTINGS_GET_ADDRESSES_SEARCH_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_FILTER_FULFILLED:
    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_STRING_FULFILLED: {
      return {
        ...state,
        deliveryAddressesRows: action.payload,
        loading: false
      }
    }

    case AT.DWOLLA_FINALIZE_VERIFICATION_REJECTED:
    case AT.SETTINGS_UPDATE_DELIVERY_ADDRESSES_REJECTED:
    case AT.SETTINGS_CREATE_NEW_DELIVERY_ADDRESS_REJECTED:
    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_STRING_REJECTED:
    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_FILTER_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.SETTINGS_GET_PRODUCTS_CATALOG_DATA_PENDING: {
      return {
        ...state,
        productDataLoading: true
      }
    }

    case AT.SETTINGS_GET_PRODUCTS_CATALOG_DATA_REJECTED: {
      return {
        ...state,
        productDataLoading: false
      }
    }

    case AT.SETTINGS_GET_COUNTRIES_PENDING: {
      return {
        ...state,
        countriesLoading: true
      }
    }

    case AT.SETTINGS_GET_COUNTRIES_FULFILLED: {
      return {
        ...state,
        countries: payload,
        countriesLoading: false,
        countriesDropDown: payload.map(c => ({
          text: c.name,
          value: c.id,
          key: c.id
        }))
      }
    }

    case AT.SETTINGS_GET_COUNTRIES_REJECTED: {
      return {
        ...state,
        countriesLoading: false
      }
    }

    case AT.SETTINGS_GET_PROVINCES_FULFILLED: {
      return {
        ...state,
        provinces: payload,
        provincesDropDown: payload.map(d => ({
          text: d.name,
          value: d.id,
          key: d.id
        }))
      }
    }

    case AT.ADD_TAB: {
      var tabsNames = state.tabsNames
      if (!state.tabsNames.find(el => el.id === payload.id)) {
        var tabsNames = [].concat(payload, state.tabsNames)
      }
      return {
        ...state,
        tabsNames: tabsNames
      }
    }

    /* DELETE BANK ACCOUNT */

    case AT.POST_NEW_BANK_ACCOUNT_REQUEST_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.POST_NEW_BANK_ACCOUNT_REQUEST_REJECTED: {
      return {
        ...state,
        loading: false,
        popupValues: null
        // isOpenPopup: false,
      }
    }

    case AT.POST_NEW_BANK_ACCOUNT_REQUEST_FULFILLED: {
      return {
        ...state,
        loading: false,
        popupValues: null,
        isOpenPopup: false,
        bankAccountsRows: [...state.bankAccountsRows, action.payload]
      }
    }

    case AT.DELETE_BANK_ACCOUNT_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.DELETE_BANK_ACCOUNT_FULFILLED: {
      return {
        ...state,
        loading: false,
        bankAccountsRows: state.bankAccountsRows.filter(account => account.id !== payload)
      }
    }

    case AT.DWOLLA_SET_PREFERRED_FULFILLED:
    case AT.DELETE_BANK_ACCOUNT_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.DWOLLA_SET_PREFERRED_PENDING:
    case AT.DWOLLA_START_VERIFICATION_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.DWOLLA_START_VERIFICATION_FULFILLED: {
      return {
        ...state,
        loading: false,
        bankAccountsRows: state.bankAccountsRows.map(baRow => {
          if (baRow.id === action.payload.id) {
            return action.payload
          } else {
            return baRow
          }
        })
      }
    }

    case AT.DWOLLA_FINALIZE_VERIFICATION_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.DWOLLA_FINALIZE_VERIFICATION_FULFILLED: {
      return {
        ...state,
        loading: false,
        bankAccountsRows: action.payload
      }
    }

    /* DELETE BRANCH */

    case AT.DELETE_BRANCH_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.DELETE_BRANCH_FULFILLED: {
      let property = state.currentTab.type === 'warehouses' ? 'warehousesRows' : 'branchesRows'

      return {
        ...state,
        loading: false,
        [property]: state[property].filter(warehouse => warehouse.id !== payload)
      }
    }

    case AT.DELETE_BRANCH_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.TAB_CHANGED: {
      return {
        ...state,
        currentTab: payload,
        isOpenSidebar: state.currentTab !== payload ? false : state.isOpenSidebar,
        isOpenPopup: state.currentTab !== payload ? false : state.isOpenPopup,
        popupValues: state.currentTab !== payload ? null : state.popupValues,
        filterValue: state.currentTab !== payload ? '' : state.filterValue,
        tabClicked: !state.tabClicked
      }
    }

    case AT.SETTINGS_GET_DOCUMENT_TYPES_FULFILLED: {
      return {
        ...state,
        documentTypes: action.payload.data.map(docType => {
          return {
            key: docType.id,
            text: docType.name,
            value: docType.id
          }
        })
      }
    }

    /* GET_LOGISTIC_ACCOUNTS */

    case AT.GET_LOGISTICS_ACCOUNTS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_LOGISTICS_ACCOUNTS_FULFILLED: {
      return {
        ...state,
        loading: false,
        logisticsAccounts: payload
      }
    }

    case AT.GET_LOGISTICS_ACCOUNTS_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* GET_LOGISTICS_PROVIDERS */

    case AT.GET_LOGISTICS_PROVIDERS_PENDING: {
      return {
        ...state,
        logisticsProvidersFetching: true
      }
    }

    case AT.GET_LOGISTICS_PROVIDERS_FULFILLED: {
      return {
        ...state,
        logisticsProvidersFetching: false,
        logisticsProviders: payload
      }
    }

    case AT.GET_LOGISTICS_PROVIDERS_REJECTED: {
      return {
        ...state,
        logisticsProvidersFetching: false
      }
    }

    /* CREATE_LOGISTICS_ACCOUNT */

    case AT.CREATE_LOGISTICS_ACCOUNT_FULFILLED: {
      return {
        ...state
        //logisticsAccounts: [].concat([payload], state.logisticsAccounts)  // ! ! not working now (missing response)
      }
    }

    /* UPDATE_LOGSITICS_ACCOUNT */

    case AT.UPDATE_LOGISTICS_ACCOUNT_FULFILLED: {
      let logisticsAccounts = state.logisticsAccounts.slice()
      logisticsAccounts[state.logisticsAccounts.findIndex(el => el.id === payload.id)] = payload
      return {
        ...state,
        logisticsAccounts
      }
    }

    /* DELETE_LOGISTICS_ACCOUNT */

    case AT.DELETE_LOGISTICS_ACCOUNT_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.DELETE_LOGISTICS_ACCOUNT_FULFILLED: {
      return {
        ...state,
        loading: false,
        logisticsAccounts: state.logisticsAccounts.filter(el => el.id !== payload)
      }
    }

    case AT.DELETE_LOGISTICS_ACCOUNT_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.RESET_SETTINGS: {
      return {
        ...initialState
      }
    }

    // case AT.GET_SETTINGS_PENDING: {
    //   return {
    //     ...state,
    //     systemSettingsLoading: true
    //   }
    // }

    // case AT.GET_SETTINGS_FULFILLED: {
    //   return {
    //     ...state,
    //     systemSettings: payload,
    //     systemSettingsLoading: false
    //   }
    // }

    // case AT.GET_SETTINGS_REJECTED: {
    //   return {
    //     ...state,
    //     systemSettingsLoading: false
    //   }
    // }

    // case AT.UPDATE_SETTINGS_PENDING: {
    //   return {
    //     ...state,
    //     sysSettingsUpdating: true
    //   }
    // }

    // case AT.UPDATE_SETTINGS_FULFILLED: {
    //   return {
    //     ...state,
    //     systemSettings: payload,
    //     sysSettingsUpdating: false
    //   }
    // }

    // case AT.UPDATE_SETTINGS_REJECTED: {
    //   return {
    //     ...state,
    //     sysSettingsUpdating: false
    //   }
    // }

    /* TRIGGER_SYSTEM_SETTINGS_MODAL */

    case AT.TRIGGER_SYSTEM_SETTINGS_MODAL: {
      let isOpen = !state.systemSettingsModalOpen
      if (payload !== null) isOpen = payload

      return {
        ...state,
        systemSettingsModalOpen: isOpen
      }
    }

    /* GET_BUSINESS_CLASSIFICATIONS */

    case AT.GET_BUSINESS_CLASSIFICATIONS_PENDING: {
      return {
        ...state,
        bussinessClassificationsLoading: true
      }
    }

    case AT.GET_BUSINESS_CLASSIFICATIONS_FULFILLED: {
      return {
        ...state,
        businessClassifications: payload,
        bussinessClassificationsLoading: false
      }
    }

    case AT.GET_BUSINESS_CLASSIFICATIONS_REJECTED: {
      return {
        ...state,
        bussinessClassificationsLoading: false
      }
    }

    /* SETTINGS_CREATE_DWOLLA_ACCOUNT */

    case AT.SETTINGS_CREATE_DWOLLA_ACCOUNT_PENDING: {
      return {
        ...state,
        dwollaSaving: true
      }
    }

    case AT.SETTINGS_CREATE_DWOLLA_ACCOUNT_FULFILLED:
    case AT.SETTINGS_CREATE_DWOLLA_ACCOUNT_REJECTED: {
      return {
        ...state,
        dwollaSaving: false
      }
    }

    /* ATTACHMENTS */

    case AT.SETTINGS_REMOVE_ATTACHMENT_PENDING:
    case inventoryAT.INVENTORY_ADD_ATTACHMENT_PENDING:
    case inventoryAT.INVENTORY_REMOVE_ATTACHMENT_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.SETTINGS_REMOVE_ATTACHMENT_FULFILLED:
    case AT.SETTINGS_REMOVE_ATTACHMENT_REJECTED:
    case inventoryAT.INVENTORY_ADD_ATTACHMENT_FULFILLED:
    case inventoryAT.INVENTORY_ADD_ATTACHMENT_REJECTED:
    case inventoryAT.INVENTORY_REMOVE_ATTACHMENT_FULFILLED:
    case inventoryAT.INVENTORY_REMOVE_ATTACHMENT_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* TRIGGER_AGREEMENT_MODAL */

    case AT.TRIGGER_AGREEMENT_MODAL: {
      let { force, modalProps } = payload
      let { open } = !state.agreementModal

      if (force !== null) open = force

      return {
        ...state,
        agreementModal: {
          ...state.agreementModal,
          open
          // ...modalProps
        }
      }
    }

    case AT.SETTINGS_GET_VERIFICATION_DOCUMENT_TYPES_FULFILLED: {
      return {
        ...state,
        verificationDocumentTypes: action.payload
      }
    }

    /* GET_LANGUAGES */

    case AT.GET_LANGUAGES_PENDING: {
      return {
        ...state,
        languagesFetching: true
      }
    }

    case AT.GET_LANGUAGES_FULFILLED: {
      return {
        ...state,
        languages: payload,
        languagesFetching: false
      }
    }

    case AT.GET_LANGUAGES_REJECTED: {
      return {
        ...state,
        languagesFetching: false
      }
    }

    case AT.SEARCH_COMPANY_GENERIC_PRODUCTS_PENDING: {
      return {
        ...state,
        companyGenericProductFetching: true
      }
    }

    case AT.SEARCH_COMPANY_GENERIC_PRODUCTS_FULFILLED: {
      return {
        ...state,
        companyGenericProduct: payload,
        companyGenericProductFetching: false
      }
    }

    case AT.SEARCH_COMPANY_GENERIC_PRODUCTS_REJECTED: {
      return {
        ...state,
        companyGenericProductFetching: false
      }
    }

    case AT.SEARCH_NMFC_NUMBERS_PENDING:
    case AT.GET_NMFC_NUMBERS_PENDING: {
      return {
        ...state,
        nmfcNumbersFetching: true
      }
    }

    case AT.SEARCH_NMFC_NUMBERS_REJECTED:
    case AT.GET_NMFC_NUMBERS_REJECTED: {
      return {
        ...state,
        nmfcNumbersFetching: false
      }
    }

    case AT.SEARCH_NMFC_NUMBERS_FULFILLED:
    case AT.GET_NMFC_NUMBERS_FULFILLED: {
      return {
        ...state,
        nmfcNumbersFetching: false,
        nmfcNumbersFiltered: action.payload
      }
    }

    case AT.ADD_NMFC_NUMBERS: {
      let copy = state.nmfcNumbersFiltered.slice()
      let payloadNew = payload
      if (!(payload instanceof Array)) payloadNew = [payload]

      payloadNew.forEach(element => {
        if (!copy.find(e => e.id === element.id)) copy.push(element)
      })

      return {
        ...state,
        nmfcNumbersFiltered: payloadNew
      }
    }

    case AT.DELETE_CSV_MAP_PRODUCT_OFFER_FULFILLED:
    case AT.DELETE_CSV_MAP_COMPANY_GENERIC_PRODUCT_FULFILLED:
    case AT.DELETE_CSV_MAP_COMPANIES_FULFILLED: {
      return {
        ...state,
        selectedSavedMap: null,
        maps: state.maps.filter(map => map.id !== action.meta)
      }
    }

    case AT.GET_BRANCH_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_BRANCH_REJECTED: {
      return {
        ...state,
        loading: false,
        popupValues: null
        // isOpenPopup: false,
      }
    }

    case AT.GET_BRANCH_FULFILLED: {
      return {
        ...state,
        loading: false,
        popupValues: action.payload.data
      }
    }

    case AT.SETTINGS_GET_DWOLLA_BENEFICIARY_OWNERS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.SETTINGS_GET_DWOLLA_BENEFICIARY_OWNERS_REJECTED: {
      return {
        ...state,
        loading: false,
        documentsOwner: []
        // isOpenPopup: false,
      }
    }

    case AT.SETTINGS_GET_DWOLLA_BENEFICIARY_OWNERS_FULFILLED: {
      return {
        ...state,
        loading: false,
        documentsOwner: action.payload
      }
    }

    case AT.CHANGE_CSV_HEADER: {
      return {
        ...state,
        csvWithoutHeader: !state.csvWithoutHeader
      }
    }

    case AT.POST_NEW_USER_REQUEST_PENDING:
    case AT.HANDLE_SUBMIT_USER_EDIT_POPUP_PENDING:
    case AT.SETTINGS_GET_COMPANY_DETAILS_PENDING: {
      return {
        ...state,
        updating: true
      }
    }

    case AT.POST_NEW_USER_REQUEST_FULFILLED:
    case AT.POST_NEW_USER_REQUEST_REJECTED:
    case AT.HANDLE_SUBMIT_USER_EDIT_POPUP_FULFILLED:
    case AT.HANDLE_SUBMIT_USER_EDIT_POPUP_REJECTED:
    case AT.SETTINGS_GET_COMPANY_DETAILS_FULFILLED:
    case AT.SETTINGS_GET_COMPANY_DETAILS_REJECTED: {
      return {
        ...state,
        updating: false
      }
    }

    case AT.SETTINGS_HANDLE_LOCATIONS_TAB: {
      return {
        ...state,
        locationsTab: payload,
        isOpenSidebar: state.locationsTab !== payload ? false : state.isOpenSidebar,
        openTab: state.locationsTab !== payload ? null : state.openTab,
        popupValues: state.locationsTab !== payload ? null : state.popupValues
      }
    }

    case AT.SETTINGS_HANDLE_VARIABLE_CHANGE: {
      return {
        ...state,
        [payload.variable]: payload.value
      }
    }

    case AT.SETTINGS_RENDER_COPYRIGHT: {
      return {
        ...state,
        renderCopyright: true
      }
    }

    case AT.SETTINGS_CLEAN_RENDER_COPYRIGHT: {
      return {
        ...state,
        renderCopyright: false
      }
    }

    default: {
      return state
    }
  }
}
