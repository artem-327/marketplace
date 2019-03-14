import api from '~/api'

export function login(username, password) {
  return api.post(
    '/prodex/oauth/token',
    `grant_type=password&username=${username}&password=${password}`,
    {
      headers: {
        'Authorization': 'Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs'
      }
    })
}

export function getIdentity() {
  return api.get("/prodex/api/users/me")
    .then(response => response.data)
    .catch(e => {
      deleteAuthToken();
      throw e;
    })
}

export function getVersion() {
  return api.get("/prodex/api/version")
}

