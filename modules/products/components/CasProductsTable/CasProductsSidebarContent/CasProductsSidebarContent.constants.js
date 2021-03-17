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
  cfChemicalOfInterest: false,
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

const EPA_302_EHS_TPQ_OPTIONS = ['10', '500', '500/10000', '1000', '1000/10000', '10000', 'NA']
const EPA_304_EHS_RQ_OPTIONS = ['1', '10', '100', '500', '1000', '5000', 'NA']
const EPA_TSCA_OPTIONS = ['Active', 'Inactive', 'NA']
const DHS_RELEASE_MINIMUM_CONCENTRATION_OPTIONS = ['1', 'ACG', '80', '37', '50', '20', 'NA']
const DHS_RELEASE_SCREENING_THRESHOLD_Q_OPTIONS = ['1', '10', '100', '500', '1000', '2500', '5000', 'NA']
const DHS_THEFT_SCREENING_THRESHOLD_Q_OPTIONS = ['45', '500', 'NA']
const DHS_SABOTAGE_MINIMUM_CONCENTRATION_OPTIONS = ['ACG', 'NA']
const DHS_SABOTAGE_SCREENING_THRESHOLD_Q_OPTIONS = ['APA', 'NA']
const CA_PROP_65_TYPE_OF_TOXICITY_OPTIONS = ['Developmental', 'Cancer', 'Female', 'Male']
const CA_PROP_65_LISTING_MECHANISM_OPTIONS = ['FR', 'AB', 'SQE', 'LC']

export const GROUP_EPA = [
  [['CAA 112(r) TQ', 'epaCaa112TTq'], ['Section 302 (EHS) TPQ', 'epaSection302EhsTPQ', EPA_302_EHS_TPQ_OPTIONS]],
  [['FIFRA', 'epaFifra', []], ['Section 304 (EHS) RQ', 'epaSection304EhsRQ', EPA_304_EHS_RQ_OPTIONS]],
  [['TSCA', 'epaTsca', EPA_TSCA_OPTIONS], ['CERCLA RQ', 'epaCerclaRq']],
  [['TSCA 12(b)', 'epaTsca12b', []], ['Section 313 (TRI)', 'epaSection313Tri', []]],
  [['Safer Choice', 'epaSaferChoice', []], []]
]

export const GROUP_RIGHT_TO_KNOW = [
  [['Pennslyvania', 'rtkPennslyvania', []], ['Massachusettes', 'rtkMassachusettes', []]],
  [['Illinois', 'rtkIllinois', []], ['New Jersey', 'rtkNewJersey', []]],
  [['Rhode Island', 'rtkRhodeIsland', []], []]
]

export const GROUP_DHS_COI = [
  [
    ['Security Issue: Release - Toxic', 'dhsSecurityIssueReleaseToxic', []],
    ['Release: Minimum Concentration', 'dhsReleaseMinimumConcentration', DHS_RELEASE_MINIMUM_CONCENTRATION_OPTIONS]
  ],
  [
    ['Security Issue: Release - Flammables', 'dhsSecurityIssueReleaseFlammables', []],
    ['Release: Screening Threshold Quantities', 'dhsReleaseScreeningThresholdQuantities', DHS_RELEASE_SCREENING_THRESHOLD_Q_OPTIONS]
  ],
  [
    ['Security Issue: Release - Explosives', 'dhsSecurityIssueReleaseExplosives', []],
    ['Theft: Minimum Concentration', 'dhsTheftMinimumConcentration']
  ],
  [
    ['Security Issue: Theft - CW/CWP', 'dhsSecurityIssueTheftCWCWP', []],
    ['Theft: Screening Threshold Quantities', 'dhsTheftScreeningThresholdQuantities', DHS_THEFT_SCREENING_THRESHOLD_Q_OPTIONS]
  ],
  [
    ['Security Issue: Theft - WME', 'dhsSecurityIssueTheftWME', []],
    ['Sabotage: Minimum Concentration', 'dhsSabotageMinimumConcentrationPercent', DHS_SABOTAGE_MINIMUM_CONCENTRATION_OPTIONS]
  ],
  [
    ['Security Issue: Theft - EXP/IEDP', 'dhsSecurityIssueTheftEXPIEDP', []],
    ['Sabotage: Screening Threshold Quantities', 'dhsSabotageScreeningThresholdQuantities', DHS_SABOTAGE_SCREENING_THRESHOLD_Q_OPTIONS]
  ],
  [['Security Issue: Sabotage/Contamination', 'dhsSecurityIssueSabotageContamination', []], [] /* ['DHS COI', 'aaaaaaaaaa']*/]
]

export const GROUP_CA_PROP_65 = [
  [
    ['Date Listed', 'caprop65DateListed'],
    ['Type of Toxicity', 'caprop65TypeofToxicity', CA_PROP_65_TYPE_OF_TOXICITY_OPTIONS]
  ],
  [
    ['NSRL or MADL (µg/day)', 'caprop65NSRLorMADL'],
    ['Listing Mechanism', 'caprop65ListingMechanism', CA_PROP_65_LISTING_MECHANISM_OPTIONS]
  ]
]

export const GROUP_DEA = [
  [['List I', 'deaListI', []], ['List II', 'deaListII', []]],
  [['DEA Code', 'deaDeaCode']]
]

export const GROUP_REACH = [
  [['Exposure Scenario(s)', 'reachExposureScenario'], ['SUMIs', 'reachSumi']],
]

export const GROUP_INTERNATIONAL = [
  [['ENCS', 'internationalENCS', []], ['DSL', 'internationalDSL', []]],
  [['AICS', 'internationalAICS', []], ['NDSL', 'internationalNDSL', []]],
  [['IECSC', 'internationalIECSC', []], ['EINECS', 'internationalEINECS', []]],
  [['KECL', 'internationalKECL', []], ['PICCS', 'internationalPICCS', []]]
]

export const GROUP_OTHERS = [
  [['Physical State', 'physicalState'], ['Appearance', 'appearance']],
  [['Odor', 'odor'], ['Odor Threshold', 'odorThreshold']],
  [['pH', 'ph'], ['Melting Point/Range', 'meltingPointRange']],
  [['Boiling Point/Range', 'boilingPointRange'], ['Flash Point', 'flashPoint']],
  [['Evaporation Point', 'evaporationPoint'], ['Flammability (solid, gas)', 'flammabilitySolidGas']],
  [
    ['Flammability or Explosive Upper', 'flammabilityOrExplosiveUpper'],
    ['Flammability or Explosive Lower', 'flammabilityOrExplosiveLower']
  ],
  [['Vapor Pressure', 'vaporPressure'], ['Vapor Density', 'vaporDensity']],
  [['Solubility', 'solubility'], ['Partition Coefficient', 'partitionCoefficient']],
  [['Auto Ignition Temperature', 'autoIgnitionTemperature'], ['Decomposition Temperature', 'decompositionTemperature']],
  [['Viscosity', 'viscosity'], ['Molecular Formula', 'molecularFormula']],
  [['Molecular Weight', 'molecularWeight'], ['Recommended Use', 'recommendedUses']],
  [['Uses Advised Against', 'usesAdvisedAgainst'], ['Hazard Classes', 'hazardClasses', 'hazard']],
  [['Critical Temperature', 'criticalTemperature'], ['Flow Time (ISO 2431)', 'flowTimeIso2431']],
  [['Gas Density', 'gasDensity'], ['Heat Of Combustion', 'heatOfCombustion']],
  [['Relative Density', 'relativeDensity'], ['Specific Gravity', 'specificGravity']],
  [['Specific Volume', 'specificVolume'], []]
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