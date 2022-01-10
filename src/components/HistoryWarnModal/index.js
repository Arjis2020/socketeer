import { Cancel, Power, Warning } from '@mui/icons-material'
import { Button, Container, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import Heading from '../Heading'

export default function HistoryWarnModal({ open, onPositiveButtonPressed, onNegativeButtonPressed, history }) {
    return (
        <Modal
            open={open}
            onClose={onNegativeButtonPressed}
        >
            <Container maxWidth='xs' sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                p: 3,
            }}>
                <Heading
                    heading='Warning'
                    icon={<Warning />}
                    button
                    buttonIcon={<Cancel />}
                    buttonText='Close'
                    onClick={onNegativeButtonPressed}
                />
                <Stack
                    spacing={2}
                >
                    <Typography
                        variant='body2'
                        fontFamily='SFProText-Regular'
                    >
                        A socket connection is already in place. Do you want to close this connection and set up a new connection?
                    </Typography>
                    <Button
                        onClick={() => {
                            onPositiveButtonPressed(history.url, history.options, history)
                            onNegativeButtonPressed()
                        }}
                        startIcon={<Power />}
                        variant='contained'
                        fullWidth
                    >
                        Connect
                    </Button>
                </Stack>
            </Container>
        </Modal>
    )
}
