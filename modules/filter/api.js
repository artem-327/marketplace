import api from '~/api'

export const getAutocompleteData = searchUrl => api.get(searchUrl).then(response => response.data)
export const getSavedFilters = savedUrl => api.get(savedUrl).then((response) => response.data)
export const saveFilter = (savedUrl, filter) => api.post(savedUrl, filter).then(response => response.data)
