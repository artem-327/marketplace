import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// const images = require.context('../../assets/images/percentage-icon', true)
import { ImageStyled } from './PercentageIcon.styles'

const PercentageIcon = props => {
  const { value } = props

  const [ percentImage, setPercentImage ] = useState("");

  let val = value ? parseInt(value) : 0
  val = val < 0
    ? 0
    : (val > 100
      ? 100
      : val
    )

  const loadImage = imageName => {
    import(`../../assets/images/percentage-icon/${imageName+1}.svg`).then(image => {
      setPercentImage(image.default);
    });
  };

  useEffect(() => {
    loadImage(val);
  })
  // return (
  //   <ImageStyled src={images(`./${val + 1}.svg`, true)} />
  // )
  return (
    <ImageStyled src={percentImage}/>
  )
}

PercentageIcon.propTypes = {
  value: PropTypes.any
}

PercentageIcon.defaultProps = {
  value: 0
}

export default PercentageIcon