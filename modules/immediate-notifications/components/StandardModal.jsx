import { Modal } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'
// Components
import BasicButton from '../../../components/buttons/BasicButton'
// Styles
import { ModalCustom, DivConent, DivOuterCircle, DivInnerCircle } from './styles'
// Constants
import { redirectUrls } from './constants'


/**
 * Standard Modal Popup
 * @category Immediate Notification
 * @component
 */
const StandardModal = props => {  
  const {
    state,
    setState
  } = props

  const handleClick = redirect => {
    if(!redirect || redirect === 'CLOSE') {
      setState({
        ...state,
        open: false
      })
    } else if(redirect === 'DIALOG_CREDIT_DECISION_APPEAL') {
      setState({
        ...state,
        type: 'appeal'
      })
    } else {
      window.location.href = redirectUrls[redirect]
    }
  }

  return (
    <ModalCustom
      open={state.open}
      onClose={() => {
        setState({...state, open: false})
      }}
      closeIcon={false}>

      <Modal.Content>
          <DivConent>
            <DivOuterCircle 
              bkgColor={
                state.icon === "INFO" ? "rgba(0, 199, 249, 0.2)" : 
                state.icon === "WARNING" ? "rgba(255, 157, 66, 0.2)" :
                state.icon === "SUCCESS" ? "rgba(132, 194, 37, 0.2)" :
                "rgba(0, 199, 249, 0.2)"
              }
            >
              <DivInnerCircle 
                bkgColor={
                  state.icon === "INFO" ? "#00c7f9" : 
                  state.icon === "WARNING" ? "#ff9d42" :
                  state.icon === "SUCCESS" ? "#84c225" :
                  "#00c7f9"
                }
              >
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
              </DivInnerCircle>
            </DivOuterCircle>
          </DivConent>
          <DivConent>
            <h2>
              {state.title}
            </h2>
          </DivConent>
          <DivConent>
            <p style={{paddingBottom:"20px"}}>
              {state.text}
            </p>
          </DivConent>
          <DivConent>
            { state.leftButtonText ?
              <BasicButton
                onClick={() => handleClick(state.leftButtonRedirect)}>
                <b>
                  {state.leftButtonText}
                </b>
              </BasicButton>
            :
              <></>
            }
            { state.rightButtonText ?
              <BasicButton
                noBorder
                textcolor='#ffffff !important'
                background='#00c7f9 !important'
                onClick={() => handleClick(state.rightButtonRedirect)}>
                <b>
                  {state.rightButtonText}
                </b>
              </BasicButton>
            :
              <></>
            }
          </DivConent>
      </Modal.Content>
    </ModalCustom>
  )
}

export default injectIntl(StandardModal)
