import React from 'react';
import styles from './QuestionCard.module.css';

const QuestionCard = ({ question, onAnswer, userAnswer, questionNumber, totalQuestions }) => {
  return (
    <div className={styles.card}>
      <div className={styles.questionHeader}>
        <h3 className={styles.questionText}>{`Q${questionNumber}: ${question.question}`}</h3>
        <span>{`${questionNumber}/${totalQuestions}`}</span>
      </div>
      <ul className={styles.optionsList}>
        {question.options.map((option, index) => (
          <li
            key={index}
            className={`${styles.option} ${userAnswer === option ? styles.selected : ''}`}
            onClick={() => onAnswer(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
