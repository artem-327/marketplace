import React, { Component } from 'react'

import moment from 'moment'
import { removeEmpty } from '~/utils/functions'
import { verifyEchoProduct } from '~/modules/admin/api' // No need to be an action
import { DateInput } from '~/components/custom-formik'
import { PhoneNumber } from '~/modules/phoneNumber'
import * as Yup from 'yup'

import { FormattedMessage, injectIntl } from 'react-intl'

import {
  Form,
  Button,
  Dropdown as FormikDropdown,
  Input,
  Checkbox,
  TextArea
} from 'formik-semantic-ui-fixed-validation'
import {
  Menu,
  Grid,
  GridRow,
  GridColumn,
  Segment,
  Header,
  Dropdown,
  Icon,
  Dimmer,
  Loader,
  Sidebar
} from 'semantic-ui-react'
import TextareaAutosize from 'react-autosize-textarea'
import { FieldArray, Field } from 'formik'

import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import { errorMessages, dateValidation } from '~/constants/yupValidation'
import { getSafe } from '~/utils/functions'
import { tabs, defaultValues, transportationTypes, onErrorFieldTabs } from './constants'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { uniqueArrayByKey } from '~/utils/functions'
import escapeRegExp from 'lodash/escapeRegExp'
import confirm from '~/src/components/Confirmable/confirm'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { Required, Or } from '~/components/constants/layout'
import { AttachmentManager } from '~/modules/attachments'
import { UploadCloud } from 'react-feather'
import ErrorFocus from '~/components/error-focus'

export const MyContainer = styled.div`
  margin: 0 15px 0 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0 15px 0;
  font-weight: bold;
  font-size: 1.1rem;
`

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #fbfbfb;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
`

export const FlexTabs = styled.div`
  height: 100%;
  margin: 0;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0 15px 0;
  font-weight: 400;
  font-size: 1.1rem;

  > .tab-menu,
  > .tab-menu > .tab {
    height: 100%;
  }
`

export const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

export const GraySegment = styled(Segment)`
  background-color: #ededed !important;
`

export const HighSegment = styled(Segment)`
  height: 100%;
`

const CustomTextarea = styled(TextareaAutosize)`
  resize: vertical !important;
`

const CustomGridColumn = styled(GridColumn)`
  #__next & {
    align-self: flex-start !important;
  }
`

const TabsWrapper = styled.div`
  overflow: hidden; // fix for space at the end of flex column
`

const GridColumnBtn = styled(GridColumn)`
  padding-top: 0 !important;
  padding-bottom: 0 !important;
`

const DivIcon = styled.div`
  margin-top: 8px;
`

Yup.addMethod(Yup.object, 'uniqueProperty', function (propertyName, message) {
  return this.test('unique', message, function (value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const currentIndex = options.indexOf(value)

    const subOptions = options.slice(0, currentIndex)

    if (subOptions.some(option => option[propertyName] === value[propertyName])) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message
      })
    }

    return true
  })
})

const validationScheme = Yup.object().shape({
  code: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.minLength(2)),
  name: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.minLength(2)),
  productGroup: Yup.number().required(errorMessages.minOneGroup),
  company: Yup.number().required(errorMessages.minOneCompany),
  elements: Yup.array().of(
    Yup.object()
      .uniqueProperty(
        'casProduct',
        errorMessages.unique(
          <FormattedMessage id='admin.casProductUnique' name='CAS Product has to be unique'>
            {text => text}
          </FormattedMessage>
        )
      )
      .shape({
        name: Yup.string()
          .trim()
          .test('requiredIfProprietary', errorMessages.requiredMessage, function (value) {
            const { proprietary } = this.parent
            if (proprietary) {
              return value !== null && value !== ''
            }
            return true
          }),
        casProduct: Yup.string()
          .nullable()
          .trim()
          .test('requiredIfNotProprietary', errorMessages.requiredMessage, function (value) {
            const { proprietary } = this.parent
            if (!proprietary) {
              return parseInt(value)
            }
            return true
          }),
        assayMin: Yup.string()
          .test('v', errorMessages.minUpToMax, function (v) {
            const { assayMax: v2 } = this.parent
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            if (v2 === null || v2 === '' || isNaN(v2)) return true // No max limit value - can not be tested
            return Number(v) <= v2
          })
          .test('v', errorMessages.minimum(0), function (v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) >= 0
          })
          .test('v', errorMessages.maximum(100), function (v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) <= 100
          })
          .test('v', errorMessages.mustBeNumber, function (v) {
            return v === null || v === '' || !isNaN(v)
          }),
        assayMax: Yup.string()
          .test('v', errorMessages.maxAtLeastMin, function (v) {
            const { assayMin: v2 } = this.parent
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            if (v2 === null || v2 === '' || isNaN(v2)) return true // No min limit value - can not be tested
            return Number(v) >= v2
          })
          .test('v', errorMessages.minimum(0), function (v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) >= 0
          })
          .test('v', errorMessages.maximum(100), function (v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) <= 100
          })
          .test('v', errorMessages.mustBeNumber, function (v) {
            return v === null || v === '' || !isNaN(v)
          })
      })
  )
})

class AddEditEchoProduct extends React.Component {
  state = {
    isLoading: false,
    casProduct: '',
    changedForm: false,
    transportationType: transportationTypes[0].value,
    codesList: [],
    changedAttachments: false,
    unNumberInitOptions: [],
    popupValues: null,
    editTab: 0,
    selectedProductGroupsOptions: [],
    selectedCompanyOptions: []
  }

  componentDidMount() {
    const {
      hazardClasses,
      packagingGroups,
      getHazardClassesDataRequest,
      getPackagingGroupsDataRequest,
      listDocumentTypes,
      getDocumentTypes
    } = this.props

    if (hazardClasses.length === 0) getHazardClassesDataRequest()
    if (packagingGroups.length === 0) getPackagingGroupsDataRequest()
    if (!listDocumentTypes || (listDocumentTypes && !listDocumentTypes.length)) getDocumentTypes()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.visible) {
      if (!prevProps.visible) {
        if (this.props.addForm) {
          // Sidebar just opened - Add
          this.setInitialState(null, { editTab: 0 })
          this.resetForm()
        } else {
          // Sidebar just opened - Edit
          this.props.loadEditEchoProduct(this.props.popupValues.id, this.props.editTab, true)
        }
        return
      }

      const { popupValues, editTab } = this.props

      if (prevProps.editForm && !prevProps.addForm && this.props.addForm) {
        // Changed from Edit to Add form
        this.validateSaveOrSwitchToErrors(() => {
          this.setInitialState(null, { codesList: [], changedForm: false, editTab: 0 })
          this.resetForm()
        })
        return
      }

      if (prevProps.addForm && !prevProps.editForm && this.props.editForm) {
        // Changed from Add to Edit form
        this.validateSaveOrSwitchToErrors(() => {
          this.props.loadEditEchoProduct(popupValues.id, editTab, true)
        })
        return
      }

      if (prevProps.editForm && this.props.editForm && prevProps.editInitTrig !== this.props.editInitTrig) {
        // Changed edit product
        this.validateSaveOrSwitchToErrors(() => {
          this.props.loadEditEchoProduct(popupValues.id, editTab, false)
        })
        return
      }

      if (
        this.props.editForm &&
        this.props.popupValues &&
        ((prevProps.popupValues && prevProps.popupValues !== this.props.popupValues) || prevProps.popupValues === null)
      ) {
        this.props.searchManufacturers(
          getSafe(() => this.props.popupValues.manufacturer.name, ''),
          200
        )
        this.setInitialState(this.props.popupValues, { editTab: this.props.editTab })
        this.resetForm()
      }
    }
  }

  setInitialState = (popupValues, additionalStates) => {
    let codesList = [],
      unNumberInitOptions = [],
      selectedProductGroupsOptions = [],
      selectedCompanyOptions = []

    if (popupValues) {
      codesList = popupValues.mfrProductCodes.map(code => ({
        text: code,
        value: code
      }))

      if (popupValues.dotUnNumber) unNumberInitOptions.push(popupValues.dotUnNumber)
      if (popupValues.iataUnNumber) unNumberInitOptions.push(popupValues.iataUnNumber)
      if (popupValues.imdgImoUnNumber) unNumberInitOptions.push(popupValues.imdgImoUnNumber)
      if (popupValues.tdgUnNumber) unNumberInitOptions.push(popupValues.tdgUnNumber)
      unNumberInitOptions = unNumberInitOptions.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
      unNumberInitOptions = unNumberInitOptions.map(d => {
        return {
          key: d.id,
          text: d.unNumberCode,
          value: d.id,
          content: <Header content={d.unNumberCode} subheader={d.description} style={{ fontSize: '1em' }} />
        }
      })

      if (popupValues.productGroup) {
        selectedProductGroupsOptions = popupValues.productGroup
      }
    }
    if (popupValues && popupValues.company) {
      selectedCompanyOptions = popupValues.company
    }
    this.setState({
      codesList,
      changedForm: false,
      changedAttachments: false,
      popupValues,
      unNumberInitOptions: unNumberInitOptions,
      selectedProductGroupsOptions,
      selectedCompanyOptions,
      ...additionalStates
    })
  }

  getInitialFormValues = () => {
    const { popupValues } = this.state
    let initialValues = {
      ...defaultValues,
      ...(popupValues
        ? {
            attachments: popupValues.attachments,
            appearance: getSafe(() => popupValues.appearance, ''),
            aspirationHazard: getSafe(() => popupValues.aspirationHazard, ''),
            autoIgnitionTemperature: getSafe(() => popupValues.autoIgnitionTemperature, ''),
            boilingPointRange: getSafe(() => popupValues.boilingPointRange, ''),
            code: getSafe(() => popupValues.code, ''),
            conditionsToAvoid: getSafe(() => popupValues.conditionsToAvoid, ''),
            decompositionTemperature: getSafe(() => popupValues.decompositionTemperature, ''),
            developmentalEffects: getSafe(() => popupValues.developmentalEffects, ''),
            dotHazardClass: getSafe(() => popupValues.dotHazardClass.id, null),
            dotMarinePollutant: getSafe(() => popupValues.dotMarinePollutant, ''),
            dotPackagingGroup: getSafe(() => popupValues.dotPackagingGroup.id, null),
            dotProperShippingName: getSafe(() => popupValues.dotProperShippingName, ''),
            dotProperTechnicalName: getSafe(() => popupValues.dotProperTechnicalName, ''),
            dotReportableQuantity: getSafe(() => popupValues.dotReportableQuantity, ''),
            dotSevereMarinePollutant: getSafe(() => popupValues.dotSevereMarinePollutant, ''),
            dotEnvironmentalHazards: getSafe(() => popupValues.dotEnvironmentalHazards, ''),
            dotEmsNumbers: getSafe(() => popupValues.dotEmsNumbers, ''),
            dotExceptions: getSafe(() => popupValues.dotExceptions, ''),
            dotUserSpecialPrecautions: getSafe(() => popupValues.dotUserSpecialPrecautions, ''),
            dotPackagingExceptions: getSafe(() => popupValues.dotPackagingExceptions, ''),
            dotPackagingNonBulk: getSafe(() => popupValues.dotPackagingNonBulk, ''),
            dotPackagingBulk: getSafe(() => popupValues.dotPackagingBulk, ''),
            dotQuantityLimitations: getSafe(() => popupValues.dotQuantityLimitations, ''),
            dotPassengerQuantityLimitations: getSafe(() => popupValues.dotPassengerQuantityLimitations, ''),
            dotCargoAircraftQuantityLimitations: getSafe(() => popupValues.dotCargoAircraftQuantityLimitations, ''),
            dotVesselStowageLocation: getSafe(() => popupValues.dotVesselStowageLocation, ''),
            dotVesselStowageOther: getSafe(() => popupValues.dotVesselStowageOther, ''),
            dotUnNumber: getSafe(() => popupValues.dotUnNumber.id, null),
            elements: getSafe(
              () =>
                popupValues.elements.map(element => ({
                  name: getSafe(() => element.name, ''),
                  casProduct: getSafe(() => element.casProduct.id, null),
                  assayMin: getSafe(() => element.assayMin, ''),
                  assayMax: getSafe(() => element.assayMax, ''),
                  proprietary: getSafe(() => element.proprietary, false)
                })),
              [{ name: '', casProduct: '', assayMin: '', assayMax: '', proprietary: false }]
            ),
            emergencyPhone: getSafe(() => popupValues.emergencyPhone, ''),
            endocrineDisruptorInformation: getSafe(() => popupValues.endocrineDisruptorInformation, ''),
            evaporationPoint: getSafe(() => popupValues.evaporationPoint, ''),
            eyeContact: getSafe(() => popupValues.eyeContact, ''),
            flammabilityOrExplosiveLower: getSafe(() => popupValues.flammabilityOrExplosiveLower, ''),
            flammabilityOrExplosiveUpper: getSafe(() => popupValues.flammabilityOrExplosiveUpper, ''),
            flammabilitySolidGas: getSafe(() => popupValues.flammabilitySolidGas, ''),
            flashPoint: getSafe(() => popupValues.flashPoint, ''),
            generalAdvice: getSafe(() => popupValues.generalAdvice, ''),
            hazardousDecompositionProducts: getSafe(() => popupValues.hazardousDecompositionProducts, ''),
            hazardousPolymerization: getSafe(() => popupValues.hazardousPolymerization, ''),
            hazardousReactions: getSafe(() => popupValues.hazardousReactions, ''),
            hazardStatement: getSafe(() => popupValues.hazardStatement, ''),
            hmisFlammability: getSafe(() => popupValues.hmisFlammability, ''),
            hmisHealthHazard: getSafe(() => popupValues.hmisHealthHazard, ''),
            hmisChronicHealthHazard: getSafe(() => popupValues.hmisChronicHealthHazard, ''),
            hmisPhysicalHazard: getSafe(() => popupValues.hmisPhysicalHazard, ''),
            hnoc: getSafe(() => popupValues.hnoc, ''),
            iataHazardClass: getSafe(() => popupValues.iataHazardClass.id, null),
            iataPackagingGroup: getSafe(() => popupValues.iataPackagingGroup.id, null),
            iataProperShippingName: getSafe(() => popupValues.iataProperShippingName, ''),
            iataProperTechnicalName: getSafe(() => popupValues.iataProperTechnicalName, ''),
            iataUnNumber: getSafe(() => popupValues.iataUnNumber.id, null),
            iataReportableQuantities: getSafe(() => popupValues.iataReportableQuantities, ''),
            iataEnvironmentalHazards: getSafe(() => popupValues.iataEnvironmentalHazards, ''),
            iataEmsNumbers: getSafe(() => popupValues.iataEmsNumbers, ''),
            iataExceptions: getSafe(() => popupValues.iataExceptions, ''),
            iataUserSpecialPrecautions: getSafe(() => popupValues.iataUserSpecialPrecautions, ''),
            iataMarinePollutant: getSafe(() => popupValues.iataMarinePollutant, ''),
            iataSevereMarinePollutant: getSafe(() => popupValues.iataSevereMarinePollutant, ''),
            iataPackagingExceptions: getSafe(() => popupValues.iataPackagingExceptions, ''),
            iataPackagingNonBulk: getSafe(() => popupValues.iataPackagingNonBulk, ''),
            iataPackagingBulk: getSafe(() => popupValues.iataPackagingBulk, ''),
            iataPassengerQuantityLimitations: getSafe(() => popupValues.iataPassengerQuantityLimitations, ''),
            iataCargoAircraftQuantityLimitations: getSafe(() => popupValues.iataCargoAircraftQuantityLimitations, ''),
            iataVesselStowageLocation: getSafe(() => popupValues.iataVesselStowageLocation, ''),
            iataVesselStowageOther: getSafe(() => popupValues.iataVesselStowageOther, ''),
            imdgImoHazardClass: getSafe(() => popupValues.imdgImoHazardClass.id, null),
            imdgImoPackagingGroup: getSafe(() => popupValues.imdgImoPackagingGroup.id, null),
            imdgImoProperShippingName: getSafe(() => popupValues.imdgImoProperShippingName, ''),
            imdgImoProperTechnicalName: getSafe(() => popupValues.imdgImoProperTechnicalName, ''),
            imdgImoUnNumber: getSafe(() => popupValues.imdgImoUnNumber.id, null),
            imdgImoReportableQuantities: getSafe(() => popupValues.imdgImoReportableQuantities, ''),
            imdgImoEnvironmentalHazards: getSafe(() => popupValues.imdgImoEnvironmentalHazards, ''),
            imdgImoEmsNumbers: getSafe(() => popupValues.imdgImoEmsNumbers, ''),
            imdgImoExceptions: getSafe(() => popupValues.imdgImoExceptions, ''),
            imdgImoUserSpecialPrecautions: getSafe(() => popupValues.imdgImoUserSpecialPrecautions, ''),
            imdgImoMarinePollutant: getSafe(() => popupValues.imdgImoMarinePollutant, ''),
            imdgImoSevereMarinePollutant: getSafe(() => popupValues.imdgImoSevereMarinePollutant, ''),
            imdgImoPackagingExceptions: getSafe(() => popupValues.imdgImoPackagingExceptions, ''),
            imdgImoPackagingNonBulk: getSafe(() => popupValues.imdgImoPackagingNonBulk, ''),
            imdgImoPackagingBulk: getSafe(() => popupValues.imdgImoPackagingBulk, ''),
            imdgImoPassengerQuantityLimitations: getSafe(() => popupValues.imdgImoPassengerQuantityLimitations, ''),
            imdgImoCargoAircraftQuantityLimitations: getSafe(
              () => popupValues.imdgImoCargoAircraftQuantityLimitations,
              ''
            ),
            imdgImoVesselStowageLocation: getSafe(() => popupValues.imdgImoVesselStowageLocation, ''),
            imdgImoVesselStowageOther: getSafe(() => popupValues.imdgImoVesselStowageOther, ''),
            incompatibleMaterials: getSafe(() => popupValues.incompatibleMaterials, ''),
            ingestion: getSafe(() => popupValues.ingestion, ''),
            inhalation: getSafe(() => popupValues.inhalation, ''),
            irritation: getSafe(() => popupValues.irritation, ''),
            labelElements: getSafe(() => popupValues.labelElements, ''),
            manufacturer: getSafe(() => popupValues.manufacturer.id, ''),
            meltingPointRange: getSafe(() => popupValues.meltingPointRange, ''),
            mexicoGrade: getSafe(() => popupValues.mexicoGrade, ''),
            mfrProductCodes: getSafe(() => popupValues.mfrProductCodes, []),
            molecularFormula: getSafe(() => popupValues.molecularFormula, ''),
            molecularWeight: getSafe(() => popupValues.molecularWeight, ''),
            mostImportantSymptomsAndEffects: getSafe(() => popupValues.mostImportantSymptomsAndEffects, ''),
            mutagenicEffects: getSafe(() => popupValues.mutagenicEffects, ''),
            name: getSafe(() => popupValues.name, ''),
            nfpaFireHazard: getSafe(() => popupValues.nfpaFireHazard, ''),
            nfpaHealthHazard: getSafe(() => popupValues.nfpaHealthHazard, ''),
            nfpaReactivityHazard: getSafe(() => popupValues.nfpaReactivityHazard, ''),
            nfpaSpecialHazard: getSafe(() => popupValues.nfpaSpecialHazard, ''),
            notesToPhysician: getSafe(() => popupValues.notesToPhysician, ''),
            odor: getSafe(() => popupValues.odor, ''),
            odorThreshold: getSafe(() => popupValues.odorThreshold, ''),
            oshaDefinedHazards: getSafe(() => popupValues.oshaDefinedHazards, ''),
            otherAdverseEffects: getSafe(() => popupValues.otherAdverseEffects, ''),
            partitionCoefficient: getSafe(() => popupValues.partitionCoefficient, ''),
            ph: getSafe(() => popupValues.ph, ''),
            physicalState: getSafe(() => popupValues.physicalState, ''),
            precautionaryStatements: getSafe(() => popupValues.precautionaryStatements, ''),
            productLc50Inhalation: getSafe(() => popupValues.productLc50Inhalation, ''),
            productLd50Dermal: getSafe(() => popupValues.productLd50Dermal, ''),
            productLd50Oral: getSafe(() => popupValues.productLd50Oral, ''),
            reactiveHazard: getSafe(() => popupValues.reactiveHazard, ''),
            recommendedUse: getSafe(() => popupValues.recommendedUse, ''),
            reproductiveEffects: getSafe(() => popupValues.reproductiveEffects, ''),
            sdsIssuedDate: getSafe(() => popupValues.sdsIssuedDate, ''),
            sdsPreparedBy: getSafe(() => popupValues.sdsPreparedBy, ''),
            sdsRevisionDate: getSafe(() => popupValues.sdsRevisionDate, ''),
            sdsVersionNumber: getSafe(() => popupValues.sdsVersionNumber, ''),
            sensitization: getSafe(() => popupValues.sensitization, ''),
            signalWord: getSafe(() => popupValues.signalWord, ''),
            skinContact: getSafe(() => popupValues.skinContact, ''),
            solubility: getSafe(() => popupValues.solubility, ''),
            specificGravity: getSafe(() => popupValues.specificGravity, ''),
            stability: getSafe(() => popupValues.stability, ''),
            stotRepeatedExposure: getSafe(() => popupValues.stotRepeatedExposure, ''),
            stotSingleExposure: getSafe(() => popupValues.stotSingleExposure, ''),
            supplementalInformation: getSafe(() => popupValues.supplementalInformation, ''),
            symptomsEffects: getSafe(() => popupValues.symptomsEffects, ''),
            tdgHazardClass: getSafe(() => popupValues.tdgHazardClass.id, null),
            tdgPackagingGroup: getSafe(() => popupValues.tdgPackagingGroup.id, null),
            tdgProperShippingName: getSafe(() => popupValues.tdgProperShippingName, ''),
            tdgProperTechnicalName: getSafe(() => popupValues.tdgProperTechnicalName, ''),
            tdgReportableQuantities: getSafe(() => popupValues.tdgReportableQuantities, ''),
            tdgEnvironmentalHazards: getSafe(() => popupValues.tdgEnvironmentalHazards, ''),
            tdgEmsNumbers: getSafe(() => popupValues.tdgEmsNumbers, ''),
            tdgExceptions: getSafe(() => popupValues.tdgExceptions, ''),
            tdgUserSpecialPrecautions: getSafe(() => popupValues.tdgUserSpecialPrecautions, ''),
            tdgMarinePollutant: getSafe(() => popupValues.tdgMarinePollutant, ''),
            tdgSevereMarinePollutant: getSafe(() => popupValues.tdgSevereMarinePollutant, ''),
            tdgPackagingExceptions: getSafe(() => popupValues.tdgPackagingExceptions, ''),
            tdgPackagingNonBulk: getSafe(() => popupValues.tdgPackagingNonBulk, ''),
            tdgPackagingBulk: getSafe(() => popupValues.tdgPackagingBulk, ''),
            tdgPassengerQuantityLimitations: getSafe(() => popupValues.tdgPassengerQuantityLimitations, ''),
            tdgCargoAircraftQuantityLimitations: getSafe(() => popupValues.tdgCargoAircraftQuantityLimitations, ''),
            tdgVesselStowageLocation: getSafe(() => popupValues.tdgVesselStowageLocation, ''),
            tdgVesselStowageOther: getSafe(() => popupValues.tdgVesselStowageOther, ''),
            tdgUnNumber: getSafe(() => popupValues.tdgUnNumber.id, null),
            tdsIssuedDate: getSafe(() => popupValues.tdsIssuedDate, ''),
            tdsPreparedBy: getSafe(() => popupValues.tdsPreparedBy, ''),
            tdsRevisionDate: getSafe(() => popupValues.tdsRevisionDate, ''),
            tdsVersionNumber: getSafe(() => popupValues.tdsVersionNumber, ''),
            teratogenicity: getSafe(() => popupValues.teratogenicity, ''),
            usesAdvisedAgainst: getSafe(() => popupValues.usesAdvisedAgainst, ''),
            vaporDensity: getSafe(() => popupValues.vaporDensity, ''),
            vaporPressure: getSafe(() => popupValues.vaporPressure, ''),
            viscosity: getSafe(() => popupValues.viscosity, ''),
            wasteDisposalMethods: getSafe(() => popupValues.wasteDisposalMethods, ''),
            isPublished: getSafe(() => popupValues.isPublished, false),
            productGroup: getSafe(() => popupValues.productGroup.id, ''),
            company: getSafe(() => popupValues.company.id, ''),
            optionalRecommendedRestrictions: getSafe(() => popupValues.optionalRecommendedRestrictions, ''),
            optionalSynonyms: getSafe(() => popupValues.optionalSynonyms, ''),
            optionalSchedule: getSafe(() => popupValues.optionalSchedule, ''),
            optionalSpecificVolume: getSafe(() => popupValues.optionalSpecificVolume, ''),
            optionalCriticalTemperature: getSafe(() => popupValues.optionalCriticalTemperature, ''),
            optionalGasDensity: getSafe(() => popupValues.optionalGasDensity, ''),
            optionalRelativeDensity: getSafe(() => popupValues.optionalRelativeDensity, ''),
            optionalFlowTime: getSafe(() => popupValues.optionalFlowTime, ''),
            optionalHeatOfCombustion: getSafe(() => popupValues.optionalHeatOfCombustion, '')
          }
        : null)
    }

    if (initialValues.sdsIssuedDate)
      initialValues.sdsIssuedDate = this.getDateInLocaleFormat(initialValues.sdsIssuedDate)
    if (initialValues.sdsRevisionDate)
      initialValues.sdsRevisionDate = this.getDateInLocaleFormat(initialValues.sdsRevisionDate)
    if (initialValues.tdsIssuedDate)
      initialValues.tdsIssuedDate = this.getDateInLocaleFormat(initialValues.tdsIssuedDate)
    if (initialValues.tdsRevisionDate)
      initialValues.tdsRevisionDate = this.getDateInLocaleFormat(initialValues.tdsRevisionDate)

    if (initialValues.elements.length === 0) {
      initialValues.elements = [{ name: '', casProduct: null, assayMin: '', assayMax: '', proprietary: false }]
    }
    return initialValues
  }

  tabChanged = index => {
    this.setState({ editTab: index })
  }

  getDateInLocaleFormat = value => {
    let date = moment(value)
    if (date.isValid()) {
      return date.format(getLocaleDateFormat())
    } else {
      return ''
    }
  }

  handleUnNumberSearchChange = debounce((_, { searchQuery }) => {
    this.props.getUnNumbersByString(searchQuery)
  }, 250)

  handleUnNumberChange = (value, options) => {
    if (value === undefined || value === '') return
    let stateOptions = this.state.unNumberInitOptions

    if (stateOptions.findIndex(t => t.key === value) < 0) {
      // value not found in state options
      let newOption = options.find(t => t.key === value) // new value from unNumbersFiltered
      if (newOption) {
        stateOptions.push(newOption)
        this.setState({ unNumberInitOptions: stateOptions })
      }
    }
  }

  handleProductGroupsSearchChange = debounce((_, { searchQuery }) => {
    this.props.searchProductGroups(searchQuery)
  }, 250)

  handleCompanySearchChange = debounce((_, { searchQuery }) => {
    this.props.searchCompany(searchQuery)
  }, 250)

  handleProductGroupsChange = (value, options) => {
    const newOptions = options.filter(el => value === el.value)
    this.setState({ selectedProductGroupsOptions: newOptions })
  }

  handleCompanyChange = (value, options) => {
    const newOptions = options.filter(el => value === el.value)
    this.setState({ selectedCompanyOptions: newOptions })
  }

  switchToErrors = err => {
    const errorTab = onErrorFieldTabs[err[0]]
    this.tabChanged(errorTab !== undefined ? errorTab : 0)
  }

  handleSearchChange = debounce((e, { searchQuery, dataindex }) => {
    this.setState({ isLoading: true, casProduct: searchQuery })

    this.props.searchCasProduct(searchQuery, dataindex)

    setTimeout(() => {
      const re = new RegExp(escapeRegExp(this.state.casProduct), 'i')
      const isMatch = result => re.test(result.casProduct)

      this.setState({
        isLoading: false
      })
    }, 250)
  }, 500)

  validateSaveOrSwitchToErrors = async callback => {
    const { touched, validateForm, submitForm, values, setSubmitting } = this.formikProps

    if (Object.keys(touched).length || this.state.changedForm) {
      // Form edited and not saved yet
      validateForm().then(err => {
        const errors = Object.keys(err)
        if (errors.length && errors[0] !== 'isCanceled') {
          // Edited, Errors found
          submitForm() // to show errors
          this.switchToErrors(Object.keys(err))
          return
        } else {
          // Edited, Errors not found, try to save
          confirm(
            <FormattedMessage id='confirm.global.unsavedChanges.header' defaultMessage='Unsaved changes' />,
            <FormattedMessage
              id='confirm.global.unsavedChanges.content'
              defaultMessage='You have unsaved changes. Do you wish to save them?'
            />
          )
            .then(
              async () => {
                // Confirm
                if (await this.submitForm(values, setSubmitting)) callback()
              },
              () => {
                // Cancel
                callback()
              }
            )
            .catch(() => {})
          return
        }
      })
    } else {
      // Form not modified
      callback()
    }
  }

  getDateInIsoFormat = value => {
    if (!value) return ''
    let date = getStringISODate(value)

    if (moment(date).isValid()) {
      return date
    } else {
      return ''
    }
  }

  submitForm = async (values, setSubmitting) => {
    const {
      putCompanyGenericProducts,
      postCompanyGenericProducts,
      closePopup,
      linkAttachment,
      listDocumentTypes,
      datagrid
    } = this.props

    const { popupValues } = this.state
    let sendSuccess = false

    let formValues = {
      ...values,
      elements: values.elements.map(e =>
        e.proprietary
          ? {
              name: e.name,
              assayMin: e.assayMin === null || e.assayMin === '' ? null : Number(e.assayMin),
              assayMax: e.assayMax === null || e.assayMax === '' ? null : Number(e.assayMax)
            }
          : {
              casProduct: e.casProduct,
              assayMin: e.assayMin === null || e.assayMin === '' ? null : Number(e.assayMin),
              assayMax: e.assayMax === null || e.assayMax === '' ? null : Number(e.assayMax)
            }
      ),
      sdsIssuedDate: this.getDateInIsoFormat(values.sdsIssuedDate),
      sdsRevisionDate: this.getDateInIsoFormat(values.sdsRevisionDate),
      tdsIssuedDate: this.getDateInIsoFormat(values.tdsIssuedDate),
      tdsRevisionDate: this.getDateInIsoFormat(values.tdsRevisionDate)
    }
    delete formValues.attachments

    removeEmpty(formValues)

    try {
      if (popupValues) var { value } = await putCompanyGenericProducts(popupValues.id, formValues)
      else var { value } = await postCompanyGenericProducts(formValues)

      const notLinkedAttachments = values.attachments.filter(att => !getSafe(() => att.linked, false))
      await linkAttachment(false, value.id, notLinkedAttachments)

      const docType = listDocumentTypes.find(dt => dt.id === 3)
      notLinkedAttachments.map(att => {
        return {
          id: att.id,
          name: att.name,
          documentType: docType,
          linked: true
        }
      })
      // No need to await; just fire it
      verifyEchoProduct(value.id)

      if (popupValues) {
        datagrid.updateRow(value.id, () => ({
          ...value,
          attachments: value.attachments.concat(notLinkedAttachments)
        }))
      } else {
        datagrid.loadData()
      }

      setSubmitting(false)
      sendSuccess = true
    } catch (err) {
      setSubmitting(false)
    }
    return sendSuccess
  }

  RowInput = ({ name, readOnly = false, id, defaultMessage, required }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} /> {required === true ? <Required /> : null}
      </GridColumn>

      <GridColumn width={10}>
        <Input inputProps={{ readOnly: readOnly, id: name }} name={name} />
      </GridColumn>
    </GridRow>
  )

  RowTextArea = ({ name, readOnly = false, id, defaultMessage }, formikProps) => (
    <GridRow>
      <CustomGridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </CustomGridColumn>
      <GridColumn width={10}>
        <CustomTextarea
          defaultValue={formikProps && formikProps.initialValues && formikProps.initialValues[name]}
          rows={2}
          name={name}
          id={name}
          onChange={e => {
            formikProps.setFieldValue(name, e.target.value)
            this.setState({ changedForm: true })
          }}
        />
      </GridColumn>
    </GridRow>
  )

  RowPhone = ({ name, readOnly = false, id, defaultMessage, props }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <PhoneNumber name={name} {...props} label={null} />
      </GridColumn>
    </GridRow>
  )

  RowDate = ({ name, readOnly = false, id, defaultMessage, clearable = true }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <DateInput inputProps={{ maxDate: moment(), id: name, clearable: clearable }} name={name} />
      </GridColumn>
    </GridRow>
  )

  attachDocumentsUploadAttachment = (newDocument, values, setFieldValue) => {
    const docArray = Array.isArray(newDocument)
      ? uniqueArrayByKey(values.attachments.concat(newDocument), 'id')
      : uniqueArrayByKey(values.attachments.concat([newDocument]), 'id')

    docArray.forEach(doc => {
      setFieldValue &&
        setFieldValue(
          `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
          { ...doc, isLinkedFromDocumentManager: true }
        )
    })
    this.setState({ changedForm: true })
  }

  RowDocument = (formikProps, values, popupValues, documentType) => {
    return (
      <>
        <UploadAttachment
          {...this.props}
          attachments={values.attachments.filter(att => getSafe(() => att.documentType.id, 0) === documentType)}
          edit={getSafe(() => popupValues.id, '')}
          name='attachments'
          type={documentType.toString()}
          filesLimit={1}
          fileMaxSize={20}
          listDocumentTypes={this.props.listDocumentTypes}
          onChange={files => {
            formikProps.setFieldValue(
              `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
              {
                id: files.id,
                name: files.name,
                documentType: files.documentType,
                isLinkedFromDocumentManager: getSafe(() => files.isLinkedFromDocumentManager, false)
              }
            )
            this.setState({ changedForm: true })
          }}
          onRemoveFile={async id => {
            await formikProps.setFieldValue('attachments', [])
            const arrayAttachments = values.attachments.filter(attachment => attachment.id !== id)
            await formikProps.setFieldValue('attachments', arrayAttachments)
            this.setState({ changedForm: true, changedAttachments: true })
          }}
          data-test='settings_product_import_attachments'
          emptyContent={
            <label>
              <DivIcon>
                <UploadCloud size='25' color='#dee2e6' />
              </DivIcon>
              <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
              <br />
              <FormattedMessage
                id='addInventory.dragDropOr'
                defaultMessage={'or {link} to select from computer'}
                values={{
                  link: (
                    <a>
                      <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                    </a>
                  )
                }}
              />
            </label>
          }
          uploadedContent={
            <label>
              <DivIcon>
                <UploadCloud size='25' color='#dee2e6' />
              </DivIcon>
              <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
              <br />
              <FormattedMessage
                id='addInventory.dragDropOr'
                defaultMessage={'or {link} to select from computer'}
                values={{
                  link: (
                    <a>
                      <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                    </a>
                  )
                }}
              />
            </label>
          }
        />
        <AttachmentManager
          singleSelection
          documentTypeIds={[documentType]}
          asModal
          returnSelectedRows={rows => this.attachDocumentsUploadAttachment(rows, values, formikProps.setFieldValue)}
        />
      </>
    )
  }

  RowDropdown = ({ name, readOnly = false, id, defaultMessage, props, clearable = false }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <FormikDropdown
          selection
          fluid
          name={name}
          {...props}
          inputProps={{ disabled: readOnly, clearable: clearable }}
          options={props.options}
        />
      </GridColumn>
    </GridRow>
  )

  RowUnNumberDropdown = ({ name, readOnly = false, id, defaultMessage, props }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <FormikDropdown
          selection
          fluid
          name={name}
          {...props}
          inputProps={{
            disabled: readOnly,
            loading: this.props.unNumbersFetching,
            clearable: true,
            search: true,
            onSearchChange: this.handleUnNumberSearchChange,
            onChange: (_, { value }) => this.handleUnNumberChange(value, props.options)
          }}
          options={props.options}
        />
      </GridColumn>
    </GridRow>
  )

  renderMixtures = formikProps => {
    const {
      closePopup,
      intl: { formatMessage },
      isLoading
    } = this.props

    const { popupValues } = this.state

    let { values } = formikProps

    let initialCasProducts = []
    getSafe(() => popupValues.elements, []).forEach(el => {
      if (el.casProduct) initialCasProducts.push(el.casProduct)
    })

    let searchedCasProducts = this.props.searchedCasProducts.concat(initialCasProducts)

    return (
      <>
        <GridRow>
          <GridColumn width={16}>
            <FormattedMessage id='global.mixtures' defaultMessage='Mixtures' />
          </GridColumn>
        </GridRow>
        <GridRow style={{ alignItems: 'flex-end', 'padding-bottom': '0.5rem' }}>
          <GridColumn width={3}>
            <Header as='h5'>
              <FormattedMessage id='admin.proprietary' defaultMessage='Proprietary?' />
            </Header>
          </GridColumn>
          <GridColumn width={5}>
            <Header as='h5'>
              <FormattedMessage id='global.elementName' defaultMessage='Element Name' />
              <Required />
              <Or />
              <FormattedMessage id='global.casNumber' defaultMessage='CAS Number' />
              <Required />
            </Header>
          </GridColumn>
          <GridColumn width={3}>
            <Header as='h5'>
              <FormattedMessage id='global.assayMin' defaultMessage='Assay Min?' />
            </Header>
          </GridColumn>
          <GridColumn width={3}>
            <Header as='h5'>
              <FormattedMessage id='global.assayMax' defaultMessage='Assay Max?' />
            </Header>
          </GridColumn>
          <GridColumn width={2}></GridColumn>
        </GridRow>
        <FieldArray
          name='elements'
          render={arrayHelpers => (
            <>
              {values.elements && values.elements.length
                ? values.elements.map((element, index) => (
                    <GridRow style={{ alignItems: 'flex-end', 'padding-bottom': '0.5rem' }}>
                      <GridColumn width={3} data-test='admin_product_popup_proprietary' textAlign='center'>
                        <Checkbox name={`elements[${index}].proprietary`} />
                      </GridColumn>
                      <GridColumn width={5}>
                        {values.elements[index].proprietary ? (
                          <Input
                            name={`elements[${index}].name`}
                            defaultValue={''}
                            inputProps={{ 'data-test': `admin_product_popup_element_${index}_name` }}
                          />
                        ) : (
                          <FormikDropdown
                            name={`elements[${index}].casProduct`}
                            options={getSafe(
                              () => uniqueArrayByKey(searchedCasProducts.concat(initialCasProducts), 'id'),
                              []
                            ).map(item => ({
                              key: item.id,
                              id: item.id,
                              text: item.casNumber + ' ' + item.casIndexName,
                              value: item.id,
                              content: (
                                <Header
                                  content={item.casNumber}
                                  subheader={item.casIndexName}
                                  style={{ fontSize: '1em' }}
                                />
                              )
                            }))}
                            inputProps={{
                              'data-test': `admin_product_popup_cas_${index}_drpdn`,
                              size: 'large',
                              icon: 'search',
                              search: true,
                              selection: true,
                              clearable: true,
                              loading: this.state.isLoading,
                              onSearchChange: this.handleSearchChange,
                              dataindex: index
                            }}
                            defaultValue={
                              getSafe(() => element.casProduct.casNumber, false) ? element.casProduct.casNumber : null
                            }
                          />
                        )}
                      </GridColumn>
                      <GridColumn width={3} data-test='admin_product_popup_assayMin_inp'>
                        <Input type='number' name={`elements[${index}].assayMin`} />
                      </GridColumn>
                      <GridColumn width={3} data-test='admin_product_popup_assayMax_inp'>
                        <Input type='number' name={`elements[${index}].assayMax`} />
                      </GridColumn>
                      <GridColumn width={2}>
                        {index ? (
                          <Button
                            basic
                            icon
                            color='red'
                            onClick={() => {
                              arrayHelpers.remove(index)
                              this.setState({ changedForm: true })
                            }}
                            data-test={`settings_product_popup_remove_${index}_btn`}>
                            <Icon name='minus' />
                          </Button>
                        ) : (
                          ''
                        )}
                      </GridColumn>
                    </GridRow>
                  ))
                : ''}
              <GridRow>
                <GridColumn width={14}></GridColumn>
                <GridColumn width={2} textAlign='center'>
                  <Button
                    basic
                    icon
                    color='green'
                    onClick={() => {
                      arrayHelpers.push({ name: '', casProduct: null, assayMin: '', assayMax: '' })
                      this.setState({ changedForm: true })
                    }}
                    data-test='settings_product_popup_add_btn'>
                    <Icon name='plus' />
                  </Button>
                </GridColumn>
              </GridRow>
            </>
          )}
        />
      </>
    )
  }

  renderEdit = formikProps => {
    let codesList = this.state.codesList
    const { selectedProductGroupsOptions, selectedCompanyOptions } = this.state
    const {
      intl: { formatMessage },
      searchedManufacturers,
      searchedManufacturersLoading,
      searchManufacturers,
      searchedProductGroupsLoading,
      searchedProductGroups,
      searchedCompanyLoading,
      searchedCompany
    } = this.props

    const allProductGroupsOptions = uniqueArrayByKey(searchedProductGroups.concat(selectedProductGroupsOptions), 'key')
    const allCompanyOptions = uniqueArrayByKey(searchedCompany.concat(selectedCompanyOptions), 'key')

    return (
      <Grid verticalAlign='middle'>
        {this.RowInput({ name: 'name', id: 'global.productName', defaultMessage: 'Product Name', required: true })}
        {this.RowInput({ name: 'code', id: 'global.productCode', defaultMessage: 'Product Code', required: true })}
        <GridRow>
          <GridColumn width={6}>
            <FormattedMessage id='global.productGroups' defaultMessage='Product Groups' />
            <Required />
          </GridColumn>
          <GridColumn width={10}>
            <FormikDropdown
              name='productGroup'
              options={allProductGroupsOptions}
              inputProps={{
                loading: searchedProductGroupsLoading,
                search: true,
                icon: 'search',
                selection: true,
                noResultsMessage: formatMessage({
                  id: 'global.startTypingToSearch',
                  defaultMessage: 'Start typing to begin search'
                }),
                onSearchChange: this.handleProductGroupsSearchChange,
                onChange: (_, { value }) => this.handleProductGroupsChange(value, allProductGroupsOptions)
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn width={6}>
            <FormattedMessage id='global.company' defaultMessage='Company' />
            <Required />
          </GridColumn>
          <GridColumn width={10}>
            <FormikDropdown
              name='company'
              options={allCompanyOptions}
              inputProps={{
                loading: searchedCompanyLoading,
                search: true,
                icon: 'search',
                selection: true,
                noResultsMessage: formatMessage({
                  id: 'global.startTypingToSearch',
                  defaultMessage: 'Start typing to begin search'
                }),
                onSearchChange: this.handleCompanySearchChange,
                onChange: (_, { value }) => this.handleCompanyChange(value, allProductGroupsOptions)
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn width={6}>
            <FormattedMessage id='global.manufacturer' defaultMessage='Manufacturer' />
          </GridColumn>
          <GridColumn width={10}>
            <FormikDropdown
              name='manufacturer'
              options={searchedManufacturers}
              inputProps={{
                'data-test': 'TODO new_inventory_manufacturer_drpdn',
                size: 'large',
                minCharacters: 0,
                icon: 'search',
                search: true,
                selection: true,
                clearable: true,
                loading: searchedManufacturersLoading,
                onSearchChange: debounce((e, { searchQuery }) => searchManufacturers(searchQuery), 500)
              }}
            />
          </GridColumn>
        </GridRow>

        {this.renderMixtures(formikProps)}

        <GridRow>
          <GridColumn width={6}>
            <FormattedMessage id='global.published' defaultMessage='Published' />
          </GridColumn>
          <GridColumn width={10}>
            <Checkbox name='isPublished' />
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn width={6}>
            <FormattedMessage id='global.mfrProductCodes' defaultMessage='Manufacturer Product Codes' />
          </GridColumn>
          <GridColumn width={10}>
            <FormikDropdown
              name='mfrProductCodes'
              options={codesList}
              inputProps={{
                allowAdditions: true,
                additionLabel: formatMessage({ id: 'global.dropdown.add', defaultMessage: 'Add ' }),
                search: true,
                selection: true,
                multiple: true,
                onAddItem: (e, { value }) => {
                  const newValue = { text: value, value: value }
                  codesList.push(newValue)
                  this.setState({ codesList: codesList })
                },
                noResultsMessage: formatMessage(
                  { id: 'global.dropdown.startTyping', defaultMessage: 'Start typing to add {typeName}.' },
                  { typeName: formatMessage({ id: 'global.aCode', defaultMessage: 'a code' }) }
                )
              }}
            />
          </GridColumn>
        </GridRow>
        {this.RowPhone({
          name: 'emergencyPhone',
          id: 'global.emergencyPhone',
          defaultMessage: 'Emergency Phone',
          props: formikProps
        })}

        <Header as='h3'>
          <FormattedMessage id='global.sds' defaultMessage='SDS' />
        </Header>
        {this.RowDate({ name: 'sdsIssuedDate', id: 'global.sdsIssuedDate', defaultMessage: 'SDS Issued Date' })}
        {this.RowInput({ name: 'sdsPreparedBy', id: 'global.sdsPreparedBy', defaultMessage: 'SDS Prepared by' })}
        {this.RowDate({ name: 'sdsRevisionDate', id: 'global.sdsRevisionDate', defaultMessage: 'SDS Revision Date' })}
        {this.RowInput({
          name: 'sdsVersionNumber',
          id: 'global.sdsVersionNumber',
          defaultMessage: 'SDS Version Number'
        })}
        <Header as='h3'>
          <FormattedMessage id='global.tds' defaultMessage='TDS' />
        </Header>
        {this.RowDate({ name: 'tdsIssuedDate', id: 'global.tdsIssuedDate', defaultMessage: 'TDS Issued Date' })}
        {this.RowInput({ name: 'tdsPreparedBy', id: 'global.tdsPreparedBy', defaultMessage: 'TDS Prepared by' })}
        {this.RowDate({ name: 'tdsRevisionDate', id: 'global.tdsRevisionDate', defaultMessage: 'TDS Revision Date' })}
        {this.RowInput({ name: 'tdsVersionNumber', id: 'tdsVersionNumber', defaultMessage: 'TDS Version Number' })}
      </Grid>
    )
  }

  renderInfo = formikProps => {
    return (
      <Grid verticalAlign='middle'>
        {this.RowInput({ name: 'appearance', id: 'global.appearance', defaultMessage: 'Appearance' })}
        {this.RowInput({
          name: 'aspirationHazard',
          id: 'global.aspirationHazard',
          defaultMessage: 'Aspiration Hazard'
        })}
        {this.RowInput({
          name: 'autoIgnitionTemperature',
          id: 'global.autoIgnitionTemperature',
          defaultMessage: 'Auto Ignition Temperature'
        })}
        {this.RowInput({
          name: 'boilingPointRange',
          id: 'global.boilingPointRange',
          defaultMessage: 'Boiling Point/Range'
        })}
        {this.RowTextArea(
          {
            name: 'conditionsToAvoid',
            id: 'global.conditionsToAvoid',
            defaultMessage: 'Conditions to Avoid'
          },
          formikProps
        )}
        {this.RowInput({
          name: 'optionalCriticalTemperature',
          id: 'global.optionalCriticalTemperature',
          defaultMessage: 'Critical Temperature'
        })}
        {this.RowInput({
          name: 'decompositionTemperature',
          id: 'global.decompositionTemperature',
          defaultMessage: 'Decomposition Temperature'
        })}
        {this.RowInput({
          name: 'developmentalEffects',
          id: 'global.developmentalEffects',
          defaultMessage: 'Developmental Effects'
        })}
        {this.RowInput({
          name: 'endocrineDisruptorInformation',
          id: 'global.endocrineDisruptorInformation',
          defaultMessage: 'Endocrine Disruptor Information'
        })}
        {this.RowInput({
          name: 'evaporationPoint',
          id: 'global.evaporationPoint',
          defaultMessage: 'Evaporation Point'
        })}
        {this.RowTextArea({ name: 'eyeContact', id: 'global.eyeContact', defaultMessage: 'Eye Contact' }, formikProps)}
        {this.RowInput({
          name: 'flammabilityOrExplosiveLower',
          id: 'global.flammabilityOrExplosiveLower',
          defaultMessage: 'Flammability or Explosive Lower'
        })}
        {this.RowInput({
          name: 'flammabilityOrExplosiveUpper',
          id: 'global.flammabilityOrExplosiveUpper',
          defaultMessage: 'Flammability or Explosive Upper'
        })}
        {this.RowInput({
          name: 'flammabilitySolidGas',
          id: 'global.flammabilitySolidGas',
          defaultMessage: 'Flammability (solid, gas)'
        })}
        {this.RowInput({ name: 'flashPoint', id: 'global.flashPoint', defaultMessage: 'Flash Point' })}
        {this.RowInput({
          name: 'optionalFlowTime',
          id: 'global.optionalFlowTime',
          defaultMessage: 'Flow Time'
        })}
        {this.RowInput({
          name: 'optionalGasDensity',
          id: 'global.optionalGasDensity',
          defaultMessage: 'Gas Desity'
        })}
        {this.RowTextArea(
          { name: 'generalAdvice', id: 'global.generalAdvice', defaultMessage: 'General Advice' },
          formikProps
        )}
        {this.RowTextArea(
          {
            name: 'hazardStatement',
            id: 'global.hazardStatement',
            defaultMessage: 'Hazard Statement'
          },
          formikProps
        )}
        {this.RowInput({
          name: 'hazardousDecompositionProducts',
          id: 'global.hazardousDecompositionProducts',
          defaultMessage: 'Hazardous Decomposition Products'
        })}
        {this.RowInput({
          name: 'hazardousPolymerization',
          id: 'global.hazardousPolymerization',
          defaultMessage: 'Hazardous Polymerization'
        })}
        {this.RowInput({
          name: 'hazardousReactions',
          id: 'global.hazardousReactions',
          defaultMessage: 'Hazardous Reactions'
        })}
        {this.RowInput({
          name: 'optionalHeatOfCombustion',
          id: 'global.optionalHeatOfCombustion',
          defaultMessage: 'Heat Of Combustion'
        })}
        {this.RowInput({
          name: 'hmisChronicHealthHazard',
          id: 'global.hmisChronicHealthHazard',
          defaultMessage: 'HMIS Chronic Health Hazard'
        })}
        {this.RowInput({
          name: 'hmisFlammability',
          id: 'global.hmisFlammability',
          defaultMessage: 'HMIS Flammability'
        })}
        {this.RowInput({
          name: 'hmisHealthHazard',
          id: 'global.hmisHealthHazard',
          defaultMessage: 'HMIS Health Hazard'
        })}
        {this.RowInput({
          name: 'hmisPhysicalHazard',
          id: 'global.hmisPhysicalHazard',
          defaultMessage: 'HMIS Physical Hazard'
        })}
        {this.RowInput({ name: 'hnoc', id: 'global.hnoc', defaultMessage: 'HNOC' })}
        {this.RowTextArea(
          {
            name: 'incompatibleMaterials',
            id: 'global.incompatibleMaterials',
            defaultMessage: 'Incompatible Materials'
          },
          formikProps
        )}
        {this.RowTextArea({ name: 'ingestion', id: 'global.ingestion', defaultMessage: 'Ingestion' }, formikProps)}
        {this.RowTextArea({ name: 'inhalation', id: 'global.inhalation', defaultMessage: 'Inhalation' }, formikProps)}
        {this.RowInput({ name: 'irritation', id: 'global.irritation', defaultMessage: 'Irritation' })}
        {this.RowInput({ name: 'labelElements', id: 'global.labelElements', defaultMessage: 'Label Elements' })}
        {this.RowInput({
          name: 'meltingPointRange',
          id: 'global.meltingPointRange',
          defaultMessage: 'Melting Point/Range'
        })}
        {this.RowInput({ name: 'mexicoGrade', id: 'global.mexicoGrade', defaultMessage: 'Mexico-Grade' })}
        {this.RowInput({
          name: 'molecularFormula',
          id: 'global.molecularFormula',
          defaultMessage: 'Molecular Formula'
        })}
        {this.RowInput({ name: 'molecularWeight', id: 'global.molecularWeight', defaultMessage: 'Molecular Weight' })}
        {this.RowInput({
          name: 'mostImportantSymptomsAndEffects',
          id: 'global.mostImportantSymptomsAndEffects',
          defaultMessage: 'Most Important Symptoms and Effects'
        })}
        {this.RowInput({
          name: 'mutagenicEffects',
          id: 'global.mutagenicEffects',
          defaultMessage: 'Mutagenic Effects'
        })}
        {this.RowInput({ name: 'nfpaFireHazard', id: 'global.nfpaFireHazard', defaultMessage: 'NFPA Fire Hazard' })}
        {this.RowInput({
          name: 'nfpaHealthHazard',
          id: 'global.nfpaHealthHazard',
          defaultMessage: 'NFPA Health Hazard'
        })}
        {this.RowInput({
          name: 'nfpaReactivityHazard',
          id: 'global.nfpaReactivityHazard',
          defaultMessage: 'NFPA Reactivity Hazard'
        })}
        {this.RowInput({
          name: 'nfpaSpecialHazard',
          id: 'global.nfpaSpecialHazard',
          defaultMessage: 'NFPA Special Hazard'
        })}
        {this.RowInput({
          name: 'notesToPhysician',
          id: 'global.notesToPhysician',
          defaultMessage: 'Notes to Physician'
        })}
        {this.RowInput({ name: 'odor', id: 'global.odor', defaultMessage: 'Odor' })}
        {this.RowInput({ name: 'odorThreshold', id: 'global.odorThreshold', defaultMessage: 'Odor Threshold' })}
        {this.RowInput({
          name: 'oshaDefinedHazards',
          id: 'global.oshaDefinedHazards',
          defaultMessage: 'OSHA Defined Hazards'
        })}
        {this.RowInput({
          name: 'otherAdverseEffects',
          id: 'global.otherAdverseEffects',
          defaultMessage: 'Other Adverse Effects'
        })}
        {this.RowInput({
          name: 'partitionCoefficient',
          id: 'global.partitionCoefficient',
          defaultMessage: 'Partition Coefficient'
        })}
        {this.RowInput({ name: 'ph', id: 'global.ph', defaultMessage: 'pH' })}
        {this.RowInput({ name: 'physicalState', id: 'global.physicalState', defaultMessage: 'Physical State' })}
        {this.RowTextArea(
          {
            name: 'precautionaryStatements',
            id: 'global.precautionaryStatements',
            defaultMessage: 'Precautionary Statements'
          },
          formikProps
        )}
        {this.RowInput({
          name: 'productLc50Inhalation',
          id: 'global.productLc50Inhalation',
          defaultMessage: 'Product LC50 Inhalation'
        })}
        {this.RowInput({
          name: 'productLd50Dermal',
          id: 'global.productLd50Dermal',
          defaultMessage: 'Product LD50 Dermal'
        })}
        {this.RowInput({ name: 'productLd50Oral', id: 'global.productLd50Oral', defaultMessage: 'Product LD50 Oral' })}
        {this.RowInput({ name: 'reactiveHazard', id: 'global.reactiveHazard', defaultMessage: 'Reactive Hazard' })}
        {this.RowInput({
          name: 'optionalRecommendedRestrictions',
          id: 'global.optionalRecommendedRestrictions',
          defaultMessage: 'Recommended Restrictions'
        })}

        {this.RowTextArea(
          { name: 'recommendedUse', id: 'global.recommendedUse', defaultMessage: 'Recommended Use' },
          formikProps
        )}
        {this.RowInput({
          name: 'optionalRelativeDensity',
          id: 'global.optionalRelativeDensity',
          defaultMessage: 'Relative Density'
        })}
        {this.RowInput({
          name: 'reproductiveEffects',
          id: 'global.reproductiveEffects',
          defaultMessage: 'Reproductive Effects'
        })}
        {this.RowInput({ name: 'sensitization', id: 'global.sensitization', defaultMessage: 'Sensitization' })}
        {this.RowInput({ name: 'optionalSchedule', id: 'global.optionalSchedule', defaultMessage: 'Schedule' })}

        {this.RowInput({ name: 'signalWord', id: 'global.signalWord', defaultMessage: 'Signal Word' })}
        {this.RowTextArea(
          { name: 'skinContact', id: 'global.skinContact', defaultMessage: 'Skin Contact' },
          formikProps
        )}
        {this.RowInput({ name: 'solubility', id: 'global.solubility', defaultMessage: 'Solubility' })}
        {this.RowInput({ name: 'specificGravity', id: 'global.specificGravity', defaultMessage: 'Specific Gravity' })}
        {this.RowInput({
          name: 'optionalSpecificVolume',
          id: 'global.optionalSpecificVolume',
          defaultMessage: 'Specific Volume'
        })}
        {this.RowInput({ name: 'stability', id: 'global.stability', defaultMessage: 'Stability' })}
        {this.RowInput({
          name: 'stotRepeatedExposure',
          id: 'global.stotRepeatedExposure',
          defaultMessage: 'STOT- Repeated Exposure'
        })}
        {this.RowInput({
          name: 'stotSingleExposure',
          id: 'global.stotSingleExposure',
          defaultMessage: 'STOT- Single Exposure'
        })}
        {this.RowInput({
          name: 'supplementalInformation',
          id: 'global.supplementalInformation',
          defaultMessage: 'Supplemental Information'
        })}
        {this.RowTextArea(
          {
            name: 'symptomsEffects',
            id: 'global.symptomsEffects',
            defaultMessage: 'Symptoms/Effects'
          },
          formikProps
        )}
        {this.RowInput({
          name: 'optionalSynonyms',
          id: 'global.optionalSynonyms',
          defaultMessage: 'Synonyms'
        })}
        {this.RowInput({ name: 'teratogenicity', id: 'global.teratogenicity', defaultMessage: 'Teratogenicity' })}
        {this.RowInput({
          name: 'usesAdvisedAgainst',
          id: 'global.usesAdvisedAgainst',
          defaultMessage: 'Uses Advised against'
        })}
        {this.RowInput({ name: 'vaporDensity', id: 'global.vaporDensity', defaultMessage: 'Vapor Density' })}
        {this.RowInput({ name: 'vaporPressure', id: 'global.vaporPressure', defaultMessage: 'Vapor Pressure' })}
        {this.RowInput({ name: 'viscosity', id: 'global.viscosity', defaultMessage: 'Viscosity' })}
        {this.RowInput({
          name: 'wasteDisposalMethods',
          id: 'global.wasteDisposalMethods',
          defaultMessage: 'Waste Disposal Methods'
        })}
      </Grid>
    )
  }

  renderDocuments = formikProps => {
    let { popupValues } = this.state

    return (
      <Grid verticalAlign='middle'>
        <GridRow>
          <GridColumn width={16}>
            <label>
              <FormattedMessage id='global.sdsDocument' defaultMessage='SDS Document' />
            </label>
            {this.RowDocument(formikProps, formikProps.values, popupValues, 3)}
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn width={16}>
            <label>
              <FormattedMessage id='global.tdsDocument' defaultMessage='TDS Document' />
            </label>
            {this.RowDocument(formikProps, formikProps.values, popupValues, 11)}
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn width={16}>
            <label>
              <FormattedMessage id='global.dhsDocument' defaultMessage='DHS Document' />
            </label>
            {this.RowDocument(formikProps, formikProps.values, popupValues, 12)}
          </GridColumn>
        </GridRow>
      </Grid>
    )
  }

  renderTransportation = formikProps => {
    return (
      <>
        <Grid verticalAlign='middle'>
          <GridRow>
            <GridColumn computer={6}>
              <FormattedMessage id='global.filter' defaultMessage='Filter' />
            </GridColumn>
            <GridColumn computer={10}>
              <Dropdown
                selection
                fluid
                options={transportationTypes}
                value={this.state.transportationType}
                onChange={(_, { value }) => this.setState({ transportationType: value })}
              />
            </GridColumn>
          </GridRow>
        </Grid>
        {this.renderTransportationContent(formikProps, this.state.transportationType)}
      </>
    )
  }

  renderTransportationContent = (formikProps, transportationType) => {
    let unNumberOptions = [...this.props.unNumbersFiltered, ...this.state.unNumberInitOptions].filter(
      (v, i, a) => a.findIndex(t => t.key === v.key) === i
    )

    switch (transportationType) {
      case 'dot': {
        return (
          <Grid verticalAlign='middle'>
            {this.RowDropdown({
              name: 'dotHazardClass',
              id: 'global.dotHazardClass',
              defaultMessage: 'DOT Hazard Class',
              clearable: true,
              props: {
                options: this.props.hazardClasses
              }
            })}
            {this.RowInput({
              name: 'dotMarinePollutant',
              id: 'global.dotMarinePollutant',
              defaultMessage: 'DOT Marine Pollutant'
            })}
            {this.RowDropdown({
              name: 'dotPackagingGroup',
              id: 'global.dotPackagingGroup',
              defaultMessage: 'DOT Packaging Group',
              clearable: true,
              props: {
                options: this.props.packagingGroups
              }
            })}
            {this.RowInput({
              name: 'dotProperShippingName',
              id: 'global.dotProperShippingName',
              defaultMessage: 'DOT Proper Shipping Name'
            })}
            {this.RowInput({
              name: 'dotProperTechnicalName',
              id: 'global.dotProperTechnicalName',
              defaultMessage: 'DOT Proper Technical Name'
            })}
            {this.RowInput({
              name: 'dotReportableQuantity',
              id: 'global.dotReportableQuantity',
              defaultMessage: 'DOT Reportable Quantity'
            })}
            {this.RowInput({
              name: 'dotSevereMarinePollutant',
              id: 'global.dotSevereMarinePollutant',
              defaultMessage: 'DOT Severe Marine Pollutant'
            })}
            {this.RowUnNumberDropdown({
              name: 'dotUnNumber',
              id: 'global.dotUnNumber',
              defaultMessage: 'DOT UN Number',
              props: {
                options: unNumberOptions
              }
            })}
            {this.RowInput({
              name: 'dotEnvironmentalHazards',
              id: 'global.dotEnvironmentalHazards',
              defaultMessage: 'DOT Enviromental Hazards'
            })}
            {this.RowInput({
              name: 'dotEmsNumbers',
              id: 'global.dotEmsNumbers',
              defaultMessage: 'DOT Ems Numbers'
            })}

            {this.RowInput({
              name: 'dotExceptions',
              id: 'global.dotExceptions',
              defaultMessage: 'DOT Exceptions'
            })}
            {this.RowInput({
              name: 'dotUserSpecialPrecautions',
              id: 'global.dotUserSpecialPrecautions',
              defaultMessage: 'DOT User Special Precautions'
            })}
            {this.RowInput({
              name: 'dotPackagingExceptions',
              id: 'global.dotPackagingExceptions',
              defaultMessage: 'DOT Packaging Exceptions'
            })}
            {this.RowInput({
              name: 'dotPackagingNonBulk',
              id: 'global.dotPackagingNonBulk',
              defaultMessage: 'DOT Packaging Non Bulk'
            })}
            {this.RowInput({
              name: 'dotPackagingBulk',
              id: 'global.dotPackagingBulk',
              defaultMessage: 'DOT Packaging Bulk'
            })}
            {this.RowInput({
              name: 'dotQuantityLimitations',
              id: 'global.dotQuantityLimitations',
              defaultMessage: 'DOT Quantity Limitations'
            })}
            {this.RowInput({
              name: 'dotPassengerQuantityLimitations',
              id: 'global.dotPassengerQuantityLimitations',
              defaultMessage: 'DOT Passenger Quantity Limitations'
            })}
            {this.RowInput({
              name: 'dotCargoAircraftQuantityLimitations',
              id: 'global.dotCargoAircraftQuantityLimitations',
              defaultMessage: 'DOT Cargo Aircraft Quantity Limitations'
            })}
            {this.RowInput({
              name: 'dotVesselStowageLocation',
              id: 'global.dotVesselStowageLocation',
              defaultMessage: 'DOT Vessel Stowage Location'
            })}
            {this.RowInput({
              name: 'dotVesselStowageOther',
              id: 'global.dotVesselStowageOther',
              defaultMessage: 'DOT Vessel Stowage Other'
            })}
          </Grid>
        )
      }

      case 'iata': {
        return (
          <Grid verticalAlign='middle'>
            {this.RowDropdown({
              name: 'iataHazardClass',
              id: 'global.iataHazardClass',
              defaultMessage: 'IATA Hazard Class',
              clearable: true,
              props: {
                options: this.props.hazardClasses
              }
            })}
            {this.RowDropdown({
              name: 'iataPackagingGroup',
              id: 'global.iataPackagingGroup',
              defaultMessage: 'IATA Packaging Group',
              clearable: true,
              props: {
                options: this.props.packagingGroups
              }
            })}
            {this.RowInput({
              name: 'iataProperShippingName',
              id: 'global.iataProperShippingName',
              defaultMessage: 'IATA Proper Shipping Name'
            })}
            {this.RowInput({
              name: 'iataProperTechnicalName',
              id: 'global.iataProperTechnicalName',
              defaultMessage: 'IATA Proper Technical Name'
            })}
            {this.RowUnNumberDropdown({
              name: 'iataUnNumber',
              id: 'global.iataUnNumber',
              defaultMessage: 'IATA UN Number',
              props: {
                options: unNumberOptions
              }
            })}

            {this.RowInput({
              name: 'iataReportableQuantities',
              id: 'global.iataReportableQuantities',
              defaultMessage: 'IATA Reportable Quantities'
            })}
            {this.RowInput({
              name: 'iataEnvironmentalHazards',
              id: 'global.iataEnvironmentalHazards',
              defaultMessage: 'IATA Enviromental Hazards'
            })}
            {this.RowInput({
              name: 'iataEmsNumbers',
              id: 'global.iataEmsNumbers',
              defaultMessage: 'IATA Ems Numbers'
            })}
            {this.RowInput({
              name: 'iataExceptions',
              id: 'global.iataExceptions',
              defaultMessage: 'IATA Exceptions'
            })}
            {this.RowInput({
              name: 'iataUserSpecialPrecautions',
              id: 'global.iataUserSpecialPrecautions',
              defaultMessage: 'IATA User Special Precautions'
            })}
            {this.RowInput({
              name: 'iataMarinePollutant',
              id: 'global.iataMarinePollutant',
              defaultMessage: 'IATA Marine Pollutant'
            })}
            {this.RowInput({
              name: 'iataSevereMarinePollutant',
              id: 'global.iataSevereMarinePollutant',
              defaultMessage: 'IATA Severe Marine Pollutant'
            })}
            {this.RowInput({
              name: 'iataPackagingExceptions',
              id: 'global.iataPackagingExceptions',
              defaultMessage: 'IATA Packaging Exceptions'
            })}
            {this.RowInput({
              name: 'iataPackagingNonBulk',
              id: 'global.iataPackagingNonBulk',
              defaultMessage: 'IATA Packaging Non Bulk'
            })}
            {this.RowInput({
              name: 'iataPackagingBulk',
              id: 'global.iataPackagingBulk',
              defaultMessage: 'IATA Packaging Bulk'
            })}
            {this.RowInput({
              name: 'iataPassengerQuantityLimitations',
              id: 'global.iataPassengerQuantityLimitations',
              defaultMessage: 'IATA Passenger Quantity Limitations'
            })}
            {this.RowInput({
              name: 'iataCargoAircraftQuantityLimitations',
              id: 'global.iataCargoAircraftQuantityLimitations',
              defaultMessage: 'IATA Cargo Aircraft Quantity Limitations'
            })}
            {this.RowInput({
              name: 'iataVesselStowageLocation',
              id: 'global.iataVesselStowageLocation',
              defaultMessage: 'IATA Vessel Stoge Location'
            })}
            {this.RowInput({
              name: 'iataVesselStowageOther',
              id: 'global.iataVesselStowageOther',
              defaultMessage: 'IATA Vessel Stowage Other'
            })}
          </Grid>
        )
      }

      case 'imdgImo': {
        return (
          <Grid verticalAlign='middle'>
            {this.RowDropdown({
              name: 'imdgImoHazardClass',
              id: 'global.imdgImoHazardClass',
              defaultMessage: 'IMDG/IMO Hazard Class',
              clearable: true,
              props: {
                options: this.props.hazardClasses
              }
            })}
            {this.RowDropdown({
              name: 'imdgImoPackagingGroup',
              id: 'global.imdgImoPackagingGroup',
              defaultMessage: 'IMDG/IMO Packaging Group',
              clearable: true,
              props: {
                options: this.props.packagingGroups
              }
            })}
            {this.RowInput({
              name: 'imdgImoProperShippingName',
              id: 'global.imdgImoProperShippingName',
              defaultMessage: 'IMDG/IMO Proper Shipping Name'
            })}
            {this.RowInput({
              name: 'imdgImoProperTechnicalName',
              id: 'global.imdgImoProperTechnicalName',
              defaultMessage: 'IMDG/IMO Proper Technical Name'
            })}
            {this.RowUnNumberDropdown({
              name: 'imdgImoUnNumber',
              id: 'global.imdgImoUnNumber',
              defaultMessage: 'IMDG/IMO UN Number',
              props: {
                options: unNumberOptions
              }
            })}

            {this.RowInput({
              name: 'imdgImoReportableQuantities',
              id: 'global.imdgImoReportableQuantities',
              defaultMessage: 'IMDG/IMO Reportable Quantities'
            })}
            {this.RowInput({
              name: 'imdgImoEnvironmentalHazards',
              id: 'global.imdgImoEnvironmentalHazards',
              defaultMessage: 'IMDG/IMO Enviromental Hazards'
            })}
            {this.RowInput({
              name: 'imdgImoEmsNumbers',
              id: 'global.imdgImoEmsNumbers',
              defaultMessage: 'IMDG/IMO Ems Numbers'
            })}
            {this.RowInput({
              name: 'imdgImoExceptions',
              id: 'global.imdgImoExceptions',
              defaultMessage: 'IMDG/IMO Exceptions'
            })}
            {this.RowInput({
              name: 'imdgImoUserSpecialPrecautions',
              id: 'global.imdgImoUserSpecialPrecautions',
              defaultMessage: 'IMDG/IMO User Special Precautions'
            })}
            {this.RowInput({
              name: 'imdgImoMarinePollutant',
              id: 'global.imdgImoMarinePollutant',
              defaultMessage: 'IMDG/IMO Marine Pollutant'
            })}
            {this.RowInput({
              name: 'imdgImoSevereMarinePollutant',
              id: 'global.imdgImoSevereMarinePollutant',
              defaultMessage: 'IMDG/IMO Severe Marine Pollutant'
            })}
            {this.RowInput({
              name: 'imdgImoPackagingExceptions',
              id: 'global.imdgImoPackagingExceptions',
              defaultMessage: 'IMDG/IMO Packaging Exceptions'
            })}
            {this.RowInput({
              name: 'imdgImoPackagingNonBulk',
              id: 'global.imdgImoPackagingNonBulk',
              defaultMessage: 'IMDG/IMO Packaging Non Bulk'
            })}
            {this.RowInput({
              name: 'imdgImoPackagingBulk',
              id: 'global.imdgImoPackagingBulk',
              defaultMessage: 'IMDG/IMO Packaging Bulk'
            })}
            {this.RowInput({
              name: 'imdgImoPassengerQuantityLimitations',
              id: 'global.imdgImoPassengerQuantityLimitations',
              defaultMessage: 'IMDG/IMO Passenger Quantity Limitations'
            })}
            {this.RowInput({
              name: 'imdgImoCargoAircraftQuantityLimitations',
              id: 'global.imdgImoCargoAircraftQuantityLimitations',
              defaultMessage: 'IMDG/IMO Cargo Aircraft Quantity Limitations'
            })}
            {this.RowInput({
              name: 'imdgImoVesselStowageLocation',
              id: 'global.imdgImoVesselStowageLocation',
              defaultMessage: 'IMDG/IMO Vessel Stoge Location'
            })}
            {this.RowInput({
              name: 'imdgImoVesselStowageOther',
              id: 'global.imdgImoVesselStowageOther',
              defaultMessage: 'IMDG/IMO Vessel Stowage Other'
            })}
          </Grid>
        )
      }

      case 'tdg': {
        return (
          <Grid verticalAlign='middle'>
            {this.RowDropdown({
              name: 'tdgHazardClass',
              id: 'global.tdgHazardClass',
              defaultMessage: 'TDG Hazard Class',
              clearable: true,
              props: {
                options: this.props.hazardClasses
              }
            })}
            {this.RowDropdown({
              name: 'tdgPackagingGroup',
              id: 'global.tdgPackagingGroup',
              defaultMessage: 'TDG Packaging Group',
              clearable: true,
              props: {
                options: this.props.packagingGroups
              }
            })}
            {this.RowInput({
              name: 'tdgProperShippingName',
              id: 'global.tdgProperShippingName',
              defaultMessage: 'TDG Proper Shipping Name'
            })}
            {this.RowInput({
              name: 'tdgProperTechnicalName',
              id: 'global.tdgProperTechnicalName',
              defaultMessage: 'TDG Proper Technical Name'
            })}
            {this.RowUnNumberDropdown({
              name: 'tdgUnNumber',
              id: 'global.tdgUnNumber',
              defaultMessage: 'TDG UN Number',
              props: {
                options: unNumberOptions
              }
            })}

            {this.RowInput({
              name: 'tdgReportableQuantities',
              id: 'global.tdgReportableQuantities',
              defaultMessage: 'TDG Reportable Quantities'
            })}
            {this.RowInput({
              name: 'tdgEnvironmentalHazards',
              id: 'global.tdgEnvironmentalHazards',
              defaultMessage: 'TDG Environmental Hazards'
            })}
            {this.RowInput({
              name: 'tdgEmsNumbers',
              id: 'global.tdgEmsNumbers',
              defaultMessage: 'TDG Ems Numbers'
            })}
            {this.RowInput({
              name: 'tdgExceptions',
              id: 'global.tdgExceptions',
              defaultMessage: 'TDG Exceptions'
            })}
            {this.RowInput({
              name: 'tdgUserSpecialPrecautions',
              id: 'global.tdgUserSpecialPrecautions',
              defaultMessage: 'TDG Users Special Precautions'
            })}
            {this.RowInput({
              name: 'tdgMarinePollutant',
              id: 'global.tdgMarinePollutant',
              defaultMessage: 'TDG Marine Pollutant'
            })}
            {this.RowInput({
              name: 'tdgSevereMarinePollutant',
              id: 'global.tdgSevereMarinePollutant',
              defaultMessage: 'TDG Severe Marine Pollutant'
            })}
            {this.RowInput({
              name: 'tdgPackagingExceptions',
              id: 'global.tdgPackagingExceptions',
              defaultMessage: 'TDG Packaging Exceptions'
            })}
            {this.RowInput({
              name: 'tdgPackagingNonBulk',
              id: 'global.tdgPackagingNonBulk',
              defaultMessage: 'TDG Packaging Non Bulk'
            })}
            {this.RowInput({
              name: 'tdgPackagingBulk',
              id: 'global.tdgPackagingBulk',
              defaultMessage: 'TDG Packaging Bulk'
            })}
            {this.RowInput({
              name: 'tdgPassengerQuantityLimitations',
              id: 'global.tdgPassengerQuantityLimitations',
              defaultMessage: 'TDG Passanger Quantity Limitations'
            })}
            {this.RowInput({
              name: 'tdgCargoAircraftQuantityLimitations',
              id: 'global.tdgCargoAircraftQuantityLimitations',
              defaultMessage: 'TDG Cargo Aircraft Quantity Limitations'
            })}
            {this.RowInput({
              name: 'tdgVesselStowageLocation',
              id: 'global.tdgVesselStowageLocation',
              defaultMessage: 'TDG Vessel Stowage Location'
            })}
            {this.RowInput({
              name: 'tdgVesselStowageOther',
              id: 'global.tdgVesselStowageOther',
              defaultMessage: 'TDG Vessel Stowage Other'
            })}
          </Grid>
        )
      }
    }
  }

  getContent = formikProps => {
    let { editTab } = this.state
    switch (editTab) {
      case 0: {
        // Edit
        return this.renderEdit(formikProps)
      }
      case 1: {
        // Info
        return this.renderInfo(formikProps)
      }
      case 2: {
        // Documents
        return this.renderDocuments(formikProps)
      }
      case 3: {
        // Transportation
        return this.renderTransportation(formikProps)
      }

      default:
        return null
    }
  }

  render() {
    const {
      visible,
      closePopup,
      intl: { formatMessage },
      isLoading,
      datagrid
    } = this.props

    const { editTab } = this.state

    return (
      <Form
        enableReinitialize
        initialValues={this.getInitialFormValues()}
        validationSchema={validationScheme}
        onSubmit={async (values, { setSubmitting }) => {
          if (this.submitForm(values, setSubmitting)) closePopup()
        }}
        render={formikProps => {
          let { touched, validateForm, resetForm, values } = formikProps
          this.resetForm = resetForm
          this.formikProps = formikProps

          return (
            <FlexSidebar
              visible={visible}
              width='very wide'
              style={{ width: '500px' }}
              direction='right'
              animation='overlay'>
              <Dimmer inverted active={isLoading}>
                <Loader />
              </Dimmer>
              <TabsWrapper>
                <HighSegment basic>
                  <Menu pointing secondary>
                    {tabs.map((tab, i) => (
                      <Menu.Item onClick={() => this.tabChanged(i)} active={editTab === i}>
                        {formatMessage(tab.text)}
                      </Menu.Item>
                    ))}
                  </Menu>
                </HighSegment>
              </TabsWrapper>

              <FlexContent>
                <Segment basic>{this.getContent(formikProps)}</Segment>
              </FlexContent>

              <GraySegment basic style={{ position: 'relative', overflow: 'visible', margin: '0' }}>
                <Grid>
                  <GridRow>
                    <GridColumnBtn computer={6} textAlign='left'>
                      <Button
                        size='large'
                        inputProps={{ type: 'button' }}
                        onClick={() => {
                          if (this.state.changedAttachments) datagrid.loadData()
                          closePopup()
                        }}
                        data-test='sidebar_inventory_cancel'>
                        {Object.keys(touched).length || this.state.changedForm
                          ? formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })
                          : formatMessage({ id: 'global.close', defaultMessage: 'Close' })}
                      </Button>
                    </GridColumnBtn>
                    <GridColumnBtn computer={10} textAlign='right'>
                      <Button.Submit
                        disabled={!(Object.keys(touched).length || this.state.changedForm)}
                        onClick={() =>
                          validateForm().then(err => {
                            if (Object.keys(err).length) {
                              this.switchToErrors(Object.keys(err))
                            }
                          })
                        }
                        primary
                        size='large'
                        inputProps={{ type: 'button' }}
                        data-test='sidebar_inventory_save_new'>
                        {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                      </Button.Submit>
                    </GridColumnBtn>
                  </GridRow>
                </Grid>
              </GraySegment>
              <ErrorFocus />
            </FlexSidebar>
          )
        }}
      />
    )
  }
}

export default injectIntl(AddEditEchoProduct)
