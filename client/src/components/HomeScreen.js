import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { List, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import NavigationBar from './NavigationBar';
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
    if (store.currentUser) {
        let pairs = store.idNamePairs.filter(pair => pair.email === store.currentUser.email);
        listCard = (
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                pairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                    />
                ))
            }
            </List>
        );
    }

    return (
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
}

export default HomeScreen;