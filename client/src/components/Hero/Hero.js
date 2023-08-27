import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid, Typography, Button } from "@material-ui/core";

import useStyles from "./styles";
import plane1 from "../../images/plane.png";
import plane2 from "../../images/plane.gif";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ReplyIcon from "@material-ui/icons/Reply";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Hero = () => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [plane, setPlane] = useState(false);

  const pickedCard = posts[Math.floor(Math.random() * posts.length)];

  const movieSwitch = () => {
    const turnOn = () => setVisible(true);

    plane ? setPlane(false) : setPlane(true);
    setTimeout(turnOn, 11000);
  };

  const turnOff = () => {
    setVisible(false);
    setPlane(false);
  };

  return (
    <>
      {!visible ? (
        <Container className={classes.hero} id="hero">
          <Grid className={classes.heroLeft}>
            <Typography className={classes.question} id="question">
              Where do you want to go?
            </Typography>
            <Button
              onClick={movieSwitch}
              className={classes.rightBtn}
              variant="contained"
              component="span"
            >
              Let me pick one for you!
            </Button>
          </Grid>
          <Grid>
            <img
              className={classes.plane}
              alt="plane"
              src={plane ? plane2 : plane1}
            />
          </Grid>
        </Container>
      ) : (
        <Card className={classes.root} onClick={turnOff}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={pickedCard.title}
            subheader={pickedCard.createdAt}
          />
          <CardMedia
            className={classes.media}
            image={pickedCard.selectedFile}
            title={pickedCard.title}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {pickedCard.message}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <ReplyIcon />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default Hero;
