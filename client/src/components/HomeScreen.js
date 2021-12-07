import React, { useContext, useEffect } from 'react';
import { GlobalStoreContext } from '../store';
import ListCard from './ListCard.js';
import { List, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NavigationBar from './NavigationBar';
import Toolbar from '@mui/material/Toolbar';
import SortIcon from '@mui/icons-material/Sort';
import {Box, TextField, Grid, Button} from '@mui/material';
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

    function handleTab(tab) {
        store.changeTab(tab);
    }

    let listCard = "";
    let pairs = store.idNamePairs.filter(pair => pair.email === store.currentUser.email && pair.name.toLowerCase().startsWith(store.search.toLowerCase()));
    if (pairs.length) {
        listCard = (
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                pairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        home={true}
                    />
                ))
            }
            </List>
        );
    }

    const guest = (
        <div>
            <Toolbar>
                <Grid container columns={3} direction="row" justifyContent="space-around">
                    <Grid item>
                        <Box>
                            <Button style={{color: 'gray'}} disabled> <HomeOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                            <Button style={{color: 'black'}} onClick={() => handleTab("/lists/")}> <GroupsOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                            <Button style={{color: 'black'}} onClick={() => handleTab("/users/")}> <PersonOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                            <Button style={{color: 'black'}} onClick={() => handleTab("/community/")}> <FunctionsOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box sx={{ width: '250pt', maxWidth:'100%', padding:1}}>
                            <TextField
                                fullWidth
                                id="filled-search"
                                label="Search"
                                type="search"
                                size="small"
                                disabled
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Button 
                            style={{fontSize:'16pt', color: 'black'}} 
                            variant="text"
                            disabled
                            endIcon={<SortIcon style={{fontSize:'36pt'}}/>}
                        >
                            SORT BY
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </div>
    )

    const user = (
        <div>
            <NavigationBar/>
            <div id="list-selector-list">
                {listCard}
            </div>
            <div id="statusbar">
                <IconButton 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon style={{fontSize:'48pt', color:'#000000'}} />
                </IconButton>
                <Typography variant="h2">Your Lists</Typography>
            </div>
        </div>
    )

    return store.currentUser && store.currentUser.username === "nu11" ? guest : user;
}

export default HomeScreen;