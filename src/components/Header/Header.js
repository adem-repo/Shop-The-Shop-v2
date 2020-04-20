import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, makeStyles, Avatar, Badge } from "@material-ui/core";

import { AppContext } from "../../store/appContext";
import * as actions from "../../store/actions";

import avatarImage from "../../assets/images/admin.jpg";

import "./Header.scss";

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

export default function Header() {
  const { store, dispatch } = useContext(AppContext);
  const classes = useStyles();

  const handleOpen = () => {
    if (store.signedIn) {
      dispatch(actions.signOutRequest());
    } else {
      dispatch(actions.openSignInModal());
    }
  };

  return (
    <header>
      <div className="logo"></div>
      <NavLink to="/" exact className="link" activeClassName="active">
        Main Page
      </NavLink>
      {store.signedIn && (
        <Badge badgeContent="NEW" color="error">
          <NavLink to="/shop" className="link" activeClassName="active">
            Shop
          </NavLink>
        </Badge>
      )}
      <div className={classes.grow}></div>
      <div className={classes.right}>
        {store.signedIn && (
          <Avatar className={classes.purple} src={avatarImage}>
            OP
          </Avatar>
        )}
        <Button
          onClick={handleOpen}
          variant="contained"
          color="primary"
          className={classes.login}
          disabled={store.signingIn}
        >
          {store.signedIn ? "Sign out" : "Sign in"}
        </Button>
      </div>
    </header>
  );
}
