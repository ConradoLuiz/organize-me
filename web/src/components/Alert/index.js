import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    position: 'absolute',
    top: 0,
    margin: '15px 0 0 0',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts({severity, text, callback}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={severity} onClose={() => {callback()}}>{text}</Alert>
    </div>
  );
}