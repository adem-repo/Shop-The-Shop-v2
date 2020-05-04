import React, { useContext, useEffect, useState } from "react";
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
import Tooltip from "@material-ui/core/Tooltip";

import { AppContext } from "../../../../store/appContext";
import * as actions from "../../../../store/actions";
import { useDeleteData } from '../../../../server';

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

export default React.memo((props) => {
  const { store, dispatch } = useContext(AppContext);
  const [isDelete, setIsDelete] = useState(false)
  const classes = useStyles();
  const { product } = props;


  isDelete && console.log('I\'m fucking bitch - update all the time!!!')

  const editHandler = () => {
    dispatch(actions.openEditProductModal(product));
  };

  useDeleteData(isDelete, {
    type: "goods",
    id: product.id,
  });

  const deleteHandler = () => {
    setIsDelete(true);
    // dispatch(
    //   actions.deleteItemRequest({
    //     type: "goods",
    //     id: product.id,
    //   })
    // );
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
        <Tooltip title="Edit product" placement="top">
          <IconButton aria-label="edit" onClick={editHandler}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove product" placement="top">
          <IconButton aria-label="edit" onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
});
