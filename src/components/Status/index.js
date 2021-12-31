import { Avatar, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import './status.css'

export default function Status({ status, data }) {
    return (
        <div className={`status-container position-absolute start-0 end-0 bottom-0 ${status} p-1`}>
            <Container maxWidth='xl'>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Avatar alt='socket.io' src='https://socket.io/images/logo.svg' sx={{ width: 22, height: 22 }} />
                        <Typography color='black' fontFamily='SFProText-Bold'>
                            Socket.io v4.x
                        </Typography>
                    </Stack>
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
