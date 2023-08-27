import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { Paper, Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import moment from 'moment';

import useStyles from './editStyle';
import EditForm from './EditForm';

const Edit = ({setEdit, post }) => {
  const classes = useStyles();
  const [editPost , setEditPost] = useState(false)
  const user = JSON.parse(localStorage.getItem('profile'));
  
  const detailClose = () => setEdit(false);
   
  if(!editPost) {
   return (
    <Paper className={classes.editPaper} id="editPaper">
    <Card className={classes.card}>
      <CardMedia className={classes.editMedia} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.editOverlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography className={classes.timeAgo} variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.editOverlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={detailClose}><CloseIcon fontSize="default" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.editTitle} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
    </Card>
   {!user?.result?.name ?
   (<Link to="/auth" style={{ textDecoration: 'none' }}><Button className={classes.edit} variant="contained" size="small" maxWidth="xs">Sign in to edit</Button></Link>
   ):
  (<Button onClick={setEditPost} className={classes.edit} variant="contained" size="small" maxWidth="xs">Edit</Button>
  )}
  </Paper>
   );
} 
  return (
  <EditForm post={post} setEditPost = {setEditPost} editPost={editPost} setEdit={setEdit}/>
);

}

export default Edit;