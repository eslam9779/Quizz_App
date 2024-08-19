import React from 'react';
import './home.css';
import { Button, Container } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigation = useNavigate();

  const goToCategories = ()=>{

    navigation("/category")
  }
  return (
    <Container>
      <div className="home">
        <div className="home_paragraph">
          <p className='home_paragraph_p'>Challenge Your Knowledge with Fun Quizzes!</p>
          <span className='home_paragraph_span'>Ready to Test Your Brainpower ? </span>
          
          <div className='home_buttons '>
            <Button className='home_buttons_btn1 ' onClick={()=>goToCategories()} >
              <p>EXPERIENCE THE PLATFORM</p>
              <span> Try It Now<IoIosArrowForward /></span>
            </Button>

            <Button className='home_buttons_btn2'>

              <p>ADMINISTRATORS</p>
              <span> Learn More <IoIosArrowForward /></span>

            </Button>
          </div>

        </div>
        <div className="home_img">
          <iframe
            src="https://rive.app/s/SqJ8CRKHKUCiFw8l1z76dQ/embed"
            title="Interactive Animation"
            // style={{ border: 'none', width: '100%', height: '500px' }} 
            className='home_img-iframe'

          />
        </div>
      </div>
    </Container>
  );
};

export default Home;
