import React, { useContext } from 'react';
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Grid,
  Typography,
  makeStyles
} from "@material-ui/core";

import { AppContext } from '../../store/appContext';
import * as actions from '../../store/actions';
import { useSignIn, useSignOut } from '../../server';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    maxWidth: "400px",
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  login: {
    marginLeft: "10px",
  },
}));

export default function SignInModal(props) {


  const { store, dispatch } = useContext(AppContext);
  const classes = useStyles();
  const login = "admin@corp-mail.com";
  const password = "admin1";

  // useSignIn(login, password);
  // useSignOut();

  const formSubmitHandler = () => {
    dispatch(actions.closeSignInModal());
    dispatch(actions.signInRequest());
  };

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={store.signInModalOpen}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        key='signInModal'
      >
        <Fade in={store.signInModalOpen}>
          <div className={classes.paper}>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={(event) => event.preventDefault()}
            >
              <Grid container spacing={2}>
                <Typography variant="h5" className={classes.title}>
                  Log in
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="login"
                    label="Login"
                    name="login"
                    value={login}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={formSubmitHandler}
              >
                Submit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
  );
}