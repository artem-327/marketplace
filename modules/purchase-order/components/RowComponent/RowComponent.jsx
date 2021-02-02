/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import {getSafe} from "~/utils/functions"

//Components
import {
  Container as SemanticContainer,
  Header,
  Button,
  Icon,
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Popup,
  Message,
  Divider
} from 'semantic-ui-react'

import {
  GridStyled
} from './RowComponent.styles'


//Hooks
//import { usePrevious } from '../../../hooks'



//Services
//import ErrorFocus from '../../../components/error-focus'
//import {
//} from './Checkout.services'

const RowComponent = props => {
  const [tmp, setTmp] = useState(false)

  const {
    isExpanded,
    sectionState,
    header,
    collapsedContent,
    expandedContent,
    onChangeButtonClick,
    onCloseButtonClick,
    submitButtonCaption,
    onChangeButtonText,
    onSubmitClick
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
    if (isExpanded) onChangeButtonText()
  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {
    if (isExpanded) onChangeButtonText()
  }, [isExpanded])


  return (
    <GridRow>
      <GridColumn>

        <GridStyled>

          <GridRow>
            <GridColumn width={8}>
              {header}
            </GridColumn>
            {sectionState.accepted && (
              <GridColumn width={8}>
                {isExpanded ? (
                  <Button
                    onClick={() => onCloseButtonClick()}
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    onClick={() => onChangeButtonClick()}
                  >
                    Change
                  </Button>
                )}
              </GridColumn>
            )}
          </GridRow>

          <GridRow>
            <GridColumn>
              {isExpanded ? expandedContent : collapsedContent}
            </GridColumn>
          </GridRow>

          {isExpanded && (
            <GridRow>
              <GridColumn width={8}>

              </GridColumn>
              <GridColumn width={8}>
                <Button
                  onClick={() => onSubmitClick()}
                >
                  {submitButtonCaption}
                </Button>
              </GridColumn>
            </GridRow>
          )}
        </GridStyled>

      </GridColumn>
    </GridRow>
  )
}

RowComponent.propTypes = {
  itemsCount: PropTypes.number
}

RowComponent.defaultProps = {
  itemsCount: 0
}

export default injectIntl(RowComponent)