import { Fab, Modal, Stack, Container, Box, Slider, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import Heading from '../Heading';

export default function Settings({ status, left, onUpdate }) {
    const [open, setOpen] = useState(false)
    const [sliderValue, setSliderValue] = useState(5)

    const openModal = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue)
    }

    const handleTextChange = (e) => {
        setSliderValue(Number(e.target.value) / 1000)
    }

    return (
        <Box sx={{
            position: 'absolute',
            left,
            bottom: 100
        }}>
            <Fab
                color='primary'
                aria-label='settings'
                onClick={openModal}
                size='large'
                disabled={status === 'connecting'}
            >
                <SettingsIcon />
            </Fab>
            <Modal
                open={open}
                onClose={onClose}
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
                        heading='Settings'
                        body='General socket config settings'
                        icon={<SettingsIcon />}
                        sx={{
                            marginBottom: 3
                        }}
                    />
                    <Stack spacing={2} direction='column'>
                        <Stack
                            spacing={2}
                            direction="row"
                            sx={{ mb: 1 }}
                            alignItems="center"
                        >
                            <Slider
                                aria-label="timeout"
                                value={sliderValue}
                                onChange={handleSliderChange}
                            />
                            <TextField
                                label='Timeout (ms)'
                                value={sliderValue * 1000}
                                type='number'
                                onChange={handleTextChange}
                            />
                        </Stack>
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={() => {
                                console.log("VAL", sliderValue)
                                onUpdate({
                                    timeout: sliderValue * 1000
                                })
                                setOpen(false)
                            }}

                        >
                            Update
                        </Button>
                    </Stack>
                </Container>
            </Modal>
        </Box>
    )
}
