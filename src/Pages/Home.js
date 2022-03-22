import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";
import PaperHeader from "../PaperHeader";
import Descriptions from "../Descriptions"

function Home() {
    return (
        <div>
            <PaperHeader>
            </PaperHeader>
            <Box sx={{ flexGrow: 1, mx: "auto", width: '30%', textAlign: "center", paddingTop: "25px" }}>
                <Typography variant="body1" component="div" paddingBottom="25px">
                    ARCADE is a software workbench that employs a suite of architecture-recovery techniques, a
                    catalogue of architectural smell definitions, accompanying smell-detection algorithms, and a set
                    of metrics for measuring different aspects of architectural change and decay. ARCADE combines
                    these elements to investigate a variety of questions regarding architectural change and decay.
                </Typography>
                <Typography variant="h5" component="div">
                    ARCADE Macrophases
                </Typography>
            </Box>
            <Descriptions>
            </Descriptions>
        </div>
    );
}

export default Home;