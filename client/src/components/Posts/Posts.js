import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './syles';

export const Posts = ({currentId , setCurrentId}) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  const newPosts = posts.sort (
    (a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
    
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={4}>
        {newPosts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4}>
            <Post post={post} currentId = {currentId} setCurrentId = {setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};