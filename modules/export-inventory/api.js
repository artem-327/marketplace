import api from '~/api'
import { generateQueryString } from '~/utils/functions'

export default {
  searchCompany: (companyText, limit = 30) =>
    api
      .get(`/prodex/api/companies/client/search?limit=${limit}&pattern=${encodeURIComponent(companyText)}`)
      .then(response => response.data),
  exportProductOffer: (branchIds) =>
    api
      .post('/prodex/api/companies/client/product-offer-export', branchIds, { responseType: 'blob' })
}