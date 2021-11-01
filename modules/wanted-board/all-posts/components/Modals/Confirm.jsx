import { connect } from 'react-redux'
import * as Actions from '../../../actions'
import {
  Modal,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Segment
} from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withDatagrid } from '../../../../datagrid'
import { withToastManager } from 'react-toast-notifications'

const ModalContent = styled(Modal.Content)`
  padding: 1.5rem !important;
  margin-bottom: 10px !important;
`


const ToggleForm = styled(Form)`
  opacity: ${props => (props.hidden ? 0 : 1)};
`

const SubmitButton = styled(Button)`
  background-color: #2599d5 !important;
  color: #ffffff !important;
`

const ConfirmModal = props => {

  const {
    purchaseRequestPending,
    updatingDatagrid,
    closeConfirmModal
  } = props

  return (
    <>
      <ToggleForm
        validationSchema={()=>{}}
        validateOnChange
        enableReinitialize
        initialValues=''
        render={(formikProps) => {

          return (
            <>
              <Modal closeIcon onClose={closeConfirmModal} open={true} size='tiny'>
                <ModalContent>
                  <p><FormattedMessage id='wantedboard.respond' defaultMessage='Respond' /></p>
                  <p>
                    okokokok
                  </p>
                  <Grid verticalAlign='middle'>
                    <GridRow columns={3}>
                      <Button basic type='button' onClick={closeConfirmModal}>
                        <FormattedMessage id='aa' defaultMessage='Use Existing Listing' tagName='span' />
                      </Button>
                      <SubmitButton
                        loading={purchaseRequestPending || updatingDatagrid}
                        primary
                        type='submit'
                        onClick={() => {
                        }}
                      >
                        <FormattedMessage id='bb' defaultMessage='Create New Listing' tagName='span' />
                      </SubmitButton>
                    </GridRow>
                  </Grid>
                </ModalContent>
              </Modal>
            </>
          )
        }}
      />
    </>
  )
}

function mapStateToProps(store, props) {
  return {
    ...store.wantedBoard,
    row: store?.wantedBoard?.infoModalData
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(ConfirmModal))))
