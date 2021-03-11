/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'



import { FormGroup, FormField, Popup, Image, Dropdown, Grid, GridRow, GridColumn, Button } from 'semantic-ui-react'
import { Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import styled from 'styled-components'
import { Trash, UploadCloud, Image as ImageIcon } from 'react-feather'



// Components
//import ErrorFocus from '../../../components/error-focus'


// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import {
  LogoWrapper,
  StyledImageIcon,
  ButtonsRow
} from './PictureUpload.styles'

// Services
import {
  getPicture,
  selectPicture
} from './PictureUpload.services'

let pictureUploadComponentRef = null

const PictureUpload = props => {
  const {
    hasPicture,
    bottomCaption,
    label
  } = props

  return (
    <div>
      {label && (
        <div style={{ marginBottom: '4px' }}>
          <label style={{ color: '#20273a' }}>{label}</label>
        </div>
      )}
      <LogoWrapper>
        <Grid>
          <GridRow>
            <GridColumn>
              <UploadAttachment
                acceptFiles='image/jpeg, image/png, image/gif, image/svg'
                attachments={props.picture ? [props.picture] : []}
                name={`picture`}
                filesLimit={1}
                fileMaxSize={0.2}
                onChange={files => (files.length ? selectPicture(files[0], props) : null)}
                removeAttachment={props.removePicture}
                hideAttachments
                emptyContent={<StyledImageIcon />}
                uploadedContent={getPicture(props)}
                saveComponentRef={ref => (pictureUploadComponentRef = ref)}
                {...props}
              />
            </GridColumn>
          </GridRow>

          <ButtonsRow>
            <GridColumn width={8}>
              <Button className='delete' disabled={!hasPicture} type='button' fluid onClick={() => props.removePicture()}>
                <Trash />
                <FormattedMessage id='company.logoButtonDelete' defaultMessage='Delete'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </GridColumn>
            <GridColumn width={8}>
              <Button
                type='button'
                fluid
                onClick={() => {
                  if (pictureUploadComponentRef) pictureUploadComponentRef.open()
                }}>
                <UploadCloud />
                {hasPicture ? (
                  <FormattedMessage id='company.logoButtonChange' defaultMessage='Change'>
                    {text => text}
                  </FormattedMessage>
                ) : (
                  <FormattedMessage id='company.logoButtonUpload' defaultMessage='Upload'>
                    {text => text}
                  </FormattedMessage>
                )}
              </Button>
            </GridColumn>
          </ButtonsRow>
        </Grid>
        {bottomCaption && (
          <div className='logo-hint'>
            <label>{bottomCaption}</label>
          </div>
        )}
      </LogoWrapper>
    </div>
  )
}

PictureUpload.propTypes = {
  hasPicture: PropTypes.bool,
  picture: PropTypes.object,
  selectPicture: PropTypes.func,
  removePicture: PropTypes.func,
  label: PropTypes.any,
  bottomCaption: PropTypes.any
}

PictureUpload.defaultProps = {
  hasPicture: false,
  picture: null,
  selectPicture: () => {},
  removePicture: () => {},
  label: (
    <FormattedMessage id='global.companyLogo' defaultMessage='Company Logo' />
  ),
  bottomCaption: (
    <FormattedMessage id='company.recommendedImage' defaultMessage='Recommended image in transparent PNG format' />
  )
}

export default withToastManager(injectIntl(PictureUpload))