import { FormattedMessage } from 'react-intl'
import React from 'react'

export const tabs = [
  { text: { id: 'global.ep.edit', defaultMessage: 'Edit' }, key: 'edit' },
  { text: { id: 'global.ep.info', defaultMessage: 'Info' }, key: 'info' },
  { text: { id: 'global.ep.documents', defaultMessage: 'Documents' }, key: 'documents' },
  { text: { id: 'global.ep.transportation', defaultMessage: 'Transportation' }, key: 'transportation' }
]

export const transportationTypes = [
  { key: 'dot', text: <FormattedMessage id='global.dot' defaultMessage='DOT' />, value: 'dot' },
  { key: 'iata', text: <FormattedMessage id='global.iata' defaultMessage='IATA' />, value: 'iata' },
  { key: 'tdg', text: <FormattedMessage id='global.tdg' defaultMessage='TDG' />, value: 'tdg' },
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
  dotHazardLabel: '',
  dotMarinePollutant: '',
  dotPackagingGroup: '',
  dotProperShippingName: '',
  dotProperTechnicalName: '',
  dotReportableQuantity: '',
  dotSevereMarinePollutant: '',
  dotUnNumber: '',
  elements: [{ name: '', casProduct: '', assayMin: '', assayMax: '', proprietary: false }],
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
  imdgImoHazardClass: '',
  imdgImoHazardLabel: '',
  imdgImoPackagingGroup: '',
  imdgImoProperShippingName: '',
  imdgImoProperTechnicalName: '',
  imdgImoUnNumber: '',
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
  tdgHazardLabel: '',
  tdgPackagingGroup: '',
  tdgProperShippingName: '',
  tdgProperTechnicalName: '',
  tdgUnNumber: '',
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
  company: ''
}

export const echoRowActions = callback => {
  return tabs.map((tab, i) => ({
    text: <FormattedMessage {...tab.text}>{text => text}</FormattedMessage>,
    callback: row => callback(row, i)
  }))
}
