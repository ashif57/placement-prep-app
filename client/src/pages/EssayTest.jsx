import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../services/api';
import EssayBox from '../components/EssayBox';
import Timer from '../components/Timer';
import styles from './TestPage.module.css';

const EssayTest = () => {
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    const fetchQuestion = async () => {
      try {
        const response = await getQuestions({ company: 'Wipro', category: 'Essay Writing', limit: 1 });
        if (response.data.length > 0) {
          setQuestion(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch essay question:', error);
      }
    };
    fetchQuestion();
    hasFetched.current = true;
  }, []);

  const handleSubmit = (text) => {
    console.log('Essay submitted:', text);
    // Create detailed results for the essay
    const detailedResults = [{
      questionId: question._id,
      questionText: question.question,
      correctAnswer: 'N/A', // Essays don't have a single correct answer
      userAnswer: text,
      isCorrect: null, // Essays aren't simply correct/incorrect
    }];
    
    navigate('/result', { state: { score: 'N/A', totalQuestions: 1, category: 'Essay Writing', detailedResults } });
  };

  const handleTimeUp = () => {
    // Handle time up
    // Create detailed results for the essay with empty text
    const detailedResults = [{
      questionId: question._id,
      questionText: question.question,
      correctAnswer: 'N/A',
      userAnswer: '',
      isCorrect: null,
    }];
    
    navigate('/result', { state: { score: 'N/A', totalQuestions: 1, category: 'Essay Writing', detailedResults } });
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Essay Writing Test</h2>
      <p>{question.question}</p>
      <div className={styles.timerContainer}>
        <Timer initialTime={1200} onTimeUp={handleTimeUp} />
      </div>
      <EssayBox onSubmit={handleSubmit} />
    </div>
  );
};

export default EssayTest;
