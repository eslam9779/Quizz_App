import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import navIcon from '../../assets/imgs/icon.svg'
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../services/api/apis';
import { Loader } from '../index';
import './header.css'
import { IoIosArrowForward } from "react-icons/io";
import { SiOsgeo } from "react-icons/si";
import { LiaClipboardListSolid } from "react-icons/lia";

const Header = (props) => {

  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {

    setIsLoading(true);
    let response = getAllCategories()
    response.then((res) => {

      if (res.status == 200) {
        setAllCategories(res.data.trivia_categories)
      }
      setIsLoading(false);
    })

  }, [])

  const HoverMenu = () => (
    <div className="hover-menu mt-1">
      {allCategories.filter(category => category.id >= 21 && category.id < 25).map((category, index) => (
        <div key={index}>
          <Link key={category.id} to={`/category/${category.id}`} className="hover-menu-item">
            <div className='d-flex mx-2 align-item-center'>
              <div className='mx-2'> <SiOsgeo color='#8854C0'/></div>
              <div className='' > {category.name} </div>
            </div>
          </Link>
          <hr />  

        </div>
      ))}
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/category">
        <div className='d-flex mx-2 align-item-center show_all'>
          <div className='mx-2'> <LiaClipboardListSolid color='#8854C0'  size={"22"} /></div>
          <div className='' > {"show All"}</div>
        </div>
        <hr />

      </NavDropdown.Item>
    </div>
  );

  return (
    <>
      {isLoading && <Loader />}
      <div className='mx-5 header'>
        <Container>
          <Navbar collapseOnSelect expand="lg" className="bg-body">
            <Navbar.Brand as={Link} to="/">
              <img src={navIcon} alt="Navigation Icon" />
            </Navbar.Brand>
              {props.visable==true ?
              <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <div className="menu-container">
                  <Button variant="outline-primary" className='mt-2 header_btn' >Categories</Button>

                   {HoverMenu()}
                </div>
                <Nav.Link as={Link} to="/category">
                  <Button variant="primary" className='header_trynow'>Try It Now<IoIosArrowForward />                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            </>
            :
            <></>
              }
          </Navbar>
        </Container>
      </div>
    </>
  );
}

export default Header;

