import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import CommunityCard from './CommunityCard.js'
import { List, Typography } from '@mui/material'
import NavigationBar from './NavigationBar';

export default function CommunityScreen() {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    const lists = store.community.filter(list => store.search === "" || list.name.toLowerCase() === store.search.toLowerCase());
    if (lists.length) {
        listCard = (
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                lists.map((list) => (
                    <CommunityCard
                        key={list._id}
                        list={list}
                    />
                ))
            }
            </List>
        );
    }

    let statusbar = store.search === "" ? "Community Lists" : store.search + " Lists";

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