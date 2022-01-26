import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const BroadcastCalculationsGraph = (props) => {
    return (
        <ResponsiveContainer width="100%" height="40%">
            <LineChart
                width={500}
                height={300}
                data={props.graphData}
                margin={{
                    top: 30,
                    right: 80,
                    left: 0,
                    bottom: 20
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis hide={true} />
                <YAxis />
                <Tooltip />
                <Legend  wrapperStyle={{
                    margin: "-10px",
                    fontSize: 15
                }} />
                <Line type="step" dataKey="running" stroke="#84c225" strokeWidth={4} name={'Running (' + props.currentRunning + ')'}
                      isAnimationActive={false} dot={false} />
                <Line type="step" dataKey="waiting" stroke="#2599D5" strokeWidth={4} name={'Waiting (' + props.currentWaiting + ')'}
                      isAnimationActive={false} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}