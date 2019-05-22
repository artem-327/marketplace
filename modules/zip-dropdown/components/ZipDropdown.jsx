import React, { Component } from 'react'
import { Dropdown } from 'formik-semantic-ui'
import { bool, func, object, string, array, number } from 'prop-types'
import { debounce } from 'lodash'

export default class ZipDropdown extends Component {
  constructor(props) {
    super(props)

    this.debouncedRef = debounce(this.debouncedCallback, 250)
  }
  handleAddition = (e, data) => {
    let { onAddition } = this.props

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
  countryId: number
}

ZipDropdown.defaultProps = {
  selection: true,
  search: true,
  allowAdditions: true,
  codes: [],
  onAddition: (e, data) => { },
  handleChange: (e, data) => { },
  onSearchChange: (e, data) => { },
  label: 'Zip'
}