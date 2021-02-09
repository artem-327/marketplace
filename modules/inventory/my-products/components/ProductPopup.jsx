/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import filter from 'lodash/filter'
import escapeRegExp from 'lodash/escapeRegExp'
import debounce from 'lodash/debounce'
import { FormattedMessage, injectIntl } from 'react-intl'
import { AddBox } from '@material-ui/icons'

import {
  Modal,
  FormGroup,
  FormField,
  Popup,
  Grid,
  GridRow,
  GridColumn,
  Divider,
  Icon,
  Form,
  Segment,
  Dimmer,
  Loader,
  Accordion
} from 'semantic-ui-react'
import { Formik } from 'formik'

import { CompanyProductMixtures } from '~/components/shared-components/'
import { generateToastMarkup, getSafe, uniqueArrayByKey, getDesiredCasProductsProps } from '~/utils/functions'
import { DisabledButtonWrapped } from '~/utils/components'
import confirm from '~/components/Confirmable/confirm'
import { Required } from '~/components/constants/layout'

import { Input, Button, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'

import { UnitOfPackaging } from '~/components/formatted-messages'
import { errorMessages } from '~/constants/yupValidation'
import { AttachmentManager } from '~/modules/attachments'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import styled from 'styled-components'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { FlexSidebar, HighSegment, FlexContent } from '~/modules/inventory/constants/layout'
import { UploadCloud, ChevronDown, X as XIcon } from 'react-feather'
import ErrorFocus from '~/components/error-focus'
import { palletDimensions } from '~/modules/settings/contants'
import { CompanyGenericProductRequestForm } from '~/modules/company-generic-product-request'

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
  .ui.dropdown > .default.text {
    margin: 0 !important;
  }
`

const CustomHighSegment = styled(Segment)`
  margin: 0 0 1px 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  border: unset !important;
  display: flex;
  flex-direction: row;

  svg {
    font-size: 18px;
    vertical-align: middle;
  }

  svg.title-icon {
    margin-left: 15px;
    color: #cecfd4;
  }

  svg.close-icon {
    right: 0;
    position: absolute;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`

const BottomButtons = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  .ui.button {
    margin: 0 5px;
  }
`

const CustomButtonSubmit = styled(Button.Submit)`
  &.ui.primary.button {
    background-color: #2599d5;
    color: #fff;

    &:hover {
      background-color: #188ec9;
    }

    &:active {
      background-color: #0d82bc;
    }
  }
`

export const DivIcon = styled.div`
  display: block;
  height: 20px;
  position: relative;
`

const CloseIcon = styled(Icon)`
  position: absolute;
  top: -10px;
  right: -10px;
`

const StyledUploadIcon = styled(UploadCloud)`
  width: 48px;
  height: 40px;
  object-fit: contain;
  color: #dee2e6;
`

const StyledGrid = styled(Grid)`
  margin: -10px;
  > .row {
    padding: 7.5px 0 !important;
    .column {
      padding: 0 10px !important;
    }
  }

  .field {
    .ui.checkbox {
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }
  }
`

const DivTitleSegment = styled.div`
  margin: 0 0 1px 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #848893;
  height: 50px;
  background-color: #f8f9fb;
  margin-right: -26px !important;
  margin-left: -26px !important;
`

const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 270
  },
  {
    name: 'documentTypeName',
    title: (
      <FormattedMessage id='global.docType' defaultMessage='Document Type'>
        {text => text}
      </FormattedMessage>
    ),
    width: 270
  }
]

const formValidation = () =>
  Yup.lazy(values => {
    const palletParamsRequired = values.palletSaleOnly || checkPalletParamsRequired(values) ? true : false
    return Yup.object().shape({
      intProductName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
      intProductCode: Yup.string().trim().min(1, errorMessages.minLength(1)).required(errorMessages.requiredMessage),
      packagingSize: Yup.number(errorMessages.invalidNumber)
        .typeError(errorMessages.mustBeNumber)
        .required(errorMessages.requiredMessage)
        .positive(errorMessages.positive),
      packagingUnit: Yup.number(errorMessages.invalidNumber).required(errorMessages.requiredMessage),
      packagingType: Yup.number(errorMessages.invalidNumber).required(errorMessages.requiredMessage),
      nmfcNumber: Yup.number().required(errorMessages.requiredMessage),
      freightClass: Yup.number(errorMessages.invalidNumber).required(errorMessages.requiredMessage),
      packageWeight: Yup.number()
        .typeError(errorMessages.mustBeNumber)
        .required(errorMessages.requiredMessage)
        .positive(errorMessages.positive),
      palletSaleOnly: Yup.boolean(),
      packageWeightUnit: Yup.number()
        .typeError(errorMessages.mustBeNumber)
        .required(errorMessages.requiredMessage)
        .positive(errorMessages.positive),
      /*
      packagesPerPallet: Yup.number()
        .typeError(errorMessages.mustBeNumber)
        .positive(errorMessages.positive)
        .integer(errorMessages.integer),
      */
      packagingWidth: Yup.number().when('palletSaleOnly', {
        is: false,
        then: Yup.number()
          .typeError(errorMessages.mustBeNumber)
          .required(errorMessages.requiredMessage)
          .positive(errorMessages.positive)
      }),

      packagingHeight: Yup.number().when('palletSaleOnly', {
        is: false,
        then: Yup.number()
          .typeError(errorMessages.mustBeNumber)
          .required(errorMessages.requiredMessage)
          .positive(errorMessages.positive)
      }),
      packagingLength: Yup.number().when('palletSaleOnly', {
        is: false,
        then: Yup.number()
          .typeError(errorMessages.mustBeNumber)
          .required(errorMessages.requiredMessage)
          .positive(errorMessages.positive)
      }),
      ...(palletParamsRequired && {
        palletMinPkgs: Yup.number()
          .min(1, errorMessages.minimum(1))
          .test('int', errorMessages.integer, val => {
            return val % 1 === 0
          })
          .required(errorMessages.requiredMessage),
        palletMaxPkgs: Yup.number()
          .test('int', errorMessages.integer, val => {
            return val % 1 === 0
          })
          .min(
            values.palletMinPkgs ? values.palletMinPkgs : 1,
            errorMessages.minimum(values.palletMinPkgs ? values.palletMinPkgs : 1)
          )
          .required(errorMessages.requiredMessage),
        palletWeight: Yup.number()
          .typeError(errorMessages.mustBeNumber)
          .required(errorMessages.requiredMessage)
          .positive(errorMessages.positive),
        palletLength: Yup.number()
          .typeError(errorMessages.mustBeNumber)
          .required(errorMessages.requiredMessage)
          .positive(errorMessages.positive),
        palletWidth: Yup.number()
          .typeError(errorMessages.mustBeNumber)
          .required(errorMessages.requiredMessage)
          .positive(errorMessages.positive),
        palletHeight: Yup.number()
          .typeError(errorMessages.mustBeNumber)
          .required(errorMessages.requiredMessage)
          .positive(errorMessages.positive)
      }),
      companyGenericProduct: Yup.number()
        .typeError(errorMessages.mustBeNumber)
        .required(errorMessages.requiredMessage)
        .positive(errorMessages.positive)
    })
  })

const checkPalletParamsRequired = v => {
  return !!(v.palletMinPkgs || v.palletMaxPkgs || v.palletWeight || v.palletLength || v.palletWidth || v.palletHeight)
}

const filterPackagingTypes = (id, unitsAll, packagingTypesAll, setpackagingTypesReduced) => {
  if (!unitsAll) return
  const unit = unitsAll.find(unit => unit.id === id)
  if (!unit) return
  const measureType = unit.measureType
  if (!measureType) return

  const packagingTypesReduced = packagingTypesAll.filter(p => p.measureType && p.measureType.id === measureType.id)

  setpackagingTypesReduced(
    packagingTypesReduced.map((type, id) => {
      return {
        key: id,
        text: <UnitOfPackaging value={type.name} />,
        value: type.id
      }
    })
  )
}

const handlerSubmit = async (values, actions, props, attachments, setLoadSidebar) => {
  const {
    popupValues,
    handleSubmitProductEditPopup,
    handleSubmitProductAddPopup,
    datagrid,
    closePopup,
    openGlobalAddForm
  } = props
  delete values.casProducts

  const packagingDimensions = !getSafe(() => values.palletSaleOnly, false)
    ? {
      packagingLength: Number(values.packagingLength),
      packagingHeight: Number(values.packagingHeight),
      packagingWidth: Number(values.packagingWidth)
    }
    : null

  const palletDimensions = {}
  const propsToInclude = [
    'palletWeight',
    'palletLength',
    'palletWidth',
    'palletHeight',
    'palletMinPkgs',
    'palletMaxPkgs'
  ]
  propsToInclude.forEach(prop => (values[prop] ? (palletDimensions[prop] = Number(values[prop])) : null))

  let formValues = {
    intProductName: values.intProductName,
    intProductCode: values.intProductCode,
    packagingUnit: values.packagingUnit,
    packagingType: values.packagingType,
    nmfcNumber: values.nmfcNumber,
    stackable: values.stackable,
    freightClass: values.freightClass,
    packageWeightUnit: values.packageWeightUnit,
    companyGenericProduct:
      values.companyGenericProduct === null || values.companyGenericProduct === ''
        ? null
        : values.companyGenericProduct,
    freezeProtect: values.freezeProtect,
    hazardous: values.hazardous,
    palletSaleOnly: values.palletSaleOnly,
    inciName: values.inciName === null || values.inciName === '' ? null : values.inciName,
    packagingSize: Number(values.packagingSize),
    packageWeight: Number(values.packageWeight),
    /*
    packagesPerPallet:
      values.packagesPerPallet === null || values.packagesPerPallet === '' ? null : Number(values.packagesPerPallet),
    */
    ...packagingDimensions,
    ...palletDimensions
  }

  try {
    if (popupValues) {
      await handleSubmitProductEditPopup(formValues, popupValues.id, attachments)
    } else {
      await handleSubmitProductAddPopup(formValues, attachments)
    }
    if (!!openGlobalAddForm) {
      openGlobalAddForm('')
    } else {
      datagrid.loadData()
      closePopup()
    }
  } catch (e) {
    console.error(e)
  } finally {
    actions.setSubmitting(false)
    setLoadSidebar(false)
  }
}

const getInitialFormValues = (props) => {
  const {
    popupValues,
    palletWeightInitFromSettings,
    palletHeightInitFromSettings,
    palletWidthInitFromSettings,
    palletLengthInitFromSettings
  } = props

  if (!popupValues) {
    return {
      companyGenericProduct: null,
      freezeProtect: false,
      freightClass: '',
      hazardous: false,
      palletSaleOnly: true,
      inciName: '',
      intProductCode: '',
      intProductName: '',
      nmfcNumber: '',
      packageWeight: '',
      packageWeightUnit: '',
      packagingHeight: '',
      packagingLength: '',
      packagingWidth: '',
      packagingSize: '',
      packagingType: '',
      packagingUnit: '',
      palletMinPkgs: '',
      palletMaxPkgs: '',
      palletWeight: getSafe(() => palletWeightInitFromSettings, ''),
      palletLength: getSafe(() => palletLengthInitFromSettings, ''),
      palletWidth: getSafe(() => palletWidthInitFromSettings, ''),
      palletHeight: getSafe(() => palletHeightInitFromSettings, ''),
      stackable: false,
      //packagesPerPallet: '',  // Not in ednpoint anymore?
      documents: {
        documentType: null,
        attachments: []
      }
    }
  } else {
    const palletSaleOnly =
      popupValues && popupValues.palletSaleOnly
        ? popupValues.palletSaleOnly
        : popupValues && popupValues.palletSaleOnly === false
        ? popupValues.palletSaleOnly
        : true

    return {
      ...popupValues,
      casProducts: getDesiredCasProductsProps(getSafe(() => popupValues.companyGenericProduct.elements, [])),
      companyGenericProduct: getSafe(() => popupValues.companyGenericProduct.id, ''),
      nmfcNumber: getSafe(() => popupValues.nmfcNumber.id, ''),
      packageWeightUnit: getSafe(() => popupValues.packageWeightUnit.id, ''),
      packagingUnit: getSafe(() => popupValues.packagingUnit.id, ''),
      packagingType: getSafe(() => popupValues.packagingType.id, ''),
      packagingWidth: getSafe(() => popupValues.packagingWidth, ''),
      palletSaleOnly: getSafe(() => palletSaleOnly, true),
      packagingHeight: getSafe(() => popupValues.packagingHeight, ''),
      packagingLength: getSafe(() => popupValues.packagingLength, ''),
      palletMinPkgs: getSafe(() => popupValues.palletMinPkgs, ''),
      palletMaxPkgs: getSafe(() => popupValues.palletMaxPkgs, ''),
      palletWeight: popupValues && typeof popupValues.palletWeight !== 'undefined' ? popupValues.palletWeight : '',
      palletLength: popupValues && typeof popupValues.palletLength !== 'undefined' ? popupValues.palletLength : '',
      palletWidth: popupValues && typeof popupValues.palletWidth !== 'undefined' ? popupValues.palletWidth : '',
      palletHeight: popupValues && typeof popupValues.palletHeight !== 'undefined' ? popupValues.palletHeight : '',
      documents: {
        documentType: null,
        attachments: []
      }
    }
  }
}





const ProductPopup = props => {
  const [value, setValue] = useState('')
  const [openUpload, setOpenUpload] = useState(false)
  const [documentType, setDocumentType] = useState(null)
  const [changedForm, setChangedForm] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [loadSidebar, setLoadSidebar] = useState(false)
  const [packagingTypesReduced, setpackagingTypesReduced] = useState([])

  // Similar to call componentDidMount:
  useEffect(() => {
    props.getProductsCatalogRequest()

    if (props.popupValues && props.popupValues.nmfcNumber)
      props.addNmfcNumber(props.popupValues.nmfcNumber)

    if (props.documentTypes.length === 0) props.getDocumentTypes()

    if (props.popupValues) {
      const attachments = props.popupValues.attachments.map(att => ({
        id: att.id,
        name: att.name,
        documentType: att.documentType.name,
        linked: true
      }))
      setAttachments(attachments)
      setChangedForm(true)

      if (props.popupValues.packagingUnit) {
        filterPackagingTypes(popupValues.packagingUnit.id, props.unitsAll, props.packagingTypesAll, setpackagingTypesReduced)
      } else setpackagingTypesReduced(props.packagingType)
    }
  }, [])  // If [] is empty then is similar as componentDidMount.


  const handleSearchChange = debounce(searchQuery => {
    setValue(searchQuery)
    props.searchCompanyGenericProduct(searchQuery)
  }, 250)

  const handleSearchNmfcNumberChange = debounce(searchQuery => {
    props.getNmfcNumbersByString(searchQuery)
  }, 250)

  const handleChangeDocumentType = (e, name, value) => {
    setOpenUpload(true)
    setDocumentType(value)
  }

  const attachDocumentsManager = (newDocuments, values, setFieldValue) => {
    const newDocArray = newDocuments.map(att => ({
      id: att.id,
      name: att.name,
      documentType: att.documentType.name,
      linked: false
    }))
    const docArray = uniqueArrayByKey(attachments.concat(newDocArray), 'id')
    setChangedForm(true)
    setAttachments(docArray)
  }

  const attachDocumentsUploadAttachment = (att, values, setFieldValue) => {
    const newDocArray = [
      {
        id: att.id,
        name: att.name,
        documentType: att.documentType.name,
        linked: false
      }
    ]
    const docArray = uniqueArrayByKey(attachments.concat(newDocArray), 'id')
    setChangedForm(true)
    setAttachments(docArray)
  }

  const handleChangePackagingType = (e, value, setFieldValue, values) => {
    const { packagingTypesAll } = props
    const selectedPackingType = packagingTypesAll.find(type => type.id === value)

    const elementsToInclude = ['palletPkgMax', 'palletPkgMin']
    elementsToInclude.forEach(element => {
      if (selectedPackingType && selectedPackingType[element]) {
        switch (element) {
          case 'palletPkgMin':
            !values.palletMinPkgs && setFieldValue('palletMinPkgs', selectedPackingType[element])
          case 'palletPkgMax':
            !values.palletMaxPkgs && setFieldValue('palletMaxPkgs', selectedPackingType[element])
          default:
            return
        }
      }
    })
  }



  const {
    closePopup,
    openGlobalAddForm,
    productsUnitsType,
    popupValues,
    freightClasses,
    intl: { formatMessage },
    companyGenericProduct,
    companyGenericProductFetching,
    nmfcNumbersFetching,
    nmfcNumbersFiltered,
    packageWeightUnits,
    documentTypes,
    toastManager,
    loading,
    datagrid
  } = props


  let editable = popupValues ? popupValues.cfProductOfferCount === 0 || !popupValues.cfProductOfferCount : true

  let allCompanyGenericProduct = uniqueArrayByKey(
    companyGenericProduct.concat(
      getSafe(() => popupValues.companyGenericProduct) ? popupValues.companyGenericProduct : []
    ),
    'id'
  )

  return (

    <Formik
      initialValues={getInitialFormValues(props)}
      validationSchema={formValidation()}
      enableReinitialize
      onReset={() => (openGlobalAddForm ? openGlobalAddForm('') : closePopup())}
      onSubmit={(values, actions) => handlerSubmit(values, actions, props, attachments, setLoadSidebar)}
      loading={loading}
    >

      {formikProps => {
        let { setFieldValue, values } = formikProps
        let casProducts = getSafe(() => values.casProducts, [])
        const palletParamsRequired = checkPalletParamsRequired(values)
        const selectedWeightUnit = values.packageWeightUnit
          ? packageWeightUnits.find(el => el.value === values.packageWeightUnit)
          : null
        return (



          <Modal
            open={true}
            closeIcon={true}
            onClose={() => closePopup()}
          >
            <CustomForm>
              <Dimmer inverted active={loading || loadSidebar}>
                <Loader />
              </Dimmer>
              <CustomHighSegment>
                {openGlobalAddForm ? (
                  <>
                    <div>
                        <span>
                          <FormattedMessage id='createMenu.addProduct' defaultMessage='Add Product' />
                        </span>
                      <AddBox className='title-icon' />
                    </div>
                    <div style={{ position: 'absolute', right: '20px' }}>
                      <XIcon onClick={() => openGlobalAddForm('')} className='close-icon' />
                    </div>
                  </>
                ) : popupValues ? (
                  <FormattedMessage id='global.editCompanyProduct' defaultMessage='Edit Company Product' />
                ) : (
                  <FormattedMessage id='global.addCompanyProduct' defaultMessage='Add Company Product' />
                )}
              </CustomHighSegment>
              <FlexContent style={{ padding: '30px' }}>
                <StyledGrid>
                  <GridRow>
                    <div style={{ margin: '0 10px 6px' }}>
                      <FormattedMessage
                        id='settings.associatedCompanyGenericProduct'
                        defaultMessage='What is the Company Generic Product that you would like to map to?'
                      />
                      <Required />
                    </div>
                    <GridColumn width={10}>
                      <Dropdown
                        name='companyGenericProduct'
                        options={allCompanyGenericProduct.map(echo => ({
                          key: echo.id,
                          text: echo.name,
                          value: echo.id
                        }))}
                        inputProps={{
                          fluid: true,
                          search: val => val,
                          clearable: true,
                          selection: true,
                          loading: companyGenericProductFetching,
                          onChange: (_, { value }) =>
                            setFieldValue(
                              'casProducts',
                              getDesiredCasProductsProps(
                                getSafe(() => allCompanyGenericProduct.find(el => el.id === value).elements, [])
                              )
                            ),
                          onSearchChange: (_, { searchQuery }) => handleSearchChange(searchQuery),
                          placeholder: formatMessage({
                            id: 'productCatalog.enterProductName',
                            defaultMessage: 'Enter Product Name'
                          })
                        }}
                      />
                    </GridColumn>
                    <GridColumn width={6}>
                      <CompanyGenericProductRequestForm />
                    </GridColumn>
                  </GridRow>

                  {casProducts.length > 0 && (
                    <GridRow>
                      <GridColumn>
                        <>
                          <Divider />
                          <Grid>
                            <CompanyProductMixtures casProducts={casProducts} />
                          </Grid>
                          <Divider />
                        </>
                      </GridColumn>
                    </GridRow>
                  )}

                  <GridRow>
                    <GridColumn>
                      <Input
                        type='text'
                        name='intProductName'
                        label={
                          <>
                            <FormattedMessage id='global.intProductName' defaultMessage='Internal Product Name' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'productCatalog.enterProductName',
                            defaultMessage: 'Enter Product Name'
                          })
                        }}
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn>
                      <Input
                        type='text'
                        name='intProductCode'
                        label={
                          <>
                            <FormattedMessage id='global.intProductCode' defaultMessage='Internal Product Code' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'productCatalog.enterProductCode',
                            defaultMessage: 'Enter Product Code'
                          })
                        }}
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn>
                      <DivTitleSegment>
                        <FormattedMessage id='global.packaging' defaultMessage='PACKAGING' />
                      </DivTitleSegment>
                    </GridColumn>
                  </GridRow>

                  <GridRow columns={3}>
                    <GridColumn>
                      <Input
                        name='packagingSize'
                        label={
                          <>
                            <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size' />
                            <Required />
                          </>
                        }
                        inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                      />
                    </GridColumn>
                    <GridColumn>
                      <Dropdown
                        name='packagingUnit'
                        options={productsUnitsType}
                        label={
                          <>
                            <FormattedMessage id='global.packagingUnit' defaultMessage='Unit' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          'data-test': 'settings_product_popup_packagingUnit_drpdn',
                          onChange: (e, d) => {
                            setFieldValue('packagingType', '')
                            filterPackagingTypes(d.value, props.unitsAll, props.packagingTypesAll, setpackagingTypesReduced)
                          },
                          placeholder: formatMessage({
                            id: 'productCatalog.selectUnit',
                            defaultMessage: 'Select Unit'
                          })
                        }}
                      />
                    </GridColumn>
                    <GridColumn>
                      <Popup
                        disabled={!!getSafe(() => formikProps.values.packagingUnit, false)}
                        position={'bottom left'}
                        content={
                          <FormattedMessage
                            id='product.packaging.selectFirst'
                            defaultMessage='Please select Packaging Unit'
                          />
                        }
                        trigger={
                          <div>
                            <Dropdown
                              name='packagingType'
                              options={packagingTypesReduced}
                              label={
                                <>
                                  <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type' />
                                  <Required />
                                </>
                              }
                              inputProps={{
                                disabled: !getSafe(() => formikProps.values.packagingUnit, false),
                                'data-test': 'settings_product_popup_packagingType_drpdn',
                                placeholder: formatMessage({
                                  id: 'productCatalog.selectType',
                                  defaultMessage: 'Select Type'
                                }),
                                onChange: (e, { value }) => {
                                  handleChangePackagingType(e, value, setFieldValue, values)
                                }
                              }}
                            />
                          </div>
                        }
                      />
                    </GridColumn>
                  </GridRow>

                  <GridRow columns={3}>
                    <GridColumn>
                      <Input
                        name='palletMaxPkgs'
                        label={
                          <>
                            <FormattedMessage id='global.palletMaxPkgs' defaultMessage='Max Pkgs per Pallet' />
                            {(palletParamsRequired || values.palletSaleOnly) && <Required />}
                          </>
                        }
                        inputProps={{ placeholder: '0', type: 'number', min: 1 }}
                      />
                    </GridColumn>
                  </GridRow>

                  <GridRow>
                    <GridColumn>
                      <DivTitleSegment>
                        <FormattedMessage id='global.freight' defaultMessage='FREIGHT' />
                      </DivTitleSegment>
                    </GridColumn>
                  </GridRow>

                  <GridRow columns={2}>
                    <GridColumn>
                      <Input
                        name='packageWeight'
                        label={
                          <>
                            <FormattedMessage id='global.packageWeight' defaultMessage='Gross Weight Per Package' />
                            <Required />
                          </>
                        }
                        inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                      />
                    </GridColumn>
                    <GridColumn>
                      <Dropdown
                        name='packageWeightUnit'
                        options={packageWeightUnits}
                        label={
                          <>
                            <FormattedMessage id='global.weightUnit' defaultMessage='Weight Unit' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          'data-test': 'settings_product_popup_packageWeightUnit_drpdn',
                          placeholder: formatMessage({
                            id: 'productCatalog.selectWeightUnit',
                            defaultMessage: 'Select Weight Unit'
                          })
                        }}
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow columns={2}>
                    <GridColumn>
                      <Dropdown
                        options={nmfcNumbersFiltered}
                        inputProps={{
                          fluid: true,
                          search: val => val,
                          selection: true,
                          loading: nmfcNumbersFetching,
                          onSearchChange: (_, { searchQuery }) => handleSearchNmfcNumberChange(searchQuery),
                          placeholder: formatMessage({
                            id: 'productCatalog.selectNmfcCode',
                            defaultMessage: 'Select NMFC Code'
                          })
                        }}
                        name='nmfcNumber'
                        label={
                          <>
                            <FormattedMessage id='global.nmfcCode' defaultMessage='NMFC Code' />
                            <Required />
                          </>
                        }
                      />
                    </GridColumn>
                    <GridColumn>
                      <Dropdown
                        name='freightClass'
                        options={freightClasses}
                        label={
                          <>
                            <FormattedMessage id='global.freightClass' defaultMessage='Freight Class' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          'data-test': 'settings_product_popup_freightClass_drpdn',
                          placeholder: formatMessage({
                            id: 'productCatalog.selectFreightClass',
                            defaultMessage: 'Select Freight Class'
                          })
                        }}
                      />
                    </GridColumn>
                  </GridRow>

                  <GridRow>
                    <GridColumn style={{ display: 'flex' }}>
                      <Checkbox
                        label={formatMessage({ id: 'global.stackable', defaultMessage: 'Stackable' })}
                        name='stackable'
                        inputProps={{ 'data-test': 'settings_product_popup_stackable_chckb' }}
                      />
                      <Checkbox
                        label={formatMessage({ id: 'global.hazardous', defaultMessage: 'Hazardous' })}
                        name='hazardous'
                        inputProps={{ 'data-test': 'settings_product_popup_hazardous_chckb' }}
                      />
                      <Checkbox
                        label={formatMessage({ id: 'global.freezeProtect', defaultMessage: 'Freeze Protect' })}
                        name='freezeProtect'
                      />
                    </GridColumn>
                  </GridRow>

                  {!values.palletSaleOnly ? (
                    <>
                      <GridRow>
                        <GridColumn>
                          <DivTitleSegment>
                            <FormattedMessage
                              id='global.packagingDimensions'
                              defaultMessage='PACKAGING DIMENSIONS'
                            />
                          </DivTitleSegment>
                        </GridColumn>
                      </GridRow>

                      <GridRow columns={3}>
                        <GridColumn>
                          <Input
                            name='packagingWidth'
                            label={
                              <>
                                <FormattedMessage id='global.packageWidth' defaultMessage='Package Width' />
                                <Required />
                              </>
                            }
                            inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                          />
                        </GridColumn>
                        <GridColumn>
                          <Input
                            name='packagingHeight'
                            label={
                              <>
                                <FormattedMessage id='global.packageHeight' defaultMessage='Package Height' />
                                <Required />
                              </>
                            }
                            inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                          />
                        </GridColumn>
                        <GridColumn>
                          <Input
                            name='packagingLength'
                            label={
                              <>
                                <FormattedMessage id='global.packageLength' defaultMessage='Package Length' />
                                <Required />
                              </>
                            }
                            inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                          />
                        </GridColumn>
                      </GridRow>

                      {false && (
                        <GridRow>
                          <GridColumn>
                            <Input
                              label={formatMessage({
                                id: 'global.packagesPerPallet',
                                defaultMessage: 'Packages per Pallet'
                              })}
                              name='packagesPerPallet'
                              inputProps={{ placeholder: '0', type: 'number', min: 1 }}
                            />
                          </GridColumn>
                        </GridRow>
                      )}
                    </>
                  ) : null}

                  <GridRow>
                    <GridColumn>
                      <DivTitleSegment>
                        <FormattedMessage id='global.document' defaultMessage='DOCUMENT' />
                      </DivTitleSegment>
                    </GridColumn>
                  </GridRow>
                  {documentTypes.length && (
                    <>
                      <GridRow>
                        <GridColumn>
                          <div style={{ marginBottom: '6px' }}>
                            <FormattedMessage
                              id='global.existingDocumentsTitle'
                              defaultMessage='Existing Documents'
                            />
                          </div>
                          <AttachmentManager
                            asModal
                            returnSelectedRows={rows => attachDocumentsManager(rows, values, setFieldValue)}
                            label={'bla'}
                          />
                        </GridColumn>
                      </GridRow>
                      <GridRow
                        style={{ paddingBottom: '12.5px !important', marginTop: '12.5px !important' }}>
                        <GridColumn>
                          <Dropdown
                            name='documents.documentType'
                            closeOnChange
                            options={documentTypes}
                            inputProps={{
                              placeholder: formatMessage({
                                id: 'global.documentType.choose',
                                defaultMessage: 'Choose document type'
                              }),
                              onChange: (e, { name, value }) => {
                                handleChangeDocumentType(e, name, value)
                              }
                            }}
                            label={
                              <FormattedMessage id='global.uploadDocumentTitle' defaultMessage='Upload Document' />
                            }
                          />
                        </GridColumn>
                      </GridRow>
                    </>
                  )}

                  {values.documents.documentType && openUpload ? (
                    <GridRow>
                      <GridColumn>
                        <UploadAttachment
                          {...props}
                          header={
                            <DivIcon
                              onClick={() => setOpenUpload(!openUpload)}
                            >
                              <CloseIcon name='close' color='grey' />
                            </DivIcon>
                          }
                          hideAttachments
                          edit={getSafe(() => popupValues.id, 0)}
                          attachments={values.documents.attachments}
                          name='documents.attachments'
                          type={documentType}
                          fileMaxSize={20}
                          onChange={files => {
                            attachDocumentsUploadAttachment(files, values, setFieldValue)
                          }}
                          data-test='settings_product_catalog_attachments_drop'
                          emptyContent={
                            <div style={{ margin: '25px' }}>
                              <div>
                                <StyledUploadIcon />
                              </div>
                              {formatMessage({ id: 'addInventory.dragDrop' })}
                              <br />
                              <FormattedMessage
                                id='addInventory.dragDropOr'
                                defaultMessage={'or {link} to select from computer'}
                                values={{
                                  link: (
                                    <a>
                                      <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                    </a>
                                  )
                                }}
                              />
                            </div>
                          }
                          uploadedContent={
                            <label>
                              <FormattedMessage
                                id='addInventory.dragDrop'
                                defaultMessage={'Drag and drop to add file here'}
                              />
                              <br />
                              <FormattedMessage
                                id='addInventory.dragDropOr'
                                defaultMessage={'or {link} to select from computer'}
                                values={{
                                  link: (
                                    <a>
                                      <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                    </a>
                                  )
                                }}
                              />
                            </label>
                          }
                        />
                      </GridColumn>
                    </GridRow>
                  ) : null}
                  {values.documents.attachments && (
                    <GridRow>
                      <GridColumn>
                        <ProdexGrid
                          virtual={false}
                          tableName='company_product_documents'
                          onTableReady={() => {}}
                          columns={columns}
                          normalWidth={true}
                          rows={attachments
                            .map(row => ({
                              ...row,
                              documentTypeName: row.documentType
                            }))
                            .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))}
                          rowActions={[
                            {
                              text: (
                                <FormattedMessage id='global.unlink' defaultMessage='Unlink'>
                                  {text => text}
                                </FormattedMessage>
                              ),
                              callback: async row => {
                                try {
                                  if (row.linked) {
                                    const unlinkResponse = await props.removeAttachmentLinkCompanyProduct(
                                      popupValues.id,
                                      row.id
                                    )
                                    datagrid.loadData() // Reload product with updated attachments
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.success' defaultMessage='Success' />,
                                        <FormattedMessage
                                          id='addInventory.unlinkeAttachment'
                                          defaultMessage='Attachment was successfully unlinked.'
                                        />
                                      ),
                                      {
                                        appearance: 'success'
                                      }
                                    )
                                    if (unlinkResponse.value.data.lastLink) {
                                      confirm(
                                        formatMessage({
                                          id: 'confirm.attachments.delete.title',
                                          defaultMessage: 'Delete Attachment'
                                        }),
                                        formatMessage(
                                          {
                                            id: 'confirm.attachments.delete.content',
                                            defaultMessage: `Do you want to delete file ${row.name}?`
                                          },
                                          { fileName: row.name }
                                        )
                                      ).then(
                                        async () => {
                                          // confirm
                                          try {
                                            await props.removeAttachment(row.id)
                                            toastManager.add(
                                              generateToastMarkup(
                                                <FormattedMessage
                                                  id='notifications.attachments.deleted.header'
                                                  defaultMessage='File Deleted'
                                                />,
                                                <FormattedMessage
                                                  id='notifications.attachments.deleted.content'
                                                  defaultMessage={`File ${row.name} successfully deleted.`}
                                                  values={{ fileName: row.name }}
                                                />
                                              ),
                                              {
                                                appearance: 'success'
                                              }
                                            )
                                          } catch (e) {
                                            console.error(e)
                                          }
                                        },
                                        () => {
                                          // cancel
                                        }
                                      )
                                    }
                                  }
                                  setAttachments(attachments.filter(o => o.id !== row.id))
                                } catch (e) {
                                  console.error(e)
                                }
                              }
                            }
                          ]}
                        />
                      </GridColumn>
                    </GridRow>
                  )}
                </StyledGrid>
              </FlexContent>

              <BottomButtons className='bottom-buttons'>
                {!openGlobalAddForm && (
                  <Button.Reset onClick={closePopup} data-test='settings_product_popup_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Reset>
                )}
                <Popup
                  disabled={editable}
                  trigger={
                    <DisabledButtonWrapped>
                      <CustomButtonSubmit
                        disabled={!editable}
                        data-test='settings_product_popup_submit_btn'
                        onClick={() => {
                          formikProps.validateForm().then(err => {
                            const errors = Object.keys(err)
                            if (errors.length && errors[0] !== 'isCanceled') {
                              // Errors found
                              formikProps.submitForm() // to show errors
                            } else {
                              // No errors found
                              setLoadSidebar(true)
                              handlerSubmit(formikProps.values, formikProps,  props, attachments, setLoadSidebar)
                            }
                          })
                        }}>
                        <FormattedMessage id='global.send' defaultMessage='Send'>
                          {text => text}
                        </FormattedMessage>
                      </CustomButtonSubmit>
                    </DisabledButtonWrapped>
                  }
                  content={
                    <FormattedMessage
                      id='settings.product.offerExists'
                      defaultMessage='Product cannot be edited, as it already has ProductOffers linked to it.'>
                      {text => text}
                    </FormattedMessage>
                  }
                />
              </BottomButtons>
              <ErrorFocus />
            </CustomForm>
          </Modal>
        )
      }}
    </Formik>
  )
}

ProductPopup.ProductPopup = {

}

ProductPopup.defaultProps ={

}

export default ProductPopup