import styled from 'styled-components'
import { Table } from 'semantic-ui-react'

export const MapTable = styled(Table)`
  width: 100%;
  max-width: 100%;
`

export const SmallerTableCell = styled(Table.Cell)`
  overflow-wrap: 'break-word';
  font-size: 0.8em;

  > div {
    overflow: hidden;
    overflow-wrap: break-word;
  }

  &.cols1 {
    width: calc(
      88vw - 404px
    ); /* 404 = 44px for wrapper padding and border; 130px for first column; 230px for last column */
    max-width: 537px;

    > div {
      width: calc((88vw - 404px) - 25px);
      max-width: 513px;
    }
  }

  &.cols2 {
    width: calc((88vw - 404px) / 2);
    max-width: calc(537px / 2);

    > div {
      width: calc(((88vw - 404px) / 2) - 25px);
      max-width: calc((537px / 2) - 24px);
    }
  }

  &.cols3 {
    width: calc((88vw - 404px) / 3);
    max-width: calc(537px / 3);

    > div {
      width: calc(((88vw - 404px) / 3) - 25px);
      max-width: calc((537px / 3) - 24px);
    }
  }

  @media (max-width: 1919px) {
    max-width: 487px;

    &.cols1 {
      > div {
        max-width: 463px;
      }
    }

    &.cols2 {
      max-width: calc(487px / 2);

      > div {
        max-width: calc((487px / 2) - 24px);
      }
    }

    &.cols3 {
      max-width: calc(487px / 3);

      > div {
        max-width: calc((487px / 3) - 24px);
      }
    }
  }

  @media (max-width: 1199px) {
    max-width: 447px;

    &.cols1 {
      > div {
        max-width: 423px;
      }
    }

    &.cols2 {
      max-width: calc(447px / 2);

      > div {
        max-width: calc((447px / 2) - 24px);
      }
    }

    &.cols3 {
      max-width: calc(447px / 3);

      > div {
        max-width: calc((447px / 3) - 24px);
      }
    }
  }

  @media (max-width: 767px) {
    &,
    &.cols1,
    &.cols2,
    &.cols3 {
      width: 100%;
      max-width: 100%;

      > div {
        width: 100%;
        max-width: 100%;
      }
    }
  }
`
