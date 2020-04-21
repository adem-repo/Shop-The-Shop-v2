import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

import { AppContext } from "../../store/appContext";
import * as actions from "../../store/actions";
import { useSetData } from '../../server';

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
  formControl: {
    minWidth: "100%",
  },
}));

export default function EditProductModal(props) {

  const { store, dispatch } = useContext(AppContext);
  const { editingProduct } = store;
  const [product, setProduct] = useState(editingProduct);
  const classes = useStyles();

  useEffect(() => {
    setProduct(editingProduct)
  }, [editingProduct])

  const handleSelectChange = (event) => {
    setProduct({
      ...product,
      category: event.target.value
     });
  };
  
  let editMode = !!product;

  const handleClose = () => {
    dispatch(actions.closeEditProductModal());
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(actions.closeEditProductModal());
    dispatch(actions.sendDataRequest());
  }

  useSetData({
    type: 'goods',
    data: product
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={store.editProductModalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      key="editModal"
    >
      <Fade in={store.editProductModalOpen}>
        <div className={classes.paper}>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={formSubmitHandler}
          >
            <Grid container spacing={2}>
              <Typography variant="h5" className={classes.title}>
                Product
              </Typography>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={(editMode && product.title) || ''}
                  onChange={(event) => setProduct({
                    ...product,
                    title: event.target.value
                   })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="image"
                  label="Image url"
                  type="text"
                  id="image"
                  value={(editMode && product.image) || ''}
                  onChange={(event) => setProduct({
                    ...product,
                    image: event.target.value
                   })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category
                  </InputLabel>
                  <Select
                    id="demo-simple-select-outlined"
                    value={(editMode && product.category) || ''}
                    onChange={handleSelectChange}
                    label="Category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {store.categories.map((category) => (
                      <MenuItem key={category.id} value={category.title}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
