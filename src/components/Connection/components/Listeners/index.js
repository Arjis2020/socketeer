import { Avatar, Box, Container, Divider, Paper, Stack, Typography, IconButton } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../../../Heading'
import HearingIcon from '@mui/icons-material/Hearing';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Listeners({ listeners }) {
    const [openModal, setOpenModal] = useState(false)
    const [allListeners, setListeners] = useState(listeners)
    console.log(allListeners)
    return (
        <Container maxWidth='xl' disableGutters>
            <Heading heading={'Listeners'} body={'Declare what server emissions you would like to listen for'} icon={<HearingIcon />} button buttonText='Add' buttonIcon={<AddIcon />} onClick={() => {
                setOpenModal(true)
            }} />
            <Stack height={168} overflow='hidden auto'>
                {listeners ?
                    allListeners.map(listener => {
                        return (
                            <Paper className='p-2 mb-2'>
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
                                    <IconButton
                                        color='error'
                                        size='small'
                                        onClick={() => {
                                            setListeners(allListeners.filter(item => {
                                                return item !== listener.name
                                            }))
                                        }}
                                    >
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        )
                    })
                    :
                    <Container>
                        <Typography variant='caption' color='GrayText'>
                            No listeners added
                        </Typography>
                    </Container>
                }
            </Stack>
        </Container>
    )
}
