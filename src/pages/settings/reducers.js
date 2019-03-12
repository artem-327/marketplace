import * as AT from './action-types';
  
export const initialState = {
  editWarehousePopup: false,
  addNewWarehousePopup: false,
  popupValues: [],
  usersRows: [],
  warehousesRows: [],
  branchesRows: [],
  creditCardsRows: [],
  bankAccountsRows: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AT.EDIT_POPUP_TRIGGER: {
      return {
        ...state,
        editWarehousePopup: state.editWarehousePopup === false ? true : false,
        popupValues: action.payload
      }
    }

    case AT.GET_USERS_DATA_SUCCESS: {
      const usersRows = action.payload.map(user => {
        return {
          checkbox: " ",
          userName: user.firstname + " " + user.lastname,
          title: "title",
          email: user.email,
          phone: "phone",
          homeBranch: user.branch.address.province.name,
          permissions: user.roles.name
        };
      });
      return {
        ...state,
        usersRows: usersRows,
      }
    }

    case AT.GET_WAREHOUSES_DATA_SUCCESS: {      
      const warehousesRows = action.payload.map(warehouse => {	
        return (
          {
            warehouseName: warehouse.company.name,
            address: warehouse.address.streetAddress + ', ' + warehouse.address.city,
            contactName: warehouse.contact.name,
            phone: warehouse.contact.phone,
            email: warehouse.contact.email,
            branchId: warehouse.id
          }
        )			
      });

      return {
        ...state,
        warehousesRows: warehousesRows,
      }
    }

    case AT.GET_BRANCHES_DATA_SUCCESS: {
      const rows = action.payload.map(branch => {	
        return (
          {
            warehouseName: branch.company.name,
            address: branch.address.streetAddress + ', ' + branch.address.city,
            contactName: branch.contact.name,
            phone: branch.contact.phone,
            email: branch.contact.email,
            branchId: branch.id
          }
        )			
      });

      return {
        ...state,
        branchesRows: rows
      }
    }

    case AT.GET_CREDIT_CARDS_DATA_SUCCESS: {
      const rows = action.payload.map(card => {	
        return (
          {
            id: card.id,
            cardNumber: card.cardNumber,
            cvc: card.cvcCheck,
            expirationMonth: card.expMonth,
            expirationYear: card.expYear,
            last4: card.last4
            // cardNumber what does it mean
          }
        )			
      });

      return {
        ...state,
        creditCardsRows: rows
      }
    }

    case AT.GET_BANK_ACCOUNTS_DATA_SUCCESS: {
      console.log(action.payload, 'bankAccountsRows')   
      const rows = action.payload.map(account => {
        return (
          {
            id: account.id,
            accountHolderName: account.accountHolderName,
            accountHolderType: account.accountHolderType,
            accountNumber: account.accountNumber,
            country: account.country,
            currency: account.currency,
            routingNumber: account.routingNumber
            // accountNumber - what does it mean
          }
        )			
      });

      return {
        ...state,
        bankAccountsRows: rows
      }
    }
    
    case AT.POST_NEW_WAREHOUSE_POPUP: {
      return {
        ...state,
        addNewWarehousePopup: state.addNewWarehousePopup === false ? true : false,
      }
    }

    default: {
      return state
    }
  }
}