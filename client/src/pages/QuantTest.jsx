import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import styles from './TestPage.module.css';

const QuantTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions({ company: 'Wipro', category: 'Quantitative', limit: 16 });
        setQuestions(response.data);
        setUserAnswers(new Array(response.data.length).fill(null));
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    fetchQuestions();
    hasFetched.current = true;
  }, []);

  const handleAnswer = (selectedOption) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);
 };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    const detailedResults = questions.map((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.answer;
      if (isCorrect) {
        score++;
      }
      return {
        questionId: question._id,
        questionText: question.question,
        correctAnswer: question.answer,
        userAnswer: userAnswer,
        isCorrect: isCorrect,
      };
    });
    navigate('/result', { state: { score, totalQuestions: questions.length, category: 'Quantitative', detailedResults } });
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  if (questions.length === 0 || !questions[currentQuestionIndex]) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.timerContainer}>
        <Timer initialTime={960} onTimeUp={handleTimeUp} />
      </div>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        userAnswer={userAnswers[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
      <div className={styles.navigationButtons}>
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="btn btn-login">
          Previous
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext} className="btn btn-download">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn btn-thank-you">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuantTest;
