import { Component } from 'react'
import { connect } from 'formik'
import deepKeys from 'deep-keys'

class ErrorFocus extends Component {
  componentDidUpdate(prevProps) {
    const { isSubmitting, isValidating, errors, initialValues, values } = prevProps.formik
    if (!Object.keys(errors).length || !Object.keys(values).length) return

    const compareKeys = (errorKeys, valuesKeys) => {
      let arrayKeys = []
      valuesKeys.forEach(val => errorKeys.forEach(err => (err === val ? arrayKeys.push(val) : null)))
      return arrayKeys
    }

    const errKeys = deepKeys(errors, true)
    const valKeys = deepKeys(values)

    const keys = compareKeys(errKeys, valKeys)

    if (keys.length > 0 && isSubmitting && !isValidating) {
      const selector = `[name="${keys[0]}"]`
      const errorElement = document.querySelector(selector)
      if (errorElement) {
        errorElement.focus()
      }
    }
  }

  render() {
    return null
  }
}

export default connect(ErrorFocus)
