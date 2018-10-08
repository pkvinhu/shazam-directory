import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    url: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiX3Nqo0PXdAhXHJt8KHc5fASkQjRx6BAgBEAU&url=http%3A%2F%2Fwww.pewresearch.org%2Ffact-tank%2F2018%2F09%2F07%2F6-facts-about-americas-students%2F&psig=AOvVaw0GU3KcJ7hGnHnHZ1_N0Y4t&ust=1539046268033221',
    title: 'Students',
    width: '40%',
    to: '/students'
  },
  {
    url: 'https://www.google.com/search?q=schools&rlz=1C5CHFA_enUS695US698&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjagO2y0PXdAhXQmOAKHfnuAY0Q_AUIECgD&biw=1440&bih=821#imgrc=bSGjUkxdgNsD9M:',
    title: 'Schools',
    width: '30%',
    to: '/schools'
  },
  {
    url: 'https://www.google.com/search?q=teachers&rlz=1C5CHFA_enUS695US698&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjG3eu-0PXdAhWKmeAKHZSkB2gQ_AUIDygC&biw=1440&bih=821#imgrc=YQc1odLDUEnXLM:',
    title: 'Teachers',
    width: '30%',
    to: '/teachers'
  },
];

export default class NavBar extends Component {
  /*constructor(props){
    super(props)
  }

  render() {
  	const { classes } = this.props
  	return(
      <div className={classes.root}>
      {images.map(image => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
          to={image.to}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  	)
  }*/
  render(){
    return (
      <div style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column' }}>
        <ul style={{ listStyle: 'none' }}>
          <li><Link to='/welcome'>Welcome</Link></li>
          <li><Link to='/students'>Student Directory</Link></li>
          <li><Link to='/teachers'>Teacher Directory</Link></li>
          <li><Link to='/schools'>School Directory</Link></li>
        </ul>
      </div>
    )
  }
}