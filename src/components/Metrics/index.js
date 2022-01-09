import React, { useEffect, useState } from 'react'
import Heading from '../Heading'
import ShowChartIcon from '@mui/icons-material/ShowChart';
import pinger from '../../pinger';
import { VictoryChart, VictoryLine } from 'victory';
import { Box, Paper } from '@mui/material';
import { VictoryTheme } from 'victory';

export default function Metrics({ onError, url }) {
    const [pingHistory, setPingHistory] = useState([])

    useEffect(() => {
        let interval = setInterval(() => {
            pinger(url,
                (ping_in_ms) => {
                    setPingHistory([...pingHistory, ping_in_ms])
                },
                (err) => {
                    console.log("ERR", err.toString())
                    onError(err)
                }
            )
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <Heading
                heading='Metrics'
                body='View how the socket server is performing'
                icon={<ShowChartIcon />}
            />
            <Paper
                className='p-2'
            >
                <VictoryChart
                    theme={VictoryTheme.material}
                    height={120}
                >
                    <VictoryLine
                        style={{
                            data: {
                                stroke: '#FFDF36'
                            },
                        }}
                        data={[
                            { x: 1, y: 2 },
                            { x: 2, y: 3 },
                            { x: 3, y: 5 },
                            { x: 4, y: 4 },
                            { x: 5, y: 7 }
                        ]}
                        animate
                        height={120}
                    />
                </VictoryChart>
            </Paper>
        </>
    )
}
