import * as AT from './action-types'
import * as api from './api'

export function openEditPopup(config, editedData) {
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

export function deleteItem(config, id) {
	if (typeof config.api.delete !== 'undefined') {
		return {
			type: config.api.delete.typeRequest,
			payload: id
		}
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

export function closeConfirmPopup() {
	return {
		type: AT.ADMIN_CLOSE_CONFIRM_POPUP,
	}
}

export function getDataRequest(api, values = null) {
	return {
		type: api.get.typeRequest,
		payload: values
	}
}

export function postNewRequest(config, values) {
	return {
		type: config.api.post.typeRequest,
		payload: values
	}
}

export function putEditedDataRequest(config, id, values) {
	return {
		type: config.api.put.typeRequest,
		payload: { values, id }
	}
}

export function handleActiveTab(tab) {
	return {
		type: AT.ADMIN_HANDLE_ACTIVE_TAB,
		payload: { tab }
	}
}

export function handleFiltersValue(props, value) {
	switch (props.currentTab) {
		case 'CAS Products': {
			if (value.length < 3) {
				return {
					type: AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER,
					payload: api.getCasProductByFilter(props.casListDataRequest)
				}
			}
			else {
				return {
					type: AT.ADMIN_GET_CAS_PRODUCT_BY_STRING,
					payload: api.getCasProductByString(value)
				}
			}
		}
		default:
			return {
				type: AT.ADMIN_HANDLE_FILTERS_VALUE,
				payload: value
			}
	}
}



export function getCasProductByFilter(value) {
	return {
		type: AT.ADMIN_GET_CAS_PRODUCT_BY_FILTER,
		payload: api.getCasProductByFilter(value)
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

export function getUnNumbersDataRequest() {
	return {
		type: AT.ADMIN_GET_UN_NUMBERS,
		payload: api.getUnNumbers()
	}
}

export function openEditCasPopup(value) {
	return {
		type: null,
		payload: null
	}
}

export function casDeleteItem(value) {
	return {
		type: null,
		payload: null
	}
}

export function getCountries() {
	return (dispatch, getState) => {
		const {admin} = getState()
		admin.countries.length === 0 && dispatch({
			type: AT.ADMIN_GET_COUNTRIES,
			async payload() {
				 const countries = await api.getCountries()
				 const zipCodes = await api.getZipCodes()
				 
				 return {
					 countries,
					 zipCodes
				 }
			}
		})
	}
}

export function getCompanies() {
	return {
		type: AT.ADMIN_GET_COMPANIES,
		payload: api.getCompanies()
	}
}

export function getCompany(id) {
	return {
		type: AT.ADMIN_GET_COMPANY,
		payload: api.getCompany(id)
	}
}

export function deleteCompany(id) {
	return async dispatch => {
		await dispatch({
			type: AT.ADMIN_DELETE_COMPANIES,
			payload: api.deleteCompany(id)
		})

		dispatch(getCompanies())
	}
}

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
		await dispatch({
			type: AT.ADMIN_UPDATE_COMPANY,
			payload: api.updateCompany(id, formData)
		})

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

export function openPopup(data) {
	return {
		type: AT.ADMIN_OPEN_POPUP,
		payload: {data}
	}
}

export function closePopup() {
	return {
		type: AT.ADMIN_CLOSE_POPUP
	}
}