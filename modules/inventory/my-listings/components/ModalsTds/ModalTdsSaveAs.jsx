import { Formik } from 'formik'
import { Modal } from 'semantic-ui-react'
import { Button, Input } from 'formik-semantic-ui-fixed-validation'
import { func, bool, array } from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
// Services
import { validationScheme, saveTdsTemplateAs } from './ModalsTds.services'
// Constants
import { initValues } from './ModalsTds.constants'
// Styles
import { TdsActions, TdsHeader, TemplateColumn, TemplateGrid, TemplateRow, TemplateTitle } from './ModalsTds.styles'

/**
 * ModalTdsSaveAs Component
 * @component
 * @category Inventory - My Listings
 */
const ModalTdsSaveAs = props => {
  const {
    open,
    intl: { formatMessage }
  } = props

  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      validationSchema={validationScheme}
      onSubmit={async (values, { setSubmitting }) => {
        await saveTdsTemplateAs(props, values.templateName)
        setSubmitting(false)
      }}>
      {formikProps => {
        let { submitForm } = formikProps

        return (
          <Modal open={open} onClose={props.closeTdsModal} closeIcon={true}>
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
