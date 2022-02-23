import {AppBar, Box, Toolbar, Typography} from "@mui/material";

function ArcadeBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ARCADE
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ArcadeBar;