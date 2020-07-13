import api from '~/api'
import { generateQueryString } from '~/utils/functions'

export default {
  searchCompany: (companyText, limit = 30) =>
    api
      .get(`/prodex/api/companies/client/search?limit=${limit}&pattern=${encodeURIComponent(companyText)}`)
      .then(response => response.data)
}