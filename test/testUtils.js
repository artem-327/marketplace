import React from 'react'
import { createStore, Store, applyMiddleware } from 'redux'
import { ShallowWrapper, mount, shallow, ReactWrapper } from 'enzyme'
import { IntlProvider } from 'react-intl'
import checkPropTypes from 'check-prop-types'

import { middlewares } from '../store'

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * @function storeFactory
 * @param {function} reducer - Reducer
 * @param {object} initialState - Initial state for store
 * @returns {Store} - Redux store
 */
export const storeFactory = (reducer, initialState) => {
  return createStore(reducer, initialState, applyMiddleware(...middlewares))
}

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
 * These helper functions (mountWithIntl and shallowWithIntl) aim to address that and wrap a valid,
 * English-locale intl context around them.
 */
const messages = require('../localization/en.json') // en.json
const defaultLocale = 'en'
const locale = defaultLocale
/**
 * Function renders the full DOM including the child components of the parent component that we are running the tests.
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} node
 * @returns {ReactWrapper}
 */
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
/**
 * Function is used to render the single component that we are testing. It does not render child components.
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} node
 * @returns {ShallowWrapper}
 */
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
/**
 * It checks types props in my components.
 * @test
 * @method
 * @param {*} component
 * @param {object} conformingProps
 */
export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(component.propTypes, conformingProps, 'prop', component.name, () => {})
  expect(propError).toBeUndefined()
}
