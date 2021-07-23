const images = require.context('../../assets/images/percentage-icon', true)
import { ImageStyled } from './PercentageIcon.styles'

const PercentageIcon = props => {
  const { value } = props

  const val = value < 0
    ? 0
    : (value > 100
        ? 100
        : Math.round(value)
    )

  return (
    <ImageStyled src={images(`./${val + 1}.svg`, true)}/>
  )
}

export default PercentageIcon
