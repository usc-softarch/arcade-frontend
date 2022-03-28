import {AppBar, Box, Link, Switch, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

function ArcadeBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ARCADE
                    </Typography>
                        {/*<Button color="inherit" to="/archrecovery">Arch Recovery</Button>*/}
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/">
                            Home
                        </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/factextraction">
                        Fact Extraction
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/archrecovery">
                        Arch Recovery
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/smelldetection">
                        Smell Detection
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/metrics">
                        Metrics
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/visualization">
                        Visualization
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ArcadeBar;