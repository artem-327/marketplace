import api from '~/api'

export default {
    getUnitsOfMeasure: () => api.get('/prodex/api/units').then(response => response.data),


}