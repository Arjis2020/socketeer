import { Avatar, Box, Container, Divider, Paper, Stack, Typography, IconButton, Chip } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../../../Heading'
import HearingIcon from '@mui/icons-material/Hearing';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import './listeners.css'
import AddListener from './components/AddListener';

export default function Listeners({ listeners, onAddListener, status, onRemoveListener }) {
    const [openModal, setOpenModal] = useState(false)

    return (
        <Container maxWidth='xl' disableGutters>
            <AddListener open={openModal} onClose={() => setOpenModal(false)} onAdd={onAddListener} />
            <Heading heading={'Listeners'} body={'Declare what server emissions you would like to listen for'} icon={<HearingIcon />} button={status === 'connected'} buttonText='Add' buttonIcon={<AddIcon />} onClick={() => {
                setOpenModal(true)
            }} />
            <Stack height={168} overflow='hidden auto'>
                {listeners.length ?
                    listeners.map(listener => {
                        return (
                            <Paper className={`p-2 mb-2 ${!listener.removable && 'dim disabled'}`}>
                                <Stack direction='row' justifyContent='space-between'>
                                    <Stack
                                        spacing={2}
                                        direction='row'
                                        alignItems='center'
                                    >
                                        <HearingIcon color='primary' />
                                        <Typography>
                                            {listener.name}
                                        </Typography>
                                    </Stack>
                                    {listener.removable ?
                                        <IconButton
                                            color='error'
                                            size='small'
                                            onClick={() => {
                                                onRemoveListener(listener.name)
                                            }}
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                        :
                                        <Chip label='Not removable' color='error' />
                                    }
                                </Stack>
                            </Paper>
                        )
                    })
                    :
                    <Container maxWidth='xl' disableGutters>
                        <Typography variant='caption' color='GrayText'>
                            No listeners added
                        </Typography>
                    </Container>
                }
            </Stack>
        </Container>
    )
}
