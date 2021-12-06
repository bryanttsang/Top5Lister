import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <div>
                <Box marginX='10%'>
                    <Typography variant="h2" component="div" align="left" color="black">
                        Welcome to
                    </Typography>
                </Box>
                <Typography variant="h2" component="div" color="#3374eb">
                    Top 5 Lister
                </Typography>
                <Typography variant="body2" component="div" color="black">
                    By Bryant Tsang<br/>
                </Typography>
            </div>
            <div>
                <Typography variant="body1" component="div" align="center" color="black">
                    <br/>
                    <br/> Create and publush your own top 5 lists
                    <br/> View other people's top 5 lists
                    <br/> Like or dislike and comment on them
                    <br/>
                    <br/>
                    <br/>
                </Typography>
            </div>
            <div >
                <Grid container direction="row" justifyContent="space-evenly">
                    <Grid item>
                        <Button style={{minWidth: 200}} variant="contained" href="/register/">Create Account</Button>
                    </Grid>
                    <Grid item>
                        <Button style={{minWidth: 200}} variant="contained" href="/login/">Login</Button>
                    </Grid>
                    <Grid item>
                        <Button style={{minWidth: 200}} variant="contained" href="/#">Continue as Guest</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}