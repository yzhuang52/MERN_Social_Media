import React, { useState } from 'react'
import useStyles from "./styles";
import { Card, CardActions, CardMedia, Typography, Button, CardContent, ButtonBase } from '@material-ui/core';
import moment from 'moment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { deletePost, likePost  } from '../../../actions/posts';
import {ThumbUpAltOutlined} from "@material-ui/icons";
import {useNavigate} from "react-router-dom";

export default function Post({post, setCurrentId}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon
                        fontSize="small"/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined
                        fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }
    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }
    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = post.likes.find( (like)=> like===(user?.result?.googleId || user?.result?._id));
    const handleClick = () => {
        dispatch(deletePost(post._id));
        if(hasLikedPost){
            setLikes(post.likes.filter( (id) => id!==userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    }
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost} component="span">
          <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant='body2'>{moment(post.createAt).fromNow()}</Typography>
          </div>
            {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator) && (
          <div className={classes.overlay2}>
            <Button style={{color: 'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
              <MoreHorizIcon fontSize='medium'/>
            </Button>
          </div>
            )}
          <div className={classes.details}>
            <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag}`)}</Typography>
          </div>
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
          <CardContent>
            <Typography variant='body2' color="textSecondary" component="p">{post.message}</Typography>
          </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={()=>dispatch(likePost(post._id))}>
            <Likes/>
        </Button>
          {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator) && (
              <Button size="small" color="primary" onClick={handleClick} disabled={!user?.result}>
                  <DeleteIcon fontSize="small"/>Delete
              </Button>
          )}
      </CardActions>
    </Card>
  )
}
