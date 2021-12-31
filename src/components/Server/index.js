import { Accordion, AccordionDetails, AccordionSummary, Container, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Heading from '../Heading';
import CloudIcon from '@mui/icons-material/Cloud';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

export default function Server({ messages }) {
    const [expanded, setExpanded] = useState(null)
    return (
        <Container maxWidth='xl'>
            <Heading heading={'Server messages'} body={'View what the server is responding'} icon={<CloudIcon />} button buttonText='Collapse all' buttonIcon={<CloseFullscreenIcon />} onClick={() => {
                setExpanded(null)
            }} />
            {messages && messages.map((message, index) => {
                return (
                    <Accordion expanded={index === expanded}>
                        <AccordionSummary
                            onClick={() => {
                                setExpanded(expanded === null ? index : null)
                            }}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>
                                {message.listener}
                            </Typography>
                        </AccordionSummary>
                        <Divider className='mb-3' />
                        <AccordionDetails sx={{maxHeight: 200, overflow: 'hidden auto'}}>
                            <Typography fontFamily='SFProText-Regular'>
                                <pre>{message.msg}</pre>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Container>
    )
}
