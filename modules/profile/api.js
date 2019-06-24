import api from '~/api'


export default {
  getUsersMe: () => api.get('/prodex/api/users/me').then(response => response.data),
  getCurrencies: () =>
    api.get('/prodex/api/currencies').then(response => response.data),
  updateMyProfile: data => api.patch(`/prodex/api/users/me?name=${data.name}&phone=${data.phone}&preferredCurrency=${data.preferredCurrency}`),
  changePassword: data => api.patch(`/prodex/api/users/me/change-password?newPassword=${data.newPassword}&oldPassword=${data.oldPassword}`),

}