import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row className="App">
          <Col xs={12} md={12}>
              <nav>
                  <Link to='/' className="Link">Landing</Link> <Link to='/library' className="Link">Library</Link>
              </nav>
          </Col>

          <Col xs={12} className="main-content">
            <main>
                <Route exact path="/" component={Landing} />
                <Route path="/library" component={Library} />
                <Route path="/album/:slug" component={Album}/>
            </main>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
