import axios from "axios";

const api = {
  getBroadcast: (id) => axios.get(`/prodex/api/broadcast-rules/${id}`).then(response => response.data),
  postBroadcast: (id, brcRules) => axios.post(`/prodex/api/broadcast-rules/${id}`, brcRules),
};

export default api;