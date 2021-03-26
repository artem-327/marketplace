import styled from 'styled-components'
import { Paperclip } from 'react-feather'
import { Input } from 'semantic-ui-react'

export const InputHidden = styled(Input)`
  width: 0px !important;
  > input {
    display: none;
    width: 0px;
  }
`

export const PaperclipIcon = styled(Paperclip)`
  -webkit-transform: scaleY(-1);
  transform: scaleY(-1);
  margin-right: 10px;
  margin-bottom: -3px;
`
