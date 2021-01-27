import React, { Component } from 'react'
import { TdsActions, TdsHeader, TemplateColumn, TemplateGrid, TemplateRow, TemplateTitle } from './styles'
import { getSafe } from '~/utils/functions'
import * as val from 'yup'
import { errorMessages } from '~/constants/yupValidation'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Formik } from 'formik'
import { Modal } from 'semantic-ui-react'
import { Button, Input } from 'formik-semantic-ui-fixed-validation'
import { func, bool, array } from 'prop-types'

const initValues = {
  templateName: ''
}

const validationScheme = val.lazy(values => {
  return val.object().shape({
    templateName: val.string().required(errorMessages.requiredMessage)
  })
})

class ModalTdsSaveAs extends Component {
  state = {
    initValues: initValues
  }

  submitForm = async (values, origTdsFields) => {
    let tdsFields = []
    if (getSafe(() => origTdsFields.length, '')) {
      origTdsFields.forEach((item, index) => {
        if (getSafe(() => item.property, '')) tdsFields.push(item)
      })
    }
    await this.props.saveTdsAsTemplate(values.templateName, JSON.stringify(tdsFields))
    this.props.closeTdsModal()
  }

  render() {
    const {
      open,
      intl: { formatMessage }
    } = this.props

    return (
      <Formik
        enableReinitialize
        initialValues={this.state.initValues}
        validationSchema={validationScheme}
        onSubmit={async (values, { setSubmitting }) => {
          await this.submitForm(values, this.props.tdsFields)
          setSubmitting(false)
        }}>
        {formikProps => {
          let { values, submitForm, resetForm } = formikProps
          this.values = values
          this.resetForm = resetForm
          this.formikProps = formikProps

          return (
            <Modal open={open} onClose={this.props.closeTdsModal}>
              <TdsHeader>
                <FormattedMessage id='addInventory.tdsTemplates' defaultMessage='TDS Templates' />
              </TdsHeader>
              <Modal.Content>
                <TemplateTitle>
                  <FormattedMessage id='addInventory.tdsTemplates.saveAsTemplate' defaultMessage='Save as Template' />
                </TemplateTitle>
                <TemplateGrid>
                  <TemplateRow>
                    <TemplateColumn>
                      <Input
                        name='templateName'
                        inputProps={{
                          fluid: true
                        }}
                        placeholder={formatMessage({
                          id: 'addInventory.tdsTemplates.enterTemplateName',
                          defaultMessage: 'Enter Template Name'
                        })}
                      />
                    </TemplateColumn>
                  </TemplateRow>
                </TemplateGrid>
              </Modal.Content>
              <TdsActions>
                <Button
                  basic
                  floated='right'
                  onClick={async () => {
                    submitForm()
                  }}>
                  <FormattedMessage id='global.save' defaultMessage='Save' />
                </Button>
              </TdsActions>
            </Modal>
          )
        }}
      </Formik>
    )
  }
}

ModalTdsSaveAs.propTypes = {
  open: bool,
  closeTdsModal: func,
  saveTdsAsTemplate: func,
  tdsFields: array
}

ModalTdsSaveAs.defaultProps = {
  open: false,
  closeTdsModal: () => {},
  saveTdsAsTemplate: () => {},
  tdsFields: []
}

export default injectIntl(ModalTdsSaveAs)
