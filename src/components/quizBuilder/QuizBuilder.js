import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestions as fetchQuestions } from '../../services/api/apis';
import Loader from '../loader/Loader';
import MultipleChoiceQuestion from '../question_view/MultipleChoiceQuestion';
import TrueOrFalseQuestion from './TrueOrFalseQuestion';

const QuizBuilder = () => {
  let { amount, difficulty, type, categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isQuizEnded, setIsQuizEnded] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId, selectedAnswer) => {

    setUserAnswers(prev => {
      
      const newAnswers = {
        ...prev,
        [questionId]: {
          selected: selectedAnswer,
          correct: questions[questionId].correct_answer,
          isCorrect: selectedAnswer === questions[questionId].correct_answer
        }
      };
      console.log('Updated answers:', newAnswers); // Debug log
      return newAnswers;
    });
  };

  const calculateScore = () => {

    const totalCorrect = Object.values(userAnswers)
      .filter(answer => answer.isCorrect).length;
    setScore((totalCorrect / questions.length) * 100);
    setShowResults(true);
    setIsQuizEnded(true);
  };
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchQuestions(categoryId, amount, difficulty, type);
        if (response.status === 200) {
          setQuestions(response.data.results);
          
        }
      } catch (error) {
        setError("Error fetching questions: " + error.message);
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizQuestions();
  }, [amount, difficulty, type, categoryId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsQuizEnded(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    }
  };
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    }
  };


  if (isLoading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="quiz-container">
      {!showResults ? (
        <>
          <div className="timer">
            Time Remaining: {formatTime(timeLeft)}
          </div>
          {questions.length > 0 && (
            <div className="question-section">
              {questions[currentQuestion].type === "multiple" ? (
                <MultipleChoiceQuestion
                  question={questions[currentQuestion]}
                  questionNumber={currentQuestion + 1}
                  totalQuestions={questions.length}
                  onAnswerSelect={(answer) => handleAnswerSelect(currentQuestion, answer)}
                  selectedAnswer={userAnswers[currentQuestion]?.selected || ''}
                />
              ) : (
                <TrueOrFalseQuestion
                  question={questions[currentQuestion]}
                  questionNumber={currentQuestion + 1}
                  totalQuestions={questions.length}
                  onAnswerSelect={(answer) => handleAnswerSelect(currentQuestion, answer)}
                  selectedAnswer={userAnswers[currentQuestion]?.selected || ''}
                />
              )}
              <div className="navigation-buttons">
                <button
                  className="nav-button"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button
                    className="nav-button submit-button"
                    onClick={calculateScore}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    className="nav-button"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="results-container">
          <h2>Quiz Results</h2>
          <p>Your Score: {score}%</p>
          <div className="answers-review">
            {questions.map((question, index) => (
              <div key={index} className="answer-item">
                <p>Q{index + 1}: {question.question}</p>
                <p className={userAnswers[index]?.isCorrect ? 'correct' : 'incorrect'}>
                  Your Answer: {userAnswers[index]?.selected}
                </p>
                <p>Correct Answer: {question.correct_answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizBuilder;