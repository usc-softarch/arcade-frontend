import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Typography} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
}));

function Home() {
    return (
        <div
            style={{
                width: 750,
                transform: 'translate(55%, 0)',
                textAlign: 'center',
                paddingTop: '15px',
                paddingBottom: '15px'
            }}
            >
                <Typography variant="body1" gutterBottom>
                ARCADE is a software workbench that employs a suite of architecture-recovery techniques, a
                catalogue of architectural smell definitions, accompanying smell-detection algorithms, and a set
                of metrics for measuring different aspects of architectural change and decay. ARCADE combines
                these elements to investigate a variety of questions regarding architectural change and decay.
                </Typography>
                <Typography variant="h5" component="div" textAlign='center' paddingTop='15px'>
                    ARCADE Macrophases
                </Typography>
        </div>
    );
}

export default Home;