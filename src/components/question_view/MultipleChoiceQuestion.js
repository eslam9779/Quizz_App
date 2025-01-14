import React, { useMemo, useState } from 'react';

const MultipleChoiceQuestion = ({ question, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  
  const allAnswers = useMemo(() => {
    return [question.correct_answer, ...question.incorrect_answers]
      .sort(() => Math.random() - 0.5);
  }, [question.correct_answer, question.incorrect_answers]);

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
          {allAnswers.map((answer, index) => (
            <div 
              key={index}
              className={`answer-option ${selectedAnswer === answer ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(answer)}
            >
              <input
                type="radio"
                name="answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => handleAnswerSelect(answer)}
              />
              <span className="answer-text">{answer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;