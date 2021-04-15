import { connect } from 'react-redux'
import VellociRegister from './VellociRegister'
//Actions
import * as Actions from '../actions'
import { getBusinessClassifications } from '../../settings/actions'
import { getBusinessTypes } from '../../company-form/actions'
import { updateCompany, getIdentity } from '../../auth/actions'
//components
import { initialValues } from '../constants'
//Selectors
import {
  makeGetStateVellociRegister,
  makeGetInitialValues,
  makeGetNaicsCodes,
  makeGetNaicsCodesloading
} from '../selectors'
import {
  makeGetNaicsCode,
  makeGetPhoneNumber,
  makeGetEmail,
  makeGetUrl,
  makeGetStreetAddress,
  makeGetCity,
  makeGetCountryId,
  makeGetHasProvinces,
  makeGetZip,
  makeGetProvince,
  makeGetDba,
  makeGetBussinessType,
  makeGetEin,
  makeGetAppInfo,
  makeGetCompanyRequest,
  makeGetCompanyId
} from '../../auth/selectors'
import { makeGetMainContainer } from '../../layout/selectors'

const makeMapStateToProps = () => {
  const getNaicsCode = makeGetNaicsCode()
  const getStateVellociRegister = makeGetStateVellociRegister()
  const getInitialValues = makeGetInitialValues()
  const getPhoneNumber = makeGetPhoneNumber()
  const getEmail = makeGetEmail()
  const getUrl = makeGetUrl()
  const getStreetAddress = makeGetStreetAddress()
  const getCity = makeGetCity()
  const getCountryId = makeGetCountryId()
  const getHasProvinces = makeGetHasProvinces()
  const getZip = makeGetZip()
  const getProvince = makeGetProvince()
  const getDba = makeGetDba()
  const getBussinessType = makeGetBussinessType()
  const getEin = makeGetEin()
  const getMainContainer = makeGetMainContainer()
  const getAppInfo = makeGetAppInfo()
  const getCompanyRequest = makeGetCompanyRequest()
  const getCompanyId = makeGetCompanyId()
  const getNaicsCodes = makeGetNaicsCodes()
  const getNaicsCodesloading = makeGetNaicsCodesloading()

  const mapStateToProps = (state, props) => {
    return {
      ...getStateVellociRegister(state),
      initialValues: {
        ...getInitialValues(initialValues),
        businessInfo: {
          phoneNumber: getPhoneNumber(state),
          email: getEmail(state),
          url: getUrl(state),
          address: {
            streetAddress: getStreetAddress(state),
            city: getCity(state),
            country: JSON.stringify({
              countryId: getCountryId(state),
              hasProvinces: getHasProvinces(state)
            }),
            zip: getZip(state),
            province: getProvince(state)
          },
          dba: getDba(state)
        },
        controlPerson: {
          isControlPerson: false,
          legalBusinessName: getDba(state),
          entityType: '', // getBussinessType(state), //this is not correct match for entityType from GET payments/velloci/enums/entity-types. 15.4.2021 Tomáš Drlíček knows about this and it will be fix in the future by BE developers
          industryType: '',
          isEin: true,
          isSsn: false,
          ein: getEin(state),
          ssn: '',
          isEstablishedUs: true,
          tinNumber: '',
          naicsCode: getNaicsCode(state)
        }
      },
      mainContainer: getMainContainer(state),
      appInfo: getAppInfo(state),
      naicsCode: getNaicsCode(state),
      company: getCompanyRequest(state),
      companyId: getCompanyId(state),
      naicsCodes: {
        ...getNaicsCodes(state),
        loading: getNaicsCodesloading(state)
      }
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  getBusinessClassifications,
  getBusinessTypes,
  getIdentity,
  updateCompany,
  ...Actions
}

export default connect(makeMapStateToProps, mapDispatchToProps)(VellociRegister)
