import React, { useEffect, useState } from 'react'
import { getAllCategories, getQuestionDetailsForCategory } from '../../services/api/apis';
import './questionCategories.css'
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../assets/imgs/categoryHeader.png'
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../index';

const QuestionCategory = () => {

  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    setIsLoading(true);
    let response = getAllCategories();
    response.then((res) => {

      if (res.status == 200) {
        console.log(res)
        setAllCategories(res.data.trivia_categories)
      }
      setIsLoading(false);
    })
  }, []);



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

  };
  return (
    <>
      {isLoading && <Loader />}

      <Row className='search_bar'>
        <Row>
          <Container>
            <Col className='container'>
              <img src={logo} width={"120px"} className='m-3' onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
            </Col>
          </Container>
        </Row>
        <Container>
          <Row>
            <Col className='d-flex justify-content-center'><h2>Search For Category</h2></Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center' >
              <div className="inputGroup">
                <CiSearch color='#8854C0' className='search-icon' />

                <input
                  type="text"
                  required=""
                  onChange={handleSearchChange}
                  value={searchTerm}
                  placeholder='Search'
                />
              </div>
            </Col>
            <Row >
              <Col className='d-flex justify-content-center'>
                <p>Popular searches:</p>
                {allCategories.filter(category => category.id >= 21 && category.id < 25).map((category, index) => (
                  <div className='suggest_chip d-flex justify-content-center align-item-center' key={index} onClick={() => navigate(`/category/${category.id}`)}>
                    {category.name}
                  </div>))}
              </Col>
            </Row>
          </Row>

        </Container>
      </Row>
      <Container>
        <Row>
          {allCategories.map(category =>
            <Col className='mt-5'>
              <div className="card">

                <div className="bottom-section">
                  <span className="title">{category.name}</span>
                  <div className="row row1">
                    <div className="item">
                      <span className="big-text">{category.details?.total_easy_question_count}</span>
                      <span className="regular-text">Easy Questions</span>
                    </div>
                    <div className="item">
                      <span className="big-text">{category.details?.total_medium_question_count}</span>
                      <span className="regular-text">Medium Questions</span>
                    </div>
                    <div className="item">
                      <span className="big-text">{category.details?.total_hard_question_count}</span>
                      <span className="regular-text">Hard Questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  )
}

export default QuestionCategory

