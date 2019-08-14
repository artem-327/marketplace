import React, { Component } from 'react'
import { FormattedDate, FormattedTime } from 'react-intl'
import { string } from 'prop-types'

export default class FormattedDateTime extends Component {

  render() {
    let { dateTime, separator } = this.props

    return (
      dateTime ? (
      <>
        <FormattedDate value={dateTime.split(separator)[0]} /> <FormattedTime value={new Date(dateTime)} />
      </>
      ) : null

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