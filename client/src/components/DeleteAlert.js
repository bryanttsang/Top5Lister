import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteAlert(props) {
    const { store } = useContext(GlobalStoreContext);
    const [open, setOpen] = useState(false);
    const { idNamePair, handleToggleDelete, handleDeleteList } = props;
  
    function handleClickOpen(event) {
        handleToggleDelete(event, idNamePair._id);
        setOpen(true);
    };
  
    function handleClose(event) {
        event.stopPropagation();
        event.preventDefault();
        setOpen(false);
    };
  
    return (
        <Box>
            <IconButton style={{color: 'black'}} onClick={(event) => handleClickOpen(event)} aria-label='delete'>
                <DeleteOutlinedIcon style={{fontSize:'24pt'}} />
            </IconButton>
            <Dialog
                open={open}
                onClose={(event) => handleClose(event)}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete the {store.listMarkedForDeletion != null ? store.listMarkedForDeletion.name : ""} Top 5 List?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={(event) => handleClose(event)}>Cancel</Button>
                    <Button onClick={handleDeleteList}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}