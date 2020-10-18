import React, { FC , Fragment} from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Home from './views/Home';
import Blog from './blogExample/Blog';
import About from './views/About';

import {
  Tabs,
  Tab, 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'fixed',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
}));

export const Routes: FC = () => {
  const classes = useStyles();

  return (
    <Switch>
      <div className={classes.header}>
      <Route
        path="/"
        render={({ location }) => (
          <Fragment>
            <Tabs value={location.pathname} centered>
              <Tab label="Daily Notes" value="/" component={Link} to="/" />
              <Tab label="About" value="/about" component={Link} to="/about" />
              <Tab label="Essays" value="/essays" component={Link} to="/essays" />
              {/* <Tab value="/blog_example" label="Blog Example" component={Link} to="/blog_example" /> */}
            </Tabs>
            <Switch>
              <Route exact path="/about" component={About}/>
              {/* <Route exact path="/blog_example" component={Blog} /> */}
              <Route exact path="/" component={Home} />
              <Route exact path="/essays" render={() => (<div>Coming Soon?</div>)} />
            </Switch>
          </Fragment>
        )}
      />
      </div>
    </Switch>
  );
};

  