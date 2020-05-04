import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Fade,
  TextField,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

import ModalCustom from "./Modal";
import { AppContext } from "../../store/appContext";
import * as actions from "../../store/actions";

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    minWidth: "100%",
  },
}));

export default function EditCategoryModal() {
  const { store, dispatch } = useContext(AppContext);
  const [category, setCategory] = useState(store.editingCategory);
  const classes = useStyles();

  useEffect(() => {
    setCategory(store.editingCategory)
  }, [store.editingCategory])

  const handleClose = () => {
    dispatch(actions.closeEditCategoryModal());
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(actions.closeEditCategoryModal());
    // dispatch(actions.sendDataRequest());
  };

  const ModalLayout = () =>(
    <ModalCustom open={store.editCategoryModalOpen} onClose={handleClose}>
      <Fade in={store.editCategoryModalOpen}>
        <div className={classes.paper}>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={formSubmitHandler}
          >
            <Grid container spacing={2}>
              <Typography variant="h5" className={classes.title}>
                Category
              </Typography>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={category ? category.title : ''}
                  onChange={(event) =>
                    setCategory({...category, title: event.target.value})
                  }
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
    </ModalCustom>
  )

  return <ModalLayout />;
}
