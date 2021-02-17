/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import {getSafe} from "~/utils/functions"

//Components
import { Button, GridColumn, GridRow } from 'semantic-ui-react'

import { GridStyled, DivRowHeader, DivTopControl, DivRightButtons } from './RowComponent.styles'

const RowComponent = props => {
  const {
    isExpanded,
    sectionState,
    header,
    content,
    onChangeButtonClick,
    onCloseButtonClick,
    submitButtonCaption,
    onSubmitClick,
    submitButtonDisabled,
    bottomLeftContent
  } = props

  return (
    <GridRow>
      <GridColumn>
        <GridStyled>
          <GridRow>
            <GridColumn width={8}>
              <DivRowHeader>{header}</DivRowHeader>
            </GridColumn>
            {sectionState.accepted && (
              <GridColumn width={8}>
                <DivRightButtons>
                  {isExpanded ? (
                    <DivTopControl
                      onClick={() => onCloseButtonClick()}
                    >
                      Close
                    </DivTopControl>
                  ) : (
                    <DivTopControl
                      onClick={() => onChangeButtonClick()}
                    >
                      Change
                    </DivTopControl>
                  )}
                </DivRightButtons>
              </GridColumn>
            )}
          </GridRow>

          {(sectionState.accepted || isExpanded) && (
            <GridRow>
              <GridColumn>
                {content}
              </GridColumn>
            </GridRow>
          )}

          {isExpanded && (
            <GridRow>
              <GridColumn width={8}>
                {bottomLeftContent ? bottomLeftContent : ''}
              </GridColumn>
              <GridColumn width={8} className='buttons'>
                <DivRightButtons>
                  <Button
                    color='blue'
                    disabled={submitButtonDisabled}
                    onClick={() => onSubmitClick()}
                  >
                    {submitButtonCaption}
                  </Button>
                </DivRightButtons>
              </GridColumn>
            </GridRow>
          )}
        </GridStyled>

      </GridColumn>
    </GridRow>
  )
}

RowComponent.propTypes = {
  bottomLeftContent: PropTypes.any,
  submitButtonDisabled: PropTypes.bool,
  itemsCount: PropTypes.number
}

RowComponent.defaultProps = {
  bottomLeftContent: null,
  submitButtonDisabled: false,
  itemsCount: 0
}

export default injectIntl(RowComponent)