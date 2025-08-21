import React, { useState } from 'react';
import styles from './EssayBox.module.css';

const EssayBox = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="10"
      />
      <button className={styles.button} type="submit">Submit</button>
    </form>
  );
};

export default EssayBox;
