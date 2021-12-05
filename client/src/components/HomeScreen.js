import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

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
        <div id="list-selector-list">
            {listCard}
        </div>
    )
}

export default HomeScreen;