import { Component } from 'react'
import { connect } from 'formik'
import deepKeys from 'deep-keys'
import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

class ErrorFocus extends Component {
  async componentDidUpdate(prevProps) {
    const { toastManager } = this.props
    const { isSubmitting, isValidating, errors, values } = prevProps.formik

    if (!Object.keys(errors).length || !Object.keys(values).length || !isSubmitting) return

    //compare errors with values because errors returns atributes in object like _owner, _store, props, etc.
    const compareKeys = (errorKeys, valuesKeys) => {
      let arrayKeys = []
      valuesKeys.forEach(val => errorKeys.forEach(err => (err === val ? arrayKeys.push(val) : null)))
      return arrayKeys
    }

    let errKeys = ''
    let valKeys = ''
    let keys = ''
    //TODO errors or values can be array (e.g. elements in Company Generate Product form) not only object
    try {
      /**
       * @description
       * Get an object, and return an array composed of it's properties names(nested too).
       * With intermediate equals to true, we include also the intermediate parent keys into the result
       * @param obj {Object}
       * @returns {Array}
       * @example
       * deepKeys({ a:1, b: { c:2, d: { e: 3 } } }) ==> ["a", "b.c", "b.d.e"]
       * @example
       * deepKeys({ b: { c:2, d: { e: 3 } } }, true) ==> ["b", "b.c", "b.d", "b.d.e"]
       */
      errKeys = await deepKeys(errors, true)
      valKeys = await deepKeys(values)
    } catch (err) {
      console.error(err)
    } finally {
      keys = compareKeys(errKeys, valKeys)
    }

    if (keys.length > 0 && isSubmitting && !isValidating) {
      const selector = `[name="${keys[0]}"]`
      const errorElement = document.querySelector(selector)
      if (errorElement) {
        errorElement.focus()
        toastManager.add(
          generateToastMarkup(
            <FormattedMessage id='global.errorValidation.title' defaultMessage='Errors on form' />,
            <FormattedMessage
              id='global.errorValidation.content'
              defaultMessage='Fields on form are incomplete/non-validating, please fix the issues first'
            />
          ),
          {
            appearance: 'warning'
          }
        )
      }
    }
  }

  render() {
    return null
  }
}

export default withToastManager(connect(ErrorFocus))
