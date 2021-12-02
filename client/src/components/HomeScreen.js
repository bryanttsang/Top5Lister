import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import SortIcon from '@mui/icons-material/Sort';
import {Box, TextField, Grid, Button, Menu, MenuItem} from '@mui/material';
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
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleSortOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleSortClose() {
        setAnchorEl(null);
    }

    function handleSort(by) {
        handleSortClose();
        switch (by) {
            case 'new':
                break;
            case 'old':
                break;
            case 'views':
                break;
            case 'likes':
                break;
            case 'dislikes':
                break;
            default:
                break;
        }
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
        <Grid container columns={3} direction="row" justifyContent="space-around">
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
                <Button 
                    style={{fontSize:'16pt', color: 'black'}} 
                    variant="text"
                    onClick={handleSortOpen} 
                    endIcon={<SortIcon style={{fontSize:'36pt'}}/>}
                >
                    SORT BY
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id="sort-menu"
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMenuOpen}
                    onClose={handleSortClose}
                >
                    <MenuItem onClick={() => handleSort('new')}>Publish Date (Newest)</MenuItem>
                    <MenuItem onClick={() => handleSort('old')}>Publish Date (Oldest)</MenuItem>
                    <MenuItem onClick={() => handleSort('views')}>Views</MenuItem>
                    <MenuItem onClick={() => handleSort('likes')}>Likes</MenuItem>
                    <MenuItem onClick={() => handleSort('dislikes')}>Dislikes</MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );

    return (
        <div id="top5-list-selector">
            {/* tabs, search, sort */}
            <div id="list-selector-heading">
                {navBar}
            </div>
            <div id="list-selector-list">
                {listCard}
            </div>
        </div>)
}

export default HomeScreen;