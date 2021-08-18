import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import * as api from './api'
import { currency } from '../../constants/index'
import { getSafe } from '../../utils/functions'
import { SETTINGS } from '../auth/constants'

export const openBroadcast = createAsyncAction('BROADCAST_OPEN', async (offer, settings = null) => {
  const data = await api.loadRules(offer.id)

  const companySharedListingDefaultMarkup = settings?.find(s => s.key === SETTINGS.COMPANY_SHARED_LISTING_DEFAULT_MARKUP)

  //setup Markup default value in a root if there doesn't exist any value in treeData
  if (
    data?.broadcastTree?.type === 'root' &&
    !(data?.broadcastTree?.priceAddition || data?.broadcastTree?.priceMultiplier) &&
    companySharedListingDefaultMarkup?.value &&
    companySharedListingDefaultMarkup?.value !== SETTINGS.EMPTY_SETTING
  ) {
    //data.broadcastTree.broadcast = 1 ??
    data.broadcastTree.priceMultiplier = +companySharedListingDefaultMarkup?.value
    data.broadcastTree.priceAddition = 0
  }

  return {
    data: data.broadcastTree,
    broadcastTemplateName: getSafe(() => data.broadcastTemplateName, null),
    id: offer.id,
    offer: {
      id: offer.id,
      pricingTiers: offer.pricingTiers,
      currency: getSafe(() => offer.cost.currency.code, currency)
    }
  }
})

export const initGlobalBroadcast = createAsyncAction('INIT_GLOBAL_BROADCAST', async settings => {
  let data = await api.loadGeneralRules()

  const companySharedListingDefaultMarkup = settings?.find(s => s.key === SETTINGS.COMPANY_SHARED_LISTING_DEFAULT_MARKUP)

  //setup Markup default value in a root if there doesn't exist any value in treeData
  if (
    data?.type === 'root' &&
    !(data?.priceAddition || data?.priceMultiplier) &&
    companySharedListingDefaultMarkup?.value &&
    companySharedListingDefaultMarkup?.value !== SETTINGS.EMPTY_SETTING
  ) {
    data.broadcast = 1
    data.priceMultiplier = +companySharedListingDefaultMarkup?.value
    data.priceAddition = 0
  }

  return {
    data,
    id: null,
    offer: {
      id: null,
      pricingTiers: [null, null],
      currency: 'USD'
    }
  }
})
export const broadcastChange = createAsyncAction(
  'BROADCAST_CHANGE',
  async (row, option, template, datagrid, isUpdateWarehouse = true, dataType = '') => {
    const rr = datagrid.rows.filter(ra => ra.id === row.id)
    const r = rr[0]
    
    let warehouse = isUpdateWarehouse
      ? {
          warehouse: r.warehouse
        }
      : {
          warehouse: row.warehouse
        }

    let editedRow = {
      ...row,
      ...warehouse,
      ...(dataType === 'shared-listings' ? { resellerBroadcastOption: { key: option } } : { broadcastOption: option }),
      broadcastTemplateResponse: template
    }
    await datagrid.updateRow(row.id, () => ({
      ...row,
      ...warehouse,
      isBroadcastLoading: true
    }))
    await api.broadcastChange(row.id, option, template ? template.id : null)
    await datagrid.updateRow(row.id, () => ({ ...editedRow, isBroadcastLoading: false }))

    return editedRow
  }
)

export const saveRules = createAsyncAction('BROADCAST_SAVE', async (row, rules, datagrid, dataType) => {
  if (row && row.id) {
    datagrid &&
      datagrid.updateRow &&
      datagrid.updateRow(row.id, () => ({
        ...(dataType === 'shared-listings' ? { ...row.rawData } : { ...row }),
        warehouse: {
          deliveryAddress: {
            cfName: typeof row.warehouse === 'string' ? row.warehouse : row.warehouse.deliveryAddress.cfName
          }
        },
        isBroadcastLoading: true
      }))
    const data = await api.saveRules(row.id, rules)
    datagrid &&
      datagrid.updateRow &&
      datagrid.updateRow(row.id, () => ({
        warehouse: {
          deliveryAddress: {
            cfName: typeof row.warehouse === 'string' ? row.warehouse : row.warehouse?.deliveryAddress?.cfName
          }
        },
        isBroadcastLoading: false,
        ...(dataType === 'shared-listings'
          ? { ...row.rawData, resellerBroadcastOption: { key: 'CUSTOM_RULES' } }
          : { ...row, broadcastOption: 'CUSTOM_RULES' })
      }))
    return {
      broadcastTemplateName: getSafe(() => data.broadcastTemplateName, null)
    }
  } else {
    return await api.saveGeneralRules(rules)
  }
})

export const saveTemplate = createAsyncAction('BROADCAST_SAVE_TEMPLATE', payload => api.saveTemplate(payload))
export const updateTemplate = createAsyncAction('UPDATE_TEMPLATE', (id, payload) => api.updateTemplate(id, payload))
export const getTemplate = createAsyncAction('GET_TEMPLATE', id => api.getTemplate(id))
export const deleteTemplate = createAsyncAction('DELETE_TEMPLATE', id => api.deleteTemplate(id))
export const getTemplates = createAsyncAction('GET_TEMPLATES', () => api.getTemplates())

export const closeBroadcast = createAction('BROADCAST_CLOSE')
export const switchTemplateModal = createAction('BROADCAST_SWITCH_TEMPLATE_MODAL', isOpenTemplateModal => ({
  isOpenTemplateModal: isOpenTemplateModal
}))
export const updateFilter = createAction('BROADCAST_FILTER_UPDATE', filter => filter)
export const switchMode = createAction('BROADCAST_SWITCH_MODE', mode => mode)
export const loadingChanged = createAction('BROADCAST_LOADING', (force = null) => force)
export const treeDataChanged = createAction('TREE_DATA_CHANGED', treeData => treeData)

export const openModalCompanyInfo = createAction('OPEN_MODAL_COMPANY_INFO')
export const closeModalCompanyInfo = createAction('CLOSE_MODAL_COMPANY_INFO')
export const getCompanyInfo = createAsyncAction('GET_COMPANY_INFO', companyId => api.getCompanyInfo(companyId))

export const getAssociations = createAsyncAction('GET_ASSOCIATIONS', filter => api.getAssociations(filter))
