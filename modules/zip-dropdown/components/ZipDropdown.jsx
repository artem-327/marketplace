import { Component } from 'react'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'
import { bool, func, object, string, array, number } from 'prop-types'
import { debounce } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Required } from '~/components/constants/layout'

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

    addZip({ zip: data.value, id: data.value })
    this.handleChange(e, data)

    onAddition(e, data)
  }

  debouncedCallback = (e, { searchQuery }) => {
    let params = {
      limit: 5,
      pattern: searchQuery
    }

    if (this.props.countryId) params.countryId = this.props.countryId

    this.props.getZipCodes(params)
  }

  handleChange = (e, data) => {
    this.setState({ value: data.value })
    this.props.onChange(e, data)
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
      label,
      required,
      initialZipCodes
    } = this.props

    return (
      <Dropdown
        name={name}
        options={codes.concat(initialZipCodes)}
        label={
          <>
            {label}
            {required && <Required />}
          </>
        }
        inputProps={{
          'data-test': 'zip-code',
          // onChange: this.handleChange,
          onSearchChange: (e, data) => {
            this.props.onSearchChange(e, data)
            this.debouncedRef(e, data)
          },
          onFocus: e => (e.target.autocomplete = null),
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
  handleChange: func,
  onSearchChange: func,
  countryId: number,
  initialZipCodes: array,
  onChange: func,
  required: bool
}

ZipDropdown.defaultProps = {
  selection: true,
  search: true,
  allowAdditions: true,
  codes: [],
  onAddition: (e, data) => {},
  handleChange: (e, data) => {},
  onSearchChange: (e, data) => {},
  label: <FormattedMessage id='global.zipCode' />,
  initialZipCodes: [],
  onChange: () => {},
  required: false
}
