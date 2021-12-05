import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import DeleteAlert from './DeleteAlert.js';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const listIndex = store.allList.findIndex(list => list._id === idNamePair._id);
    const list = store.allList[listIndex];

    function handleLoadList(event, id) {
        event.stopPropagation();
        store.setCurrentList(id);
    }

    function handleUser(event, user) {
        event.stopPropagation();
        // bring to user's page
    }

    function handleChange() {
        if (!expanded) {
            store.view(idNamePair._id);
        }
        setExpanded(!expanded);
    }

    function handleComment(event) {
        if (event.code === "Enter" && text.trim() !== "") {
            store.comment(idNamePair._id, auth.user.firstName + " " + auth.user.lastName, text);
            setText("");
        }
    }

    function handleType(event) {
        setText(event.target.value);
    }

    function handleToggleDelete(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleDeleteList(event) {
        event.stopPropagation();
        store.deleteMarkedList();
    }

    function handleLike(event) {
        event.stopPropagation();
        store.like(idNamePair._id);
    }

    function handleDislike(event) {
        event.stopPropagation();
        store.dislike(idNamePair._id);
    }

    const closed = (
        <Grid container columns={2} justifyContent="space-between">
            <Grid item>
                <Grid container columns={1} direction="column">
                    <Grid item>
                        <Typography variant='h5'>{idNamePair.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Box style={{display:"flex"}}>
                            <Typography>By:&nbsp;</Typography>
                            <Typography
                                style={{
                                    textDecoration: 'underline',
                                    color: 'blue'
                                }}
                                onClick={(event) => handleUser(event, auth.user.firstName + "_" + auth.user.lastName)}
                            >
                                {auth.user.firstName + " " + auth.user.lastName}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        {
                            list.publish === 0 ? (
                                <Typography
                                    onClick={(event) => handleLoadList(event, idNamePair._id)}
                                    color='red'
                                    style={{textDecoration: 'underline'}}
                                >
                                    Edit
                                </Typography>
                            ) : (
                                <Typography
                                    color='green'
                                >
                                    {"Dec " + list.publish + ", 2021"}
                                </Typography>
                            )
                        }
                        
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
                                {list.like.length}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                style={{fontSize:'16pt', color: 'black'}} 
                                variant="text"
                                onClick={handleDislike} 
                                startIcon={<ThumbDownOutlinedIcon style={{fontSize:'24pt'}}/>}
                            >
                                {list.dislike.length}
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
                            <Box style={{display:"flex"}}>
                                <Typography>Views:&nbsp;</Typography>
                                <Typography style={{color: 'red'}}>{list.view}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    const editItems = (
        <Grid container columns={2} direction="row" justifyContent="space-between">
            <Grid item xs={1}>
                <Box sx={{m:1, p:1,border: 1, borderRadius: '5%', bgcolor:"navy"}}>
                    <Grid container columns={2} direction="row">
                        <Grid item>
                            <Grid container columns={1} direction="column" minWidth='32pt'>
                                {
                                    list.items.map((item, index) => (
                                        <Grid item height="48pt" key={idNamePair._id + "index" + String(index+1)}>
                                            <Typography variant="h4" style={{color: "yellow"}}>{index+1}.</Typography>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container columns={1} direction="column">
                                {
                                    list.items.map((item, index) => (
                                        <Grid item height="48pt" key={idNamePair._id + String(index+1)}>
                                            <Typography variant="h4" style={{color: "yellow"}}>{item}</Typography>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={1}>
                <Box sx={{}}>
                    <Grid container columns={2} direction="column">
                        <Grid item>
                            <div className="list-comment">
                            {
                                list.comment.map((item, index) => (
                                    <Box sx={{m:1, p:1, border: 1, borderRadius: '5%', bgcolor:"yellow"}} key={idNamePair._id + "comment" + String(index)}>
                                        <Typography variant="caption">{item.name}</Typography>
                                        <Typography variant="body1">{item.comment}</Typography>
                                    </Box>
                                ))
                                // [...Array(6).keys()].map((element) => (
                                //     <Box sx={{m:1, p:1, border: 1, borderRadius: '5%', bgcolor:"yellow"}} key={idNamePair._id + "comment" + String(element)}>
                                //         <Typography variant="caption">{"name " + String(element)}</Typography>
                                //         <Typography variant="body1">{"comment " + String(element)}</Typography>
                                //     </Box>
                                // ))
                            }
                            </div>
                        </Grid>
                        <Grid item>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="comment"
                                label="comment"
                                id="comment"
                                value={text}
                                onChange={(event) => handleType(event)}
                                onKeyDown={(event) => handleComment(event)}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
    
    const card = (
        <Accordion
            id={idNamePair._id}
            key={idNamePair._id}
            onChange={handleChange}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                {closed}
            </AccordionSummary>
            <AccordionDetails>
                {editItems}
            </AccordionDetails>
        </Accordion>
    );

    return idNamePair.name.toLowerCase().startsWith(store.search) ? card : <></>;
}

export default ListCard;