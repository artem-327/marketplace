import api from '~/api'
import axios from 'axios/index'

export default {
  getUsersMe: () => api.get('/prodex/api/users/me').then(response => response.data),
  getCurrencies: () => api.get('/prodex/api/currencies').then(response => response.data),
  updateMyProfile: data => api.patch('/prodex/api/users/me', data).then(response => response.data),
  changePassword: data => api.patch('/prodex/api/users/me/change-password', data),
  setPreferredLanguage: language =>
    api.patch(`/prodex/api/users/me/preferred-language?language=${language}`).then(() => language),
  loadFile: attachment => {
    return axios({
      baseURL: '',
      url: attachment.preview,
      method: 'GET',
      responseType: 'blob'
    }).then(r => new File([r.data], attachment.name))
  },
  saveAvatarPicture: file => {
    const formData = new FormData()
    formData.append('avatar', file)

    return api.post(
      '/prodex/api/users/avatar',
      formData,
      {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Pragma: 'no-handle-error, no-cache'
        }
      }
    )
  },
  deleteAvatarPicture: () => api.delete('/prodex/api/users/avatar')
}
