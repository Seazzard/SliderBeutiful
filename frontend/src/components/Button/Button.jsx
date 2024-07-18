import React from 'react';
import styles from './button.module.css';

const Button = ({ direction, disable, onClick }) => {
  let cls = styles.btn;
  if (direction === 'left') cls += ` ${styles.left}`;
  if (direction === 'right') cls += ` ${styles.right}`;
  if (disable) cls += ` ${styles.disable}`;

  return <button onClick={onClick} className={cls} />;
};

export default Button;
