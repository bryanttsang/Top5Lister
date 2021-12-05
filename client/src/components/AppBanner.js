import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import EditToolbar from './EditToolbar'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SortIcon from '@mui/icons-material/Sort';
import {Box, TextField, Grid, Button, Menu, MenuItem} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElSort, setAnchorElSort] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMenuOpenSort = Boolean(anchorElSort);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        store.closeCurrentList();
        auth.logoutUser();
    }

    function handleSortOpen(event) {
        setAnchorElSort(event.currentTarget);
    }

    function handleSortClose() {
        setAnchorElSort(null);
    }

    function handleSort(by) {
        handleSortClose();
        store.sort(by);
    }

    const menuId = 'primary-search-account-menu';

    const loggedOutMenu = (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>T<sup>5</sup>L</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );

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
                    anchorEl={anchorElSort}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id="sort-menu"
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMenuOpenSort}
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

    const loggedInMenu = (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography                        
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}                        
                        >
                            <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>T<sup>5</sup>L</Link>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                { getAccountMenu() }
                            </IconButton>
                        </Box>
                    </Toolbar>
                    <Toolbar>
                        {navBar}
                    </Toolbar>
                </AppBar>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Box>
        </div>
    );   

    function getEditToolbar() {
        return (auth.loggedIn && store.currentList) ? <EditToolbar/> : "";
    }
    
    function getAccountMenu() {
        return auth.loggedIn ? auth.user.firstName.charAt(0).toUpperCase() + auth.user.lastName.charAt(0).toUpperCase() : "";
    }

    return auth.loggedIn ? loggedInMenu : loggedOutMenu;
}