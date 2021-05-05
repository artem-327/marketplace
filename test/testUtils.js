import { ShallowWrapper, mount, shallow, ReactWrapper } from 'enzyme'
import { IntlProvider } from 'react-intl'
import checkPropTypes from 'check-prop-types'
import { LocalConvenienceStoreOutlined } from '@material-ui/icons'
/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper | ReactWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper | ReactWrapper }
 */
export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */
const messages = require('../localization/en.json') // en.json
const defaultLocale = 'en'
const locale = defaultLocale

export function mountWithIntl(node) {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages
    }
  })
}

export function shallowWithIntl(node) {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages
    }
  })
}

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(component.propTypes, conformingProps, 'prop', component.name)
  expect(propError).toBeUndefined()
}
