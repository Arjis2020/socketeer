import { Button, Container, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../Heading'
import WifiIcon from '@mui/icons-material/Wifi';

export default function Emission({ onEmit }) {

    const [emission, setEmission] = useState("say-hello")
    const [emissionMsg, setEmissionMsg] = useState('{\n\t"msg" : "hello"\n}')

    const handleEmissionChange = (e) => {
        setEmission(e.target.value)
    }

    const handleEmissionMsgChange = (e) => {
        setEmissionMsg(e.target.value)
    }

    const XS = () => (
        <Stack
            direction='column'
            spacing={1}
            sx={{
                display: {
                    xs: 'flex',
                    md: 'none'
                }
            }}
        >
            <TextField
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
    )

    return (
        <Stack direction='column' spacing={2}>
            <Heading
                heading='Emission'
                body='Send an emission message to the server'
                icon={<WifiIcon />}
            />
            <Stack
                direction='row'
                spacing={2}
                sx={{
                    display: {
                        xs: 'none',
                        md: 'flex'
                    }
                }}
            >
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
            <XS />
            <Button
                fullWidth
                variant='contained'
                onClick={() => {
                    onEmit(emission, emissionMsg)
                    setEmission('')
                    setEmissionMsg('')
                }}
            >
                Emit
            </Button>
        </Stack>
    )
}
