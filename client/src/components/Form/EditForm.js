import React, { useState , useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { updatePost } from '../../actions/posts';

const EditForm =({ post, currentId, setEditPost, setEdit, editPost})=> {
   const [postData, setPostData] = useState({ title:' ', message: ' ', tags: ' ', selectedField:' ', likes:' '});
   const dispatch = useDispatch();
   const classes = useStyles();
   const user = JSON.parse(localStorage.getItem('profile'));
  //  const postID = post._id;
  //  const userID = user.result._id;
  //  console.log(post, userID);
   
   const ctrlEditPost =()=> {
       if (editPost) {
         setEditPost(false);
         setEdit(false);
       } else {
         setEditPost(true);
       }
  }

  useEffect (() => {
      if(post) setPostData(post);
   }, [post])

  const clear = () => {
      // setCurrentId(0)
      setPostData({ title:' ', message: ' ', tags: ' ', selectedField:' '});
   }

  const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(updatePost(post._id, { ...postData, name: user?.result?.name }));
      clear();
      setEditPost(false);
      setEdit(false);
    // }
  };

if (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) {
   return (
       <Paper id="form-div" className={classes.paper} >
      <form id="form" autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${postData.title}"` : 'Edit a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" onClick={ctrlEditPost} color="secondary" size="small" fullWidth>Close</Button>
      </form>
    </Paper>
   );
}

return (
  <Paper id="form-div" className={classes.paper} >
    <Typography className={classes.form}>You cannot edit other's post !</Typography>
    <Button variant="contained" onClick={ctrlEditPost} color="secondary" size="small" fullWidth>Close</Button>
  </Paper>
)
};

export default EditForm; 