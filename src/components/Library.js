import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import albumData from './../data/albums';
import { Row, Col, Image } from 'react-bootstrap';
import '.././styles/Library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state={albums: albumData};
  }

  render(){
    return (
      <Row className="library show-grid">
        {
          this.state.albums.map( (album, index) =>
            <Col xs={12} sm={12} md={6} lg={3} key={index} className="library-album-section">
              <Link to={`/album/${album.slug}`} key={index} className="library-album-info">
                <Image src={album.albumCover} alt={album.title} responsive className="image"/>
                <div>{album.title}</div>
                <div className="library-album-artist">{album.artist}</div>
                <div>{album.songs.length}songs</div>
              </Link>
            </Col>
          )
        }
      </Row>
    );
  }
}

export default Library
