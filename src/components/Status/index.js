import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import './status.css'

export default function Status({ status, data }) {
    return (
        <div className={`status-container position-absolute start-0 end-0 bottom-0 ${status}`}>
            <Container maxWidth='xl'>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography color='black'>
                        Socket.io v4+
                    </Typography>
                    <Typography color='black'>
                        {status === 'disconnected' ? 'Not connected' : status === 'connecting' ? 'Connecting' : `Connected to ${data.url}`}
                    </Typography>
                    <Typography color='black'>
                        {status === 'connected' ? `Socket id : ${data.id}` : null}
                    </Typography>
                </Stack>
            </Container>
        </div>
    )
}
