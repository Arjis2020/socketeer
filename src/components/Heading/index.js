import { Avatar, Button, Divider, Stack, Typography } from '@mui/material'
import { pink, yellow } from '@mui/material/colors'
import React from 'react'

export default function Heading({ heading, body, icon, button, buttonText, buttonIcon, onClick }) {
    return (
        <div className='mb-3'>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Stack direction='row' spacing={1} alignItems='center' marginBottom={1} >
                    {icon && <Avatar sx={{ bgcolor: yellow[600] }}>
                        {icon}
                    </Avatar>}
                    <Stack direction='column'>
                        <Typography variant='h6' fontWeight='bold'>
                            {heading}
                        </Typography>
                        {body && <Typography variant="subtitle2" color='GrayText'>
                            {body}
                        </Typography>}
                    </Stack>
                </Stack>
                {button &&
                    <Button
                        startIcon={buttonIcon}
                        size='medium'
                        variant='contained'
                        onClick={onClick}
                    >
                        {buttonText}
                    </Button>
                }
            </Stack>
            <Divider />
        </div>
    )
}
