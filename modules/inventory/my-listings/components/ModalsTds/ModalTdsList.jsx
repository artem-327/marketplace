import {
  TdsHeader,
  TemplateApply,
  TemplateDelete,
  TemplateGrid,
  TemplateRow,
  TemplateTitle,
  TemplateWrapper
} from './ModalsTds.styles'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Modal, Dimmer, Loader } from 'semantic-ui-react'
import { func, bool, array } from 'prop-types'
import { Trash2 } from 'react-feather'
// Services
import { applyTemplate } from './ModalsTds.services'

const ModalTdsList = props => {

  const {
    open,
    tdsTemplates,
    tdsTemplatesLoading,
    deleteTdsTemplate,
    intl: { formatMessage }
  } = props

  return (
    <Modal open={open} onClose={props.closeTdsModal}>
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
                    applyTemplate(props, template)
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
