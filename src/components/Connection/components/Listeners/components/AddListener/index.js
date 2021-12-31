import { Button, Container, Modal, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Heading from '../../../../../Heading';
import HearingIcon from '@mui/icons-material/Hearing';
import CancelIcon from '@mui/icons-material/Cancel';

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
                    <Heading heading='Add Listener' icon={<HearingIcon />} body='Add a new listener parameter' sx={{
                        marginBottom: -2,
                    }} />
                    <TextField
                        type='text'
                        label='Listener'
                        required
                        fullWidth
                        value={listener}
                        placeholder='Ex: join-room'
                        onChange={handleListenerChange}
                    />
                    <Stack direction='row' spacing={1}>
                        <Button
                            variant='contained'
                            startIcon={<CancelIcon />}
                            color='error'
                            fullWidth
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
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
                </Stack>
            </Container>
        </Modal>
    )
}
