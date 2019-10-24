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

