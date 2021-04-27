import * as Yup from 'yup'
import { errorMessages } from '~/constants/yupValidation'
import { UnitOfPackaging } from '~/components/formatted-messages'
import debounce from 'lodash/debounce'
import { getSafe, uniqueArrayByKey, getDesiredCasProductsProps } from '~/utils/functions'

export const checkPalletParamsRequired = v => {
  return !!(v.palletMinPkgs || v.palletMaxPkgs || v.palletWeight || v.palletLength || v.palletWidth || v.palletHeight)
}

export const formValidation = () =>
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


export const filterPackagingTypes = (id, unitsAll, packagingTypesAll, setpackagingTypesReduced) => {
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

export const getInitialFormValues = props => {
  const {
    popupValues,
    palletWeightInitFromSettings,
    palletHeightInitFromSettings,
    palletWidthInitFromSettings,
    palletLengthInitFromSettings,
    palletWeightUnitInitFromSettings
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
      palletWeightUnit: getSafe(() => palletWeightUnitInitFromSettings, ''),
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
      palletWeightUnit: popupValues && typeof popupValues.palletWeightUnit !== 'undefined'
        ? popupValues.palletWeightUnit.id : '',
      documents: {
        documentType: null,
        attachments: []
      }
    }
  }
}


export const handlerSubmit = async (values, actions, props, attachments, setLoadSidebar) => {
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
    'palletMaxPkgs',
    'palletWeightUnit'
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


export const handleSearchChange = debounce((searchQuery, props) => {
  props.searchCompanyGenericProduct(searchQuery)
}, 250)


export const handleSearchNmfcNumberChange = debounce((searchQuery, props) => {
  props.getNmfcNumbersByString(searchQuery)
}, 250)


export const handleChangeDocumentType = (e, name, value, state) => {
  state.setOpenUpload(true)
  state.setDocumentType(value)
}

export const attachDocumentsManager = (newDocuments, values, setFieldValue, state) => {
  const newDocArray = newDocuments.map(att => ({
    id: att.id,
    name: att.name,
    documentType: att.documentType.name,
    linked: false
  }))
  const docArray = uniqueArrayByKey(state.attachments.concat(newDocArray), 'id')
  state.setAttachments(docArray)
}

export const attachDocumentsUploadAttachment = (att, values, setFieldValue, state) => {
  const newDocArray = [
    {
      id: att.id,
      name: att.name,
      documentType: att.documentType.name,
      linked: false
    }
  ]
  const docArray = uniqueArrayByKey(state.attachments.concat(newDocArray), 'id')
  state.setAttachments(docArray)
}

export const handleChangePackagingType = (e, value, setFieldValue, values, props) => {
  const { packagingTypesAll } = props
  const selectedPackingType = packagingTypesAll.find(type => type.id === value)
  const elementsToInclude = ['palletPkgMax', 'palletPkgMin', 'packageWeight']
  elementsToInclude.forEach(element => {
    if (selectedPackingType && selectedPackingType[element]) {
      switch (element) {
        case 'palletPkgMin':
          setFieldValue('palletMinPkgs', selectedPackingType['palletPkgMin'])
        case 'palletPkgMax':
          setFieldValue('palletMaxPkgs', selectedPackingType['palletPkgMax'])
        case 'packageWeight':
          values.packagingUnit === selectedPackingType?.weightUnit?.id ? setFieldValue('packageWeight', parseFloat(values.packagingSize) + parseFloat(selectedPackingType?.weight)) : setFieldValue('packageWeight', '')
        default:
          return
      }
    }
  })
}