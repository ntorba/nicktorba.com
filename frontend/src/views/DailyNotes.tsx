import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from '../blogExample/Markdown';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 3),
  },
  header: {
    padding: theme.spacing(0, 1)
  }
}));

type Post = {
    text: string; 
    date: string;
  }

interface DailyNotesProps {
  posts: Array<Post>;
}

export default function DailyNotes(props: DailyNotesProps) {
  const classes = useStyles();
  const { posts } = props;
  console.log("POSTS IN MAIN: ", posts);
  return (
    // <Grid item xs={12} md={8}>
    <Grid container flex-direction="row" justify-context="flex-start">
      <Typography variant="h4" className={classes.header}>
        Daily Notes
      </Typography>
      <br/>
      <p style={{"fontSize":12}} className={classes.markdown}>
        Daily notes are where I post thoughts from each day. 
        This is inspired by Roam Researh along with the idea of Learning in Public like Salmon Ansari. 
        These notes are low pressure, low edited, low quality, and often repetitive. 
        As I gather thoughts here, you will likely see them flow into more well thought out essays I write in the future.
      </p>
      <Divider />
      {posts.map((post) => (
        <div>
            <Grid item>
              <Typography variant="h5">{post.date}</Typography>
              <Markdown className={classes.markdown} key={post.text.substring(0, 40)} >
                  {post.text}
              </Markdown>
            </Grid>
        </div>
      ))}
    </Grid>
  );
}
