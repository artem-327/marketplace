import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

export const StyledButton = styled(Button)`
    margin: 4px 4px 4px 4px !important;
`

export const DivUpload = styled.div`
    &.uploadAttachment {
        padding: 1.4em;
        background: #f8f9fb none;
        text-align: center;
        font-size: 1rem;
        color: #cccccc;
        width: 100%;
        cursor: pointer;

        * {
            cursor: pointer;
        }

        .dropzoneLot {
            background: #f8f9fb !important;
            color: #848893;
            border: 2px dashed #dee2e6;
            font-weight: 300;
            line-height: 1.5;
        }

        .dropzoneLotHasFile {
            background: #dfffdf none;
            color: #848893;
            border: 2px dashed #dee2e6;
            font-weight: 300;
            line-height: 1.5;
        }

        .file-space {
            display: block;
            padding-top: 1em;
        }
    }

    &.no-styles {
        margin: 0 !important;
        border: 0 none !important;
        padding: 0 !important;
        background: transparent none !important;
        
        .dropzoneLot,
        .dropzoneLotHasFile {
            border: 0 none !important;
            background: transparent none !important;
        }
    }
`
