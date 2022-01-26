import { useEffect, useState } from "react"
import { CalculationsTableRow, CurrentBroadcastCalculations, GraphPoint } from "./Model"
import useInterval from "./hook"
import { getRows, prepareGraphData } from "./BroadcastCalculationsService"
import CalculationsTableHandlers from "./CalculationsTableHandlers"
import CalculationsTable from "./CalculationsTable"
import api from '../api'
import { BroadcastCalculationsGraph } from './Graph'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'

const StyledPS = styled(PerfectScrollbar)`
flex-grow: 1;
flex-shrink: 1;
position: relative;
overflow: hidden;
margin: -1.5rem;
padding: 1.5em 1.5em 0.5em; // part of Safari fix

> .ps__rail-y {
    position: absolute !important;
    /*top: 2px !important;*/
    right: 0 !important;
    /*bottom: 2px !important;*/
    opacity: 0.2;
    overflow: hidden !important;
    width: 10px !important;
    height: 100% !important;
    padding: 0 2px !important;

    .ps__thumb-y {
        position: absolute;
        width: 6px;
        margin: 0 auto;
        border-radius: 3px;
        background: #20273a;
    }
}

& > .ps__rail-y:hover,
&.ps--scrolling-y > .ps__rail-y {
    opacity: 0.5;
}

// part of Safari fix
&:after {
    content: "";
    display: block;
    width: 100%;
    height: 1em;
    opacity: 0.01;
}
`

/**
 * @Component
 * @category Monitoring - Broadcast calculations
 */
const BroadcastCalculations = (props) => {
    const [graphData, setGraphData] = useState<GraphPoint[]>([{
        running: 0,
        waiting: 0
    }])
    const [currentRunning, setCurrentRunning] = useState<number>(0)
    const [currentWaiting, setCurrentWaiting] = useState<number>(0)
    const [calculationRows, setCalculationRows] = useState([])

    useEffect((): void => {
        props.activeCalcultionsWebsocket.onmessage = (message: MessageEvent<string>): void => {
            const calculations: CurrentBroadcastCalculations = JSON.parse(message.data)
            setGraphData((data) => prepareGraphData(data, props.graphMaxPoints, calculations.count))
            setCurrentRunning(calculations.count)
        }

        props.calculationsQueueWebsocket.onmessage = (message: MessageEvent<number>): void => {
            setGraphData((data) => prepareGraphData(data, props.graphMaxPoints, null, message.data))
            setCurrentWaiting(message.data)
        }

        api.getBroadcastCalculationsHistory().then((data) => setCalculationRows(getRows(data)))
    }, [])

    // update graph each second
    useInterval((): void => setGraphData((obj) => prepareGraphData(obj, props.graphMaxPoints)), 1000)

    const updateRows = (rows: CalculationsTableRow[]): void => {
        setCalculationRows(rows)
    }

    return (
        <>
            <StyledPS style={{height: '100%'}}>
            <BroadcastCalculationsGraph graphData={graphData} currentRunning={currentRunning} currentWaiting={currentWaiting}/>
                <div style={{ padding: '20px 50px', position: 'relative', zIndex: 501 }}>
                    <CalculationsTableHandlers updateRows={(rows) => updateRows(rows)}/>
                </div>
                <CalculationsTable rows={calculationRows}/>
            </StyledPS>
        </>
    )
}

export default BroadcastCalculations