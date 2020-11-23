import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import * as Actions from '../../actions'
import styled from 'styled-components'
import { FileText } from 'react-feather'

import {
  DetailMessage,
  StyledGrid
} from '../layout'

import {
  Grid,
  GridRow,
  GridColumn
} from 'semantic-ui-react'

export const DocumentRow = styled(GridRow)`
  padding: 11px 20px 10px 15px;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;  

  &.row {
    margin: 2px 0 !important;
  }
`

export const AttachmentsGrid = styled(Grid)`
  width: 100%;
  max-width: 580px;
  
  &.ui.grid {
    margin: 0;
    padding: 0;
  }
`

class GenericProductRequest extends Component {
  render() {
    const { row } = this.props

    const attachments = [
      { name: 'test name 1' },
      { name: 'test name 2' },
      { name: 'test name 3' }
    ]

    return (
      <DetailMessage>
        <StyledGrid>
          <GridRow>
            <GridColumn width={16}>
              <FormattedMessage
                id='alerts.genericProduct'
                defaultMessage='{name} from {company} has requested to upload a new Company Generic Product. Please see the document attached. Once uploaded, click {here} to send a notification to the requester that the upload has been completed.'
                values={{
                  name: (<b>Some Name</b>),
                  company: (<b>Company name</b>),
                  here: (
                    <span
                      style={{ color: '#2599d5', cursor: 'pointer' }}
                      onClick={() => console.log('!!!!!!!!!! click here to send...')}
                    >
                      <FormattedMessage id='alerts.here' defaultMessage='here'/>
                    </span>)
                }}
              />
            </GridColumn>
          </GridRow>
          <GridRow style={{ paddingBottom: '0' }}>
            <GridColumn width={10}>
              <FormattedMessage id='alerts.attachments' defaultMessage='Attachments:'/>
            </GridColumn>
          </GridRow>
          <AttachmentsGrid>
            {attachments.map(att => {
              return (
                <DocumentRow>
                  <GridColumn width={8} style={{ display: 'flex', alignItems: 'center' }}>
                    <FileText size='18' color='#20273a' />
                    <span style={{ marginLeft: '10px'}}>{att.name}</span>
                  </GridColumn>
                  <GridColumn width={3}>
                    {1225}
                  </GridColumn>
                  <GridColumn
                    width={5}
                    onClick={() => console.log('!!!!!!!!!! download onClick att', att)}
                  >
                    <div style={{ color: '#2599d5', cursor: 'pointer', float: 'right', marginRight: '15px' }}>
                      <FormattedMessage id='global.download' defaultMessage='Download:'/>
                    </div>
                  </GridColumn>
                </DocumentRow>
              )}
            )}
          </AttachmentsGrid>
        </StyledGrid>
      </DetailMessage>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(withToastManager(GenericProductRequest)))