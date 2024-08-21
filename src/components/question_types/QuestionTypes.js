import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const QuestionTypes = () => {
  const { categoryId } = useParams();

  const [amount, setAmount] = useState(10); 
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [selectedType, setSelectedType] = useState('multiple');

  const difficulty = [
    { option: 'Easy', value: 'easy' },
    { option: 'Medium', value: 'medium' },
    { option: 'Hard', value: 'hard' },
  ];

  const type = [
    { option: 'Multipule Choice', value: 'multiple' },
    { option: 'True / False', value: 'boolean' },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      categoryId,
      amount,
      difficulty: selectedDifficulty,
      type: selectedType,
    };
    console.log(formData);
    // You can process the formData here
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="amount">
          <Form.Label>Number of Questions</Form.Label>
          <Form.Control
            type="number"
            min="5"
            max="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulty.map((diff, index) => (
              <option key={index} value={diff.value}>
                {diff.option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Question Type</Form.Label>
          <Form.Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default QuestionTypes;
