import typeToReducer from 'type-to-reducer'
// Actions
import {
  openPopup,
  closePopup,
  deleteShippingQuote,
  createShippingQuote,
  deleteTag,
  updateTag,
  createTag,
  searchCompany,
  setProductMappedUnmaped,
  loadData,
  openOrderDetail,
  cancelOrder,
  clearAccountingDocuments,
  getAccountingDocuments,
  saveFilters,
  markRequestAsProcessed,
  denyRequest,
  deleteRequest,
  searchManualQuoteRequest,
  resolveDisputeAccept,
  resolveDisputeCredit,
  resolveDisputeReject,
  generateBOL,
  openGenBOLPopup,
  closeGenBOLPopup,
  getOrderById
} from './actions'


const initialState = {
  popupValues: null,
  isOpenPopup: false,
  isOpenGenBOLPopup: false,
  rowBOL: null,
  orderByIdLoading: false,
  loading: false,
  searchedCompanies: [],
  searchedCompaniesLoading: false,
  companyProductUnmappedOnly: 'ALL',
  ordersStatusFilter: 'All',
  orderDetailData: null,
  documentTypesFetching: false,
  orderProcessing: false,
  orderAccountingDocuments: [],
  orderAccountingDocumentsLoading: false,
  tableHandlersFilters: null,
  searchedManQuotRequests: [],
  searchedManQuotRequestsLoading: false
}

export default typeToReducer(
  {
    [openPopup]: (state, action) => {
      return {
        ...state,
        isOpenPopup: true,
        popupValues: action.payload
      }
    },
    [closePopup]: (state, action) => {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null
      }
    },
    [deleteShippingQuote.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteShippingQuote.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteShippingQuote.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [createShippingQuote.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [createShippingQuote.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [createShippingQuote.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteTag.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteTag.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteTag.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [updateTag.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [updateTag.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [updateTag.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [createTag.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [createTag.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [createTag.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [searchCompany.pending]: (state, action) => {
      return {
        ...state, 
        searchedCompaniesLoading: true
      }
    },
    [searchCompany.rejected]: (state, action) => {
      return {
        ...state, 
        searchedCompaniesLoading: false
      }
    },
    [searchCompany.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedCompanies: action.payload,
        searchedCompaniesLoading: false
      }
    },
    [setProductMappedUnmaped]: (state, action) => {
      return {
        ...state,
        companyProductUnmappedOnly: action.payload
      }
    },
    [loadData]: (state, action) => {
      return {
        ...state,
        loading: false,
        ordersStatusFilter: action.payload.filter.status
      }
    },
    [openOrderDetail]: (state, action) => {
      return {
        ...state,
        orderDetailData: action.payload
      }
    },
    [cancelOrder.pending]: (state, action) => {
      return {
        ...state, 
        orderProcessing: true
      }
    },
    [cancelOrder.rejected]: (state, action) => {
      return {
        ...state, 
        orderProcessing: false
      }
    },
    [cancelOrder.fulfilled]: (state, action) => {
      return {
        ...state, 
        orderProcessing: false
      }
    },
    [clearAccountingDocuments]: (state, action) => {
      return {
        ...state,
        orderAccountingDocuments: []
      }
    },
    [getAccountingDocuments.pending]: (state, action) => {
      return {
        ...state,
        orderAccountingDocumentsLoading: true
      }
    },
    [getAccountingDocuments.rejected]: (state, action) => {
      return {
        ...state,
        orderAccountingDocumentsLoading: false
      }
    },
    [getAccountingDocuments.fulfilled]: (state, action) => {
      return {
        ...state,
        orderAccountingDocumentsLoading: false,
        orderAccountingDocuments: action.payload.data
      }
    },
    [saveFilters]: (state, action) => {
      return {
        ...state,
        tableHandlersFilters: action.payload
      }
    },
    [markRequestAsProcessed.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [markRequestAsProcessed.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [markRequestAsProcessed.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [denyRequest.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [denyRequest.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [denyRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteRequest.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [deleteRequest.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [deleteRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [searchManualQuoteRequest.pending]: (state, action) => {
      return {
        ...state, 
        searchedManQuotRequestsLoading: true
      }
    },
    [searchManualQuoteRequest.rejected]: (state, action) => {
      return {
        ...state, 
        searchedManQuotRequestsLoading: false
      }
    },
    [searchManualQuoteRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedManQuotRequests: action.payload,
        searchedManQuotRequestsLoading: false
      }
    },
    [resolveDisputeAccept.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [resolveDisputeAccept.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [resolveDisputeAccept.fulfilled]: (state, action) => {
      return {
        ...state,
        orderDetailData: action.payload,
        loading: false
      }
    },
    [resolveDisputeCredit.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [resolveDisputeCredit.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [resolveDisputeCredit.fulfilled]: (state, action) => {
      return {
        ...state,
        orderDetailData: action.payload,
        loading: false
      }
    },
    [resolveDisputeReject.pending]: (state, action) => {
      return {
        ...state,
        loading: true
      }
    },
    [resolveDisputeReject.rejected]: (state, action) => {
      return {
        ...state,
        loading: false
      }
    },
    [resolveDisputeReject.fulfilled]: (state, action) => {
      return {
        ...state,
        orderDetailData: action.payload,
        loading: false
      }
    },
    [openGenBOLPopup]: (state, action) => {
      return {
        ...state,
        isOpenGenBOLPopup: true,
        rowBOL: action.payload
      }
    },
    [closeGenBOLPopup]: (state, action) => {
      return {
        ...state,
        isOpenGenBOLPopup: false,
        rowBOL: null
      }
    },
    [getOrderById.pending]: (state, action) => {
      return {
        ...state,
        orderByIdLoading: true
      }
    },
    [getOrderById.rejected]: (state, action) => {
      return {
        ...state,
        orderByIdLoading: false
      }
    },
    [getOrderById.fulfilled]: (state, action) => {
      return {
        ...state,
        orderByIdLoading: false
      }
    },
  },
  initialState
)
