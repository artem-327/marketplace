export const roles = {
  admin: 'admin',
  company: 'company',
  user: 'user'
}

export const getRole = accessRights => {
  if (accessRights.isAdmin) return roles.admin
  if (accessRights.isCompanyAdmin) return roles.company

  return roles.user
}