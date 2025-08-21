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
    try {
      await deleteResult(id);
      console.log('Result deleted successfully!');
      fetchResults(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete result:', error);
    }
  };

  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Placement Preparation System</h1>
      </header>
      <h2 className={styles.title}>Dashboard</h2>
      <ul className={styles.testList}>
        <Link to="/test/quant" className={styles.testLink}>
          <li className={styles.testItem}>Quantitative Aptitude Test</li>
        </Link>
        <Link to="/test/logical" className={styles.testLink}>
          <li className={styles.testItem}>Logical Reasoning Test</li>
        </Link>
        <Link to="/test/verbal" className={styles.testLink}>
          <li className={styles.testItem}>Verbal Ability Test</li>
        </Link>
        <Link to="/test/essay" className={styles.testLink}>
          <li className={styles.testItem}>Essay Writing Test</li>
        </Link>
        <Link to="/test/coding" className={styles.testLink}>
          <li className={styles.testItem}>Coding Test</li>
        </Link>
      </ul>

      <h3 className={styles.historyTitle}>Test History</h3>
      {results.length === 0 ? (
        <p>No test results found yet.</p>
      ) : (
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Score</th>
              <th>Total Questions</th>
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
                <td style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link to={`/result/${result._id}`} className="btn btn-login">
                    Details
                  </Link>
                  <button
                    onClick={() => handleDeleteResult(result._id)}
                    className="btn btn-denied"
                  >
                    Delete
                  </button>
                                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <footer className={styles.footer}>
        <p>Made by Ashif❤️</p>
      </footer>
          </div>
  );
};

export default Dashboard;
