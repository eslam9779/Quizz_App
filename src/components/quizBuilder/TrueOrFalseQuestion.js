import React, { useState } from 'react';

const TrueOrFalseQuestion = ({ question, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-counter">Question {questionNumber} of {totalQuestions}</span>
        <div className="question-meta">
          <span className="category">{question.category}</span>
          <span className="difficulty">{question.difficulty}</span>
        </div>
      </div>

      <div className="question-content">
        <h2 className="question-text">{question.question}</h2>
        
        <div className="options-grid">
          <div 
            className={`answer-option ${selectedAnswer === 'True' ? 'selected' : ''}`}
            onClick={() => handleAnswerSelect('True')}
          >
            <input
              type="radio"
              name="answer"
              value="True"
              checked={selectedAnswer === 'True'}
              onChange={() => handleAnswerSelect('True')}
            />
            <span className="answer-text">True</span>
          </div>

          <div 
            className={`answer-option ${selectedAnswer === 'False' ? 'selected' : ''}`}
            onClick={() => handleAnswerSelect('False')}
          >
            <input
              type="radio"
              name="answer"
              value="False"
              checked={selectedAnswer === 'False'}
              onChange={() => handleAnswerSelect('False')}
            />
            <span className="answer-text">False</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueOrFalseQuestion;