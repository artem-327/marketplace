import api from './_base'

export async function login(username, password) {
  
    const {data} = await api.post('/prodex/oauth/token', `grant_type=password&username=${username}&password=${password}`, {
      headers: {'Authorization': 'Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs'}
    })

    return data
  
}

export async function getVersion() {
  const {data} = await api.get("/prodex/api/version")

  return data
}