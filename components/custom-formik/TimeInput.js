import React, { Component } from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { Field, getIn} from 'formik'
import { getSafe } from '~/utils/functions'
import { getFieldError, setFieldValue } from './helpers'
import { Form } from 'semantic-ui-react'
import moment from 'moment/moment'
import { TimeInput as SemanticTimeInput } from 'semantic-ui-calendar-react'

export const FieldWrapper = styled(Form.Field)`
  > .field-label {
    margin: 0em 0em 0.428571429em 0em;
  }
  
  .field.input-time .ui.input {
    input {
      width: 120px !important;
    }
  }  
`

export default class TimeInput extends Component {
  state = {
    timeValue: '',
    timeEntered: '',
    hour12: false
  }

  getFormattedTime = (time) => {
    const time24h = moment(time.trim(), ['hh:mm a', 'HH:mm'])
    if (!time24h.isValid()) return time
    if (this.state.hour12) return time24h.format('hh:mm A')
    else return time24h.format('HH:mm')
  }

  getTimeIn24hFormat = (time) => {
    const time24h = moment(time.trim(), ['hh:mm a', 'HH:mm'])
    if (time24h.isValid()) return time24h.format('HH:mm')
    else return false
  }

  componentDidMount() {
    const locale = (navigator && navigator.language.split('-') || ['en'])[0]
    const hour12 = new Intl.DateTimeFormat(locale, {hour: 'numeric'}).resolvedOptions().hour12

    this.setState({
      timeValue: this.field.value,
      timeEntered: this.getFormattedTime(this.field.value),
      hour12
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const value = this.field.value
    if (value !== this.state.timeValue && this.state.timeEntered === prevState.timeEntered) {
      this.setState({
        timeValue: value,
        timeEntered: this.getFormattedTime(value)
      })
    }
  }

  render() {
    const { name, label, validate, inputProps = {}, fieldProps = {} } = this.props
    const { onChange, ...safeInputProps } = inputProps
    let { timeEntered, hour12 } = this.state

    return (
      <Field
        name={name}
        validate={validate}
        render={({ field, form }) => {
          this.field = field
          this.form = form
          const error = getFieldError(field, form)
          return (
            <FieldWrapper error={!!error} {...fieldProps}>
              {!!label && (<div className='field-label'>{label}</div>)}
              <SemanticTimeInput
                className='input-time'
                name={name}
                closable
                clearable
                value={timeEntered}
                placeholder={hour12 ? '00:00 AM' : '00:00'}
                {...safeInputProps}
                animation='none'
                icon={false}
                onChange={(e, { name, value }) => {
                  let time24h = this.getTimeIn24hFormat(value)
                  time24h = time24h ? time24h : value

                  this.setState({ timeEntered: value, timeValue: time24h })
                  setFieldValue(form, name, time24h, true)

                  Promise.resolve().then(() => {
                    onChange && onChange(e, { name, time24h })
                  })
                }}
                onBlur={form.handleBlur}
                localization={typeof navigator !== 'undefined' ? window.navigator.language.slice(0, 2) : 'en'}
                timeFormat={hour12 ? 'AMPM' : '24'}
              />
              {error && <span className='sui-error-message'>{getIn(form.errors, name)}</span>}
            </FieldWrapper>
          )
        }}
      />
    )
  }
}

TimeInput.propTypes = {
  name: string,
}

TimeInput.defaultProps = {
  label: ''
}