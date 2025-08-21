import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../services/api';
import CodeEditor from '../components/CodeEditor';
import Timer from '../components/Timer';
import styles from './TestPage.module.css';

const CodingTest = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions({ company: 'Wipro', category: 'Coding', limit: 2 });
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch coding questions:', error);
      }
    };
    fetchQuestions();
    hasFetched.current = true;
  }, []);

  const handleTimeUp = () => {
    // Handle time up
    navigate('/result', { state: { score: 'N/A', totalQuestions: 2, category: 'Coding' } });
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Coding Test</h2>
      <div className={styles.timerContainer}>
        <Timer initialTime={3600} onTimeUp={handleTimeUp} />
      </div>
      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.question}</h3>
          <CodeEditor />
        </div>
      ))}
    </div>
  );
};

export default CodingTest;
