/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'

// Components
import { Icon, Popup } from 'semantic-ui-react'
import { Button } from 'formik-semantic-ui-fixed-validation'

// Styles
import {
  DivComponentWrapper,
  DivContent,
  DivDocumentName,
  DivIconWrapper
} from './DocumentStatus.styles'

// Services
import { downloadFile } from './DocumentStatus.services'
import { getSafe } from '~/utils/functions'
import { downloadAttachment } from '~/modules/inventory/actions'

const DocumentStatus = props => {
  const { fileIndex, item, uploadedFile, onClick, onRemove } = props

  if (!item) return null
  return (
    <DivComponentWrapper>
      <DivContent>
        <DivDocumentName>{item.name}</DivDocumentName>
        <DivIconWrapper>
          {!!uploadedFile
            ? (
              <Popup
                trigger={
                  <a
                    href='#'
                    onClick={() => downloadFile(uploadedFile.name, uploadedFile.id, props)}
                  >
                    <Icon name='file' className='positive'/>
                  </a>
                }
                content={uploadedFile.name}
              />
            ) : (
              <Icon name='file' className='unknown' />
            )
          }
        </DivIconWrapper>
      </DivContent>

      {!!uploadedFile
        ? (fileIndex
          ? (
            <Button
              onClick={() => onRemove(item.id)}
              basic>
              <FormattedMessage id='company.remove' defaultMessage='Remove'>
                {text => text}
              </FormattedMessage>
            </Button>
          ) : (
            <Button
              onClick={() => onClick(item.id)}
              primary>
              <FormattedMessage id='company.update' defaultMessage='Update'>
                {text => text}
              </FormattedMessage>
            </Button>
          )
        ) : (
          <Button
            basic
            onClick={() => onClick(item.id)}>
            <FormattedMessage id='company.add' defaultMessage='Add'>
              {text => text}
            </FormattedMessage>
          </Button>
        )
      }
    </DivComponentWrapper>
  )
}

function mapStateToProps(state) {
  return { }
}

DocumentStatus.propTypes = {
  fileIndex: PropTypes.bool,
  item: PropTypes.object,
  uploadedFile: PropTypes.object,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
}

DocumentStatus.defaultProps = {
  fileIndex: false,
  item: null,
  uploadedFile: null,
  onClick: () => { },
  onRemove: () => { },
}

export default injectIntl(connect(mapStateToProps, { downloadAttachment })(DocumentStatus))