import { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from 'semantic-ui-react'
import { DatesRangeInput } from 'semantic-ui-calendar-react'
import { ChevronLeft, ChevronRight } from 'react-feather'
//styled
import styled from 'styled-components'

const DivFlex = styled.div`
  display: flex;
`

const ButtonLeftArrows = styled(Button)`
  width: 40px;
  height: 38px;
  border-radius: 3px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  margin-left: 10px !important;
  margin-right: 0 !important;
  padding: 0 !important;
`

const ButtonRightArrows = styled(Button)`
  width: 40px;
  height: 38px;
  border-radius: 3px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  padding: 0 !important;
`

class DashboardHandler extends Component {
  state = {
    datesRange: ''
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value })
    }
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={8}>
          <DivFlex>
            <DatesRangeInput
              name='datesRange'
              placeholder='From - To'
              value={this.state.datesRange}
              iconPosition='left'
              onChange={this.handleChange}
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
}

DashboardHandler.propTypes = {}
DashboardHandler.defaultProps = {}

export default DashboardHandler
