import { Avatar, Button, Divider, Stack, Typography, Tooltip, IconButton } from '@mui/material'
import { pink, yellow } from '@mui/material/colors'
import React from 'react'
import './heading.css'

export default function Heading({ heading, body, href, icon, button, buttonText, buttonIcon, onClick, sx = { marginBottom: 1, spacing: 1 } }) {
    return (
        <div className={`mb-${sx?.marginBottom ? String(sx.marginBottom) : '3'}`}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Stack direction='row' spacing={sx?.spacing ? sx.spacing : 1} alignItems='center' marginBottom={1} >
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
                {/*button &&
                    <Button
                        startIcon={buttonIcon}
                        size='medium'
                        variant='contained'
                        onClick={onClick}
                        href={href}
                        target={href && '_blank'}
                        rel={href && 'noopener noreferrer'}
                        className='button'
                    >
                        {buttonText}
                    </Button>
                */}
                {button &&
                    <Tooltip
                        title={buttonText}
                    >
                        <IconButton
                            color='primary'
                            onClick={onClick}
                        >
                            {buttonIcon}
                        </IconButton>
                    </Tooltip>
                }
            </Stack>
            <Divider />
        </div>
    )
}
