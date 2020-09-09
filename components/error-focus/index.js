import { Component } from 'react'
import { connect } from 'formik'
import deepKeys from 'deep-keys'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

class ErrorFocus extends Component {
  async componentDidUpdate(prevProps) {
    const { toastManager } = this.props
    const { isSubmitting, isValidating, errors, values } = prevProps.formik

    if (!Object.keys(errors).length || !Object.keys(values).length || !isSubmitting) return

    let errNames = []

    const getErrNames = (errors, path = '') => {
      const errKeys = Object.keys(errors)
      errKeys.forEach(key => {
        const error = errors[key]
        if (Array.isArray(error)) {
          error.forEach((err, index) => {
            if (err) getErrNames(err, `${path}${key}[${index}].`)
          })
        } else {
          if (typeof error === 'object' && error !== null) {
            const nestedKeys = Object.keys(error)
            if (nestedKeys && nestedKeys.includes('$$typeof')) {
              errNames.push(`${path}${key}`)
            } else {
              getErrNames(error, `${path}${key}.`)
            }
          }
        }
      })
    }

    getErrNames(errors)

    if (errNames.length > 0 && isSubmitting && !isValidating) {
      const selector = `[name="${errNames[0]}"]`

      let errorElement = document.querySelector(selector)
      if (
        errorElement &&
        errorElement.tagName !== 'INPUT' &&
        getSafe(() => errorElement.getElementsByTagName('input').length, false)
      ) {
        errorElement = errorElement.getElementsByTagName('input')[0]
      }

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
      if (errorElement) {
        errorElement.focus()
      }
    }
  }

  render() {
    return null
  }
}

export default withToastManager(connect(ErrorFocus))
