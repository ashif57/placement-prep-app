import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { getResultById } from '../services/api';
import styles from './Result.module.css';

const ResultDetails = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    const fetchResultDetails = async () => {
      try {
        const resultResponse = await getResultById(id);
        setResult(resultResponse.data);
      } catch (error) {
        console.error('Failed to fetch result details:', error);
      }
    };

    fetchResultDetails();
    hasFetched.current = true;
  }, [id]);

  if (!result) {
    return <div>Loading...</div>;
  }

  const correctAnswers = result.detailedResults.filter(q => q.isCorrect);
  const incorrectAnswers = result.detailedResults.filter(q => !q.isCorrect);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Test Result Details</h2>
      <p className={styles.score}>
        Score: {result.score} out of {result.totalQuestions} in {result.category}
      </p>

      {correctAnswers.length > 0 && (
        <div className={styles.correctAnswersContainer}>
          <h3>Correct Answers:</h3>
          <ul>
            {correctAnswers.map((q, index) => (
              <li key={index} className={styles.correctAnswerItem}>
                <div className={styles.questionIcon}>
                  <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                </div>
                <div className={styles.questionContent}>
                  <p className={styles.questionText}>{q.questionText}</p>
                  <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                  <p><strong>Your Answer:</strong> {q.userAnswer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {incorrectAnswers.length > 0 && (
        <div className={styles.incorrectAnswersContainer}>
          <h3>Incorrect Answers:</h3>
          <ul>
            {incorrectAnswers.map((q, index) => (
              <li key={index} className={styles.incorrectAnswerItem}>
                <div className={styles.questionIcon}>
                  <FontAwesomeIcon icon={faTimesCircle} className={styles.timesIcon} />
                </div>
                <div className={styles.questionContent}>
                  <p className={styles.questionText}>{q.questionText}</p>
                  <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                  <p><strong>Your Answer:</strong> {q.userAnswer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/dashboard" className={styles.link}>
        Back to Dashboard
      </Link>
    </div>
  );
};

export default ResultDetails;
