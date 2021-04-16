import { createSelector } from 'reselect'
//Services
import { getCompanyRequestObject } from '../../services'

const getNaicsCode = state => state?.auth?.identity?.company?.naicsCategory?.naicsId
const getPhoneNumber = state => state?.auth?.identity?.company?.phone
const getEmail = state => state?.auth?.identity?.email
const getUrl = state => state?.auth?.identity?.company?.website
const getStreetAddress = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.streetAddress
const getCity = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.city
const getCountryId = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.country?.id ?? 1
const getHasProvinces = state =>
  state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.country?.hasProvinces ?? true
const getZip = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.zip?.zip
const getProvince = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.province?.id
const getDba = state => state?.auth?.identity?.company?.dba
const getCompanyName = state => state?.auth?.identity?.company?.name
const getBussinessType = state => state?.auth?.identity?.company?.businessType?.id
const getEin = state => state?.auth?.identity?.company?.tin
const getAppInfo = state => state?.auth?.identity?.appInfo
const getCompanyId = state => state?.auth?.identity?.company?.id
const getCompany = state => state?.auth?.identity?.company

export const makeGetNaicsCode = () => createSelector([getNaicsCode], naicsId => naicsId)
export const makeGetPhoneNumber = () => createSelector([getPhoneNumber], phoneNumber => phoneNumber)
export const makeGetEmail = () => createSelector([getEmail], email => email)
export const makeGetUrl = () => createSelector([getUrl], url => url)
export const makeGetStreetAddress = () => createSelector([getStreetAddress], streetAddress => streetAddress)
export const makeGetCity = () => createSelector([getCity], city => city)
export const makeGetCountryId = () => createSelector([getCountryId], countryId => countryId)
export const makeGetHasProvinces = () => createSelector([getHasProvinces], hasProvinces => hasProvinces)
export const makeGetZip = () => createSelector([getZip], zip => zip)
export const makeGetProvince = () => createSelector([getProvince], province => province)
export const makeGetDba = () => createSelector([getDba], dba => dba)
export const makeGetCompanyName = () => createSelector([getCompanyName], name => name)
export const makeGetBussinessType = () => createSelector([getBussinessType], businessType => businessType)
export const makeGetEin = () => createSelector([getEin], ein => ein)
export const makeGetAppInfo = () => createSelector([getAppInfo], appInfo => appInfo)
export const makeGetCompanyId = () => createSelector([getCompanyId], companyId => companyId)
export const makeGetCompanyRequest = () => createSelector([getCompany], company => getCompanyRequestObject(company))
