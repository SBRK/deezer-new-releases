import React from 'react';
import injectSheet from 'react-jss'

const styles = {
  album: {
    width: 250,
    marginTop: 10,
    flexDirection: 'column',
    textDecoration: 'none',
    color: 'white',
    fontFamily: 'Arial',
  },

  albumCover: {
    width: 250,
    height: 250,
    background: '#ccc',
  },

  albumInfo: {
    marginTop: 10,
    width: 250,
  },

  albumArtist: {
    height: 20,
    lineHeight: '20px',
    fontSize: 16,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  albumName: {
    height: 20,
    lineHeight: '20px',
    fontSize: 16,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  albumDate: {
    height: 20,
    lineHeight: '20px',
    fontSize: 16,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}

const Album = ({
  classes,
  title,
  artist_name,
  release_date,
  cover_medium,
  link,
}) => (
  <a
    href={link}
    target='_blank'
    className={classes.album}
  >
    <div className={classes.albumCover}>
      <img src={cover_medium} />
    </div>
    <div className={classes.albumInfo}>
      <div className={classes.albumArtist}>{artist_name}</div>
      <div className={classes.albumName}>{title}</div>
      <div className={classes.albumDate}>{release_date}</div>
    </div>
  </a>
)

export default injectSheet(styles)(Album)
