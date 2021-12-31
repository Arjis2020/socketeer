import { Button, Container, FormControl, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography, Divider } from '@mui/material'
import React, { useState } from 'react'
import PowerIcon from '@mui/icons-material/Power';
import Listeners from './components/Listeners';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import Heading from '../Heading';
import TuneIcon from '@mui/icons-material/Tune';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Connection({ onConnect, listeners, status, onAddListener, onRemoveListener }) {
    const [protocol, setProtocol] = useState('HTTP')
    const [options, setOptions] = useState('{ \n\t"forceNew": true, \n\t"path": "/socket.io" \n}')
    const [url, setUrl] = useState('localhost:3000')

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
                else if (!split[0].match(new RegExp('^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')) && split[0] !== 'localhost' || (split[0] === 'http' || split[0] === 'https' || split[0] === 'ws' || split[0] === 'wss')) {
                    value = split[1]
                }
            }
        }
        value = value.replace(new RegExp('//', 'g'), '')
        setUrl(value)
    }

    const validate = (value) => {
        return value.includes(':')
    }

    const replacer = (value) => {
        value = value.replace(/[\n\t]/g, '');
        value = value.replace(/ /g, '');
        return (value)
    }

    return (
        <Container
            maxWidth='xl'
            className='py-3'
        >
            <Stack direction='column' spacing={2}>
                <Stack direction='row' alignItems='stretch' spacing={1}>
                    <FormControl required sx={{ width: 0.15 }}>
                        <InputLabel>
                            Protocol
                        </InputLabel>
                        <Select
                            label='Protocol'
                            value={protocol}
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
                        value={url}
                        fullWidth
                        onChange={handleUrlChange}
                    />
                    <Button
                        variant='contained'
                        color={status === 'disconnected' ? 'primary' : status === 'connecting' ? 'primary' : 'error'}
                        size='large'
                        startIcon={
                            status === 'disconnected' ?
                                <PowerIcon /> :
                                status === 'connecting' ?
                                    <PowerIcon /> :
                                    < PowerOffIcon />
                        }
                        onClick={() => onConnect(protocol.toLowerCase() + '://' + url.toLowerCase(), JSON.parse(replacer(options)))}
                    >
                        <Typography>
                            {status === 'disconnected' ? 'Connect' :
                                status === 'connecting' ? 'Connecting' :
                                    'Disconnect'}
                        </Typography>
                    </Button>

                </Stack>
                <Stack direction='row' spacing={2}>
                    <Stack direction='column' spacing={1} sx={{ width: 1 }}>
                        <Heading heading='Options' body='Pass some options to the socket connection' icon={<TuneIcon />} button buttonText='View options' href='https://socket.io/docs/v4/client-options/' buttonIcon={<OpenInNewIcon />} />
                        <TextField
                            multiline
                            rows={10}
                            label='Options'
                            variant='outlined'
                            value={options}
                            onChange={handleOptionsChange}
                            type='text'
                            size='small'
                            fullWidth
                        />
                    </Stack>
                    <Listeners listeners={listeners} onAddListener={onAddListener} status = {status} onRemoveListener={onRemoveListener}/>
                </Stack>
            </Stack>
        </Container>
    )
}
