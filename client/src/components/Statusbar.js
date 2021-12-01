import { useContext } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store.createNewList();
    }

    if (auth.loggedIn)
    return (
        // <div id="top5-statusbar">
        //     <Typography variant="h4">{store.currentList ? "Top 5 " + store.currentList.name : ""}</Typography>
        // </div>
        <div id="top5-statusbar">
            <div id="top5-statusbar-text">
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
    );
    return <></>;
}

export default Statusbar;