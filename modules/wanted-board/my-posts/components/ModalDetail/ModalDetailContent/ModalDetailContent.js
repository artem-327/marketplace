/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'

// Components
import { GridRow, GridColumn } from 'semantic-ui-react'
import { Input, Dropdown, TextArea } from 'formik-semantic-ui-fixed-validation'
import { Required } from '../../../../../../components/constants/layout'
import { DateInput } from '../../../../../../components/custom-formik'
// Constants
import {
  CONFORMING_FILTER
} from './ModalDetailContent.constant'

import { getProvinces } from '../../../../../address-form/api'

import {
    DivHeaderRow,
    DivHeaderCaption,
    CasGridStyled
  } from '../ModalDetail.styles'

const ModalDetailContent = props => {
    const [state, setState] = useState({
        provinces: [],
        countryId: null,
        hasProvinces: false,
        provicesAreFetching: false,
        previousAddressLength: 0,
        provincesAreFetching: false
    })
    const {
        intl: { formatMessage },
        formikProps,
        countries,
        units,
        packagingTypes,
        productConditions,
        productForms,
        productGrades,
        countriesLoading,
        productConditionsLoading,
        productFormsLoading,
        productGradesLoading,
        provinceRequired,
        setProvinceRequired
    } = props
    const { values, setFieldValue } = formikProps

    useEffect( () => {
        const init = async () => {
            if (!props.hazardClasses.length) props.getHazardClasses()
            let { countries, countriesLoading, units, getUnits, getPackagingTypes, getProductConditions, getProductForms, getProductGrades, deliveryCountry } = props
            try {
                if (countries.length === 0 && !countriesLoading) await props.getCountries()
                if (units.length === 0) getUnits()
                if (packagingTypes.length === 0) getPackagingTypes()
                if (productConditions.length === 0) getProductConditions()
                if (productForms.length === 0) getProductForms()
                if (productGrades.length === 0) getProductGrades()

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
            setProvinceRequired(true)
        } else {
            setProvinceRequired(false)
        }
    }

    return (
        <div>
            <DivHeaderRow>
                <DivHeaderCaption>
                    Required
                </DivHeaderCaption>
            </DivHeaderRow>
            <CasGridStyled>
                <GridRow>
                    <GridColumn width={16} data-test='wanted_board_sidebar_product_name_inpt'>
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
                    <GridColumn width={8} data-test='wanted_board_sidebar_quantity_inpt'>
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
                            options={units}
                            inputProps={{
                                onFocus: e => (e.target.autocomplete = null),
                                'data-test': 'wanted_board_sidebar_unit_drpdn',
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
                            name="deliveryCountry"
                            options={countries.map(country => ({
                                key: country.id,
                                text: country.name,
                                value: JSON.stringify({ countryId: country.id, hasProvinces: country.hasProvinces })
                            }))}
                            inputProps={{
                                loading: countriesLoading,
                                onFocus: e => (e.target.autocomplete = null),
                                'data-test': 'wanted_board_sidebar_delivery_coundtry_drpdn',
                                search: true,
                                onChange: async (e, data) => {
                                    fetchProvinces(JSON.parse(data.value).countryId, JSON.parse(data.value).hasProvinces)
                                    setState(prevState => ({ ...prevState, hasProvinces: JSON.parse(data.value).hasProvinces }))
                                    setFieldValue('statesFilter', '')
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
                                {provinceRequired && (<Required />)}
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
                            'data-test': 'wanted_board_sidebar_delivery_province_drpdn',
                            search: true,
                            disabled: !state.hasProvinces,
                            loading: state.provincesAreFetching,
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
                        <DateInput
                            inputProps={{ minDate: moment(), id: 'expiryDate', clearable: true }}
                            name='expiryDate'
                            label={
                                <>
                                    <FormattedMessage id='wantedBoard.myPostExpiryDate' defaultMessage='Expiry Date' />
                                    <Required />
                                </>
                            }
                        />
                    </GridColumn>
                    <GridColumn width={3}>
                        <Dropdown
                            label={
                                <>
                                    <FormattedMessage id='wantedBoard.myPostConforming' defaultMessage='Conforming' />
                                    <Required />
                                </>
                            }
                            options={CONFORMING_FILTER}
                            name='conformingFilter'
                            inputProps={{ 'data-test': 'wanted_board_sidebar_confirming_drpdn' }}
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
                        options={productConditions}
                        name='conditionFilter'
                        inputProps={{
                            loading: productConditionsLoading,
                            'data-test': 'wanted_board_sidebar_condition_drpdn',
                            placeholder: formatMessage({ id: 'global.address.selectCondition', defaultMessage: 'Select Condition' })
                        }}
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
                                loading: countriesLoading,
                                onFocus: e => (e.target.autocomplete = null),
                                'data-test': 'wanted_board_sidebar_origin_country_drpdn',
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
                        options={productGrades}
                        name='gradeFilter'
                        inputProps={{
                            loading: productGradesLoading,
                            'data-test': 'wanted_board_sidebar_grade_drpdn',
                            placeholder: formatMessage({ id: 'global.address.selectGrade', defaultMessage: 'Select Grade' })
                        }}
                        />
                    </GridColumn>
                    <GridColumn width={8}>
                        <Dropdown
                        label={<FormattedMessage id='wantedBoard.myPostIndexFormFilter' defaultMessage='Form' />}
                        options={productForms}
                        name='formFilter'
                        inputProps={{
                            loading: productFormsLoading,
                            'data-test': 'wanted_board_sidebar_form_drpdn',
                            placeholder: formatMessage({ id: 'global.address.selectForm', defaultMessage: 'Select Form' })
                        }}
                        />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn width={8}>
                        <Dropdown
                            label={
                                <>
                                    <FormattedMessage id='wantedBoard.myPostPackaing' defaultMessage='Packaging' />
                                </>
                            }
                            name="packaingFilter"
                            options={packagingTypes}
                            inputProps={{
                                onFocus: e => (e.target.autocomplete = null),
                                'data-test': 'wanted_board_sidebar_packaging_drpdn',
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
                        <TextArea
                            name='specialNotes'
                            label={<FormattedMessage id='wantedBoard.myPostIndexSpecialNotesFilter' defaultMessage='Special Notes'  />}
                            inputProps={{
                                placeholder: formatMessage({
                                id: 'wantedBoard.writeNotesHere',
                                defaultMessage: 'Write Notes Here'
                                })
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
    setProvinceRequired: PropTypes.func,
    provinceRequired: PropTypes.bool,
    intl: PropTypes.object,
    formikProps: PropTypes.object
}

ModalDetailContent.defaultProps = {
    getHazardClasses: () => {},
    setProvinceRequired: () => {},
    provinceRequired: false,
    intl: {},
    formikProps: {}
}

export default injectIntl(ModalDetailContent)