/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Component } from 'react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FormGroup, Header, Popup, Dropdown as SemanticDropdown, FormField, Segment, Icon } from 'semantic-ui-react'

import { ZipDropdown } from '~/modules/zip-dropdown'
import { func, string, shape, array, bool, object, oneOfType, node, any } from 'prop-types'

import styled from 'styled-components'

import { getProvinces } from '../api'

import { getSafe, getDeeply } from '~/utils/functions'
import { Required } from '~/components/constants/layout'

// Hooks
import { usePrevious } from '../../../hooks'

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

const AddressForm = props => {
  const [provinces, setProvinces] = useState([])
  const [countryId, setCountryId] = useState(null)
  const [hasProvinces, setHasProvinces] = useState(false)
  const [provincesAreFetching, setProvicesAreFetching] = useState(false)
  const [previousAddressLength, setPreviousAddressLength] = useState(0)

  const prevProps = usePrevious(props)

  const fetchProvinces = async (countryId, hasProvinces) => {
    if (countryId && hasProvinces) {
      setProvicesAreFetching(true)
      let provinces = await getProvinces(countryId)
      setProvinces(provinces)
      setProvicesAreFetching(false)
    }
  }

  const asignPrefix = () => {
    let { prefix, streetAddress, city, country, zip, province, values, index } = props
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

  const isJSON = text => {
    try {
      JSON.parse(text)
    } catch {
      return false
    }
    return true
  }

  const getValues = (values = props.values) => {
    let value = props.prefix ? eval('values.' + props.prefix) : values
    // TODO check wheter this works for array...
    if (value instanceof Array) return value[props.index]
    else return value

    // return prefix ? (values[prefix] instanceof Array ? values[prefix][props.index] : values[prefix]) : values
  }

  useEffect(async () => {
    let { countries, countriesLoading } = props
    const { addZip } = props
    let values = getValues()
    if (!values || (values && !values.address)) return
    let { address } = values
    if (!address) return
    try {
      if (countries.length === 0 && !countriesLoading) await props.getCountries()
      if (address.zip) {
        if (isJSON(address.zip)) await addZip(JSON.parse(address.zip))
        else await addZip(address.zip)
      }
      let { countryId, hasProvinces } =
        address && address.country ? JSON.parse(address.country) : { countryId: null, hasProvinces: null }

      await fetchProvinces(countryId, hasProvinces)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(async () => {
    const { addZip } = props
    const values = getValues()
    const oldValues = getValues(prevProps?.values)

    const country = values && values.address && values.address.country
    const oldCountry = oldValues && oldValues.address && oldValues.address.country

    if (
      values?.id !== oldValues?.id ||
      getSafe(() => values.address.id, '') !== getSafe(() => oldValues.address.id, '')
    ) {
      if (getSafe(() => values.address.zip, '')) await addZip(JSON.parse(values.address.zip))
    }
    if (country && country !== oldCountry) {
      const parsed = JSON.parse(country)
      setHasProvinces(parsed.hasProvinces)
      if (parsed.hasProvinces) {
        try {
          fetchProvinces(parsed.countryId, parsed.hasProvinces)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [prevProps])

  const handleChange = (_, { name, value }) => {
    let { addressDatalistOptions, values, searchEnabled } = props
    const { getAddressSearch, setFieldValue, addZip, addressDatalistLength } = props

    if (!values) return

    let fields = asignPrefix()

    let i = addressDatalistOptions.indexOf(value)
    if (i >= 0 && setFieldValue) {
      let suggest = props.addressDatalistData[i]
      let { hasProvinces } = suggest.country

      fetchProvinces(suggest.country.id, hasProvinces)
      setHasProvinces(hasProvinces)

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

      if (adrLength > 1 && adrLength > previousAddressLength && !addressDatalistLength) {
        setPreviousAddressLength(adrLength)
        return
      } else if (searchEnabled)
      {
        setPreviousAddressLength(adrLength)
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

  const getOptions = values => {
    let { addressDatalistData } = props
    try {
      let value = getValues()
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

  const {
    setFieldValue,
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
    provinceHint
  } = props

  let fields = asignPrefix()

  // handleChange(e, data)
  //  TODO - check whether fluid didnt mess up ui somewhere else

  return (
    <>
      <datalist id={datalistName}>
        {getOptions(values)
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
              onChange: handleChange,
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
              value: JSON.stringify({ countryId: country.id, hasProvinces: country.hasProvinces })
            }))}
            inputProps={{
              loading: countriesLoading,
              onFocus: e => (e.target.autocomplete = null),
              'data-test': 'address_form_country_drpdn',
              search: true,
              onChange: async (e, data) => {
                // let fieldName = prefix ? `${prefix.province}` : 'address.province'

                setFieldValue(fields[props.province.name], '')
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
              value: province.id
            }))}
            inputProps={{
              onFocus: e => (e.target.autocomplete = null),
              'data-test': `${prefix}-state-province`,
              search: true,
              disabled: !hasProvinces || disableProvince,
              loading: provincesAreFetching,
              onChange: handleChange,
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
              onChange: handleChange,
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
            onAddition={(e, data) => setFieldValue(fields[props.zip.name], data.value)}
            onChange={handleChange}
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
  provinceHint: any
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
  provinceHint: null
}

export default injectIntl(AddressForm)
