import { useContext } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    if (auth.loggedIn)
        return (
            <div id="top5-statusbar">
                <Typography variant="h4">{store.currentList ? "Top 5 " + store.currentList.name : ""}</Typography>
            </div>
        );
    return <></>;
}

export default Statusbar;