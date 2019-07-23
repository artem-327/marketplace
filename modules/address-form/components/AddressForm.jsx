import React, { Component } from 'react'
import { Input, Dropdown } from 'formik-semantic-ui'
import { FormattedMessage } from 'react-intl'
import { FormGroup, Header } from 'semantic-ui-react'

import { ZipDropdown } from '~/modules/zip-dropdown'
import { func, string, shape, array, bool } from 'prop-types'

import styled from 'styled-components'


import { getProvinces } from '../api'

import { getSafe } from '~/utils/functions'

const DatalistGroup = styled(FormGroup)`
  input::-webkit-calendar-picker-indicator {
    opacity: 0 !important;
  }
`


export default class AddressForm extends Component {
  state = {
    provinces: [],
    countryId: null,
    hasProvinces: false,
    provicesAreFetching: false
  }

  fetchProvinces = async (countryId, hasProvinces) => {
    if (countryId && hasProvinces) {
      this.setState({ provincesAreFetching: true })
      let provinces = await getProvinces(countryId)
      this.setState({ provinces, hasProvinces, countryId, provincesAreFetching: false })
    }
  }

  componentDidMount() {
    let { countries, values, prefix } = this.props
    const { addZip } = this.props
    let { address } = prefix ? values[prefix] : values

    if (countries.length === 0) this.props.getCountries()
    if (address.zip) addZip({ zip: address.zip, id: address.zip })
    try {
      let { countryId, hasProvinces } = JSON.parse(getSafe(() => address.country, { countryId: null, hasProvinces: null }))

      this.fetchProvinces(countryId, hasProvinces)
    } catch { }
  }

  handleChange = (_, { name, value }) => {
    let { prefix, addressDatalistOptions, values, streetAddress, city, country, zip, province } = this.props
    const { getAddressSearch, setFieldValue, addZip } = this.props

    if (!values) return

    let fields = { streetAddress, city, country, zip, province }
    Object.keys(fields).forEach(key => fields[key] = `${prefix && `${prefix}.`}address.${fields[key].name}`)


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
    }
    else {
      let newValues = { ...values, address: { ...values.address, [name]: value } }
      const body = {
        city: getSafe(() => newValues.address.city),
        countryId: getSafe(() => JSON.parse(newValues.address.country).countryId),
        provinceId: getSafe(() => newValues.address.province),
        streetAddress: getSafe(() => newValues.address.streetAddress),
        zip: newValues.address.zip
      }

      if (Object.entries(body).length === 0) return
      getAddressSearch(body)
    }
  }


  getOptions = (values) => {
    let { prefix, addressDatalistData } = this.props
    
    let { address } = prefix ? values[prefix] : values

    return addressDatalistData.map((a) => {
      if (a.streetAddress.startsWith(address.streetAddress) && a.city.startsWith(address.city)) {

        let element = a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')

        return element
      }

      return null
    })
  }


  render() {
    const { setFieldValue } = this.props
    let {
      streetAddress, city, country,
      zip, province, countries, prefix,
      initialZipCodes, addressDatalist, displayHeader,
      values, datalistName
    } = this.props


    let fields = { streetAddress, city, country, zip, province }

    Object.keys(fields).forEach(key => fields[key] = `${prefix && `${prefix}.`}address.${fields[key].name}`)


    let { provinces, countryId, provincesAreFetching } = this.state


    return (
      <>
        <datalist id={datalistName}>
          {this.getOptions(values).filter((el) => el !== null).map((el, i) => <option key={i} value={el} />)}
        </datalist >
        {displayHeader && <Header as='h3'><FormattedMessage id='global.address' defaultMessage='Address' /></Header>}
        <DatalistGroup widths='equal'>
          <Input
            inputProps={{ icon: 'dropdown', list: datalistName, onChange: this.handleChange }}
            label={<FormattedMessage id='global.streetAddress' defaultMessage='Street Address' />}
            name={fields.streetAddress}
          />
          <Input
            inputProps={{ icon: 'dropdown', list: datalistName, onChange: this.handleChange }}
            label={<FormattedMessage id='global.city' defaultMessage='City' />}
            name={fields.city}
          />
        </DatalistGroup>
        <FormGroup widths='equal'>
          <ZipDropdown
            onChange={this.handleChange}
            name={fields.zip} countryId={countryId} initialZipCodes={initialZipCodes}
          />
          <Dropdown label={<FormattedMessage id='global.country' defaultMessage='Country' />} name={fields.country}
            options={countries.map((country) => ({
              key: country.id,
              text: country.name,
              value: JSON.stringify({ countryId: country.id, hasProvinces: country.hasProvinces })
            }))}
            inputProps={{
              search: true, onChange: async (e, data) => {
                let values = JSON.parse(data.value)

                setFieldValue(`${prefix}.province`, '')

                this.handleChange(e, data)
                this.fetchProvinces(values.countryId, values.hasProvinces)
              }
            }} />
          <Dropdown label={<FormattedMessage id='global.stateProvince' defaultMessage='State/Province' />}
            name={fields.province} options={provinces.map((province) => ({
              key: province.id,
              text: province.name,
              value: province.id
            }))}
            inputProps={{
              search: true, disabled: !this.state.hasProvinces,
              loading: provincesAreFetching, onChange: this.handleChange
            }} />
        </FormGroup>
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
    name: string.isRequired,
  }),
  city: shape({
    name: string.isRequired,
  }),
  country: shape({
    name: string.isRequired,
  }),
  zip: shape({
    name: string.isRequired
  }),
  province: shape({
    name: string.isRequired
  }),
  initialZipCodes: array
}

AddressForm.defaultProps = {
  setFieldValue: () => console.warn('setFieldValue not supplied in AddressForm.jsx!'),
  onChange: () => { },
  prefix: null,
  datalistName: 'addresses',
  countries: [],
  displayHeader: true,
  streetAddress: {
    name: 'streetAddress',
  },
  city: {
    name: 'city',
  },
  country: {
    name: 'country',
  },
  zip: {
    name: 'zip'
  },
  province: {
    name: 'province'
  },
  initialZipCodes: [],
  values: null
}



