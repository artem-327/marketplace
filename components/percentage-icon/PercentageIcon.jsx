import PropTypes from 'prop-types'
// const images = require.context('../../assets/images/percentage-icon', true)
import { ImageStyled } from './PercentageIcon.styles'

const PercentageIcon = props => {
  const { value } = props

  let val = value ? parseInt(value) : 0
  val = val < 0
    ? 0
    : (val > 100
        ? 100
        : val
    )

  // return (
  //   <ImageStyled src={images(`./${val + 1}.svg`, true)}/>
  // )
  return (
    <ImageStyled src={import(`../../assets/images/percentage-icon/${val+1}.svg`)}/>
  )
}

PercentageIcon.propTypes = {
  value: PropTypes.any
}

PercentageIcon.defaultProps = {
  value: 0
}

export default PercentageIcon