import React, { useEffect, useState } from 'react';
import { getAllCategories, getQuestionDetailsForCategory } from '../../services/api/apis';
import './questionCategories.css';
import { Col, Container, Row } from 'react-bootstrap';
import logo from '../../assets/imgs/categoryHeader.png';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../index';

const QuestionCategory = () => {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategoriesAndDetails = async () => {
      setIsLoading(true);
  
      try {
        const response = await getAllCategories();
  
        if (response.status === 200) {
          const categories = response.data.trivia_categories;
  
          const categoriesWithDetails = await Promise.all(
            categories.map(async (category) => {
              const details = await getQuestionDetailsForCategory(category);
              category.details = details.data.category_question_count;
              return category;
            })
          );
  
          setAllCategories(categoriesWithDetails);
          setFilteredCategories(categoriesWithDetails); // Initialize filtered categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCategoriesAndDetails();
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = allCategories.filter(category => 
      category.name.toLowerCase().includes(searchValue)
    );

    setFilteredCategories(filtered);
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
          {filteredCategories.map(category =>
            <Col className='mt-5' key={category.id}>
              <div className="card" onClick={() => navigate("/category/" + category.id)}>
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

export default QuestionCategory;
