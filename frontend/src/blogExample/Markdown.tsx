import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
// import {HighlightedMarkdown} from '../views/HighlightedMarkdown';

const styles = (theme: Theme) =>
  createStyles({
    listItem: {
      marginTop: theme.spacing(1),
    },
  });

const options = {
  overrides: {
    // code: {
    //   component: HighlightedMarkdown
    // },
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h2',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h4' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    li: {
      component: withStyles(styles)((props: WithStyles<typeof styles>) => {
        const { classes, ...other } = props;
        return (
          <li className={classes.listItem}>
            <Typography component="span" {...other} />
          </li>
        );
      }),
    },
  },
};

interface MarkdownProps {
  date: string;
}

export default function Markdown(props: any) {
  return (
    <div>
      <Typography variant="h4" >{props.date}</Typography>
      <ReactMarkdown options={options} {...props} />
      <Divider />
    </div>
  );
}
