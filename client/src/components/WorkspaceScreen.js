import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Grid from '@mui/material/Grid';
import {Box, TextField,  Button, Menu, MenuItem} from '@mui/material';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    let location = useLocation();
    useEffect(() => {
        let currentList = location.pathname.substring(10);
        store.setCurrentList(currentList);
    }, []);

    let editItems = "";
    if (store.currentList) {
        editItems = (
            <Box sx={{m:2, p:2,border: 1, borderRadius: '5%', bgcolor:"navy"}}>
                <Grid container columns={2} direction="row">
                    <Grid item>
                        <Grid container columns={1} direction="column" minWidth='32pt'>
                            {
                                store.currentList.items.map((item, index) => (
                                    <Grid item 
                                        sx={{
                                            border: 1, 
                                            bgcolor:"yellow",
                                            p:1
                                        }} 
                                        height="36pt"
                                        key={ "index" + String(index+1)}
                                    >
                                        <Typography variant="h4" style={{color: "black"}}>{index+1}.</Typography>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                    <Grid item maxWidth='93%' width='900pt'>
                        <Grid container columns={1} direction="column">
                            {
                                store.currentList.items.map((item, index) => (
                                    <Grid item 
                                        sx={{
                                            border: 1, 
                                            bgcolor:"yellow",
                                            p:1,
                                        }} 
                                        height="36pt"
                                        key={ String(index+1)}
                                    >
                                        <Typography variant="h4" style={{color: "black"}}>{item}</Typography>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    return (
        <div>
            <div>
                <TextField
                    id="outlined-size-small"
                    defaultValue={store.currentList.name}
                    size="small"
                />
            </div>
            <div>
                {editItems}
            </div>
            <div>
                <Box justifyContent="flex-end">
                   <Button style={{color: 'black'}}>Save</Button>
                   <Button style={{color: 'black'}}>Publish</Button>
               </Box>
            </div>
        </div>
    )
}

export default WorkspaceScreen;