import { Component } from 'react'
import {
  TdsHeader,
  TemplateApply,
  TemplateDelete,
  TemplateGrid,
  TemplateRow,
  TemplateTitle,
  TemplateWrapper
} from './styles'
import * as val from 'yup'
import { errorMessages } from '~/constants/yupValidation'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Modal, Dimmer, Loader } from 'semantic-ui-react'
import { func, bool, array } from 'prop-types'
import { Trash2 } from 'react-feather'

const initValues = {
  templateName: ''
}

const validationScheme = val.lazy(values => {
  return val.object().shape({
    templateName: val.string().required(errorMessages.requiredMessage)
  })
})

class ModalTdsList extends Component {
  state = {
    initValues: initValues
  }

  applyTemplate = async template => {
    const { values, setValues, setFieldTouched, closeTdsModal } = this.props

    const tdsFields = JSON.parse(template)
    setValues({
      ...values,
      edit: {
        ...values.edit,
        tdsFields: tdsFields
      }
    })
    setFieldTouched('edit.tdsFields[0].property', true, false)
    closeTdsModal()
  }

  render() {
    const {
      open,
      tdsTemplates,
      tdsTemplatesLoading,
      deleteTdsTemplate,
      intl: { formatMessage }
    } = this.props

    return (
      <Modal open={open} onClose={this.props.closeTdsModal}>
        <TdsHeader>
          <FormattedMessage id='addInventory.tdsTemplates' defaultMessage='TDS Templates' />
        </TdsHeader>
        <Modal.Content>
          <Dimmer inverted active={tdsTemplatesLoading}>
            <Loader active={tdsTemplatesLoading} />
          </Dimmer>
          <TemplateTitle>
            <FormattedMessage id='addInventory.tdsTemplates.savedTemplates' defaultMessage='Saved Templates' />
          </TemplateTitle>
          <TemplateGrid>
            {tdsTemplates.map(({ id, name, template }) => (
              <TemplateRow>
                <TemplateWrapper>
                  {name}
                  <TemplateApply
                    onClick={() => {
                      this.applyTemplate(template)
                    }}>
                    <FormattedMessage id='global.apply' defaultMessage='Apply' />
                  </TemplateApply>
                </TemplateWrapper>
                <TemplateDelete icon onClick={() => deleteTdsTemplate(id)}>
                  <Trash2 />
                </TemplateDelete>
              </TemplateRow>
            ))}
          </TemplateGrid>
        </Modal.Content>
      </Modal>
    )
  }
}

ModalTdsList.propTypes = {
  open: bool,
  closeTdsModal: func,
  setValues: func,
  setFieldTouched: func,
  deleteTdsTemplate: func,
  tdsTemplatesLoading: bool,
  tdsTemplates: array
}

ModalTdsList.defaultProps = {
  open: false,
  closeTdsModal: () => {},
  setValues: () => {},
  setFieldTouched: () => {},
  deleteTdsTemplate: () => {},
  tdsTemplatesLoading: false,
  tdsTemplates: []
}

export default injectIntl(ModalTdsList)
