import { Component } from 'react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormGroup, Header, Popup, Dropdown as SemanticDropdown, FormField, Segment, Icon } from 'semantic-ui-react'

import { ZipDropdown } from '~/modules/zip-dropdown'
import { func, string, shape, array, bool, object, oneOfType, node, any } from 'prop-types'

import styled from 'styled-components'

import { getProvinces } from '../api'
import get from 'lodash/get'
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

const InfoIconStyled = styled(Icon)`
  margin: 0 0 0 5px !important;
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
      return provinces
    }
    return []
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

  isJSON = text => {
    try {
      JSON.parse(text)
    } catch {
      return false
    }
    return true
  }

  async componentDidMount() {
    let { countries, countriesLoading, useStringCountryState, setFieldValue } = this.props
    const { addZip } = this.props
    let fields = this.asignPrefix()

    let values = this.getValues()
    //if (!values || (values && !values.address)) return
    //let { address } = values
    //if (!address) return

    const zip = get(this.props.values, fields.zip)
    const country = get(this.props.values, fields.country)

    try {
      if (countries.length === 0 && !countriesLoading) await this.props.getCountries()
      if (zip) {
        if (this.isJSON(zip)) addZip(JSON.parse(zip))
        else addZip(zip)
      }
      if (useStringCountryState) {
        const searchedCountry = country
          ? countries.find(el => el.name === country)
          : null
        if (searchedCountry) {
          const provinces = await this.fetchProvinces(searchedCountry.id, searchedCountry.hasProvinces)
          this.setState({ hasProvinces: searchedCountry.hasProvinces })
          if (searchedCountry.hasProvinces) {

            const provinceValue = get(this.props.values, fields.province)
            if (provinces.length && !provinces.some(el => el.name === provinceValue)) {
              const searchedProvince = provinces.find(el => el.abbreviation === provinceValue)
              if (searchedProvince) {
                setFieldValue(fields.province, searchedProvince.name)
              }
            }
          }
        }
      } else {
        let { countryId, hasProvinces } =
          country ? JSON.parse(country) : { countryId: null, hasProvinces: null }

        this.setState({ hasProvinces: hasProvinces })
        await this.fetchProvinces(countryId, hasProvinces)
      }
    } catch (e) {
      console.error(e)
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { addZip, countries, useStringCountryState, setFieldValue } = this.props
    let fields = this.asignPrefix()
    const values = this.getValues()
    const oldValues = this.getValues(prevProps?.values)

    const country = get(this.props.values, fields.country)
    const oldCountry = get(prevProps.values, fields.country)
    if (
      this.props.values?.id !== prevProps.values?.id ||
      getSafe(() => values.address.id, '') !== getSafe(() => oldValues.address.id, '')
    ) {
      if (get(this.props.values, fields.zip)) {
        if (this.isJSON(this.props.values, fields.zip)) await addZip(JSON.parse(this.props.values, fields.zip))
        else await addZip(this.props.values, fields.zip)
      }
    }
    if (country && country !== oldCountry) {
      let parsed
      if (useStringCountryState) {
        const searchedCountry = country
          ? countries.find(el => el.name === country)
          : null
        if (searchedCountry) {
          this.setState({ hasProvinces: searchedCountry.hasProvinces })
          if (searchedCountry.hasProvinces) {
            const provinces = await this.fetchProvinces(searchedCountry.id, searchedCountry.hasProvinces)
            const provinceValue = get(this.props.values, fields.province)
            if (provinces.length && !provinces.some(el => el.name === provinceValue)) {
              const searchedProvince = provinces.find(el => el.abbreviation === provinceValue)
              if (searchedProvince) {
                setFieldValue(fields.province, searchedProvince.name)
              }
            }

          }
        }
      } else {
        parsed = JSON.parse(country)
        this.setState({ hasProvinces: parsed.hasProvinces })
        if (parsed.hasProvinces) {
          this.fetchProvinces(parsed.countryId, parsed.hasProvinces)
        }
      }
    }
  }

  handleChange = (_, { name, value }) => {
    let { addressDatalistOptions, values, searchEnabled } = this.props
    const { getAddressSearch, setFieldValue, addZip, addressDatalistLength, useStringCountryState } = this.props

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
      if (useStringCountryState) {
        setFieldValue(fields.country, suggest.country.name)
        setFieldValue(fields.province, suggest.province ? suggest.province.name : '')
      } else {
        setFieldValue(fields.country, JSON.stringify({countryId: suggest.country.id, hasProvinces}))
        setFieldValue(fields.province, suggest.province ? suggest.province.id : '')
      }
      setFieldValue(fields.zip, suggest.zip && suggest.zip.zip)
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
        if (!useStringCountryState) {
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
    let value = this.props.prefix ? eval('values.' + this.props.prefix) : values
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
      noBorder,
      disableCountry,
      disableProvince,
      countryHint,
      provinceHint,
      useStringCountryState
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
                'data-test': `${prefix}-street-address`,
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
                      {countryHint && (
                        <Popup
                          trigger={<span><InfoIconStyled color='blue' name='info circle' /></span>}
                          content={countryHint}
                        />
                      )}
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
                value: useStringCountryState
                  ? country.name
                  : JSON.stringify({ countryId: country.id, hasProvinces: country.hasProvinces })
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
                ...additionalCountryInputProps,
                disabled: additionalCountryInputProps.disabled || disableCountry
              }}
            />

            <Dropdown
              label={
                <>
                  <FormattedMessage id='global.stateProvince' defaultMessage='State/Province' />
                  {provinceHint && (
                    <Popup
                      trigger={<span><InfoIconStyled color='blue' name='info circle' /></span>}
                      content={provinceHint}
                    />
                  )}
                  {required && hasProvinces && <Required />}
                </>
              }
              name={fields.province}
              options={provinces.map(province => ({
                key: province.id,
                text: province.name,
                value: useStringCountryState ? province.name : province.id
              }))}
              inputProps={{
                onFocus: e => (e.target.autocomplete = null),
                'data-test': `${prefix}-state-province`,
                search: true,
                disabled: !this.state.hasProvinces || disableProvince,
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
                'data-test': `${prefix}-city`,
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
                placeholder: formatMessage({ id: 'global.address.enterZipCode' })
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
  backgroundColor: string,
  disableCountry: bool,
  disableProvince: bool,
  countryHint: any,
  provinceHint: any,
  useStringCountryState: bool
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
  backgroundColor: '#f8f9fb !important',
  disableCountry: false,
  disableProvince: false,
  countryHint: null,
  provinceHint: null,
  useStringCountryState: false
}

export default injectIntl(AddressForm)
