import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import { Row, Col, Image, Table } from 'react-bootstrap';
import '.././styles/Album.css';

class Album extends Component{
  constructor(props){
    super(props);

    const album=albumData.find(album=>{
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      isMouseInside: false,
      currentMouseOverSong: null,
      volume: 0.5
    };

    this.audioElement=document.createElement('audio');
    this.audioElement.src=album.songs[0].audioSrc;
  }

play(){
  this.audioElement.play();
  this.setState({isPlaying: true})
}

pause(){
  this.audioElement.pause();
  this.setState({isPlaying: false});
}

componentDidMount(){
  this.eventListeners = {
    timeupdate: e => {
      this.setState({currentTime: this.audioElement.currentTime});
    },
    durationChange: e => {
      this.setState({duration: this.audioElement.duration});
    }
  };
  this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
}

componentWillUnmount(){
  this.audioElement.src=null;
  this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
  this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
}

setSong(song){
  this.audioElement.src=song.audioSrc;
  this.setState({currentSong: song});
}

handleSongClick(song){
  const isSameSong=this.state.currentSong === song;
  if(this.state.isPlaying && isSameSong){
    this.pause();
  } else{
    if(!isSameSong) {this.setSong(song);}
    this.play();
  }
}

handlePrevClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex - 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleNextClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex + 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleTimeChange(e){
  const newTime=this.audioElement.duration*e.target.value;
  this.audioElement.currentTime=newTime;
  this.setState({currentTime: newTime});
}

handleMouseEnter(song){
  // console.log('mouse enter');
  this.setState({isMouseInside: true, currentMouseOverSong: song});
  this.setState({isPlaying: false});
}

handleMouseLeave(){
  // console.log('mouse leave');
  this.setState({isMouseInside: false});
}

formatTime(seconds){
  if (isNaN(seconds)){return "-:--";}
  const roundSeconds = Math.floor(seconds);
  const numMinutes = Math.floor(roundSeconds / 60);
  const remSeconds = roundSeconds % 60;
  if (remSeconds<10){
    return numMinutes + ":" + '0' + remSeconds;}
  else {
    return numMinutes + ":" + remSeconds;
  }
}

handleVolumeChange(e){
  const newVolume=e.target.value;
  this.audioElement.volume=newVolume;
  this.setState({volume: newVolume});
}

  render(){
    return (
        <Row className="album show-grid">
          <Col xs={12} md={12} lg={12}id="album-info">
            <Image responsive className="image" src={this.state.album.albumCover} alt={this.state.album.title}/>

            <Col xs={12} className="album-details">
              <h5 id="album-title">{this.state.album.title}</h5>
              <h3 className="artist">{this.state.album.artist}</h3>
              <h5 id="release-info">{this.state.album.releaseInfo}</h5>
            </Col>

          </Col>

          <Col xs={12} md={12} lg={12} className="table-content">
            <Table responsive id="song-list">
              <colgroup>
                <col id="song-number-column"/>
                <col id="song-title-column"/>
                <col id="song-duration-column"/>
              </colgroup>
              <tbody>
                    {this.state.album.songs.map( (song, index) =>
                      <tr className="song" key={index}
                      onClick={() => this.handleSongClick(song)}
                      onMouseEnter={()=>this.handleMouseEnter(song)}
                      onMouseLeave={()=>this.handleMouseLeave()}>
                        <td className="table-data"> {!this.state.isMouseInside ? index+1 : null}
                        {this.state.isMouseInside && !this.state.isPlaying && this.state.currentMouseOverSong === song ? <button><span className="icon ion-md-play"></span></button> : null}
                        {this.state.isMouseInside && this.state.isPlaying && this.state.currentMouseOverSong === song ? <button><span className="icon ion-md-pause"></span></button> : null}  {song.title}  {this.formatTime(song.duration)}</td>
                      </tr>
                      )
                    }
              </tbody>
            </Table>
          </Col>
              <PlayerBar
                isPlaying={this.state.isPlaying}
                currentSong={this.state.currentSong}
                currentTime={this.audioElement.currentTime}
                duration={this.audioElement.duration}
                handleSongClick={()=>this.handleSongClick(this.state.currentSong)}
                handlePrevClick={()=>this.handlePrevClick()}
                handleNextClick={()=>this.handleNextClick()}
                handleTimeChange={(e)=>this.handleTimeChange(e)}
                formatTime={(e)=>this.formatTime(e)}
                handleVolumeChange={(e)=>this.handleVolumeChange(e)}
              />
      </Row>
    );
  }
}

export default Album;
