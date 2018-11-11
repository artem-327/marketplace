import axios from "axios";

const api = {
  fetchBroadcast: (id) => axios.get(`/api/broadcast-rules/${id}`).then(response => response.data),
  postBroadcast: (id, brcRules) => axios.post(`/api/broadcast-rules/${id}`, brcRules),
};

export default api;