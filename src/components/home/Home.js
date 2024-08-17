import React from 'react';
import './home.css';
import { Button, Container } from 'react-bootstrap';

const Home = () => {


  return (
    <Container>
      <div className="home">
        <div className="home_paragraph">
          <p>Plan in seconds,not weekends.</p>
          <p>Deliver instruction that’s relevant for every student — now with a boost from AI.     </p>
          <Button variant="primary">Primary</Button>
          <Button variant="primary">Primary</Button>

        </div>
        <div className="home_img">
          <iframe 
            src="https://rive.app/s/SqJ8CRKHKUCiFw8l1z76dQ/embed" 
            title="Interactive Animation"
            style={{ border: 'none', width: '100%', height: '500px' }} 
            
          />
        </div>
      </div>
    </Container>
  );
};

export default Home;
