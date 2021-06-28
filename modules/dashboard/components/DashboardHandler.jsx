import { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { DatesRangeInput } from 'semantic-ui-calendar-react-yz'
import { ChevronLeft, ChevronRight } from 'react-feather'
// Styles
import { DivFlex, ButtonLeftArrows, ButtonRightArrows } from '../styles'

/**
 * @category Dashboard - DashboardHandler
 * @component
 */
const DashboardHandler = () => {
  const [datesRange, setDatesRange] = useState('')

  const handleChange = (event, { value }) => {
    setDatesRange(value)
  }

  return (
    <Grid.Row>
      <Grid.Column width={8}>
        <DivFlex>
          <DatesRangeInput
            name='datesRange'
            placeholder='From - To'
            value={datesRange}
            iconPosition='left'
            onChange={handleChange}
            popupPosition='bottom left'
          />
          <ButtonLeftArrows type='button'>
            <ChevronLeft />
          </ButtonLeftArrows>
          <ButtonRightArrows type='button'>
            <ChevronRight />
          </ButtonRightArrows>
        </DivFlex>
      </Grid.Column>
    </Grid.Row>
  )
}

DashboardHandler.propTypes = {}
DashboardHandler.defaultProps = {}

export default DashboardHandler
