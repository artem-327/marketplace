/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { Header, GridColumn, GridRow, Grid, Segment, Message, Button, ButtonGroup } from 'semantic-ui-react'

// Components
//import ErrorFocus from '../../../components/error-focus'
import BasicButton from '../../../../../components/buttons/BasicButton'

// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import {
  DivDetailWrapper,
  GridStyled,
  GridRowButton,

} from './ListingDetail.styles'

// Services
import {
} from './ListingDetail.services'

const ListingDetail = props => {
  const [tmp, set ] = useState(false)

  const {
    parentState,
    row
  } = props

  const { expandedRowIds, setExpandedRowIds } = parentState

  // Similar to call componentDidMount:
  useEffect(() => {
  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])


  console.log('!!!!!!!!!! ListingDetail props', props)

  return (
    <DivDetailWrapper>
      <GridStyled divided='horizontally'>
        <GridRow>
          <GridColumn width={8}>
            Seller ! !
          </GridColumn>
          <GridColumn width={8}>
            Pricing ! !
          </GridColumn>
        </GridRow>
      </GridStyled>

      <GridStyled>
        <GridRow>
          <GridColumn width={16}>
            menu ... ! !
          </GridColumn>
        </GridRow>

        <GridRowButton>
          <GridColumn>
            <BasicButton
              noBorder
              onClick={() => {
                let ids = expandedRowIds.slice()
                if (ids.includes(row.id)) {
                  setExpandedRowIds(ids.filter(id => id !== row.id))
                }
              }}
              data-test='shared_listings_detail_close_btn'>
              <FormattedMessage id='global.close' defaultMessage='Close'>
                {text => text}
              </FormattedMessage>
            </BasicButton>
          </GridColumn>
        </GridRowButton>
      </GridStyled>
    </DivDetailWrapper>
  )
}

ListingDetail.propTypes = {
  //PropTypes.number
}

ListingDetail.defaultProps = {

}

function mapStateToProps(store) {
  return {

  }
}

//export default injectIntl(ListingDetail)
export default injectIntl(connect(mapStateToProps, {  })(ListingDetail))