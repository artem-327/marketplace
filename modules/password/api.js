import api from '~/api'

export const setPassword = async values => api.patch('/prodex/api/users/reset-password', values)
