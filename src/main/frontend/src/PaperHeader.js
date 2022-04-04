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
                        <Typography variant="h4" component="div">
                            ARCADE
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            Architecture Recovery, Change, And Decay Evaluator
                        </Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PaperHeader;