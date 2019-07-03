import api from '~/api'

export const getIdentity = () => api.get('/prodex/api/users/me').then(response => response.data)

export const getVersion = () => api.get('/prodex/api/version').then(response => response.data)

export const resetPasswordRequest = email => api.post(`/prodex/api/users/reset-password-request?email=${email}`)