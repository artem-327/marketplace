/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'

// Components
import { GridRow, GridColumn } from 'semantic-ui-react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Required } from '../../../../../../components/constants/layout'
import { DateInput } from '../../../../../../components/custom-formik'
// Constants
import {
  CONFORMING_FILTER,
  CONDITION_FILTER,
  GRADE_FILTER,
  FORM_FILTER
} from './ModalDetailContent.constant'

import { getProvinces } from '../../../../../address-form/api'

import {
    DivHeaderRow,
    DivHeaderCaption,
    CasGridStyled,
    GridColumnLabelTextArea,
    CustomTextarea
  } from '../ModalDetail.styles'

const ModalDetailContent = props => {
    const [state, setState] = useState({
        provinces: [],
        countryId: null,
        hasProvinces: false,
        provicesAreFetching: false,
        previousAddressLength: 0,
    })
  const {
    intl: { formatMessage },
    formikProps,
    countries,
    weightUnits,
    packagingTypes
  } = props
  const { values } = formikProps

  // Similar to call componentDidMount:
  useEffect( () => {
    const init = async () => {
        if (!props.hazardClasses.length) props.getHazardClasses()
        let { countries, countriesLoading, weightUnits, getUnits, packagingTypes, getPackagingTypes, deliveryCountry } = props
        try {
            if (countries.length === 0 && !countriesLoading) await props.getCountries()
            if (weightUnits.length === 0) await getUnits()
            if (packagingTypes.length === 0) await getPackagingTypes()

            await fetchProvinces(deliveryCountry?.id, deliveryCountry?.hasProvinces)
        } catch (e) {
            console.error(e)
        }
    }
    init()
  }, []) 

  const fetchProvinces = async (countryId, hasProvinces) => {
    if (countryId && hasProvinces) {
      setState(prevState => ({ ...prevState, provincesAreFetching: true }))
      let provinces = await getProvinces(countryId)
      setState(prevState => ({ ...prevState, provinces, hasProvinces, countryId, provincesAreFetching: false }))
    }
  }

  const filter = values.propertiesFilter

  const RowDate = ({ name, readOnly = false, id, defaultMessage, clearable = true }) => (
    <DateInput
      inputProps={{ minDate: moment(), id: name, clearable: clearable }}
      name={name}
      label={
        <>
          <FormattedMessage id={id} defaultMessage={defaultMessage} />
        </>
      }
    />
  )

  return (
    <div>
        <DivHeaderRow>
            <DivHeaderCaption>
                Required
            </DivHeaderCaption>
        </DivHeaderRow>
        <CasGridStyled>
            <GridRow>
                <GridColumn width={16} data-test='cas_product_sidebar_index_name_inp'>
                    <Input
                    type='text'
                    label={
                        <>
                        <FormattedMessage id='wantedBoard.myPostIndexProductName' defaultMessage='Product Name' />
                        <Required />
                        </>
                    }
                    name='productName'
                    inputProps={{
                        placeholder: formatMessage({
                            id: 'wantedBoard.myPostEnterProductName',
                            defaultMessage: 'Enter a requested product name'
                        })
                    }}
                    />
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={8} data-test='settings_branches_popup_name_inp'>
                    <Input
                    type='text'
                    label={
                        <>
                        <FormattedMessage id='wantedBoard.myPostIndexQuantity' defaultMessage='Quantity Needed' />
                        <Required />
                        </>
                    }
                    name='quantityNeeded'
                    inputProps={{
                        placeholder: formatMessage({
                        id: 'wantedBoard.myPostEnterQuantity',
                        defaultMessage: '0'
                        })
                    }}
                    />
                </GridColumn>
                <GridColumn width={8}>
                    <Dropdown
                        label={
                            <>
                                <FormattedMessage id='global.myPostIndexWeightUnit' defaultMessage='Weight Unit/Packaging' />
                                <Required />
                            </>
                        }
                        name="weightUnitFilter"
                        options={weightUnits}
                        inputProps={{
                            onFocus: e => (e.target.autocomplete = null),
                            'data-test': 'address_form_country_drpdn',
                            search: true,
                            onChange: async (e, data) => {
                            },
                            placeholder: formatMessage({ id: 'global.unit', defaultMessage: 'Unit' }),
                        }}
                    />
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={8}>
                    <Dropdown
                        label={
                            <>
                                <FormattedMessage id='global.myPostIndexCountryFilter' defaultMessage='Delivery Country' />
                                <Required />
                            </>
                        }
                        name="deliveryContry"
                        options={countries.map(country => ({
                            key: country.id,
                            text: country.name,
                            value: country.id,
                            hasProvinces: country.hasProvinces
                        }))}
                        inputProps={{
                            // loading: countriesLoading,
                            onFocus: e => (e.target.autocomplete = null),
                            'data-test': 'address_form_country_drpdn',
                            search: true,
                            onChange: async (e, data) => {
                                fetchProvinces(data.value.countryId, data.value.hasProvinces)
                                setState(prevState => ({ ...prevState, hasProvinces: data.value.hasProvinces }))
                            },
                            placeholder: formatMessage({ id: 'global.address.selectCountry', defaultMessage: 'Select Country' }),
                        }}
                    />
                </GridColumn>
                <GridColumn width={8}>
                <Dropdown
                    label={
                        <>
                            <FormattedMessage id='global.myPostIndexStateFilter' defaultMessage='Delivery State' />
                            <Required />
                        </>
                    }
                    name="statesFilter"
                    options={state.provinces.map(province => ({
                        key: province.id,
                        text: province.name,
                        value: province.id
                    }))}
                    inputProps={{
                        onFocus: e => (e.target.autocomplete = null),
                        'data-test': 'address_form_province_drpdn',
                        search: true,
                        disabled: !state.hasProvinces,
                        loading: state.provincesAreFetching,
                        // onChange: this.handleChange,
                        placeholder: formatMessage({
                            id: 'global.address.selectStateProvince',
                            defaultMessage: 'Select State/Province'
                        })
                    }}
                    />
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={5}>
                    {RowDate({ name: 'expiryDate', id: 'wantedBoard.myPostExpiryDate', defaultMessage: 'Expiry Date' })}
                </GridColumn>
                <GridColumn width={3}>
                    <Dropdown
                    label={<FormattedMessage id='wantedBoard.myPostConforming' defaultMessage='Conforming' />}
                    options={CONFORMING_FILTER}
                    name='conformingFilter'
                    inputProps={{ 'data-test': 'cas_product_sidebar_properties_filter_drpdn' }}
                    />
                </GridColumn>
                <GridColumn width={8}>

                </GridColumn>
            </GridRow>
        </CasGridStyled>
        <DivHeaderRow>
            <DivHeaderCaption>
                Optional
            </DivHeaderCaption>
        </DivHeaderRow>
        <CasGridStyled>
            <GridRow>
                <GridColumn width={8}>
                    <Dropdown
                    label={<FormattedMessage id='wantedBoard.myPostIndexConditionFilter' defaultMessage='Condition' />}
                    options={CONDITION_FILTER}
                    name='conditionFilter'
                    inputProps={{ 'data-test': 'cas_product_sidebar_properties_filter_drpdn' }}
                    />
                </GridColumn>
                <GridColumn width={8}>
                    <Dropdown
                        label={
                            <>
                                <FormattedMessage id='global.myPostIndexCountryOfOriginFilter' defaultMessage='Country of Origin' />
                            </>
                        }
                        name="originCountryFilter"
                        options={countries.map(country => ({
                            key: country.id,
                            text: country.name,
                            value: country.id
                        }))}
                        inputProps={{
                            // loading: countriesLoading,
                            onFocus: e => (e.target.autocomplete = null),
                            'data-test': 'address_form_country_drpdn',
                            search: true,
                            onChange: async (e, data) => {
                            },
                            placeholder: formatMessage({ id: 'global.address.selectCountry', defaultMessage: 'Select Country' }),
                        }}
                    />
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={8}>
                    <Dropdown
                    label={<FormattedMessage id='wantedBoard.myPostIndexGradeFilter' defaultMessage='Grade' />}
                    options={GRADE_FILTER}
                    name='gradeFilter'
                    inputProps={{ 'data-test': 'cas_product_sidebar_properties_filter_drpdn' }}
                    />
                </GridColumn>
                <GridColumn width={8}>
                    <Dropdown
                    label={<FormattedMessage id='wantedBoard.myPostIndexFormFilter' defaultMessage='Form' />}
                    options={FORM_FILTER}
                    name='formFilter'
                    inputProps={{ 'data-test': 'cas_product_sidebar_properties_filter_drpdn' }}
                    />
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={8}>
                    <Dropdown
                        label={
                            <>
                                <FormattedMessage id='wantedBoard.myPostPackaing' defaultMessage='Packaging' />
                                <Required />
                            </>
                        }
                        name="packaingFilter"
                        options={packagingTypes.map(item => ({
                            key: item.id,
                            text: item.name,
                            value: item.id,
                        }))}
                        inputProps={{
                            onFocus: e => (e.target.autocomplete = null),
                            'data-test': 'address_form_country_drpdn',
                            search: true,
                            onChange: async (e, data) => {
                            },
                            placeholder: formatMessage({ id: 'wantedBoard.selectPackaging', defaultMessage: 'Select Packaging' }),
                        }}
                    />
                </GridColumn>
                <GridColumn width={8}>

                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn width={16}>
                    <GridRow>
                        <GridColumnLabelTextArea>
                            <FormattedMessage id='wantedBoard.myPostIndexSpecialNotesFilter' defaultMessage='Special Notes'  />
                        </GridColumnLabelTextArea>
                    </GridRow>
                    <CustomTextarea
                        rows={3}
                        name="specialNotes"
                        id="specialNotes"
                        inputprops={{
                            placeholder: formatMessage({ id: 'global.address.selectCountrysss', defaultMessage: 'Write Notes' }),
                        }}  
                    />
                </GridColumn>
            </GridRow>
        </CasGridStyled>
    </div>
  )
}

ModalDetailContent.propTypes = {
  getHazardClasses: PropTypes.func,
  intl: PropTypes.object,
  formikProps: PropTypes.object
}

ModalDetailContent.defaultProps = {
  getHazardClasses: () => {},
  intl: {},
  formikProps: {}
}

export default injectIntl(ModalDetailContent)