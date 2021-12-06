import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { List, Typography } from '@mui/material'
import NavigationBar from './NavigationBar';

export default function UsersScreen() {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    console.log(store.idNamePairs);
    let pairs = store.idNamePairs.filter(pair => pair.publish > 0 && pair.username.toLowerCase() === store.search.toLowerCase());
    console.log(pairs);
    listCard = (
        <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
        {
            pairs.map((pair) => (
                <ListCard
                    key={pair._id}
                    idNamePair={pair}
                    home={false}
                />
            ))
        }
        </List>
    );

    let statusbar = store.search === "" ? "User Lists" : store.search + " Lists";

    return (
        <div>
            <NavigationBar/>
            <div id="list-selector-list">
                {listCard}
            </div>
            <div id="statusbar">
                <Typography variant="h2">{statusbar}</Typography>
            </div>
        </div>
    );
}