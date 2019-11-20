import axios from 'axios'

const api = {
  getShippingQuotes: pack =>
    axios
      .post('/prodex/api/shipment/', pack, { headers: { 'Content-Type': 'application/json' } })
      .then(response => response.data)
}

export default api
