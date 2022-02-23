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

function PaperHeader() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <Typography variant="h2" component="div">
                            ARCADE
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            Developed at USC
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Architecture Recovery, Change, And Decay Evaluator (ARCADE) is a software
                            workbench that employs a suite of architecture-recovery techniques,
                            a catalogue of architectural smell definitions, accompanying smell-detection
                            algorithms, and a set of metrics for measuring different aspects of
                            architectural change and decay. ARCADE combines these elements in the manner
                            depicted in Figure 1 to investigate a variety of questions regarding architectural
                            change and decay.
                        </Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PaperHeader;