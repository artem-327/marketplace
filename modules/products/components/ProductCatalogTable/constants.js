import { Popup } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Styles
import { FileTextIcon } from '../../styles'

export const tabs = [
  { text: { id: 'global.ep.edit', defaultMessage: 'Edit' }, key: 'edit' },
  { text: { id: 'global.ep.info', defaultMessage: 'Info' }, key: 'info' },
  { text: { id: 'global.ep.documents', defaultMessage: 'Documents' }, key: 'documents' },
  { text: { id: 'global.ep.transportation', defaultMessage: 'Transportation' }, key: 'transportation' }
]

export const transportationTypes = [
  { key: 'tdg', text: <FormattedMessage id='global.tdg' defaultMessage='TDG' />, value: 'tdg' },
  { key: 'iata', text: <FormattedMessage id='global.iata' defaultMessage='IATA' />, value: 'iata' },
  { key: 'dot', text: <FormattedMessage id='global.dot' defaultMessage='DOT' />, value: 'dot' },
  { key: 'imdgImo', text: <FormattedMessage id='global.imdgImo' defaultMessage='IMDG/IMO' />, value: 'imdgImo' }
]

export const onErrorFieldTabs = {
  name: 0,
  code: 0,
  elements: 0
}

export const defaultValues = {
  name: '',
  attachments: [],
  appearance: '',
  aspirationHazard: '',
  autoIgnitionTemperature: '',
  boilingPointRange: '',
  code: '',
  conditionsToAvoid: '',
  decompositionTemperature: '',
  developmentalEffects: '',
  dotHazardClass: '',
  dotMarinePollutant: '',
  dotPackagingGroup: '',
  dotProperShippingName: '',
  dotProperTechnicalName: '',
  dotReportableQuantity: '',
  dotSevereMarinePollutant: '',
  dotEnvironmentalHazards: '',
  dotEmsNumbers: '',
  dotExceptions: '',
  dotUserSpecialPrecautions: '',
  dotPackagingExceptions: '',
  dotPackagingNonBulk: '',
  dotPackagingBulk: '',
  dotQuantityLimitations: '',
  dotPassengerQuantityLimitations: '',
  dotCargoAircraftQuantityLimitations: '',
  dotVesselStowageLocation: '',
  dotVesselStowageOther: '',
  dotUnNumber: '',
  elements: [{ name: '', casProduct: '', assayMin: '', assayMax: '', proprietary: false, caprop65: '', reach: '' }],
  emergencyCompanyName: '',
  emergencyContactName: '',
  emergencyPhone: '',
  endocrineDisruptorInformation: '',
  evaporationPoint: '',
  eyeContact: '',
  flammabilityOrExplosiveLower: '',
  flammabilityOrExplosiveUpper: '',
  flammabilitySolidGas: '',
  flashPoint: '',
  generalAdvice: '',
  hazardStatement: '',
  hazardousDecompositionProducts: '',
  hazardousPolymerization: '',
  hazardousReactions: '',
  hmisChronicHealthHazard: '',
  hmisFlammability: '',
  hmisHealthHazard: '',
  hmisPhysicalHazard: '',
  hnoc: '',
  iataHazardClass: '',
  iataHazardLabel: '',
  iataPackagingGroup: '',
  iataProperShippingName: '',
  iataProperTechnicalName: '',
  iataUnNumber: '',
  iataReportableQuantities: '',
  iataEnvironmentalHazards: '',
  iataEmsNumbers: '',
  iataExceptions: '',
  iataUserSpecialPrecautions: '',
  iataMarinePollutant: '',
  iataSevereMarinePollutant: '',
  iataPackagingExceptions: '',
  iataPackagingNonBulk: '',
  iataPackagingBulk: '',
  iataPassengerQuantityLimitations: '',
  iataCargoAircraftQuantityLimitations: '',
  iataVesselStowageLocation: '',
  iataVesselStowageOther: '',
  imdgImoHazardClass: '',
  imdgImoPackagingGroup: '',
  imdgImoProperShippingName: '',
  imdgImoProperTechnicalName: '',
  imdgImoUnNumber: '',
  imdgImoReportableQuantities: '',
  imdgImoEnvironmentalHazards: '',
  imdgImoEmsNumbers: '',
  imdgImoExceptions: '',
  imdgImoUserSpecialPrecautions: '',
  imdgImoMarinePollutant: '',
  imdgImoSevereMarinePollutant: '',
  imdgImoPackagingExceptions: '',
  imdgImoPackagingNonBulk: '',
  imdgImoPackagingBulk: '',
  imdgImoPassengerQuantityLimitations: '',
  imdgImoCargoAircraftQuantityLimitations: '',
  imdgImoVesselStowageLocation: '',
  imdgImoVesselStowageOther: '',
  incompatibleMaterials: '',
  ingestion: '',
  inhalation: '',
  irritation: '',
  labelElements: '',
  manufacturer: '',
  meltingPointRange: '',
  mexicoGrade: '',
  mfrProductCodes: [],
  molecularFormula: '',
  molecularWeight: '',
  mostImportantSymptomsAndEffects: '',
  mutagenicEffects: '',

  nfpaFireHazard: '',
  nfpaHealthHazard: '',
  nfpaReactivityHazard: '',
  nfpaSpecialHazard: '',
  notesToPhysician: '',
  odor: '',
  odorThreshold: '',
  oshaDefinedHazards: '',
  otherAdverseEffects: '',
  packagingGroup: null,
  partitionCoefficient: '',
  ph: '',
  physicalState: '',
  precautionaryStatements: '',
  productLc50Inhalation: '',
  productLd50Dermal: '',
  productLd50Oral: '',
  reactiveHazard: '',
  recommendedUse: '',
  reproductiveEffects: '',
  sdsIssuedDate: '', // date
  sdsPreparedBy: '',
  sdsRevisionDate: '', // date
  sdsVersionNumber: '',
  sensitization: '',
  signalWord: '',
  skinContact: '',
  solubility: '',
  specificGravity: '',
  stability: '',
  stotRepeatedExposure: '',
  stotSingleExposure: '',
  supplementalInformation: '',
  symptomsEffects: '',
  tdgHazardClass: '',
  tdgPackagingGroup: '',
  tdgProperShippingName: '',
  tdgProperTechnicalName: '',
  tdgUnNumber: '',
  tdgReportableQuantities: '',
  tdgEnvironmentalHazards: '',
  tdgEmsNumbers: '',
  tdgExceptions: '',
  tdgUserSpecialPrecautions: '',
  tdgMarinePollutant: '',
  tdgSevereMarinePollutant: '',
  tdgPackagingExceptions: '',
  tdgPackagingNonBulk: '',
  tdgPackagingBulk: '',
  tdgPassengerQuantityLimitations: '',
  tdgCargoAircraftQuantityLimitations: '',
  tdgVesselStowageLocation: '',
  tdgVesselStowageOther: '',
  tdsIssuedDate: '', // date
  tdsPreparedBy: '',
  tdsRevisionDate: '', // date
  tdsVersionNumber: '',
  teratogenicity: '',
  usesAdvisedAgainst: '',
  vaporDensity: '',
  vaporPressure: '',
  viscosity: '',
  wasteDisposalMethods: '',
  isPublished: true,
  productGroup: '',
  company: '',
  optionalRecommendedRestrictions: '',
  optionalSynonyms: '',
  optionalSchedule: '',
  optionalSpecificVolume: '',
  optionalCriticalTemperature: '',
  optionalGasDensity: '',
  optionalRelativeDensity: '',
  optionalFlowTime: '',
  optionalHeatOfCombustion: ''
}

export const echoRowActions = callback => {
  return tabs.map((tab, i) => ({
    text: <FormattedMessage {...tab.text} />,
    callback: row => callback(row, i)
  }))
}

export const productCatalogTableColumns = 
[
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.productName' defaultMessage='Product Name' />
    ),
    width: 250,
    sortPath: 'CompanyGenericProduct.name',
    allowReordering: false
  },
  {
    name: 'publishedStatus',
    title: (
      <Popup
        size='small'
        header={
          <FormattedMessage
            id='global.productStatusIndicator'
            defaultMessage='Status indicator if Company Product will be shown on Marketplace'
          />
        }
        trigger={
          <div>
            <FileTextIcon />
          </div>
        } // <div> has to be there otherwise popup will be not shown
      />
    ),
    caption: <FormattedMessage id='global.productStatusIcon' defaultMessage='Product Status Icon' />,
    width: 40,
    align: 'center'
  },
  {
    name: 'code',
    title: (
      <FormattedMessage id='global.productCode' defaultMessage='Product Code' />
    ),
    width: 150,
    sortPath: 'CompanyGenericProduct.code'
  },
  {
    name: 'manufacturerName',
    title: (
      <FormattedMessage id='admin.manufacturer' defaultMessage='Manufacturer' />
    ),
    width: 150,
    sortPath: 'CompanyGenericProduct.manufacturer.name'
  },
  {
    name: 'sds',
    title: (
      <FormattedMessage id='admin.companyGenericProduct.sds' defaultMessage='SDS' />
    ),
    width: 150
  },
  {
    name: 'sdsVersionNumber',
    title: (
      <FormattedMessage id='admin.companyGenericProduct.sdsVersion' defaultMessage='SDS Version' />
    ),
    width: 150,
    sortPath: 'CompanyGenericProduct.sdsVersionNumber'
  },
  {
    name: 'sdsRevisionDate',
    title: (
      <FormattedMessage id='admin.companyGenericProduct.sdsRevisionDate' defaultMessage='SDS Revision Date' />
    ),
    width: 150,
    sortPath: 'CompanyGenericProduct.sdsRevisionDate'
  },
  {
    name: 'productGroup',
    title: (
      <FormattedMessage id='global.productGroup' defaultMessage='Product Group' />
    ),
    width: 150,
    sortPath: 'CompanyGenericProduct.productGroup.name'
  },
  {
    name: 'company',
    title: (
      <FormattedMessage id='global.company' defaultMessage='Company' />
    ),
    width: 150,
    sortPath: 'CompanyGenericProduct.company.name'
  }
]

