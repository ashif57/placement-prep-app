import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import styles from './TestPage.module.css';

const VerbalTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Add state for user answers
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions({ company: 'Wipro', category: 'Verbal Ability', limit: 22 });
        setQuestions(response.data);
        setUserAnswers(new Array(response.data.length).fill(null)); // Initialize user answers array
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    fetchQuestions();
    hasFetched.current = true;
  }, []);

  const handleAnswer = (answer) => {
    // Store the user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);
    
    // Move to the next question or submit if it's the last question
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      handleSubmitTest();
    }
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

  const handleSubmitTest = () => {
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
    
    navigate('/result', { state: { score, totalQuestions: questions.length, category: 'Verbal Ability', detailedResults } });
  };

  const handleTimeUp = () => {
    // Handle time up (e.g., submit test)
    handleSubmitTest();
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.timerContainer}>
        <Timer initialTime={840} onTimeUp={handleTimeUp} />
      </div>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        userAnswer={userAnswers[currentQuestionIndex]} // Pass user answer to QuestionCard
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
          <button onClick={handleSubmitTest} className="btn btn-thank-you">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default VerbalTest;
