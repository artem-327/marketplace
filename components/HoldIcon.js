import { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getCountHolds } from '~/modules/marketplace/actions'
import { Icon, Label } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'
import { Clock } from 'react-feather'

const HoldClockIcon = styled(Clock)`
  color: #20273a !important;
`
const CircularLabel = styled(Label)`
  position: absolute;
  top: -0.7em;
  left: auto;
  right: -0.7em;
  bottom: auto;
  font-size: 0.7142857rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
`
class HoldIcon extends Component {
  componentDidMount() {
    this.props.getCountHolds()
  }

  render() {
    const { countHolds } = this.props
    return (
      <Icon.Group>
        <HoldClockIcon />
        {countHolds ? (
          <CircularLabel circular color='orange'>
            {countHolds}
          </CircularLabel>
        ) : null}
      </Icon.Group>
    )
  }
}

const stateToProps = state => {
  return {
    countHolds: getSafe(() => state.marketplace.countHolds, 0)
  }
}

export default connect(stateToProps, { getCountHolds })(HoldIcon)
