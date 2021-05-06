import { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
// Components
import BasicButton from '../../../../components/buttons/BasicButton'
//Styles
import { ModalCustom, DivConent } from './styles'
/**
 * Immediate Success Modal Popup
 * @category Alert
 * @component
 */
const ImmediateModal = props => {
  const {
    open
  } = props
  
  const [openModal, setOpenModal] = useState(open)

  return (
    <ModalCustom
      open={openModal}
      onClose={() => {
        setOpenModal(false)
      }}
      closeIcon={false}>

      <Modal.Content>
          <DivConent>
            <div style={{backgroundColor: "rgba(0, 199, 249, 0.2)", width: "100px", height: "100px", borderRadius: "50%", margin: "20px auto"}}>
              <div style={{backgroundColor: "#00c7f9", width: "80px", height: "80px", margin: "10px", borderRadius: "50%", position: "absolute"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="36" viewBox="0 0 49 36" style={{margin: "22px 15px"}}>
                  <g fill="none" fill-rule="evenodd">
                      <g fill="#FFF" fill-rule="nonzero">
                          <g>
                              <g>
                                  <g>
                                      <path d="M16.276 35.514l14.104-27h7.05l-14.103 27h-7.05zm10.859-4.015L41.243 4.501h7.05L34.196 31.505l-7.06-.006zm-26.332.006L14.906 4.501h7.05L7.855 31.505H.803zm11.036-4.014L25.942.486h7.05L18.89 27.491h-7.05z" transform="translate(-711 -371) translate(405 300) translate(280 39) translate(26 32)"/>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </g>
                </svg>
              </div>
            </div>
          </DivConent>
          <DivConent>
            <h2>
              <FormattedMessage
                id='immediateNotification.congratulations'
                defaultMessage='Congratulations!'
              />
            </h2>
          </DivConent>
          <DivConent>
            <p style={{paddingBottom:"20px"}}>
              <FormattedMessage
                id='immediateNotification.content'
                defaultMessage='Your company qualifies to buy and sell on BluePallet Direct. BluePallet Direct anonymously displays selected inventory in a marketplace for all qualifying members on the BluePallet platform to view and purchase.'
              />
            </p>
          </DivConent>
          <DivConent>
            <BasicButton
              onClick={() => {
                setOpenModal(false)
              }}>
              <b>
                <FormattedMessage id='immediateNotification.listInventory' defaultMessage='List Inventory' />
              </b>
            </BasicButton>
            <BasicButton
              noBorder
              textcolor='#ffffff !important'
              background='#00c7f9 !important'
              onClick={async () => {
              }}>
              <b>
                <FormattedMessage id='immediateNotification.explore' defaultMessage='Explore Now' />
              </b>
            </BasicButton>
          </DivConent>
      </Modal.Content>
    </ModalCustom>
  )
}

ImmediateModal.propTypes = {
  open: PropTypes.bool
}

ImmediateModal.defaultProps = {
  open: true
}

export default injectIntl(ImmediateModal)
