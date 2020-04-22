import React, { useContext, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { AppContext } from "../../../../store/appContext";
import * as actions from "../../../../store/actions";
import { useDeleteData } from "../../../../server";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Product(props) {
  const { store, dispatch } = useContext(AppContext);
  const classes = useStyles();
  const { product } = props;

  const editHandler = () => {
    dispatch(actions.openEditProductModal(product));
  };

  useDeleteData();

  const deleteHandler = () => {
    dispatch(
      actions.deleteItemRequest({
        type: "goods",
        id: product.id,
      })
    );
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={product.title} subheader={product.category} />
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.title}
        component="div"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.repairDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" onClick={editHandler}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
