import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import styles from './TestPage.module.css';

const LogicalTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions({ company: 'Wipro', category: 'Logical Reasoning', limit: 14 });
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    fetchQuestions();
    hasFetched.current = true;
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      navigate('/result', { state: { score, totalQuestions: questions.length, category: 'Logical Reasoning' } });
    }
  };

  const handleTimeUp = () => {
    // Handle time up (e.g., submit test)
    navigate('/result', { state: { score, totalQuestions: questions.length, category: 'Logical Reasoning' } });
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.timerContainer}>
        <Timer initialTime={1080} onTimeUp={handleTimeUp} />
      </div>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default LogicalTest;
