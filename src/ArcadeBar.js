import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";

function ArcadeBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ARCADE
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Fact Extraction</Button>
                    <Button color="inherit">Arch Recovery</Button>
                    <Button color="inherit">Smell Detection</Button>
                    <Button color="inherit">Metrics</Button>
                    <Button color="inherit">Visualization</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ArcadeBar;