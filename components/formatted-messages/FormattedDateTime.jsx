import React, { Component } from 'react'
import { FormattedDate, FormattedTime } from 'react-intl'
import { string } from 'prop-types'

export default class FormattedDateTime extends Component {

  render() {
    let { dateTime, separator } = this.props

    let [date] = dateTime.split(separator)

    return (
      <>
        <FormattedDate value={date} /> <FormattedTime value={new Date(dateTime)} />
      </>
    )
  }
}


FormattedDateTime.propTypes = {
  dateTime: string.isRequired,
  separator: string
}

FormattedDateTime.defaultProps = {
  separator: 'T'
}