/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'
import { ChevronDown, ChevronUp } from 'react-feather'
import debounce from 'lodash/debounce'

// Components
import { GridRow, GridColumn, Label } from 'semantic-ui-react'
import { Input, Dropdown, TextArea } from 'formik-semantic-ui-fixed-validation'
import { Required } from '../../../../../../components/constants/layout'
import { DateInput } from '../../../../../../components/custom-formik'

import { getProvinces } from '../../../../../address-form/api'

// Constants
import { YES_NO_OPTIONS } from './ModalDetailContent.constant'

import {
    DivHeaderRow,
    CasGridStyled,
    AssayGridStyled,
    SegmentStyled
  } from '../ModalDetail.styles'

import {
    DivInputWrapper,
    CustomLabel
} from '../../../../styles'

// Services
import { uniqueArrayByKey } from '../../../../../../utils/functions'

const ModalDetailContent = props => {
    const [state, setState] = useState({
        provinces: [],
        countryId: null,
        hasProvinces: false,
        provicesAreFetching: false,
        previousAddressLength: 0,
        provincesAreFetching: false,
        isOpenOptionalInformation: true,
        selectedManufacturers: []
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
        setProvinceRequired,
        searchManufacturers,
        searchedManufacturers,
        searchedManufacturersLoading,
        popupValues
    } = props
    const { values, setFieldValue } = formikProps

    useEffect( () => {
        const init = async () => {
            if (!props.hazardClasses.length) props.getHazardClasses()
            let {
                countries,
                countriesLoading,
                units,
                getUnits,
                getPackagingTypes,
                getProductConditions,
                getProductForms,
                getProductGrades,
                deliveryCountry,
                primaryBranch
            } = props
            try {
                if (countries.length === 0 && !countriesLoading) await props.getCountries()
                if (units.length === 0) getUnits()
                if (packagingTypes.length === 0) getPackagingTypes()
                if (productConditions.length === 0) getProductConditions()
                if (productForms.length === 0) getProductForms()
                if (productGrades.length === 0) getProductGrades()

                if (popupValues) {
                    let selectedManufacturers = popupValues.manufacturers.map(item => ({
                        key: item.id,
                        value: item.id,
                        text: item.name
                    }))
                    setState(prevState => ({ ...prevState, selectedManufacturers: selectedManufacturers }))
                }

                await fetchProvinces(
                  deliveryCountry ? deliveryCountry.id : primaryBranch?.country?.id,
                  deliveryCountry ? deliveryCountry.hasProvinces : primaryBranch?.country?.hasProvinces
                )
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
    let manufacturerOptions = uniqueArrayByKey(searchedManufacturers.concat(state.selectedManufacturers), 'key')
    return (
        <div>
            <DivHeaderRow>
                <FormattedMessage id='wantedBoard.myPostRequired' defaultMessage='Required' />
            </DivHeaderRow>
            <SegmentStyled>
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
                            name='productSearchPattern'
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
                            name='quantity'
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
                                        <FormattedMessage id='wantedBoard.myPostUnit' defaultMessage='Unit' />
                                        <Required />
                                    </>
                                }
                                name="unit"
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
                                        setFieldValue('deliveryProvince', '')
                                    },
                                    placeholder: formatMessage({ id: 'global.address.selectCountry', defaultMessage: 'Select Country' }),
                                }}
                            />
                        </GridColumn>
                        <GridColumn width={8}>
                        <Dropdown
                            label={
                                <>
                                    <FormattedMessage id='global.myPostIndexStateFilter' defaultMessage='Delivery State/Province' />
                                    {provinceRequired && (<Required />)}
                                </>
                            }
                            name="deliveryProvince"
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
                </CasGridStyled>
            </SegmentStyled>
            <DivHeaderRow
              style={{ cursor: 'pointer' }}
              onClick={() => setState({ ...state, isOpenOptionalInformation: !state.isOpenOptionalInformation })}
            >
                <FormattedMessage id='wantedBoard.myPostOptionalInformation' defaultMessage='Optional Information' />
                {state.isOpenOptionalInformation ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </DivHeaderRow>
            {state.isOpenOptionalInformation && (
                <CasGridStyled>
                    <GridRow>
                        <GridColumn width={8}>
                            <DateInput
                              inputProps={{ minDate: moment(), id: 'neededAt', clearable: true }}
                              name='neededAt'
                              label={
                                  <>
                                      <FormattedMessage id='wantedBoard.myPostDateNeededBy' defaultMessage='Date Needed By' />
                                  </>
                              }
                            />
                        </GridColumn>
                        <GridColumn width={8}>
                            <Dropdown
                              label={
                                  <>
                                      <FormattedMessage id='wantedBoard.myPostWillAcceptEquivalents' defaultMessage='Will Accept Equivalents' />
                                  </>
                              }
                              options={YES_NO_OPTIONS}
                              name='acceptEquivalents'
                              inputProps={{ 'data-test': 'wanted_board_sidebar_willAcceptEquivalents_drpdn' }}
                            />
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn width={8}>
                            <CustomLabel>
                              <FormattedMessage id='wantedBoard.myPostPreferredFOBPrice' defaultMessage='Preferred FOB Price' />
                            </CustomLabel>
                            <DivInputWrapper className='price'>
                                <Input
                                  name='maximumPricePerUOM'
                                  inputProps={{
                                      type: 'number',
                                      placeholder: '0.00',
                                      fluid: true
                                  }}
                                />
                                <Label>$</Label>
                            </DivInputWrapper>
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
                                    multiple: true,
                                    clearable: true,
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
                      {false && /* Temporary disabled - https://bluepallet.atlassian.net/browse/DT-1196 */ (
                        <GridColumn width={8}>
                            <AssayGridStyled>
                                <GridRow>
                                    <GridColumn width={8}>
                                        <CustomLabel>
                                            <FormattedMessage id='wantedBoard.myPostAssayMin' defaultMessage='Assay Min' />
                                        </CustomLabel>
                                        <DivInputWrapper>
                                            <Input
                                              name='assayMin'
                                              inputProps={{
                                                  type: 'number',
                                                  placeholder: '0',
                                                  fluid: true
                                              }}
                                            />
                                            <Label>%</Label>
                                        </DivInputWrapper>
                                    </GridColumn>
                                    <GridColumn width={8}>
                                        <CustomLabel>
                                            <FormattedMessage id='wantedBoard.myPostAssayMax' defaultMessage='Assay Max' />
                                        </CustomLabel>
                                        <DivInputWrapper>
                                            <Input
                                              name='assayMax'
                                              inputProps={{
                                                  type: 'number',
                                                  placeholder: '0',
                                                  fluid: true
                                              }}
                                            />
                                            <Label>%</Label>
                                        </DivInputWrapper>
                                    </GridColumn>
                                </GridRow>
                            </AssayGridStyled>
                        </GridColumn>
                        )}
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
                                  multiple: true,
                                  clearable: true,
                                  onFocus: e => (e.target.autocomplete = null),
                                  'data-test': 'wanted_board_sidebar_packaging_drpdn',
                                  search: true,
                                  placeholder: formatMessage({ id: 'wantedBoard.selectPackaging', defaultMessage: 'Select Packaging' }),
                              }}
                            />
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn width={8}>
                            <Dropdown
                              label={<FormattedMessage id='wantedBoard.myPostIndexConditionFilter' defaultMessage='Condition' />}
                              options={productConditions}
                              name='conditionFilter'
                              inputProps={{
                                  multiple: true,
                                  clearable: true,
                                  loading: productConditionsLoading,
                                  'data-test': 'wanted_board_sidebar_condition_drpdn',
                                  placeholder: formatMessage({ id: 'global.address.selectCondition', defaultMessage: 'Select Condition' })
                              }}
                            />
                        </GridColumn>
                        <GridColumn width={8}>
                            <Dropdown
                            label={<FormattedMessage id='wantedBoard.myPostIndexFormFilter' defaultMessage='Form' />}
                            options={productForms}
                            name='formFilter'
                            inputProps={{
                                multiple: true,
                                clearable: true,
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
                              label={<FormattedMessage id='wantedBoard.myPostIndexGradeFilter' defaultMessage='Grade' />}
                              options={productGrades}
                              name='gradeFilter'
                              inputProps={{
                                  multiple: true,
                                  clearable: true,
                                  loading: productGradesLoading,
                                  'data-test': 'wanted_board_sidebar_grade_drpdn',
                                  placeholder: formatMessage({ id: 'global.address.selectGrade', defaultMessage: 'Select Grade' })
                              }}
                            />
                        </GridColumn>
                        <GridColumn width={8}>
                            <Dropdown
                              label={<FormattedMessage id='wantedBoard.myPostManufacturer' defaultMessage='Manufacturer' />}
                              options={manufacturerOptions}
                              name='manufacturers'
                              inputProps={{
                                  multiple: true,
                                  clearable: true,
                                  search: true,
                                  loading: searchedManufacturersLoading,
                                  onSearchChange: debounce((e, { searchQuery }) => {
                                      try {
                                          searchManufacturers(searchQuery)
                                      } catch (e) {
                                          console.error(e)
                                      }
                                  }, 500),

                                  onChange: (_, { value }) => {
                                      let newSelectedManufacturers = []
                                      manufacturerOptions.forEach(item => value.some(val => val === item.key) && newSelectedManufacturers.push(item))
                                      setState(prevState => ({ ...prevState, selectedManufacturers: newSelectedManufacturers }))
                                  },
                                  'data-test': 'wanted_board_sidebar_manufacturers_drpdn',
                                  placeholder: formatMessage({ id: 'wantedBoard.myPostSelectManufacturer', defaultMessage: 'Select Manufacturer' })
                              }}
                            />
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
            )}
        </div>
    )
}

ModalDetailContent.propTypes = {
    getHazardClasses: PropTypes.func,
    setProvinceRequired: PropTypes.func,
    provinceRequired: PropTypes.bool,
    intl: PropTypes.object,
    formikProps: PropTypes.object,
    searchManufacturers: PropTypes.func,
    searchedManufacturers: PropTypes.array,
    searchedManufacturersLoading: PropTypes.bool
}

ModalDetailContent.defaultProps = {
    getHazardClasses: () => {},
    setProvinceRequired: () => {},
    provinceRequired: false,
    intl: {},
    formikProps: {},
    searchManufacturers: () => {},
    searchedManufacturers: [],
    searchedManufacturersLoading: false
}

export default injectIntl(ModalDetailContent)