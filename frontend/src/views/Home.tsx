import React from 'react';

import DailyNotes from './DailyNotes';

import {
  Grid,
} from '@material-ui/core';
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core/styles";


var BASE_URL = "https://raw.githubusercontent.com/ntorba/nicktorba.com/master/frontend/posts/daily_notes/";


function addDays(date:Date, days:number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getPastDates(start_date: Date, num_days: number) {
  var date_range = new Array();
  for (var i=0; i<num_days; i++) {
    var next_date = addDays(start_date, -i);
    date_range.push(next_date.toISOString().slice(0,10));
  }
  return date_range;
}

type Post = {
  text: string; 
  date: string;
}

interface HomeMainState {
    posts: Array<Post>;
    dateRange: Array<string>;
}


interface HomeMainProps extends WithStyles<typeof styles>{ }

const styles = (theme: Theme) => createStyles({
  link: {
    color: '#61dafb',
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  app: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    color: 'blue'
  },
  header: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
});

class Home extends React.Component<HomeMainProps, HomeMainState> {
    state = { posts: [] , dateRange: getPastDates(new Date(), 5)};
    componentDidMount() {
      console.log("DATE RANGE: ", this.state.dateRange);
      console.log(this.state.dateRange[1]);
      var arrayLength = this.state.dateRange.length;
      for (var i=0; i < arrayLength; i++) {
        var url = BASE_URL + this.state.dateRange[i] + ".md";
        this.fetchText(url, i)
      }
    };

    async fetchText(url:string, date_index:number) {
      let response = await fetch(url);
      if (response.status === 200) {
          let text = await response.text();
          let updated_posts = [...this.state.posts, {text: text, date: this.state.dateRange[date_index]}]
          updated_posts.sort((a,b) => a.date - b.date);
          this.setState({
            posts: updated_posts
          })
      }else {
        console.log("FAILED FETCH");
      }
    }

    render() {
      const { classes } = this.props;
      return (
          <Grid container spacing={1} className={classes.mainGrid}>
              <DailyNotes posts={this.state.posts} />
          </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Home);


