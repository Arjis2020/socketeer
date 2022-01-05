import { Button, Container, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../Heading'
import WifiIcon from '@mui/icons-material/Wifi';

export default function Emission() {

    const [emission, setEmission] = useState("say-hello")
    const [emissionMsg, setEmissionMsg] = useState('{\n\tmsg : "hello"\n}')

    const handleEmissionChange = (e) => {
        setEmission(e.target.value)
    }

    const handleEmissionMsgChange = (e) => {
        setEmissionMsg(e.target.value)
    }

    return (
        <Stack direction='column' spacing={2}>
            <Heading
                heading='Emission'
                body='Send an emission message to the server'
                icon={<WifiIcon />}
            />
            <Stack direction='row' spacing={2}>
                <TextField
                    sx={{ width: 0.25 }}
                    required
                    label='Emission'
                    value={emission}
                    onChange={handleEmissionChange}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={10}
                    required
                    label='Emission message'
                    value={emissionMsg}
                    onChange={handleEmissionMsgChange}
                />
            </Stack>
            <Button
                fullWidth
                variant='contained'
            >
                Emit
            </Button>
        </Stack>
    )
}
