import { Button, Container, Modal, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Heading from '../../../../../Heading';
import HearingIcon from '@mui/icons-material/Hearing';
import CancelIcon from '@mui/icons-material/Cancel';
import { Cancel } from '@mui/icons-material';

export default function AddListener({ open, onClose, onAdd }) {

    const [listener, setListener] = useState('')

    const handleListenerChange = (e) => {
        setListener(e.target.value)
    }

    return (
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
                <Stack spacing={2} direction='column'>
                    <Heading
                        heading='Add Listener'
                        icon={<HearingIcon />}
                        body='Add a new listener parameter'
                        button
                        buttonIcon={<Cancel />}
                        buttonText='Close'
                        onClick={onClose}
                        sx={{
                            marginBottom: -2
                        }}
                        />
                    <TextField
                        type='text'
                        label='Listener'
                        required
                        fullWidth
                        value={listener}
                        placeholder='Ex: join-room'
                        onChange={handleListenerChange}
                    />
                    <Button
                        variant='contained'
                        startIcon={<AddIcon />}
                        fullWidth
                        onClick={() => {
                            onAdd(listener)
                            onClose()
                        }}
                    >
                        Add listener
                    </Button>
                </Stack>
            </Container>
        </Modal>
    )
}
