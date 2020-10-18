import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    about: {
      ...theme.typography.body2,
      padding: theme.spacing(3, 3),
    },
  }));

export default function About(props:any) {
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.about}>
                <h2>What be doin here</h2>
                <p>I'm Nick Torba. I work as a software engineer. This site is a work in progress, clearly, but I use it to put my thoughts out in the ether to see if anyone likes them. Worst case, it'll just be a reference for my future self to see what I was thinking about.  </p>
                <p>If you see anything you like, let me know! My email is <b>nicholastorba@gmail.com</b></p> 
                <h3>My Interests</h3>
                <ul>
                    <li>python</li>
                    <li>machine learning</li>
                    <li>MLOps</li>
                    <li>Moutain Biking</li>
                </ul>
                <h3>Future Interests</h3>
                <ul>
                    <li>genomics</li>
                    <li>quantum computing</li>
                </ul>
                <Divider></Divider>
                <h2>The Code Behind This Site</h2>
                <p>
                    I said I'm a software engineer, but I don't work in frontend-land much. The code to build this site exists here: https://github.com/ntorba/nicktorba.com. 
                    I chose react because I had messed with it before and it seemed useful to learn. If you see any obvious things I should be doing better and are feeling generous, please reach out. Otherwise, not much thought or useful experience is reflected in this setup.
                </p>
            </div>
        </Fragment>
    )
}
