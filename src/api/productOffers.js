import axios from 'axios';

const api = {
    deleteProductOffer: (id) => axios.delete(`/prodex/api/product-offers/${id}`),
    offerBroadcast: (offerId, broadcasted) => axios.patch(`/prodex/api/product-offers/${offerId}/broadcast?broadcasted=${broadcasted}`)
};

export default api;