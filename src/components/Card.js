import React from 'react';
import styles from './Card.module.css';

function Card({ children }) {
  return <div className={styles.box}>{children}</div>;
}

export default Card;
