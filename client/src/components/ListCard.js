import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import DeleteAlert from './DeleteAlert.js';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        event.preventDefault();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
        setText(idNamePair.name);
    }

    function handleToggleDelete(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleDeleteList(event) {
        event.stopPropagation();
        store.deleteMarkedList();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleLike(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    function handleDislike(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    const car = (
        <Grid container columns={2} justifyContent="space-between">
            <Grid item>
                <Grid container columns={1} direction="column">
                    <Grid item>
                        <Typography>{idNamePair.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>By: {auth.user.firstName + " " + auth.user.lastName}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>Edit</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container columns={3} direction="column">
                    <Grid container columns={3} direction="row">
                        <Grid item>
                            <Button 
                                style={{fontSize:'16pt', color: 'black'}} 
                                variant="text"
                                onClick={handleLike} 
                                startIcon={<ThumbUpOutlinedIcon style={{fontSize:'24pt'}}/>}
                            >
                                -99M
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                style={{fontSize:'16pt', color: 'black'}} 
                                variant="text"
                                onClick={handleDislike} 
                                startIcon={<ThumbDownOutlinedIcon style={{fontSize:'24pt'}}/>}
                            >
                                99M
                            </Button>
                        </Grid>
                        <Grid item>
                            <DeleteAlert
                                idNamePair={idNamePair}
                                handleToggleDelete={handleToggleDelete}
                                handleDeleteList={handleDeleteList}
                            />
                        </Grid>
                    </Grid>
                    <Grid container columns={3} direction="row">
                        <Grid item>
                            <Typography>views: 0</Typography>
                        </Grid>
                        <Grid item>
                            <Typography></Typography>
                        </Grid>
                        <Grid item>
                            <Typography></Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    const card = (
        <Accordion
            id={idNamePair._id}
            key={idNamePair._id}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                {car}
            </AccordionSummary>
            <AccordionDetails>
                Show Lists
            </AccordionDetails>
        </Accordion>
    );

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }
            }
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}} />
                </IconButton>
            </Box>
            <DeleteAlert
                idNamePair={idNamePair}
                handleToggleDelete={handleToggleDelete}
                handleDeleteList={handleDeleteList}
            />
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
                onFocus={e => e.target.select()}
            />
    }
    return (
        card
    );
}

export default ListCard;