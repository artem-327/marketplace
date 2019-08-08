import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import React from "react";


export const errorMessages = {
  invalidString: <FormattedMessage id='validation.invalidString' defaultMessage='Invalid value' />,
  invalidEmail: <FormattedMessage id='validation.invalidEmail' defaultMessage='Invalid e-mail address' />,
  invalidDate: <FormattedMessage id='validation.invalidDate' defaultMessage='Invalid date' />,
  mustBeNumber: <FormattedMessage id='validation.mustBeNumber' defaultMessage='Must be an number' />,
  lotHasToBeSelected: <FormattedMessage id='validation.lostHasToBeSelected' defaultMessage='Lot has to be selected' />,
  lotUnique: <FormattedMessage id='validation.lotUnique' defaultMessage='Lot has to be unique' />,
  requiredMessage: <FormattedMessage id='validation.required' defaultMessage='Required' />,
  invalidPhoneNumber: <FormattedMessage id='validation.phoneNumber' defaultMessage={`Please, enter valid phone number (numbers and \'+-()\' characters can be used)`} />,
  zipCode: <FormattedMessage id='validation.zipCode' defaultMessage='Enter zip code' />,
  minLength: (min) => <FormattedMessage id='validation.minLength' defaultMessage={`Minimum length is ${min}`} values={{ min }} />,
  enterPhoneNumber: <FormattedMessage id='validation.enterPhoneNumber' defaultMessage='Enter phone number' />,
  minDigits: (min) => <FormattedMessage id='validation.minDigits' defaultMessage={`Must have ${min} digits`} values={{ min }} />,
  // exactDigits: (num) => <FormattedMessage id='validation.exactDigits' defaultMessage={`There has to be exactly ${value} digits`} />,  
  greaterThan: (value) => <FormattedMessage id='validation.greaterThan' values={{ value }} defaultMessage={`Must be greater than ${value}`} />,
  maxDecimals: (max) => <FormattedMessage id='validation.maxDecimals' values={{ max }} defaultMessage={`There can be maximally ${max} decimal places`} />,
  oneLowercaseChar: <FormattedMessage id='validation.oneLowercaseChar' defaultMessage='At least one lowercase char' />,
  oneUppercaseChar: <FormattedMessage id='validation.oneUppercaseChar' defaultMessage='At least one uppercase char' />,
  oneSpecialChar: <FormattedMessage id='validation.oneSpecialChar' defaultMessage='At least one number or special char (@,!,#, etc)' />,
  passwordsMustMatch: <FormattedMessage id='validation.passwordMatch' defaultMessage='Passwords must match' />,
  exactLength: (len) => <FormattedMessage id='validation.exactLength' defaultMessage={`Must be ${len} characters long`} values={{ len }} />,
  unique: (name = '') => <FormattedMessage id='validation.unique' defaultMessage={`${name} has to be unique`} values={{ name }} />,
  minimum: (min) => <FormattedMessage id='validation.minimum' values={{ min }} />,
  maximum: (max) => <FormattedMessage id='validation.maximum' values={{ max }} />,
  minUpToMax: <FormattedMessage id='validation.minUpToMax' defaultMessage='Min value should be less or equal to Max value' />,
  maxAtLeastMin: <FormattedMessage id='validation.maxAtLeastMin' defaultMessage='Max value should be greater or equal to Min value' />
}

export const provinceObjectRequired = (hasProvinces) => (
  Yup.lazy(() =>
    hasProvinces
      ? Yup.string(errorMessages.invalidString).required(errorMessages.requiredMessage)
      : Yup.mixed().notRequired())
)


export const passwordValidation = () => (
  Yup.string().trim()
    .min(8, errorMessages.minLength(8))
    .required(errorMessages.requiredMessage)
    .matches(/[a-z]/, errorMessages.oneLowercaseChar)
    .matches(/[A-Z]/, errorMessages.oneUppercaseChar)
    .matches(/[^a-zA-Z\s]+/, errorMessages.oneSpecialChar)
)

export const phoneValidation = () => (
  Yup.string().trim()
    .min(3, errorMessages.minLength(3))
    .matches(/([0-9\(\)\-\+\s])/, errorMessages.invalidPhoneNumber)
)
