import * as AT from './action-types'
import get from 'lodash/get'

export const initialState = {
  editPopupBoolean: false,
  addNewWarehousePopup: false,
  popupValues: [],
  usersRows: [],
  warehousesRows: [],
  branchesRows: [],
  creditCardsRows: [],
  bankAccountsRows: [],
  productsCatalogRows: [],
  productsPackagingType: [],
  columnsForFormatter: {
    checkboxColumns: ['checkbox'],
    permissionsColumns: ['permissions'],
    editDeleteColumns: ['editDeleteBtn']
  },
  country: [],
  tabsNames: [
    { name: 'Users', id: 1 },
    { name: 'Branches', id: 2 },
    { name: 'Warehouses', id: 3 },
    { name: 'Product catalog', id: 4 },
    { name: 'Global Broadcast', id: 5 },
    //{ name: "Client list", id: 6 }, // removed #29771
    { name: 'Credit cards', id: 7 },
    { name: 'Bank accounts', id: 8 }
    //{ name: "Tax manager", id: 9 }, // removed #29771
    //{ name: "Terms", id: 10 }, // removed #29771
    //{ name: "Website Controls", id: 11 } // removed #29771
  ],
  // currentTab: "Product catalog",
  currentTab: 'Users',
  currentEditForm: null,
  currentAddForm: null,
  confirmMessage: null,
  toast: { message: null, isSuccess: null },
  deleteUserById: null,
  deleteRowByid: null,
  filterValue: '',
  editPopupSearchProducts: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AT.OPEN_EDIT_POPUP: {
      return {
        ...state,
        currentEditForm: state.currentTab,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: action.payload
      }
    }
    case AT.CLOSE_EDIT_POPUP: {
      return {
        ...state,
        currentEditForm: null,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: null
      }
    }
    case AT.OPEN_CONFIRM_POPUP: {
      return {
        ...state,
        confirmMessage: true,
        deleteRowByid: action.payload
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
    case AT.CLOSE_CONFIRM_POPUP: {
      return {
        ...state,
        deleteRowByid: null,
        confirmMessage: null
      }
    }
    case AT.CONFIRM_SUCCESS: {
      return {
        ...state,
        deleteRowByid: null,
        confirmMessage: null
      }
    }

    case AT.OPEN_ADD_POPUP: {
      return {
        ...state,
        currentAddForm: state.currentTab,
        popupValues: action.payload
      }
    }
    case AT.CLOSE_ADD_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null
      }
    }

    case AT.HANDLE_ACTIVE_TAB: {
      return {
        ...state,
        currentTab: action.payload.tab,
        currentAddForm: null,
        currentEditForm: null
      }
    }

    case AT.HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: action.payload
      }
    }

    case AT.GET_USERS_DATA_SUCCESS: {
      const usersRows = action.payload.map(user => {
        return {
          checkbox: ' ',
          userName: user.firstname + ' ' + user.lastname,
          title: 'title',
          email: user.email,
          phone: 'phone',
          homeBranch: user.branch ? user.branch.address.province.name : '',
          permissions: user.roles ? user.roles.name : '',
          middleName: user.middlename,
          id: user.id
        }
      })
      return {
        ...state,
        usersRows: usersRows
      }
    }

    case AT.GET_WAREHOUSES_DATA_SUCCESS: {
      const warehousesRows = action.payload.warehouses.map(warehouse => ({
        warehouseName: warehouse.name,
        address:
          warehouse.address.streetAddress + ', ' + warehouse.address.city,
        countryId: warehouse.address.country.id,
        contactName: warehouse.contact.name,
        phone: warehouse.contact.phone,
        email: warehouse.contact.email,
        branchId: warehouse.id,
        id: warehouse.id
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
        warehousesRows: warehousesRows,
        country: action.payload.newCountryFormat
      }
    }

    case AT.GET_BRANCHES_DATA_SUCCESS: {
      const rows = action.payload.map(branch => {
        return {
          warehouseName: branch.name,
          address: branch.address.streetAddress + ', ' + branch.address.city,
          contactName: branch.contact.name,
          phone: branch.contact.phone,
          email: branch.contact.email,
          branchId: branch.id
        }
      })

      return {
        ...state,
        branchesRows: rows
      }
    }

    case AT.GET_CREDIT_CARDS_DATA_SUCCESS: {
      const rows = action.payload.map(card => {
        return {
          id: card.id,
          cardNumber: `**** **** **** ${card.last4}`,
          cvc: card.cvcCheck,
          expirationMonth: card.expMonth,
          expirationYear: card.expYear,
          last4: `**** **** **** ${card.last4}`
          // cardNumber what does it mean
        }
      })

      return {
        ...state,
        creditCardsRows: rows
      }
    }

    case AT.GET_BANK_ACCOUNTS_DATA_SUCCESS: {
      const rows = action.payload.map(account => {
        return {
          id: account.id,
          accountHolderName: account.accountHolderName,
          accountHolderType: account.accountHolderType,
          accountNumber: `**** **** **** ${account.last4}`,
          country: account.country,
          currency: account.currency,
          routingNumber: account.routingNumber
          // accountNumber - what does it mean
        }
      })

      return {
        ...state,
        bankAccountsRows: rows
      }
    }

    case AT.GET_PRODUCTS_CATALOG_DATA_SUCCESS: {
      const rows = action.payload.products.map(product => {
        // const packaging = get(product, ["packaging"], false)
        return {
          id: product.id,
          // product: product.product.id,
          productName: product.productName,
          productNumber: product.productCode,
          casProduct: product.casProduct
            ? product.casProduct.casNumber
              ? product.casProduct.casNumber
              : null
            : null,
          packagingType: product.packagingType
            ? product.packagingType.name
            : null,
          // packagingType: packaging
          //   ? product.packaging.packagingType
          //     ? product.packaging.packagingType.name
          //     : ""
          //   : "",
          packagingSize: product.packagingSize
        }
      })
      const packagingType = action.payload.productsTypes.map((type, id) => {
        return {
          key: id,
          text: type.name,
          value: type.measureType
        }
      })
      return {
        ...state,
        productsCatalogRows: rows
        // productsPackagingType: packagingType
      }
    }

    case AT.GET_PRODUCTS_WITH_REQUIRED_PARAM_SUCCESS: {
      const editPopupSearchProducts = action.payload.map(item => {
        return {
          id: item.id,
          productName: item.productName,
          productNumber: item.product.unNumber,
          productId: item.product.id,
          packagingType:
            item.packaging.packagingType === undefined
              ? ''
              : item.packaging.packagingType.name,
          packagingSize: item.packaging.size
        }
      })
      return {
        ...state,
        editPopupSearchProducts
      }
    }

    case AT.POST_NEW_WAREHOUSE_POPUP: {
      return {
        ...state,
        currentAddForm: state.currentTab
      }
    }

    default: {
      return state
    }
  }
}
