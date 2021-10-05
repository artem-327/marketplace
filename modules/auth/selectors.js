import { createSelector } from 'reselect'
//Services
import { getCompanyRequestObject } from '../../services'

const getNaicsCode = state => state?.auth?.identity?.company?.naicsCategory?.naicsId
const getPhoneNumber = state => state?.auth?.identity?.company?.phone
const getEmail = state => state?.auth?.identity?.email
const getUrl = state => state?.auth?.identity?.company?.website
const getStreetAddress = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.streetAddress
const getCity = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.city
const getCountryId = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.country?.id
const getCountryIdHomeBranch = state =>
  state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.country?.id
const getHasProvinces = state =>
  state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.country?.hasProvinces
const getZip = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.zip?.zip
const getZipHomeBranch = state => state?.auth?.identity?.homeBranch?.deliveryAddress?.address?.zip?.zip
const getProvince = state => state?.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address?.province?.id
const getDba = state => state?.auth?.identity?.company?.dba
const getCompanyName = state => state?.auth?.identity?.company?.name
const getBussinessType = state => state?.auth?.identity?.company?.businessType?.id
const getEin = state => state?.auth?.identity?.company?.tin
const getAppInfo = state => state?.auth?.identity?.appInfo
const getCompanyId = state => state?.auth?.identity?.company?.id
const getCompany = state => state?.auth?.identity?.company
const getIsMerchant = state => state?.auth?.identity?.isMerchant
const getIsCompanyAdmin = state => state?.auth?.identity?.isCompanyAdmin
const getTutorialCompleted = state => state?.auth?.identity?.tutorialCompleted
const getBuyEligible = state => state?.auth?.identity?.company?.buyEligible
const getSellEligible = state => state?.auth?.identity?.company?.sellEligible
const getSettings = state => state?.auth?.identity?.settings
const getVellociAccountStatus = state => state?.auth?.identity?.company?.vellociAccountStatus
const getReviewRequested = state => state?.auth?.identity?.company?.reviewRequested

export const makeGetNaicsCode = () => createSelector([getNaicsCode], naicsId => naicsId)
export const makeGetPhoneNumber = () => createSelector([getPhoneNumber], phoneNumber => phoneNumber)
export const makeGetEmail = () => createSelector([getEmail], email => email)
export const makeGetUrl = () => createSelector([getUrl], url => url)
export const makeGetStreetAddress = () => createSelector([getStreetAddress], streetAddress => streetAddress)
export const makeGetCity = () => createSelector([getCity], city => city)
export const makeGetCountryId = () => createSelector([getCountryId], countryId => countryId ?? 1)
export const makeGetCountryIdHomeBranch = () => createSelector([getCountryIdHomeBranch], countryId => countryId ?? 1)
export const makeGetHasProvinces = () => createSelector([getHasProvinces], hasProvinces => hasProvinces ?? true)
export const makeGetZip = () => createSelector([getZip], zip => zip)
export const makeGetZipHomeBranch = () => createSelector([getZipHomeBranch], zip => zip ?? '')
export const makeGetProvince = () => createSelector([getProvince], province => province)
export const makeGetDba = () => createSelector([getDba], dba => dba)
export const makeGetCompanyName = () => createSelector([getCompanyName], name => name)
export const makeGetBussinessType = () => createSelector([getBussinessType], businessType => businessType)
export const makeGetEin = () => createSelector([getEin], ein => ein)
export const makeGetAppInfo = () => createSelector([getAppInfo], appInfo => appInfo)
export const makeGetCompany = () => createSelector([getCompany], company => company)
export const makeGetCompanyId = () => createSelector([getCompanyId], companyId => companyId)
export const makeGetCompanyRequest = () => createSelector([getCompany], company => getCompanyRequestObject(company))
export const makeGetIsMerchant = () => createSelector([getIsMerchant], isMerchant => isMerchant ?? false)
export const makeGetIsCompanyAdmin = () =>
  createSelector([getIsCompanyAdmin], isCompanyAdmin => isCompanyAdmin ?? false)
export const makeGetTutorialCompleted = () =>
  createSelector([getTutorialCompleted], tutorialCompleted => tutorialCompleted ?? false)
export const makeGetBuyEligible = () => createSelector([getBuyEligible], buyEligible => buyEligible ?? false)
export const makeGetSellEligible = () => createSelector([getSellEligible], sellEligible => sellEligible ?? false)
export const makeGetSettings = () => createSelector([getSettings], settings => settings)
export const makeGetVellociAccountStatus = () => createSelector([getVellociAccountStatus], vellociAccountStatus => vellociAccountStatus)
export const makeGetReviewRequested = () => createSelector([getReviewRequested], reviewRequested => reviewRequested)