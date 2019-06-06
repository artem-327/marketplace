import * as AT from './action-types'
import * as api from './api'
import { updateIdentity } from '~/modules/auth/actions'
import { addMessage } from '~/modules/messages/actions'
import { themes, responses } from '~/modules/messages/constants'

export function openEditPopup(editedData) {
	return {
		type: AT.ADMIN_OPEN_EDIT_POPUP,
		payload: editedData
	}
}

export function closeEditPopup() {
	return {
		type: AT.ADMIN_CLOSE_EDIT_POPUP,
	}
}

export function openAddPopup(currentTab) {
	return {
		type: AT.ADMIN_OPEN_ADD_POPUP,
		payload: currentTab
	}
}
export function closeAddPopup() {
	return {
		type: AT.ADMIN_CLOSE_ADD_POPUP,
	}
}

// export function handleOpenConfirmPopup(id) {
// 	return {
// 		type: AT.ADMIN_OPEN_CONFIRM_POPUP,
// 		payload: id
// 	}
// }

export function deleteConfirmation(id, config = null) {
	if (config != null) {
		if (typeof config.api.delete !== 'undefined') {
			return async dispatch => {
				await dispatch({
					type: config.api.delete.typeRequest,
					payload: api.deleteItem(config, id)
				})
				dispatch(getDataRequest(config))
			}
		}
	}
	else {
		return {
			type: AT.ADMIN_DELETE_CONFIRM_POPUP
		}
	}
}
export function confirmationSuccess() {
	return {
		type: AT.ADMIN_CONFIRM_SUCCESS
	}
}

export function closeConfirmPopup() {
	return {
		type: AT.ADMIN_CLOSE_CONFIRM_POPUP,
	}
}

export function getDataRequest(config, values = null) {
	return {
		type: config.api.get.typeRequest,
		payload: api.getDataRequest(config, values),
	}
}

export function postNewRequest(config, values) {
	return async dispatch => {
		await dispatch({
			type: config.api.post.typeRequest,
			payload: api.postNewRequest(config, values),
		})
		dispatch(closePopup())
		dispatch(getDataRequest(config))
	}
}

export function postDwollaAccount(payload){
	return {
	  type: AT.ADMIN_CREATE_DWOLLA_ACCOUNT,
	  payload: api.postNewDwollaAccount(payload)
	}
}

export function putEditedDataRequest(config, id, values) {
	return async dispatch => {
		await dispatch({
			type: config.api.put.typeRequest,
			payload: api.putEditedDataRequest(config, values, id),
		})
		dispatch(closePopup())
		dispatch(getDataRequest(config))
	}
}

export function handleActiveTab(tab) {
	return {
		type: AT.ADMIN_HANDLE_ACTIVE_TAB,
		payload: { tab }
	}
}

export function handleFiltersValue(props, value) {

	return async dispatch => {
		// save filter value
		await dispatch({
			type: AT.ADMIN_HANDLE_FILTERS_VALUE,
			payload: value
		})

		switch (props.currentTab) {
			case 'CAS Products': {
				// if (value.trim().length < 3) {
				// 	await dispatch({
				// 		type: AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER,
				// 		payload: api.getCasProductByFilter(value, props.casListDataRequest)
				// 	})
				// } else {
				await dispatch({
					type: AT.ADMIN_GET_CAS_PRODUCT_BY_STRING,
					payload: api.getCasProductByString(value)
				})
				// }
			}
				break
			case 'Manufacturers': {
				await dispatch({
					type: AT.ADMIN_GET_MANUFACTURERS_BY_STRING,
					payload: api.getManufacturersByString(value)
				})
			}
			case 'Companies':
				await dispatch({
					type: AT.ADMIN_GET_COMPANIES,
					payload: api.getCompanies({
						...props.companyListDataRequest,
						filters: [{
							operator: "LIKE",
							path: "Company.name",
							values: ['%' + value + '%']
						}]
					})
				})
				break
		}
	}
}

export function getCasProductByFilter(value) {
	return {
		type: AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER,
		payload: api.getCasProductByFilter(value)
	}
}

export function getAlternativeProductNames(value) {
	return {
		type: AT.ADMIN_GET_ALTERNATIVE_CAS_PRODUCT_NAMES,
		payload: api.getAlternativeProductNames(value)
	}
}

export function getHazardClassesDataRequest() {
	return {
		type: AT.ADMIN_GET_HAZARD_CLASSES,
		payload: api.getHazardClasses()
	}
}

export function getPackagingGroupsDataRequest() {
	return {
		type: AT.ADMIN_GET_PACKAGING_GROUPS,
		payload: api.getPackagingGroups()
	}
}

export function getMeasureTypesDataRequest() {
	return {
		type: AT.ADMIN_GET_MEASURE_TYPES,
		payload: api.getMeasureTypes()
	}
}

export function getAllUnNumbersDataRequest() {
	return {
		type: AT.ADMIN_GET_UN_NUMBERS,
		payload: api.getAllUnNumbers()
	}
}

export function getUnNumbersByString(value) {
	return {
		type: AT.ADMIN_GET_UN_NUMBERS_BY_STRING,
		payload: api.getUnNumbersByString(value)
	}
}

export function postNewCasProductRequest(values, reloadFilter) {
	return async dispatch => {
		await dispatch({
			type: AT.ADMIN_POST_NEW_CAS_PRODUCT,
			payload: api.postNewCasProduct(values)
		})
		dispatch(closePopup())
		// Reload CAS Product list using filters
		dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))
	}
}

export function updateCasProductRequest(id, values, reloadFilter) {
	return async dispatch => {
		await dispatch({
			type: AT.ADMIN_UPDATE_CAS_PRODUCT,
			payload: api.updateCasProduct(id, values)
		})
		dispatch(closePopup())
		// Reload CAS Product list using filters
		dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))
	}
}

export function postNewProductName(productId, value) {
	return async dispatch => {
		await dispatch({
			type: AT.ADMIN_POST_NEW_PRODUCT_NAME,
			payload: api.postNewProductName(value)
		})
		await dispatch(getAlternativeProductNames(productId))
	}
}

export function updateProductName(productId, id, value) {
	return async dispatch => {
		await dispatch({
			type: AT.ADMIN_UPDATE_PRODUCT_NAME,
			payload: api.updateProductName(id, value)
		})
		await dispatch(getAlternativeProductNames(productId))
	}
}

export function openEditCasPopup(value) {
	const data = {
		casIndexName: value.casIndexName,
		casNumber: value.casNumber,
		chemicalName: value.chemicalName,
		hazardClasses: value.hazardClassesId,
		id: value.id,
		packagingGroup: value.packagingGroupId,
		unNumberId: value.unNumberId,
		unNumberCode: value.unNumberCode,
		unNumberDescription: value.unNumberDescription,
	}
	return async dispatch => {
		await dispatch({ // Save UN number data to global props (not needed to call get UN Numbers api)
			type: AT.ADMIN_GET_UN_NUMBERS_FULFILLED,
			payload: [{ id: data.unNumberId, unNumberCode: data.unNumberCode, unNumberDescription: data.unNumberDescription }]
		})
		dispatch(openPopup(data))
	}
}

export function openEditAltNamesCasPopup(value) {
	const data = {
		casIndexName: value.casIndexName,
		id: value.id,
	}
	return {
		type: AT.ADMIN_OPEN_EDIT_2_POPUP,
		payload: { data }
	}
}

// export function casDeleteItem(value, reloadFilter) {
// 	return async dispatch => {
// 		await dispatch({
// 			type: AT.ADMIN_DELETE_CAS_PRODUCT,
// 			payload: api.deleteCasProduct(value)
// 		})
// 		// Reload CAS Product list using filters
// 		// dispatch(handleFiltersValue(reloadFilter.props, reloadFilter.value))
// 	}
// }

export function getCountries() {
	return (dispatch, getState) => {
		const { admin } = getState()
		admin.countries.length === 0 && dispatch({
			type: AT.ADMIN_GET_COUNTRIES,
			async payload() {
				const countries = await api.getCountries()

				return { countries }
			}
		})
	}
}

export function getPrimaryBranchProvinces(id) {
	return {
		type: AT.ADMIN_GET_PRIMARY_BRANCH_PROVINCES,
		payload: api.getProvinces(id)
	}
}

export function getMailingBranchProvinces(id) {
	return {
		type: AT.ADMIN_GET_MAILING_BRANCH_PROVINCES,
		payload: api.getProvinces(id)
	}
}

export function getCompanies(params) {
	return {
		type: AT.ADMIN_GET_COMPANIES,
		payload: api.getCompanies(params)
	}
}

export function getCompany(params) {
	return {
		type: AT.ADMIN_GET_FULL_COMPANY,
		payload: api.getCompany(params)
	}
}

/*
export function getCompany(id) {
	return {
		type: AT.ADMIN_GET_COMPANY,
		payload: api.getCompany(id)
	}
}
*/


export function deleteProductName(productId, id) {
	return async dispatch => {
		await dispatch({
			type: AT.ADMIN_DELETE_PRODUCT_NAME,
			payload: api.deleteProductName(id)
		})
		await dispatch(getAlternativeProductNames(productId))
	}
}

export const deleteCompany = id => ({ type: AT.ADMIN_DELETE_COMPANIES, payload: api.deleteCompany(id) })

export function createCompany(formData) {
	return async dispatch => {
		await dispatch({
			type: AT.ADMIN_CREATE_COMPANY,
			payload: api.createCompany(formData)
		})

		dispatch(closePopup())
		dispatch(getCompanies())
	}
}

export function updateCompany(id, formData) {
	return async dispatch => {
		let response = await api.updateCompany(id, formData)
		dispatch({
			type: AT.ADMIN_UPDATE_COMPANY,
			response
		})

		dispatch(addMessage({ theme: themes.SUCCESS, content: responses.SUCCESS }))
		dispatch(updateIdentity(response))
		dispatch(closePopup())
		dispatch(getCompanies())
	}
}

export function openEditCompany(id, formData) {
	return async dispatch => {
		dispatch(openPopup(formData))
		// const data = await api.getCompany(id)
		// dispatch(openPopup(data))
	}
}

export function openRegisterDwollaAccount(data) {
	return async dispatch => {
		dispatch(getCompany(data))
		dispatch(registerDwollaAccount())
	}
}

export function registerDwollaAccount() {
	return {
		type: AT.ADMIN_OPEN_REGISTER_DWOLLA_ACCOUNT_POPUP
	}
}

export function closeRegisterDwollaAccount() {
	return {
		type: AT.ADMIN_CLOSE_REGISTER_DWOLLA_ACCOUNT_POPUP
	}
}

export function openPopup(data) {
	return {
		type: AT.ADMIN_OPEN_POPUP,
		payload: { data }
	}
}

export function closePopup() {
	return {
		type: AT.ADMIN_CLOSE_POPUP
	}
}

export const deleteCasProduct = id => ({ type: AT.ADMIN_CAS_DELETE_PRODUCT, payload: api.deleteCasProduct(id) })

export const deleteUnit = id => ({ type: AT.ADMIN_DELETE_UNIT, payload: api.deleteUnit(id) })

export const deleteUnitOfPackaging = id => ({ type: AT.ADMIN_DELETE_UNIT_OF_PACKAGING, payload: api.deleteUnitOfPackaging(id) })