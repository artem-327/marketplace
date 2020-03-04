import React, { Component } from 'react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage } from 'react-intl'
import { FormGroup, Header, Popup, Dropdown as SemanticDropdown, FormField, Segment } from 'semantic-ui-react'

import { ZipDropdown } from '~/modules/zip-dropdown'
import { func, string, shape, array, bool, object, oneOfType, node } from 'prop-types'

import styled from 'styled-components'

import { getProvinces } from '../api'

import { getSafe, getDeeply } from '~/utils/functions'

const DatalistGroup = styled(FormGroup)`
  input::-webkit-calendar-picker-indicator {
    opacity: 0 !important;
  }
`

const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
`

export default class AddressForm extends Component {
  state = {
    provinces: [],
    countryId: null,
    hasProvinces: false,
    provicesAreFetching: false,
    previousAddressLength: 0
  }

  fetchProvinces = async (countryId, hasProvinces) => {
    if (countryId && hasProvinces) {
      this.setState({ provincesAreFetching: true })
      let provinces = await getProvinces(countryId)
      this.setState({ provinces, hasProvinces, countryId, provincesAreFetching: false })
    }
  }

  asignPrefix = () => {
    let { prefix, streetAddress, city, country, zip, province, values, index } = this.props
    let fields = { streetAddress, city, country, zip, province }

    Object.keys(fields).forEach(key => {
      if (prefix) {
        if (index !== undefined) {
          fields[key] = `${prefix && `${prefix}`}[${index}].address.${fields[key].name}`
        } else {
          fields[key] = `${prefix && `${prefix}`}.address.${fields[key].name}`
        }
      } else {
        fields[key] = `address.${fields[key].name}`
      }
    })
    return fields
  }

  async componentDidMount() {
    let { countries } = this.props
    const { addZip } = this.props

    try {
      let { address } = this.getValues()

      if (countries.length === 0) await this.props.getCountries()
      if (address.zip) await addZip(JSON.parse(address.zip))
      let { countryId, hasProvinces } =
        address && address.country ? JSON.parse(address.country) : { countryId: null, hasProvinces: null }

      await this.fetchProvinces(countryId, hasProvinces)
    } catch (e) {
      console.error(e)
    }
  }

  handleChange = (_, { name, value }) => {
    let { addressDatalistOptions, values } = this.props
    const { getAddressSearch, setFieldValue, addZip, addressDatalistLength } = this.props

    if (!values) return

    let fields = this.asignPrefix()

    let i = addressDatalistOptions.indexOf(value)
    if (i >= 0 && setFieldValue) {
      let suggest = this.props.addressDatalistData[i]
      let { hasProvinces } = suggest.country

      this.fetchProvinces(suggest.country.id, hasProvinces)
      this.setState({ hasProvinces })
      if (suggest.zip) {
        addZip({ zip: suggest.zip.zip, id: suggest.zip.id })
      }

      setFieldValue(fields.streetAddress, suggest.streetAddress)
      setFieldValue(fields.city, suggest.city)
      setFieldValue(fields.country, JSON.stringify({ countryId: suggest.country.id, hasProvinces }))
      setFieldValue(fields.zip, suggest.zip && suggest.zip.zip)
      setFieldValue(fields.province, suggest.province ? suggest.province.id : '')
    } else {
      const parts = name.split('.')
      let newValues = { ...values, address: { ...values.address, [parts.pop()]: value } }

      const adrLength =
        getSafe(() => newValues.address.city.length, 0) +
        getSafe(() => newValues.address.streetAddress.length, 0) +
        (getSafe(newValues.address.province !== '', true) && 1)

      if (adrLength > 1 && adrLength > this.state.previousAddressLength && !addressDatalistLength) {
        this.setState({ previousAddressLength: adrLength })
        return
      } else {
        this.setState({ previousAddressLength: adrLength })

        const body = {
          city: getSafe(() => newValues.address.city),
          countryId: getSafe(() => JSON.parse(newValues.address.country).countryId),
          provinceId: getSafe(() => newValues.address.province),
          streetAddress: getSafe(() => newValues.address.streetAddress),
          zip: getSafe(() => newValues.address.zip)
        }

        if (Object.entries(body).length === 0) return
        getAddressSearch(body)
      }
    }
  }

  getOptions = values => {
    let { addressDatalistData } = this.props
    try {
      let { address } = this.getValues()
      return addressDatalistData.map(a => {
        if (a.streetAddress.startsWith(address.streetAddress) && a.city.startsWith(address.city)) {
          let element =
            a.streetAddress +
            ', ' +
            a.city +
            ', ' +
            a.zip.zip +
            ', ' +
            a.country.name +
            (a.province ? ', ' + a.province.name : '')

          return element
        }
      })
    } catch (e) {
      console.error(e)
      return []
    }
  }

  getValues = (values = this.props.values) => {
    let value = this.props.prefix ? getDeeply(this.props.prefix.split('.'), values) : values

    // TODO check wheter this works for array...

    if (value instanceof Array) return value[this.props.index]
    else return value

    // return prefix ? (values[prefix] instanceof Array ? values[prefix][this.props.index] : values[prefix]) : values
  }

  render() {
    const { setFieldValue } = this.props
    let {
      countries,
      prefix,
      initialZipCodes,
      displayHeader,
      values,
      datalistName,
      additionalCountryInputProps,
      countryPopup,
      countriesLoading,
      loading
    } = this.props

    let fields = this.asignPrefix()

    let { provinces, countryId, provincesAreFetching } = this.state
    //  TODO - check whether fluid didnt mess up ui somewhere else

    return (
      <>
        <datalist id={datalistName}>
          {this.getOptions(values)
            .filter(el => el !== null)
            .map((el, i) => (
              <option key={i} value={el} />
            ))}
        </datalist>
        {displayHeader && (
          <Header as='h3'>
            <FormattedMessage id='global.address' defaultMessage='Address' />
          </Header>
        )}
        <CustomSegment>
          <DatalistGroup widths='equal' data-test='address_form_streetCity_inp'>
            <Input
              inputProps={{
                onFocus: e => (e.target.autocomplete = null),
                icon: 'dropdown',
                list: datalistName,
                onChange: this.handleChange,
                fluid: true,
                loading
              }}
              label={<FormattedMessage id='global.streetAddress' defaultMessage='Street Address' />}
              name={fields.streetAddress}
            />

            <Input
              inputProps={{
                onFocus: e => (e.target.autocomplete = null),
                icon: 'dropdown',
                list: datalistName,
                onChange: this.handleChange,
                fluid: true,
                loading
              }}
              label={<FormattedMessage id='global.city' defaultMessage='City' />}
              name={fields.city}
            />
          </DatalistGroup>
          <FormGroup widths='equal'>
            <ZipDropdown
              onAddition={(e, data) => setFieldValue(fields[this.props.zip.name], data.value)}
              onChange={this.handleChange}
              additionalInputProps={{ loading }}
              name={fields.zip}
              countryId={countryId}
              initialZipCodes={initialZipCodes}
              data-test='address_form_zip_drpdn'
            />
            <FormField name={fields.country}>
              <Popup
                trigger={
                  <label>
                    <FormattedMessage id='global.country' defaultMessage='Country' />
                  </label>
                }
                disabled={countryPopup.disabled}
                content={countryPopup.content}
              />

              <Dropdown
                name={fields.country}
                options={countries.map(country => ({
                  key: country.id,
                  text: country.name,
                  value: JSON.stringify({ countryId: country.id, hasProvinces: country.hasProvinces })
                }))}
                inputProps={{
                  loading: countriesLoading,
                  onFocus: e => (e.target.autocomplete = null),
                  'data-test': 'address_form_country_drpdn',
                  search: true,
                  onChange: async (e, data) => {
                    let values = JSON.parse(data.value)
                    // let fieldName = prefix ? `${prefix.province}` : 'address.province'

                    setFieldValue(fields[this.props.province.name], '')

                    // this.handleChange(e, data)
                    this.setState({ hasProvinces: values.hasProvinces })
                    if (values.hasProvinces) {
                      this.fetchProvinces(values.countryId, values.hasProvinces)
                    }
                  },
                  ...additionalCountryInputProps
                }}
              />
            </FormField>

            <Dropdown
              label={<FormattedMessage id='global.stateProvince' defaultMessage='State/Province' />}
              name={fields.province}
              options={provinces.map(province => ({
                key: province.id,
                text: province.name,
                value: province.id
              }))}
              inputProps={{
                onFocus: e => (e.target.autocomplete = null),
                'data-test': 'address_form_province_drpdn',
                search: true,
                disabled: !this.state.hasProvinces,
                loading: provincesAreFetching,
                onChange: this.handleChange
              }}
            />
          </FormGroup>
        </CustomSegment>
      </>
    )
  }
}

AddressForm.propTypes = {
  setFieldValue: func,
  onChange: func,
  countries: array,
  prefix: string,
  datalistName: string,
  displayHeader: bool,
  streetAddress: shape({
    name: string.isRequired
  }),
  city: shape({
    name: string.isRequired
  }),
  country: shape({
    name: string.isRequired
  }),
  zip: shape({
    name: string.isRequired
  }),
  province: shape({
    name: string.isRequired
  }),
  countryPopup: shape({
    disabled: bool,
    content: oneOfType([string, node])
  }),
  initialZipCodes: array,
  additionalCountryInputProps: object,
  fixedCountries: array,
  handleChange: func
}

AddressForm.defaultProps = {
  setFieldValue: () => console.warn('setFieldValue not supplied in AddressForm.jsx!'),
  onChange: () => {},
  prefix: null,
  datalistName: 'addresses',
  countries: [],
  displayHeader: true,
  streetAddress: {
    name: 'streetAddress'
  },
  city: {
    name: 'city'
  },
  country: {
    name: 'country'
  },
  zip: {
    name: 'zip'
  },
  province: {
    name: 'province'
  },
  countryPopup: {
    disabled: true,
    content: ''
  },

  //  TODO - implement support for more field popups if needed...

  initialZipCodes: [],
  values: null,
  additionalCountryInputProps: {},
  fixedCountries: [],
  handleChange: () => console.error('handleChange function not provided in AddressForm.jsx!')
}
