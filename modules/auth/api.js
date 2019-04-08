import api from '~/api'

export async function getIdentity() {
  const {data} = await api.get("/prodex/api/users/me")
  return data
}

export async function getVersion() {
  const {data} = await api.get("/prodex/api/version")
  return data
}

