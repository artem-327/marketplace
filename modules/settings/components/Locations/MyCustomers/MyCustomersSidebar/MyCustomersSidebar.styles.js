import styled from 'styled-components'
import BasicButton from '../../../../../../components/buttons/BasicButton'
import { Trash2 } from 'react-feather'

export const BasicButtonStyled = styled(BasicButton)`
  min-height: 32px !important;
  min-width: 50px !important;
  height: 32px !important;
  padding: 5px 15px !important;
  font-size: 12px !important;
  font-weight: 500 !important;
`

export const DivBottomButton = styled.div`
  display: block;
  width: calc(100% + 10px);
  margin: 6px -5px 17px;
  text-align: right;
`

export const DivIconWrapper = styled.div`
  padding: 32px 7px 10px 15px;
`

export const Trash2Icon = styled(Trash2)`
  font-size: 18px;
  width: 18px;
  height: 20px;
  text-align: center;
  color: #f16844;
  cursor: pointer;
`

export const DivRowFlex = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;  
`

export const DivInputWrapper = styled.div`
  width: 100%;  
`