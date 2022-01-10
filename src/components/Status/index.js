import React from 'react'
import { Avatar, Container, Stack, Typography, Box, Tooltip } from '@mui/material'
import './status.css'

export default function Status({ status, data }) {

    const XS = () => (
        <Box
            sx={{
                display: {
                    xs: 'flex',
                    md: 'none'
                },
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Stack direction='row' spacing={1} alignItems='center'>
                <Avatar alt='socket.io' src='/socket.io.svg' sx={{ width: 22, height: 22 }} />
                <Typography
                    color='black'
                    fontFamily='SFProText-Medium'
                    variant='body2'
                >
                    Socket.io v4.x
                </Typography>
            </Stack>
            <Typography
                color='black'
                variant='body2'
                noWrap
            >
                {status === 'disconnected' ? 'Not connected' : status === 'connecting' ? 'Connecting' : 'Connected'}
            </Typography>
        </Box>
    )

    const MD = () => (
        <Box
            sx={{
                display: {
                    xs: 'none',
                    md: 'flex'
                },
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Stack direction='row' spacing={1} alignItems='center'>
                <Avatar alt='socket.io' src='/socket.io.svg' sx={{ width: 22, height: 22 }} />
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
        </Box>
    )

    return (
        <div className={`fixed-bottom status-container ${status} p-1`}>
            <Container maxWidth='xl'>
                <XS />
                <MD />
            </Container>
        </div>
    )
}
