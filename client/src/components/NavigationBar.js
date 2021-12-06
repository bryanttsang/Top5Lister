import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import Toolbar from '@mui/material/Toolbar';
import SortIcon from '@mui/icons-material/Sort';
import {Box, TextField, Grid, Button, Menu, MenuItem} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';

export default function NavigationBar() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    function handleSearch(event) {
        if (event.code === "Enter") {
            store.setSearch(event.target.value);
        }
    }

    function handleSortOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleSortClose() {
        setAnchorEl(null);
    }

    function handleSort(by) {
        handleSortClose();
        store.sort(by);
    }

    function handleTab(tab) {
        store.changeTab(tab);
    }

    return (
        <Toolbar>
            <Grid container columns={3} direction="row" justifyContent="space-around">
                <Grid item>
                    {
                        store.currentUser && store.currentUser.username === "nu11" ? (
                            <Box>
                                <Button style={{color: 'gray'}} disabled> <HomeOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                                <Button style={{color: 'black'}} onClick={() => handleTab("/lists/")}> <GroupsOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                                <Button style={{color: 'black'}} onClick={() => handleTab("/users/")}> <PersonOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                                <Button style={{color: 'black'}} onClick={() => handleTab("/community/")}> <FunctionsOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                            </Box>
                        ) : (
                            <Box>
                                <Button style={{color: 'black'}} onClick={() => handleTab("/")}> <HomeOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                                <Button style={{color: 'black'}} onClick={() => handleTab("/lists/")}> <GroupsOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                                <Button style={{color: 'black'}} onClick={() => handleTab("/users/")}> <PersonOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                                <Button style={{color: 'black'}} onClick={() => handleTab("/community/")}> <FunctionsOutlinedIcon style={{fontSize:'36pt'}}/> </Button>
                            </Box>
                        )
                    }
                </Grid>
                <Grid item>
                    <Box sx={{ width: '250pt', maxWidth:'100%', padding:1}}>
                        <TextField
                            fullWidth
                            id="filled-search"
                            label="Search"
                            type="search"
                            size="small"
                            onKeyDown={(event) => handleSearch(event)}
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
        </Toolbar>
    );
}