import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '.././styles/Landing.css';

const Landing = () => (
  <Row className="landing show-grid">
      <Col xs={12} md={12} className="selling-points">
      <h1 id="landing-title">Bloc Jams</h1>
      </Col>

      <Col xs={12} md={12}>
      <h1 className="hero-title">Turn the music up!</h1>
          <section className="selling-points">
            <Col xs={12} className="point">
              <h2 className="point-title">Choose your music</h2>
                <p className="point-description">The world is full of musik; why should you have to listen to music that someone else chose?</p>
            </Col>

            <div className="point">
              <h2 className="point-title">Unlimited, streaming, add-free</h2>
              <p className="point-description">No arbitrary limits. No distraction.</p>
            </div>
            <div className="point">
              <h2 className="point-title">Mobileenebled</h2>
              <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            </div>
          </section>
        </Col>
    </Row>
);

export default Landing
