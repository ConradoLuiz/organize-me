import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { GlobalContext } from '../../context/GlobalState';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderRadius: '15px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
      background: '#370588',
      margin: '10px 0 0 0',
      textTransform: 'capitalize'
  },
  textInput: {
    display: 'block'
  }
}));

export default function CreateNoteModal() {
  const classes = useStyles();
  
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const { isModalOpen, openCreateNote, closeCreateNote, createNoteAction, isCreatingNote } = useContext(GlobalContext);

  
  function handleCriarNota(e) {
    e.preventDefault();
    if( title.trim() == ''){
        return setTitleError(true);
    }
    setTitleError(false);

    createNoteAction(title);
  }

  function handleOnClose() {
    setTitle('');
    setTitleError(false);
    closeCreateNote();
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={handleOnClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Dê um título para sua nota</h2>
              <form onClick={(e) => handleCriarNota(e)}>
                <TextField 
                    error={titleError}
                    type="text" 
                    name="title" 
                    id="transition-modal-description" 
                    className={classes.textInput}
                    fontSize={20}
                    value={title}
                    onInput={(e) => {
                      setTitle(e.target.value);
                    }}   
                    onFocus={() => setTitleError(false)}
                    autoFocus
                    helperText={titleError && 'O título não pode estar vazio' }
                    />
              
              <Button 
                  variant="contained" 
                  type='submit'
                  color="primary" 
                  className={classes.button} 
                  disabled={isCreatingNote ? true : false}
              >
                  Criar nota
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}