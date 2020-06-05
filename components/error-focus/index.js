import { Component } from 'react'
import { connect } from 'formik'

class ErrorFocus extends Component {
  componentDidUpdate(prevProps) {
    const { isSubmitting, isValidating, errors, initialValues, values } = prevProps.formik

    const keyify = (obj, prefix = '') =>
      Object.keys(obj).reduce((res, el) => {
        if (Array.isArray(obj[el])) {
          return res
        } else if (typeof obj[el] === 'object' && obj[el] !== null) {
          return [...res, ...keyify(obj[el], prefix + el + '.')]
        } else {
          return [...res, prefix + el]
        }
      }, [])
    let errorsObj = {}
    Object.keys(errors).forEach(err => (values[err] !== null ? (errorsObj[err] = values[err]) : null))
    const keys = keyify(errorsObj)
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
