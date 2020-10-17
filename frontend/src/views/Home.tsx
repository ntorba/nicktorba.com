import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { getMessage } from '../utils/api';
import { isAuthenticated } from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#61dafb',
  },
}));


export const Home: FC = () => {
  const [message, setMessage] = useState<string>('this is a message!');
  const [error, setError] = useState<string>('');
  const classes = useStyles();

  function handleSubmit(event: any) {
    setMessage(event.target.value)
    alert('A name was submitted: ' + message);
    // event.preventDefault();
  }

  function handleChange(event: any) {
    setMessage(event.target.value)
  }

  return (
    <>
      {
        <div>
          <a className={classes.link} href="/admin">
            Admin Dashboard
          </a>

          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <p>{message}</p>
          <a className={classes.link} href="/protected">
            Protected Route
          </a>
          <p></p>
          <a className={classes.link} href="/songtable">
            Song Table
          </a>
          <p></p>
          <a className={classes.link} href="/posts">
            Posts
          </a>
        </div>
      }
    </>
  );
};
