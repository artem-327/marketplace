import { FormattedMessage } from 'react-intl'

export const INIT_VALUES = {
  appearance: '',
  autoIgnitionTemperature: '',
  boilingPointRange: '',
  caprop65: false,
  caprop65DateListed: '',
  caprop65ListingMechanism: '',
  caprop65NSRLorMADL: '',
  caprop65TypeofToxicity: '',
  casIndexName: '',
  casNumber: '',
  criticalTemperature: '',
  deaDeaCode: '',
  deaListI: false,
  deaListII: false,
  decompositionTemperature: '',
  dhsReleaseMinimumConcentration: '',
  dhsReleaseScreeningThresholdQuantities: '',
  dhsSabotageMinimumConcentrationPercent: '',
  dhsSabotageScreeningThresholdQuantities: '',
  dhsSecurityIssueReleaseExplosives: false,
  dhsSecurityIssueReleaseFlammables: false,
  dhsSecurityIssueReleaseToxic: false,
  dhsSecurityIssueSabotageContamination: false,
  dhsSecurityIssueTheftCWCWP: false,
  dhsSecurityIssueTheftEXPIEDP: false,
  dhsSecurityIssueTheftWME: false,
  dhsTheftMinimumConcentration: '',
  dhsTheftScreeningThresholdQuantities: '',
  epaCaa112TTq: '',
  epaCerclaRq: '',
  epaFifra: false,
  epaSaferChoice: false,
  epaSection302EhsTPQ: '',
  epaSection304EhsRQ: '',
  epaSection313Tri: false,
  epaTsca: '',
  epaTsca12b: false,
  evaporationPoint: '',
  flammabilityOrExplosiveLower: '',
  flammabilityOrExplosiveUpper: '',
  flammabilitySolidGas: '',
  flashPoint: '',
  flowTimeIso2431: '',
  gasDensity: '',
  hazardClasses: [],
  heatOfCombustion: '',
  internationalAICS: false,
  internationalDSL: false,
  internationalEINECS: false,
  internationalENCS: false,
  internationalIECSC: false,
  internationalKECL: false,
  internationalNDSL: false,
  internationalPICCS: false,
  meltingPointRange: '',
  molecularFormula: '',
  molecularWeight: '',
  odor: '',
  odorThreshold: '',
  partitionCoefficient: '',
  ph: '',
  physicalState: '',
  reach: false,
  reachExposureScenario: '',
  reachSumi: '',
  recommendedUses: '',
  relativeDensity: '',
  rtkIllinois: false,
  rtkMassachusettes: false,
  rtkNewJersey: false,
  rtkPennslyvania: false,
  rtkRhodeIsland: false,
  solubility: '',
  specificGravity: '',
  specificVolume: '',
  usesAdvisedAgainst: '',
  vaporDensity: '',
  vaporPressure: '',
  viscosity: ''
}

export const GROUP_EPA = [
  [['CAA 112(r) TQ', 'epaCaa112TTq'], ['Section 302 (EHS) TPQ', 'epaSection302EhsTPQ']],
  [['FIFRA', 'epaFifra', false], ['Section 304 (EHS) RQ', 'epaSection304EhsRQ']],
  [['TSCA', 'epaTsca'], ['CERCLA RQ', 'epaCerclaRq']],
  [['TSCA 12(b)', 'epaTsca12b', false], ['Section 313 (TRI)', 'epaSection313Tri', false]],
  [['Safer Choice', 'epaSaferChoice', false], []]
]

export const GROUP_RIGHT_TO_KNOW = [
  [['Pennslyvania', 'rtkPennslyvania', false], ['Massachusettes', 'rtkMassachusettes', false]],
  [['Illinois', 'rtkIllinois', false], ['New Jersey', 'rtkNewJersey', false]],
  [['Rhode Island', 'rtkRhodeIsland', false], []]
]

export const GROUP_DHS_COI = [
  [['Security Issue: Release - Toxic', 'dhsSecurityIssueReleaseToxic', false], ['Release: Minimum Concentration', 'dhsReleaseMinimumConcentration']],
  [['Security Issue: Release - Flammables', 'dhsSecurityIssueReleaseFlammables', false], ['Release: Screening Threshold Quantities', 'dhsReleaseScreeningThresholdQuantities']],
  [['Security Issue: Release - Explosives', 'dhsSecurityIssueReleaseExplosives', false], ['Theft: Minimum Concentration', 'dhsTheftMinimumConcentration']],
  [['Security Issue: Theft - CW/CWP', 'dhsSecurityIssueTheftCWCWP', false], ['Theft: Screening Threshold Quantities', 'dhsTheftScreeningThresholdQuantities']],
  [['Security Issue: Theft - WME', 'dhsSecurityIssueTheftWME', false], ['Sabotage: Minimum Concentration', 'dhsSabotageMinimumConcentrationPercent']],
  [['Security Issue: Theft - EXP/IEDP', 'dhsSecurityIssueTheftEXPIEDP', false], ['Sabotage: Screening Threshold Quantities', 'dhsSabotageScreeningThresholdQuantities']],
  [['Security Issue: Sabotage/Contamination', 'dhsSecurityIssueSabotageContamination', false], [] /* // ! ! ['DHS COI', 'aaaaaaaaaa']*/]
]

export const GROUP_CA_PROP_65 = [
  [['Date Listed', 'caprop65DateListed'], ['Type of Toxicity', 'caprop65TypeofToxicity']],
  [['NSRL or MADL (µg/day)', 'caprop65NSRLorMADL'], ['Listing Mechanism', 'caprop65ListingMechanism']]
]

export const GROUP_DEA = [
  [['List I', 'deaListI', false], ['List II', 'deaListII', false]],
  [['DEA Code', 'deaDeaCode']]
]

export const GROUP_REACH = [
  [['Exposure Scenario(s)', 'reachExposureScenario'], ['SUMIs', 'reachSumi']],
]

export const GROUP_INTERNATIONAL = [
  [['ENCS', 'internationalENCS', false], ['DSL', 'internationalDSL', false]],
  [['AICS', 'internationalAICS', false], ['NDSL', 'internationalNDSL', false]],
  [['IECSC', 'internationalIECSC', false], ['EINECS', 'internationalEINECS', false]],
  [['KECL', 'internationalKECL', false], ['PICCS', 'internationalPICCS', false]]
]

export const GROUP_OTHERS = [
  [['Physical State', 'physicalState'], ['Appearance', 'appearance']],
  [['Odor', 'odor'], ['Odor Threshold', 'odorThreshold']],
  [['pH', 'ph'], ['Melting Point/Range', 'meltingPointRange']],
  [['Boiling Point/Range', 'boilingPointRange'], ['Flash Point', 'flashPoint']],
  [['Evaporation Point', 'evaporationPoint'], ['Flammability (solid, gas)', 'flammabilitySolidGas']],
  [['Flammability or Explosive Upper', 'flammabilityOrExplosiveUpper'], ['Flammability or Explosive Lower', 'flammabilityOrExplosiveLower']],
  [['Vapor Pressure', 'vaporPressure'], ['Vapor Density', 'vaporDensity']],
  [['Solubility', 'solubility'], ['Partition Coefficient', 'partitionCoefficient']],
  [['Auto Ignition Temperature', 'autoIgnitionTemperature'], ['Decomposition Temperature', 'decompositionTemperature']],
  [['Viscosity', 'viscosity'], ['Molecular Formula', 'molecularFormula']],
  [['Molecular Weight', 'molecularWeight'], ['Recommended Use', 'recommendedUses']],
  [['Uses Advised Against', 'usesAdvisedAgainst'], []]
]


export const PROPERTIES_FILTER = [
  {
    key: 'epa',
    text: <FormattedMessage id='global.regulatoryEpa' defaultMessage='EPA' />,
    value: 'epa'
  },
  {
    key: 'rightToKnow',
    text: <FormattedMessage id='global.regulatoryRightToKnow' defaultMessage='Right to Know' />,
    value: 'rightToKnow'
  },
  {
    key: 'dhsCoi',
    text: <FormattedMessage id='global.regulatoryDhsCoi' defaultMessage='DHS COI' />,
    value: 'dhsCoi'
  },
  {
    key: 'caProp65',
    text: <FormattedMessage id='global.regulatoryCaProp65' defaultMessage='CA Prop 65' />,
    value: 'caProp65'
  },
  {
    key: 'dea',
    text: <FormattedMessage id='global.regulatoryDea' defaultMessage='DEA' />,
    value: 'dea'
  },
  {
    key: 'reach',
    text: <FormattedMessage id='global.regulatoryReach' defaultMessage='REACH' />,
    value: 'reach'
  },
  {
    key: 'international',
    text: <FormattedMessage id='global.regulatoryInternational' defaultMessage='International' />,
    value: 'international'
  },
  {
    key: 'others',
    text: <FormattedMessage id='global.regulatoryOthers' defaultMessage='Others' />,
    value: 'others'
  },
  {
    key: 'all',
    text: <FormattedMessage id='global.all' defaultMessage='All' />,
    value: 'all'
  }
]

/* // ! !
  caprop65: false,  // prepinac
  reach: false,   // prepinac





  criticalTemperature: '',
  flowTimeIso2431: '',
  gasDensity: '',
  hazardClasses: [],
  heatOfCombustion: '',
  relativeDensity: '',
  specificGravity: '',
  specificVolume: '',
*/