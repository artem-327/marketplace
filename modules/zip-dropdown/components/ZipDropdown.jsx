import React, { Component } from 'react'
import { Dropdown } from 'formik-semantic-ui'
import { bool, func, object, string, array } from 'prop-types'
import { debounce } from 'lodash'
import { FormattedMessage } from 'react-intl'

export default class ZipDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null
    }

    this.debouncedRef = debounce(this.debouncedCallback, 250)
  }
  handleAddition = (e, data) => {
    let { onAddition, addZip } = this.props

    addZip(data.value)
    this.handleChange(e, data)


    onAddition(e, data)
  }

  debouncedCallback = (e, { searchQuery }) => {
    let params = {
      limit: 5,
      pattern: searchQuery,
    }

    if (this.props.countryId) params.countryId = this.props.countryId

    this.props.getZipCodes(params)

  }

  handleChange = (e, { value }) => this.setState({ value })


  render() {
    let {
      selection,
      search,
      allowAdditions,
      codes,
      additionalInputProps,
      name,
      loading,
      label } = this.props


    return (
      <Dropdown
        name={name}
        options={codes}
        label={label}
        inputProps={{
          onChange: this.handleChange,
          onSearchChange: (e, data) => {
            this.props.onSearchChange(e, data)
            this.debouncedRef(e, data)
          },
          loading,
          selection,
          value: this.state.value,
          search,
          allowAdditions,
          onAddItem: this.handleAddition,
          ...additionalInputProps
        }}
      />
    )
  }
}

ZipDropdown.propTypes = {
  selection: bool,
  search: bool,
  allowAdditions: bool,
  onAddition: func,
  name: string.isRequired,
  additionalInputProps: object,
  codes: array,
  label: string,
  onAddition: func,
  handleChange: func,
  onSearchChange: func,
  countryId: string
}

ZipDropdown.defaultProps = {
  selection: true,
  search: true,
  allowAdditions: true,
  codes: [],
  onAddition: (e, data) => { },
  handleChange: (e, data) => { },
  onSearchChange: (e, data) => { },
  label: <FormattedMessage id='global.zip' defaultMessage='Zip' />
}