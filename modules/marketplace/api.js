import api from '~/api'

export const findProducts = search => api.get(`/prodex/api/company-products/search?search=${search}`)

export const getAutocompleteData = (pattern, limit = 15) =>
  api
    .get(
      `/prodex/api/product-groups/search?limit=${limit}&pattern=${encodeURIComponent(
        pattern
      )}`
    )
    .then(response => response.data)

export const createHold = params => {
  let queryParams = generateQueryString(params)
  return api.post(`/prodex/api/holds${queryParams}`)
}

export const getCountHolds = () => api.get(`/prodex/api/holds/my/count`)

export const rejectHold = id => api.patch(`/prodex/api/holds/${id}/reject`)

export const cancelHold = id => api.patch(`/prodex/api/holds/${id}/cancel`)

export const approveHold = id => api.patch(`/prodex/api/holds/${id}/approve`)

export const toCartHold = id => api.patch(`/prodex/api/holds/${id}/to-cart`)