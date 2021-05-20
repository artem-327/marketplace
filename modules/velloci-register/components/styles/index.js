import styled from 'styled-components'
import { Button, Modal } from 'semantic-ui-react'
import TradePassLogo from '../../../../assets/images/blue-pallet/trade-pass-logo-only.svg';

export const StyledModal = styled(Modal)`
  .ui.modal {
    border-top: 1px solid #dee2e6;
    box-shadow: 0 0 0 0 transparent;

    > .actions {
      background: #ffffff;
    }
  }

  .ui.button {
    font-size: 1em;
    margin: 0 0.357142857em;
    color: #848893;
    background-color: #ffffff;
    border: solid 1px #dee2e6;
    min-width: 80px;
  }

  .ui.primary.button {
    color: #ffffff;
    background-color: #2599d5;
    border: none;
  }

  .ui.grid {
    margin: 30px 0 30px 25px;
    padding: 0;

    .row {
      padding: 5px 0;
      &.header {
        padding: 2px 0;
      }

      .column {
        padding: 0 5px;
        .field {
          margin: 0;
          .ui.input {
            height: 40px;
          }
        }
      }

      .ui.button {
        min-width: 40px;
        height: 40px;
        border-radius: 3px;
      }

      .ui.button.delete {
        padding: 0;
        border: solid 1px #f16844;
        background-color: #fff0ed;
        color: #f16844;
        line-height: 1.11;
        font-size: 18px;

        .icon {
          margin: 0 10px;
          width: 18px;
          height: 20px;
          color: #f16844;
          line-height: 1.11;
          font-size: 18px;
        }
      }

      .ui.button.add {
        margin: 0;
        padding-left: 17px;
        padding-right: 17px;
        border: solid 1px #2599d5;
        background-color: #ddf1fc;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        color: #2599d5;
      }
    }
  }
`

export const DivRectangleForm = styled.div`
  padding: 0px !important;
  overflow: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  text-align: initial;
  position: relative;
  margin-bottom: 20px;
  height: auto;
`

export const DivTitleRectangleForm = styled.div`
  border-bottom: solid 1px #dee2e6;
  height: 50px;
  display: flex;
  justify-content: space-between;
`
export const DivTitleText = styled.div`
  font-weight: bold;
  padding: 16px 30px;
  height: 50px;
`

export const DivButtonsBottom = styled.div`
  overflow: auto;
  color: #ffffff;
  margin: 0 30px 30px 0;
`

export const ButtonSubmit = styled(Button)`
  float: right !important;
  background: #2599d5 !important;
  margin-left: 10px !important;
  margin-right: 0px !important;
`

export const ButtonBack = styled(Button)`
  float: right !important;
  margin-left: 10px !important;
`

export const ButtonPrimary = styled(Button)`
  background: #3bbef6 !important;
  color: #fff !important;
  margin: 1rem 0 !important;
  padding: 1rem;
`

export const DivSubtitleText = styled.div`
  text-align: right;
  color: #848893;
  font-size: 12px;
  padding: 16px 30px;
`

export const SpanSubtitleValue = styled.span`
  font-weight: bold;
  color: #84c225;
`
export const LeftAlignedDiv = styled.div`
  text-align: left !important;
  margin: 0 30px 10px 0;
`
export const RightAlignedDiv = styled.div`
  text-align: right !important;
  margin: 0 30px 10px 0;
`
export const OnboardingContainerDiv = styled.div`
  background-color: #ffffff;
  border: solid 1px #dee2e6;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  margin: 0 0 1rem 0;
  padding: 15px 20px 15px 20px;
`

//SetupIndicator
export const Rectangle = styled.ul`
  background-color: #ffffff;
  border: solid 1px #dee2e6;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  left: 0;
  margin: 0;
  padding: 15px 20px 15px 20px;
  position: sticky;
  top: 2rem;
`

export const Title = styled.div`
  color: #20273a;
  font-size: 1.25rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  line-height: 1.2;
  margin-bottom: .5rem;
  text-align: center;
`

export const Content = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #848893;
  margin-bottom: 17px;
`

export const StepIncomplete = styled.span`
  background-color: #c8c8ce;
  border-radius: 5px;
  display: inline-block;
  height: 10px;
  margin-right: 1rem;
  position: relative;
  width: 10px;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  &:not(.tail):after {
    background: #c8c8ce;
    content: '';
    height: 1rem;
    left: 40%;
    position: absolute;
    top: 130%;
    width: 2px;
  }
`

export const StepComplete = styled.span`
  background-color: #3bbef6;
  border-radius: 5px;
  display: inline-block;
  height: 10px;
  margin-right: 1rem;
  position: relative;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  width: 10px;
  &:not(.tail):after {
    background: #c8c8ce;
    content: '';
    height: 1rem;
    left: 40%;
    position: absolute;
    top: 130%;
    width: 2px;
  }
`

export const StepCurrent = styled.span`
  background-color: #3bbef6;
  border: solid 1px #3bbef6;
  box-shadow: inset 0 0 0 2px #f8f9fb;
  display: inline-block;
  height: 10px;
  margin-right: 1rem;
  position: relative;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  width: 10px;
  &:not(.tail):after {
    background: #c8c8ce;
    content: '';
    height: 1rem;
    left: 40%;
    position: absolute;
    top: 130%;
    width: 2px;
  }
`

export const IconRow = styled.div`
  margin: 0 0 1rem 0;
`

export const Icons = styled.div`
  &:last-child() {
    margin: 0;
  }
`

export const OnboardingModule = styled.div`
  margin: 0 auto;
  max-width: 95%;
  padding: 1rem 0;
`

export const HVCenteredContentContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`

export const LeftCenteredContentContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: left;
`

export const TextContainer = styled.div`
  text-align: center;
`

export const StyledTextContainer = styled.div`
  color: #3bbef6;
  font-style: italic;
  font-weight: bold;
`

export const HeadingContainer = styled.div`
  font-weight: bold;
`

export const HorizontalRule = styled.hr`
  background: #ebebeb;
  border: 0;
  height: 1px;
`

export const PaddedListItem = styled.li`
  background-image: url(${TradePassLogo});
  background-position: 5% 25%;
  background-repeat: no-repeat;
  background-size: 1rem;
  list-style-type: none;
  padding: 0 0 .75rem 2.25rem;
  /*position: relative;*/
`
export const TimeHeading = styled.h2`
  color: #3bbef6;
  font-size: 2rem;
  & span {
    font-size: 1rem;
  }
`
