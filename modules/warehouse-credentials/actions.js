import * as AT from './action-types'
import * as api from './api'
import moment from 'moment'
import { Datagrid } from '~/modules/datagrid'

export function approveDeaListCertificate(branchId, values) {
  return {
    type: AT.WAREHOUSE_CREDENTIALS_DEA_APPROVE,
    async payload() {
      const data = await api.approveDeaListCertificate(branchId, values)
      Datagrid && Datagrid.loadData()
      return data
    }
  }
}

export function approveTaxExemptCertificate(branchId, values) {
  const approveData = {
    taxExemptCertificateNumber: values.certificateNumber,
    taxExemptCertificateIssueDate: moment(values.issueDate).format('YYYY-MM-DD') + 'T00:00:00Z',
    taxExemptCertificateExpireDate: moment(values.expDate).format('YYYY-MM-DD') + 'T00:00:00Z'
  }
  return {
    type: AT.WAREHOUSE_CREDENTIALS_TAX_EXEMPT_APPROVE,
    async payload() {
      const data = await api.approveTaxExemptCertificate(branchId, approveData)
      Datagrid && Datagrid.loadData()
      return data
    }
  }
}

export function denyDeaListCertificate(branchId) {
  return {
    type: AT.WAREHOUSE_CREDENTIALS_DEA_DENY,
    async payload() {
      const data = await api.denyDeaListCertificate(branchId)
      Datagrid && Datagrid.loadData()
      return data
    }
  }
}

export function denyTaxExemptCertificate(branchId) {
  return {
    type: AT.WAREHOUSE_CREDENTIALS_TAX_EXEMPT_DENY,
    async payload() {
      const data = await api.denyTaxExemptCertificate(branchId)
      Datagrid && Datagrid.loadData()
      return data
    }
  }
}