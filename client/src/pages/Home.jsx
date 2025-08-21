import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to Your Placement Preparation Hub</h1>
        <p className={styles.subtitle}>
          Ace your placement exams with our comprehensive suite of practice tests and tools.
        </p>
        <Link to="/login" className={styles.ctaButton}>Get Started</Link>
      </header>

      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Practice Tests</h3>
            <p>Sharpen your skills with a wide range of practice tests, including quantitative, logical, verbal, and coding sections.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Timed Exams</h3>
            <p>Simulate real exam conditions with our timed tests to improve your speed and accuracy.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Detailed Results</h3>
            <p>Get instant feedback on your performance with detailed results and analysis.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;