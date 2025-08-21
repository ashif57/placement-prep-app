import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getResultsHistory, deleteResult } from '../services/api';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    fetchResults();
    hasFetched.current = true;
  }, []);

  const fetchResults = async () => {
    try {
      const response = await getResultsHistory();
      setResults(response.data);
    } catch (error) {
      console.error('Failed to fetch results history:', error);
    }
  };

  const handleDeleteResult = async (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      try {
        await deleteResult(id);
        console.log('Result deleted successfully!');
        fetchResults(); // Refresh the list after deletion
      } catch (error) {
        console.error('Failed to delete result:', error);
      }
    }
  };

  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Welcome to Your Dashboard</h1>
        <p className={styles.subtitle}>Select a test to begin your preparation journey.</p>
      </header>

      <div className={styles.testGrid}>
        <Link to="/test/quant" className={styles.testCard}>
          <h3>Quantitative Aptitude</h3>
          <p>Test your numerical and mathematical skills.</p>
        </Link>
        <Link to="/test/logical" className={styles.testCard}>
          <h3>Logical Reasoning</h3>
          <p>Assess your problem-solving and analytical abilities.</p>
        </Link>
        <Link to="/test/verbal" className={styles.testCard}>
          <h3>Verbal Ability</h3>
          <p>Evaluate your grammar, vocabulary, and comprehension.</p>
        </Link>
        <Link to="/test/essay" className={styles.testCard}>
          <h3>Essay Writing</h3>
          <p>Practice writing coherent and persuasive essays.</p>
        </Link>
        <Link to="/test/coding" className={styles.testCard}>
          <h3>Coding Challenge</h3>
          <p>Solve algorithmic problems and showcase your coding skills.</p>
        </Link>
      </div>

      <h2 className={styles.historyTitle}>Your Test History</h2>
      {results.length === 0 ? (
        <div className={styles.noResults}>
          <p>You haven't completed any tests yet. Take a test to see your results here.</p>
        </div>
      ) : (
        <div className={styles.resultsContainer}>
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Score</th>
                <th>Total</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id}>
                  <td>{result.category}</td>
                  <td>{result.score}</td>
                  <td>{result.totalQuestions}</td>
                  <td>{new Date(result.timestamp).toLocaleString()}</td>
                  <td className={styles.actionsCell}>
                    <Link to={`/result/${result._id}`} className="btn btn-primary">
                      Details
                    </Link>
                    <button
                      onClick={() => handleDeleteResult(result._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
