import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
//Constants
import { errorMessages, dateValidation, phoneValidation } from '../../constants/yupValidation'

export const productGroupsPoprupFormValidation = () =>
Yup.lazy(values =>
    Yup.object().shape({
        name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage)
    })
)


export const nameValidation = (index, val, vals) => {
    if (val.length >= 3) {
        // length is ok, check if name already exists
        if (vals.find((o, i) => o.alternativeName === val && i !== index)) {
        // name already exists
        return {
            color: 'red',
            description: <FormattedMessage id='settings.duplicateName' defaultMessage='Duplicate name!' />,
            canSave: false
        }
        } else {
        return {
            color: 'green',
            description: <FormattedMessage id='settings.clickToSave' defaultMessage='Click to save' />,
            canSave: true
        }
        }
    } else {
        //too short string
        return {
        color: 'red',
        description: <FormattedMessage id='settings.nameTooShort' defaultMessage='Name too short!' />,
        canSave: false
        }
    }
}


Yup.addMethod(Yup.object, 'uniqueProperty', function (propertyName, message) {
    return this.test('unique', message, function (value) {
        if (!value || !value[propertyName]) {
        return true
        }
    
        const { path } = this
        const options = [...this.parent]
        const currentIndex = options.indexOf(value)
    
        const subOptions = options.slice(0, currentIndex)
    
        if (subOptions.some(option => option[propertyName] === value[propertyName])) {
        throw this.createError({
            path: `${path}.${propertyName}`,
            message
        })
        }
    
        return true
    })
})
    
export const AddEditEchoProductPopupValidationScheme = Yup.object().shape({
    code: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.minLength(2)),
    name: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.minLength(2)),
    productGroup: Yup.number().required(errorMessages.minOneGroup),
    company: Yup.number().required(errorMessages.minOneCompany),
    emergencyPhone: phoneValidation(10),
    elements: Yup.array().of(
        Yup.object()
        .uniqueProperty(
            'casProduct',
            errorMessages.unique('CAS Product has to be unique')
        )
        .shape({
            name: Yup.string()
            .trim()
            .test('requiredIfProprietary', errorMessages.requiredMessage, function (value) {
                const { proprietary } = this.parent
                if (proprietary) {
                return value !== null && value !== ''
                }
                return true
            }),
            casProduct: Yup.string()
            .nullable()
            .trim()
            .test('requiredIfNotProprietary', errorMessages.requiredMessage, function (value) {
                const { proprietary } = this.parent
                if (!proprietary) {
                return parseInt(value)
                }
                return true
            }),
            assayMin: Yup.string()
            .test('v', errorMessages.minUpToMax, function (v) {
                const { assayMax: v2 } = this.parent
                if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                if (v2 === null || v2 === '' || isNaN(v2)) return true // No max limit value - can not be tested
                return Number(v) <= v2
            })
            .test('v', errorMessages.minimum(0), function (v) {
                if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                return Number(v) >= 0
            })
            .test('v', errorMessages.maximum(100), function (v) {
                if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                return Number(v) <= 100
            })
            .test('v', errorMessages.mustBeNumber, function (v) {
                return v === null || v === '' || !isNaN(v)
            }),
            assayMax: Yup.string()
            .test('v', errorMessages.maxAtLeastMin, function (v) {
                const { assayMin: v2 } = this.parent
                if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                if (v2 === null || v2 === '' || isNaN(v2)) return true // No min limit value - can not be tested
                return Number(v) >= v2
            })
            .test('v', errorMessages.minimum(0), function (v) {
                if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                return Number(v) >= 0
            })
            .test('v', errorMessages.maximum(100), function (v) {
                if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
                return Number(v) <= 100
            })
            .test('v', errorMessages.mustBeNumber, function (v) {
                return v === null || v === '' || !isNaN(v)
            })
        })
    ),
    sdsIssuedDate: dateValidation(false),
    sdsRevisionDate: dateValidation(false),
    tdsIssuedDate: dateValidation(false),
    tdsRevisionDate: dateValidation(false)
})