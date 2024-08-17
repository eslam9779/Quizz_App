import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import navIcon from '../../assets/imgs/icon.svg'
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../services/api/apis';
import { Loader } from '../index';
import './header.css'
const Header = () => {

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
    <div className="hover-menu ">
      {allCategories.filter(category => category.id >= 20 && category.id < 26).map(category => (
       <>
          <Link key={category.id} to={`/category/${category.id}`} className="hover-menu-item">
            {category.name}
          </Link>
          <hr/>

       </>
      ))}
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/category">
        Show All
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
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <div className="menu-container">
                  <Button variant="outline-primary" className='mt-2 header_btn' >Categories</Button>
    
                  {HoverMenu()}
                </div>
                <Nav.Link as={Link} to="/category">
                  <Button variant="primary">See All</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    </>
  );
}

export default Header;

