import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import * as actionType from "../../constants/actionTypes";
import Form from "../Form/Form";
import useStyles from "./styles";
import logo from "../../images/flymangologo.png";

const Navbar = () => {
  const [addPost, setAddPost] = useState(false);
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [currentId, setCurrentId] = useState(0);
  const rename = user?.result.name;
  const shorten = rename?.substr(0, rename.indexOf(" "));

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    // eslint-disable-next-line
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      // eslint-disable-next-line
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const ctrlAddPost = () => {
    !addPost ? setAddPost(true) : setAddPost(true);
  };

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      maxwidth="xs"
    >
      <Link to="/" className={classes.left}>
        <img className={classes.image} src={logo} alt="memories" height="60" />
        <Typography className={classes.logo}>flymango</Typography>
      </Link>
      <Toolbar className={classes.right}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              Hi! {shorten}
            </Typography>
            <Button
              onClick={logout}
              variant="contained"
              className={classes.rightBtn}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/auth">
            <Button
              className={classes.rightBtn}
              variant="contained"
              component="span"
            >
              Sign in
            </Button>
          </Link>
        )}
        <Button
          onClick={ctrlAddPost}
          className={classes.rightBtn}
          variant="contained"
          color="primary"
          component="span"
        >
          Add post
        </Button>
      </Toolbar>
      {addPost && (
        <Form
          setAddPost={setAddPost}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
      )}
    </AppBar>
  );
};

export default Navbar;
