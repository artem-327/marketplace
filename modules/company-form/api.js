import * as AT from './action-types'
import api from '~/api'

export const getBusinessTypes = () => api.get('/prodex/api/business-types').then(response => response.data)