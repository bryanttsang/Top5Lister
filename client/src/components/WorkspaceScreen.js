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

    const handleSave = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let list = store.currentList;
        console.log(list);
        list.name = formData.get('name');
        list.items = [formData.get('item0'), formData.get('item1'), formData.get('item2'), formData.get('item3'), formData.get('item4')];
        console.log(list);
        store.editList(list._id, list);
    }

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
                                        height="52pt"
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
                                        height="52pt"
                                        key={ String(index+1)}
                                    >
                                        <TextField
                                            defaultValue={item}
                                            InputProps={{style: {fontSize: 24}}}
                                            fullWidth
                                            size='small'
                                            name={"item" + String(index)}
                                        />
                                        {/* <Typography variant="h4" style={{color: "black"}}>{item}</Typography> */}
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
        <Box component="form" noValidate onSubmit={handleSave}>
            <Box>
                <TextField
                    defaultValue={store.currentList.name}
                    InputProps={{style: {fontSize: 24}}}
                    fullWidth
                    size='small'
                    name="name"
                />
            </Box>
            <Box>
                {editItems}
            </Box>
            <Box>
                <Box>
                   <Button style={{color: 'black'}} type='submit'>Save</Button>
                   <Button style={{color: 'black'}}>Publish</Button>
               </Box>
            </Box>
        </Box>
    )
}

export default WorkspaceScreen;