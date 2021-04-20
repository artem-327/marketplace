import { Modal, Header, List } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalCustom = styled(Modal)`
  width: 1170px !important;
  
  .header {
    border-bottom: 1px solid #dee2e6 !important;
    padding: 41px 75px 15px 16px !important;
  }
  
  .content {
    padding: 30px !important;
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
`

export const ContentHeaderTitle = styled(Header)`
  text-transform: lowercase;
  white-space: nowrap;
  font-size: 32px;
  font-weight: 900;
  line-height: 80px;
  
  img {
    display: inline-block !important;
    max-height: 78px !important;
    margin-top: 2px;
    margin-right: 6px;
    vertical-align: top !important;
  }
`

export const IconsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
`

export const IconWrapper = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #282828;
  
  + div {
    margin-left: 20px;
  }
`

export const IconBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 0 5px;
  border-radius: 4px;
  padding: 22px;
  background-color: #f6f6f6;
  
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const ContentMainTitle = styled(Header)`
  display: block;
  width: 100%;
  height: 30px;
  margin: 0 287px 12px 0;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #282828;
`

export const AnswerBlock = styled.div`
  display: block;
  width: 100%;
  height: auto;
  margin: 12px 0 30px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  padding: 22px 30px 24px;
  background-color: #f6f6f6;
  font-size: 17px;
  line-height: 1.65;
  letter-spacing: normal;
  color: #20273a;
`

export const ContentSubTitle = styled(Header)`
  width: 100%;
  height: 24px;
  margin: 0 300px 11px 0;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #848893;
`

export const ListBlock = styled(List)`
  width: 100%;
  height: auto;
  margin: 11px 0 0 !important;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  padding: 7px 20px 9px !important;
  background-color: #ffffff;
  
  > .item {
    position: relative;
    margin: 0;
    padding: 0 30px !important;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.57 !important;
    letter-spacing: normal;
    color: #282828;
    
    > img {
      position: absolute;
      top: 8px;
      left: 0;
    }
  }
`

export const FooterInfo = styled.div`
  width: 100%;
  height: auto;
  margin: 42px 0 17px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #848893;
`