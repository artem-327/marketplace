import { FormattedMessage } from 'react-intl'

export const tabs = [
  { text: { id: 'global.ep.info', defaultMessage: 'Info(EP)' }, key: 'info' },
  { text: { id: 'global.ep.properties', defaultMessage: 'Properties(EP)' }, key: 'properties' },
  { text: { id: 'global.ep.documents', defaultMessage: 'Documents(EP)' }, key: 'documents' },
  { text: { id: 'global.ep.regulatory', defaultMessage: 'Regulatory(EP)' }, key: 'regulatory' },
  { text: { id: 'global.ep.transportation', defaultMessage: 'Transportation(EP)' }, key: 'transportation' }
]

export const regulatoryFilter = {
  epa: {
    key: 'epa',
    text: <FormattedMessage id='global.epa' defaultMessage='!EPA'>{text => text}</FormattedMessage>,
    value: 'epa'
  },
  dhs: {
    key: 'dhs',
    text: <FormattedMessage id='global.dhs' defaultMessage='!DHS'>{text => text}</FormattedMessage>,
    value: 'dhs'
  },
  dot: {
    key: 'dot',
    text: <FormattedMessage id='global.dot' defaultMessage='!DOT'>{text => text}</FormattedMessage>,
    value: 'dot'
  },
  caProp65: {
    key: 'caProp65',
    text: <FormattedMessage id='global.caProp65' defaultMessage='!CA Prop 65'>{text => text}</FormattedMessage>,
    value: 'caProp65'
  },
  rightToKnow: {
    key: 'rightToKnow',
    text: <FormattedMessage id='global.rightToKnow' defaultMessage='!Right to Know'>{text => text}</FormattedMessage>,
    value: 'rightToKnow'
  },
  dea: {
    key: 'dea',
    text: <FormattedMessage id='global.dea' defaultMessage='!DEA'>{text => text}</FormattedMessage>,
    value: 'dea'
  },
  international: {
    key: 'international',
    text: <FormattedMessage id='global.international' defaultMessage='!International'>{text => text}</FormattedMessage>,
    value: 'international'
  },
  all: {
    key: 'all',
    text: <FormattedMessage id='global.all' defaultMessage='!All'>{text => text}</FormattedMessage>,
    value: 'all'
  },
}

export const dropdownOptions = {
  epa: {
    epaSection302EhsTPQ: {
      options: ['10', '500', '500/10000', '1000', '1000/10000', '10000', 'NA']
    },
    epaSection304EhsRQ: {
      options: ['1', '10', '100', '500', '1000', '5000', 'NA']
    },
    epaTsca: {
      options: ['Active', 'Inactive', 'NA']
    }
  },
  dhs: {
    dhsReleaseMinimumConcentration: {
      options: ['1', 'ACG', '80', '37', '50', '20', 'NA']
    },
    dhsReleaseScreeningThresholdQuantitie: {
      options: ['1', '10', '100', '500', '1000', '2500', '5000', 'NA']
    },
    dhsTheftScreeningThresholdQuantities: {
      options: ['45', '500', 'NA']
    },
    dhsSabotageMinimumConcentration: {
      options: ['ACG', 'NA']
    },
    dhsSabotageScreeningThresholdQuantities: {
      options: ['APA', 'NA']
    }
  },
  ca65Prop: {
    caprop65TypeofToxicity: {
      options: ['Developmental', 'Cancer', 'Female', 'Male'],
      inputProps: { multiple: true }
    },
    caprop65ListingMechanism: {
      options: ['FR', 'AB', 'SQE', 'LC']
    }
  }
}

export const echoProductGrouping = [
  { key: 'dot', text: <FormattedMessage id='global.dot' defaultMessage='!DOT' />, value: 'dot' },
  { key: 'iata', text: <FormattedMessage id='global.iata' defaultMessage='!IATA' />, value: 'iata' },
  { key: 'tdg', text: <FormattedMessage id='global.tdg' defaultMessage='!TDG' />, value: 'tdg' },
  { key: 'imdgImo', text: <FormattedMessage id='global.imdgImo' defaultMessage='!IMDG/IMO' />, value: 'imdgImo' }
]


export const groupActions = (rows, companyProductId, callback) => {
  let companyProduct = rows.find((el) => el.companyProduct.id == companyProductId)

  if (!companyProduct || companyProduct.cfStatus === 'Unmapped') return []

  return tabs.map((tab, i) => ({
    text: tab.text, callback: () => callback(companyProduct, i)
  }))
}