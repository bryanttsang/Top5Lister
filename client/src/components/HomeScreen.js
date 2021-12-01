import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Button, Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import SortIcon from '@mui/icons-material/Sort';
import {Box, TextField, Grid} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store && store.currentUser) {
        let pairs = store.idNamePairs.filter(pair => pair.email === store.currentUser.email);
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                pairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    const navBar = (
        <Grid container direction="row" justifyContent="space-around">
            <Grid item>
                <Box>
                    <Button style={{color: 'black'}}> <HomeOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                    <Button style={{color: 'black'}}> <GroupsOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                    <Button style={{color: 'black'}}> <PersonOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                    <Button style={{color: 'black'}}> <FunctionsOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                </Box>
            </Grid>
            <Grid item>
                <Box sx={{ width: '250pt', maxWidth:'100%'}}>
                    <TextField
                        fullWidth
                        id="filled-search"
                        label="Search"
                        type="search"
                    />
                </Box>
            </Grid>
            <Grid item>
                <Button style={{fontSize:'16pt', color: 'black'}} variant="text" endIcon={<SortIcon style={{fontSize:'36pt'}}/>}>SORT BY</Button>
            </Grid>
        </Grid>
    );

    return (
        <div id="top5-list-selector">
            {/* tabs, search, sort */}
            <div id="list-selector-heading">
                {navBar}
                {/* tabs, search, sort */}
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;