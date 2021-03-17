import api from '../../api'

export function approveDeaListCertificate(branchId, values) {
  return api.patch(`/prodex/api/branches/approveDeaListCertificate/${branchId}`, values).then(response => response.data)
}

export function approveTaxExemptCertificate(branchId, values) {
  return api.patch(`/prodex/api/branches/approveTaxExemptCertificate/${branchId}`, values).then(response => response.data)
}

export function denyDeaListCertificate(branchId) {
  return api.patch(`/prodex/api/branches/denyDeaListCertificate/${branchId}`).then(response => response.data)
}

export function denyTaxExemptCertificate(branchId) {
  return api.patch(`/prodex/api/branches/denyTaxExemptCertificate/${branchId}`).then(response => response.data)
}
