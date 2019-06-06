import * as AT from "./action-types"
import { defaultTabs } from "./contants"

export const initialState = {
  editPopupBoolean: false,
  addNewWarehousePopup: false,
  popupValues: [],
  usersRows: [],
  userEditRoles: false,
  roles: [],
  warehousesRows: [],
  branchesRows: [],
  branchesAll: [],
  creditCardsRows: [],
  bankAccountsRows: [],
  productsCatalogRows: [],
  productsPackagingType: null,
  productsUnitsType: [],
  productsFreightClasses: [],
  productsHazardClasses: [],
  productsPackagingGroups: [],
  deliveryAddressesRows: [],
  countries: [],
  provinces: [],
  countriesDropDown: [],
  provincesDropDown: [],
  country: [],
  currency: [],
  tabsNames: defaultTabs,
  currentTab: defaultTabs[0],
  isOpenPopup: false,
  isOpenImportPopup: false,
  isDwollaOpenPopup: false,
  currentEditForm: null,
  currentAddForm: null,
  confirmMessage: null,
  toast: { message: null, isSuccess: null },
  deleteUserById: null,
  deleteRowById: null,
  filterValue: "",
  productCatalogUnmappedValue: false,
  editPopupSearchProducts: [],
  fileCSVId: null,
  CSV: null,
  mappedHeaders: null,
  dataHeaderCSV: null,
  loading: false,
  loaded: false,
  searchedCasProducts: [],
  searchedUnNumbers: [],
  deliveryAddressesFilter: { pageSize: 50, pageNumber: 0 },
  productsFilter: { pageSize: 50, pageNumber: 0 },
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.OPEN_POPUP: {
      return {
        ...state,
        loaded: false,
        isOpenPopup: true,
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
        deliveryAddressesRows: state.deliveryAddressesRows.filter((address) => address.id !== payload)
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

    case AT.HANDLE_PRODUCT_CATALOG_UNMAPPED_VALUE: {
      return {
        ...state,
        productCatalogUnmappedValue: action.payload
      }
    }

    case AT.GET_USERS_DATA: {// ! ! vsude zmenit na pending
      return { ...state, loading: true }
    }

    case AT.GET_USERS_DATA_FULFILLED: {
      const usersRows = action.payload.map(user => {
        return {
          //checkbox: " ",
          name: user.name,
          title: user.jobTitle || '',
          email: user.email,
          //phone: user.homeBranch.contactPhone || '',
          phone: user.phone || '',
          homeBranchId: user.homeBranch.id,
          /*preferredCurrency: user.preferredCurrency
            ? user.preferredCurrency.code
              ? user.preferredCurrency.code
              : null
            : null,
            */
          preferredCurrency: (user.preferredCurrency || {}).code || 0,
          homeBranch: user.homeBranch.name,
          permissions: user.roles ? user.roles.name : "", // ! ! array?
          id: user.id,
          allUserRoles: user.roles || []
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

    case AT.GET_WAREHOUSES_DATA: {// ! ! pending
      return { ...state, loading: true }
    }

    case AT.GET_WAREHOUSES_DATA_FULFILLED: {
      const warehousesRows = action.payload.warehouses.map(warehouse => ({
        name: warehouse.name,
        address:
          warehouse.address.streetAddress + ", " + warehouse.address.city,
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
          if (element[key] === "unknown") {
            element[key] = ""
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

    case AT.GET_BRANCHES_DATA: {  // ! ! pending
      return { ...state, loading: true }
    }

    case AT.GET_BRANCHES_DATA_FULFILLED: {
      const branchesRows = action.payload.branches.map(branch => {
        return {
          name: branch.name,
          address: branch.address.streetAddress + ", " + branch.address.city,
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
          if (element[key] === "unknown") {
            element[key] = ""
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
      const branches = action.payload.map(branch => {
        return {
          value: branch.id,
          text: branch.name
        }
      })
      return {
        ...state,
        branchesAll: branches
      }
    }

    case AT.GET_CREDIT_CARDS_DATA: {  // ! ! pending
      return { ...state, loading: true }
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
          expMonthYear: card.expMonth + " / " + card.expYear
        }
      })

      return {
        ...state,
        loading: false,
        creditCardsRows: rows
      }
    }

    case AT.GET_BANK_ACCOUNTS_DATA: { // ! ! pending
      return { ...state, loading: true }
    }

    case AT.GET_BANK_ACCOUNTS_DATA_FULFILLED: {
      const {
        bankAccountsData,
        newCountryFormat,
        newCurrencyFormat
      } = action.payload
      const rows = bankAccountsData.map(account => {
        return {
          id: account.id,
          accountHolderName: account.accountHolderName,
          accountHolderType: account.accountHolderType,
          accountNumber: `**** **** **** ${account.last4}`,
          // country: account.country,
          currency: account.currency,
          routingNumber: account.routingNumber
          // accountNumber - what does it mean
        }
      })

      return {
        ...state,
        loading: false,
        bankAccountsRows: rows,
        country: newCountryFormat,
        currency: newCurrencyFormat
      }
    }

    case AT.SETTINGS_GET_PRODUCTS_CATALOG_DATA_FULFILLED: {
      const rows = action.payload.products.map(product => {
        return {
          id: product.id,
          description: product.description ? product.description : '',
          productName: product.productName,
          productNumber: product.productCode,
          casName: product.casProduct
            ? product.casProduct.casIndexName
              ? product.casProduct.casIndexName
              : null
            : null,
          casNumber: product.casProduct
            ? product.casProduct.casNumber
              ? product.casProduct.casNumber
              : null
            : null,
          casProduct: product.casProduct ? product.casProduct : null,
          packagingType: product.packagingType
            ? product.packagingType.name
            : null,
          packageID: product.packagingType ? product.packagingType.id : null,
          packagingSize: product.packagingSize,
          packagingGroup: product.packagingGroup ? product.packagingGroup.id : null,
          unit: product.packagingUnit
            ? product.packagingUnit.nameAbbreviation
            : null,
          unitID: product.packagingUnit ? product.packagingUnit.id : null,
          freightClass: product.freightClass ? product.freightClass : null,
          hazardous: product.hazardous,
          hazardClass: product.hazardClasses && product.hazardClasses.length ? product.hazardClasses.map(d => (
              d.id
            )) : null,
          nmfcNumber: product.nmfcNumber ? product.nmfcNumber : null,
          stackable: product.stackable,
          unNumber: product.unNumber ? product.unNumber : null
        }
      })
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
      return {
        ...state,
        loading: false,
        loaded: true,
        productsCatalogRows: rows,
        productsPackagingType: packagingType,
        productsUnitsType: packagingUnitsType,
        productsHazardClasses: hazardClasses,
        productsFreightClasses: freightClasses,
        productsPackagingGroups: packagingGroups
      }
    }

    case AT.GET_PRODUCTS_WITH_REQUIRED_PARAM_FULFILLED: {
      const editPopupSearchProducts = action.payload.map(item => {
        return {
          id: item.id,
          productName: item.productName,
          productNumber: item.product.unNumber,
          productId: item.product.id,
          packagingType:
            item.packaging.packagingType === undefined
              ? ""
              : item.packaging.packagingType.name,
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
        headerCSV: action.data.lines[0].columns,
        bodyCSV: action.data.lines.slice(1)
      }
      return {
        ...state,
        CSV
      }
    }

    case AT.CHANGE_HEADERS_CSV: {
      return {
        ...state,
        mappedHeaders: action.payload
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
        fileCSVId: action.data.id
      }
    }

    case AT.SETTINGS_POST_CSV_IMPORT_PRODUCTS_FULFILLED: {
      return {
        ...state,
        csvImportError: action.data
      }
    }

    case AT.SETTINGS_CLOSE_IMPORT_POPUP_FULFILLED: {
      return {
        ...state,
        fileCSVId: null,
        mappedHeaders: null,
        dataHeaderCSV: null,
        isOpenImportPopup: false
      }
    }

    case AT.SETTINGS_CLEAR_DATA_OF_CSV: {
      return {
        ...state,
        fileCSVId: null,
        mappedHeaders: null,
        dataHeaderCSV: null
      }
    }

    case AT.SEARCH_CAS_PRODUCT_FULFILLED: {
      return {
        ...state,
        searchedCasProducts: action.payload.data
      }
    }

    case AT.SEARCH_UN_NUMBER_FULFILLED: {
      return {
        ...state,
        searchedUnNumbers: action.payload.data
      }
    }

    case AT.SETTINGS_GET_PRODUCTS_CATALOG_DATA_PENDING:
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

    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_FILTER_FULFILLED:
    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_STRING_FULFILLED: {
      return {
        ...state,
        deliveryAddressesRows: action.payload,
        loading: false
      }
    }

    case AT.SETTINGS_GET_PRODUCTS_CATALOG_DATA_REJECTED:
    case AT.SETTINGS_UPDATE_DELIVERY_ADDRESSES_REJECTED:
    case AT.SETTINGS_CREATE_NEW_DELIVERY_ADDRESS_REJECTED:
    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_STRING_REJECTED:
    case AT.SETTINGS_GET_DELIVERY_ADDRESSES_BY_FILTER_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.SETTINGS_GET_COUNTRIES_FULFILLED: {
      return {
        ...state,
        countries: payload,
        countriesDropDown: payload.map(c => ({
          text: c.name,
          value: c.id,
          key: c.id,
        }))
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
      if (!state.tabsNames.find((el) => el.id === payload.id)) {
        var tabsNames = [].concat(payload, state.tabsNames)
      }
      return {
        ...state,
        tabsNames: tabsNames
      }
    }

    /* DELETE PRODUCT */

    case AT.DELETE_PRODUCT_PENDING: {
      return {
        ...state,
        loading: true
      }
    }


    case AT.DELETE_PRODUCT_FULFILLED: {
      return {
        ...state,
        loading: false,
        productsCatalogRows: state.productsCatalogRows.filter((el) => el.id !== payload)
      }
    }

    case AT.DELETE_PRODUCT_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* DELETE USER */

    case AT.DELETE_USER_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.DELETE_USER_FULFILLED: {
      return {
        ...state,
        loading: false,
        usersRows: state.usersRows.filter((user) => user.id !== payload)
      }
    }

    case AT.DELETE_USER_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* DELETE BANK ACCOUNT */

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
        bankAccountsRows: state.bankAccountsRows.filter((account) => account.id !== payload)
      }
    }

    case AT.DELETE_BANK_ACCOUNT_REJECTED: {
      return {
        ...state,
        loading: false
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
        [property]: state[property].filter((warehouse) => warehouse.id !== payload)
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
        currentTab: payload
      }
    }


    default: {
      return state
    }
  }
}
