import { Button, Container, FormControl, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PowerIcon from '@mui/icons-material/Power';
import Listeners from './components/Listeners';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import Heading from '../Heading';
import TuneIcon from '@mui/icons-material/Tune';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { LoadingButton } from '@mui/lab';

export default function Connection({ onConnect, listeners, status, onAddListener, onRemoveListener, onDisconnect, onError, onSuccess, esc }) {
    const [protocol, setProtocol] = useState('HTTP')
    const [options, setOptions] = useState('{\n\t"forceNew": true, \n\t"path": "/socket.io"\n}')
    const [url, setUrl] = useState('localhost:3000')

    useEffect(() => {
        if (esc) {
            setProtocol(esc.protocol.toUpperCase())
            setUrl(esc.url)
            setOptions(esc.options)
        }
    }, [esc])

    const accepted_protocols = ['http', 'https', 'ws', 'wss']

    const handleProtocolChange = (e) => {
        setProtocol(e.target.value)
    }

    const handleOptionsChange = (e) => {
        setOptions(e.target.value)
    }

    const handleUrlChange = (e) => {
        let value = e.target.value
        if (validate(value)) {
            let split = value.split(':')
            if (split) {
                if (split[0].length === 0) {
                    value = split[1]
                }
                else if (!split[0].toLowerCase().match(new RegExp('^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')) && split[0].toLowerCase() !== 'localhost' || (split[0].toLowerCase() === 'http' || split[0].toLowerCase() === 'https' || split[0].toLowerCase() === 'ws' || split[0].toLowerCase() === 'wss')) {
                    value = split[1]
                }

                if (split[0].toLowerCase()) {
                    if (split[0].toLowerCase() !== 'localhost') {
                        if (accepted_protocols.includes(split[0].toLowerCase())) {
                            setProtocol(split[0].toUpperCase())
                            onSuccess(`Updated protocol to ${split[0].toUpperCase()}`)
                        }
                        else {
                            onError('Invalid protocol: ERR_INVALID_PROTOCOL')
                        }
                    }
                }
            }
        }
        value = value.replace(new RegExp('//', 'g'), '')
        setUrl(value)
    }

    const validate = (value) => {
        return value.includes(':')
    }

    return (
        <Stack direction='column' spacing={2}>
            <Stack direction='row' alignItems='stretch' spacing={1}>
                <FormControl
                    required
                    sx={{ width: 0.15 }}
                    disabled={status !== 'disconnected'}
                >
                    <InputLabel>
                        Protocol
                    </InputLabel>
                    <Select
                        label='Protocol'
                        value={esc?.protocol.toUpperCase() || protocol}
                        onChange={handleProtocolChange}
                        variant='outlined'
                    >
                        <MenuItem value='HTTP'>
                            HTTP
                        </MenuItem>
                        <MenuItem value='HTTPS'>
                            HTTPS
                        </MenuItem>
                        <MenuItem value='WS'>
                            WS
                        </MenuItem>
                        <MenuItem value='WSS'>
                            WSS
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label='URL'
                    required
                    id="filled-hidden-label-small"
                    variant='outlined'
                    size='medium'
                    type='url'
                    value={esc?.url || url}
                    fullWidth
                    placeholder='Ignore protocols'
                    onChange={handleUrlChange}
                    disabled={status !== 'disconnected'}
                />
                <LoadingButton
                    variant='contained'
                    color={status === 'disconnected' ? 'primary' : 'error'}
                    size='large'
                    startIcon={
                        status === 'disconnected' ?
                            <PowerIcon /> :
                            < PowerOffIcon />
                    }
                    onClick={() => {
                        if (status === 'disconnected') {
                            return onConnect(protocol.toLowerCase() + '://' + url.toLowerCase(), options)
                        }
                        else if (status === 'connected') {
                            return onDisconnect(protocol.toLowerCase() + '://' + url.toLowerCase())
                        }
                    }}
                    loading={status === 'connecting'}
                    disabled={status === 'connecting'}
                >
                    <Typography>
                        {status === 'disconnected' ?
                            'Connect' :
                            'Disconnect'
                        }
                    </Typography>
                </LoadingButton>

            </Stack>
            <Stack direction='row' spacing={2}>
                <Stack direction='column' spacing={1} sx={{ width: 1 }}>
                    <Heading heading='Options' body='Pass some options to the socket connection' icon={<TuneIcon />} button buttonText='View options' href='https://socket.io/docs/v4/client-options/' buttonIcon={<OpenInNewIcon />} />
                    <TextField
                        multiline
                        rows={10}
                        label='Options'
                        variant='outlined'
                        value={esc?.options || options}
                        onChange={handleOptionsChange}
                        type='text'
                        size='small'
                        fullWidth
                        placeholder='Pass in required options'
                        disabled={status !== 'disconnected'}
                    />
                </Stack>
                <Listeners listeners={esc?.listeners || listeners} onAddListener={onAddListener} status={status} onRemoveListener={onRemoveListener} />
            </Stack>
        </Stack>
    )
}
