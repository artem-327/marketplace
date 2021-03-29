import { Component } from 'react'
import * as React from 'react'

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
  Sidebar,
  FormGroup
} from 'semantic-ui-react'
import TextareaAutosize from 'react-autosize-textarea'
import { FieldArray, Field } from 'formik'

import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import { errorMessages, dateValidation, phoneValidation } from '~/constants/yupValidation'
import { getSafe } from '~/utils/functions'
import { tabs, defaultValues, transportationTypes, onErrorFieldTabs } from './constants'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { uniqueArrayByKey } from '~/utils/functions'
import escapeRegExp from 'lodash/escapeRegExp'
import confirm from '~/components/Confirmable/confirm'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { Required, Or } from '~/components/constants/layout'
import { AttachmentManager } from '~/modules/attachments'
import { UploadCloud, ChevronDown, Paperclip } from 'react-feather'
import ErrorFocus from '~/components/error-focus'
//Components
import BasicButton from '../../../../components/buttons/BasicButton'

//Styles
import { DimmerBottomSidebarOpend } from '../../../../styles/global.style-components'

const SegmentCustomContent = styled(Segment)`
  padding-top: 0px !important;
  width: 900px !important;
  padding: 30px !important;
`

const DivTitleColumn = styled.div`
  color: #000000de;
  font-size: 14px;
`

const DivDocumentManager = styled.div`
  padding-bottom: 6px;
`

const PaperclipIcon = styled(Paperclip)`
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
`

const DivBrowseFile = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  color: #20273a;
  ${({ background }) => background};
  padding: 6px;
`

const GridColumnMixtures = styled(GridColumn)`
  padding: 3px 14px !important;
`

const GridColumnLabelTextArea = styled(GridColumn)`
  padding: 3px 0px !important;
  color: #000000de !important;
  font-size: 14px;
`

const GridColumnForm = styled(GridColumn)`
  padding: 6px 14px !important;
  ${({ color }) => (color ? color : null)};
`

const DivHeader = styled.div`
  background-color: #edeef2;
  padding: 10px;
  color: #404040;
  font-size: 14px;
`

const GridRowCustom = styled(GridRow)`
  padding: 0px !important;
`

const DivIconChevronDown = styled.div`
  align-self: center;
  position: absolute;
  right: 20px;
  cursor: pointer;
`

const DivBottomSidebar = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  background-color: #ffffff;
`

export const MenuCustom = styled(Menu)`
  padding-left: 30px !important;
  margin: 0 !important;
`

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
  background-color: #ffffff !important;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  padding-bottom: 0px !important;

  &.ui.visible.bottom.overlay.sidebar {
    height: 89% !important;
  }
  .field {
    font-size: 1em !important;
    line-height: 1.29 !important;
    font-weight: normal;
    > label {
      font-size: 1em !important;
      color: #404040;
    }
    > textarea,
    > .ui.input input,
    > .ui.dropdown {
      min-height: 32px;
      font-size: 1em;
      line-height: 1.29;
      border: solid 1px #dee2e6;
      background-color: #fdfdfd;
      &.disabled {
        opacity: 1;
        color: #cecfd4;
      }
      > .default.text {
        margin: 0 0 0 0.64285714em;
      }
    }
  }
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
  align-self: center;
`

export const GraySegment = styled(Segment)`
  background-color: #ededed !important;
`

export const HighSegment = styled(Segment)`
  margin: 0 !important;
  padding: 0 !important;
  z-index: 1;
`

const CustomTextarea = styled(TextareaAutosize)`
  resize: vertical !important;
  background-color: #fdfdfd !important;
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
  margin-right: 8px;
`

const StyledButton = styled(Button)`
  min-width: 40px !important;
  padding: 9px 9px !important;
  background: transparent !important;

  &.red {
    box-shadow: 0px 0px 0px 1px #f16844 inset !important;
    color: #f16844 !important;
  }
  &.green {
    box-shadow: 0px 0px 0px 1px #84c225 inset !important;
    color: #84c225 !important;
  }
`

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
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
  emergencyPhone: phoneValidation(10),
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
  ),
  sdsIssuedDate: dateValidation(false),
  sdsRevisionDate: dateValidation(false),
  tdsIssuedDate: dateValidation(false),
  tdsRevisionDate: dateValidation(false)
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
    try {
      if (hazardClasses.length === 0) getHazardClassesDataRequest()
      if (packagingGroups.length === 0) getPackagingGroupsDataRequest()
      if (!listDocumentTypes || (listDocumentTypes && !listDocumentTypes.length)) getDocumentTypes()
    } catch (error) {
      console.error(error)
    }

    if (this.props.addForm) {
      // Sidebar just opened - Add
      this.setInitialState(null, { editTab: 0 })
      this.resetForm()
    } else {
      // Sidebar just opened - Edit
      this.props.loadEditEchoProduct(this.props.popupValues.id, this.props.editTab, true)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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
            emergencyCompanyName: getSafe(() => popupValues.emergencyCompanyName, ''),
            emergencyContactName: getSafe(() => popupValues.emergencyContactName, ''),
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
                this.submitForm(values, setSubmitting, callback)
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

  submitForm = async (values, setSubmitting, callback) => {
    const {
      putCompanyGenericProducts,
      postCompanyGenericProducts,
      closePopup,
      linkAttachment,
      listDocumentTypes,
      datagrid
    } = this.props

    const { popupValues } = this.state

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
      callback()
    } catch (err) {
      setSubmitting(false)
    }
  }

  // RowInput = ({ name, readOnly = false, id, defaultMessage, required }) => (
  //   <GridRow>
  //     <GridColumn width={6}>
  //       <FormattedMessage id={id} defaultMessage={defaultMessage} /> {required === true ? <Required /> : null}
  //     </GridColumn>

  //     <GridColumn width={10}>
  //       <Input inputProps={{ readOnly: readOnly, id: name }} name={name} />
  //     </GridColumn>
  //   </GridRow>
  // )

  RowInput = ({ name, id, defaultMessage, required = false, placeholderId = 'global.empty', readOnly = false }) => {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Input
        label={
          <>
            <FormattedMessage id={id} defaultMessage={defaultMessage} /> {required === true ? <Required /> : null}
          </>
        }
        name={name}
        inputProps={{
          readOnly: readOnly,
          id: name,
          fluid: true,
          placeholder: formatMessage({
            id: placeholderId,
            defaultMessage: ''
          })
        }}
      />
    )
  }

  RowTwoInputs = arrayInputs => {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <GridRowCustom>
        {arrayInputs.map(
          ({ name, id, defaultMessage, required = false, placeholderId = 'global.empty', readOnly = false }) => (
            <GridColumnForm width={8}>
              {this.RowInput({ name, id, defaultMessage, required, placeholderId, readOnly })}
            </GridColumnForm>
          )
        )}
      </GridRowCustom>
    )
  }

  RowTextArea = ({ name, readOnly = false, id, defaultMessage }, formikProps) => (
    <GridRowCustom>
      <GridColumnForm width={16}>
        <GridRow>
          <GridColumnLabelTextArea>
            <FormattedMessage id={id} defaultMessage={defaultMessage} />
          </GridColumnLabelTextArea>
        </GridRow>
        <CustomTextarea
          rows={2}
          name={name}
          id={name}
          value={formikProps.values[name]}
          onChange={e => {
            formikProps.setFieldValue(name, e.target.value)
            this.setState({ changedForm: true })
          }}
        />
      </GridColumnForm>
    </GridRowCustom>
  )

  RowDate = ({ name, readOnly = false, id, defaultMessage, clearable = true }) => (
    <DateInput
      inputProps={{ maxDate: moment(), id: name, clearable: clearable }}
      name={name}
      label={
        <>
          <FormattedMessage id={id} defaultMessage={defaultMessage} />
        </>
      }
    />
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

  inputDocumentRows = (formikProps, values, popupValues, documentType) => {
    return (
      <>
        <GridRowCustom>
          <GridColumnForm width={16} color='color: #20273a !important;'>
            <FormattedMessage id='global.chooseExistingDocument' defaultMessage='Choose Existing Document' />
          </GridColumnForm>
        </GridRowCustom>
        <GridRowCustom>
          <GridColumnForm width={16}>
            <AttachmentManager
              border='none !important'
              color='#20273a !important'
              background='#edeef2 !important'
              singleSelection
              documentTypeIds={[documentType]}
              asModal
              returnSelectedRows={rows => this.attachDocumentsUploadAttachment(rows, values, formikProps.setFieldValue)}
            />
          </GridColumnForm>
        </GridRowCustom>
        <GridRowCustom>
          <GridColumnForm width={16} color='color: #20273a !important;'>
            <FormattedMessage id='global.orUploadNewDocumet' defaultMessage='Or Upload New Document' />
          </GridColumnForm>
        </GridRowCustom>
        <GridRowCustom>
          <GridColumnForm width={16}>
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
                <DivBrowseFile background='white'>
                  <DivIcon>
                    <PaperclipIcon size='14' color='#20273a' />
                  </DivIcon>
                  <FormattedMessage id='global.browseFileHere' defaultMessage='Browse file here' />
                </DivBrowseFile>
              }
              uploadedContent={
                <DivBrowseFile>
                  <DivIcon>
                    <PaperclipIcon size='14' color='#20273a' />
                  </DivIcon>
                  <FormattedMessage id='global.browseFileHere' defaultMessage='Browse file here' />
                </DivBrowseFile>
              }
            />
          </GridColumnForm>
        </GridRowCustom>
      </>
    )
  }

  RowDropdown = ({ name, readOnly = false, id, defaultMessage, props, clearable = false }) => (
    <FormikDropdown
      selection
      fluid
      label={<FormattedMessage id={id} defaultMessage={defaultMessage} />}
      name={name}
      {...props}
      inputProps={{ disabled: readOnly, clearable: clearable }}
      options={props.options}
    />
  )

  RowUnNumberDropdown = ({ name, readOnly = false, id, defaultMessage, props }) => (
    <FormikDropdown
      selection
      fluid
      label={<FormattedMessage id={id} defaultMessage={defaultMessage} />}
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
        <GridRowCustom>
          <GridColumn width={16}>
            <DivHeader>
              <FormattedMessage id='global.mixtures' defaultMessage='Mixtures' />
            </DivHeader>
          </GridColumn>
        </GridRowCustom>
        <GridRowCustom>
          <GridColumnMixtures width={2}>
            <DivTitleColumn>
              <FormattedMessage id='admin.proprietary' defaultMessage='Proprietary?' />
            </DivTitleColumn>
          </GridColumnMixtures>
          <GridColumnMixtures width={6}>
            <DivTitleColumn>
              <FormattedMessage id='global.elementName' defaultMessage='Element Name' />
              <Required />
              <Or />
              <FormattedMessage id='global.casNumber' defaultMessage='CAS Number' />
              <Required />
            </DivTitleColumn>
          </GridColumnMixtures>
          <GridColumnMixtures width={3}>
            <DivTitleColumn>
              <FormattedMessage id='global.assayMin' defaultMessage='Assay Min?' />
            </DivTitleColumn>
          </GridColumnMixtures>
          <GridColumnMixtures width={3}>
            <DivTitleColumn>
              <FormattedMessage id='global.assayMax' defaultMessage='Assay Max?' />
            </DivTitleColumn>
          </GridColumnMixtures>
          <GridColumnMixtures width={2}></GridColumnMixtures>
        </GridRowCustom>
        <FieldArray
          name='elements'
          render={arrayHelpers => (
            <>
              {values.elements && values.elements.length
                ? values.elements.map((element, index) => (
                    <GridRowCustom>
                      <GridColumnMixtures
                        width={2}
                        data-test='admin_product_popup_proprietary'
                        textAlign='center'
                        verticalAlign='middle'>
                        <Checkbox name={`elements[${index}].proprietary`} />
                      </GridColumnMixtures>
                      <GridColumnMixtures width={6}>
                        {values.elements[index].proprietary ? (
                          <Input
                            name={`elements[${index}].name`}
                            defaultValue={''}
                            inputProps={{
                              'data-test': `admin_product_popup_element_${index}_name`,
                              placeholder: formatMessage({
                                id: 'global.typeToSearch',
                                defaultMessage: 'Type to search'
                              })
                            }}
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
                              placeholder: formatMessage({
                                id: 'global.typeToSearch',
                                defaultMessage: 'Type to search'
                              }),
                              loading: this.state.isLoading,
                              onSearchChange: this.handleSearchChange,
                              dataindex: index
                            }}
                            defaultValue={
                              getSafe(() => element.casProduct.casNumber, false) ? element.casProduct.casNumber : null
                            }
                          />
                        )}
                      </GridColumnMixtures>
                      <GridColumnMixtures width={3} data-test='admin_product_popup_assayMin_inp'>
                        <Input
                          type='number'
                          name={`elements[${index}].assayMin`}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'global.zero',
                              defaultMessage: '0'
                            })
                          }}
                        />
                      </GridColumnMixtures>
                      <GridColumnMixtures width={3} data-test='admin_product_popup_assayMax_inp'>
                        <Input
                          type='number'
                          name={`elements[${index}].assayMax`}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'global.zero',
                              defaultMessage: '0'
                            })
                          }}
                        />
                      </GridColumnMixtures>
                      <GridColumnMixtures width={2}>
                        {index ? (
                          <StyledButton
                            icon
                            color='red'
                            onClick={() => {
                              arrayHelpers.remove(index)
                              this.setState({ changedForm: true })
                            }}
                            data-test={`settings_product_popup_remove_${index}_btn`}>
                            <Icon name='minus' />
                          </StyledButton>
                        ) : (
                          ''
                        )}
                      </GridColumnMixtures>
                    </GridRowCustom>
                  ))
                : ''}
              <GridRowCustom>
                <GridColumnMixtures width={14}></GridColumnMixtures>
                <GridColumnMixtures width={2}>
                  <StyledButton
                    icon
                    color='green'
                    onClick={() => {
                      arrayHelpers.push({ name: '', casProduct: null, assayMin: '', assayMax: '' })
                      this.setState({ changedForm: true })
                    }}
                    data-test='settings_product_popup_add_btn'>
                    <Icon name='plus' />
                  </StyledButton>
                </GridColumnMixtures>
              </GridRowCustom>
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
      <Grid>
        <GridRowCustom>
          <GridColumnForm width={16}>
            {this.RowInput({
              name: 'name',
              id: 'global.productName',
              defaultMessage: 'Product Name',
              required: true,
              placeholderId: 'productCatalog.enterProductName'
            })}
          </GridColumnForm>
        </GridRowCustom>

        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowInput({
              name: 'code',
              id: 'global.productCode',
              defaultMessage: 'Product Code',
              required: true,
              placeholderId: 'productCatalog.enterProductCode'
            })}
          </GridColumnForm>
          <GridColumnForm width={8}>
            <FormikDropdown
              name='productGroup'
              label={
                <>
                  <FormattedMessage id='global.productGroups' defaultMessage='Product Groups' />
                  <Required />
                </>
              }
              options={allProductGroupsOptions}
              inputProps={{
                loading: searchedProductGroupsLoading,
                search: true,
                icon: 'search',
                fluid: true,
                selection: true,
                placeholder: formatMessage({
                  id: 'global.typeToSearch',
                  defaultMessage: 'Type to search'
                }),
                noResultsMessage: formatMessage({
                  id: 'global.startTypingToSearch',
                  defaultMessage: 'Start typing to begin search'
                }),
                onSearchChange: this.handleProductGroupsSearchChange,
                onChange: (_, { value }) => this.handleProductGroupsChange(value, allProductGroupsOptions)
              }}
            />
          </GridColumnForm>
        </GridRowCustom>

        <GridRowCustom>
          <GridColumnForm width={8}>
            <FormikDropdown
              name='company'
              options={allCompanyOptions}
              label={
                <>
                  <FormattedMessage id='global.company' defaultMessage='Company' />
                  <Required />
                </>
              }
              inputProps={{
                loading: searchedCompanyLoading,
                search: true,
                icon: 'search',
                selection: true,
                fluid: true,
                placeholder: formatMessage({
                  id: 'global.typeToSearch',
                  defaultMessage: 'Type to search'
                }),
                noResultsMessage: formatMessage({
                  id: 'global.startTypingToSearch',
                  defaultMessage: 'Start typing to begin search'
                }),
                onSearchChange: this.handleCompanySearchChange,
                onChange: (_, { value }) => this.handleCompanyChange(value, allProductGroupsOptions)
              }}
            />
          </GridColumnForm>

          <GridColumnForm width={8}>
            <FormikDropdown
              name='manufacturer'
              options={searchedManufacturers}
              label={
                <>
                  <FormattedMessage id='global.manufacturer' defaultMessage='Manufacturer' />
                </>
              }
              inputProps={{
                'data-test': 'TODO new_inventory_manufacturer_drpdn',
                size: 'large',
                minCharacters: 0,
                icon: 'search',
                search: true,
                fluid: true,
                selection: true,
                clearable: true,
                placeholder: formatMessage({
                  id: 'global.typeToSearch',
                  defaultMessage: 'Type to search'
                }),
                loading: searchedManufacturersLoading,
                onSearchChange: debounce((e, { searchQuery }) => searchManufacturers(searchQuery), 500)
              }}
            />
          </GridColumnForm>
        </GridRowCustom>

        <GridRowCustom>
          <GridColumnForm width={8}>
            <FormikDropdown
              name='mfrProductCodes'
              options={codesList}
              label={
                <>
                  <FormattedMessage id='global.mfrProductCodes' defaultMessage='Manufacturer Product Codes' />
                </>
              }
              inputProps={{
                allowAdditions: true,
                additionLabel: formatMessage({ id: 'global.dropdown.add', defaultMessage: 'Add ' }),
                search: true,
                selection: true,
                multiple: true,
                fluid: true,
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
          </GridColumnForm>
          <GridColumnForm width={8}>
            <PhoneNumber
              background='#fdfdfd !important;'
              name='emergencyPhone'
              label={
                <>
                  <FormattedMessage id='global.emergencyPhone' defaultMessage='Emergency Phone' />
                </>
              }
              values={formikProps.values}
              setFieldValue={formikProps.setFieldValue}
              setFieldTouched={formikProps.setFieldTouched}
              errors={formikProps.errors}
              touched={formikProps.touched}
              isSubmitting={formikProps.isSubmitting}
              clearable
            />
          </GridColumnForm>
        </GridRowCustom>

        {this.RowTwoInputs([
          {
            name: 'emergencyCompanyName',
            id: 'global.emergencyCompanyName',
            defaultMessage: 'Emergency Company Name',
            required: false,
            placeholderId: 'global.enterEmergencyCompanyName'
          },
          {
            name: 'emergencyContactName',
            id: 'global.emergencyContactName',
            defaultMessage: 'Emergency Contact Name',
            required: false,
            placeholderId: 'global.enterEmergencyContactName'
          }
        ])}

        <GridRowCustom>
          <GridColumnForm width={1}>
            <Checkbox name='isPublished' />
          </GridColumnForm>
          <GridColumnForm width={15}>
            <DivTitleColumn>
              <FormattedMessage id='global.published' defaultMessage='Published' />
            </DivTitleColumn>
          </GridColumnForm>
        </GridRowCustom>

        {this.renderMixtures(formikProps)}

        <GridRowCustom>
          <GridColumn width={16}>
            <DivHeader>
              <FormattedMessage id='global.sds' defaultMessage='SDS' />
            </DivHeader>
          </GridColumn>
        </GridRowCustom>

        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowDate({ name: 'sdsIssuedDate', id: 'global.sdsIssuedDate', defaultMessage: 'SDS Issued Date' })}
          </GridColumnForm>
          <GridColumnForm width={8}>
            {this.RowInput({ name: 'sdsPreparedBy', id: 'global.sdsPreparedBy', defaultMessage: 'SDS Prepared by' })}
          </GridColumnForm>
        </GridRowCustom>

        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowDate({
              name: 'sdsRevisionDate',
              id: 'global.sdsRevisionDate',
              defaultMessage: 'SDS Revision Date'
            })}
          </GridColumnForm>
          <GridColumnForm width={8}>
            {this.RowInput({
              name: 'sdsVersionNumber',
              id: 'global.sdsVersionNumber',
              defaultMessage: 'SDS Version Number',
              required: false,
              placeholderId: 'admin.sds.enterVersionNumber'
            })}
          </GridColumnForm>
        </GridRowCustom>

        <GridRowCustom>
          <GridColumn width={16}>
            <DivHeader>
              <FormattedMessage id='global.tds' defaultMessage='TDS' />
            </DivHeader>
          </GridColumn>
        </GridRowCustom>

        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowDate({ name: 'tdsIssuedDate', id: 'global.tdsIssuedDate', defaultMessage: 'TDS Issued Date' })}
          </GridColumnForm>
          <GridColumnForm width={8}>
            {this.RowInput({ name: 'tdsPreparedBy', id: 'global.tdsPreparedBy', defaultMessage: 'TDS Prepared by' })}
          </GridColumnForm>
        </GridRowCustom>

        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowDate({
              name: 'tdsRevisionDate',
              id: 'global.tdsRevisionDate',
              defaultMessage: 'TDS Revision Date'
            })}
          </GridColumnForm>
          <GridColumnForm width={8}>
            {this.RowInput({
              name: 'tdsVersionNumber',
              id: 'tdsVersionNumber',
              defaultMessage: 'TDS Version Number',
              required: false,
              placeholderId: 'global.enterTdsVersionNumber'
            })}
          </GridColumnForm>
        </GridRowCustom>
      </Grid>
    )
  }

  renderInfo = formikProps => {
    return (
      <Grid>
        {this.RowTwoInputs([
          { name: 'appearance', id: 'global.appearance', defaultMessage: 'Appearance' },
          {
            name: 'aspirationHazard',
            id: 'global.aspirationHazard',
            defaultMessage: 'Aspiration Hazard'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'autoIgnitionTemperature',
            id: 'global.autoIgnitionTemperature',
            defaultMessage: 'Auto Ignition Temperature'
          },
          {
            name: 'boilingPointRange',
            id: 'global.boilingPointRange',
            defaultMessage: 'Boiling Point/Range'
          }
        ])}

        {this.RowTextArea(
          {
            name: 'conditionsToAvoid',
            id: 'global.conditionsToAvoid',
            defaultMessage: 'Conditions to Avoid'
          },
          formikProps
        )}

        {this.RowTwoInputs([
          {
            name: 'decompositionTemperature',
            id: 'global.decompositionTemperature',
            defaultMessage: 'Decomposition Temperature'
          },
          {
            name: 'optionalCriticalTemperature',
            id: 'global.optionalCriticalTemperature',
            defaultMessage: 'Critical Temperature'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'endocrineDisruptorInformation',
            id: 'global.endocrineDisruptorInformation',
            defaultMessage: 'Endocrine Disruptor Information'
          },
          {
            name: 'developmentalEffects',
            id: 'global.developmentalEffects',
            defaultMessage: 'Developmental Effects'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'flammabilityOrExplosiveLower',
            id: 'global.flammabilityOrExplosiveLower',
            defaultMessage: 'Flammability or Explosive Lower'
          },
          {
            name: 'evaporationPoint',
            id: 'global.evaporationPoint',
            defaultMessage: 'Evaporation Point'
          }
        ])}

        {this.RowTextArea({ name: 'eyeContact', id: 'global.eyeContact', defaultMessage: 'Eye Contact' }, formikProps)}

        {this.RowTwoInputs([
          {
            name: 'flammabilitySolidGas',
            id: 'global.flammabilitySolidGas',
            defaultMessage: 'Flammability (solid, gas)'
          },
          {
            name: 'flammabilityOrExplosiveUpper',
            id: 'global.flammabilityOrExplosiveUpper',
            defaultMessage: 'Flammability or Explosive Upper'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'optionalFlowTime',
            id: 'global.optionalFlowTime',
            defaultMessage: 'Flow Time'
          },
          { name: 'flashPoint', id: 'global.flashPoint', defaultMessage: 'Flash Point' }
        ])}

        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowInput({
              name: 'optionalGasDensity',
              id: 'global.optionalGasDensity',
              defaultMessage: 'Gas Desity'
            })}
          </GridColumnForm>
        </GridRowCustom>

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

        {this.RowTwoInputs([
          {
            name: 'hazardousDecompositionProducts',
            id: 'global.hazardousDecompositionProducts',
            defaultMessage: 'Hazardous Decomposition Products'
          },
          {
            name: 'hazardousPolymerization',
            id: 'global.hazardousPolymerization',
            defaultMessage: 'Hazardous Polymerization'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'hazardousReactions',
            id: 'global.hazardousReactions',
            defaultMessage: 'Hazardous Reactions'
          },
          {
            name: 'optionalHeatOfCombustion',
            id: 'global.optionalHeatOfCombustion',
            defaultMessage: 'Heat Of Combustion'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'hmisChronicHealthHazard',
            id: 'global.hmisChronicHealthHazard',
            defaultMessage: 'HMIS Chronic Health Hazard'
          },
          {
            name: 'hmisFlammability',
            id: 'global.hmisFlammability',
            defaultMessage: 'HMIS Flammability'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'hmisHealthHazard',
            id: 'global.hmisHealthHazard',
            defaultMessage: 'HMIS Health Hazard'
          },
          {
            name: 'hmisPhysicalHazard',
            id: 'global.hmisPhysicalHazard',
            defaultMessage: 'HMIS Physical Hazard'
          }
        ])}

        {this.RowTwoInputs([
          { name: 'hnoc', id: 'global.hnoc', defaultMessage: 'HNOC' },
          { name: 'labelElements', id: 'global.labelElements', defaultMessage: 'Label Elements' }
        ])}

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

        {this.RowTwoInputs([
          { name: 'mexicoGrade', id: 'global.mexicoGrade', defaultMessage: 'Mexico-Grade' },
          { name: 'irritation', id: 'global.irritation', defaultMessage: 'Irritation' }
        ])}

        {this.RowTwoInputs([
          {
            name: 'molecularWeight',
            id: 'global.molecularWeight',
            defaultMessage: 'Molecular Weight'
          },
          {
            name: 'meltingPointRange',
            id: 'global.meltingPointRange',
            defaultMessage: 'Melting Point/Range'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'mutagenicEffects',
            id: 'global.mutagenicEffects',
            defaultMessage: 'Mutagenic Effects'
          },
          {
            name: 'molecularFormula',
            id: 'global.molecularFormula',
            defaultMessage: 'Molecular Formula'
          }
        ])}

        {this.RowTwoInputs([
          { name: 'nfpaFireHazard', id: 'global.nfpaFireHazard', defaultMessage: 'NFPA Fire Hazard' },
          {
            name: 'mostImportantSymptomsAndEffects',
            id: 'global.mostImportantSymptomsAndEffects',
            defaultMessage: 'Most Important Symptoms and Effects'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'nfpaHealthHazard',
            id: 'global.nfpaHealthHazard',
            defaultMessage: 'NFPA Health Hazard'
          },
          {
            name: 'nfpaReactivityHazard',
            id: 'global.nfpaReactivityHazard',
            defaultMessage: 'NFPA Reactivity Hazard'
          }
        ])}
        {this.RowTwoInputs([
          {
            name: 'nfpaSpecialHazard',
            id: 'global.nfpaSpecialHazard',
            defaultMessage: 'NFPA Special Hazard'
          },
          {
            name: 'notesToPhysician',
            id: 'global.notesToPhysician',
            defaultMessage: 'Notes to Physician'
          }
        ])}
        {this.RowTwoInputs([
          { name: 'odor', id: 'global.odor', defaultMessage: 'Odor' },
          { name: 'odorThreshold', id: 'global.odorThreshold', defaultMessage: 'Odor Threshold' }
        ])}
        {this.RowTwoInputs([
          {
            name: 'oshaDefinedHazards',
            id: 'global.oshaDefinedHazards',
            defaultMessage: 'OSHA Defined Hazards'
          },
          {
            name: 'otherAdverseEffects',
            id: 'global.otherAdverseEffects',
            defaultMessage: 'Other Adverse Effects'
          }
        ])}
        {this.RowTwoInputs([
          {
            name: 'partitionCoefficient',
            id: 'global.partitionCoefficient',
            defaultMessage: 'Partition Coefficient'
          },
          { name: 'ph', id: 'global.ph', defaultMessage: 'pH' }
        ])}
        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowInput({ name: 'physicalState', id: 'global.physicalState', defaultMessage: 'Physical State' })}
          </GridColumnForm>
        </GridRowCustom>

        {this.RowTextArea(
          {
            name: 'precautionaryStatements',
            id: 'global.precautionaryStatements',
            defaultMessage: 'Precautionary Statements'
          },
          formikProps
        )}

        {this.RowTwoInputs([
          {
            name: 'productLc50Inhalation',
            id: 'global.productLc50Inhalation',
            defaultMessage: 'Product LC50 Inhalation'
          },
          {
            name: 'productLd50Dermal',
            id: 'global.productLd50Dermal',
            defaultMessage: 'Product LD50 Dermal'
          }
        ])}

        {this.RowTwoInputs([
          { name: 'productLd50Oral', id: 'global.productLd50Oral', defaultMessage: 'Product LD50 Oral' },
          { name: 'reactiveHazard', id: 'global.reactiveHazard', defaultMessage: 'Reactive Hazard' }
        ])}

        {this.RowTextArea(
          { name: 'recommendedUse', id: 'global.recommendedUse', defaultMessage: 'Recommended Use' },
          formikProps
        )}

        {this.RowTwoInputs([
          {
            name: 'optionalRecommendedRestrictions',
            id: 'global.optionalRecommendedRestrictions',
            defaultMessage: 'Recommended Restrictions'
          },
          {
            name: 'optionalRelativeDensity',
            id: 'global.optionalRelativeDensity',
            defaultMessage: 'Relative Density'
          }
        ])}

        {this.RowTwoInputs([
          {
            name: 'reproductiveEffects',
            id: 'global.reproductiveEffects',
            defaultMessage: 'Reproductive Effects'
          },
          { name: 'sensitization', id: 'global.sensitization', defaultMessage: 'Sensitization' }
        ])}

        {this.RowTwoInputs([
          { name: 'optionalSchedule', id: 'global.optionalSchedule', defaultMessage: 'Schedule' },
          { name: 'signalWord', id: 'global.signalWord', defaultMessage: 'Signal Word' }
        ])}

        {this.RowTextArea(
          { name: 'skinContact', id: 'global.skinContact', defaultMessage: 'Skin Contact' },
          formikProps
        )}

        {this.RowTwoInputs([
          { name: 'solubility', id: 'global.solubility', defaultMessage: 'Solubility' },
          { name: 'specificGravity', id: 'global.specificGravity', defaultMessage: 'Specific Gravity' }
        ])}

        {this.RowTwoInputs([
          {
            name: 'optionalSpecificVolume',
            id: 'global.optionalSpecificVolume',
            defaultMessage: 'Specific Volume'
          },
          { name: 'stability', id: 'global.stability', defaultMessage: 'Stability' }
        ])}

        {this.RowTwoInputs([
          {
            name: 'stotRepeatedExposure',
            id: 'global.stotRepeatedExposure',
            defaultMessage: 'STOT- Repeated Exposure'
          },
          {
            name: 'stotSingleExposure',
            id: 'global.stotSingleExposure',
            defaultMessage: 'STOT- Single Exposure'
          }
        ])}

        {this.RowTextArea(
          {
            name: 'symptomsEffects',
            id: 'global.symptomsEffects',
            defaultMessage: 'Symptoms/Effects'
          },
          formikProps
        )}

        {this.RowTwoInputs([
          {
            name: 'supplementalInformation',
            id: 'global.supplementalInformation',
            defaultMessage: 'Supplemental Information'
          },
          {
            name: 'optionalSynonyms',
            id: 'global.optionalSynonyms',
            defaultMessage: 'Synonyms'
          }
        ])}

        {this.RowTwoInputs([
          { name: 'teratogenicity', id: 'global.teratogenicity', defaultMessage: 'Teratogenicity' },
          {
            name: 'usesAdvisedAgainst',
            id: 'global.usesAdvisedAgainst',
            defaultMessage: 'Uses Advised against'
          }
        ])}

        {this.RowTwoInputs([
          { name: 'vaporDensity', id: 'global.vaporDensity', defaultMessage: 'Vapor Density' },
          { name: 'vaporPressure', id: 'global.vaporPressure', defaultMessage: 'Vapor Pressure' }
        ])}

        {this.RowTwoInputs([
          { name: 'viscosity', id: 'global.viscosity', defaultMessage: 'Viscosity' },
          {
            name: 'wasteDisposalMethods',
            id: 'global.wasteDisposalMethods',
            defaultMessage: 'Waste Disposal Methods'
          }
        ])}
      </Grid>
    )
  }

  renderDocuments = formikProps => {
    let { popupValues } = this.state

    return (
      <Grid>
        <GridRowCustom>
          <GridColumn width={16}>
            <DivHeader>
              <FormattedMessage id='global.sdsDocument' defaultMessage='SDS Document' />
            </DivHeader>
          </GridColumn>
        </GridRowCustom>

        {this.inputDocumentRows(formikProps, formikProps.values, popupValues, 3)}

        <GridRowCustom>
          <GridColumn width={16}>
            <DivHeader>
              <FormattedMessage id='global.tdsDocument' defaultMessage='TDS Document' />
            </DivHeader>
          </GridColumn>
        </GridRowCustom>

        {this.inputDocumentRows(formikProps, formikProps.values, popupValues, 11)}

        <GridRowCustom>
          <GridColumn width={16}>
            <DivHeader>
              <FormattedMessage id='global.dhsDocument' defaultMessage='DHS Document' />
            </DivHeader>
          </GridColumn>
        </GridRowCustom>

        {this.inputDocumentRows(formikProps, formikProps.values, popupValues, 12)}
      </Grid>
    )
  }

  renderTransportation = formikProps => {
    return (
      <>
        <Grid>
          <GridRowCustom>
            <GridColumnForm computer={16}>
              <Dropdown
                selection
                label={<FormattedMessage id='global.filter' defaultMessage='Filter' />}
                fluid
                options={transportationTypes}
                value={this.state.transportationType}
                onChange={(_, { value }) => this.setState({ transportationType: value })}
              />
            </GridColumnForm>
          </GridRowCustom>
        </Grid>
        {this.renderTransportationContent(formikProps, this.state.transportationType)}
      </>
    )
  }

  renderTransportationContent = (formikProps, transportationType) => {
    let unNumberOptions = [...this.props.unNumbersFiltered, ...this.state.unNumberInitOptions].filter(
      (v, i, a) => a.findIndex(t => t.key === v.key) === i
    )

    let typeUp = transportationType.toUpperCase()

    return (
      <Grid>
        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowDropdown({
              name: `${transportationType}HazardClass`,
              id: `global.${transportationType}HazardClass`,
              defaultMessage: `${typeUp} Hazard Class`,
              clearable: true,
              props: {
                options: this.props.hazardClasses
              }
            })}
          </GridColumnForm>
          <GridColumnForm width={8}>
            {this.RowDropdown({
              name: `${transportationType}PackagingGroup`,
              id: `global.${transportationType}PackagingGroup`,
              defaultMessage: `${typeUp} Packaging Group`,
              clearable: true,
              props: {
                options: this.props.packagingGroups
              }
            })}
          </GridColumnForm>
        </GridRowCustom>
        {this.RowTwoInputs([
          {
            name: `${transportationType}ProperShippingName`,
            id: `global.${transportationType}ProperShippingName`,
            defaultMessage: `${typeUp} Proper Shipping Name`
          },
          {
            name: `${transportationType}ProperTechnicalName`,
            id: `global.${transportationType}ProperTechnicalName`,
            defaultMessage: `${typeUp} Proper Technical Name`
          }
        ])}
        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowUnNumberDropdown({
              name: `${transportationType}UnNumber`,
              id: `global.${transportationType}UnNumber`,
              defaultMessage: `${typeUp} UN Number`,
              props: {
                options: unNumberOptions
              }
            })}
          </GridColumnForm>
          <GridColumnForm width={8}>
            {this.RowInput({
              name:
                transportationType === 'dot' ? 'dotReportableQuantity' : `${transportationType}ReportableQuantities`,
              id:
                transportationType === 'dot'
                  ? 'global.dotReportableQuantity'
                  : `global.${transportationType}ReportableQuantities`,
              defaultMessage:
                transportationType === 'dot' ? 'DOT Reportable Quantity' : `${typeUp} Reportable Quantities`
            })}
          </GridColumnForm>
        </GridRowCustom>

        {this.RowTwoInputs([
          {
            name: `${transportationType}EnvironmentalHazards`,
            id: `global.${transportationType}EnvironmentalHazards`,
            defaultMessage: `${typeUp} Environmental Hazards`
          },
          {
            name: `${transportationType}EmsNumbers`,
            id: `global.${transportationType}EmsNumbers`,
            defaultMessage: `${typeUp} Ems Numbers`
          }
        ])}
        {this.RowTwoInputs([
          {
            name: `${transportationType}Exceptions`,
            id: `global.${transportationType}Exceptions`,
            defaultMessage: `${typeUp} Exceptions`
          },
          {
            name: `${transportationType}UserSpecialPrecautions`,
            id: `global.${transportationType}UserSpecialPrecautions`,
            defaultMessage: `${typeUp} Users Special Precautions`
          }
        ])}
        {this.RowTwoInputs([
          {
            name: `${transportationType}MarinePollutant`,
            id: `global.${transportationType}MarinePollutant`,
            defaultMessage: `${typeUp} Marine Pollutant`
          },
          {
            name: `${transportationType}SevereMarinePollutant`,
            id: `global.${transportationType}SevereMarinePollutant`,
            defaultMessage: `${typeUp} Severe Marine Pollutant`
          }
        ])}
        {this.RowTwoInputs([
          {
            name: `${transportationType}PackagingExceptions`,
            id: `global.${transportationType}PackagingExceptions`,
            defaultMessage: `${typeUp} Packaging Exceptions`
          },
          {
            name: `${transportationType}PackagingNonBulk`,
            id: `global.${transportationType}PackagingNonBulk`,
            defaultMessage: `${typeUp} Packaging Non Bulk`
          }
        ])}
        {this.RowTwoInputs([
          {
            name: `${transportationType}PackagingBulk`,
            id: `global.${transportationType}PackagingBulk`,
            defaultMessage: `${typeUp} Packaging Bulk`
          },
          {
            name: `${transportationType}PassengerQuantityLimitations`,
            id: `global.${transportationType}PassengerQuantityLimitations`,
            defaultMessage: `${typeUp} Passanger Quantity Limitations`
          }
        ])}
        {this.RowTwoInputs([
          {
            name: `${transportationType}CargoAircraftQuantityLimitations`,
            id: `global.${transportationType}CargoAircraftQuantityLimitations`,
            defaultMessage: `${typeUp} Cargo Aircraft Quantity Limitations`
          },
          {
            name: `${transportationType}VesselStowageLocation`,
            id: `global.${transportationType}VesselStowageLocation`,
            defaultMessage: `${typeUp} Vessel Stowage Location`
          }
        ])}

        <GridRowCustom>
          <GridColumnForm width={8}>
            {this.RowInput({
              name: `${transportationType}VesselStowageOther`,
              id: `global.${transportationType}VesselStowageOther`,
              defaultMessage: `${typeUp} Vessel Stowage Other`
            })}
          </GridColumnForm>
          {transportationType === 'dot' && (
            <GridColumnForm width={8}>
              {this.RowInput({
                name: `${transportationType}QuantityLimitations`,
                id: `global.${transportationType}QuantityLimitations`,
                defaultMessage: `${typeUp} Quantity Limitations`
              })}
            </GridColumnForm>
          )}
        </GridRowCustom>
      </Grid>
    )
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
      closePopup,
      intl: { formatMessage },
      isLoading,
      datagrid
    } = this.props

    const { editTab } = this.state

    return (
      <CustomForm
        enableReinitialize
        initialValues={this.getInitialFormValues()}
        validationSchema={validationScheme}
        onSubmit={async (values, { setSubmitting }) => {
          this.submitForm(values, setSubmitting, closePopup)
        }}
        render={formikProps => {
          let { touched, validateForm, resetForm, values } = formikProps
          this.resetForm = resetForm
          this.formikProps = formikProps

          return (
            <>
              <DimmerBottomSidebarOpend
                height='height: 11% !important;' // 89% height has Sidebar'
                active={true}
                onClickOutside={() => closePopup()}
                page></DimmerBottomSidebarOpend>
              <FlexSidebar visible={true} width='very wide' direction='bottom' animation='overlay'>
                <Dimmer inverted active={isLoading}>
                  <Loader />
                </Dimmer>
                <HighSegment basic>
                  <MenuCustom pointing secondary>
                    {tabs.map((tab, i) => (
                      <Menu.Item onClick={() => this.tabChanged(i)} active={editTab === i}>
                        {formatMessage(tab.text)}
                      </Menu.Item>
                    ))}
                    <DivIconChevronDown onClick={() => closePopup()}><ChevronDown /></DivIconChevronDown>
                  </MenuCustom>
                </HighSegment>

                <FlexContent>
                  <SegmentCustomContent basic>{this.getContent(formikProps)}</SegmentCustomContent>
                </FlexContent>

                <DivBottomSidebar>
                  <BasicButton
                    noBorder
                    inputProps={{ type: 'button' }}
                    onClick={() => {
                      if (this.state.changedAttachments) datagrid.loadData()
                      closePopup()
                    }}
                    data-test='sidebar_inventory_cancel'>
                    {Object.keys(touched).length || this.state.changedForm
                      ? formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })
                      : formatMessage({ id: 'global.close', defaultMessage: 'Close' })}
                  </BasicButton>

                  <BasicButton
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
                  </BasicButton>
                </DivBottomSidebar>
                <ErrorFocus />
              </FlexSidebar>
            </>
          )
        }}
      />
    )
  }
}

export default injectIntl(AddEditEchoProduct)
