import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { saveResult, getQuestionsByIds } from '../services/api';
import styles from './Result.module.css';

const Result = () => {
  const location = useLocation();
  const { score, totalQuestions, category, detailedResults } = location.state || { score: 0, totalQuestions: 0, category: 'Unknown', detailedResults: [] };

  const hasSaved = useRef(false);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [showWrongQuestions, setShowWrongQuestions] = useState(false);

  useEffect(() => {
    if (!hasSaved.current) {
      hasSaved.current = true; // Mark as saved to prevent future calls
      const saveTestResult = async () => {
        try {
          await saveResult({ category, score, totalQuestions, detailedResults: detailedResults || [] });
        } catch (error) {
          console.error('Failed to save test result:', error);
        }
      };
      saveTestResult();
    }
  }, [category, score, totalQuestions, detailedResults]);

  // No longer needed as detailedResults will contain all info
  // const handleShowWrongQuestions = async () => {
  //   if (incorrectQuestionIds.length > 0) {
  //     try {
  //       const response = await getQuestionsByIds(incorrectQuestionIds);
  //       setWrongQuestions(response.data);
  //       setShowWrongQuestions(true);
  //     } catch (error) {
  //       console.error('Failed to fetch wrong questions:', error);
  //     }
  //   }
  // };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Test Result</h2>
      <p className={styles.score}>
        You scored {score} out of {totalQuestions} in {category}
      </p>


      <Link to="/dashboard" className={styles.link}>
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Result;