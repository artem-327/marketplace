import { FormattedMessage } from 'react-intl'

export const tabs = [
  { text: { id: 'global.ep.edit', defaultMessage: 'Edit' }, key: 'edit' },
  { text: { id: 'global.ep.info', defaultMessage: 'Info' }, key: 'info' },
  {
    text: { id: 'global.ep.regulatory', defaultMessage: 'Regulatory' },
    key: 'regulatory'
  },
  {
    text: { id: 'global.ep.properties', defaultMessage: 'Properties' },
    key: 'properties'
  },
  {
    text: { id: 'global.ep.transportation', defaultMessage: 'Transportation' },
    key: 'transportation'
  }
]

export const propertiesFilterOptions = [
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
    key: 'all',
    text: <FormattedMessage id='global.all' defaultMessage='All' />,
    value: 'all'
  }
]

export const transportationFilterOptions = [
  {
    key: 'tdg',
    text: <FormattedMessage id='global.tdg' defaultMessage='TDG' />,
    value: 'tdg'
  },
  {
    key: 'iata',
    text: <FormattedMessage id='global.iata' defaultMessage='IATA' />,
    value: 'iata'
  },
  {
    key: 'dot',
    text: <FormattedMessage id='global.dot' defaultMessage='DOT' />,
    value: 'dot'
  },
  {
    key: 'imdgImo',
    text: <FormattedMessage id='global.imdgImo' defaultMessage='IMDG/IMO' />,
    value: 'imdgImo'
  }
]
