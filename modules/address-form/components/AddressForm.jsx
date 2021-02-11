import { Component } from 'react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormGroup, Header, Popup, Dropdown as SemanticDropdown, FormField, Segment } from 'semantic-ui-react'

import { ZipDropdown } from '~/modules/zip-dropdown'
import { func, string, shape, array, bool, object, oneOfType, node } from 'prop-types'

import styled from 'styled-components'

import { getProvinces } from '../api'

import { getSafe, getDeeply } from '~/utils/functions'
import { Required } from '~/components/constants/layout'

const DatalistGroup = styled(FormGroup)`
  input::-webkit-calendar-picker-indicator {
    opacity: 0 !important;
  }
`

const CustomSegment = styled(Segment)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${({ noBorder }) =>
    noBorder
      ? `
    border: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    padding: 0px !important;
  `
      : ''};
`

class AddressForm extends Component {
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
    let values = this.getValues()
    if (!values || (values && !values.address)) return
    let { address } = values
    if (!address) return
    try {
      if (countries.length === 0) await this.props.getCountries()
      if (address.zip) await addZip(JSON.parse(address.zip))
      let { countryId, hasProvinces } =
        address && address.country ? JSON.parse(address.country) : { countryId: null, hasProvinces: null }

      await this.fetchProvinces(countryId, hasProvinces)
    } catch (e) {
      console.error(e)
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { addZip } = this.props
    const values = this.getValues()
    const oldValues = this.getValues(prevProps.values)

    const country = values && values.address && values.address.country
    const oldCountry = oldValues && oldValues.address && oldValues.address.country
    if (
      values.id !== oldValues.id ||
      getSafe(() => values.address.id, '') !== getSafe(() => oldValues.address.id, '')
    ) {
      if (getSafe(() => values.address.zip, '')) await addZip(JSON.parse(values.address.zip))
    }
    if (country && country !== oldCountry) {
      const parsed = JSON.parse(country)

      this.setState({ hasProvinces: parsed.hasProvinces })
      if (parsed.hasProvinces) {
        this.fetchProvinces(parsed.countryId, parsed.hasProvinces)
      }
    }
  }

  handleChange = (_, { name, value }) => {
    let { addressDatalistOptions, values, searchEnabled } = this.props
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
      } else if (searchEnabled) {
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
      let value = this.getValues()
      return addressDatalistData.map(a => {
        if (
          a.streetAddress.startsWith(getSafe(() => value.address.streetAddress, '')) &&
          a.city.startsWith(getSafe(() => value.address.city, ''))
        ) {
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
      loading,
      required,
      searchEnabled,
      children,
      intl: { formatMessage },
      customHeader,
      backgroundColor,
      noBorder
    } = this.props

    let fields = this.asignPrefix()

    // this.handleChange(e, data)

    let { provinces, countryId, provincesAreFetching, hasProvinces } = this.state
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
        {customHeader
          ? customHeader
          : displayHeader && (
              <Header as='h3'>
                <FormattedMessage id='global.address' defaultMessage='Address' />
              </Header>
            )}
        <CustomSegment noBorder={noBorder} bacgroundColor={backgroundColor}>
          {children}
          <DatalistGroup widths='equal' data-test='address_form_streetCity_inp'>
            <Input
              inputProps={{
                onFocus: e => (e.target.autocomplete = null),
                list: datalistName,
                onChange: this.handleChange,
                fluid: true,
                loading,
                placeholder: formatMessage({ id: 'global.address.enterStreet', defaultMessage: 'Enter Street' })
              }}
              label={
                <>
                  <FormattedMessage id='global.streetAddress' defaultMessage='Street Address' />
                  {required && <Required />}
                </>
              }
              name={fields.streetAddress}
            />
          </DatalistGroup>

          <FormGroup widths='equal'>
            <Dropdown
              label={
                <Popup
                  trigger={
                    <label>
                      <FormattedMessage id='global.country' defaultMessage='Country' />
                      {required && <Required />}
                    </label>
                  }
                  disabled={countryPopup.disabled}
                  content={countryPopup.content}
                />
              }
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
                  // let fieldName = prefix ? `${prefix.province}` : 'address.province'

                  setFieldValue(fields[this.props.province.name], '')
                },
                placeholder: formatMessage({ id: 'global.address.selectCountry', defaultMessage: 'Select Country' }),
                ...additionalCountryInputProps
              }}
            />

            <Dropdown
              label={
                <>
                  <FormattedMessage id='global.stateProvince' defaultMessage='State/Province' />
                  {required && hasProvinces && <Required />}
                </>
              }
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
                onChange: this.handleChange,
                placeholder: formatMessage({
                  id: 'global.address.selectStateProvince',
                  defaultMessage: 'Select State/Province'
                })
              }}
            />
          </FormGroup>

          <DatalistGroup widths='equal'>
            <Input
              inputProps={{
                onFocus: e => (e.target.autocomplete = null),
                list: datalistName,
                onChange: this.handleChange,
                fluid: true,
                loading,
                placeholder: formatMessage({ id: 'global.address.selectCity', defaultMessage: 'Select City' })
              }}
              label={
                <>
                  <FormattedMessage id='global.city' defaultMessage='City' />
                  {required && <Required />}
                </>
              }
              name={fields.city}
            />
            <ZipDropdown
              onAddition={(e, data) => setFieldValue(fields[this.props.zip.name], data.value)}
              onChange={this.handleChange}
              additionalInputProps={{
                icon: null,
                placeholder: formatMessage({ id: 'global.address.enterZip', defaultMessage: 'Enter Zip' })
              }}
              name={fields.zip}
              required={required}
              countryId={countryId}
              initialZipCodes={initialZipCodes}
              data-test='address_form_zip_drpdn'
            />
          </DatalistGroup>
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
  handleChange: func,
  required: bool,
  searchEnabled: bool,
  customHeader: oneOfType([string, node]),
  backgroundColor: string
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
  handleChange: () => console.error('handleChange function not provided in AddressForm.jsx!'),
  required: false,
  searchEnabled: true,
  customHeader: '',
  backgroundColor: '#f8f9fb !important'
}

export default injectIntl(AddressForm)
